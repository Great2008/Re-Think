// Generates a watermarked PDF of a whole series, entirely in the browser.
// jsPDF is loaded on demand so it never touches the initial bundle.
import { marked } from 'marked';

const PAGE = { w: 210, h: 297, mx: 22, top: 26, bottom: 24 }; // A4, mm
const GOLD = [168, 132, 40];
const INK = [30, 30, 30];
const MUTED = [110, 110, 110];

// jsPDF's built-in fonts only cover WinAnsi, so swap out anything outside it.
function clean(s = '') {
  return String(s)
    .replace(/→/g, '->').replace(/←/g, '<-')
    .replace(/[\u2028\u2029]/g, ' ')
    .replace(/\u00a0/g, ' ')
    .replace(/&nbsp;/g, ' ')
    .replace(/&amp;/g, '&').replace(/&lt;/g, '<').replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"').replace(/&#39;/g, "'");
}

// Flatten marked inline tokens into [{ text, style: 'normal'|'italic'|'bold'|'bolditalic' }]
function inlineRuns(tokens = [], style = 'normal') {
  const runs = [];
  for (const t of tokens) {
    if (t.type === 'em') {
      const s = style === 'bold' || style === 'bolditalic' ? 'bolditalic' : 'italic';
      runs.push(...inlineRuns(t.tokens, s));
    } else if (t.type === 'strong') {
      const s = style === 'italic' || style === 'bolditalic' ? 'bolditalic' : 'bold';
      runs.push(...inlineRuns(t.tokens, s));
    } else if (t.type === 'br') {
      runs.push({ text: '\n', style });
    } else if (t.tokens) {
      runs.push(...inlineRuns(t.tokens, style));
    } else {
      runs.push({ text: clean(t.text ?? t.raw ?? ''), style });
    }
  }
  return runs;
}

function htmlToMarkdownish(html = '') {
  // Fallback for posts that only have innerHTML (no markdown content)
  return html
    .replace(/<\/p>/gi, '\n\n').replace(/<br\s*\/?>/gi, '\n')
    .replace(/<hr\s*\/?>/gi, '\n\n---\n\n')
    .replace(/<(em|i)>/gi, '*').replace(/<\/(em|i)>/gi, '*')
    .replace(/<(strong|b)>/gi, '**').replace(/<\/(strong|b)>/gi, '**')
    .replace(/<[^>]+>/g, '');
}

export async function downloadSeriesPdf(series, posts, seriesNum) {
  const { jsPDF } = await import('jspdf');
  const doc = new jsPDF({ unit: 'mm', format: 'a4' });
  const contentW = PAGE.w - PAGE.mx * 2;
  let y = PAGE.top;
  let pageNo = 0;

  const setColor = c => doc.setTextColor(c[0], c[1], c[2]);

  function watermark() {
    doc.saveGraphicsState();
    doc.setGState(new doc.GState({ opacity: 0.08 }));
    doc.setFont('times', 'bold');
    doc.setFontSize(78);
    doc.setTextColor(GOLD[0], GOLD[1], GOLD[2]);
    doc.text('Re:Think', PAGE.w / 2, PAGE.h / 2 + 10, { align: 'center', angle: 40 });
    doc.setFontSize(20);
    doc.text('NOT FOR SALE', PAGE.w / 2 + 14, PAGE.h / 2 + 28, { align: 'center', angle: 40 });
    doc.restoreGraphicsState();
  }

  function chrome() {
    // Header + footer on every page
    doc.setFont('times', 'italic');
    doc.setFontSize(8.5);
    setColor(MUTED);
    doc.text(`Re:Think  |  Series ${seriesNum}`, PAGE.mx, 14);
    doc.setDrawColor(GOLD[0], GOLD[1], GOLD[2]);
    doc.setLineWidth(0.25);
    doc.line(PAGE.mx, PAGE.h - 17, PAGE.w - PAGE.mx, PAGE.h - 17);
    doc.text('Free to read and share. Not for sale.', PAGE.mx, PAGE.h - 12);
    doc.text(String(pageNo), PAGE.w - PAGE.mx, PAGE.h - 12, { align: 'right' });
  }

  function newPage(first = false) {
    if (!first) doc.addPage();
    pageNo += 1;
    watermark();
    chrome();
    y = PAGE.top;
  }

  function ensure(h) {
    if (y + h > PAGE.h - PAGE.bottom) newPage();
  }

  function fontFor(style, size) {
    doc.setFont('times', style);
    doc.setFontSize(size);
  }

  // Wrap a text string (single style) to lines
  function wrapPlain(text, style, size, width) {
    fontFor(style, size);
    return doc.splitTextToSize(clean(text), width);
  }

  // Run-aware paragraph layout (handles italics/bold mid-sentence)
  function paragraph(runs, { size = 11.5, lineH = 6, gapAfter = 4 } = {}) {
    // Tokenise into words keeping style
    const words = [];
    for (const r of runs) {
      const parts = r.text.split(/(\n|\s+)/).filter(p => p !== '');
      for (const p of parts) {
        if (p === '\n') words.push({ nl: true });
        else if (/^\s+$/.test(p)) words.push({ space: true, style: r.style });
        else words.push({ w: p, style: r.style });
      }
    }

    let line = [];
    let lineW = 0;
    const lines = [];
    const spaceW = style => { fontFor(style, size); return doc.getTextWidth(' '); };

    for (const t of words) {
      if (t.nl) { lines.push(line); line = []; lineW = 0; continue; }
      if (t.space) continue;
      fontFor(t.style, size);
      const w = doc.getTextWidth(t.w);
      const sp = line.length ? spaceW(t.style) : 0;
      if (lineW + sp + w > contentW && line.length) {
        lines.push(line); line = []; lineW = 0;
      }
      line.push({ ...t, sp: line.length ? spaceW(t.style) : 0, width: w });
      lineW += (line.length > 1 ? line[line.length - 1].sp : 0) + w;
    }
    if (line.length) lines.push(line);

    for (const ln of lines) {
      ensure(lineH);
      let x = PAGE.mx;
      for (const t of ln) {
        fontFor(t.style, size);
        setColor(INK);
        x += t.sp;
        doc.text(t.w, x, y);
        x += t.width;
      }
      y += lineH;
    }
    y += gapAfter;
  }

  function rule() {
    ensure(10);
    y += 3;
    doc.setDrawColor(GOLD[0], GOLD[1], GOLD[2]);
    doc.setLineWidth(0.3);
    doc.line(PAGE.w / 2 - 12, y, PAGE.w / 2 + 12, y);
    y += 8;
  }

  function renderMarkdown(md) {
    const tokens = marked.lexer(md);
    for (const t of tokens) {
      if (t.type === 'space') continue;
      if (t.type === 'hr') { rule(); continue; }
      if (t.type === 'heading') {
        ensure(14);
        y += 3;
        paragraph(inlineRuns(t.tokens, 'bold'), { size: t.depth <= 2 ? 15 : 13, lineH: 7, gapAfter: 3 });
        continue;
      }
      if (t.type === 'blockquote') {
        for (const inner of t.tokens) {
          if (inner.type === 'paragraph') paragraph(inlineRuns(inner.tokens, 'italic'), { gapAfter: 3 });
        }
        continue;
      }
      if (t.type === 'list') {
        t.items.forEach((item, i) => {
          const bullet = t.ordered ? `${(t.start || 1) + i}. ` : '- ';
          paragraph([{ text: bullet, style: 'normal' }, ...inlineRuns(item.tokens.flatMap(x => x.tokens || [x]))], { gapAfter: 1.5 });
        });
        y += 2;
        continue;
      }
      if (t.type === 'paragraph' || t.type === 'text') {
        paragraph(inlineRuns(t.tokens || [{ type: 'text', text: t.text }]));
        continue;
      }
      if (t.type === 'code') {
        paragraph([{ text: clean(t.text), style: 'normal' }]);
      }
    }
  }

  // ---------- Cover page ----------
  newPage(true);
  y = 70;
  doc.setFont('times', 'normal');
  doc.setFontSize(11);
  doc.setTextColor(GOLD[0], GOLD[1], GOLD[2]);
  doc.text(`SERIES ${seriesNum}  |  ${posts.length} PARTS`, PAGE.w / 2, y, { align: 'center' });
  y += 14;

  setColor(INK);
  const titleLines = wrapPlain(series.title, 'bold', 26, contentW);
  doc.setFont('times', 'bold'); doc.setFontSize(26);
  for (const l of titleLines) { doc.text(l, PAGE.w / 2, y, { align: 'center' }); y += 12; }
  y += 4;
  doc.setDrawColor(GOLD[0], GOLD[1], GOLD[2]);
  doc.setLineWidth(0.5);
  doc.line(PAGE.w / 2 - 15, y, PAGE.w / 2 + 15, y);
  y += 12;

  const descLines = wrapPlain(series.description || '', 'italic', 12, contentW - 10);
  doc.setFont('times', 'italic'); doc.setFontSize(12); setColor(MUTED);
  for (const l of descLines) { doc.text(l, PAGE.w / 2, y, { align: 'center' }); y += 6.5; }

  y = PAGE.h - 60;
  doc.setFont('times', 'bold'); doc.setFontSize(13); doc.setTextColor(GOLD[0], GOLD[1], GOLD[2]);
  doc.text('Re:Think', PAGE.w / 2, y, { align: 'center' });
  y += 6;
  doc.setFont('times', 'italic'); doc.setFontSize(9.5); setColor(MUTED);
  doc.text('Free to read and share. Not for sale.', PAGE.w / 2, y, { align: 'center' });

  // ---------- Parts ----------
  for (const post of posts) {
    newPage();
    const num = String(post.part_number ?? '').padStart(2, '0');
    doc.setFont('times', 'normal'); doc.setFontSize(10); doc.setTextColor(GOLD[0], GOLD[1], GOLD[2]);
    doc.text(`${post.subtitle || 'Part ' + num}${post.tag ? '  |  ' + post.tag.toUpperCase() : ''}`, PAGE.mx, y);
    y += 9;

    setColor(INK);
    for (const l of wrapPlain(post.title, 'bold', 20, contentW)) {
      doc.setFont('times', 'bold'); doc.setFontSize(20);
      doc.text(l, PAGE.mx, y); y += 9;
    }
    const meta = [post.date, post.read_time].filter(Boolean).join('  |  ');
    if (meta) {
      doc.setFont('times', 'italic'); doc.setFontSize(9.5); setColor(MUTED);
      doc.text(clean(meta), PAGE.mx, y); y += 4;
    }
    doc.setDrawColor(GOLD[0], GOLD[1], GOLD[2]); doc.setLineWidth(0.3);
    doc.line(PAGE.mx, y, PAGE.mx + 24, y);
    y += 9;

    const md = post.content || htmlToMarkdownish(post.innerHTML || '');
    renderMarkdown(md);
  }

  const slug = (series.title || 'series').toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '').slice(0, 50);
  doc.save(`rethink-series-${seriesNum}-${slug}.pdf`);
}

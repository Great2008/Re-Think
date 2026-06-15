import { useEffect, useRef } from 'react';
import { marked } from 'marked';

marked.setOptions({ breaks: true, gfm: true });

export default function Modal({ posts, currentIndex, onClose, onNavigate, seriesNumber }) {
  const overlayRef = useRef(null);

  const post = posts[currentIndex];

  useEffect(() => {
    function handleKey(e) {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowRight') onNavigate(1);
      if (e.key === 'ArrowLeft') onNavigate(-1);
    }
    document.addEventListener('keydown', handleKey);
    return () => document.removeEventListener('keydown', handleKey);
  }, [onClose, onNavigate]);

  useEffect(() => {
    if (overlayRef.current) overlayRef.current.scrollTop = 0;
  }, [currentIndex]);

  if (!post) return null;

  const pageUrl = encodeURIComponent(window.location.href);
  const shareText = encodeURIComponent(`"${post.title}" — Re:Think`);

  // Determine if post has markdown content (from Supabase) or is HTML (static)
  const bodyHtml = post.content
    ? marked.parse(post.content)
    : post.innerHTML || '';

  return (
    <div
      className="modal-overlay open"
      ref={overlayRef}
      onClick={e => e.target === overlayRef.current && onClose()}
      aria-hidden="false"
      role="dialog"
      aria-modal="true"
    >
      <div className="modal">
        <button className="modal-close" onClick={onClose} aria-label="Close article">
          ✕ close
        </button>
        <div className="modal-header">
          <div className="modal-series-label">
            Series {seriesNumber} · {post.subtitle || post['data-part'] || ''}
          </div>
          <div className="modal-title">{post.title}</div>
          <div className="modal-meta">
            <span>{post.date || post['data-date'] || ''}</span>
            <span>{post.read_time || post['data-read'] || ''}</span>
          </div>
        </div>
        <div
          className="modal-body"
          dangerouslySetInnerHTML={{ __html: bodyHtml }}
        />
        <div className="share-row">
          <span className="share-label">Share</span>
          <a
            className="share-btn"
            href={`https://wa.me/?text=${shareText}%20${pageUrl}`}
            target="_blank"
            rel="noopener noreferrer"
          >WhatsApp</a>
          <a
            className="share-btn"
            href={`https://x.com/intent/tweet?text=${shareText}&url=${pageUrl}`}
            target="_blank"
            rel="noopener noreferrer"
          >𝕏</a>
          <a
            className="share-btn"
            href={`https://www.linkedin.com/sharing/share-offsite/?url=${pageUrl}`}
            target="_blank"
            rel="noopener noreferrer"
          >LinkedIn</a>
        </div>
        <div className="modal-nav">
          <button
            className="modal-nav-btn"
            onClick={() => onNavigate(-1)}
            disabled={currentIndex === 0}
          >← Prev</button>
          <span className="modal-nav-count">
            {currentIndex + 1} of {posts.length}
          </span>
          <button
            className="modal-nav-btn"
            onClick={() => onNavigate(1)}
            disabled={currentIndex === posts.length - 1}
          >Next →</button>
        </div>
      </div>
    </div>
  );
}

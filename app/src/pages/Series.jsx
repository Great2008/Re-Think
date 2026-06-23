import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { fetchSeries, fetchPosts, formatMonthYear } from '../lib/supabase.js';
import { STATIC_SERIES, STATIC_POSTS } from '../lib/staticContent.js';
import Modal from '../components/Modal.jsx';
import Comments from '../components/Comments.jsx';
import { marked } from 'marked';

marked.setOptions({ breaks: true, gfm: true });

export default function Series() {
  const { id } = useParams();
  const [series, setSeries] = useState(null);
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [modalIndex, setModalIndex] = useState(null);

  useEffect(() => {
    setLoading(true);
    setError(false);
    setSeries(null);
    setPosts([]);
    setModalIndex(null);
    load();
  }, [id]);

  async function load() {
    // Try static content first (series-001 and series-002 have full static data)
    const staticSeries = STATIC_SERIES[id];
    const staticPosts = STATIC_POSTS[id];

    if (staticSeries && staticPosts) {
      setSeries(staticSeries);
      setPosts(staticPosts);
      setLoading(false);
      return;
    }

    // Otherwise fetch from Supabase (series-003 and future series)
    try {
      const [s, p] = await Promise.all([fetchSeries(id), fetchPosts(id)]);
      if (!s || !p.length) {
        setError(true);
      } else {
        setSeries(s);
        setPosts(p);
      }
    } catch {
      setError(true);
    }
    setLoading(false);
  }

  function openModal(index) {
    setModalIndex(index);
    document.body.style.overflow = 'hidden';
  }

  function closeModal() {
    setModalIndex(null);
    document.body.style.overflow = '';
  }

  function navigateModal(dir) {
    setModalIndex(i => Math.max(0, Math.min(posts.length - 1, i + dir)));
  }

  // Normalise post shape for Modal (handles both static and Supabase shapes)
  function normalisePost(p) {
    return {
      ...p,
      // static posts use `date`, Supabase uses `published_at`
      date: p.date || (p.published_at ? formatMonthYear(p.published_at) : ''),
      read_time: p.read_time || '',
    };
  }

  if (loading) {
    return (
      <div className="series-loading">
        <span className="series-loading-text">// Loading series...</span>
      </div>
    );
  }

  if (error || !series) {
    return (
      <div className="series-error">
        <span className="series-loading-text">Series not found.</span>
        <Link to="/" className="series-error-link">← Back to home</Link>
      </div>
    );
  }

  const seriesNum = series.number || series.id?.replace('series-', '').padStart(3, '0');
  const editionLabel = series.edition ? ` · ${series.edition}` : '';

  return (
    <>
      <section className="series-hero">
        <div className="breadcrumb">
          <Link to="/">Home</Link>
          <span className="breadcrumb-sep">/</span>
          <span>Series {seriesNum}</span>
        </div>
        <div className="series-hero-label">
          Series {seriesNum} &nbsp;·&nbsp; {posts.length} Parts{editionLabel}
        </div>
        <h1>{series.title}</h1>
        <p className="series-hero-desc">{series.description}</p>
        <SeriesShareRow title={series.title} />
      </section>

      <div className="divider">
        <div className="divider-line" />
        <span className="divider-label">{posts.length} Parts</span>
        <div className="divider-line" />
      </div>

      <div className="posts" id="posts">
        {posts.map((post, i) => {
          const p = normalisePost(post);
          const num = String(p.part_number).padStart(2, '0');
          return (
            <a
              key={p.id}
              className="post-item"
              href="#"
              onClick={e => { e.preventDefault(); openModal(i); }}
            >
              <div className="post-number">{num}</div>
              <div className="post-meta-col">
                <span className="post-subtitle">{p.subtitle}</span>
                <div className="post-title">{p.title}</div>
                <p className="post-excerpt">{p.excerpt}</p>
                <div className="post-footer">
                  <span className="post-date">{p.date}</span>
                  <span className="post-read">{p.read_time}</span>
                  {p.tag && <span className="post-tag">{p.tag}</span>}
                </div>
              </div>
            </a>
          );
        })}
      </div>

      <Comments seriesId={id} />

      {modalIndex !== null && (
        <Modal
          posts={posts.map(normalisePost)}
          currentIndex={modalIndex}
          onClose={closeModal}
          onNavigate={navigateModal}
          seriesNumber={seriesNum}
        />
      )}
    </>
  );
}

function SeriesShareRow({ title }) {
  const url = encodeURIComponent(window.location.href);
  const text = encodeURIComponent(`"${title}" — Re:Think`);

  return (
    <div className="share-row series-share-row">
      <span className="share-label">Share this series</span>
      <a className="share-btn" href={`https://wa.me/?text=${text}%20${url}`} target="_blank" rel="noopener noreferrer">WhatsApp</a>
      <a className="share-btn" href={`https://x.com/intent/tweet?text=${text}&url=${url}`} target="_blank" rel="noopener noreferrer">𝕏</a>
      <a className="share-btn" href={`https://www.linkedin.com/sharing/share-offsite/?url=${url}`} target="_blank" rel="noopener noreferrer">LinkedIn</a>
      <button
        className="share-btn"
        onClick={() => { navigator.clipboard?.writeText(window.location.href); }}
        type="button">
        Copy link
      </button>
    </div>
  );
}

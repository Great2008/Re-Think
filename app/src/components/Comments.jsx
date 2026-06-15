import { useState, useEffect } from 'react';
import { fetchComments, postComment, formatDate } from '../lib/supabase.js';

export default function Comments({ seriesId }) {
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [name, setName] = useState('');
  const [body, setBody] = useState('');
  const [status, setStatus] = useState({ msg: '', type: '' });
  const [submitting, setSubmitting] = useState(false);

  async function load() {
    setLoading(true);
    try {
      const data = await fetchComments(seriesId);
      setComments(data);
    } catch {
      setComments([]);
    }
    setLoading(false);
  }

  useEffect(() => { load(); }, [seriesId]);

  async function handleSubmit() {
    if (!name.trim() || !body.trim()) {
      setStatus({ msg: 'Please fill in both fields.', type: 'error' });
      return;
    }
    if (body.trim().length < 10) {
      setStatus({ msg: 'Comment is too short.', type: 'error' });
      return;
    }
    setSubmitting(true);
    setStatus({ msg: '', type: '' });
    const ok = await postComment({ seriesId, name: name.trim(), body: body.trim() });
    setSubmitting(false);
    if (ok) {
      setName('');
      setBody('');
      setStatus({ msg: 'Comment posted.', type: 'success' });
      await load();
      setTimeout(() => setStatus({ msg: '', type: '' }), 3000);
    } else {
      setStatus({ msg: 'Something went wrong. Try again.', type: 'error' });
    }
  }

  function escapeHtml(str) {
    return str
      .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;').replace(/'/g, '&#039;');
  }

  return (
    <div className="comments-section">
      <div className="divider">
        <div className="divider-line" />
        <span className="divider-label">Comments</span>
        <div className="divider-line" />
      </div>
      <div className="comments-inner">
        <div id="comments-list">
          {loading ? (
            <p className="comments-loading">Loading comments...</p>
          ) : comments.length === 0 ? (
            <p className="comments-empty">No comments yet. Be the first.</p>
          ) : (
            comments.map(c => (
              <div key={c.id} className="comment-item">
                <div className="comment-header">
                  <span className="comment-name">{escapeHtml(c.name)}</span>
                  <span className="comment-date">{formatDate(c.created_at)}</span>
                </div>
                <div className="comment-body">{escapeHtml(c.body)}</div>
              </div>
            ))
          )}
        </div>

        <div className="comment-form">
          <div className="about-label">// Leave a comment</div>
          <input
            className="comment-input"
            type="text"
            placeholder="Your name"
            maxLength={60}
            autoComplete="name"
            value={name}
            onChange={e => setName(e.target.value)}
          />
          <textarea
            className="comment-textarea"
            placeholder="Say something specific."
            rows={4}
            maxLength={1000}
            value={body}
            onChange={e => setBody(e.target.value)}
          />
          <div className="comment-form-footer">
            <span className={`comment-status ${status.type}`}>{status.msg}</span>
            <button
              className="comment-btn"
              onClick={handleSubmit}
              disabled={submitting}
            >
              {submitting ? 'Posting...' : 'Post comment'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export const SUPABASE_URL = 'https://dseceshtucrfoxrkqaba.supabase.co';
export const SUPABASE_ANON = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImRzZWNlc2h0dWNyZm94cmtxYWJhIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzQ1MTU2MTMsImV4cCI6MjA5MDA5MTYxM30.-NdLR5iCHizl0XpzoYPK0C6abCeKxPjNJ2Na-NyUgzI';

const headers = {
  apikey: SUPABASE_ANON,
  Authorization: `Bearer ${SUPABASE_ANON}`,
};

export async function fetchSeries(seriesId) {
  const res = await fetch(
    `${SUPABASE_URL}/rest/v1/rethink_series?id=eq.${seriesId}&active=eq.true`,
    { headers }
  );
  const data = await res.json();
  return data[0] || null;
}

export async function fetchPosts(seriesId) {
  const res = await fetch(
    `${SUPABASE_URL}/rest/v1/rethink_posts?series_id=eq.${seriesId}&active=eq.true&order=part_number.asc`,
    { headers }
  );
  return res.json();
}

export async function fetchComments(seriesId) {
  const res = await fetch(
    `${SUPABASE_URL}/rest/v1/rethink_comments?series_id=eq.${seriesId}&order=created_at.asc`,
    { headers }
  );
  return res.json();
}

export async function postComment({ seriesId, name, body }) {
  const res = await fetch(`${SUPABASE_URL}/rest/v1/rethink_comments`, {
    method: 'POST',
    headers: {
      ...headers,
      'Content-Type': 'application/json',
      Prefer: 'return=minimal',
    },
    body: JSON.stringify({ series_id: seriesId, name, body }),
  });
  return res.ok;
}

export function formatDate(iso) {
  return new Date(iso).toLocaleDateString('en-GB', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  });
}

export function formatMonthYear(iso) {
  return new Date(iso).toLocaleDateString('en-GB', {
    month: 'long',
    year: 'numeric',
  });
}

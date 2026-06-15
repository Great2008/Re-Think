import { createContext, useContext, useState, useEffect } from 'react';
import { SUPABASE_URL, SUPABASE_ANON } from './supabase.js';

const SeriesContext = createContext([]);

export function SeriesProvider({ children }) {
  const [series, setSeries] = useState([]);

  useEffect(() => {
    fetch(`${SUPABASE_URL}/rest/v1/rethink_series?active=eq.true&order=number.asc`, {
      headers: { apikey: SUPABASE_ANON, Authorization: `Bearer ${SUPABASE_ANON}` }
    })
      .then(r => r.json())
      .then(data => setSeries(data || []))
      .catch(() => {});
  }, []);

  return (
    <SeriesContext.Provider value={series}>
      {children}
    </SeriesContext.Provider>
  );
}

export const useSeries = () => useContext(SeriesContext);

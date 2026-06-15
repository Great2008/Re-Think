import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useTheme } from '../lib/theme.js';
import logoDark from '../assets/logo.svg';
import logoLight from '../assets/logo-light.svg';

const NAV_LINKS = [
  { label: 'Home', to: '/' },
  { label: 'Series 001', to: '/series/series-001' },
  { label: 'Series 002', to: '/series/series-002' },
  { label: 'Series 003', to: '/series/series-003' },
  { label: 'About', to: '/about' },
  { label: 'Contact', to: '/contact' },
];

export default function Nav() {
  const { theme, toggle } = useTheme();
  const location = useLocation();
  const [menuOpen, setMenuOpen] = useState(false);

  // Close menu on route change
  useEffect(() => {
    setMenuOpen(false);
    document.body.style.overflow = '';
  }, [location.pathname]);

  function toggleMenu() {
    const next = !menuOpen;
    setMenuOpen(next);
    document.body.style.overflow = next ? 'hidden' : '';
  }

  function closeMenu() {
    setMenuOpen(false);
    document.body.style.overflow = '';
  }

  const isDark = theme === 'dark';

  return (
    <>
      <header>
        <Link className="logo" to="/">
          <img src={isDark ? logoDark : logoLight} alt="Re:Think" />
        </Link>
        <div className="header-right">
          <ul className="nav-links" role="list">
            {NAV_LINKS.map(({ label, to }) => (
              <li key={to}>
                <Link
                  to={to}
                  className={location.pathname === to ||
                    (to !== '/' && location.pathname.startsWith(to)) ? 'active' : ''}
                >
                  {label}
                </Link>
              </li>
            ))}
          </ul>
          <button className="theme-btn" onClick={toggle} aria-label="Toggle theme">
            <span className="theme-icon">{isDark ? '☀' : '☾'}</span>
            <span className="theme-label">{isDark ? 'Light' : 'Dark'}</span>
          </button>
          <button
            className={`hamburger${menuOpen ? ' open' : ''}`}
            onClick={toggleMenu}
            aria-label={menuOpen ? 'Close navigation menu' : 'Open navigation menu'}
            aria-expanded={menuOpen}
          >
            <span /><span /><span />
          </button>
        </div>
      </header>

      <nav className={`mobile-menu${menuOpen ? ' open' : ''}`} aria-label="Mobile navigation">
        {NAV_LINKS.map(({ label, to }, i) => {
          const subtitles = ['Start here', '4 Parts', '4 Parts', '4 Parts', 'The publication', 'Get in touch'];
          return (
            <Link key={to} className="mobile-nav-link" to={to} onClick={closeMenu}>
              {label} <span>{subtitles[i]}</span>
            </Link>
          );
        })}
        <div className="mobile-theme-row">
          <span className="mobile-theme-label">Theme</span>
          <button className="theme-btn" onClick={toggle} aria-label="Toggle theme">
            <span className="theme-icon">{isDark ? '☀' : '☾'}</span>
            <span className="theme-label">{isDark ? 'Light' : 'Dark'}</span>
          </button>
        </div>
      </nav>
    </>
  );
}

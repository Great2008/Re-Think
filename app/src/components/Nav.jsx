import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useTheme } from '../lib/theme.jsx';
import { useSeries } from '../lib/SeriesContext.jsx';
import logoDark from '../assets/logo.svg';
import logoLight from '../assets/logo-light.svg';

const STATIC_LINKS = [
  { label: 'Home', to: '/', subtitle: 'Start here' },
  { label: 'About', to: '/about', subtitle: 'The publication' },
  { label: 'Contact', to: '/contact', subtitle: 'Get in touch' },
];

export default function Nav() {
  const { theme, toggle } = useTheme();
  const location = useLocation();
  const [menuOpen, setMenuOpen] = useState(false);
  const allSeries = useSeries();

  // Build nav links dynamically
  const seriesLinks = allSeries.map(s => ({
    label: `Series ${s.number}`,
    to: `/series/${s.id}`,
    subtitle: `${s.number}`
  }));

  const navLinks = [
    STATIC_LINKS[0],
    ...seriesLinks,
    STATIC_LINKS[1],
    STATIC_LINKS[2],
  ];

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

  const isActive = (to) =>
    to === '/'
      ? location.pathname === '/'
      : location.pathname.startsWith(to);

  return (
    <>
      <header>
        <Link className="logo" to="/">
          <img src={isDark ? logoDark : logoLight} alt="Re:Think" />
        </Link>
        <div className="header-right">
          <ul className="nav-links" role="list">
            {navLinks.map(({ label, to }) => (
              <li key={to}>
                <Link to={to} className={isActive(to) ? 'active' : ''}>
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
        {navLinks.map(({ label, to, subtitle }) => (
          <Link key={to} className="mobile-nav-link" to={to} onClick={closeMenu}>
            {label} <span>{subtitle}</span>
          </Link>
        ))}
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

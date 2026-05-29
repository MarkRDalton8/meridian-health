import { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { COLORS } from '../data';

export default function Layout({ children }) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userName, setUserName] = useState('');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  // Re-execute Composer on every route change
  useEffect(() => {
    if (typeof window !== 'undefined' && window.tp) {
      window.tp.push(['init', function () {
        window.tp.experience.execute();
      }]);
    }
  }, [location.pathname]);

  // Piano ID callbacks + session restore
  useEffect(() => {
    const setup = () => {
      if (typeof window !== 'undefined' && window.tp) {
        window.tp.push(['init', function () {
          const user = window.tp.pianoId?.getUser?.();
          if (user) {
            setIsLoggedIn(true);
            setUserName(
              `${user.given_name || user.firstName || ''} ${user.family_name || user.lastName || ''}`.trim() || user.email
            );
          }

          window.tp.push(['addHandler', 'loginSuccess', function (data) {
            setIsLoggedIn(true);
            setUserName(
              `${data.user.given_name || ''} ${data.user.family_name || ''}`.trim() || data.user.email
            );
          }]);

          window.tp.push(['addHandler', 'checkoutComplete', function (data) {
            sessionStorage.setItem('mhn_purchase', JSON.stringify({
              termName: data.termName || '',
              chargeAmount: data.chargeAmount || 0,
              chargeCurrency: data.chargeCurrency || 'USD',
            }));
            navigate('/welcome');
          }]);
        }]);
      } else {
        setTimeout(setup, 100);
      }
    };
    setup();
  }, []);

  const handleLogin = () => {
    if (typeof window !== 'undefined' && window.tp) {
      window.tp.push(['init', function () {
        window.tp.pianoId.show({
          screen: 'register',
          displayMode: 'modal',
          loggedIn: function (data) {
            try { window.tp.pianoId.hide(); } catch (e) {}
            setIsLoggedIn(true);
            setUserName(
              `${data.user.given_name || ''} ${data.user.family_name || ''}`.trim() || data.user.email
            );
            navigate('/account');
          },
        });
      }]);
    } else {
      setTimeout(handleLogin, 200);
    }
  };

  const handleLogout = () => {
    if (typeof window !== 'undefined' && window.tp) {
      window.tp.pianoId.logout();
    }
    setIsLoggedIn(false);
    setUserName('');
    navigate('/');
  };

  const navLinks = [
    { label: 'News', path: '/news' },
    { label: 'Conditions', path: '/conditions' },
    { label: 'Physician Insights', path: '/physician-insights' },
    { label: 'Courses', path: '/courses' },
    { label: 'Newsletter', path: '/newsletter' },
  ];

  const isActive = (path) => location.pathname === path || location.pathname.startsWith(path + '/');

  return (
    <div style={{ fontFamily: "'Inter', -apple-system, sans-serif", color: COLORS.neutral, background: COLORS.background, minHeight: '100vh' }}>

      {/* Top announcement bar */}
      <div style={{ background: COLORS.primary, color: 'white', padding: '8px 24px', textAlign: 'center', fontSize: 13 }}>
        <span style={{ opacity: 0.9 }}>Physician Insider — bi-weekly expert perspectives from leading physicians. </span>
        <Link to="/newsletter" style={{ color: 'white', fontWeight: 700, textDecoration: 'underline' }}>Learn more</Link>
      </div>

      {/* Header */}
      <header style={{ background: 'white', borderBottom: `1px solid ${COLORS.border}`, position: 'sticky', top: 0, zIndex: 200, boxShadow: '0 1px 6px rgba(0,0,0,0.06)' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto', padding: '0 24px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', height: 68 }}>

          {/* Logo */}
          <Link to="/" style={{ textDecoration: 'none', display: 'flex', alignItems: 'center', gap: 12 }}>
            <div style={{ width: 40, height: 40, background: `linear-gradient(135deg, ${COLORS.primary} 0%, ${COLORS.accent} 100%)`, borderRadius: 10, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
              <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
                <path d="M11 3 L11 19 M3 11 Q3 7 7 6 Q11 5 11 11 Q11 5 15 6 Q19 7 19 11" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="none"/>
              </svg>
            </div>
            <div>
              <div style={{ fontWeight: 800, fontSize: 17, color: COLORS.neutral, letterSpacing: '-0.3px', lineHeight: 1.1 }}>Meridian Health</div>
              <div style={{ fontSize: 10, color: COLORS.muted, letterSpacing: '0.5px', textTransform: 'uppercase' }}>Network</div>
            </div>
          </Link>

          {/* Nav */}
          <nav style={{ display: 'flex', gap: 4, alignItems: 'center' }}>
            {navLinks.map(({ label, path }) => (
              <Link key={path} to={path} style={{
                textDecoration: 'none', fontWeight: isActive(path) ? 700 : 500,
                fontSize: 13.5, color: isActive(path) ? COLORS.primary : COLORS.neutralMid,
                padding: '8px 12px', borderRadius: 6, whiteSpace: 'nowrap',
                background: isActive(path) ? COLORS.primaryLight : 'transparent',
                transition: 'all 0.15s ease',
              }}
              onMouseEnter={e => { if (!isActive(path)) e.currentTarget.style.background = COLORS.background; }}
              onMouseLeave={e => { if (!isActive(path)) e.currentTarget.style.background = 'transparent'; }}
              >
                {label}
              </Link>
            ))}
          </nav>

          {/* Auth + Subscribe CTA */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            {!isLoggedIn ? (
              <>
                <button onClick={handleLogin} style={{ background: 'none', border: 'none', color: COLORS.neutralMid, fontSize: 13.5, fontWeight: 500, cursor: 'pointer', padding: '8px 12px', borderRadius: 6 }}>
                  Sign In
                </button>
                <Link to="/subscribe" style={{ background: COLORS.primary, color: 'white', textDecoration: 'none', padding: '9px 20px', borderRadius: 6, fontSize: 13, fontWeight: 700, whiteSpace: 'nowrap' }}>
                  Subscribe
                </Link>
              </>
            ) : (
              <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                <Link to="/account" style={{ fontWeight: 600, fontSize: 14, color: COLORS.primary, textDecoration: 'none' }}>{userName}</Link>
                <button onClick={handleLogout} style={{ background: 'none', border: `1px solid ${COLORS.border}`, color: COLORS.muted, padding: '7px 14px', borderRadius: 6, fontSize: 12, cursor: 'pointer' }}>
                  Sign Out
                </button>
              </div>
            )}
          </div>
        </div>
      </header>

      {/* Page content */}
      <main style={{ maxWidth: 1200, margin: '0 auto', padding: '48px 24px', minHeight: 'calc(100vh - 200px)' }}>
        {children}
      </main>

      {/* Footer */}
      <footer style={{ background: COLORS.neutral, color: 'white', padding: '56px 24px 28px', marginTop: 80 }}>
        <div style={{ maxWidth: 1200, margin: '0 auto' }}>
          <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr 1fr 1fr', gap: 48, marginBottom: 48 }}>
            <div>
              <div style={{ fontWeight: 800, fontSize: 20, marginBottom: 8 }}>Meridian Health Network</div>
              <p style={{ fontSize: 14, opacity: 0.65, lineHeight: 1.7, maxWidth: 280 }}>
                Physician-authored health journalism and condition guidance, built for patients navigating chronic illness and the professionals who care for them.
              </p>
              <div style={{ marginTop: 20, fontSize: 12, opacity: 0.5 }}>Piano Demo Site · AID: QiNgMM49pu</div>
            </div>
            <div>
              <div style={{ fontSize: 11, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '1.5px', opacity: 0.5, marginBottom: 14 }}>Content</div>
              {[['News', '/news'], ['Conditions', '/conditions'], ['Physician Insights', '/physician-insights'], ['Courses', '/courses']].map(([label, path]) => (
                <div key={path} style={{ marginBottom: 10 }}>
                  <Link to={path} style={{ color: 'rgba(255,255,255,0.7)', textDecoration: 'none', fontSize: 14 }}>{label}</Link>
                </div>
              ))}
            </div>
            <div>
              <div style={{ fontSize: 11, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '1.5px', opacity: 0.5, marginBottom: 14 }}>Conditions</div>
              {[['Multiple Sclerosis', '/conditions/multiple-sclerosis'], ['Type 2 Diabetes', '/conditions/type-2-diabetes'], ['Rheumatoid Arthritis', '/conditions/rheumatoid-arthritis'], ['Heart Disease', '/conditions/heart-disease']].map(([label, path]) => (
                <div key={path} style={{ marginBottom: 10 }}>
                  <Link to={path} style={{ color: 'rgba(255,255,255,0.7)', textDecoration: 'none', fontSize: 14 }}>{label}</Link>
                </div>
              ))}
            </div>
            <div>
              <div style={{ fontSize: 11, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '1.5px', opacity: 0.5, marginBottom: 14 }}>Account</div>
              {[['Subscribe', '/subscribe'], ['Newsletter', '/newsletter'], ['My Account', '/account']].map(([label, path]) => (
                <div key={path} style={{ marginBottom: 10 }}>
                  <Link to={path} style={{ color: 'rgba(255,255,255,0.7)', textDecoration: 'none', fontSize: 14 }}>{label}</Link>
                </div>
              ))}
            </div>
          </div>
          <div style={{ borderTop: '1px solid rgba(255,255,255,0.1)', paddingTop: 24, display: 'flex', justifyContent: 'space-between', fontSize: 13, opacity: 0.45, flexWrap: 'wrap', gap: 8 }}>
            <span>© 2026 Meridian Health Network. All rights reserved.</span>
            <span>Piano Demo Site — For demonstration purposes only</span>
          </div>
        </div>
      </footer>
    </div>
  );
}

import { useEffect, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import Layout from '../components/Layout';
import { COLORS, COURSES } from '../data';

export default function AccountPage() {
  const [user, setUser] = useState(null);
  const [subscriptions, setSubscriptions] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    window.tp = window.tp || [];
    window.tp.push(['setContentSection', 'account']);
    window.tp.push(['init', function () {
      const pianoUser = window.tp.pianoId.getUser();
      if (!pianoUser) {
        window.tp.pianoId.show({ screen: 'login', displayMode: 'modal' });
      } else {
        setUser(pianoUser);
        loadSubscriptions();
      }
      window.tp.experience.execute();
    }]);

    window.tp.push(['addHandler', 'loginSuccess', function (data) {
      setUser(data.user);
      loadSubscriptions();
    }]);
  }, []);

  const loadSubscriptions = () => {
    const tp = window.tp || [];
    tp.push(['init', function () {
      window.tp?.api?.callApi?.('/access/list', {}, function (response) {
        if (response?.data) setSubscriptions(response.data);
        setLoading(false);
      });
      if (!window.tp?.api) setLoading(false);
    }]);
  };

  const handleCancelFlow = () => {
    const tp = window.tp || [];
    tp.push(['init', function () {
      // Piano Composer will intercept cancellation and surface churn-prevention experience
      window.tp?.offer?.show?.({
        displayMode: 'modal',
        customParams: { action: 'cancel_flow' },
      });
    }]);
  };

  if (loading) {
    return (
      <Layout>
        <div style={{ textAlign: 'center', padding: '80px 0' }}>
          <div style={{ fontSize: 32, marginBottom: 12 }}>⏳</div>
          <div style={{ color: COLORS.muted, fontSize: 16 }}>Loading your account…</div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div style={{ maxWidth: 820, margin: '0 auto' }}>
        <h1 style={{ fontFamily: "'Merriweather', Georgia, serif", fontSize: 32, fontWeight: 700, color: COLORS.neutral, marginBottom: 32 }}>My Account</h1>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 2fr', gap: 32, alignItems: 'flex-start' }}>
          {/* Left: Profile */}
          <div>
            <div style={{ background: 'white', border: `1px solid ${COLORS.border}`, borderRadius: 12, padding: '24px 22px', marginBottom: 16 }}>
              <div style={{ width: 64, height: 64, background: `linear-gradient(135deg, ${COLORS.primary} 0%, ${COLORS.accent} 100%)`, borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontWeight: 700, fontSize: 24, margin: '0 auto 16px' }}>
                {user ? (user.given_name?.[0] || user.email?.[0] || 'M').toUpperCase() : '?'}
              </div>
              <div style={{ textAlign: 'center' }}>
                <div style={{ fontWeight: 700, fontSize: 17, color: COLORS.neutral, marginBottom: 4 }}>
                  {user ? `${user.given_name || ''} ${user.family_name || ''}`.trim() || user.email : 'Not signed in'}
                </div>
                {user && <div style={{ fontSize: 13, color: COLORS.muted }}>{user.email}</div>}
              </div>
            </div>

            <div style={{ background: 'white', border: `1px solid ${COLORS.border}`, borderRadius: 12, padding: '18px 20px' }}>
              <div style={{ fontSize: 11, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '1px', color: COLORS.muted, marginBottom: 14 }}>Quick Links</div>
              {[['My Courses', '/courses'], ['Physician Insights', '/physician-insights'], ['Newsletter Settings', '/newsletter'], ['Subscribe / Upgrade', '/subscribe']].map(([label, path]) => (
                <Link key={path} to={path} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '10px 0', borderBottom: `1px solid ${COLORS.border}`, textDecoration: 'none', color: COLORS.neutral, fontSize: 14, fontWeight: 500 }}>
                  {label}
                  <span style={{ color: COLORS.muted }}>→</span>
                </Link>
              ))}
            </div>
          </div>

          {/* Right: Subscription + content */}
          <div>
            {/* Active subscription */}
            <div style={{ background: 'white', border: `1px solid ${COLORS.border}`, borderRadius: 12, padding: '24px 26px', marginBottom: 24 }}>
              <div style={{ fontSize: 11, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '1px', color: COLORS.muted, marginBottom: 16 }}>Membership</div>
              {subscriptions.length > 0 ? (
                <div>
                  {subscriptions.map((sub, i) => (
                    <div key={i} style={{ padding: '14px 0', borderBottom: `1px solid ${COLORS.border}` }}>
                      <div style={{ fontWeight: 700, fontSize: 16, color: COLORS.neutral, marginBottom: 4 }}>{sub.term?.name || 'Active Plan'}</div>
                      <div style={{ fontSize: 13, color: COLORS.muted }}>Renews: {sub.expire_date ? new Date(sub.expire_date * 1000).toLocaleDateString() : 'Ongoing'}</div>
                    </div>
                  ))}
                  {/* Piano Composer — churn prevention zone */}
                  {/* Composer can inject retention offers here for at-risk subscribers */}
                  <div className="piano-churn-zone" style={{ marginTop: 16 }} />
                  <button
                    onClick={handleCancelFlow}
                    style={{ marginTop: 16, background: 'none', border: `1px solid ${COLORS.border}`, color: COLORS.muted, padding: '8px 16px', borderRadius: 6, fontSize: 12, cursor: 'pointer', fontWeight: 500 }}
                  >
                    Manage / Cancel Subscription
                  </button>
                </div>
              ) : (
                <div>
                  <p style={{ fontSize: 15, color: COLORS.muted, marginBottom: 16 }}>
                    You're on the free Reader plan. Upgrade to access physician essays, all courses, and the Physician Insider newsletter.
                  </p>
                  <Link to="/subscribe" style={{ display: 'inline-block', background: COLORS.primary, color: 'white', textDecoration: 'none', padding: '10px 24px', borderRadius: 6, fontWeight: 700, fontSize: 14 }}>
                    View Plans
                  </Link>
                </div>
              )}
            </div>

            {/* My courses shortcut */}
            <div style={{ background: 'white', border: `1px solid ${COLORS.border}`, borderRadius: 12, padding: '24px 26px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: 16 }}>
                <div style={{ fontSize: 11, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '1px', color: COLORS.muted }}>Course Library</div>
                <Link to="/courses" style={{ fontSize: 12, color: COLORS.primary, textDecoration: 'none', fontWeight: 600 }}>Browse all →</Link>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                {COURSES.slice(0, 3).map(course => (
                  <Link key={course.id} to={`/courses/${course.slug}`} style={{ display: 'flex', gap: 12, alignItems: 'center', padding: '10px 0', borderBottom: `1px solid ${COLORS.border}`, textDecoration: 'none' }}>
                    <div style={{ width: 8, height: 36, background: course.coverColor, borderRadius: 4, flexShrink: 0 }} />
                    <div style={{ flex: 1 }}>
                      <div style={{ fontWeight: 600, fontSize: 13, color: COLORS.neutral, lineHeight: 1.3 }}>{course.title}</div>
                      <div style={{ fontSize: 11, color: COLORS.muted, marginTop: 2 }}>{course.duration}</div>
                    </div>
                    <span style={{ fontSize: 11, background: COLORS.background, color: COLORS.muted, padding: '3px 10px', borderRadius: 20, fontWeight: 600, flexShrink: 0 }}>View</span>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}

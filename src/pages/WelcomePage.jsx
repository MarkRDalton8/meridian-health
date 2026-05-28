import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Layout from '../components/Layout';
import { COLORS, COURSES, PHYSICIAN_ARTICLES } from '../data';

export default function WelcomePage() {
  const [purchase, setPurchase] = useState(null);

  useEffect(() => {
    const stored = sessionStorage.getItem('mhn_purchase');
    if (stored) {
      try { setPurchase(JSON.parse(stored)); } catch {}
    }
    const tp = window.tp || [];
    tp.push(['setContentSection', 'welcome']);
    tp.push(['init', function () { window.tp?.experience?.execute?.(); }]);
  }, []);

  return (
    <Layout>
      <div style={{ maxWidth: 720, margin: '0 auto', textAlign: 'center' }}>
        {/* Celebration */}
        <div style={{ fontSize: 64, marginBottom: 20 }}>🎉</div>
        <h1 style={{ fontFamily: "'Merriweather', Georgia, serif", fontSize: 40, fontWeight: 700, color: COLORS.neutral, marginBottom: 14, lineHeight: 1.3 }}>
          Welcome to Meridian Health
        </h1>
        {purchase && (
          <div style={{ background: COLORS.accentLight, border: `1px solid ${COLORS.accent}30`, borderRadius: 10, padding: '16px 24px', marginBottom: 24, display: 'inline-block' }}>
            <div style={{ fontWeight: 700, fontSize: 17, color: COLORS.neutral }}>
              {purchase.termName || 'Physician Insider'} — Active
            </div>
            {purchase.chargeAmount > 0 && (
              <div style={{ fontSize: 13, color: COLORS.muted, marginTop: 4 }}>
                ${purchase.chargeAmount} {purchase.chargeCurrency}
              </div>
            )}
          </div>
        )}
        <p style={{ fontSize: 18, color: COLORS.muted, lineHeight: 1.7, marginBottom: 48 }}>
          You now have full access to physician essays, all life-guidance courses, and the Physician Insider newsletter. Here's where to start.
        </p>

        {/* Piano Composer — welcome experience / onboarding prompt */}
        <div className="piano-welcome-experience" style={{ marginBottom: 32 }} />

        {/* Start here cards */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 20, marginBottom: 48, textAlign: 'left' }}>
          {[
            {
              icon: '📖',
              title: 'Read a Physician Essay',
              desc: 'Start with one of our most-read physician perspectives.',
              link: `/physician-insights/${PHYSICIAN_ARTICLES[0].slug}`,
              linkLabel: 'Read Now',
              color: COLORS.sectionPhysician,
            },
            {
              icon: '🎓',
              title: 'Enroll in a Course',
              desc: 'The MS Workplace Rights course is our most-enrolled — and most practical.',
              link: '/courses/ms-workplace-rights',
              linkLabel: 'View Course',
              color: COLORS.sectionCourses,
            },
            {
              icon: '📧',
              title: 'Check Your Inbox',
              desc: 'Your first Physician Insider newsletter is on its way. Look for it this week.',
              link: '/newsletter',
              linkLabel: 'Newsletter Info',
              color: COLORS.accent,
            },
          ].map(({ icon, title, desc, link, linkLabel, color }) => (
            <div key={title} style={{ background: 'white', border: `1px solid ${COLORS.border}`, borderRadius: 12, padding: '22px 20px' }}>
              <div style={{ fontSize: 28, marginBottom: 10 }}>{icon}</div>
              <h3 style={{ fontWeight: 700, fontSize: 16, color: COLORS.neutral, marginBottom: 8, borderBottom: `2px solid ${color}`, paddingBottom: 8 }}>{title}</h3>
              <p style={{ fontSize: 13, color: COLORS.muted, lineHeight: 1.6, marginBottom: 14 }}>{desc}</p>
              <Link to={link} style={{ fontSize: 13, fontWeight: 700, color, textDecoration: 'none' }}>{linkLabel} →</Link>
            </div>
          ))}
        </div>

        {/* Featured courses */}
        <div style={{ textAlign: 'left', marginBottom: 40 }}>
          <h2 style={{ fontFamily: "'Merriweather', Georgia, serif", fontSize: 24, fontWeight: 700, color: COLORS.neutral, marginBottom: 20 }}>
            Your course library is now unlocked
          </h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 16 }}>
            {COURSES.slice(0, 4).map(course => (
              <Link key={course.id} to={`/courses/${course.slug}`} style={{ display: 'flex', gap: 14, background: 'white', border: `1px solid ${COLORS.border}`, borderRadius: 10, padding: '16px 18px', textDecoration: 'none', alignItems: 'center' }}>
                <div style={{ width: 6, height: 48, background: course.coverColor, borderRadius: 3, flexShrink: 0 }} />
                <div>
                  <div style={{ fontWeight: 700, fontSize: 14, color: COLORS.neutral, lineHeight: 1.3, marginBottom: 4 }}>{course.title}</div>
                  <div style={{ fontSize: 12, color: COLORS.muted }}>{course.duration}</div>
                </div>
              </Link>
            ))}
          </div>
        </div>

        <Link to="/" style={{ display: 'inline-block', background: COLORS.primary, color: 'white', textDecoration: 'none', padding: '14px 36px', borderRadius: 8, fontWeight: 700, fontSize: 16 }}>
          Go to Homepage
        </Link>
      </div>
    </Layout>
  );
}

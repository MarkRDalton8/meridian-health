import { useEffect } from 'react';
import Layout from '../components/Layout';
import { COLORS, MEMBERSHIP_PLANS } from '../data';

export default function Subscribe() {
  useEffect(() => {
    const tp = window.tp || [];
    tp.push(['setContentSection', 'subscribe']);
    tp.push(['init', function () { window.tp?.experience?.execute?.(); }]);
  }, []);

  const handleSubscribe = (plan) => {
    if (plan.id === 'free') {
      window.tp?.pianoId?.show({ screen: 'register', displayMode: 'modal' });
      return;
    }
    const tp = window.tp || [];
    tp.push(['init', function () {
      window.tp?.offer?.show?.({ displayMode: 'modal' });
    }]);
  };

  return (
    <Layout>
      {/* Page header */}
      <div style={{ textAlign: 'center', maxWidth: 640, margin: '0 auto 52px' }}>
        <h1 style={{ fontFamily: "'Merriweather', Georgia, serif", fontSize: 40, fontWeight: 700, color: COLORS.neutral, marginBottom: 16, lineHeight: 1.3 }}>
          Meridian Health Membership
        </h1>
        <p style={{ fontSize: 18, color: COLORS.muted, lineHeight: 1.7 }}>
          The clinical depth you need to navigate chronic illness — from breaking treatment news to physician perspectives you won't find anywhere else.
        </p>
      </div>

      {/* Piano Composer — offer display zone */}
      <div className="piano-offer-zone" style={{ marginBottom: 24 }} />

      {/* Plan cards */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 20, maxWidth: 1000, margin: '0 auto 64px' }}>
        {MEMBERSHIP_PLANS.map(plan => (
          <div key={plan.id} style={{ background: plan.highlighted ? `linear-gradient(135deg, ${COLORS.primary} 0%, ${COLORS.primaryDark} 100%)` : 'white', border: plan.highlighted ? 'none' : `1px solid ${COLORS.border}`, borderRadius: 16, padding: '32px 28px', color: plan.highlighted ? 'white' : COLORS.neutral, position: 'relative', boxShadow: plan.highlighted ? '0 8px 36px rgba(27,79,138,0.25)' : 'none' }}>
            {plan.badge && (
              <div style={{ position: 'absolute', top: -12, left: '50%', transform: 'translateX(-50%)', background: COLORS.accent, color: 'white', fontSize: 11, fontWeight: 700, padding: '4px 16px', borderRadius: 20, textTransform: 'uppercase', letterSpacing: '1px', whiteSpace: 'nowrap' }}>
                {plan.badge}
              </div>
            )}

            <h2 style={{ fontFamily: "'Merriweather', Georgia, serif", fontWeight: 700, fontSize: 22, marginBottom: 8 }}>{plan.name}</h2>
            <div style={{ marginBottom: 16 }}>
              <span style={{ fontSize: 30, fontWeight: 800 }}>{plan.price}</span>
              {plan.priceAnnual && (
                <span style={{ fontSize: 13, opacity: 0.7, marginLeft: 8 }}>or {plan.priceAnnual}/year</span>
              )}
            </div>
            <p style={{ fontSize: 14, opacity: plan.highlighted ? 0.88 : undefined, color: plan.highlighted ? undefined : COLORS.muted, lineHeight: 1.7, marginBottom: 22 }}>
              {plan.description}
            </p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 9, marginBottom: 24 }}>
              {plan.features.map(f => (
                <div key={f} style={{ display: 'flex', gap: 9, fontSize: 13, alignItems: 'flex-start' }}>
                  <span style={{ color: plan.highlighted ? '#86EFAC' : COLORS.accent, fontWeight: 700, flexShrink: 0 }}>✓</span>
                  <span style={{ opacity: plan.highlighted ? 0.9 : undefined, color: plan.highlighted ? undefined : COLORS.neutralMid }}>{f}</span>
                </div>
              ))}
            </div>
            <button
              onClick={() => handleSubscribe(plan)}
              style={{ width: '100%', background: plan.highlighted ? 'white' : COLORS.primary, color: plan.highlighted ? COLORS.primary : 'white', border: 'none', padding: '13px', borderRadius: 8, fontWeight: 800, fontSize: 14, cursor: 'pointer' }}
            >
              {plan.cta}
            </button>
          </div>
        ))}
      </div>

      {/* Use case callouts — churn prevention demo */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 20, marginBottom: 48 }}>
        {[
          {
            icon: '🔄',
            title: 'Churn Prevention',
            desc: 'When a subscriber initiates cancellation, Composer surfaces a personalized retention offer — a discount, a pause option, or content-based win-back based on their reading history.',
            color: COLORS.accent,
          },
          {
            icon: '📧',
            title: 'Newsletter-to-Paid',
            desc: 'Free newsletter subscribers reading physician content on-site receive a targeted upgrade prompt, converting engaged readers into Physician Insider subscribers.',
            color: COLORS.sectionPhysician,
          },
          {
            icon: '🎯',
            title: 'Condition Targeting',
            desc: 'After profiling identifies a user\'s condition, Composer delivers personalized course and content offers matched to their specific diagnosis — MS, diabetes, RA, or heart disease.',
            color: COLORS.sectionCourses,
          },
        ].map(({ icon, title, desc, color }) => (
          <div key={title} style={{ background: 'white', border: `1px solid ${COLORS.border}`, borderRadius: 12, padding: '24px 22px' }}>
            <div style={{ fontSize: 32, marginBottom: 12 }}>{icon}</div>
            <h3 style={{ fontWeight: 700, fontSize: 16, color: COLORS.neutral, marginBottom: 8, borderBottom: `2px solid ${color}`, paddingBottom: 8 }}>
              {title}
            </h3>
            <p style={{ fontSize: 13, color: COLORS.muted, lineHeight: 1.7 }}>{desc}</p>
          </div>
        ))}
      </div>
    </Layout>
  );
}

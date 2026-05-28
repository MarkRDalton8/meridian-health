import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import Layout from '../components/Layout';
import { COLORS, NEWSLETTER_TIERS, PHYSICIAN_ARTICLES } from '../data';

export default function Newsletter() {
  useEffect(() => {
    const tp = window.tp || [];
    tp.push(['setContentSection', 'newsletter']);
    tp.push(['init', function () { window.tp?.experience?.execute?.(); }]);
  }, []);

  const handleNewsletterAction = (tier) => {
    if (tier.ctaAction === 'composer_checkout') {
      const tp = window.tp || [];
      tp.push(['init', function () {
        window.tp?.offer?.show?.({ displayMode: 'modal' });
      }]);
    }
  };

  return (
    <Layout>
      {/* Hero */}
      <div style={{ textAlign: 'center', maxWidth: 680, margin: '0 auto 56px' }}>
        <div style={{ fontSize: 11, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '2px', color: COLORS.accent, marginBottom: 14 }}>Newsletters</div>
        <h1 style={{ fontFamily: "'Merriweather', Georgia, serif", fontSize: 40, fontWeight: 700, color: COLORS.neutral, lineHeight: 1.3, marginBottom: 16 }}>
          Health journalism worth reading.<br />Expert opinions worth having.
        </h1>
        <p style={{ fontSize: 18, color: COLORS.muted, lineHeight: 1.7 }}>
          Two tiers. One mission: give you the clinical depth and physician perspective that your health decisions deserve.
        </p>
      </div>

      {/* Piano Composer — newsletter-to-paid upsell for existing free subscribers */}
      {/* Trigger: user has ESP list subscription for free newsletter, show upgrade offer */}
      <div className="piano-newsletter-upsell" style={{ marginBottom: 32 }} />

      {/* Tier cards */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 24, maxWidth: 900, margin: '0 auto 64px' }}>
        {NEWSLETTER_TIERS.map(tier => (
          <div key={tier.id} style={{ background: tier.highlighted ? `linear-gradient(135deg, ${COLORS.sectionPhysician} 0%, #4C1D95 100%)` : 'white', border: tier.highlighted ? 'none' : `1px solid ${COLORS.border}`, borderRadius: 16, padding: '36px 32px', color: tier.highlighted ? 'white' : COLORS.neutral, position: 'relative', boxShadow: tier.highlighted ? '0 8px 40px rgba(109,40,217,0.25)' : 'none' }}>
            {tier.badge && (
              <div style={{ position: 'absolute', top: -12, left: '50%', transform: 'translateX(-50%)', background: COLORS.alert, color: 'white', fontSize: 11, fontWeight: 700, padding: '4px 16px', borderRadius: 20, textTransform: 'uppercase', letterSpacing: '1px', whiteSpace: 'nowrap' }}>
                {tier.badge}
              </div>
            )}

            <div style={{ fontSize: 11, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '1.5px', opacity: tier.highlighted ? 0.75 : undefined, color: tier.highlighted ? undefined : COLORS.muted, marginBottom: 10 }}>
              {tier.frequency}
            </div>
            <h2 style={{ fontFamily: "'Merriweather', Georgia, serif", fontWeight: 700, fontSize: 26, marginBottom: 8, lineHeight: 1.2 }}>{tier.name}</h2>
            <div style={{ marginBottom: 20 }}>
              <span style={{ fontSize: 32, fontWeight: 800 }}>{tier.price}</span>
              {tier.priceAnnual && (
                <span style={{ fontSize: 14, opacity: 0.7, marginLeft: 8 }}>or {tier.priceAnnual}/year</span>
              )}
            </div>
            <p style={{ fontSize: 15, opacity: tier.highlighted ? 0.88 : undefined, color: tier.highlighted ? undefined : COLORS.muted, lineHeight: 1.7, marginBottom: 24 }}>
              {tier.description}
            </p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10, marginBottom: 28 }}>
              {tier.features.map(f => (
                <div key={f} style={{ display: 'flex', gap: 10, fontSize: 14, alignItems: 'flex-start' }}>
                  <span style={{ color: tier.highlighted ? '#86EFAC' : COLORS.accent, fontWeight: 700, flexShrink: 0 }}>✓</span>
                  <span style={{ opacity: tier.highlighted ? 0.9 : undefined, color: tier.highlighted ? undefined : COLORS.neutralMid }}>{f}</span>
                </div>
              ))}
            </div>
            {tier.ctaAction === 'composer_checkout' ? (
              <button
                onClick={() => handleNewsletterAction(tier)}
                style={{ width: '100%', background: 'white', color: COLORS.sectionPhysician, border: 'none', padding: '14px', borderRadius: 8, fontWeight: 800, fontSize: 15, cursor: 'pointer' }}
              >
                {tier.cta}
              </button>
            ) : (
              <button
                onClick={() => {
                  const tp = window.tp || [];
                  tp.push(['init', function () {
                    window.tp?.pianoId?.show?.({ screen: 'register', displayMode: 'modal' });
                  }]);
                }}
                style={{ width: '100%', background: COLORS.primary, color: 'white', border: 'none', padding: '14px', borderRadius: 8, fontWeight: 800, fontSize: 15, cursor: 'pointer' }}
              >
                {tier.cta}
              </button>
            )}
            {tier.highlighted && (
              <div style={{ textAlign: 'center', fontSize: 12, opacity: 0.6, marginTop: 10 }}>Cancel anytime · No commitment</div>
            )}
          </div>
        ))}
      </div>

      {/* Newsletter-to-paid conversion demo section */}
      <div style={{ background: COLORS.alertLight, border: `1px solid ${COLORS.alert}30`, borderRadius: 14, padding: '32px 40px', marginBottom: 48 }}>
        <div style={{ fontSize: 11, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '1px', color: COLORS.alert, marginBottom: 12 }}>Demo Signal</div>
        <h2 style={{ fontFamily: "'Merriweather', Georgia, serif", fontWeight: 700, fontSize: 24, color: COLORS.neutral, marginBottom: 12 }}>
          Already a Health Headlines subscriber?
        </h2>
        <p style={{ fontSize: 15, color: COLORS.neutralMid, lineHeight: 1.7, maxWidth: 560 }}>
          Existing free newsletter subscribers receive a targeted upgrade offer — Composer identifies them via Piano ESP's subscriber data and surfaces a personalized conversion prompt at the right moment.
        </p>
      </div>

      {/* Recent physician essays preview */}
      <div>
        <h2 style={{ fontFamily: "'Merriweather', Georgia, serif", fontSize: 28, fontWeight: 700, color: COLORS.neutral, marginBottom: 8, textAlign: 'center' }}>
          Sample: Physician Insider Essays
        </h2>
        <p style={{ fontSize: 15, color: COLORS.muted, textAlign: 'center', marginBottom: 32 }}>
          The kind of content waiting in your inbox, twice a week.
        </p>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 20 }}>
          {PHYSICIAN_ARTICLES.slice(0, 2).map(article => (
            <Link key={article.id} to={`/physician-insights/${article.slug}`} style={{ display: 'block', background: 'white', border: `1px solid ${COLORS.border}`, borderRadius: 12, padding: '24px 26px', textDecoration: 'none', borderLeft: `4px solid ${COLORS.sectionPhysician}` }}>
              <div style={{ fontSize: 10, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '1px', color: COLORS.sectionPhysician, marginBottom: 8 }}>{article.category}</div>
              <h3 style={{ fontFamily: "'Merriweather', Georgia, serif", fontWeight: 700, fontSize: 16, color: COLORS.neutral, lineHeight: 1.4, marginBottom: 10 }}>
                {article.title}
              </h3>
              <p style={{ fontSize: 13, color: COLORS.muted, lineHeight: 1.6, fontStyle: 'italic', marginBottom: 12 }}>
                "{article.intro}"
              </p>
              <div style={{ fontSize: 12, color: COLORS.muted }}>
                <strong style={{ color: COLORS.neutralMid }}>{article.byline}</strong> · {article.date}
              </div>
            </Link>
          ))}
        </div>
      </div>
    </Layout>
  );
}

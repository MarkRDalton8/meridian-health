import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import Layout from '../components/Layout';
import { COLORS, PHYSICIAN_ARTICLES } from '../data';

export default function PhysicianInsightsList() {
  useEffect(() => {
    const tp = window.tp || [];
    tp.push(['setContentSection', 'physician-insights']);
    tp.push(['init', function () { window.tp?.experience?.execute?.(); }]);
  }, []);

  const [featured, ...rest] = PHYSICIAN_ARTICLES;

  return (
    <Layout>
      {/* Section header */}
      <div style={{ borderBottom: `3px solid ${COLORS.sectionPhysician}`, paddingBottom: 20, marginBottom: 36 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 16, flexWrap: 'wrap' }}>
          <div>
            <div style={{ fontSize: 11, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '2px', color: COLORS.sectionPhysician, marginBottom: 8 }}>
              Premium · Physician Insider
            </div>
            <h1 style={{ fontFamily: "'Merriweather', Georgia, serif", fontSize: 36, fontWeight: 700, color: COLORS.neutral, marginBottom: 10 }}>
              Physician Insights
            </h1>
            <p style={{ fontSize: 16, color: COLORS.muted, maxWidth: 580 }}>
              First-person essays from leading physicians — the clinical perspectives, hard conversations, and honest assessments that shape patient care.
            </p>
          </div>
          <div style={{ marginLeft: 'auto', background: COLORS.sectionPhysician + '12', border: `1px solid ${COLORS.sectionPhysician}30`, borderRadius: 10, padding: '16px 20px', minWidth: 200, textAlign: 'center' }}>
            <div style={{ fontWeight: 800, fontSize: 24, color: COLORS.sectionPhysician, marginBottom: 4 }}>Physician Insider</div>
            <div style={{ fontSize: 13, color: COLORS.muted, marginBottom: 12 }}>Bi-weekly in your inbox</div>
            <Link to="/newsletter" style={{ display: 'block', background: COLORS.sectionPhysician, color: 'white', textDecoration: 'none', padding: '8px 16px', borderRadius: 6, fontWeight: 700, fontSize: 13 }}>
              Start Free Trial
            </Link>
          </div>
        </div>
      </div>

      {/* Piano Composer — paywall or upsell for this section */}
      <div className="piano-physician-insights-top" style={{ marginBottom: 24 }} />

      {/* Featured article */}
      <div style={{ background: `linear-gradient(135deg, ${COLORS.sectionPhysician}15 0%, ${COLORS.primaryLight} 100%)`, border: `1px solid ${COLORS.sectionPhysician}30`, borderRadius: 14, padding: '32px 36px', marginBottom: 32, borderLeft: `5px solid ${COLORS.sectionPhysician}` }}>
        <div style={{ display: 'flex', gap: 8, marginBottom: 14 }}>
          <span style={{ fontSize: 10, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '1px', color: COLORS.sectionPhysician }}>Featured Essay</span>
          <span style={{ fontSize: 10, background: COLORS.accent, color: 'white', padding: '2px 8px', borderRadius: 20, fontWeight: 600 }}>Physician Insider</span>
        </div>
        <h2 style={{ fontFamily: "'Merriweather', Georgia, serif", fontSize: 28, fontWeight: 700, color: COLORS.neutral, lineHeight: 1.3, marginBottom: 14 }}>
          {featured.title}
        </h2>
        <p style={{ fontSize: 16, color: COLORS.neutralMid, lineHeight: 1.7, fontStyle: 'italic', marginBottom: 20 }}>
          "{featured.intro}"
        </p>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 16 }}>
          <div>
            <div style={{ fontWeight: 700, fontSize: 15, color: COLORS.neutral }}>{featured.byline}</div>
            <div style={{ fontSize: 13, color: COLORS.muted }}>{featured.bylineTitle}</div>
            <div style={{ fontSize: 12, color: COLORS.muted, marginTop: 3 }}>{featured.date} · {featured.readTime} read</div>
          </div>
          <Link to={`/physician-insights/${featured.slug}`} style={{ background: COLORS.sectionPhysician, color: 'white', textDecoration: 'none', padding: '10px 24px', borderRadius: 6, fontWeight: 700, fontSize: 14 }}>
            Read Full Essay
          </Link>
        </div>
      </div>

      {/* Article grid */}
      <div style={{ display: 'grid', gridTemplateColumns: '3fr 2fr', gap: 32 }}>
        <div>
          {rest.map(article => (
            <Link key={article.id} to={`/physician-insights/${article.slug}`} style={{ display: 'flex', flexDirection: 'column', gap: 8, padding: '20px 0', borderBottom: `1px solid ${COLORS.border}`, textDecoration: 'none' }}>
              <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
                <span style={{ fontSize: 10, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '1px', color: COLORS.sectionPhysician }}>
                  {article.category}
                </span>
                <span style={{ fontSize: 10, background: COLORS.accent, color: 'white', padding: '2px 8px', borderRadius: 20, fontWeight: 600 }}>Physician Insider</span>
              </div>
              <h3 style={{ fontFamily: "'Merriweather', Georgia, serif", fontWeight: 700, fontSize: 18, color: COLORS.neutral, lineHeight: 1.4 }}>
                {article.title}
              </h3>
              <p style={{ fontSize: 14, color: COLORS.muted, lineHeight: 1.6, fontStyle: 'italic' }}>
                "{article.intro}"
              </p>
              <div style={{ fontSize: 13, color: COLORS.muted }}>
                <strong style={{ color: COLORS.neutralMid }}>{article.byline}</strong> · {article.bylineTitle} · {article.date}
              </div>
            </Link>
          ))}
        </div>

        {/* Sidebar — newsletter conversion */}
        <div>
          <div style={{ background: `linear-gradient(135deg, ${COLORS.sectionPhysician} 0%, #4C1D95 100%)`, borderRadius: 12, padding: '28px 24px', color: 'white', marginBottom: 24, position: 'sticky', top: 96 }}>
            <div style={{ fontSize: 11, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '1px', opacity: 0.75, marginBottom: 12 }}>Physician Insider Newsletter</div>
            <h3 style={{ fontWeight: 800, fontSize: 20, lineHeight: 1.3, marginBottom: 12 }}>
              The views physicians wish they could share in the clinic.
            </h3>
            <p style={{ fontSize: 14, opacity: 0.88, lineHeight: 1.7, marginBottom: 20 }}>
              Bi-weekly essays from frontline specialists — neurologists, cardiologists, rheumatologists — writing about what patients actually need to know.
            </p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 8, marginBottom: 20 }}>
              {['Physician-authored perspective essays', 'Clinical research summaries', 'Monthly Ask-a-Specialist Q&A', 'Early course access'].map(f => (
                <div key={f} style={{ display: 'flex', gap: 8, fontSize: 13, alignItems: 'flex-start' }}>
                  <span style={{ color: '#86EFAC', fontWeight: 700, flexShrink: 0 }}>✓</span>
                  <span style={{ opacity: 0.9 }}>{f}</span>
                </div>
              ))}
            </div>
            <Link to="/newsletter" style={{ display: 'block', textAlign: 'center', background: 'white', color: COLORS.sectionPhysician, textDecoration: 'none', padding: '12px', borderRadius: 6, fontWeight: 800, fontSize: 14 }}>
              Start Free Trial — $9.99/mo
            </Link>
            <div style={{ textAlign: 'center', fontSize: 12, opacity: 0.65, marginTop: 8 }}>Cancel anytime</div>
          </div>
        </div>
      </div>
    </Layout>
  );
}

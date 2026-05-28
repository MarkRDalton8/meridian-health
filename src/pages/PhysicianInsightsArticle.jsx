import { useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import Layout from '../components/Layout';
import { COLORS, PHYSICIAN_ARTICLES, CONDITIONS, PIANO_CONFIG } from '../data';

export default function PhysicianInsightsArticle() {
  const { slug } = useParams();
  const article = PHYSICIAN_ARTICLES.find(a => a.slug === slug);
  const condition = article ? CONDITIONS.find(c => c.slug === article.condition) : null;
  const otherArticles = PHYSICIAN_ARTICLES.filter(a => a.slug !== slug).slice(0, 3);

  useEffect(() => {
    if (!article) return;
    const tp = window.tp || [];
    tp.push(['setContentSection', 'physician-insights']);
    tp.push(['setTags', article.tags || []]);
    tp.push(['setCustomVariable', 'content_type', 'physician_essay']);
    tp.push(['init', function () { window.tp?.experience?.execute?.(); }]);
  }, [article]);

  if (!article) {
    return (
      <Layout>
        <div style={{ textAlign: 'center', padding: '80px 0' }}>
          <h1>Article not found</h1>
          <Link to="/physician-insights" style={{ color: COLORS.primary }}>← Physician Insights</Link>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div style={{ maxWidth: 780, margin: '0 auto' }}>
        {/* Breadcrumb */}
        <div style={{ fontSize: 13, color: COLORS.muted, marginBottom: 24 }}>
          <Link to="/physician-insights" style={{ color: COLORS.sectionPhysician, textDecoration: 'none' }}>Physician Insights</Link>
          {condition && <> · <Link to={`/conditions/${condition.slug}`} style={{ color: COLORS.sectionPhysician, textDecoration: 'none' }}>{condition.name}</Link></>}
        </div>

        {/* Article header */}
        <div style={{ marginBottom: 32 }}>
          <div style={{ display: 'flex', gap: 8, marginBottom: 14 }}>
            <span style={{ fontSize: 11, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '1px', color: COLORS.sectionPhysician }}>
              {article.category}
            </span>
            <span style={{ fontSize: 11, background: COLORS.accent, color: 'white', padding: '2px 10px', borderRadius: 20, fontWeight: 600 }}>Physician Insider</span>
          </div>
          <h1 style={{ fontFamily: "'Merriweather', Georgia, serif", fontSize: 36, fontWeight: 700, color: COLORS.neutral, lineHeight: 1.3, marginBottom: 16 }}>
            {article.title}
          </h1>
          <p style={{ fontSize: 19, color: COLORS.neutralMid, lineHeight: 1.75, marginBottom: 24, fontStyle: 'italic', fontFamily: "'Merriweather', Georgia, serif" }}>
            {article.intro}
          </p>

          {/* Author byline */}
          <div style={{ display: 'flex', gap: 16, alignItems: 'center', padding: '16px 20px', background: COLORS.sectionPhysician + '10', borderRadius: 10, marginBottom: 24, border: `1px solid ${COLORS.sectionPhysician}25` }}>
            <div style={{ width: 48, height: 48, background: COLORS.sectionPhysician, borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontWeight: 700, fontSize: 18, flexShrink: 0 }}>
              {article.byline.split(' ').slice(-1)[0][0]}
            </div>
            <div>
              <div style={{ fontWeight: 700, fontSize: 15, color: COLORS.neutral }}>{article.byline}</div>
              <div style={{ fontSize: 13, color: COLORS.muted }}>{article.bylineTitle}</div>
            </div>
            <div style={{ marginLeft: 'auto', fontSize: 13, color: COLORS.muted, textAlign: 'right' }}>
              <div>{article.date}</div>
              <div>{article.readTime} read</div>
            </div>
          </div>
        </div>

        {/* Piano Composer — hard gate for Physician Insider content */}
        {/* Composer will inject paywall/upsell at this container for non-subscribers */}
        <div className="piano-physician-content" data-piano-resource-id={PIANO_CONFIG.PHYSICIAN_RESOURCE_ID}>
          {/* Teaser — first paragraph visible to all */}
          <div style={{ lineHeight: 1.9, fontSize: 17, color: COLORS.neutralMid }}>
            {article.body.slice(0, 1).map((p, i) => (
              <p key={i} style={{ marginBottom: 22, fontFamily: "'Merriweather', Georgia, serif" }}>{p}</p>
            ))}
          </div>

          {/* Locked body */}
          <div className="piano-locked-body" style={{ lineHeight: 1.9, fontSize: 17, color: COLORS.neutralMid }}>
            {article.body.slice(1).map((p, i) => (
              <p key={i} style={{ marginBottom: 22 }}>{p}</p>
            ))}
          </div>
        </div>

        {/* Related articles */}
        <div style={{ marginTop: 56, paddingTop: 32, borderTop: `1px solid ${COLORS.border}` }}>
          <h3 style={{ fontFamily: "'Merriweather', Georgia, serif", fontSize: 20, fontWeight: 700, color: COLORS.neutral, marginBottom: 20 }}>More Physician Perspectives</h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 0 }}>
            {otherArticles.map(a => (
              <Link key={a.id} to={`/physician-insights/${a.slug}`} style={{ display: 'flex', gap: 16, padding: '16px 0', borderBottom: `1px solid ${COLORS.border}`, textDecoration: 'none' }}>
                <div>
                  <div style={{ fontSize: 10, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '1px', color: COLORS.sectionPhysician, marginBottom: 5 }}>{a.category}</div>
                  <h4 style={{ fontFamily: "'Merriweather', Georgia, serif", fontWeight: 700, fontSize: 15, color: COLORS.neutral, lineHeight: 1.4, marginBottom: 5 }}>{a.title}</h4>
                  <div style={{ fontSize: 12, color: COLORS.muted }}>{a.byline} · {a.date}</div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </Layout>
  );
}

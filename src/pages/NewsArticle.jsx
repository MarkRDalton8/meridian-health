import { useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import Layout from '../components/Layout';
import { COLORS, NEWS_ARTICLES, CONDITIONS, PIANO_CONFIG } from '../data';

export default function NewsArticle() {
  const { slug } = useParams();
  const article = NEWS_ARTICLES.find(a => a.slug === slug);
  const condition = article ? CONDITIONS.find(c => c.slug === article.condition) : null;

  useEffect(() => {
    if (!article) return;
    const tp = window.tp || [];
    tp.push(['setContentSection', 'news']);
    tp.push(['setTags', article.tags || []]);
    if (article.locked) {
      tp.push(['setCustomVariable', 'content_type', 'premium']);
    }
    tp.push(['init', function () { window.tp?.experience?.execute?.(); }]);
  }, [article]);

  if (!article) {
    return (
      <Layout>
        <div style={{ textAlign: 'center', padding: '80px 0' }}>
          <h1 style={{ color: COLORS.neutral }}>Article not found</h1>
          <Link to="/news" style={{ color: COLORS.primary, marginTop: 16, display: 'block' }}>← Back to News</Link>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div style={{ maxWidth: 780, margin: '0 auto' }}>
        {/* Breadcrumb */}
        <div style={{ fontSize: 13, color: COLORS.muted, marginBottom: 24 }}>
          <Link to="/news" style={{ color: COLORS.primary, textDecoration: 'none' }}>News</Link>
          {condition && <> · <Link to={`/conditions/${condition.slug}`} style={{ color: COLORS.primary, textDecoration: 'none' }}>{condition.name}</Link></>}
          <span> · {article.category}</span>
        </div>

        {/* Article header */}
        <div style={{ marginBottom: 32 }}>
          <div style={{ display: 'flex', gap: 8, marginBottom: 14, flexWrap: 'wrap' }}>
            <span style={{ fontSize: 11, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '1px', color: COLORS.primary }}>
              {article.category}
            </span>
            {condition && (
              <span style={{ fontSize: 11, background: condition.color + '18', color: condition.color, padding: '2px 10px', borderRadius: 20, fontWeight: 700 }}>
                {condition.name}
              </span>
            )}
          </div>
          <h1 style={{ fontFamily: "'Merriweather', Georgia, serif", fontSize: 34, fontWeight: 700, color: COLORS.neutral, lineHeight: 1.3, marginBottom: 16 }}>
            {article.title}
          </h1>
          <p style={{ fontSize: 18, color: COLORS.neutralMid, lineHeight: 1.7, marginBottom: 20, fontStyle: 'italic', fontFamily: "'Merriweather', Georgia, serif" }}>
            {article.excerpt}
          </p>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12, fontSize: 13, color: COLORS.muted, paddingBottom: 20, borderBottom: `1px solid ${COLORS.border}` }}>
            <span style={{ fontWeight: 600, color: COLORS.neutralMid }}>{article.byline}</span>
            <span>·</span>
            <span>{article.date}</span>
            <span>·</span>
            <span>{article.readTime} read</span>
          </div>
        </div>

        {/* Piano Composer — metered content container */}
        {/* Composer will inject a paywall into .piano-meter-content when limit is reached */}
        <div className="piano-meter-content" data-piano-resource-id={PIANO_CONFIG.PREMIUM_RESOURCE_ID}>
          <div style={{ lineHeight: 1.85, fontSize: 17, color: COLORS.neutralMid }}>
            {article.body.map((paragraph, i) => (
              <p key={i} style={{ marginBottom: 22, fontFamily: i === 0 ? "'Merriweather', Georgia, serif" : 'inherit' }}>
                {paragraph}
              </p>
            ))}
          </div>
        </div>

        {/* Related Condition Hub */}
        {condition && (
          <div style={{ background: COLORS.primaryLight, border: `1px solid ${COLORS.border}`, borderRadius: 12, padding: '24px 28px', marginTop: 40 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
              <span style={{ fontSize: 36 }}>{condition.icon}</span>
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: 12, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '1px', color: COLORS.primary, marginBottom: 4 }}>Related Condition</div>
                <h3 style={{ fontWeight: 700, fontSize: 18, color: COLORS.neutral, marginBottom: 4 }}>{condition.name}</h3>
                <p style={{ fontSize: 14, color: COLORS.muted }}>{condition.tagline}</p>
              </div>
              <Link to={`/conditions/${condition.slug}`} style={{ background: COLORS.primary, color: 'white', textDecoration: 'none', padding: '10px 20px', borderRadius: 6, fontWeight: 700, fontSize: 13, whiteSpace: 'nowrap' }}>
                Explore Hub
              </Link>
            </div>
          </div>
        )}

        {/* Courses promo — condition-specific */}
        <div style={{ background: 'white', border: `1px solid ${COLORS.border}`, borderRadius: 12, padding: '24px 28px', marginTop: 20 }}>
          <h3 style={{ fontWeight: 700, fontSize: 17, color: COLORS.neutral, marginBottom: 6 }}>Go deeper with a Meridian course</h3>
          <p style={{ fontSize: 14, color: COLORS.muted, marginBottom: 16 }}>
            Our eLearning courses address the real-life questions that news articles don't — workplace rights, relationships, financial planning, and more.
          </p>
          <Link to="/courses" style={{ fontWeight: 700, fontSize: 14, color: COLORS.primary, textDecoration: 'none' }}>Browse all courses →</Link>
        </div>
      </div>
    </Layout>
  );
}

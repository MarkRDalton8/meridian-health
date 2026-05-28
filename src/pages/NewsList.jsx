import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import Layout from '../components/Layout';
import { COLORS, NEWS_ARTICLES, CONDITIONS } from '../data';

function ArticleCard({ article }) {
  const condition = CONDITIONS.find(c => c.slug === article.condition);
  return (
    <Link to={`/news/${article.slug}`} style={{ display: 'block', background: 'white', border: `1px solid ${COLORS.border}`, borderRadius: 10, overflow: 'hidden', textDecoration: 'none', transition: 'box-shadow 0.2s ease' }}
      onMouseEnter={e => e.currentTarget.style.boxShadow = '0 4px 16px rgba(0,0,0,0.08)'}
      onMouseLeave={e => e.currentTarget.style.boxShadow = 'none'}
    >
      {condition && <div style={{ height: 4, background: condition.color }} />}
      <div style={{ padding: '20px 22px' }}>
        <div style={{ display: 'flex', gap: 8, marginBottom: 10, flexWrap: 'wrap' }}>
          <span style={{ fontSize: 10, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '1px', color: COLORS.primary }}>
            {article.category}
          </span>
          {condition && (
            <span style={{ fontSize: 10, background: COLORS.background, color: COLORS.muted, padding: '2px 8px', borderRadius: 20, fontWeight: 600 }}>
              {condition.shortName}
            </span>
          )}
        </div>
        <h2 style={{ fontFamily: "'Merriweather', Georgia, serif", fontWeight: 700, fontSize: 17, color: COLORS.neutral, lineHeight: 1.4, marginBottom: 8 }}>
          {article.title}
        </h2>
        <p style={{ fontSize: 14, color: COLORS.muted, lineHeight: 1.6, marginBottom: 12 }}>
          {article.excerpt}
        </p>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: 12, color: COLORS.muted }}>
          <span>{article.byline}</span>
          <span>{article.date} · {article.readTime} read</span>
        </div>
      </div>
    </Link>
  );
}

export default function NewsList() {
  useEffect(() => {
    const tp = window.tp || [];
    tp.push(['setContentSection', 'news']);
    tp.push(['init', function () { window.tp?.experience?.execute?.(); }]);
  }, []);

  return (
    <Layout>
      <div style={{ marginBottom: 36 }}>
        <h1 style={{ fontFamily: "'Merriweather', Georgia, serif", fontSize: 36, fontWeight: 700, color: COLORS.neutral, marginBottom: 10 }}>Health News</h1>
        <p style={{ fontSize: 16, color: COLORS.muted, maxWidth: 600 }}>
          Evidence-based health and medical news, curated and written by Meridian's clinical editorial team.
        </p>
      </div>

      {/* Piano Composer zone — top-of-page newsletter or metered content prompt */}
      <div className="piano-news-top" style={{ marginBottom: 24 }} />

      <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: 32 }}>
        {/* Main article grid */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
          {NEWS_ARTICLES.map(a => <ArticleCard key={a.id} article={a} />)}
        </div>

        {/* Sidebar */}
        <div>
          {/* Newsletter promo */}
          <div style={{ background: `linear-gradient(135deg, ${COLORS.primary} 0%, ${COLORS.primaryDark} 100%)`, borderRadius: 12, padding: '24px 22px', color: 'white', marginBottom: 24 }}>
            <div style={{ fontSize: 11, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '1px', opacity: 0.75, marginBottom: 10 }}>Free Newsletter</div>
            <h3 style={{ fontWeight: 800, fontSize: 17, lineHeight: 1.3, marginBottom: 10 }}>Health Headlines, every week</h3>
            <p style={{ fontSize: 13, opacity: 0.85, lineHeight: 1.6, marginBottom: 16 }}>
              The week's most important health stories, curated for patients managing chronic conditions.
            </p>
            <Link to="/newsletter" style={{ display: 'inline-block', background: 'white', color: COLORS.primary, padding: '8px 20px', borderRadius: 6, fontWeight: 700, fontSize: 13, textDecoration: 'none' }}>
              Subscribe Free
            </Link>
          </div>

          {/* Conditions */}
          <div style={{ background: 'white', border: `1px solid ${COLORS.border}`, borderRadius: 12, padding: '20px 22px' }}>
            <div style={{ fontSize: 11, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '1px', color: COLORS.muted, marginBottom: 14 }}>Browse by Condition</div>
            {CONDITIONS.map(c => (
              <Link key={c.slug} to={`/conditions/${c.slug}`} style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '10px 0', borderBottom: `1px solid ${COLORS.border}`, textDecoration: 'none' }}>
                <span style={{ fontSize: 20 }}>{c.icon}</span>
                <div>
                  <div style={{ fontWeight: 600, fontSize: 14, color: COLORS.neutral }}>{c.name}</div>
                  <div style={{ fontSize: 12, color: COLORS.muted }}>{c.affectedCount} in US</div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </Layout>
  );
}

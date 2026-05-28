import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import Layout from '../components/Layout';
import { COLORS, CONDITIONS, NEWS_ARTICLES, COURSES } from '../data';

export default function ConditionsList() {
  useEffect(() => {
    const tp = window.tp || [];
    tp.push(['setContentSection', 'conditions']);
    tp.push(['init', function () { window.tp?.experience?.execute?.(); }]);
  }, []);

  return (
    <Layout>
      <div style={{ marginBottom: 40 }}>
        <h1 style={{ fontFamily: "'Merriweather', Georgia, serif", fontSize: 36, fontWeight: 700, color: COLORS.neutral, marginBottom: 10 }}>
          Conditions
        </h1>
        <p style={{ fontSize: 16, color: COLORS.muted, maxWidth: 600 }}>
          In-depth news, physician perspectives, and practical life guidance for patients navigating chronic illness.
        </p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 24 }}>
        {CONDITIONS.map(condition => {
          const relatedNews = NEWS_ARTICLES.filter(a => a.condition === condition.slug).slice(0, 2);
          const relatedCourse = COURSES.find(c => c.slug === condition.featuredCourseSlug);

          return (
            <div key={condition.slug} style={{ background: 'white', border: `1px solid ${COLORS.border}`, borderRadius: 12, overflow: 'hidden', transition: 'box-shadow 0.2s ease' }}
              onMouseEnter={e => e.currentTarget.style.boxShadow = '0 4px 20px rgba(0,0,0,0.08)'}
              onMouseLeave={e => e.currentTarget.style.boxShadow = 'none'}
            >
              <div style={{ height: 6, background: condition.color }} />
              <div style={{ padding: '24px 28px' }}>
                <div style={{ display: 'flex', gap: 16, alignItems: 'flex-start', marginBottom: 16 }}>
                  <span style={{ fontSize: 40 }}>{condition.icon}</span>
                  <div>
                    <h2 style={{ fontFamily: "'Merriweather', Georgia, serif", fontWeight: 700, fontSize: 22, color: COLORS.neutral, marginBottom: 4 }}>
                      {condition.name}
                    </h2>
                    <div style={{ fontSize: 12, color: COLORS.muted }}>
                      {condition.affectedCount} Americans affected
                    </div>
                  </div>
                </div>

                <p style={{ fontSize: 14, color: COLORS.neutralMid, lineHeight: 1.7, marginBottom: 20 }}>
                  {condition.tagline}
                </p>

                {relatedNews.length > 0 && (
                  <div style={{ marginBottom: 16 }}>
                    <div style={{ fontSize: 11, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '1px', color: COLORS.muted, marginBottom: 8 }}>Latest News</div>
                    {relatedNews.map(a => (
                      <Link key={a.id} to={`/news/${a.slug}`} style={{ display: 'block', fontSize: 13, color: COLORS.neutral, textDecoration: 'none', lineHeight: 1.4, padding: '4px 0', borderBottom: `1px solid ${COLORS.border}`, fontWeight: 500 }}>
                        {a.title}
                      </Link>
                    ))}
                  </div>
                )}

                {relatedCourse && (
                  <div style={{ background: COLORS.background, borderRadius: 8, padding: '12px 14px', marginBottom: 16, display: 'flex', gap: 10, alignItems: 'center' }}>
                    <div style={{ width: 4, height: 40, background: relatedCourse.coverColor, borderRadius: 2, flexShrink: 0 }} />
                    <div>
                      <div style={{ fontSize: 11, fontWeight: 700, textTransform: 'uppercase', color: COLORS.muted, letterSpacing: '1px', marginBottom: 3 }}>Featured Course</div>
                      <Link to={`/courses/${relatedCourse.slug}`} style={{ fontSize: 13, fontWeight: 600, color: COLORS.neutral, textDecoration: 'none' }}>
                        {relatedCourse.title}
                      </Link>
                    </div>
                  </div>
                )}

                <Link to={`/conditions/${condition.slug}`} style={{ display: 'inline-block', background: condition.color, color: 'white', textDecoration: 'none', padding: '8px 20px', borderRadius: 6, fontWeight: 700, fontSize: 13 }}>
                  Explore {condition.shortName} Hub
                </Link>
              </div>
            </div>
          );
        })}
      </div>
    </Layout>
  );
}

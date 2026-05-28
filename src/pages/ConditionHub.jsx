import { useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import Layout from '../components/Layout';
import { COLORS, CONDITIONS, NEWS_ARTICLES, PHYSICIAN_ARTICLES, COURSES } from '../data';

function SectionHeader({ label, color, linkTo, linkLabel }) {
  return (
    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', borderBottom: `3px solid ${color}`, paddingBottom: 10, marginBottom: 16 }}>
      <h2 style={{ fontSize: 13, fontWeight: 800, textTransform: 'uppercase', letterSpacing: '2px', color }}>{label}</h2>
      {linkTo && <Link to={linkTo} style={{ fontSize: 12, color: COLORS.muted, textDecoration: 'none', fontWeight: 600 }}>{linkLabel || 'View all →'}</Link>}
    </div>
  );
}

export default function ConditionHub() {
  const { slug } = useParams();
  const condition = CONDITIONS.find(c => c.slug === slug);

  useEffect(() => {
    if (!condition) return;
    const tp = window.tp || [];
    tp.push(['setContentSection', 'conditions']);
    tp.push(['setTags', [condition.tag, 'condition-hub']]);
    tp.push(['init', function () { window.tp?.experience?.execute?.(); }]);
  }, [condition]);

  if (!condition) {
    return (
      <Layout>
        <div style={{ textAlign: 'center', padding: '80px 0' }}>
          <h1>Condition not found</h1>
          <Link to="/conditions" style={{ color: COLORS.primary }}>← All Conditions</Link>
        </div>
      </Layout>
    );
  }

  const relatedNews = NEWS_ARTICLES.filter(a => a.condition === slug);
  const relatedPhysician = PHYSICIAN_ARTICLES.filter(a => a.condition === slug);
  const relatedCourses = COURSES.filter(c => c.condition === slug);

  return (
    <Layout>
      {/* Condition Hero */}
      <div style={{ background: `linear-gradient(135deg, ${condition.color} 0%, ${condition.color}CC 100%)`, borderRadius: 16, padding: '48px 48px', marginBottom: 48, color: 'white' }}>
        <div style={{ display: 'flex', gap: 24, alignItems: 'flex-start' }}>
          <div style={{ fontSize: 64, lineHeight: 1 }}>{condition.icon}</div>
          <div>
            <div style={{ fontSize: 12, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '1.5px', opacity: 0.75, marginBottom: 8 }}>
              Condition Hub · {condition.affectedCount} Americans
            </div>
            <h1 style={{ fontFamily: "'Merriweather', Georgia, serif", fontSize: 40, fontWeight: 700, lineHeight: 1.2, marginBottom: 14 }}>
              {condition.name}
            </h1>
            <p style={{ fontSize: 17, opacity: 0.9, lineHeight: 1.7, maxWidth: 600 }}>
              {condition.description}
            </p>
          </div>
        </div>
      </div>

      {/* Piano Composer zone — condition-specific targeting */}
      <div className={`piano-condition-hub piano-condition-${condition.tag}`} style={{ marginBottom: 24 }} />

      <div style={{ display: 'grid', gridTemplateColumns: '3fr 2fr', gap: 36 }}>
        {/* Main content column */}
        <div>
          {/* Latest News */}
          {relatedNews.length > 0 && (
            <div style={{ marginBottom: 40 }}>
              <SectionHeader label={`${condition.shortName} News`} color={condition.color} linkTo="/news" linkLabel="All News →" />
              <div style={{ display: 'flex', flexDirection: 'column', gap: 0 }}>
                {relatedNews.map(article => (
                  <Link key={article.id} to={`/news/${article.slug}`} style={{ display: 'flex', gap: 16, padding: '16px 0', borderBottom: `1px solid ${COLORS.border}`, textDecoration: 'none' }}>
                    <div style={{ flex: 1 }}>
                      <div style={{ fontSize: 10, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '1px', color: COLORS.primary, marginBottom: 6 }}>{article.category}</div>
                      <h3 style={{ fontFamily: "'Merriweather', Georgia, serif", fontWeight: 700, fontSize: 16, color: COLORS.neutral, lineHeight: 1.4, marginBottom: 6 }}>{article.title}</h3>
                      <p style={{ fontSize: 13, color: COLORS.muted, lineHeight: 1.5 }}>{article.excerpt}</p>
                      <div style={{ fontSize: 12, color: COLORS.muted, marginTop: 6 }}>{article.date} · {article.readTime} read</div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          )}

          {/* Physician Insights for this condition */}
          {relatedPhysician.length > 0 && (
            <div style={{ marginBottom: 40 }}>
              <SectionHeader label="Physician Perspectives" color={COLORS.sectionPhysician} linkTo="/physician-insights" linkLabel="All Insights →" />
              <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
                {relatedPhysician.slice(0, 3).map(article => (
                  <Link key={article.id} to={`/physician-insights/${article.slug}`} style={{ display: 'block', background: 'white', border: `1px solid ${COLORS.border}`, borderRadius: 10, padding: '20px 22px', textDecoration: 'none', borderLeft: `4px solid ${COLORS.sectionPhysician}` }}>
                    <div style={{ display: 'flex', gap: 8, marginBottom: 8, alignItems: 'center' }}>
                      <span style={{ fontSize: 10, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '1px', color: COLORS.sectionPhysician }}>Physician Essay</span>
                      <span style={{ fontSize: 10, background: COLORS.accent, color: 'white', padding: '2px 8px', borderRadius: 20, fontWeight: 600 }}>Physician Insider</span>
                    </div>
                    <h3 style={{ fontFamily: "'Merriweather', Georgia, serif", fontWeight: 700, fontSize: 16, color: COLORS.neutral, lineHeight: 1.4, marginBottom: 8 }}>
                      {article.title}
                    </h3>
                    <p style={{ fontSize: 13, color: COLORS.muted, lineHeight: 1.5, marginBottom: 10, fontStyle: 'italic' }}>
                      "{article.intro}"
                    </p>
                    <div style={{ fontSize: 12, color: COLORS.muted }}>
                      <strong style={{ color: COLORS.neutralMid }}>{article.byline}</strong> · {article.bylineTitle}
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Sidebar */}
        <div>
          {/* eLearning courses for this condition */}
          {relatedCourses.length > 0 && (
            <div style={{ marginBottom: 28 }}>
              <SectionHeader label="Life Guidance Courses" color={COLORS.sectionCourses} />
              <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
                {relatedCourses.map(course => (
                  <Link key={course.id} to={`/courses/${course.slug}`} style={{ display: 'block', background: 'white', border: `1px solid ${COLORS.border}`, borderRadius: 10, overflow: 'hidden', textDecoration: 'none', transition: 'box-shadow 0.2s ease' }}
                    onMouseEnter={e => e.currentTarget.style.boxShadow = '0 4px 16px rgba(0,0,0,0.08)'}
                    onMouseLeave={e => e.currentTarget.style.boxShadow = 'none'}
                  >
                    <div style={{ height: 4, background: course.coverColor }} />
                    <div style={{ padding: '16px 18px' }}>
                      <div style={{ fontSize: 10, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '1px', color: course.coverColor, marginBottom: 6 }}>
                        {course.duration}
                      </div>
                      <div style={{ fontWeight: 700, fontSize: 14, color: COLORS.neutral, lineHeight: 1.4, marginBottom: 6 }}>
                        {course.title}
                      </div>
                      <div style={{ fontSize: 12, color: COLORS.muted }}>
                        {course.enrolled.toLocaleString()} enrolled · ⭐ {course.rating}
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          )}

          {/* Tagline card */}
          <div style={{ background: condition.color + '12', border: `1px solid ${condition.color}30`, borderRadius: 12, padding: '20px 22px', marginBottom: 24 }}>
            <div style={{ fontSize: 12, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '1px', color: condition.color, marginBottom: 10 }}>Living with {condition.shortName}</div>
            <p style={{ fontSize: 14, color: COLORS.neutralMid, lineHeight: 1.7, fontStyle: 'italic' }}>
              "{condition.tagline}"
            </p>
          </div>

          {/* Newsletter upsell */}
          <div style={{ background: 'white', border: `1px solid ${COLORS.border}`, borderRadius: 12, padding: '20px 22px' }}>
            <div style={{ fontSize: 12, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '1px', color: COLORS.muted, marginBottom: 10 }}>Physician Insider</div>
            <p style={{ fontSize: 14, color: COLORS.neutral, lineHeight: 1.6, marginBottom: 14 }}>
              Get physician-authored perspectives on {condition.name} delivered twice a week — with clinical depth news articles can't match.
            </p>
            <Link to="/newsletter" style={{ display: 'block', textAlign: 'center', background: COLORS.primary, color: 'white', textDecoration: 'none', padding: '10px', borderRadius: 6, fontWeight: 700, fontSize: 13 }}>
              Try Physician Insider
            </Link>
          </div>
        </div>
      </div>
    </Layout>
  );
}

import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import Layout from '../components/Layout';
import { COLORS, NEWS_ARTICLES, PHYSICIAN_ARTICLES, COURSES, CONDITIONS } from '../data';

function pianoInit(section, tags = []) {
  const tp = window.tp || [];
  if (section) tp.push(['setContentSection', section]);
  if (tags.length) tp.push(['setTags', tags]);
  tp.push(['init', function () { window.tp?.experience?.execute?.(); }]);
}

function ArticleRowCard({ article, accentColor }) {
  const href = article.body ? `/news/${article.slug}` : `/physician-insights/${article.slug}`;
  return (
    <Link to={href} style={{ display: 'flex', gap: 16, padding: '16px 0', borderBottom: `1px solid ${COLORS.border}`, textDecoration: 'none' }}>
      <div style={{ flex: 1 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 6 }}>
          <span style={{ fontSize: 10, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '1px', color: accentColor || COLORS.primary }}>
            {article.category}
          </span>
          {article.locked && (
            <span style={{ fontSize: 10, background: COLORS.accent, color: 'white', padding: '2px 7px', borderRadius: 20, fontWeight: 600 }}>
              Physician Insider
            </span>
          )}
        </div>
        <div style={{ fontFamily: "'Merriweather', Georgia, serif", fontWeight: 700, fontSize: 15, color: COLORS.neutral, lineHeight: 1.4, marginBottom: 4 }}>
          {article.title}
        </div>
        <div style={{ fontSize: 13, color: COLORS.muted, lineHeight: 1.5 }}>{article.excerpt || article.intro}</div>
        <div style={{ fontSize: 12, color: COLORS.muted, marginTop: 6 }}>{article.byline} · {article.date}</div>
      </div>
    </Link>
  );
}

function CourseCard({ course }) {
  return (
    <Link to={`/courses/${course.slug}`} style={{ display: 'block', background: 'white', border: `1px solid ${COLORS.border}`, borderRadius: 12, overflow: 'hidden', textDecoration: 'none', transition: 'box-shadow 0.2s ease' }}
      onMouseEnter={e => e.currentTarget.style.boxShadow = '0 4px 20px rgba(0,0,0,0.1)'}
      onMouseLeave={e => e.currentTarget.style.boxShadow = 'none'}
    >
      <div style={{ height: 8, background: course.coverColor }} />
      <div style={{ padding: '20px 24px' }}>
        <div style={{ fontSize: 11, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '1px', color: course.coverColor, marginBottom: 8 }}>
          Course · {course.duration}
        </div>
        <div style={{ fontFamily: "'Merriweather', Georgia, serif", fontWeight: 700, fontSize: 16, color: COLORS.neutral, lineHeight: 1.4, marginBottom: 8 }}>
          {course.title}
        </div>
        <div style={{ fontSize: 13, color: COLORS.muted, lineHeight: 1.5, marginBottom: 14 }}>
          {course.subtitle}
        </div>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <span style={{ fontSize: 12, color: COLORS.muted }}>{course.enrolled.toLocaleString()} enrolled</span>
          <span style={{ fontSize: 12, background: COLORS.background, color: COLORS.neutral, padding: '4px 12px', borderRadius: 20, fontWeight: 600 }}>
            View Course
          </span>
        </div>
      </div>
    </Link>
  );
}

export default function Home() {
  useEffect(() => { pianoInit('home'); }, []);

  const featuredNews = NEWS_ARTICLES.slice(0, 3);
  const featuredPhysician = PHYSICIAN_ARTICLES[0];
  const featuredCourses = COURSES.filter(c => c.featured).slice(0, 2);

  return (
    <Layout>
      {/* Hero — Featured Physician Insight */}
      <div style={{ background: `linear-gradient(135deg, ${COLORS.primaryDark} 0%, ${COLORS.primary} 60%, ${COLORS.accent} 100%)`, borderRadius: 16, padding: '56px 48px', marginBottom: 48, color: 'white', position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', top: 0, right: 0, width: 400, height: '100%', background: 'rgba(255,255,255,0.04)', borderRadius: '0 16px 16px 0', clipPath: 'ellipse(80% 100% at 100% 50%)' }} />
        <div style={{ position: 'relative', maxWidth: 680 }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8, background: 'rgba(255,255,255,0.15)', padding: '5px 14px', borderRadius: 20, marginBottom: 20 }}>
            <span style={{ fontSize: 11, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '1px' }}>Physician Perspective</span>
          </div>
          <h1 style={{ fontFamily: "'Merriweather', Georgia, serif", fontSize: 34, fontWeight: 700, lineHeight: 1.3, marginBottom: 16 }}>
            {featuredPhysician.title}
          </h1>
          <p style={{ fontSize: 17, opacity: 0.88, lineHeight: 1.7, marginBottom: 24, fontStyle: 'italic' }}>
            "{featuredPhysician.intro}"
          </p>
          <div style={{ display: 'flex', alignItems: 'center', gap: 16, flexWrap: 'wrap' }}>
            <div>
              <div style={{ fontWeight: 700, fontSize: 15 }}>{featuredPhysician.byline}</div>
              <div style={{ fontSize: 13, opacity: 0.75 }}>{featuredPhysician.bylineTitle}</div>
            </div>
            <Link to={`/physician-insights/${featuredPhysician.slug}`} style={{ background: 'white', color: COLORS.primary, textDecoration: 'none', padding: '10px 24px', borderRadius: 6, fontWeight: 700, fontSize: 14, marginLeft: 'auto', whiteSpace: 'nowrap' }}>
              Read Full Essay
            </Link>
          </div>
        </div>
      </div>

      {/* Two-column: News + Featured Course */}
      <div style={{ display: 'grid', gridTemplateColumns: '3fr 2fr', gap: 32, marginBottom: 48 }}>

        {/* Latest Health News */}
        <div>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', borderBottom: `3px solid ${COLORS.primary}`, paddingBottom: 10, marginBottom: 4 }}>
            <h2 style={{ fontSize: 13, fontWeight: 800, textTransform: 'uppercase', letterSpacing: '2px', color: COLORS.primary }}>Latest Health News</h2>
            <Link to="/news" style={{ fontSize: 12, color: COLORS.muted, textDecoration: 'none', fontWeight: 600 }}>All News →</Link>
          </div>
          {featuredNews.map(a => (
            <ArticleRowCard key={a.id} article={a} accentColor={COLORS.sectionNews} />
          ))}
          {/* Piano Composer hook — newsletter signup or metered content prompt */}
          <div className="piano-inline-prompt" style={{ marginTop: 16 }} />
        </div>

        {/* Sidebar: Featured Condition + Courses */}
        <div>
          {/* Featured Condition: MS */}
          <div style={{ background: 'white', border: `1px solid ${COLORS.border}`, borderRadius: 12, padding: '20px 24px', marginBottom: 24, borderLeft: `4px solid ${COLORS.sectionPhysician}` }}>
            <div style={{ fontSize: 11, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '1px', color: COLORS.sectionPhysician, marginBottom: 10 }}>Featured Condition</div>
            <div style={{ fontFamily: "'Merriweather', Georgia, serif", fontWeight: 700, fontSize: 19, color: COLORS.neutral, marginBottom: 8 }}>
              Multiple Sclerosis
            </div>
            <p style={{ fontSize: 13, color: COLORS.muted, lineHeight: 1.6, marginBottom: 14 }}>
              Our most comprehensive condition hub — with news, physician perspectives, and life guidance courses designed around what MS patients actually need to know.
            </p>
            <Link to="/conditions/multiple-sclerosis" style={{ fontSize: 13, fontWeight: 700, color: COLORS.primary, textDecoration: 'none' }}>
              Explore MS Hub →
            </Link>
          </div>

          {/* Physician Insights promo */}
          <div style={{ background: `linear-gradient(135deg, ${COLORS.accent} 0%, #0A7A6A 100%)`, borderRadius: 12, padding: '20px 24px', marginBottom: 24, color: 'white' }}>
            <div style={{ fontSize: 11, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '1px', opacity: 0.8, marginBottom: 10 }}>Physician Insider</div>
            <div style={{ fontWeight: 800, fontSize: 17, lineHeight: 1.3, marginBottom: 8 }}>Expert physician essays — twice a week in your inbox</div>
            <p style={{ fontSize: 13, opacity: 0.88, lineHeight: 1.6, marginBottom: 16 }}>
              Real clinical perspectives from neurologists, cardiologists, and specialists writing on the topics they know patients need to hear.
            </p>
            <Link to="/newsletter" style={{ display: 'inline-block', background: 'white', color: COLORS.accent, padding: '8px 20px', borderRadius: 6, fontWeight: 700, fontSize: 13, textDecoration: 'none' }}>
              Start Free Trial
            </Link>
          </div>
        </div>
      </div>

      {/* Featured Courses */}
      <div style={{ marginBottom: 48 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', borderBottom: `3px solid ${COLORS.sectionCourses}`, paddingBottom: 10, marginBottom: 20 }}>
          <h2 style={{ fontSize: 13, fontWeight: 800, textTransform: 'uppercase', letterSpacing: '2px', color: COLORS.sectionCourses }}>eLearning: Living With Your Condition</h2>
          <Link to="/courses" style={{ fontSize: 12, color: COLORS.muted, textDecoration: 'none', fontWeight: 600 }}>All Courses →</Link>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 20 }}>
          {featuredCourses.map(c => <CourseCard key={c.id} course={c} />)}
        </div>
      </div>

      {/* Conditions strip */}
      <div style={{ marginBottom: 48 }}>
        <div style={{ borderBottom: `3px solid ${COLORS.accent}`, paddingBottom: 10, marginBottom: 20 }}>
          <h2 style={{ fontSize: 13, fontWeight: 800, textTransform: 'uppercase', letterSpacing: '2px', color: COLORS.accent }}>Conditions We Cover</h2>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 16 }}>
          {CONDITIONS.map(c => (
            <Link key={c.slug} to={`/conditions/${c.slug}`} style={{ display: 'block', background: 'white', border: `1px solid ${COLORS.border}`, borderRadius: 10, padding: '20px 18px', textDecoration: 'none', transition: 'all 0.2s ease', textAlign: 'center' }}
              onMouseEnter={e => { e.currentTarget.style.borderColor = c.color; e.currentTarget.style.boxShadow = '0 4px 16px rgba(0,0,0,0.08)'; }}
              onMouseLeave={e => { e.currentTarget.style.borderColor = COLORS.border; e.currentTarget.style.boxShadow = 'none'; }}
            >
              <div style={{ fontSize: 32, marginBottom: 10 }}>{c.icon}</div>
              <div style={{ fontWeight: 700, fontSize: 14, color: COLORS.neutral, marginBottom: 4 }}>{c.name}</div>
              <div style={{ fontSize: 12, color: COLORS.muted }}>{c.affectedCount} in US</div>
            </Link>
          ))}
        </div>
      </div>

      {/* Newsletter CTA strip — Piano ESP hook */}
      <div className="piano-newsletter-bar" style={{ background: COLORS.primaryLight, border: `1px solid ${COLORS.borderDark}`, borderRadius: 12, padding: '28px 36px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 24, flexWrap: 'wrap' }}>
        <div>
          <h3 style={{ fontFamily: "'Merriweather', Georgia, serif", fontSize: 20, fontWeight: 700, color: COLORS.neutral, marginBottom: 6 }}>
            Get Health Headlines in your inbox every week
          </h3>
          <p style={{ fontSize: 14, color: COLORS.muted }}>
            Curated health news from Meridian's editorial team — free, every week.
          </p>
        </div>
        <Link to="/newsletter" style={{ background: COLORS.primary, color: 'white', textDecoration: 'none', padding: '12px 28px', borderRadius: 6, fontWeight: 700, fontSize: 14, whiteSpace: 'nowrap', flexShrink: 0 }}>
          Subscribe Free
        </Link>
      </div>
    </Layout>
  );
}

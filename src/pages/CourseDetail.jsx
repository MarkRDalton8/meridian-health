import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import Layout from '../components/Layout';
import { COLORS, COURSES, CONDITIONS, PIANO_CONFIG } from '../data';

export default function CourseDetail() {
  const { slug } = useParams();
  const course = COURSES.find(c => c.slug === slug);
  const condition = course ? CONDITIONS.find(c => c.slug === course.condition) : null;
  const [hasAccess, setHasAccess] = useState(false);

  useEffect(() => {
    if (!course) return;
    const tp = window.tp || [];
    tp.push(['setContentSection', 'courses']);
    tp.push(['setTags', course.tags || []]);
    tp.push(['setCustomVariable', 'content_type', 'course']);
    tp.push(['init', function () {
      window.tp?.api?.callApi('/access/check', { rid: PIANO_CONFIG.COURSE_RESOURCE_ID }, function (response) {
        if (response?.access?.granted || response?.data?.access?.granted) setHasAccess(true);
      });
      window.tp?.experience?.execute?.();
    }]);
  }, [course]);

  if (!course) {
    return (
      <Layout>
        <div style={{ textAlign: 'center', padding: '80px 0' }}>
          <h1>Course not found</h1>
          <Link to="/courses" style={{ color: COLORS.primary }}>← All Courses</Link>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      {/* Hard-gate CSS — Piano Composer will add .piano-container--active to trigger this */}
      <style>{`
        .piano-container--active ~ .piano-course-body { display: none; }
        .piano-container--active { position: relative; }
        .piano-container--active::before {
          content: "";
          position: absolute;
          bottom: 100%;
          left: 0; right: 0;
          height: 160px;
          background-image: linear-gradient(to top, ${COLORS.background} 0%, transparent 100%);
          pointer-events: none;
        }
      `}</style>

      {/* Breadcrumb */}
      <div style={{ fontSize: 13, color: COLORS.muted, marginBottom: 24 }}>
        <Link to="/courses" style={{ color: COLORS.sectionCourses, textDecoration: 'none' }}>Courses</Link>
        {condition && <> · <Link to={`/conditions/${condition.slug}`} style={{ color: COLORS.sectionCourses, textDecoration: 'none' }}>{condition.name}</Link></>}
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '3fr 2fr', gap: 48, alignItems: 'flex-start' }}>
        {/* Left: Course info */}
        <div>
          {/* Header */}
          <div style={{ display: 'flex', gap: 8, marginBottom: 14, flexWrap: 'wrap', alignItems: 'center' }}>
            <span style={{ fontSize: 11, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '1px', color: course.coverColor }}>{course.duration}</span>
            {condition && <span style={{ fontSize: 11, background: condition.color + '18', color: condition.color, padding: '2px 10px', borderRadius: 20, fontWeight: 700 }}>{condition.name}</span>}
            <span style={{ fontSize: 11, background: COLORS.sectionCourses + '18', color: COLORS.sectionCourses, padding: '2px 10px', borderRadius: 20, fontWeight: 600 }}>
              {hasAccess ? 'Enrolled' : 'Members Only'}
            </span>
          </div>

          <h1 style={{ fontFamily: "'Merriweather', Georgia, serif", fontSize: 32, fontWeight: 700, color: COLORS.neutral, lineHeight: 1.3, marginBottom: 10 }}>
            {course.title}
          </h1>
          <p style={{ fontSize: 17, color: COLORS.neutralMid, lineHeight: 1.7, marginBottom: 20, fontStyle: 'italic' }}>
            {course.subtitle}
          </p>

          {/* Stats */}
          <div style={{ display: 'flex', gap: 20, fontSize: 14, color: COLORS.muted, marginBottom: 24, flexWrap: 'wrap' }}>
            <span>⭐ {course.rating} rating</span>
            <span>👥 {course.enrolled.toLocaleString()} enrolled</span>
            <span>📚 {course.level}</span>
            <span>🎓 {course.instructor.split('·')[0].trim()}</span>
          </div>

          <p style={{ fontSize: 15, color: COLORS.neutralMid, lineHeight: 1.8, marginBottom: 32 }}>
            {course.description}
          </p>

          {/* Outcomes */}
          <div style={{ background: COLORS.accentLight, border: `1px solid ${COLORS.accent}30`, borderRadius: 10, padding: '20px 24px', marginBottom: 32 }}>
            <h3 style={{ fontWeight: 700, fontSize: 16, color: COLORS.neutral, marginBottom: 14 }}>What you'll walk away with</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
              {course.outcomes.map((o, i) => (
                <div key={i} style={{ display: 'flex', gap: 10, fontSize: 14, color: COLORS.neutralMid }}>
                  <span style={{ color: COLORS.accent, fontWeight: 700, flexShrink: 0 }}>✓</span>
                  <span>{o}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Module list — first module free */}
          <h3 style={{ fontWeight: 700, fontSize: 18, color: COLORS.neutral, marginBottom: 16 }}>Course Modules</h3>
          <div className="piano-container" style={{ display: 'flex', flexDirection: 'column', gap: 10, marginBottom: 24 }}>
            {course.modules.map((mod, i) => (
              <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 14, background: 'white', border: `1px solid ${COLORS.border}`, borderRadius: 8, padding: '14px 18px' }}>
                <div style={{ width: 32, height: 32, background: mod.free || hasAccess ? course.coverColor : COLORS.border, borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontWeight: 700, fontSize: 13, flexShrink: 0 }}>
                  {mod.free || hasAccess ? i + 1 : '🔒'}
                </div>
                <div style={{ flex: 1 }}>
                  <div style={{ fontWeight: 600, fontSize: 14, color: COLORS.neutral }}>{mod.title}</div>
                  <div style={{ fontSize: 12, color: COLORS.muted, marginTop: 2 }}>{mod.duration}{mod.free ? ' · Free preview' : ''}</div>
                </div>
              </div>
            ))}
          </div>

          {/* Locked body content area for Composer */}
          <div className="piano-course-body" />
        </div>

        {/* Right: Enrollment card (sticky) */}
        <div style={{ position: 'sticky', top: 96 }}>
          <div style={{ background: 'white', border: `1px solid ${COLORS.border}`, borderRadius: 14, overflow: 'hidden', boxShadow: '0 4px 24px rgba(0,0,0,0.07)' }}>
            <div style={{ height: 8, background: course.coverColor }} />
            <div style={{ padding: '28px 28px' }}>
              {hasAccess ? (
                <>
                  <div style={{ textAlign: 'center', marginBottom: 24 }}>
                    <div style={{ fontSize: 32, marginBottom: 8 }}>✅</div>
                    <div style={{ fontWeight: 800, fontSize: 20, color: COLORS.neutral, marginBottom: 4 }}>You're enrolled</div>
                    <div style={{ fontSize: 14, color: COLORS.muted }}>Start with Module 1 below</div>
                  </div>
                  <button style={{ width: '100%', background: course.coverColor, color: 'white', border: 'none', padding: '14px', borderRadius: 8, fontWeight: 800, fontSize: 16, cursor: 'pointer' }}>
                    Start Learning
                  </button>
                </>
              ) : (
                <>
                  <div style={{ marginBottom: 20 }}>
                    <div style={{ fontSize: 13, color: COLORS.muted, marginBottom: 4 }}>Included in</div>
                    <div style={{ fontWeight: 800, fontSize: 22, color: COLORS.neutral, marginBottom: 4 }}>Physician Insider</div>
                    <div style={{ fontSize: 15, color: COLORS.sectionCourses, fontWeight: 600 }}>$9.99/month · All courses included</div>
                  </div>

                  {/* Piano Composer injects checkout here */}
                  <div id="piano-course-checkout" />

                  <button
                    onClick={() => {
                      const tp = window.tp || [];
                      tp.push(['init', function () {
                        window.tp?.offer?.show?.({
                          displayMode: 'modal',
                          containerSelector: '#piano-course-checkout',
                        });
                      }]);
                    }}
                    style={{ width: '100%', background: course.coverColor, color: 'white', border: 'none', padding: '14px', borderRadius: 8, fontWeight: 800, fontSize: 16, cursor: 'pointer', marginBottom: 12 }}
                  >
                    Enroll Now
                  </button>
                  <Link to="/subscribe" style={{ display: 'block', textAlign: 'center', fontSize: 13, color: COLORS.primary, textDecoration: 'none', fontWeight: 600 }}>
                    View all membership plans
                  </Link>

                  <div style={{ borderTop: `1px solid ${COLORS.border}`, marginTop: 20, paddingTop: 16 }}>
                    <div style={{ fontSize: 12, color: COLORS.muted, lineHeight: 1.6 }}>
                      <strong>Module 1 is free.</strong> Enroll to unlock the full course, plus access to all {COURSES.length - 1} other courses in the library.
                    </div>
                  </div>
                </>
              )}
            </div>
          </div>

          {/* Trust signals */}
          <div style={{ display: 'flex', gap: 16, marginTop: 16, flexWrap: 'wrap' }}>
            <div style={{ flex: 1, background: 'white', border: `1px solid ${COLORS.border}`, borderRadius: 8, padding: '12px 14px', textAlign: 'center' }}>
              <div style={{ fontWeight: 700, fontSize: 18, color: COLORS.neutral }}>{course.rating}</div>
              <div style={{ fontSize: 11, color: COLORS.muted }}>Rating</div>
            </div>
            <div style={{ flex: 1, background: 'white', border: `1px solid ${COLORS.border}`, borderRadius: 8, padding: '12px 14px', textAlign: 'center' }}>
              <div style={{ fontWeight: 700, fontSize: 18, color: COLORS.neutral }}>{course.enrolled.toLocaleString()}</div>
              <div style={{ fontSize: 11, color: COLORS.muted }}>Enrolled</div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}

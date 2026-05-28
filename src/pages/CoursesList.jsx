import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import Layout from '../components/Layout';
import { COLORS, COURSES, CONDITIONS } from '../data';

function CourseCard({ course, large }) {
  const condition = CONDITIONS.find(c => c.slug === course.condition);
  return (
    <Link to={`/courses/${course.slug}`} style={{ display: 'block', background: 'white', border: `1px solid ${COLORS.border}`, borderRadius: 12, overflow: 'hidden', textDecoration: 'none', transition: 'box-shadow 0.2s ease' }}
      onMouseEnter={e => e.currentTarget.style.boxShadow = '0 4px 20px rgba(0,0,0,0.1)'}
      onMouseLeave={e => e.currentTarget.style.boxShadow = 'none'}
    >
      <div style={{ height: large ? 10 : 6, background: course.coverColor }} />
      <div style={{ padding: large ? '28px 32px' : '20px 24px' }}>
        <div style={{ display: 'flex', gap: 8, marginBottom: 10, flexWrap: 'wrap', alignItems: 'center' }}>
          <span style={{ fontSize: 10, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '1px', color: course.coverColor }}>
            {course.duration}
          </span>
          {course.featured && (
            <span style={{ fontSize: 10, background: COLORS.alert, color: 'white', padding: '2px 8px', borderRadius: 20, fontWeight: 600 }}>Featured</span>
          )}
          {condition && (
            <span style={{ fontSize: 10, background: condition.color + '18', color: condition.color, padding: '2px 8px', borderRadius: 20, fontWeight: 600 }}>
              {condition.shortName}
            </span>
          )}
        </div>
        <h2 style={{ fontFamily: "'Merriweather', Georgia, serif", fontWeight: 700, fontSize: large ? 22 : 17, color: COLORS.neutral, lineHeight: 1.4, marginBottom: 8 }}>
          {course.title}
        </h2>
        <p style={{ fontSize: 14, color: COLORS.muted, lineHeight: 1.6, marginBottom: 16 }}>
          {course.subtitle}
        </p>
        <div style={{ fontSize: 12, color: COLORS.muted, marginBottom: 14 }}>
          {course.instructor}
        </div>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div style={{ display: 'flex', gap: 14, fontSize: 12, color: COLORS.muted }}>
            <span>⭐ {course.rating}</span>
            <span>{course.enrolled.toLocaleString()} enrolled</span>
            <span>{course.level}</span>
          </div>
          <span style={{ fontSize: 12, background: COLORS.sectionCourses, color: 'white', padding: '5px 14px', borderRadius: 20, fontWeight: 600 }}>
            View Course
          </span>
        </div>
      </div>
    </Link>
  );
}

export default function CoursesList() {
  useEffect(() => {
    const tp = window.tp || [];
    tp.push(['setContentSection', 'courses']);
    tp.push(['init', function () { window.tp?.experience?.execute?.(); }]);
  }, []);

  const featured = COURSES.filter(c => c.featured);
  const others = COURSES.filter(c => !c.featured);

  return (
    <Layout>
      {/* Page header */}
      <div style={{ background: `linear-gradient(135deg, ${COLORS.sectionCourses} 0%, #92400E 100%)`, borderRadius: 14, padding: '48px 48px', marginBottom: 40, color: 'white' }}>
        <div style={{ fontSize: 11, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '2px', opacity: 0.75, marginBottom: 12 }}>eLearning</div>
        <h1 style={{ fontFamily: "'Merriweather', Georgia, serif", fontSize: 38, fontWeight: 700, lineHeight: 1.2, marginBottom: 14 }}>
          Life Guidance Courses
        </h1>
        <p style={{ fontSize: 17, opacity: 0.9, lineHeight: 1.7, maxWidth: 560 }}>
          Expert-built courses for the real-world questions your diagnosis raises — career, relationships, finances, and daily life. The conversations the clinic rarely makes time for.
        </p>
        <div style={{ display: 'flex', gap: 32, marginTop: 24, flexWrap: 'wrap' }}>
          <div><div style={{ fontWeight: 800, fontSize: 24 }}>{COURSES.reduce((s, c) => s + c.enrolled, 0).toLocaleString()}+</div><div style={{ fontSize: 13, opacity: 0.75 }}>students enrolled</div></div>
          <div><div style={{ fontWeight: 800, fontSize: 24 }}>{COURSES.length}</div><div style={{ fontSize: 13, opacity: 0.75 }}>courses available</div></div>
          <div><div style={{ fontWeight: 800, fontSize: 24 }}>4.7</div><div style={{ fontSize: 13, opacity: 0.75 }}>average rating</div></div>
        </div>
      </div>

      {/* Piano Composer — course access gate / upsell prompt */}
      <div className="piano-courses-top" style={{ marginBottom: 24 }} />

      {/* Featured courses */}
      {featured.length > 0 && (
        <div style={{ marginBottom: 40 }}>
          <div style={{ fontSize: 12, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '1.5px', color: COLORS.sectionCourses, marginBottom: 16 }}>Featured</div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 20 }}>
            {featured.map(c => <CourseCard key={c.id} course={c} large />)}
          </div>
        </div>
      )}

      {/* All courses */}
      <div>
        <div style={{ fontSize: 12, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '1.5px', color: COLORS.muted, marginBottom: 16 }}>All Courses</div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 20 }}>
          {others.map(c => <CourseCard key={c.id} course={c} />)}
        </div>
      </div>
    </Layout>
  );
}

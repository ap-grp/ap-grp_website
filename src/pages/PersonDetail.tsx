import type { PageState } from '../App'
import ResponsiveImage from '../components/ResponsiveImage'
import { people } from '../content/people'
import { useLang } from '../context/lang'

interface Props {
  slug: string
  navigate: (p: PageState) => void
}

export default function PersonDetail({ slug, navigate }: Props) {
  const { lang } = useLang()
  const zh = lang === 'zh'
  const person = people.find((p) => p.slug === slug)

  if (!person) {
    return (
      <div style={{ padding: '8rem clamp(2rem,5vw,6rem)', textAlign: 'center' }}>
        <p style={{ color: '#9AA3AC', fontSize: '0.85rem' }}>{zh ? '未找到该人员。' : 'person not found.'}</p>
        <button onClick={() => navigate({ id: 'people' })} style={{ marginTop: '1rem', background: 'none', border: 'none', cursor: 'pointer', fontSize: '0.75rem', letterSpacing: '0.08em', textDecoration: 'underline', fontFamily: 'inherit' }}>
          {zh ? '返回团队' : 'back to people'}
        </button>
      </div>
    )
  }

  return (
    <div style={{ paddingTop: '64px' }}>
      {/* Breadcrumb */}
      <div style={{ padding: '1.5rem clamp(2rem,5vw,6rem)', borderBottom: '1px solid #dee2e6' }}>
        <div style={{ maxWidth: '1560px', margin: '0 auto' }}>
          <button
            onClick={() => navigate({ id: 'people' })}
            style={{ background: 'none', border: 'none', cursor: 'pointer', fontSize: '0.65rem', letterSpacing: '0.1em', color: '#9AA3AC', fontFamily: 'inherit', display: 'flex', alignItems: 'center', gap: '0.5rem' }}
          >
            {zh ? '← 全部团队' : '← people'}
          </button>
        </div>
      </div>

      {/* Profile */}
      <section style={{ padding: 'clamp(4rem,8vw,7rem) clamp(2rem,5vw,6rem)' }}>
        <div style={{ maxWidth: '1560px', margin: '0 auto' }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 'clamp(3rem,6vw,6rem)', alignItems: 'start' }}>
            {/* Portrait */}
            <div>
              <div style={{ aspectRatio: '3/4', backgroundColor: '#e9ecef', overflow: 'hidden', maxWidth: '420px' }}>
                <ResponsiveImage
                  src={person.imageUrl}
                  alt={person.name[lang]}
                  sizes="(max-width: 680px) calc(100vw - 4rem), 420px"
                  loading="eager"
                  fetchPriority="high"
                  style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
                />
              </div>
            </div>

            {/* Bio */}
            <div>
              <p style={{ fontSize: '0.65rem', letterSpacing: '0.15em', color: '#b4906e', marginBottom: '0.75rem' }}>
                {person.position[lang]}
              </p>
              <h1 style={{ fontSize: 'clamp(1.8rem, 3vw, 2.6rem)', fontWeight: 300, letterSpacing: '-0.01em', marginBottom: '2rem', lineHeight: 1.2 }}>
                {person.name[lang]}
              </h1>

              <p style={{ fontSize: '0.85rem', lineHeight: 1.9, color: '#495057', marginBottom: '3rem', letterSpacing: '0.02em' }}>
                {person.bio[lang]}
              </p>

              {/* Qualifications */}
              <div style={{ marginBottom: '2.5rem' }}>
                <p style={{ fontSize: '0.65rem', letterSpacing: '0.12em', color: '#9AA3AC', marginBottom: '1rem' }}>
                  {zh ? '学历资质' : 'qualifications'}
                </p>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
                  {person.qualifications.map((q, i) => (
                    <div key={i} style={{ display: 'flex', gap: '0.75rem', alignItems: 'baseline' }}>
                      <span style={{ width: '4px', height: '4px', borderRadius: '50%', backgroundColor: '#b4906e', flexShrink: 0, marginTop: '0.45rem' }} />
                      <p style={{ fontSize: '0.78rem', color: '#495057', lineHeight: 1.6, letterSpacing: '0.02em' }}>{q[lang]}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Project experience */}
              <div style={{ marginBottom: '2.5rem' }}>
                <p style={{ fontSize: '0.65rem', letterSpacing: '0.12em', color: '#9AA3AC', marginBottom: '1rem' }}>
                  {zh ? '代表项目' : 'project experience'}
                </p>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                  {person.experience.map((e, i) => (
                    <div key={i} style={{ display: 'flex', gap: '0.75rem', alignItems: 'baseline' }}>
                      <span style={{ width: '4px', height: '4px', borderRadius: '50%', backgroundColor: '#b4906e', flexShrink: 0, marginTop: '0.45rem' }} />
                      <p style={{ fontSize: '0.78rem', color: '#495057', lineHeight: 1.6, letterSpacing: '0.02em' }}>{e[lang]}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Awards */}
              {person.awards && person.awards.length > 0 && (
                <div>
                  <p style={{ fontSize: '0.65rem', letterSpacing: '0.12em', color: '#9AA3AC', marginBottom: '1rem' }}>
                    {zh ? '奖项与荣誉' : 'awards & recognition'}
                  </p>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                    {person.awards.map((a, i) => (
                      <div key={i} style={{ display: 'flex', gap: '0.75rem', alignItems: 'baseline' }}>
                        <span style={{ width: '4px', height: '4px', borderRadius: '50%', backgroundColor: '#b4906e', flexShrink: 0, marginTop: '0.45rem' }} />
                        <p style={{ fontSize: '0.78rem', color: '#495057', lineHeight: 1.6, letterSpacing: '0.02em' }}>{a[lang]}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Back */}
      <div style={{ borderTop: '1px solid #dee2e6', padding: '2rem clamp(2rem,5vw,6rem)', textAlign: 'center' }}>
        <button
          onClick={() => navigate({ id: 'people' })}
          style={{
            background: 'none',
            border: '1px solid #dee2e6',
            cursor: 'pointer',
            padding: '0.75rem 2rem',
            fontSize: '0.7rem',
            letterSpacing: '0.1em',
            color: '#212529',
            fontFamily: 'inherit',
            transition: 'all 0.2s ease',
          }}
          onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = '#212529'; e.currentTarget.style.color = '#ffffff' }}
          onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = 'transparent'; e.currentTarget.style.color = '#212529' }}
        >
          {zh ? '← 返回团队' : '← back to people'}
        </button>
      </div>
    </div>
  )
}

import { useEffect, useRef } from 'react'
import type { PageState } from '../App'
import ResponsiveImage from '../components/ResponsiveImage'
import { people } from '../content/people'
import { useLang } from '../context/lang'

interface Props {
  navigate: (p: PageState) => void
}

function FadeSection({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) {
  const ref = useRef<HTMLDivElement>(null)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    el.style.transitionDelay = `${delay}s`
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) { entry.target.classList.add('visible'); obs.unobserve(entry.target) }
      },
      { threshold: 0.1 }
    )
    obs.observe(el)
    return () => obs.disconnect()
  }, [delay])
  return <div ref={ref} className="fade-in">{children}</div>
}

function PersonCard({ person, size, onClick, zh }: { person: (typeof people)[0]; size: 'large' | 'small'; onClick: () => void; zh: boolean }) {
  const lang = zh ? 'zh' : 'en'

  return (
    <button
      onClick={onClick}
      style={{ display: 'block', width: '100%', background: 'none', border: 'none', cursor: 'pointer', padding: 0, textAlign: 'left' }}
      aria-label={zh ? `查看${person.name.zh}简介` : `view ${person.name.en} profile`}
    >
      <div
        className="img-zoom"
        style={{
          aspectRatio: '1/1',
          backgroundColor: '#e9ecef',
          overflow: 'hidden',
        }}
      >
        <ResponsiveImage
          src={person.imageUrl}
          alt={person.name[lang]}
          sizes={size === 'large'
            ? '(max-width: 767px) calc((100vw - 5rem) / 2), (max-width: 1200px) 50vw, 520px'
            : '(max-width: 767px) calc((100vw - 5rem) / 2), 360px'}
          style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
        />
      </div>
      <div style={{ paddingTop: '1rem' }}>
        <p
          style={{
            fontSize: size === 'large' ? '1rem' : '0.88rem',
            fontWeight: 400,
            letterSpacing: '0.01em',
            marginBottom: '0.3rem',
            color: '#212529',
          }}
        >
          {person.name[lang]}
        </p>
        <p style={{ fontSize: '0.7rem', color: '#9AA3AC', letterSpacing: '0.05em' }}>
          {person.position[lang]}
        </p>
      </div>
    </button>
  )
}

export default function People({ navigate }: Props) {
  const { lang } = useLang()
  const zh = lang === 'zh'
  const partners = people.filter((p) => p.isPartner)
  const staff = people.filter((p) => !p.isPartner)

  return (
    <div style={{ paddingTop: '64px' }}>
      {/* Header */}
      <div style={{ padding: 'clamp(3rem,6vw,5rem) clamp(2rem,5vw,6rem) clamp(2rem,4vw,3rem)', borderBottom: '1px solid #dee2e6' }}>
        <div style={{ maxWidth: '1560px', margin: '0 auto' }}>
          <p style={{ fontSize: '0.65rem', letterSpacing: '0.15em', color: '#b4906e', marginBottom: '0.75rem' }}>
            {zh ? '团队' : 'people'}
          </p>
          <h1 style={{ fontSize: 'clamp(2rem, 4vw, 3.8rem)', fontWeight: 300, letterSpacing: '-0.01em' }}>
            {zh ? '我们的团队' : 'the team'}
          </h1>
        </div>
      </div>

      <section style={{ padding: 'clamp(4rem,8vw,7rem) clamp(2rem,5vw,6rem)' }}>
        <div style={{ maxWidth: '1560px', margin: '0 auto' }}>

          {/* Partners */}
          <div
            className="partners-grid"
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(420px, 1fr))',
              gap: '2.5rem 2rem',
              marginBottom: 'clamp(3rem,6vw,5rem)',
            }}
          >
            {partners.map((p, i) => (
              <FadeSection key={p.slug} delay={i * 0.1}>
                <PersonCard person={p} size="large" onClick={() => navigate({ id: 'person-detail', slug: p.slug })} zh={zh} />
              </FadeSection>
            ))}
          </div>

          {/* Team */}
          <div className="team-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '2rem' }}>
            {staff.map((p, i) => (
              <FadeSection key={p.slug} delay={i * 0.05}>
                <PersonCard person={p} size="small" onClick={() => navigate({ id: 'person-detail', slug: p.slug })} zh={zh} />
              </FadeSection>
            ))}
          </div>

          <style>{`
            @media (max-width: 767px) {
              .partners-grid { grid-template-columns: repeat(2, 1fr) !important; gap: 1rem !important; }
              .team-grid { grid-template-columns: repeat(2, 1fr) !important; gap: 1.25rem !important; }
            }
          `}</style>
        </div>
      </section>

      {/* Careers CTA */}
      <section
        style={{
          borderTop: '1px solid #dee2e6',
          backgroundColor: '#f8f9fa',
          padding: 'clamp(4rem,7vw,6rem) clamp(2rem,5vw,6rem)',
          textAlign: 'center',
        }}
      >
        <FadeSection>
          <p style={{ fontSize: '0.65rem', letterSpacing: '0.15em', color: '#9AA3AC', marginBottom: '1rem' }}>
            {zh ? '加入团队' : 'join the team'}
          </p>
          <h2 style={{ fontSize: 'clamp(1.3rem, 2.5vw, 1.9rem)', fontWeight: 300, letterSpacing: '-0.01em', marginBottom: '1.25rem' }}>
            {zh ? '有意与我们共事？' : 'interested in working with us?'}
          </h2>
          <p style={{ fontSize: '0.82rem', color: '#495057', marginBottom: '2rem', letterSpacing: '0.02em', maxWidth: '400px', margin: '0 auto 2rem' }}>
            {zh ? '我们始终欢迎才华横溢、充满好奇心的设计师加入我们的事务所。' : 'we are always looking for talented, curious people to join our practice.'}
          </p>
          <button
            onClick={() => navigate({ id: 'careers' })}
            style={{
              padding: '0.85rem 2.5rem',
              backgroundColor: '#212529',
              color: '#ffffff',
              border: 'none',
              cursor: 'pointer',
              fontSize: '0.7rem',
              letterSpacing: '0.12em',
              fontFamily: 'inherit',
              transition: 'background-color 0.25s ease',
            }}
            onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = '#b4906e')}
            onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = '#212529')}
          >
            {zh ? '查看招聘职位' : 'view openings'}
          </button>
        </FadeSection>
      </section>
    </div>
  )
}

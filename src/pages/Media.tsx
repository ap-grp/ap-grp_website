import { useState, useEffect, useRef } from 'react'
import type { PageState } from '../App'
import ResponsiveImage from '../components/ResponsiveImage'
import { articles } from '../content/media'
import { useLang } from '../context/lang'

interface Props {
  navigate: (p: PageState) => void
  initialCategory?: string
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

export default function Media({ navigate, initialCategory }: Props) {
  const { lang } = useLang()
  const zh = lang === 'zh'
  const [active, setActive] = useState(initialCategory || 'all')
  const [search, setSearch] = useState('')

  const categories = [
    { key: 'all', en: 'all', zh: '全部' },
    { key: 'news', en: 'news', zh: '新闻' },
    { key: 'awards', en: 'awards', zh: '奖项' },
    { key: 'projects', en: 'projects', zh: '项目' },
    { key: 'press', en: 'press', zh: '媒体报道' },
    { key: 'insights', en: 'insights', zh: '洞见' },
    { key: 'events', en: 'events', zh: '活动' },
  ]

  const filtered = articles.filter((a) => {
    const matchCat = active === 'all' || a.category === active
    const searchVal = search.toLowerCase()
    const matchSearch = !search
      || a.title.toLowerCase().includes(searchVal)
      || a.summary.toLowerCase().includes(searchVal)
      || (zh && (a.zhTitle.toLowerCase().includes(searchVal) || a.zhSummary.toLowerCase().includes(searchVal)))
    return matchCat && matchSearch
  })

  const featured = filtered[0]
  const rest = filtered.slice(1)

  return (
    <div style={{ paddingTop: '64px' }}>
      {/* Header */}
      <div style={{ padding: 'clamp(3rem,6vw,5rem) clamp(2rem,5vw,6rem) clamp(2rem,4vw,3rem)', borderBottom: '1px solid #dee2e6' }}>
        <div style={{ maxWidth: '1560px', margin: '0 auto' }}>
          <p style={{ fontSize: '0.65rem', letterSpacing: '0.15em', color: '#b4906e', marginBottom: '0.75rem' }}>
            {zh ? '媒体' : 'media'}
          </p>
          <h1 style={{ fontSize: 'clamp(2rem, 4vw, 3.8rem)', fontWeight: 300, letterSpacing: '-0.01em', marginBottom: '2.5rem' }}>
            {zh ? '最新动态' : 'latest updates'}
          </h1>

          {/* Filters + search */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '1rem', flexWrap: 'wrap' }}>
            <div style={{ display: 'flex', gap: '0.25rem', flexWrap: 'wrap' }}>
              {categories.map((c) => (
                <button
                  key={c.key}
                  onClick={() => setActive(c.key)}
                  style={{
                    padding: '0.45rem 1rem',
                    border: `1px solid ${active === c.key ? '#212529' : '#dee2e6'}`,
                    backgroundColor: active === c.key ? '#212529' : 'transparent',
                    color: active === c.key ? '#ffffff' : '#9AA3AC',
                    cursor: 'pointer',
                    fontSize: '0.65rem',
                    letterSpacing: '0.08em',
                    fontFamily: 'inherit',
                    transition: 'all 0.2s ease',
                  }}
                >
                  {zh ? c.zh : c.en}
                </button>
              ))}
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', border: '1px solid #dee2e6', padding: '0.45rem 1rem' }}>
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#9AA3AC" strokeWidth="1.5">
                <circle cx="11" cy="11" r="7" />
                <line x1="16.5" y1="16.5" x2="22" y2="22" />
              </svg>
              <input
                type="text"
                placeholder={zh ? '搜索文章…' : 'search articles...'}
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                style={{
                  border: 'none',
                  outline: 'none',
                  fontSize: '0.72rem',
                  letterSpacing: '0.04em',
                  color: '#212529',
                  fontFamily: 'inherit',
                  backgroundColor: 'transparent',
                  width: '160px',
                }}
              />
            </div>
          </div>
        </div>
      </div>

      <section style={{ padding: 'clamp(4rem,8vw,7rem) clamp(2rem,5vw,6rem)' }}>
        <div style={{ maxWidth: '1560px', margin: '0 auto' }}>
          {filtered.length === 0 ? (
            <p style={{ color: '#9AA3AC', fontSize: '0.85rem', letterSpacing: '0.04em' }}>
              {zh ? '未找到相关文章。' : 'no articles found.'}
            </p>
          ) : (
            <>
              {/* Featured article */}
              {featured && (
                <FadeSection>
                  <button
                    onClick={() => navigate({ id: 'media-detail', slug: featured.slug })}
                    style={{ display: 'block', width: '100%', background: 'none', border: 'none', cursor: 'pointer', padding: 0, textAlign: 'left', marginBottom: '5rem' }}
                  >
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(340px, 100%), 1fr))', gap: '3rem', alignItems: 'center' }}>
                      <div className="img-zoom" style={{ aspectRatio: '16/9', backgroundColor: '#e9ecef', overflow: 'hidden' }}>
                        <ResponsiveImage
                          src={featured.imageUrl}
                          alt={zh ? featured.zhTitle : featured.title}
                          sizes="(max-width: 800px) calc(100vw - 4rem), 50vw"
                          loading="eager"
                          fetchPriority="high"
                          style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
                        />
                      </div>
                      <div>
                        <div style={{ display: 'flex', gap: '1rem', alignItems: 'center', marginBottom: '1.5rem' }}>
                          <span style={{ fontSize: '0.6rem', letterSpacing: '0.12em', color: '#b4906e' }}>
                            {zh ? featured.zhCategory : featured.category}
                          </span>
                          <span style={{ width: '20px', height: '1px', backgroundColor: '#dee2e6' }} />
                          <span style={{ fontSize: '0.65rem', color: '#9AA3AC', letterSpacing: '0.04em' }}>{featured.date}</span>
                          <span style={{ fontSize: '0.6rem', letterSpacing: '0.08em', color: '#b4906e', border: '1px solid #b4906e', padding: '2px 8px' }}>
                            {zh ? '精选' : 'featured'}
                          </span>
                        </div>
                        <h2 style={{ fontSize: 'clamp(1.2rem, 2vw, 1.7rem)', fontWeight: 300, lineHeight: 1.35, letterSpacing: '-0.01em', marginBottom: '1.25rem', color: '#212529' }}>
                          {zh ? featured.zhTitle : featured.title}
                        </h2>
                        <p style={{ fontSize: '0.82rem', lineHeight: 1.8, color: '#495057', letterSpacing: '0.02em', marginBottom: '2rem' }}>
                          {zh ? featured.zhSummary : featured.summary}
                        </p>
                        <span style={{ fontSize: '0.7rem', letterSpacing: '0.1em', color: '#212529', borderBottom: '1px solid #212529', paddingBottom: '3px' }}>
                          {zh ? '阅读更多 →' : 'read more →'}
                        </span>
                      </div>
                    </div>
                  </button>
                </FadeSection>
              )}

              {/* Article grid */}
              {rest.length > 0 && (
                <>
                  <div style={{ height: '1px', backgroundColor: '#dee2e6', marginBottom: '4rem' }} />
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(min(340px, 100%), 1fr))', gap: '3rem 2rem' }}>
                    {rest.map((a, i) => (
                      <FadeSection key={a.slug} delay={i * 0.07}>
                        <button
                          onClick={() => navigate({ id: 'media-detail', slug: a.slug })}
                          style={{ display: 'block', width: '100%', background: 'none', border: 'none', cursor: 'pointer', padding: 0, textAlign: 'left' }}
                        >
                          <div className="img-zoom" style={{ aspectRatio: '3/2', backgroundColor: '#e9ecef', overflow: 'hidden', marginBottom: '1.25rem' }}>
                            <ResponsiveImage
                              src={a.imageUrl}
                              alt={zh ? a.zhTitle : a.title}
                              sizes="(max-width: 767px) calc(100vw - 4rem), 480px"
                              style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
                            />
                          </div>
                          <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'center', marginBottom: '0.75rem' }}>
                            <span style={{ fontSize: '0.6rem', letterSpacing: '0.1em', color: '#b4906e' }}>
                              {zh ? a.zhCategory : a.category}
                            </span>
                            <span style={{ width: '16px', height: '1px', backgroundColor: '#dee2e6' }} />
                            <span style={{ fontSize: '0.62rem', color: '#9AA3AC', letterSpacing: '0.04em' }}>{a.date}</span>
                          </div>
                          <h3 style={{ fontSize: '0.88rem', fontWeight: 400, lineHeight: 1.5, letterSpacing: '0.01em', marginBottom: '0.75rem', color: '#212529' }}>
                            {zh ? a.zhTitle : a.title}
                          </h3>
                          <p style={{ fontSize: '0.76rem', lineHeight: 1.75, color: '#777770', letterSpacing: '0.02em', display: '-webkit-box', WebkitLineClamp: 3, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
                            {zh ? a.zhSummary : a.summary}
                          </p>
                        </button>
                      </FadeSection>
                    ))}
                  </div>
                </>
              )}
            </>
          )}
        </div>
      </section>
    </div>
  )
}

import type { PageState } from '../App'
import ResponsiveImage from '../components/ResponsiveImage'
import { articles } from '../content/media'
import { useLang } from '../context/lang'

interface Props {
  slug: string
  navigate: (p: PageState) => void
}

export default function MediaDetail({ slug, navigate }: Props) {
  const { lang } = useLang()
  const zh = lang === 'zh'
  const article = articles.find((a) => a.slug === slug)

  if (!article) {
    return (
      <div style={{ padding: '8rem clamp(2rem,5vw,6rem)', textAlign: 'center' }}>
        <p style={{ color: '#9AA3AC', fontSize: '0.85rem' }}>{zh ? '未找到该文章。' : 'article not found.'}</p>
        <button onClick={() => navigate({ id: 'media' })} style={{ marginTop: '1rem', background: 'none', border: 'none', cursor: 'pointer', fontSize: '0.75rem', letterSpacing: '0.08em', textDecoration: 'underline', fontFamily: 'inherit' }}>
          {zh ? '返回媒体' : 'back to media'}
        </button>
      </div>
    )
  }

  const related = articles.filter((a) => a.slug !== slug && a.category === article.category).slice(0, 3)

  return (
    <div style={{ paddingTop: '64px' }}>
      {/* Breadcrumb */}
      <div style={{ padding: '1.5rem clamp(2rem,5vw,6rem)', borderBottom: '1px solid #dee2e6' }}>
        <div style={{ maxWidth: '800px', margin: '0 auto' }}>
          <button
            onClick={() => navigate({ id: 'media' })}
            style={{ background: 'none', border: 'none', cursor: 'pointer', fontSize: '0.65rem', letterSpacing: '0.1em', color: '#9AA3AC', fontFamily: 'inherit' }}
          >
            {zh ? '← 全部媒体' : '← media'}
          </button>
        </div>
      </div>

      {/* Article header */}
      <div style={{ padding: 'clamp(3rem,6vw,5rem) clamp(2rem,5vw,6rem)', borderBottom: '1px solid #dee2e6', maxWidth: '800px', margin: '0 auto' }}>
        <div style={{ display: 'flex', gap: '1rem', alignItems: 'center', marginBottom: '1.75rem' }}>
          <span style={{ fontSize: '0.6rem', letterSpacing: '0.12em', color: '#b4906e' }}>
            {zh ? article.zhCategory : article.category}
          </span>
          <span style={{ width: '20px', height: '1px', backgroundColor: '#dee2e6' }} />
          <span style={{ fontSize: '0.65rem', color: '#9AA3AC', letterSpacing: '0.04em' }}>{article.date}</span>
        </div>
        <h1 style={{ fontSize: 'clamp(1.6rem, 3vw, 2.5rem)', fontWeight: 300, lineHeight: 1.25, letterSpacing: '-0.01em', color: '#212529' }}>
          {zh ? article.zhTitle : article.title}
        </h1>
      </div>

      {/* Hero image */}
      <div style={{ height: 'clamp(280px, 45vw, 520px)', backgroundColor: '#e9ecef', overflow: 'hidden', maxWidth: '1560px', margin: '0 auto 0' }}>
        <ResponsiveImage
          src={article.imageUrl}
          alt={zh ? article.zhTitle : article.title}
          sizes="(min-width: 1560px) 1560px, 100vw"
          loading="eager"
          fetchPriority="high"
          style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
        />
      </div>

      {/* Article body — always English per brief */}
      <article style={{ padding: 'clamp(3rem,6vw,5rem) clamp(2rem,5vw,6rem)', maxWidth: '800px', margin: '0 auto' }}>
        {article.body.map((para, i) => (
          <p
            key={i}
            style={{
              fontSize: '0.9rem',
              lineHeight: 2,
              color: '#495057',
              letterSpacing: '0.02em',
              marginBottom: '1.75rem',
            }}
          >
            {para}
          </p>
        ))}
      </article>

      {/* Related articles */}
      {related.length > 0 && (
        <section style={{ borderTop: '1px solid #dee2e6', padding: 'clamp(4rem,7vw,6rem) clamp(2rem,5vw,6rem)', backgroundColor: '#f8f9fa' }}>
          <div style={{ maxWidth: '1560px', margin: '0 auto' }}>
            <p style={{ fontSize: '0.65rem', letterSpacing: '0.15em', color: '#b4906e', marginBottom: '2.5rem' }}>
              {zh ? '相关文章' : 'related articles'}
            </p>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))', gap: '2rem' }}>
              {related.map((a) => (
                <button
                  key={a.slug}
                  onClick={() => navigate({ id: 'media-detail', slug: a.slug })}
                  style={{ display: 'block', background: 'none', border: 'none', cursor: 'pointer', padding: 0, textAlign: 'left' }}
                >
                  <div className="img-zoom" style={{ aspectRatio: '3/2', backgroundColor: '#e9ecef', overflow: 'hidden', marginBottom: '1rem' }}>
                    <ResponsiveImage
                      src={a.imageUrl}
                      alt={zh ? a.zhTitle : a.title}
                      sizes="(max-width: 767px) calc(100vw - 4rem), 480px"
                      style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
                    />
                  </div>
                  <span style={{ fontSize: '0.6rem', letterSpacing: '0.1em', color: '#b4906e', display: 'block', marginBottom: '0.5rem' }}>
                    {zh ? a.zhCategory : a.category}
                  </span>
                  <p style={{ fontSize: '0.82rem', lineHeight: 1.5, color: '#212529', letterSpacing: '0.01em' }}>
                    {zh ? a.zhTitle : a.title}
                  </p>
                </button>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Back */}
      <div style={{ borderTop: '1px solid #dee2e6', padding: '2rem clamp(2rem,5vw,6rem)', textAlign: 'center' }}>
        <button
          onClick={() => navigate({ id: 'media' })}
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
          {zh ? '← 返回媒体' : '← back to media'}
        </button>
      </div>
    </div>
  )
}

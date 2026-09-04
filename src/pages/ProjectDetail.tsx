import { useState, useRef, useEffect } from 'react'
import type { PageState } from '../App'
import ResponsiveImage from '../components/ResponsiveImage'
import { projects } from '../content/projects'
import { formatProjectStatus, formatProjectTypes } from '../content/types'
import { useLang } from '../context/lang'

interface Props {
  slug: string
  navigate: (p: PageState) => void
}

const THUMB_SIZE = 96
const THUMB_GAP = 6
const THUMBS_VISIBLE = 7
const RIBBON_TRACK_W = THUMBS_VISIBLE * THUMB_SIZE + (THUMBS_VISIBLE - 1) * THUMB_GAP

function ArrowBtn({
  onClick,
  dir,
  tone = 'light',
  style,
}: {
  onClick: () => void
  dir: 'left' | 'right'
  tone?: 'light' | 'dark'
  style?: React.CSSProperties
}) {
  const dark = tone === 'dark'

  return (
    <button
      onClick={onClick}
      aria-label={dir === 'left' ? 'previous' : 'next'}
      style={{
        background: dark ? '#ffffff' : 'rgba(255,255,255,0.12)',
        border: dark ? '1px solid #ced4da' : '1px solid rgba(255,255,255,0.22)',
        boxShadow: dark ? '0 4px 18px rgba(33,37,41,0.08)' : 'none',
        backdropFilter: dark ? 'none' : 'blur(6px)',
        cursor: 'pointer',
        width: '40px', height: '40px', flexShrink: 0,
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        color: dark ? '#212529' : '#ffffff',
        transition: 'background 0.18s ease, border-color 0.18s ease, color 0.18s ease',
        ...style,
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.background = dark ? '#f1f3f5' : 'rgba(255,255,255,0.28)'
        if (dark) e.currentTarget.style.borderColor = '#9AA3AC'
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.background = dark ? '#ffffff' : 'rgba(255,255,255,0.12)'
        if (dark) e.currentTarget.style.borderColor = '#ced4da'
      }}
    >
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        {dir === 'left'
          ? <polyline points="15 18 9 12 15 6" />
          : <polyline points="9 18 15 12 9 6" />}
      </svg>
    </button>
  )
}

function ImageSlideshow({ images, title }: { images: string[]; title: string }) {
  const [current, setCurrent] = useState(0)
  const [fading, setFading] = useState(false)
  const [fullscreen, setFullscreen] = useState(false)
  const [ribbonOffset, setRibbonOffset] = useState(0)
  const [ribbonViewportWidth, setRibbonViewportWidth] = useState(RIBBON_TRACK_W)
  const ribbonRef = useRef<HTMLDivElement>(null)
  const transitionTimerRef = useRef<number | null>(null)
  const fadeFrameRef = useRef<number | null>(null)

  const STEP = THUMB_SIZE + THUMB_GAP

  const showImage = (nextIndex: number) => {
    if (fading || nextIndex === current) return
    setFading(true)
    if (transitionTimerRef.current !== null) window.clearTimeout(transitionTimerRef.current)
    transitionTimerRef.current = window.setTimeout(() => {
      setCurrent(nextIndex)
      fadeFrameRef.current = window.requestAnimationFrame(() => setFading(false))
    }, 180)
  }

  const go = (dir: 1 | -1) => {
    showImage((current + dir + images.length) % images.length)
  }

  const goTo = (index: number) => showImage(index)

  useEffect(() => {
    setCurrent(0)
    setFading(false)
    setRibbonOffset(0)
  }, [images])

  useEffect(() => () => {
    if (transitionTimerRef.current !== null) window.clearTimeout(transitionTimerRef.current)
    if (fadeFrameRef.current !== null) window.cancelAnimationFrame(fadeFrameRef.current)
  }, [])

  useEffect(() => {
    const updateRibbonWidth = () => {
      if (ribbonRef.current) setRibbonViewportWidth(ribbonRef.current.clientWidth)
    }
    const observer = new ResizeObserver(updateRibbonWidth)
    if (ribbonRef.current) observer.observe(ribbonRef.current)
    updateRibbonWidth()
    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    const total = images.length * STEP - THUMB_GAP
    const max = Math.max(0, total - ribbonViewportWidth)
    const thumbnailStart = current * STEP
    const thumbnailEnd = thumbnailStart + THUMB_SIZE

    setRibbonOffset((previous) => {
      if (thumbnailStart < previous) return Math.max(0, thumbnailStart)
      if (thumbnailEnd > previous + ribbonViewportWidth) {
        return Math.min(max, thumbnailEnd - ribbonViewportWidth)
      }
      return Math.min(previous, max)
    })
  }, [current, images.length, ribbonViewportWidth])

  useEffect(() => {
    if (!fullscreen) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft') go(-1)
      if (e.key === 'ArrowRight') go(1)
      if (e.key === 'Escape') setFullscreen(false)
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [fullscreen, current, fading])

  useEffect(() => {
    document.body.style.overflow = fullscreen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [fullscreen])

  if (images.length === 0) return null

  const totalRibbonWidth = images.length * STEP - THUMB_GAP
  const maxOffset = Math.max(0, totalRibbonWidth - ribbonViewportWidth)
  const scrollRibbon = (dir: 1 | -1) => {
    setRibbonOffset((o) => Math.max(0, Math.min(maxOffset, o + dir * STEP * 3)))
  }

  const ThumbnailRibbon = () => (
    <div style={{ display: 'flex', alignItems: 'center', gap: '6px', width: '100%', maxWidth: `${RIBBON_TRACK_W + 68}px`, margin: '12px auto 0' }}>
      <button
        onClick={() => scrollRibbon(-1)}
        aria-label="scroll thumbnails left"
        style={{
          flexShrink: 0, width: '28px', height: THUMB_SIZE + 'px',
          background: 'none', border: 'none',
          cursor: ribbonOffset > 0 ? 'pointer' : 'default',
          color: ribbonOffset > 0 ? '#212529' : '#ced4da',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          padding: 0, transition: 'color 0.2s',
        }}
      >
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
          <polyline points="15 18 9 12 15 6" />
        </svg>
      </button>

      <div ref={ribbonRef} style={{ width: '100%', maxWidth: `${RIBBON_TRACK_W}px`, minWidth: 0, overflow: 'hidden' }}>
        <div style={{ display: 'flex', gap: `${THUMB_GAP}px`, transform: `translateX(-${ribbonOffset}px)`, transition: 'transform 0.35s ease' }}>
          {images.map((src, i) => (
            <button
              key={i}
              onClick={() => goTo(i)}
              aria-label={`view image ${i + 1}`}
              style={{
                flexShrink: 0,
                width: THUMB_SIZE + 'px', height: THUMB_SIZE + 'px',
                padding: 0, border: 'none', cursor: 'pointer',
                overflow: 'hidden',
                opacity: i === current ? 1 : 0.45,
                transition: 'opacity 0.2s',
                position: 'relative',
              }}
              onMouseEnter={(e) => { if (i !== current) e.currentTarget.style.opacity = '0.8' }}
              onMouseLeave={(e) => { if (i !== current) e.currentTarget.style.opacity = '0.45' }}
            >
              <ResponsiveImage
                src={src}
                sizes="96px"
                alt={`thumbnail ${i + 1}`}
                style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
              />
              {i === current && (
                <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: '2px', backgroundColor: '#b4906e' }} />
              )}
            </button>
          ))}
        </div>
      </div>

      <button
        onClick={() => scrollRibbon(1)}
        aria-label="scroll thumbnails right"
        style={{
          flexShrink: 0, width: '28px', height: THUMB_SIZE + 'px',
          background: 'none', border: 'none',
          cursor: ribbonOffset < maxOffset ? 'pointer' : 'default',
          color: ribbonOffset < maxOffset ? '#212529' : '#ced4da',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          padding: 0, transition: 'color 0.2s',
        }}
      >
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
          <polyline points="9 18 15 12 9 6" />
        </svg>
      </button>
    </div>
  )

  return (
    <>
      <div style={{ maxWidth: '1280px', margin: '0 auto', userSelect: 'none' }}>
        <div
          style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 'clamp(0.5rem,2vw,1rem)', width: '100%' }}
        >
          {images.length > 1 && <ArrowBtn dir="left" tone="dark" onClick={() => go(-1)} />}

          <div
            style={{
              position: 'relative',
              width: images.length > 1 ? 'min(760px, calc(100% - 112px))' : 'min(760px, 100%)',
              aspectRatio: '1 / 1',
              maxWidth: images.length > 1 ? 'calc(100% - 112px)' : '100%',
              flexShrink: 1,
              overflow: 'hidden',
            }}
          >
            <ResponsiveImage
              key={images[current]}
              src={images[current]}
              sizes="(max-width: 900px) calc(100vw - 7rem), 760px"
              alt={`${title} — ${current + 1}`}
              style={{
                width: '100%', height: '100%', objectFit: 'contain', display: 'block',
                opacity: fading ? 0 : 1,
                transition: 'opacity 0.25s ease',
              }}
            />

            <button
              onClick={() => setFullscreen(true)}
              aria-label="view fullscreen"
              style={{
                position: 'absolute', bottom: '0.75rem', right: '0.75rem',
                background: 'rgba(0,0,0,0.45)', border: '1px solid rgba(255,255,255,0.2)',
                backdropFilter: 'blur(4px)', cursor: 'pointer', padding: '7px',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                color: '#ffffff', transition: 'background 0.18s',
              }}
              onMouseEnter={(e) => (e.currentTarget.style.background = 'rgba(0,0,0,0.7)')}
              onMouseLeave={(e) => (e.currentTarget.style.background = 'rgba(0,0,0,0.45)')}
            >
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <polyline points="15 3 21 3 21 9" /><polyline points="9 21 3 21 3 15" />
                <line x1="21" y1="3" x2="14" y2="10" /><line x1="3" y1="21" x2="10" y2="14" />
              </svg>
            </button>

            <div style={{ position: 'absolute', bottom: '0.75rem', left: '0.75rem', fontSize: '0.6rem', letterSpacing: '0.1em', color: 'rgba(255,255,255,0.75)', background: 'rgba(0,0,0,0.4)', padding: '3px 8px' }}>
              {current + 1} / {images.length}
            </div>
          </div>

          {images.length > 1 && <ArrowBtn dir="right" tone="dark" onClick={() => go(1)} />}
        </div>

        {images.length > 1 && <ThumbnailRibbon />}
      </div>

      {fullscreen && (
        <div
          style={{
            position: 'fixed', inset: 0, zIndex: 200,
            backgroundColor: 'rgba(0,0,0,0.88)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
          }}
          onClick={(e) => { if (e.target === e.currentTarget) setFullscreen(false) }}
        >
          <button
            onClick={() => setFullscreen(false)}
            aria-label="close fullscreen"
            style={{
              position: 'absolute', top: '1.25rem', right: '1.25rem',
              background: 'rgba(255,255,255,0.1)', border: '1px solid rgba(255,255,255,0.2)',
              cursor: 'pointer', width: '40px', height: '40px',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              color: '#ffffff', zIndex: 1,
            }}
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>

          <div style={{ position: 'absolute', top: '1.4rem', left: '50%', transform: 'translateX(-50%)', fontSize: '0.65rem', letterSpacing: '0.12em', color: 'rgba(255,255,255,0.5)' }}>
            {current + 1} / {images.length}
          </div>

          {images.length > 1 && (
            <ArrowBtn dir="left" onClick={() => go(-1)} style={{ position: 'absolute', left: '1.5rem', top: '50%', transform: 'translateY(-50%)' }} />
          )}

          <ResponsiveImage
            src={images[current]}
            sizes="calc(100vw - 8rem)"
            loading="eager"
            alt={`${title} — ${current + 1}`}
            style={{
              maxWidth: 'calc(100vw - 8rem)',
              maxHeight: 'calc(100vh - 6rem)',
              objectFit: 'contain',
              display: 'block',
              opacity: fading ? 0 : 1,
              transition: 'opacity 0.2s ease',
            }}
          />

          {images.length > 1 && (
            <ArrowBtn dir="right" onClick={() => go(1)} style={{ position: 'absolute', right: '1.5rem', top: '50%', transform: 'translateY(-50%)' }} />
          )}
        </div>
      )}
    </>
  )
}

export default function ProjectDetail({ slug, navigate }: Props) {
  const { lang } = useLang()
  const zh = lang === 'zh'
  const project = projects.find((p) => p.slug === slug)

  if (!project) {
    return (
      <div style={{ padding: '8rem clamp(2rem,5vw,6rem)', textAlign: 'center' }}>
        <p style={{ color: '#9AA3AC', fontSize: '0.85rem' }}>{zh ? '未找到该项目。' : 'project not found.'}</p>
        <button onClick={() => navigate({ id: 'projects' })} style={{ marginTop: '1rem', background: 'none', border: 'none', cursor: 'pointer', fontSize: '0.75rem', letterSpacing: '0.08em', textDecoration: 'underline', fontFamily: 'inherit' }}>
          {zh ? '返回全部项目' : 'back to projects'}
        </button>
      </div>
    )
  }

  const images = project.images ?? []
  const bannerImage = images[0] ?? ''
  const slideshowImages = images.length > 1
    ? [images[1], images[0], ...images.slice(2)]
    : images

  const idx = projects.findIndex((p) => p.slug === slug)
  const prev = projects[(idx - 1 + projects.length) % projects.length]
  const next = projects[(idx + 1) % projects.length]
  const related = projects.filter((p) => project.related.includes(p.slug)).slice(0, 2)
  const hasDescription = Boolean(project.description[lang].trim())
  const projectTypes = formatProjectTypes(project.type, lang)
  const projectStatus = formatProjectStatus(project.status, lang)

  const meta = [
    { label: zh ? '地点' : 'location', value: project.location[lang] },
    ...(project.year ? [{ label: zh ? '年份' : 'year', value: project.year }] : []),
    { label: zh ? '类型' : 'type', value: projectTypes },
    ...(projectStatus ? [{ label: zh ? '状态' : 'status', value: projectStatus }] : []),
    ...(project.gfa ? [{ label: zh ? '总建筑面积' : 'gross floor area (gfa)', value: project.gfa }] : []),
    ...(project.estimatedCost ? [{ label: zh ? '预计造价' : 'estimated cost', value: project.estimatedCost }] : []),
  ]

  return (
    <div style={{ paddingTop: '64px' }}>
      {/* Banner image */}
      <div style={{ height: 'clamp(400px, 65vh, 700px)', backgroundColor: '#212529', overflow: 'hidden', position: 'relative' }}>
        {bannerImage && (
          <ResponsiveImage
            src={bannerImage}
            alt={project.title[lang]}
            sizes="100vw"
            loading="eager"
            fetchPriority="high"
            style={{
              width: '100%', height: '100%', objectFit: 'cover', opacity: 0.85,
              filter: 'blur(0px)', transform: 'scale(1.015)',
            }}
          />
        )}
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(0,0,0,0.6) 0%, transparent 50%)' }} />
        <div style={{ position: 'absolute', bottom: '3rem', left: 'clamp(2rem,5vw,6rem)', right: '2rem' }}>
          <p style={{ fontSize: '0.65rem', letterSpacing: '0.15em', color: 'rgba(255,255,255,0.5)', marginBottom: '0.75rem' }}>
            {projectTypes}
          </p>
          <h1 style={{ fontSize: 'clamp(1.8rem, 4vw, 3rem)', fontWeight: 300, color: '#ffffff', lineHeight: 1.15, letterSpacing: '-0.01em' }}>
            {project.title[lang]}
          </h1>
          <p style={{ fontSize: '0.8rem', color: 'rgba(255,255,255,0.65)', marginTop: '0.5rem', letterSpacing: '0.04em' }}>
            {project.location[lang]}
          </p>
        </div>
      </div>

      {/* Meta + description */}
      <section style={{ padding: 'clamp(4rem,8vw,7rem) clamp(2rem,5vw,6rem)' }}>
        <div style={{ maxWidth: '1560px', margin: '0 auto' }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 'clamp(3rem,6vw,6rem)', alignItems: 'start' }}>
            <div>
              {meta.map((m) => (
                <div key={m.label} style={{ display: 'flex', gap: '1rem', padding: '1rem 0', borderBottom: '1px solid #dee2e6' }}>
                  <span style={{ fontSize: '0.65rem', color: '#b4906e', letterSpacing: '0.1em', width: '150px', flexShrink: 0, whiteSpace: 'nowrap' }}>{m.label}</span>
                  <span style={{ fontSize: '0.78rem', color: '#495057', letterSpacing: '0.04em' }}>{m.value}</span>
                </div>
              ))}
            </div>
            <div>
              {hasDescription && (
                <div>
                  {project.description[lang]
                    .split('\n')
                    .map((paragraph) => paragraph.trim())
                    .filter(Boolean)
                    .map((paragraph, index, paragraphs) => (
                      <p
                        key={`${project.slug}-description-${index}`}
                        style={{
                          fontSize: '0.9rem',
                          lineHeight: 1.95,
                          color: '#495057',
                          letterSpacing: '0.02em',
                          marginBottom: index === paragraphs.length - 1 ? 0 : '1.25rem',
                        }}
                      >
                        {paragraph}
                      </p>
                    ))}
                </div>
              )}
              {project.awards.length > 0 && (
                <div
                  style={{
                    marginTop: hasDescription ? '3rem' : 0,
                    paddingTop: hasDescription ? '2rem' : '1rem',
                    borderTop: hasDescription ? '1px solid #dee2e6' : 'none',
                  }}
                >
                  <h2 style={{ fontSize: '0.65rem', fontWeight: 400, letterSpacing: '0.15em', color: '#b4906e', marginBottom: '1.25rem' }}>
                    {zh ? '奖项' : 'awards'}
                  </h2>
                  <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
                    {project.awards.map((award, index) => (
                      <li
                        key={`${award.en}-${index}`}
                        style={{ fontSize: '0.78rem', lineHeight: 1.75, color: '#495057', letterSpacing: '0.03em', padding: '0.75rem 0' }}
                      >
                        {award[lang]}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Gallery slideshow */}
      {slideshowImages.length > 0 && (
        <section style={{ padding: '0 0 clamp(5rem,9vw,8rem)' }}>
          <div style={{ maxWidth: '1560px', margin: '0 auto', padding: '0 clamp(0.5rem,2vw,2rem)' }}>
            <ImageSlideshow images={slideshowImages} title={project.title[lang]} />
          </div>
        </section>
      )}

      {/* Related projects */}
      {related.length > 0 && (
        <section style={{ borderTop: '1px solid #dee2e6', padding: 'clamp(4rem,8vw,7rem) clamp(2rem,5vw,6rem)' }}>
          <div style={{ maxWidth: '1560px', margin: '0 auto' }}>
            <p style={{ fontSize: '0.65rem', letterSpacing: '0.15em', color: '#b4906e', marginBottom: '2.5rem' }}>
              {zh ? '相关项目' : 'related projects'}
            </p>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '2rem' }}>
              {related.map((p) => (
                <button
                  key={p.slug}
                  onClick={() => navigate({ id: 'project-detail', slug: p.slug })}
                  style={{ display: 'block', background: 'none', border: 'none', cursor: 'pointer', padding: 0, textAlign: 'left' }}
                >
                  <div className="img-zoom" style={{ aspectRatio: '1/1', backgroundColor: '#e9ecef', overflow: 'hidden' }}>
                    {p.images[0] && (
                      <ResponsiveImage
                        src={p.images[0]}
                        alt={p.title[lang]}
                        sizes="(max-width: 767px) calc(100vw - 4rem), (max-width: 1200px) 50vw, 520px"
                        style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
                      />
                    )}
                  </div>
                  <div style={{ paddingTop: '1rem' }}>
                    <p style={{ fontSize: '0.9rem', fontWeight: 400, letterSpacing: '0.01em', marginBottom: '0.25rem', color: '#212529' }}>
                      {p.title[lang]}
                    </p>
                    <p style={{ fontSize: '0.7rem', color: '#9AA3AC', letterSpacing: '0.05em' }}>
                      {p.location[lang]}
                    </p>
                  </div>
                </button>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Prev / next */}
      <div style={{ borderTop: '1px solid #dee2e6', display: 'grid', gridTemplateColumns: '1fr 1fr' }}>
        <button
          onClick={() => navigate({ id: 'project-detail', slug: prev.slug })}
          style={{ background: 'none', border: 'none', borderRight: '1px solid #dee2e6', cursor: 'pointer', padding: '2rem', textAlign: 'left', fontFamily: 'inherit', transition: 'background-color 0.2s ease' }}
          onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = '#f8f9fa')}
          onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = 'transparent')}
        >
          <p style={{ fontSize: '0.6rem', letterSpacing: '0.1em', color: '#9AA3AC', marginBottom: '0.5rem' }}>
            {zh ? '← 上一个项目' : '← previous'}
          </p>
          <p style={{ fontSize: '0.85rem', color: '#212529', letterSpacing: '0.02em' }}>
            {prev.title[lang]}
          </p>
        </button>
        <button
          onClick={() => navigate({ id: 'project-detail', slug: next.slug })}
          style={{ background: 'none', border: 'none', cursor: 'pointer', padding: '2rem', textAlign: 'right', fontFamily: 'inherit', transition: 'background-color 0.2s ease' }}
          onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = '#f8f9fa')}
          onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = 'transparent')}
        >
          <p style={{ fontSize: '0.6rem', letterSpacing: '0.1em', color: '#9AA3AC', marginBottom: '0.5rem' }}>
            {zh ? '下一个项目 →' : 'next →'}
          </p>
          <p style={{ fontSize: '0.85rem', color: '#212529', letterSpacing: '0.02em' }}>
            {next.title[lang]}
          </p>
        </button>
      </div>
    </div>
  )
}

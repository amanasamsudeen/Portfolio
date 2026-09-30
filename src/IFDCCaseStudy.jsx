import { useState } from 'react'

const IFDC_LOGO = "https://lh3.googleusercontent.com/aida/AEtjO1Xivlt7PE9Eq1Uw_o6DJCWGGHtj3xdmNuUTRgfzbRXKjlX5WWqT1HzUGJsU6eohohnV52LTq3Ht2P6NOFBtp_V3NklQ8IpQVat4Qg0Qy13JfEJfRoSYh_NNhIgAm_8wVH7G8Yig4oas7xVjLK2D8GhDqG8aqVUeCeaaIu1sO3IIjALz1Fx2u2A4XDcSKBjQAdH7mJ7CI_PtWNlN6fhTRYj__msvXjvjkHLYFcVxc-tnlRvX4MbIlsD0QtRy"
const KIDS_TABLET = "https://lh3.googleusercontent.com/aida/AEtjO1UTrEJpIAqlGoAksTxF8JevlEj6R-p5Hxz2zPZj7SR3tRVZQ--X5aPumd5HhkVnvvoMgACyeouw-pxZbsMqLbBj7NJLUT4owroNw0mbxuMyBYjOe_VQ4g0zPcTSB-8Df6j4dW1NoqYOcKvRYciHSdsmgufAFuZulrIPFOtiDXW-32oOe9H6o4DKSLVKlp4E7uAy7xOWxuqnM-XtYckxKPQg34fTyJsY946iwR7uS9L2GKp9qWHdeBIIobvR"
const CLASSROOM = "https://lh3.googleusercontent.com/aida/AEtjO1U-Sr58PvczZMx50v3Of0DzFur3-EjANKd1U3EFbM1DWpkhWGT-btadAJVrErvg-18B0QkSK16creOe-kvVXzuC8LSjDs4poTmrRtMH49lw3W1sviBMows_eXagwt6Wjg4eQ64LBtoIXIs3862UwdHJMsMmh3zekUINUafu1HAY-xPnJBzSHH-UPUX4GRIlp-9RNvZ9yPqr6Hf3FMVgutaziMWww0DMUdUtT5yBz8Uy-7DHHExJvIA2BMA"
const DIGITAL_CHILDREN = "https://lh3.googleusercontent.com/aida/AEtjO1VeT1gpwlPU-ECsnL5PXJa-DgiyO4nqgra0INtRZ0lh6OJTSPmxeKWsR7hObWRAwxX9rEMw836PCWIFBDbu6RyYzgViziydV5ofTE86FRpwZt3Ic_W4wFo8DfJcvjS1yrfYAvzzI6mhXqzSJKqTlcYIMrdOeXVMIPE_7xT9fkKhRs3U7WOG4g0z5I_g1NW5hGVw0kqvfYlHRe8vWUxecl420H3sli-XTGti76MQfd9D01TVDNF-7u_TumxB"
const AWARENESS = "https://lh3.googleusercontent.com/aida/AEtjO1WDaafWCJ28lr1E_7NcRHcnz8v4VO1NUCIPt-QWdEK1Nw5YsvkpeQ9SVadwJantw4KMyZ73-ICCAudb4WCMb8SbWfBQ1pjeLZ47mLuPh_rlS9DkrOSjo3G4svpukeWn2Mf1ymWozPfn_W8oJwHdKu2w9_1Do1gl4mDCscinh5diMT6TIyDAT5TLKYneVR10OjJ0QdM6oWevJcsi1-wQ3ge-wM6koaJKpunhGbVLiDhfRdGEsf93FdqeYrcG"

export default function IFDCCaseStudy({ onBack, onNavigateCaseStudy }) {
  const [activeTab, setActiveTab] = useState('overview')

  const sections = [
    { id: 'overview', num: '01', title: 'Mission & Overview' },
    { id: 'challenge', num: '02', title: 'Digital Safety Challenges' },
    { id: 'architecture', num: '03', title: 'System Architecture' },
    { id: 'fieldwork', num: '04', title: 'Fieldwork & Impact Gallery' },
    { id: 'features', num: '05', title: 'Platform Capabilities' },
    { id: 'compliance', num: '06', title: 'Security & Compliance' },
    { id: 'impact', num: '07', title: 'Milestones & Statistics' },
  ]

  const scrollToSection = (id) => {
    setActiveTab(id)
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <div style={{ width: '100%', background: 'var(--surface)', color: 'var(--on-surface)', minHeight: '100vh', paddingTop: '4rem' }}>
      {/* Top Breadcrumb & Meta Bar */}
      <div style={{
        background: 'var(--surface-container-lowest)',
        borderBottom: `1px solid color-mix(in srgb, var(--outline-variant) 30%, transparent)`,
        padding: '0.75rem var(--margin)',
      }}>
        <div className="max-w-container" style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between', gap: '0.75rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <button
              onClick={onBack}
              className="text-label-mono"
              style={{
                display: 'inline-flex', alignItems: 'center', gap: '0.375rem',
                color: 'var(--on-surface-variant)', background: 'none', border: 'none',
                cursor: 'pointer', transition: 'color 0.2s',
              }}
              onMouseEnter={(e) => e.currentTarget.style.color = 'var(--primary)'}
              onMouseLeave={(e) => e.currentTarget.style.color = 'var(--on-surface-variant)'}
            >
              <span className="material-symbols-outlined" style={{ fontSize: 16 }}>arrow_back</span>
              <span>SYSTEMS PORTFOLIO</span>
            </button>
            <span style={{ color: 'var(--outline-variant)', fontFamily: 'var(--font-mono)' }}>/</span>
            <span className="text-label-mono" style={{ color: 'var(--primary)', display: 'flex', alignItems: 'center', gap: '0.375rem' }}>
              <span style={{ width: 6, height: 6, borderRadius: '50%', background: 'var(--primary)' }} className="animate-pulse" />
              ifdc-child-safety.prod.org
            </span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            <span style={{
              padding: '0.2rem 0.6rem', borderRadius: 'var(--radius)',
              background: 'var(--surface-container)', color: 'var(--secondary)',
              fontSize: 10, fontFamily: 'var(--font-mono)', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.08em',
            }}>
              NGO Production Spec
            </span>
            <span style={{
              padding: '0.2rem 0.6rem', borderRadius: 'var(--radius)',
              background: 'var(--surface-container-high)', color: 'var(--primary)',
              fontSize: 10, fontFamily: 'var(--font-mono)', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.08em',
            }}>
              Deployed Live
            </span>
          </div>
        </div>
      </div>

      {/* Hero Header */}
      <section style={{ background: 'var(--surface-container-low)', padding: 'var(--space-xl) 0', borderBottom: `1px solid color-mix(in srgb, var(--outline-variant) 20%, transparent)` }}>
        <div className="max-w-container" style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-lg)' }}>
          <div style={{ display: 'flex', flexDirection: 'row', flexWrap: 'wrap', alignItems: 'flex-end', justifyContent: 'space-between', gap: 'var(--space-lg)' }}>
            <div style={{ maxWidth: '48rem', display: 'flex', flexDirection: 'column', gap: 'var(--space-xs)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: 4 }}>
                <img src={IFDC_LOGO} alt="IFDC Logo" style={{ height: 32, width: 'auto', objectFit: 'contain', background: 'var(--surface-container-lowest)', padding: '2px 8px', borderRadius: 4 }} />
                <span className="text-label-mono" style={{ color: 'var(--primary)' }}>INTERNET SAFETY &amp; CHILD PROTECTION</span>
              </div>
              <h1 className="text-display" style={{ color: 'var(--on-surface)', marginTop: '0.25rem' }}>
                IFDC Web Platform
              </h1>
              <p className="text-body-lg" style={{ color: 'var(--on-surface-variant)', marginTop: '0.5rem', lineHeight: '1.7' }}>
                A robust, accessible digital safety hub engineered for the Internet Foundation for Digital Children (IFDC). Delivering real-time child protection awareness curricula, interactive educational resources, and secure workshop scheduling across schools.
              </p>
            </div>

            {/* CTAs */}
            <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: 'var(--space-sm)', flexShrink: 0 }}>
              <a
                href="https://ifdchild.org"
                target="_blank"
                rel="noreferrer"
                style={{
                  display: 'inline-flex', alignItems: 'center', gap: '0.5rem',
                  padding: '0.625rem 1.25rem', borderRadius: 'var(--radius-lg)',
                  background: 'var(--primary)', color: 'var(--on-primary)',
                  fontWeight: 600, fontSize: 14,
                  boxShadow: '0 4px 14px rgba(0,0,0,0.15)',
                  transition: 'all 0.2s',
                }}
              >
                <span className="material-symbols-outlined" style={{ fontSize: 18 }}>open_in_new</span>
                <span>Visit Live Platform</span>
              </a>
              <button
                onClick={onBack}
                style={{
                  display: 'inline-flex', alignItems: 'center', gap: '0.5rem',
                  padding: '0.625rem 1.25rem', borderRadius: 'var(--radius-lg)',
                  background: 'var(--surface-container-high)', color: 'var(--on-surface)',
                  fontFamily: 'var(--font-mono)', fontSize: 13, fontWeight: 600,
                  border: `1px solid color-mix(in srgb, var(--outline-variant) 40%, transparent)`,
                  cursor: 'pointer',
                }}
              >
                <span className="material-symbols-outlined" style={{ fontSize: 18 }}>arrow_back</span>
                <span>Back to Portfolio</span>
              </button>
            </div>
          </div>

          {/* Quick Specs Bento */}
          <div style={{
            display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
            gap: 'var(--space-md)', paddingTop: 'var(--space-md)',
          }}>
            <div style={{ padding: 'var(--space-md)', borderRadius: 'var(--radius-2xl)', background: 'var(--surface-container)', boxShadow: '0 1px 4px rgba(0,0,0,0.05)' }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', color: 'var(--outline)' }}>
                <span className="text-label-mono" style={{ textTransform: 'uppercase' }}>Target Reach</span>
                <span className="material-symbols-outlined" style={{ fontSize: 18 }}>groups</span>
              </div>
              <div style={{ marginTop: 'var(--space-sm)' }}>
                <div className="text-headline-sm" style={{ color: 'var(--on-surface)', fontWeight: 700 }}>15,000+ Youth</div>
                <div className="text-body-sm" style={{ color: 'var(--on-surface-variant)', marginTop: 2 }}>Students, Teachers &amp; Guardians</div>
              </div>
            </div>

            <div style={{ padding: 'var(--space-md)', borderRadius: 'var(--radius-2xl)', background: 'var(--surface-container)', boxShadow: '0 1px 4px rgba(0,0,0,0.05)' }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', color: 'var(--secondary)' }}>
                <span className="text-label-mono" style={{ textTransform: 'uppercase' }}>Backend Service</span>
                <span className="material-symbols-outlined" style={{ fontSize: 18 }}>cloud_done</span>
              </div>
              <div style={{ marginTop: 'var(--space-sm)' }}>
                <div className="text-headline-sm" style={{ color: 'var(--secondary)', fontWeight: 700 }}>Railway Cloud</div>
                <div className="text-body-sm" style={{ color: 'var(--on-surface-variant)', marginTop: 2 }}>High-Throughput Node.js &amp; PostgreSQL</div>
              </div>
            </div>

            <div style={{ padding: 'var(--space-md)', borderRadius: 'var(--radius-2xl)', background: 'var(--surface-container)', boxShadow: '0 1px 4px rgba(0,0,0,0.05)' }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', color: 'var(--primary)' }}>
                <span className="text-label-mono" style={{ textTransform: 'uppercase' }}>Accessibility Standard</span>
                <span className="material-symbols-outlined" style={{ fontSize: 18 }}>accessibility_new</span>
              </div>
              <div style={{ marginTop: 'var(--space-sm)' }}>
                <div className="text-headline-sm" style={{ color: 'var(--primary)', fontWeight: 700 }}>WCAG 2.1 AA</div>
                <div className="text-body-sm" style={{ color: 'var(--on-surface-variant)', marginTop: 2 }}>Multi-Device &amp; Low-Bandwidth Optimised</div>
              </div>
            </div>

            <div style={{ padding: 'var(--space-md)', borderRadius: 'var(--radius-2xl)', background: 'var(--surface-container)', boxShadow: '0 1px 4px rgba(0,0,0,0.05)' }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', color: 'var(--tertiary)' }}>
                <span className="text-label-mono" style={{ textTransform: 'uppercase' }}>Safety Compliance</span>
                <span className="material-symbols-outlined" style={{ fontSize: 18 }}>security</span>
              </div>
              <div style={{ marginTop: 'var(--space-sm)' }}>
                <div className="text-headline-sm" style={{ color: 'var(--tertiary)', fontWeight: 700 }}>COPPA / GDPR</div>
                <div className="text-body-sm" style={{ color: 'var(--on-surface-variant)', marginTop: 2 }}>Zero Child-Data Retention Protocol</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content Layout */}
      <div className="max-w-container" style={{ padding: 'var(--space-xl) var(--margin)', display: 'flex', flexDirection: 'row', gap: 'var(--space-xl)' }}>
        {/* Left Floating Sidebar */}
        <aside style={{ width: '280px', flexShrink: 0, display: 'flex', flexDirection: 'column', gap: 'var(--space-md)', position: 'sticky', top: '5rem', height: 'fit-content' }}>
          <div style={{ padding: 'var(--space-md)', borderRadius: 'var(--radius-2xl)', background: 'var(--surface-container)', boxShadow: '0 1px 4px rgba(0,0,0,0.05)' }}>
            <span className="text-label-mono" style={{ color: 'var(--outline)', textTransform: 'uppercase', fontWeight: 600, display: 'block', marginBottom: 'var(--space-sm)' }}>
              Document Traversal
            </span>
            <nav style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
              {sections.map((s) => (
                <button
                  key={s.id}
                  onClick={() => scrollToSection(s.id)}
                  style={{
                    display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                    padding: '6px 10px', borderRadius: 'var(--radius)',
                    color: activeTab === s.id ? 'var(--primary)' : 'var(--on-surface-variant)',
                    background: activeTab === s.id ? 'var(--surface-container-high)' : 'transparent',
                    fontSize: 12, fontFamily: 'var(--font-mono)', textAlign: 'left',
                    transition: 'all 0.15s',
                  }}
                >
                  <span style={{ whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{s.num}. {s.title}</span>
                  <span style={{ color: 'var(--outline)', fontSize: 10, marginLeft: 6 }}>#{s.num}</span>
                </button>
              ))}
            </nav>
          </div>

          {/* Quick Platform Status */}
          <div style={{ padding: 'var(--space-md)', borderRadius: 'var(--radius-2xl)', background: 'var(--surface-container-low)', display: 'flex', flexDirection: 'column', gap: 'var(--space-xs)' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <span className="text-label-mono" style={{ textTransform: 'uppercase' }}>Platform Telemetry</span>
              <span style={{ width: 8, height: 8, borderRadius: '50%', background: 'var(--primary)' }} className="animate-pulse" />
            </div>
            <div className="text-label-mono" style={{ color: 'var(--primary)', display: 'flex', alignItems: 'center', gap: 6 }}>
              <span className="material-symbols-outlined" style={{ fontSize: 14 }}>dns</span>
              <span>Railway API: 99.98% SLA</span>
            </div>
            <div className="text-label-mono" style={{ color: 'var(--on-surface-variant)', display: 'flex', alignItems: 'center', gap: 6 }}>
              <span className="material-symbols-outlined" style={{ fontSize: 14 }}>photo_library</span>
              <span>CDN Asset Storage: Healthy</span>
            </div>
            <div className="text-label-mono" style={{ color: 'var(--on-surface-variant)', display: 'flex', alignItems: 'center', gap: 6 }}>
              <span className="material-symbols-outlined" style={{ fontSize: 14 }}>lock</span>
              <span>Safe Reporting Vault: Secure</span>
            </div>
          </div>
        </aside>

        {/* Content Track */}
        <div style={{ flex: 1, minWidth: 0, display: 'flex', flexDirection: 'column', gap: 'var(--space-xl)' }}>
          {/* 01. Mission & Overview */}
          <section id="overview" style={{ scrollMarginTop: '6rem', display: 'flex', flexDirection: 'column', gap: 'var(--space-md)' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <span className="text-label-mono" style={{ color: 'var(--primary)', fontSize: 18, fontWeight: 700 }}>01</span>
              <h2 className="text-headline-lg" style={{ color: 'var(--on-surface)' }}>Mission &amp; Overview</h2>
            </div>
            <p className="text-body-lg" style={{ color: 'var(--on-surface-variant)', lineHeight: 1.8 }}>
              The Internet Foundation for Digital Children (IFDC) empowers the next generation with digital resilience, cyber-bullying countermeasures, and safe internet usage guidelines. As the primary developer, I built the client-facing platform and backend content pipeline that powers their nationwide educational workshops, school curricula, and online incident resources.
            </p>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: 'var(--space-md)', marginTop: '0.5rem' }}>
              <div style={{ padding: 'var(--space-md)', borderRadius: 'var(--radius-2xl)', background: 'var(--surface-container)', display: 'flex', flexDirection: 'column', gap: 6 }}>
                <span className="text-label-mono" style={{ color: 'var(--secondary)', textTransform: 'uppercase' }}>Key Role</span>
                <span style={{ fontSize: 16, fontWeight: 600 }}>Lead Platform Developer</span>
                <p className="text-body-sm" style={{ color: 'var(--on-surface-variant)' }}>Full lifecycle architectural design, frontend implementation, database modeling, and deployment.</p>
              </div>
              <div style={{ padding: 'var(--space-md)', borderRadius: 'var(--radius-2xl)', background: 'var(--surface-container)', display: 'flex', flexDirection: 'column', gap: 6 }}>
                <span className="text-label-mono" style={{ color: 'var(--primary)', textTransform: 'uppercase' }}>Target Demographic</span>
                <span style={{ fontSize: 16, fontWeight: 600 }}>K-12 Students &amp; Educators</span>
                <p className="text-body-sm" style={{ color: 'var(--on-surface-variant)' }}>Designed for clear visual hierarchy, simple vocabulary, high-contrast readability, and rapid loading.</p>
              </div>
              <div style={{ padding: 'var(--space-md)', borderRadius: 'var(--radius-2xl)', background: 'var(--surface-container)', display: 'flex', flexDirection: 'column', gap: 6 }}>
                <span className="text-label-mono" style={{ color: 'var(--tertiary)', textTransform: 'uppercase' }}>Operational Impact</span>
                <span style={{ fontSize: 16, fontWeight: 600 }}>Active NGO Infrastructure</span>
                <p className="text-body-sm" style={{ color: 'var(--on-surface-variant)' }}>Currently serving thousands of participants across workshops, webinars, and partner school programs.</p>
              </div>
            </div>
          </section>

          {/* 02. Digital Safety Challenges */}
          <section id="challenge" style={{ scrollMarginTop: '6rem', display: 'flex', flexDirection: 'column', gap: 'var(--space-md)' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <span className="text-label-mono" style={{ color: 'var(--secondary)', fontSize: 18, fontWeight: 700 }}>02</span>
              <h2 className="text-headline-lg" style={{ color: 'var(--on-surface)' }}>Digital Safety Challenges</h2>
            </div>
            <div style={{ padding: 'var(--space-lg)', borderRadius: 'var(--radius-2xl)', background: 'var(--surface-container-low)', display: 'flex', flexDirection: 'column', gap: 'var(--space-md)' }}>
              <p className="text-body-md" style={{ color: 'var(--on-surface-variant)' }}>
                Building an educational platform specifically dedicated to child internet protection introduces critical user experience and engineering challenges:
              </p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-sm)' }}>
                {[
                  { icon: 'speed', color: 'var(--primary)', title: 'Low-Bandwidth Mobile Accessibility', desc: 'Many participating schools and students in regional communities access the platform via 3G networks and entry-level mobile devices, necessitating zero bundle bloat and highly optimized media assets.' },
                  { icon: 'shield_person', color: 'var(--secondary)', title: 'Child Safety & Privacy Paranoia', desc: 'Zero personally identifiable information (PII) from minors can be stored or tracked across interactive quiz sessions and downloadable guidance materials.' },
                  { icon: 'edit_calendar', color: 'var(--tertiary)', title: 'Dynamic Educator Workshop Management', desc: 'Administrators needed an effortless custom portal to schedule nationwide in-person and virtual school assemblies, track seat quotas, and issue participation resources.' },
                ].map((item, idx) => (
                  <div key={idx} style={{ display: 'flex', alignItems: 'flex-start', gap: '0.75rem', padding: 'var(--space-sm) var(--space-md)', borderRadius: 'var(--radius-lg)', background: 'var(--surface-container)' }}>
                    <span className="material-symbols-outlined" style={{ color: item.color, marginTop: 2, fontSize: 20 }}>{item.icon}</span>
                    <div>
                      <div style={{ fontWeight: 600, fontSize: 15, color: 'var(--on-surface)' }}>{item.title}</div>
                      <div className="text-body-sm" style={{ color: 'var(--on-surface-variant)', marginTop: 2 }}>{item.desc}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* 03. System Architecture */}
          <section id="architecture" style={{ scrollMarginTop: '6rem', display: 'flex', flexDirection: 'column', gap: 'var(--space-md)' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <span className="text-label-mono" style={{ color: 'var(--primary)', fontSize: 18, fontWeight: 700 }}>03</span>
              <h2 className="text-headline-lg" style={{ color: 'var(--on-surface)' }}>System Architecture</h2>
            </div>
            <div style={{
              width: '100%', padding: 'var(--space-lg)', borderRadius: 'var(--radius-2xl)',
              background: 'var(--surface-container-lowest)',
              border: `1px solid color-mix(in srgb, var(--outline-variant) 30%, transparent)`,
            }}>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: 'var(--space-md)' }}>
                <div style={{ padding: 'var(--space-md)', borderRadius: 'var(--radius-xl)', background: 'var(--surface-container)', display: 'flex', flexDirection: 'column', gap: 6 }}>
                  <div className="text-label-mono" style={{ color: 'var(--primary)' }}>FRONTEND ENGINE</div>
                  <div className="text-headline-sm" style={{ fontWeight: 700 }}>React SPA</div>
                  <p className="text-body-sm" style={{ color: 'var(--on-surface-variant)' }}>
                    Client-side hydration with adaptive image srcset and lazy loading. Complete accessibility audit guaranteeing WCAG 2.1 compliance for youth with learning variances.
                  </p>
                </div>
                <div style={{ padding: 'var(--space-md)', borderRadius: 'var(--radius-xl)', background: 'var(--surface-container)', display: 'flex', flexDirection: 'column', gap: 6 }}>
                  <div className="text-label-mono" style={{ color: 'var(--secondary)' }}>API MICROSERVICE</div>
                  <div className="text-headline-sm" style={{ fontWeight: 700 }}>Node.js / Express</div>
                  <p className="text-body-sm" style={{ color: 'var(--on-surface-variant)' }}>
                    Containerized and hosted on Railway with automatic scaling. Provides REST endpoints for event schedules, blog publications, and downloadable safety modules.
                  </p>
                </div>
                <div style={{ padding: 'var(--space-md)', borderRadius: 'var(--radius-xl)', background: 'var(--surface-container)', display: 'flex', flexDirection: 'column', gap: 6 }}>
                  <div className="text-label-mono" style={{ color: 'var(--tertiary)' }}>PERSISTENCE &amp; MEDIA</div>
                  <div className="text-headline-sm" style={{ fontWeight: 700 }}>PostgreSQL &amp; CDN</div>
                  <p className="text-body-sm" style={{ color: 'var(--on-surface-variant)' }}>
                    Structured relational schemas for workshop registrations and news feeds, backed by geo-distributed CDN caching for low-latency image assets.
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* 04. Fieldwork & Impact Gallery */}
          <section id="fieldwork" style={{ scrollMarginTop: '6rem', display: 'flex', flexDirection: 'column', gap: 'var(--space-md)' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <span className="text-label-mono" style={{ color: 'var(--secondary)', fontSize: 18, fontWeight: 700 }}>04</span>
              <h2 className="text-headline-lg" style={{ color: 'var(--on-surface)' }}>Fieldwork &amp; Impact Gallery</h2>
            </div>
            <p className="text-body-md" style={{ color: 'var(--on-surface-variant)' }}>
              Photographic documentation from real-world IFDC classroom initiatives, tablet distribution programs, and child safety workshops:
            </p>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 'var(--space-md)' }}>
              <div style={{ borderRadius: 'var(--radius-xl)', overflow: 'hidden', background: 'var(--surface-container-low)', border: `1px solid color-mix(in srgb, var(--outline-variant) 30%, transparent)` }}>
                <img src={KIDS_TABLET} alt="Students with tablets" style={{ width: '100%', height: 200, objectFit: 'cover' }} />
                <div style={{ padding: 'var(--space-md)' }}>
                  <span className="text-label-mono" style={{ color: 'var(--primary)' }}>CLASSROOM INITIATIVE</span>
                  <div style={{ fontWeight: 600, fontSize: 15, marginTop: 4 }}>Interactive Digital Tablet Program</div>
                  <p className="text-body-sm" style={{ color: 'var(--on-surface-variant)', marginTop: 4 }}>Students utilizing the IFDC platform modules to learn cyber safety fundamentals.</p>
                </div>
              </div>

              <div style={{ borderRadius: 'var(--radius-xl)', overflow: 'hidden', background: 'var(--surface-container-low)', border: `1px solid color-mix(in srgb, var(--outline-variant) 30%, transparent)` }}>
                <img src={CLASSROOM} alt="Computer lab" style={{ width: '100%', height: 200, objectFit: 'cover' }} />
                <div style={{ padding: 'var(--space-md)' }}>
                  <span className="text-label-mono" style={{ color: 'var(--secondary)' }}>COMPUTER LAB DEPLOYMENT</span>
                  <div style={{ fontWeight: 600, fontSize: 15, marginTop: 4 }}>Lab-Wide Safety Modules</div>
                  <p className="text-body-sm" style={{ color: 'var(--on-surface-variant)', marginTop: 4 }}>Deployed across school computer centers to protect student web exploration.</p>
                </div>
              </div>

              <div style={{ borderRadius: 'var(--radius-xl)', overflow: 'hidden', background: 'var(--surface-container-low)', border: `1px solid color-mix(in srgb, var(--outline-variant) 30%, transparent)` }}>
                <img src={DIGITAL_CHILDREN} alt="Digital children" style={{ width: '100%', height: 200, objectFit: 'cover' }} />
                <div style={{ padding: 'var(--space-md)' }}>
                  <span className="text-label-mono" style={{ color: 'var(--tertiary)' }}>NATIONWIDE ADVOCACY</span>
                  <div style={{ fontWeight: 600, fontSize: 15, marginTop: 4 }}>Youth Protection Campaign</div>
                  <p className="text-body-sm" style={{ color: 'var(--on-surface-variant)', marginTop: 4 }}>Educational awareness campaigns reaching over 15,000 children across provinces.</p>
                </div>
              </div>

              <div style={{ borderRadius: 'var(--radius-xl)', overflow: 'hidden', background: 'var(--surface-container-low)', border: `1px solid color-mix(in srgb, var(--outline-variant) 30%, transparent)` }}>
                <img src={AWARENESS} alt="Community awareness" style={{ width: '100%', height: 200, objectFit: 'cover' }} />
                <div style={{ padding: 'var(--space-md)' }}>
                  <span className="text-label-mono" style={{ color: 'var(--primary)' }}>COMMUNITY WORKSHOPS</span>
                  <div style={{ fontWeight: 600, fontSize: 15, marginTop: 4 }}>Parent &amp; Educator Training</div>
                  <p className="text-body-sm" style={{ color: 'var(--on-surface-variant)', marginTop: 4 }}>Field seminars teaching parents how to monitor and guide healthy online screen time.</p>
                </div>
              </div>
            </div>
          </section>

          {/* 05. Platform Capabilities */}
          <section id="features" style={{ scrollMarginTop: '6rem', display: 'flex', flexDirection: 'column', gap: 'var(--space-md)' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <span className="text-label-mono" style={{ color: 'var(--primary)', fontSize: 18, fontWeight: 700 }}>05</span>
              <h2 className="text-headline-lg" style={{ color: 'var(--on-surface)' }}>Platform Capabilities</h2>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 'var(--space-md)' }}>
              {[
                { icon: 'menu_book', color: 'var(--primary)', title: 'Interactive Safety Curricula', desc: 'Categorized learning tracks tailored by age group (Elementary, Middle School, High School) covering privacy settings, phishing detection, and scam prevention.' },
                { icon: 'campaign', color: 'var(--secondary)', title: 'Incident Reporting & Triage', desc: 'Secure, non-judgmental contact portals allowing young individuals or educators to report cyber threats and receive verified institutional support.' },
                { icon: 'calendar_month', color: 'var(--tertiary)', title: 'Live Workshop Registration', desc: 'Self-serve booking portal for schools requesting on-site cyber wellness workshops with IFDC certified instructors.' },
                { icon: 'cloud_download', color: 'var(--primary)', title: 'Teacher Toolkits & Handbooks', desc: 'Instant downloadable PDF lesson plans and printable infographics for teachers to integrate digital literacy into regular classroom curriculum.' },
              ].map((item, idx) => (
                <div key={idx} style={{ padding: 'var(--space-lg)', borderRadius: 'var(--radius-2xl)', background: 'var(--surface-container-low)', display: 'flex', flexDirection: 'column', gap: 'var(--space-sm)' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8, color: item.color }}>
                    <span className="material-symbols-outlined" style={{ fontSize: 22 }}>{item.icon}</span>
                    <h3 style={{ fontSize: 17, fontWeight: 700, color: 'var(--on-surface)' }}>{item.title}</h3>
                  </div>
                  <p className="text-body-sm" style={{ color: 'var(--on-surface-variant)', lineHeight: 1.6 }}>{item.desc}</p>
                </div>
              ))}
            </div>
          </section>

          {/* 06. Security & Compliance */}
          <section id="compliance" style={{ scrollMarginTop: '6rem', display: 'flex', flexDirection: 'column', gap: 'var(--space-md)' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <span className="text-label-mono" style={{ color: 'var(--secondary)', fontSize: 18, fontWeight: 700 }}>06</span>
              <h2 className="text-headline-lg" style={{ color: 'var(--on-surface)' }}>Security &amp; Compliance</h2>
            </div>
            <div style={{ padding: 'var(--space-lg)', borderRadius: 'var(--radius-2xl)', background: 'var(--surface-container)', display: 'flex', flexDirection: 'column', gap: 'var(--space-md)' }}>
              <p className="text-body-md" style={{ color: 'var(--on-surface-variant)' }}>
                Because IFDC interacts directly with underage students, data handling complies with the highest international child digital protection standards:
              </p>
              <ul style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-sm)', paddingLeft: '1.25rem', listStyleType: 'disc' }}>
                <li className="text-body-md" style={{ color: 'var(--on-surface-variant)', lineHeight: 1.6 }}>
                  <strong style={{ color: 'var(--on-surface)' }}>Zero Minor Tracking:</strong> No tracking cookies, advertising beacons, or behavioural analytics pixels are installed on the platform.
                </li>
                <li className="text-body-md" style={{ color: 'var(--on-surface-variant)', lineHeight: 1.6 }}>
                  <strong style={{ color: 'var(--on-surface)' }}>Encrypted Incident Reporting:</strong> Inbound concern submissions are encrypted in transit and at rest using modern AES-256 ciphers.
                </li>
                <li className="text-body-md" style={{ color: 'var(--on-surface-variant)', lineHeight: 1.6 }}>
                  <strong style={{ color: 'var(--on-surface)' }}>Content Moderation Gateway:</strong> All user-generated workshop reviews and inquiries pass through automated text sanitization prior to administrative review.
                </li>
              </ul>
            </div>
          </section>

          {/* 07. Milestones & Statistics */}
          <section id="impact" style={{ scrollMarginTop: '6rem', display: 'flex', flexDirection: 'column', gap: 'var(--space-md)' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <span className="text-label-mono" style={{ color: 'var(--primary)', fontSize: 18, fontWeight: 700 }}>07</span>
              <h2 className="text-headline-lg" style={{ color: 'var(--on-surface)' }}>Milestones &amp; Statistics</h2>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 'var(--space-md)' }}>
              <div style={{ padding: 'var(--space-md)', borderRadius: 'var(--radius-2xl)', background: 'var(--surface-container)', textAlign: 'center' }}>
                <div className="text-display" style={{ color: 'var(--primary)', lineHeight: 1.1 }}>50+</div>
                <div className="text-label-mono" style={{ color: 'var(--on-surface-variant)', marginTop: 8 }}>Participating Schools</div>
              </div>
              <div style={{ padding: 'var(--space-md)', borderRadius: 'var(--radius-2xl)', background: 'var(--surface-container)', textAlign: 'center' }}>
                <div className="text-display" style={{ color: 'var(--secondary)', lineHeight: 1.1 }}>15k+</div>
                <div className="text-label-mono" style={{ color: 'var(--on-surface-variant)', marginTop: 8 }}>Youth Beneficiaries</div>
              </div>
              <div style={{ padding: 'var(--space-md)', borderRadius: 'var(--radius-2xl)', background: 'var(--surface-container)', textAlign: 'center' }}>
                <div className="text-display" style={{ color: 'var(--tertiary)', lineHeight: 1.1 }}>99.9%</div>
                <div className="text-label-mono" style={{ color: 'var(--on-surface-variant)', marginTop: 8 }}>Uptime on Railway</div>
              </div>
            </div>
          </section>

          {/* Next / Switch Case Study Banner */}
          <div style={{
            padding: 'var(--space-lg)', borderRadius: 'var(--radius-2xl)',
            background: 'var(--surface-container-high)', display: 'flex', flexWrap: 'wrap',
            alignItems: 'center', justifyContent: 'space-between', gap: 'var(--space-md)',
            boxShadow: '0 4px 20px rgba(0,0,0,0.1)',
          }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
              <span className="text-label-mono" style={{ color: 'var(--outline)', textTransform: 'uppercase' }}>Next Technical Case Study</span>
              <span className="text-headline-sm" style={{ color: 'var(--on-surface)', fontWeight: 700 }}>ResilienceQ — Mission-Critical Mental Resilience AI Pipeline</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-sm)' }}>
              <button
                onClick={onBack}
                style={{
                  padding: '0.625rem 1rem', borderRadius: 'var(--radius-lg)',
                  background: 'var(--surface-container)', color: 'var(--on-surface)',
                  fontFamily: 'var(--font-mono)', fontSize: 12, fontWeight: 600,
                  cursor: 'pointer',
                }}
              >
                All Projects
              </button>
              <button
                onClick={() => onNavigateCaseStudy('resilienceq')}
                style={{
                  display: 'inline-flex', alignItems: 'center', gap: 6,
                  padding: '0.625rem 1.25rem', borderRadius: 'var(--radius-lg)',
                  background: 'var(--primary)', color: 'var(--on-primary)',
                  fontWeight: 600, fontSize: 13, cursor: 'pointer',
                }}
              >
                <span>Inspect ResilienceQ</span>
                <span className="material-symbols-outlined" style={{ fontSize: 16 }}>arrow_forward</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

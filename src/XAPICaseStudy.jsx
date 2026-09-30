import { useState } from 'react'

export default function XAPICaseStudy({ onBack, onNavigateCaseStudy }) {
  const [activeTab, setActiveTab] = useState('overview')
  const [copied, setCopied] = useState(false)

  const gatewaySpec = `@RestController
@RequestMapping("/api/v2/gateway")
public class ApiGatewayController {
    @Autowired
    private RateLimiterService rateLimiter;
    @Autowired
    private PolicyValidator policyValidator;

    @PostMapping("/dispatch")
    public Mono<ResponseEntity<GatewayResponse>> routeRequest(
            @RequestHeader("X-Api-Key") String apiKey,
            @RequestBody GatewayPayload payload) {
        return rateLimiter.verifyQuota(apiKey)
            .flatMap(token -> policyValidator.validateContract(payload))
            .flatMap(valid -> dispatchToMicroservice(valid))
            .map(res -> ResponseEntity.ok(res));
    }
}`

  const handleCopy = () => {
    navigator.clipboard.writeText(gatewaySpec)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const sections = [
    { id: 'overview', num: '01', title: 'System Overview' },
    { id: 'problem', num: '02', title: 'The Gateway Bottleneck' },
    { id: 'architecture', num: '03', title: 'Distributed Architecture' },
    { id: 'policies', num: '04', title: 'Policy Engine & Validation' },
    { id: 'performance', num: '05', title: 'Benchmarking & Metrics' },
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
              xapi-gateway.prod.cloud
            </span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            <span style={{
              padding: '0.2rem 0.6rem', borderRadius: 'var(--radius)',
              background: 'var(--surface-container)', color: 'var(--secondary)',
              fontSize: 10, fontFamily: 'var(--font-mono)', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.08em',
            }}>
              Cloud Infra Spec
            </span>
            <span style={{
              padding: '0.2rem 0.6rem', borderRadius: 'var(--radius)',
              background: 'var(--surface-container-high)', color: 'var(--primary)',
              fontSize: 10, fontFamily: 'var(--font-mono)', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.08em',
            }}>
              Arch Tier 1
            </span>
          </div>
        </div>
      </div>

      {/* Hero Header */}
      <section style={{ background: 'var(--surface-container-low)', padding: 'var(--space-xl) 0', borderBottom: `1px solid color-mix(in srgb, var(--outline-variant) 20%, transparent)` }}>
        <div className="max-w-container" style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-lg)' }}>
          <div style={{ display: 'flex', flexDirection: 'row', flexWrap: 'wrap', alignItems: 'flex-end', justifyContent: 'space-between', gap: 'var(--space-lg)' }}>
            <div style={{ maxWidth: '48rem', display: 'flex', flexDirection: 'column', gap: 'var(--space-xs)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--primary)' }} className="text-label-mono">
                <span className="material-symbols-outlined" style={{ fontSize: 18 }}>api</span>
                <span>ENTERPRISE DISTRIBUTED API CONTROL PLANE</span>
              </div>
              <h1 className="text-display" style={{ color: 'var(--on-surface)', marginTop: '0.5rem' }}>
                XAPI Gateway
              </h1>
              <p className="text-body-lg" style={{ color: 'var(--on-surface-variant)', marginTop: '0.5rem', lineHeight: '1.7' }}>
                A high-throughput API gateway &amp; developer management portal providing real-time contract linting, JWT token verification, dynamic token-bucket rate limiting, and zero-downtime service routing.
              </p>
            </div>

            <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: 'var(--space-sm)', flexShrink: 0 }}>
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
            <div style={{ padding: 'var(--space-md)', borderRadius: 'var(--radius-2xl)', background: 'var(--surface-container)' }}>
              <span className="text-label-mono" style={{ color: 'var(--outline)', textTransform: 'uppercase' }}>Throughput</span>
              <div className="text-headline-sm" style={{ color: 'var(--primary)', fontWeight: 700, marginTop: 4 }}>12,000+ QPS</div>
              <div className="text-body-sm" style={{ color: 'var(--on-surface-variant)', marginTop: 2 }}>Non-blocking reactive dispatch</div>
            </div>
            <div style={{ padding: 'var(--space-md)', borderRadius: 'var(--radius-2xl)', background: 'var(--surface-container)' }}>
              <span className="text-label-mono" style={{ color: 'var(--outline)', textTransform: 'uppercase' }}>Edge Overhead</span>
              <div className="text-headline-sm" style={{ color: 'var(--secondary)', fontWeight: 700, marginTop: 4 }}>&lt; 4.8ms</div>
              <div className="text-body-sm" style={{ color: 'var(--on-surface-variant)', marginTop: 2 }}>Token validation &amp; policy check</div>
            </div>
            <div style={{ padding: 'var(--space-md)', borderRadius: 'var(--radius-2xl)', background: 'var(--surface-container)' }}>
              <span className="text-label-mono" style={{ color: 'var(--outline)', textTransform: 'uppercase' }}>Database</span>
              <div className="text-headline-sm" style={{ color: 'var(--tertiary)', fontWeight: 700, marginTop: 4 }}>MongoDB Cluster</div>
              <div className="text-body-sm" style={{ color: 'var(--on-surface-variant)', marginTop: 2 }}>Document store for dynamic schemas</div>
            </div>
            <div style={{ padding: 'var(--space-md)', borderRadius: 'var(--radius-2xl)', background: 'var(--surface-container)' }}>
              <span className="text-label-mono" style={{ color: 'var(--outline)', textTransform: 'uppercase' }}>Tech Stack</span>
              <div className="text-headline-sm" style={{ color: 'var(--on-surface)', fontWeight: 700, marginTop: 4 }}>Angular + Spring</div>
              <div className="text-body-sm" style={{ color: 'var(--on-surface-variant)', marginTop: 2 }}>Reactive Spring WebFlux core</div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content Layout */}
      <div className="max-w-container" style={{ padding: 'var(--space-xl) var(--margin)', display: 'flex', flexDirection: 'row', gap: 'var(--space-xl)' }}>
        {/* Left Sidebar */}
        <aside style={{ width: '280px', flexShrink: 0, display: 'flex', flexDirection: 'column', gap: 'var(--space-md)', position: 'sticky', top: '5rem', height: 'fit-content' }}>
          <div style={{ padding: 'var(--space-md)', borderRadius: 'var(--radius-2xl)', background: 'var(--surface-container)', boxShadow: '0 1px 4px rgba(0,0,0,0.05)' }}>
            <span className="text-label-mono" style={{ color: 'var(--outline)', textTransform: 'uppercase', fontWeight: 600, display: 'block', marginBottom: 'var(--space-sm)' }}>
              Traversal Index
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
                  <span>{s.num}. {s.title}</span>
                  <span style={{ color: 'var(--outline)', fontSize: 10 }}>#{s.num}</span>
                </button>
              ))}
            </nav>
          </div>
        </aside>

        {/* Content Body */}
        <div style={{ flex: 1, minWidth: 0, display: 'flex', flexDirection: 'column', gap: 'var(--space-xl)' }}>
          {/* 01 */}
          <section id="overview" style={{ scrollMarginTop: '6rem', display: 'flex', flexDirection: 'column', gap: 'var(--space-md)' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <span className="text-label-mono" style={{ color: 'var(--primary)', fontSize: 18, fontWeight: 700 }}>01</span>
              <h2 className="text-headline-lg" style={{ color: 'var(--on-surface)' }}>System Overview</h2>
            </div>
            <p className="text-body-lg" style={{ color: 'var(--on-surface-variant)', lineHeight: 1.8 }}>
              Modern microservice ecosystems suffer from disjointed authentication, undocumented breaking changes, and uncontrolled ingress traffic spikes. XAPI was engineered to provide enterprise teams with a single pane of glass for real-time endpoint contracts, reactive routing, and automated security policies.
            </p>
          </section>

          {/* 02 */}
          <section id="problem" style={{ scrollMarginTop: '6rem', display: 'flex', flexDirection: 'column', gap: 'var(--space-md)' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <span className="text-label-mono" style={{ color: 'var(--secondary)', fontSize: 18, fontWeight: 700 }}>02</span>
              <h2 className="text-headline-lg" style={{ color: 'var(--on-surface)' }}>The Gateway Bottleneck</h2>
            </div>
            <div style={{ padding: 'var(--space-lg)', borderRadius: 'var(--radius-2xl)', background: 'var(--surface-container-low)', display: 'flex', flexDirection: 'column', gap: 'var(--space-sm)' }}>
              <p className="text-body-md" style={{ color: 'var(--on-surface-variant)' }}>
                Traditional blocking reverse proxies exhaust thread pools under sudden bursts. By transitioning to a Spring WebFlux non-blocking event-loop model, XAPI achieves sub-5ms proxy latencies even at peak 12,000 queries per second.
              </p>
            </div>
          </section>

          {/* 03 */}
          <section id="architecture" style={{ scrollMarginTop: '6rem', display: 'flex', flexDirection: 'column', gap: 'var(--space-md)' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <span className="text-label-mono" style={{ color: 'var(--primary)', fontSize: 18, fontWeight: 700 }}>03</span>
              <h2 className="text-headline-lg" style={{ color: 'var(--on-surface)' }}>Distributed Architecture</h2>
            </div>
            <div style={{
              padding: 'var(--space-md)', borderRadius: 'var(--radius-2xl)',
              background: 'var(--surface-container-lowest)',
              border: `1px solid color-mix(in srgb, var(--outline-variant) 30%, transparent)`,
            }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', paddingBottom: 6 }}>
                <span className="text-label-mono" style={{ color: 'var(--outline)' }}>GatewayController.java</span>
                <button
                  onClick={handleCopy}
                  style={{
                    display: 'inline-flex', alignItems: 'center', gap: 4,
                    padding: '4px 8px', borderRadius: 4, background: 'var(--surface-container)',
                    color: copied ? 'var(--primary)' : 'var(--on-surface-variant)',
                    fontSize: 11, fontFamily: 'var(--font-mono)', cursor: 'pointer',
                  }}
                >
                  <span className="material-symbols-outlined" style={{ fontSize: 14 }}>{copied ? 'check' : 'content_copy'}</span>
                  <span>{copied ? 'Copied' : 'Copy'}</span>
                </button>
              </div>
              <pre style={{
                overflowX: 'auto', padding: '0.75rem', borderRadius: 'var(--radius)',
                background: 'var(--surface-container-low)', color: 'var(--on-surface)',
                fontFamily: 'var(--font-mono)', fontSize: 12, lineHeight: 1.7,
              }}>
                <code>{gatewaySpec}</code>
              </pre>
            </div>
          </section>

          {/* Switch Case Study Banner */}
          <div style={{
            padding: 'var(--space-lg)', borderRadius: 'var(--radius-2xl)',
            background: 'var(--surface-container-high)', display: 'flex', flexWrap: 'wrap',
            alignItems: 'center', justifyContent: 'space-between', gap: 'var(--space-md)',
          }}>
            <div>
              <span className="text-label-mono" style={{ color: 'var(--outline)', textTransform: 'uppercase' }}>Explore Other Systems</span>
              <div className="text-headline-sm" style={{ color: 'var(--on-surface)', fontWeight: 700 }}>ResilienceQ — AI Resilience Assessment Platform</div>
            </div>
            <div style={{ display: 'flex', gap: 'var(--space-sm)' }}>
              <button
                onClick={onBack}
                style={{ padding: '0.5rem 1rem', borderRadius: 'var(--radius)', background: 'var(--surface-container)', cursor: 'pointer', fontWeight: 600 }}
              >
                All Projects
              </button>
              <button
                onClick={() => onNavigateCaseStudy('resilienceq')}
                style={{ padding: '0.5rem 1rem', borderRadius: 'var(--radius)', background: 'var(--primary)', color: 'var(--on-primary)', cursor: 'pointer', fontWeight: 600 }}
              >
                View ResilienceQ
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

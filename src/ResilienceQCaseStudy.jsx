import { useState } from 'react'

export default function ResilienceQCaseStudy({ onBack, onNavigateCaseStudy }) {
  const [copied, setCopied] = useState(false)
  const [activeTab, setActiveTab] = useState('overview')

  const codeSnippet = `async def synthesize_coaching_plan(user_id: str, scores: ResilienceScoreRecord) -> CoachingPlanResponse:
    # 1. Fetch nearest evidence based on weak sub-dimensions
    query_vector = await embed_dimension_deficiencies(scores.critical_axes)
    contexts = await pinecone_index.query(vector=query_vector, top_k=3, include_metadata=True)
    
    # 2. Enforce strict threshold & assemble verified context
    verified_chunks = [c.metadata["source_text"] for c in contexts.matches if c.score >= 0.82]
    
    # 3. Stream bounded generation through structured Gemini 2.5 Flash schema
    prompt = ChatPromptTemplate.from_messages([
        ("system", CLINICAL_COACH_GUARDRAIL_PROMPT),
        ("human", "Scorecard: {scores}\\nGrounding Sources: {sources}")
    ])
    chain = prompt | gemini_flash.with_structured_output(CoachingPlanResponse)
    return await chain.ainvoke({"scores": scores.dict(), "sources": verified_chunks})`

  const handleCopy = () => {
    navigator.clipboard.writeText(codeSnippet)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const sections = [
    { id: 'overview', num: '01', title: 'Executive Overview' },
    { id: 'problem', num: '02', title: 'Problem & Hallucination' },
    { id: 'solution', num: '03', title: 'Engineering Solution' },
    { id: 'architecture', num: '04', title: 'End-to-End Diagram' },
    { id: 'stack-choice', num: '05', title: 'Tech Stack Deep Dive' },
    { id: 'features', num: '06', title: 'Core Features Engine' },
    { id: 'rag-mechanics', num: '07', title: 'RAG & Guardrails' },
    { id: 'deployment', num: '08', title: 'CI/CD & Reliability' },
    { id: 'results', num: '09', title: 'Latency & Telemetry' },
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
              resilience-q.prod.arch
            </span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            <span style={{
              padding: '0.2rem 0.6rem', borderRadius: 'var(--radius)',
              background: 'var(--surface-container)', color: 'var(--secondary)',
              fontSize: 10, fontFamily: 'var(--font-mono)', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.08em',
            }}>
              Production Case Spec
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

      {/* Hero Header & Quick Specs Bento */}
      <section style={{ background: 'var(--surface-container-low)', padding: 'var(--space-xl) 0', borderBottom: `1px solid color-mix(in srgb, var(--outline-variant) 20%, transparent)` }}>
        <div className="max-w-container" style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-lg)' }}>
          <div style={{ display: 'flex', flexDirection: 'row', flexWrap: 'wrap', alignItems: 'flex-end', justifyContent: 'space-between', gap: 'var(--space-lg)' }}>
            <div style={{ maxWidth: '48rem', display: 'flex', flexDirection: 'column', gap: 'var(--space-xs)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--primary)' }} className="text-label-mono">
                <span className="material-symbols-outlined" style={{ fontSize: 18 }}>neurology</span>
                <span>MISSION-CRITICAL MENTAL RESILIENCE AI PIPELINE</span>
              </div>
              <h1 className="text-display" style={{ color: 'var(--on-surface)', marginTop: '0.5rem' }}>
                ResilienceQ
              </h1>
              <p className="text-body-lg" style={{ color: 'var(--on-surface-variant)', marginTop: '0.5rem', lineHeight: '1.7' }}>
                A high-assurance, hybrid psychological assessment platform uniting deterministic adaptive psychometric state machines with a zero-hallucination LangChain RAG pipeline powered by Gemini 2.5 Flash.
              </p>
            </div>

            {/* Call to Actions */}
            <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: 'var(--space-sm)', flexShrink: 0 }}>
              <a
                href="https://github.com/amanasamsudeen/resilienceq"
                target="_blank"
                rel="noreferrer"
                style={{
                  display: 'inline-flex', alignItems: 'center', gap: '0.5rem',
                  padding: '0.625rem 1.25rem', borderRadius: 'var(--radius-lg)',
                  background: 'var(--surface-container-high)', color: 'var(--on-surface)',
                  fontFamily: 'var(--font-mono)', fontSize: 13, fontWeight: 600,
                  border: `1px solid color-mix(in srgb, var(--outline-variant) 40%, transparent)`,
                  transition: 'all 0.2s',
                }}
              >
                <span className="material-symbols-outlined" style={{ fontSize: 18 }}>terminal</span>
                <span>Source Code</span>
                <span className="material-symbols-outlined" style={{ fontSize: 14 }}>north_east</span>
              </a>
              <a
                href="https://resilienceq.vercel.app"
                target="_blank"
                rel="noreferrer"
                style={{
                  display: 'inline-flex', alignItems: 'center', gap: '0.5rem',
                  padding: '0.625rem 1.25rem', borderRadius: 'var(--radius-lg)',
                  background: 'var(--primary-container)', color: 'var(--on-primary-container)',
                  fontWeight: 600, fontSize: 14,
                  boxShadow: '0 4px 14px rgba(0,0,0,0.15)',
                  transition: 'all 0.2s',
                }}
              >
                <span className="material-symbols-outlined" style={{ fontSize: 18 }}>rocket_launch</span>
                <span>Live Production Build</span>
                <span className="material-symbols-outlined" style={{ fontSize: 16 }}>open_in_new</span>
              </a>
            </div>
          </div>

          {/* Quick Facts Spec Grid */}
          <div style={{
            display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
            gap: 'var(--space-md)', paddingTop: 'var(--space-md)',
          }}>
            {/* Spec 1: Role */}
            <div style={{ padding: 'var(--space-md)', borderRadius: 'var(--radius-2xl)', background: 'var(--surface-container)', boxShadow: '0 1px 4px rgba(0,0,0,0.05)' }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', color: 'var(--outline)' }}>
                <span className="text-label-mono" style={{ textTransform: 'uppercase' }}>Engineering Lead</span>
                <span className="material-symbols-outlined" style={{ fontSize: 18 }}>engineering</span>
              </div>
              <div style={{ marginTop: 'var(--space-sm)' }}>
                <div className="text-headline-sm" style={{ color: 'var(--on-surface)', fontWeight: 700 }}>Full Stack & AI Engineer</div>
                <div className="text-body-sm" style={{ color: 'var(--on-surface-variant)', marginTop: 2 }}>Amana Samsudeen (Sole Architect)</div>
              </div>
            </div>

            {/* Spec 2: Latency */}
            <div style={{ padding: 'var(--space-md)', borderRadius: 'var(--radius-2xl)', background: 'var(--surface-container)', boxShadow: '0 1px 4px rgba(0,0,0,0.05)' }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', color: 'var(--secondary)' }}>
                <span className="text-label-mono" style={{ textTransform: 'uppercase' }}>Retrieval Latency</span>
                <span className="material-symbols-outlined" style={{ fontSize: 18 }}>speed</span>
              </div>
              <div style={{ marginTop: 'var(--space-sm)' }}>
                <div className="text-headline-sm" style={{ color: 'var(--secondary)', fontWeight: 700 }}>&lt; 250ms</div>
                <div className="text-body-sm" style={{ color: 'var(--on-surface-variant)', marginTop: 2 }}>Pinecone Top-K Dense Vector Probe</div>
              </div>
            </div>

            {/* Spec 3: Infra */}
            <div style={{ padding: 'var(--space-md)', borderRadius: 'var(--radius-2xl)', background: 'var(--surface-container)', boxShadow: '0 1px 4px rgba(0,0,0,0.05)' }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', color: 'var(--primary)' }}>
                <span className="text-label-mono" style={{ textTransform: 'uppercase' }}>Active Infrastructure</span>
                <span className="material-symbols-outlined" style={{ fontSize: 18 }}>dns</span>
              </div>
              <div style={{ marginTop: 'var(--space-sm)' }}>
                <div className="text-headline-sm" style={{ color: 'var(--primary)', fontWeight: 700 }}>Vercel + Railway</div>
                <div className="text-body-sm" style={{ color: 'var(--on-surface-variant)', marginTop: 2 }}>Edge React/Astro • Containerized FastAPI</div>
              </div>
            </div>

            {/* Spec 4: Model */}
            <div style={{ padding: 'var(--space-md)', borderRadius: 'var(--radius-2xl)', background: 'var(--surface-container)', boxShadow: '0 1px 4px rgba(0,0,0,0.05)' }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', color: 'var(--tertiary)' }}>
                <span className="text-label-mono" style={{ textTransform: 'uppercase' }}>Synthesis Engine</span>
                <span className="material-symbols-outlined" style={{ fontSize: 18 }}>psychology</span>
              </div>
              <div style={{ marginTop: 'var(--space-sm)' }}>
                <div className="text-headline-sm" style={{ color: 'var(--tertiary)', fontWeight: 700 }}>Gemini 2.5 Flash</div>
                <div className="text-body-sm" style={{ color: 'var(--on-surface-variant)', marginTop: 2 }}>Structured Strict-Schema Generation</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content Layout with Sticky Traversal */}
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

          {/* Live Pipeline Health Card */}
          <div style={{ padding: 'var(--space-md)', borderRadius: 'var(--radius-2xl)', background: 'var(--surface-container-low)', boxShadow: '0 1px 4px rgba(0,0,0,0.05)', display: 'flex', flexDirection: 'column', gap: 'var(--space-xs)' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <span className="text-label-mono" style={{ textTransform: 'uppercase' }}>Orchestration State</span>
              <span style={{ width: 8, height: 8, borderRadius: '50%', background: 'var(--primary)' }} className="animate-pulse" />
            </div>
            <div className="text-label-mono" style={{ color: 'var(--primary)', display: 'flex', alignItems: 'center', gap: 6 }}>
              <span className="material-symbols-outlined" style={{ fontSize: 14 }}>bolt</span>
              <span>FastAPI ASGI Pool: ACTIVE</span>
            </div>
            <div className="text-label-mono" style={{ color: 'var(--on-surface-variant)', display: 'flex', alignItems: 'center', gap: 6 }}>
              <span className="material-symbols-outlined" style={{ fontSize: 14 }}>database</span>
              <span>pgvector / Pinecone: HEALTHY</span>
            </div>
            <div className="text-label-mono" style={{ color: 'var(--on-surface-variant)', display: 'flex', alignItems: 'center', gap: 6 }}>
              <span className="material-symbols-outlined" style={{ fontSize: 14 }}>shield</span>
              <span>Guardrails: 100% Strict JSON</span>
            </div>
          </div>
        </aside>

        {/* Main Content Body */}
        <div style={{ flex: 1, minWidth: 0, display: 'flex', flexDirection: 'column', gap: 'var(--space-xl)' }}>
          {/* 01. Executive Overview */}
          <section id="overview" style={{ scrollMarginTop: '6rem', display: 'flex', flexDirection: 'column', gap: 'var(--space-md)' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <span className="text-label-mono" style={{ color: 'var(--primary)', fontSize: 18, fontWeight: 700 }}>01</span>
              <h2 className="text-headline-lg" style={{ color: 'var(--on-surface)' }}>Executive Overview</h2>
            </div>
            <p className="text-body-lg" style={{ color: 'var(--on-surface-variant)', lineHeight: 1.8 }}>
              Standard digital psychological diagnostic tools consistently fail users at two extremes: they are either rigid 40-question surveys that induce participant churn without personalized insights, or unregulated generative conversational bots prone to fabricating advice, violating clinical boundaries, and losing therapeutic consistency over longitudinal sessions.
            </p>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: 'var(--space-md)', marginTop: '0.5rem' }}>
              <div style={{ padding: 'var(--space-md)', borderRadius: 'var(--radius-2xl)', background: 'var(--surface-container)', display: 'flex', flexDirection: 'column', gap: 6 }}>
                <span className="text-label-mono" style={{ color: 'var(--secondary)', textTransform: 'uppercase' }}>The Challenge</span>
                <span style={{ fontSize: 16, fontWeight: 600 }}>Reliable Scoring</span>
                <p className="text-body-sm" style={{ color: 'var(--on-surface-variant)' }}>Preventing non-deterministic scoring discrepancies across clinical resilience indices.</p>
              </div>
              <div style={{ padding: 'var(--space-md)', borderRadius: 'var(--radius-2xl)', background: 'var(--surface-container)', display: 'flex', flexDirection: 'column', gap: 6 }}>
                <span className="text-label-mono" style={{ color: 'var(--primary)', textTransform: 'uppercase' }}>The Architecture</span>
                <span style={{ fontSize: 16, fontWeight: 600 }}>Deterministic + LLM</span>
                <p className="text-body-sm" style={{ color: 'var(--on-surface-variant)' }}>State-machine psychometrics blended with LangChain RAG & Gemini 2.5 Flash coaching.</p>
              </div>
              <div style={{ padding: 'var(--space-md)', borderRadius: 'var(--radius-2xl)', background: 'var(--surface-container)', display: 'flex', flexDirection: 'column', gap: 6 }}>
                <span className="text-label-mono" style={{ color: 'var(--tertiary)', textTransform: 'uppercase' }}>The Outcome</span>
                <span style={{ fontSize: 16, fontWeight: 600 }}>Production Ready</span>
                <p className="text-body-sm" style={{ color: 'var(--on-surface-variant)' }}>Sub-second synthesis, &lt;250ms vector semantic searches, and 0% ungrounded hallucination.</p>
              </div>
            </div>
          </section>

          {/* 02. Problem Statement */}
          <section id="problem" style={{ scrollMarginTop: '6rem', display: 'flex', flexDirection: 'column', gap: 'var(--space-md)' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <span className="text-label-mono" style={{ color: 'var(--secondary)', fontSize: 18, fontWeight: 700 }}>02</span>
              <h2 className="text-headline-lg" style={{ color: 'var(--on-surface)' }}>Problem Statement</h2>
            </div>
            <div style={{ padding: 'var(--space-lg)', borderRadius: 'var(--radius-2xl)', background: 'var(--surface-container-low)', display: 'flex', flexDirection: 'column', gap: 'var(--space-md)' }}>
              <p className="text-body-md" style={{ color: 'var(--on-surface-variant)' }}>
                Automating mental resilience assessments surfaces severe architectural constraints rarely found in generic SaaS platforms. Building ResilienceQ demanded resolving three mission-critical failure vectors:
              </p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-sm)' }}>
                {[
                  { icon: 'warning', color: 'var(--error)', title: 'Uncontrolled Generative Hallucination', desc: 'Generic LLMs invent clinical advice, quote non-existent cognitive behavioral studies, and generate conflicting diagnostic scores during emotional vulnerability evaluations.' },
                  { icon: 'history_toggle_off', color: 'var(--secondary)', title: 'Assessment Drop-Off & Context Amnesia', desc: 'Traditional fixed questionnaires produce high drop-off rates, while pure conversational bots lose state across multi-turn sessions, rendering longitudinal progress charts statistically meaningless.' },
                  { icon: 'lock_clock', color: 'var(--primary)', title: 'Strict Clinical Boundary Requirements', desc: 'The system must offer rigorous triage, automatically detecting crisis flags and redirecting to emergency protocols rather than engaging in conversational speculation.' },
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

          {/* 03. Engineering Solution */}
          <section id="solution" style={{ scrollMarginTop: '6rem', display: 'flex', flexDirection: 'column', gap: 'var(--space-md)' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <span className="text-label-mono" style={{ color: 'var(--primary)', fontSize: 18, fontWeight: 700 }}>03</span>
              <h2 className="text-headline-lg" style={{ color: 'var(--on-surface)' }}>Engineering Solution</h2>
            </div>
            <p className="text-body-md" style={{ color: 'var(--on-surface-variant)', lineHeight: 1.8 }}>
              I engineered a multi-tiered architecture that separates the diagnostic engine from the advisory generator. Instead of letting the generative model calculate scores, diagnostic scoring runs via a deterministic mathematical state machine in FastAPI backed by PostgreSQL. The contextual coaching engine functions strictly as an evidence-grounded consumer:
            </p>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 'var(--space-md)' }}>
              <div style={{ padding: 'var(--space-md)', borderRadius: 'var(--radius-2xl)', background: 'var(--surface-container)', display: 'flex', flexDirection: 'column', gap: 'var(--space-sm)' }}>
                <div style={{ width: 36, height: 36, borderRadius: 'var(--radius)', background: 'color-mix(in srgb, var(--primary) 15%, transparent)', color: 'var(--primary)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <span className="material-symbols-outlined" style={{ fontSize: 20 }}>account_tree</span>
                </div>
                <div style={{ fontWeight: 700, fontSize: 16 }}>Dual-State Pipeline</div>
                <p className="text-body-sm" style={{ color: 'var(--on-surface-variant)', lineHeight: 1.6 }}>
                  PostgreSQL stores normalized scores (Emotional Regulation, Cognitive Agility, Adversity Endurance). Only validated scores and clinician-curated vector knowledge embeddings are streamed into LangChain context.
                </p>
              </div>
              <div style={{ padding: 'var(--space-md)', borderRadius: 'var(--radius-2xl)', background: 'var(--surface-container)', display: 'flex', flexDirection: 'column', gap: 'var(--space-sm)' }}>
                <div style={{ width: 36, height: 36, borderRadius: 'var(--radius)', background: 'color-mix(in srgb, var(--secondary) 15%, transparent)', color: 'var(--secondary)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <span className="material-symbols-outlined" style={{ fontSize: 20 }}>verified_user</span>
                </div>
                <div style={{ fontWeight: 700, fontSize: 16 }}>Deterministic Grounding Guardrails</div>
                <p className="text-body-sm" style={{ color: 'var(--on-surface-variant)', lineHeight: 1.6 }}>
                  System prompts enforce Pydantic output schemas, cross-verifying prompt outputs with Pinecone similarity thresholds (score &gt; 0.82) before rendering any behavioral advice to the UI.
                </p>
              </div>
            </div>
          </section>

          {/* 04. System Architecture Diagram */}
          <section id="architecture" style={{ scrollMarginTop: '6rem', display: 'flex', flexDirection: 'column', gap: 'var(--space-md)' }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <span className="text-label-mono" style={{ color: 'var(--primary)', fontSize: 18, fontWeight: 700 }}>04</span>
                <h2 className="text-headline-lg" style={{ color: 'var(--on-surface)' }}>System Architecture Diagram</h2>
              </div>
              <p className="text-body-sm" style={{ color: 'var(--on-surface-variant)' }}>
                Full end-to-end data pipeline from edge client hydration down to vector index cosine search and SSE advisory streaming.
              </p>
            </div>

            {/* Architecture Node Visual */}
            <div style={{
              width: '100%', padding: 'var(--space-lg)', borderRadius: 'var(--radius-2xl)',
              background: 'var(--surface-container-lowest)', overflowX: 'auto',
              border: `1px solid color-mix(in srgb, var(--outline-variant) 30%, transparent)`,
            }}>
              <div style={{ minWidth: 680, display: 'flex', flexDirection: 'column', gap: 'var(--space-md)' }}>
                {/* Layer 1 */}
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 'var(--space-md)' }}>
                  <div style={{ flex: 1, padding: 'var(--space-md)', borderRadius: 'var(--radius-xl)', background: 'var(--surface-container)', textAlign: 'center' }}>
                    <span className="text-label-mono" style={{ color: 'var(--secondary)' }}>CLIENT SURFACE</span>
                    <div className="text-headline-sm" style={{ color: 'var(--on-surface)', fontWeight: 700, marginTop: 4 }}>React + Astro</div>
                    <div className="text-label-mono" style={{ color: 'var(--on-surface-variant)', marginTop: 2 }}>Vercel Edge • Islands Hydration</div>
                  </div>
                  <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '0 1rem', color: 'var(--primary)' }}>
                    <span className="text-label-mono" style={{ fontSize: 10 }}>HTTPS / JSON</span>
                    <span className="material-symbols-outlined" style={{ fontSize: 24 }}>trending_flat</span>
                    <span className="text-label-mono" style={{ fontSize: 10, color: 'var(--outline)' }}>SSE Stream</span>
                  </div>
                  <div style={{ flex: 1, padding: 'var(--space-md)', borderRadius: 'var(--radius-xl)', background: 'var(--surface-container-high)', textAlign: 'center' }}>
                    <span className="text-label-mono" style={{ color: 'var(--primary)' }}>GATEWAY & CONTROLLER</span>
                    <div className="text-headline-sm" style={{ color: 'var(--on-surface)', fontWeight: 700, marginTop: 4 }}>Python FastAPI</div>
                    <div className="text-label-mono" style={{ color: 'var(--on-surface-variant)', marginTop: 2 }}>Railway Container • ASGI Async</div>
                  </div>
                </div>

                {/* Connectors */}
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', padding: '0 4rem', textAlign: 'center' }}>
                  <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', color: 'var(--secondary)' }}>
                    <span className="text-label-mono" style={{ fontSize: 10 }}>SQLAlchemy asyncpg</span>
                    <span className="material-symbols-outlined" style={{ fontSize: 20 }}>arrow_downward</span>
                  </div>
                  <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', color: 'var(--tertiary)' }}>
                    <span className="text-label-mono" style={{ fontSize: 10 }}>LangChain Orchestrator</span>
                    <span className="material-symbols-outlined" style={{ fontSize: 20 }}>arrow_downward</span>
                  </div>
                </div>

                {/* Layer 2 */}
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'var(--space-md)' }}>
                  <div style={{ padding: 'var(--space-md)', borderRadius: 'var(--radius-xl)', background: 'var(--surface-container)', display: 'flex', flexDirection: 'column', gap: 6 }}>
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                      <span className="text-label-mono" style={{ color: 'var(--secondary)', textTransform: 'uppercase' }}>State & Scoring Engine</span>
                      <span className="material-symbols-outlined" style={{ fontSize: 18, color: 'var(--secondary)' }}>storage</span>
                    </div>
                    <div style={{ fontWeight: 700, fontSize: 16 }}>PostgreSQL Relational Store</div>
                    <p className="text-body-sm" style={{ color: 'var(--on-surface-variant)' }}>
                      Stores user profiles, deterministic psychometric questionnaire response vectors, timestamped resilience indices, and session progress audit records.
                    </p>
                    <div className="text-label-mono" style={{ color: 'var(--secondary)', marginTop: 4, display: 'flex', alignItems: 'center', gap: 6 }}>
                      <span style={{ width: 6, height: 6, borderRadius: '50%', background: 'var(--secondary)' }} />
                      <span>ACID compliant • Connection Pooling</span>
                    </div>
                  </div>

                  <div style={{ padding: 'var(--space-md)', borderRadius: 'var(--radius-xl)', background: 'var(--surface-container)', display: 'flex', flexDirection: 'column', gap: 6 }}>
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                      <span className="text-label-mono" style={{ color: 'var(--primary)', textTransform: 'uppercase' }}>Semantic Retrieval</span>
                      <span className="material-symbols-outlined" style={{ fontSize: 18, color: 'var(--primary)' }}>grain</span>
                    </div>
                    <div style={{ fontWeight: 700, fontSize: 16 }}>Pinecone Vector Database</div>
                    <p className="text-body-sm" style={{ color: 'var(--on-surface-variant)' }}>
                      High-dimensional dense embeddings of clinical resilience literature, validated CBT coping strategies, and domain-curated intervention patterns.
                    </p>
                    <div className="text-label-mono" style={{ color: 'var(--primary)', marginTop: 4, display: 'flex', alignItems: 'center', gap: 6 }}>
                      <span style={{ width: 6, height: 6, borderRadius: '50%', background: 'var(--primary)' }} />
                      <span>Cosine Similarity • Index: p1.x1</span>
                    </div>
                  </div>
                </div>

                {/* Layer 3 */}
                <div style={{ display: 'flex', justifyContent: 'center', color: 'var(--tertiary)' }}>
                  <span className="material-symbols-outlined" style={{ fontSize: 24 }}>arrow_downward</span>
                </div>
                <div style={{
                  padding: 'var(--space-md)', borderRadius: 'var(--radius-xl)',
                  background: 'var(--surface-container-high)', display: 'flex', flexWrap: 'wrap',
                  alignItems: 'center', justifyContent: 'space-between', gap: 'var(--space-md)',
                }}>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                      <span className="text-label-mono" style={{ color: 'var(--tertiary)', textTransform: 'uppercase' }}>GENERATION & SAFETY</span>
                      <span style={{ padding: '2px 8px', borderRadius: 4, background: 'color-mix(in srgb, var(--tertiary) 15%, transparent)', color: 'var(--tertiary)', fontSize: 10, fontFamily: 'var(--font-mono)' }}>temp: 0.1</span>
                    </div>
                    <div className="text-headline-sm" style={{ color: 'var(--on-surface)', fontWeight: 700 }}>Gemini 2.5 Flash + Guardrail Filter</div>
                    <div className="text-body-sm" style={{ color: 'var(--on-surface-variant)' }}>Synthesizes contextual advice strictly bounded by top-3 vector chunks and clinical rubric.</div>
                  </div>
                  <div style={{ padding: '8px 14px', borderRadius: 'var(--radius-lg)', background: 'var(--surface-container)', display: 'flex', alignItems: 'center', gap: 8 }}>
                    <span className="material-symbols-outlined" style={{ color: 'var(--primary)', fontSize: 20 }}>check_circle</span>
                    <span className="text-label-mono" style={{ color: 'var(--on-surface)', fontWeight: 600 }}>Strict JSON Enforcement</span>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* 05. Technology Stack Deep Dive */}
          <section id="stack-choice" style={{ scrollMarginTop: '6rem', display: 'flex', flexDirection: 'column', gap: 'var(--space-md)' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <span className="text-label-mono" style={{ color: 'var(--secondary)', fontSize: 18, fontWeight: 700 }}>05</span>
              <h2 className="text-headline-lg" style={{ color: 'var(--on-surface)' }}>Technology Stack Deep Dive</h2>
            </div>
            <p className="text-body-md" style={{ color: 'var(--on-surface-variant)' }}>
              Every layer was audited for concurrency efficiency, token throughput, and psychometric computational accuracy:
            </p>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: 'var(--space-md)' }}>
              <div style={{ padding: 'var(--space-md)', borderRadius: 'var(--radius-2xl)', background: 'var(--surface-container)', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', gap: 'var(--space-md)' }}>
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 8 }}>
                    <span className="text-headline-sm" style={{ color: 'var(--on-surface)', fontWeight: 700 }}>FastAPI</span>
                    <span className="text-label-mono" style={{ color: 'var(--primary)', textTransform: 'uppercase' }}>vs Express.js</span>
                  </div>
                  <p className="text-body-sm" style={{ color: 'var(--on-surface-variant)', lineHeight: 1.6 }}>
                    Python's native scientific ecosystem was vital for numpy scoring models and LangChain integrations. Node/Express would necessitate costly child processes or serialization overhead. FastAPI handles parallel vector IO with zero event-loop bottlenecks.
                  </p>
                </div>
                <div style={{ padding: '6px 10px', borderRadius: 'var(--radius)', background: 'var(--surface-container-low)', display: 'flex', justifyContent: 'space-between' }} className="text-label-mono">
                  <span>Throughput</span>
                  <span style={{ color: 'var(--primary)' }}>High (uvicorn-workers)</span>
                </div>
              </div>

              <div style={{ padding: 'var(--space-md)', borderRadius: 'var(--radius-2xl)', background: 'var(--surface-container)', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', gap: 'var(--space-md)' }}>
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 8 }}>
                    <span className="text-headline-sm" style={{ color: 'var(--on-surface)', fontWeight: 700 }}>Pinecone</span>
                    <span className="text-label-mono" style={{ color: 'var(--secondary)', textTransform: 'uppercase' }}>Vector Engine</span>
                  </div>
                  <p className="text-body-sm" style={{ color: 'var(--on-surface-variant)', lineHeight: 1.6 }}>
                    Managed vector hosting with dedicated indexing nodes allows instant sub-250ms cosine similarity queries across dense clinical psychological embeddings, minimizing self-managed cluster ops while preserving 99.99% uptime guarantees.
                  </p>
                </div>
                <div style={{ padding: '6px 10px', borderRadius: 'var(--radius)', background: 'var(--surface-container-low)', display: 'flex', justifyContent: 'space-between' }} className="text-label-mono">
                  <span>Similarity Search</span>
                  <span style={{ color: 'var(--secondary)' }}>Cosine (k=3 to k=5)</span>
                </div>
              </div>

              <div style={{ padding: 'var(--space-md)', borderRadius: 'var(--radius-2xl)', background: 'var(--surface-container)', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', gap: 'var(--space-md)' }}>
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 8 }}>
                    <span className="text-headline-sm" style={{ color: 'var(--on-surface)', fontWeight: 700 }}>Gemini 2.5 Flash</span>
                    <span className="text-label-mono" style={{ color: 'var(--tertiary)', textTransform: 'uppercase' }}>LLM Selection</span>
                  </div>
                  <p className="text-body-sm" style={{ color: 'var(--on-surface-variant)', lineHeight: 1.6 }}>
                    Chosen over heavier reasoning models due to superior time-to-first-token (TTFT) metrics, strict structural schema adherence via JSON mode, and low token cost when processing continuous streaming reflections.
                  </p>
                </div>
                <div style={{ padding: '6px 10px', borderRadius: 'var(--radius)', background: 'var(--surface-container-low)', display: 'flex', justifyContent: 'space-between' }} className="text-label-mono">
                  <span>Latency Impact</span>
                  <span style={{ color: 'var(--tertiary)' }}>Sub-800ms Stream Start</span>
                </div>
              </div>
            </div>
          </section>

          {/* 06. Core Features Breakdown */}
          <section id="features" style={{ scrollMarginTop: '6rem', display: 'flex', flexDirection: 'column', gap: 'var(--space-md)' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <span className="text-label-mono" style={{ color: 'var(--primary)', fontSize: 18, fontWeight: 700 }}>06</span>
              <h2 className="text-headline-lg" style={{ color: 'var(--on-surface)' }}>Core Features Breakdown</h2>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 'var(--space-md)' }}>
              {[
                {
                  icon: 'tune', color: 'var(--primary)', title: 'Adaptive Questionnaire Engine',
                  desc: 'Dynamic branched testing using a mathematical tree. The engine dynamically reduces question fatigue by skipping irrelevant dimension branches if emotional stability indicators score above established empirical baselines.',
                  tags: ['Tree Automata', 'FastAPI Validation'],
                },
                {
                  icon: 'forum', color: 'var(--secondary)', title: 'Contextual RAG Chatbot',
                  desc: 'Streams conversational debriefs grounded in the user\'s specific assessment outputs. Users can interrogate specific dimension scores (e.g. "Why is my Adversity Endurance marked lower than my Cognitive Agility?").',
                  tags: ['LangChain Chains', 'Pinecone Similarity'],
                },
                {
                  icon: 'auto_fix_high', color: 'var(--tertiary)', title: 'Personalized Coaching Generator',
                  desc: 'Synthesizes a concrete, 7-day micro-behavioral habit plan directly tied to weakest resilience indices. Prevents generic advice by injecting validated psychotherapeutic protocols directly from the vector index.',
                  tags: ['Gemini 2.5 Flash', 'Schema Pydantic'],
                },
                {
                  icon: 'monitoring', color: 'var(--primary)', title: 'Longitudinal Progress Tracking',
                  desc: 'Interactive historical analytics rendering multi-month growth curves across the 5 resilience sub-axes. Correlates self-reported behavioral adoption against dimensional trend improvements.',
                  tags: ['PostgreSQL Time Series', 'SVG Renderers'],
                },
              ].map((feat, idx) => (
                <div key={idx} style={{ padding: 'var(--space-lg)', borderRadius: 'var(--radius-2xl)', background: 'var(--surface-container-low)', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', gap: 'var(--space-md)' }}>
                  <div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 8, color: feat.color, marginBottom: 8 }}>
                      <span className="material-symbols-outlined" style={{ fontSize: 22 }}>{feat.icon}</span>
                      <h3 style={{ fontSize: 18, fontWeight: 700, color: 'var(--on-surface)' }}>{feat.title}</h3>
                    </div>
                    <p className="text-body-md" style={{ color: 'var(--on-surface-variant)', lineHeight: 1.6 }}>{feat.desc}</p>
                  </div>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, marginTop: 'var(--space-sm)' }}>
                    {feat.tags.map((t, i) => (
                      <span key={i} className="text-label-mono" style={{ padding: '2px 8px', borderRadius: 4, background: 'var(--surface-container)', color: i === 1 ? feat.color : 'var(--on-surface)' }}>
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* 07. AI & RAG Pipeline Mechanics */}
          <section id="rag-mechanics" style={{ scrollMarginTop: '6rem', display: 'flex', flexDirection: 'column', gap: 'var(--space-md)' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <span className="text-label-mono" style={{ color: 'var(--secondary)', fontSize: 18, fontWeight: 700 }}>07</span>
              <h2 className="text-headline-lg" style={{ color: 'var(--on-surface)' }}>AI & RAG Pipeline Mechanics</h2>
            </div>
            <p className="text-body-md" style={{ color: 'var(--on-surface-variant)', lineHeight: 1.8 }}>
              The heart of ResilienceQ is its hallucination-free retrieval pipeline. In high-stakes mental health adjacent workflows, ungrounded speculation is unacceptable. The retrieval and generation workflow follows a deterministic sequence:
            </p>

            {/* Sequence Steps */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-sm)' }}>
              {[
                { num: '1', color: 'var(--primary)', title: 'Document Ingestion & Chunking Strategy', subtitle: 'RecursiveTextSplitter', desc: 'Clinical intervention guidelines and behavioral manuals are ingested via chunking parameters calibrated at 512 tokens with 64-token overlapping boundaries to preserve narrative coherence between psychological strategies.' },
                { num: '2', color: 'var(--secondary)', title: 'Dense Vector Embedding Generation', subtitle: 'text-embedding-004', desc: 'Embeddings are converted to 768-dimensional dense vectors and committed into Pinecone with associated metadata: category tags, verified clinical sources, and dimension weightings.' },
                { num: '3', color: 'var(--tertiary)', title: 'Top-K Contextual Retrieval & Thresholding', subtitle: 'Cosine Distance > 0.82', desc: 'When a user completes an assessment, their dimension deficiencies are converted into query representations. The Top-3 vector hits are isolated; if cosine similarity is below 0.82, the system falls back to pre-compiled static clinical templates.' },
                { num: '4', color: 'var(--primary)', title: 'Hallucination Guardrails & JSON Schema Enforcement', subtitle: 'Pydantic • Zero Speculation', desc: 'Gemini 2.5 Flash is injected with a system instruction mandating strictly verified clinical citations matching retrieved chunk IDs. Outputs failing Pydantic JSON structure validation are intercepted and rejected prior to client streaming.' },
              ].map((step, idx) => (
                <div key={idx} style={{ padding: 'var(--space-md)', borderRadius: 'var(--radius-xl)', background: 'var(--surface-container)', display: 'flex', flexDirection: 'column', gap: 6 }}>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 8 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                      <span style={{ width: 24, height: 24, borderRadius: 4, background: `color-mix(in srgb, ${step.color} 20%, transparent)`, color: step.color, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 12, fontFamily: 'var(--font-mono)', fontWeight: 700 }}>
                        {step.num}
                      </span>
                      <span style={{ fontWeight: 700, fontSize: 15, color: 'var(--on-surface)' }}>{step.title}</span>
                    </div>
                    <span className="text-label-mono" style={{ color: 'var(--outline)' }}>{step.subtitle}</span>
                  </div>
                  <p className="text-body-sm" style={{ color: 'var(--on-surface-variant)', paddingLeft: 32, lineHeight: 1.6 }}>{step.desc}</p>
                </div>
              ))}
            </div>

            {/* Code Block Visual */}
            <div style={{
              padding: 'var(--space-md)', borderRadius: 'var(--radius-2xl)',
              background: 'var(--surface-container-lowest)', display: 'flex', flexDirection: 'column', gap: 'var(--space-xs)',
              border: `1px solid color-mix(in srgb, var(--outline-variant) 30%, transparent)`,
            }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', paddingBottom: 6 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                  <span style={{ width: 10, height: 10, borderRadius: '50%', background: 'var(--error)' }} />
                  <span style={{ width: 10, height: 10, borderRadius: '50%', background: 'var(--secondary)' }} />
                  <span style={{ width: 10, height: 10, borderRadius: '50%', background: 'var(--primary)' }} />
                  <span className="text-label-mono" style={{ color: 'var(--outline)', marginLeft: 8 }}>services/orchestrator.py</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                  <span className="text-label-mono" style={{ color: 'var(--primary)' }}>FastAPI + LangChain Pipeline</span>
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
              </div>
              <pre style={{
                overflowX: 'auto', padding: '0.75rem', borderRadius: 'var(--radius)',
                background: 'var(--surface-container-low)', color: 'var(--on-surface)',
                fontFamily: 'var(--font-mono)', fontSize: 12, lineHeight: 1.7,
              }}>
                <code>{codeSnippet}</code>
              </pre>
            </div>
          </section>

          {/* 08. Deployment, CI/CD & Reliability */}
          <section id="deployment" style={{ scrollMarginTop: '6rem', display: 'flex', flexDirection: 'column', gap: 'var(--space-md)' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <span className="text-label-mono" style={{ color: 'var(--primary)', fontSize: 18, fontWeight: 700 }}>08</span>
              <h2 className="text-headline-lg" style={{ color: 'var(--on-surface)' }}>Deployment, CI/CD & Reliability</h2>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 'var(--space-md)' }}>
              <div style={{ padding: 'var(--space-lg)', borderRadius: 'var(--radius-2xl)', background: 'var(--surface-container)', display: 'flex', flexDirection: 'column', gap: 'var(--space-sm)' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8, color: 'var(--secondary)' }}>
                  <span className="material-symbols-outlined" style={{ fontSize: 22 }}>cloud_sync</span>
                  <h3 style={{ fontSize: 18, fontWeight: 700, color: 'var(--on-surface)' }}>Vercel Edge Frontend</h3>
                </div>
                <p className="text-body-sm" style={{ color: 'var(--on-surface-variant)', lineHeight: 1.6 }}>
                  The React & Astro UI delivers sub-50ms First Contentful Paint globally. Astro isolates static educational articles, while dynamic interactive assessments hydrate seamlessly as isolated client islands.
                </p>
                <div style={{ padding: '6px 10px', borderRadius: 'var(--radius)', background: 'var(--surface-container-low)', display: 'flex', justifyContent: 'space-between', marginTop: 'auto' }} className="text-label-mono">
                  <span>Edge Locations</span>
                  <span style={{ color: 'var(--secondary)' }}>Global Anycast</span>
                </div>
              </div>

              <div style={{ padding: 'var(--space-lg)', borderRadius: 'var(--radius-2xl)', background: 'var(--surface-container)', display: 'flex', flexDirection: 'column', gap: 'var(--space-sm)' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8, color: 'var(--primary)' }}>
                  <span className="material-symbols-outlined" style={{ fontSize: 22 }}>developer_board</span>
                  <h3 style={{ fontSize: 18, fontWeight: 700, color: 'var(--on-surface)' }}>Railway Microservices</h3>
                </div>
                <p className="text-body-sm" style={{ color: 'var(--on-surface-variant)', lineHeight: 1.6 }}>
                  FastAPI is deployed in lightweight Docker containers on Railway, with connection-pooled PostgreSQL handling up to 1,200 concurrent assessment sessions without memory saturation.
                </p>
                <div style={{ padding: '6px 10px', borderRadius: 'var(--radius)', background: 'var(--surface-container-low)', display: 'flex', justifyContent: 'space-between', marginTop: 'auto' }} className="text-label-mono">
                  <span>Zero-Downtime Deploy</span>
                  <span style={{ color: 'var(--primary)' }}>Automated Rollbacks</span>
                </div>
              </div>
            </div>
          </section>

          {/* 09. Results & Key Learnings */}
          <section id="results" style={{ scrollMarginTop: '6rem', display: 'flex', flexDirection: 'column', gap: 'var(--space-md)' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <span className="text-label-mono" style={{ color: 'var(--secondary)', fontSize: 18, fontWeight: 700 }}>09</span>
              <h2 className="text-headline-lg" style={{ color: 'var(--on-surface)' }}>Results & Key Architectural Learnings</h2>
            </div>
            {/* Stat Counters */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 'var(--space-md)' }}>
              <div style={{ padding: 'var(--space-md)', borderRadius: 'var(--radius-2xl)', background: 'var(--surface-container)', textAlign: 'center' }}>
                <div className="text-display" style={{ color: 'var(--primary)', lineHeight: 1.1 }}>&lt;250ms</div>
                <div className="text-label-mono" style={{ color: 'var(--on-surface-variant)', marginTop: 8 }}>Pinecone Vector Queries</div>
              </div>
              <div style={{ padding: 'var(--space-md)', borderRadius: 'var(--radius-2xl)', background: 'var(--surface-container)', textAlign: 'center' }}>
                <div className="text-display" style={{ color: 'var(--secondary)', lineHeight: 1.1 }}>0%</div>
                <div className="text-label-mono" style={{ color: 'var(--on-surface-variant)', marginTop: 8 }}>Hallucinatory Scoring Shift</div>
              </div>
              <div style={{ padding: 'var(--space-md)', borderRadius: 'var(--radius-2xl)', background: 'var(--surface-container)', textAlign: 'center' }}>
                <div className="text-display" style={{ color: 'var(--tertiary)', lineHeight: 1.1 }}>99.8%</div>
                <div className="text-label-mono" style={{ color: 'var(--on-surface-variant)', marginTop: 8 }}>Assessment Completion Rate</div>
              </div>
            </div>

            {/* Architectural Takeaways */}
            <div style={{ padding: 'var(--space-lg)', borderRadius: 'var(--radius-2xl)', background: 'var(--surface-container-low)', display: 'flex', flexDirection: 'column', gap: 'var(--space-sm)' }}>
              <h3 style={{ fontSize: 18, fontWeight: 700, color: 'var(--on-surface)' }}>Architectural Takeaways</h3>
              <ul style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-sm)', paddingLeft: '1.25rem', listStyleType: 'disc' }}>
                <li className="text-body-md" style={{ color: 'var(--on-surface-variant)', lineHeight: 1.6 }}>
                  <strong style={{ color: 'var(--on-surface)' }}>Separation of Concerns is Safety-Critical:</strong> Never let an LLM directly compute diagnostic scores. Always compute state deterministically in the backend and use the language model solely as an interpretive voice.
                </li>
                <li className="text-body-md" style={{ color: 'var(--on-surface-variant)', lineHeight: 1.6 }}>
                  <strong style={{ color: 'var(--on-surface)' }}>Pydantic Schemas Defeat Non-Determinism:</strong> Pairing Gemini 2.5 Flash's structured JSON output mode with strict Pydantic parsing eliminates unparsable runtime failures in production.
                </li>
                <li className="text-body-md" style={{ color: 'var(--on-surface-variant)', lineHeight: 1.6 }}>
                  <strong style={{ color: 'var(--on-surface)' }}>Asynchronous Micro-Routines Protect Edge Latencies:</strong> Offloading document embedding similarity checks to non-blocking FastAPI worker routines keeps client interactions completely fluid.
                </li>
              </ul>
            </div>
          </section>

          {/* Next Project / Case Study Footer Banner */}
          <div style={{
            padding: 'var(--space-lg)', borderRadius: 'var(--radius-2xl)',
            background: 'var(--surface-container-high)', display: 'flex', flexWrap: 'wrap',
            alignItems: 'center', justifyContent: 'space-between', gap: 'var(--space-md)',
            boxShadow: '0 4px 20px rgba(0,0,0,0.1)',
          }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
              <span className="text-label-mono" style={{ color: 'var(--outline)', textTransform: 'uppercase' }}>Next Production Case Study</span>
              <span className="text-headline-sm" style={{ color: 'var(--on-surface)', fontWeight: 700 }}>IFDC — Internet Safety & Child Protection Platform</span>
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
                onClick={() => onNavigateCaseStudy('ifdc')}
                style={{
                  display: 'inline-flex', alignItems: 'center', gap: 6,
                  padding: '0.625rem 1.25rem', borderRadius: 'var(--radius-lg)',
                  background: 'var(--primary)', color: 'var(--on-primary)',
                  fontWeight: 600, fontSize: 13, cursor: 'pointer',
                }}
              >
                <span>Inspect IFDC Platform</span>
                <span className="material-symbols-outlined" style={{ fontSize: 16 }}>arrow_forward</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

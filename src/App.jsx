import { useState, useEffect } from 'react'

// ===== CONSTANTS =====
const PROFILE_IMG = "https://lh3.googleusercontent.com/aida-public/AB6AXuBuy__4BfTeJIfotJle0kahjXL6ofi8VbCYZNOPtUTwtl7PGVPipKJtkrI8I06g32SuTpJ2Lr_0rkaEnFpibg2sO1H42vubAl9RTpmRn2hB7luaKHWGH0LMgnWlAt3r1Kp1GW9DcnyUKHoacEgf21cNLPA0MBizK7HubL2VaYSLm7kHr7aW0e-1Dr1cCkl6GWAx1-CT1bgz4tkt6a6a2rOwgEl461h_6a-zix4stPcEEVYq5tnpBXy5kF8y94rbLAC8rk4"

const NAV_LINKS = [
  { id: 'about', label: 'About' },
  { id: 'experience', label: 'Experience' },
  { id: 'education', label: 'Education' },
  { id: 'skills', label: 'Skills' },
  { id: 'projects', label: 'Work' },
  { id: 'contact', label: 'Contact' },
]

// ===== TECH ICON SYSTEM (Devicon logos with monogram fallback) =====
const TECH_ICONS = {
  'Python': 'python-plain',
  'Java': 'java-plain',
  'JavaScript': 'javascript-plain',
  'TypeScript': 'typescript-plain',
  'React.js': 'react-original',
  'Angular': 'angularjs-plain',
  'HTML5': 'html5-plain',
  'CSS3': 'css3-plain',
  'Tailwind CSS': 'tailwindcss-plain',
  'FastAPI': 'fastapi-plain',
  '.NET': 'dotnetcore-plain',
  'Node.js': 'nodejs-plain',
  'Express.js': 'express-original',
  'PostgreSQL': 'postgresql-plain',
  'MongoDB': 'mongodb-plain',
  'Firebase': 'firebase-plain',
  'SQL Server': 'microsoftsqlserver-plain',
  'Git': 'git-plain',
  'Git & GitHub': 'git-plain',
  'GitHub': 'github-original',
  'Bitbucket': 'bitbucket-original',
  'GitLab': 'gitlab-plain',
  'Postman': 'postman-plain',
  'Jira': 'jira-plain',
  'Vercel': 'vercel-original',
  'Google Cloud': 'googlecloud-plain',
  'VS Code': 'vscode-plain',
  'AWS': 'amazonwebservices-original',
  'PHP': 'php-plain',
  'MySQL': 'mysql-plain',
  'SCSS': 'sass-original',
  'Spring Boot': 'spring-plain',
}

function techInitials(name) {
  const words = name.replace(/\./g, '').split(/\s+/).filter(Boolean)
  if (words.length === 1) return words[0].slice(0, 2).toUpperCase()
  return (words[0][0] + words[1][0]).toUpperCase()
}

function TechIcon({ name }) {
  const slug = TECH_ICONS[name]
  if (slug) {
    return <i className={`devicon-${slug} colored tech-icon-glyph`} title={name} aria-hidden="true" />
  }
  return <span className="tech-icon-mono" title={name}>{techInitials(name)}</span>
}

function TechChip({ name }) {
  return (
    <span className="tech-chip">
      <TechIcon name={name} />
      <span>{name}</span>
    </span>
  )
}

function TechRow({ items }) {
  return (
    <div className="tech-row">
      {items.map((t) => (
        <span key={t} className="tech-row-icon">
          <TechIcon name={t} />
        </span>
      ))}
    </div>
  )
}

// ===== SOCIAL BRAND ICONS =====
const SOCIAL_ICONS = {
  GitHub: { fa: 'fa-brands fa-github', color: '#181717' },
  LinkedIn: { fa: 'fa-brands fa-linkedin', color: '#0A66C2' },
  Medium: { fa: 'fa-brands fa-medium', color: '#000000' },
}

function SocialIcon({ label, size = 17 }) {
  const meta = SOCIAL_ICONS[label]
  return <i className={meta.fa} style={{ fontSize: size, color: meta.color }} aria-hidden="true" />
}

// Counts up from 0 to the numeric part of `value` on mount (always plays — no scroll dependency)
function CountUp({ value }) {
  const match = value.match(/^(\d+)(.*)$/)
  const target = match ? parseInt(match[1], 10) : 0
  const suffix = match ? match[2] : ''
  const [display, setDisplay] = useState(match ? 0 : value)

  useEffect(() => {
    if (!match) return
    let raf
    const duration = 900
    const start = performance.now()
    const tick = (now) => {
      const progress = Math.min((now - start) / duration, 1)
      const eased = 1 - Math.pow(1 - progress, 3)
      setDisplay(Math.round(eased * target))
      if (progress < 1) raf = requestAnimationFrame(tick)
    }
    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return <>{display}{suffix}</>
}

export default function App() {
  const [darkMode, setDarkMode] = useState(true)
  const [activeSection, setActiveSection] = useState('about')
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark')
    } else {
      document.documentElement.classList.remove('dark')
    }
  }, [darkMode])

  // Nav active-section tracking
  useEffect(() => {
    const sections = document.querySelectorAll('[data-section]')
    const activeObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActiveSection(entry.target.dataset.section)
        })
      },
      { threshold: 0, rootMargin: '-40% 0px -50% 0px' }
    )
    sections.forEach((s) => activeObserver.observe(s))
    return () => activeObserver.disconnect()
  }, [])

  // Safe scroll-reveal: elements are visible by default (see .reveal-item CSS);
  // this only ADDS a one-time entrance animation, never hides content.
  useEffect(() => {
    const items = document.querySelectorAll('.reveal-item')
    const revealObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('in-view')
            revealObserver.unobserve(entry.target)
          }
        })
      },
      { threshold: 0.12, rootMargin: '0px 0px -8% 0px' }
    )
    items.forEach((el) => revealObserver.observe(el))
    return () => revealObserver.disconnect()
  }, [])

  const scrollTo = (id) => {
    setMenuOpen(false)
    if (id === 'top') {
      window.scrollTo({ top: 0, behavior: 'smooth' })
      return
    }
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <>
      <Header darkMode={darkMode} setDarkMode={setDarkMode} activeSection={activeSection} scrollTo={scrollTo} menuOpen={menuOpen} setMenuOpen={setMenuOpen} />

      <div className="page-shell">
        <HeroSection scrollTo={scrollTo} />
        <AboutSection />
        <ExperienceSection />
        <EducationSection />
        <SkillsSection />
        <ProjectsSection />
        <FreelanceSection />
        <CertificationsSection />
        <AchievementsSection />
        <PublicationsSection />
        <VolunteeringSection />
        <ContactSection />
      </div>
    </>
  )
}

// ===== HEADER =====
function Header({ darkMode, setDarkMode, activeSection, scrollTo, menuOpen, setMenuOpen }) {
  const socials = [
    { label: 'LinkedIn', href: 'https://linkedin.com/in/amanasamsudeen' },
    { label: 'GitHub', href: 'https://github.com/amanasamsudeen' },
    { label: 'Medium', href: 'https://medium.com/@amanasamsudeen' },
  ]

  return (
    <>
      <header className="site-header">
        <div className="site-header-inner">
          <button onClick={() => scrollTo('top')} style={{ background: 'none', border: 'none', cursor: 'pointer' }}>
            <span style={{ fontFamily: 'var(--font-display)', fontSize: 17, fontWeight: 700, letterSpacing: '-0.02em', color: 'var(--on-surface)' }}>Amana Samsudeen</span>
          </button>

          <nav className="site-nav">
            {NAV_LINKS.map((link) => (
              <button key={link.id} onClick={() => scrollTo(link.id)} className={`nav-link${activeSection === link.id ? ' active' : ''}`}>
                {link.label}
              </button>
            ))}
          </nav>

          <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-xs)' }}>
            <a href="/Amana_Samsudeen_Resume.pdf" download="Amana_Samsudeen_Resume.pdf" className="resume-btn">
              <span className="material-symbols-outlined" style={{ fontSize: 16 }}>download</span>
              <span>Resume</span>
            </a>
            <button onClick={() => setDarkMode(!darkMode)} aria-label="Toggle color mode" className="icon-btn">
              <span className="material-symbols-outlined" style={{ fontSize: 20 }}>{darkMode ? 'dark_mode' : 'light_mode'}</span>
            </button>
            <button onClick={() => setMenuOpen(true)} aria-label="Open menu" className="hamburger-btn">
              <span className="material-symbols-outlined" style={{ fontSize: 18 }}>menu</span>
            </button>
          </div>
        </div>
      </header>

      {menuOpen && (
        <div className="mobile-overlay">
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <span style={{ fontFamily: 'var(--font-display)', fontSize: 16, fontWeight: 700, color: 'var(--on-surface)' }}>Amana Samsudeen</span>
            <button onClick={() => setMenuOpen(false)} aria-label="Close menu" className="hamburger-btn">
              <span className="material-symbols-outlined" style={{ fontSize: 18 }}>close</span>
            </button>
          </div>

          <nav className="mobile-overlay-nav">
            {NAV_LINKS.map((link, i) => (
              <button key={link.id} onClick={() => scrollTo(link.id)} className="mobile-overlay-link">
                <span className="mobile-overlay-link-index">{String(i + 1).padStart(2, '0')}</span>
                <span>{link.label}</span>
              </button>
            ))}
          </nav>

          <div style={{ marginTop: 'auto', display: 'flex', gap: 8 }}>
            {socials.map((s) => (
              <a key={s.label} href={s.href} target="_blank" rel="noopener" aria-label={s.label} className="social-icon-btn">
                <SocialIcon label={s.label} />
              </a>
            ))}
          </div>
        </div>
      )}
    </>
  )
}

// ===== HERO =====
function HeroSection({ scrollTo }) {
  // const stats = [
  //   { value: '2+', label: 'Years Experience' },
  //   { value: '6', label: 'Shipped Projects' },
  //   { value: '5', label: 'Certifications' },
  //   { value: '3', label: 'Awards & Honors' },
  // ]

  return (
    <section className="hero-section" data-section="about">
      <div className="hero-split">
        <div>
          <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: 'var(--space-sm)' }}>
            <div className="availability-tag">
              <span className="animate-pulse" style={{ width: 7, height: 7, borderRadius: '50%', background: 'var(--primary)', display: 'inline-block' }} />
              <span className="text-label-mono" style={{ color: 'var(--on-surface-variant)' }}>OPEN TO REMOTE &amp; RELOCATION</span>
            </div>

            <button onClick={() => scrollTo('freelance')} className="availability-tag" style={{ cursor: 'pointer', border: '1px solid color-mix(in srgb, var(--tertiary) 40%, transparent)' }}>
              <span className="material-symbols-outlined" style={{ fontSize: 14, color: 'var(--tertiary)' }}>work</span>
              <span className="text-label-mono" style={{ color: 'var(--tertiary)' }}>OPEN TO FREELANCE PROJECTS</span>
            </button>

            <div className="hero-contact-strip">
              <a href="tel:+94776197741" className="hero-contact-phone">
                <span className="material-symbols-outlined" style={{ fontSize: 15 }}>call</span>
                <span>+94 776197741</span>
              </a>
              <a href="https://linkedin.com/in/amanasamsudeen" target="_blank" rel="noopener" aria-label="LinkedIn" className="social-icon-btn">
                <SocialIcon label="LinkedIn" size={15} />
              </a>
              <a href="https://github.com/amanasamsudeen" target="_blank" rel="noopener" aria-label="GitHub" className="social-icon-btn">
                <SocialIcon label="GitHub" size={15} />
              </a>
              <a href="https://medium.com/@amanasamsudeen" target="_blank" rel="noopener" aria-label="Medium" className="social-icon-btn">
                <SocialIcon label="Medium" size={15} />
              </a>
            </div>
          </div>

          <h1 className="hero-name" style={{ marginTop: 'var(--space-md)' }}>
            Amana <span className="hero-name-gradient">Samsudeen</span>
          </h1>
          <div className="hero-role-list">
            <span>Full Stack Engineer</span>
            <span>AI &amp; RAG Systems</span>
            <span>Production Web Apps</span>
          </div>

          <p className="text-body-lg" style={{ color: 'var(--on-surface-variant)', maxWidth: 560, marginTop: 'var(--space-lg)' }}>
            Full-stack software engineer with 2 years of experience designing and shipping production web applications across React, Angular, and Python (FastAPI). Focused on AI-powered systems, RAG pipelines, and LLM integration.
          </p>

          <div className="hero-ctas" style={{ marginTop: 'var(--space-md)' }}>
            <a href="#projects" onClick={(e) => { e.preventDefault(); scrollTo('projects') }} className="btn-primary">
              <span>View My Work</span>
              <span className="material-symbols-outlined" style={{ fontSize: 18 }}>arrow_forward</span>
            </a>
            <a href="/Amana_Samsudeen_Resume.pdf" download="Amana_Samsudeen_Resume.pdf" className="btn-surface">
              <span className="material-symbols-outlined" style={{ fontSize: 18 }}>download</span>
              <span>Download Resume</span>
            </a>
          </div>

          {/* <div className="hero-stats-row">
            {stats.map((s) => (
              <div key={s.label} className="hero-stat-card">
                <span className="hero-stat-value"><CountUp value={s.value} /></span>
                <span className="hero-stat-label">{s.label}</span>
              </div>
            ))}
          </div> */}
        </div>

        <div className="hero-visual">
          <div className="hero-visual-backdrop" />
          <div className="hero-portrait-lg">
            <img src={PROFILE_IMG} alt="Amana Samsudeen" />
          </div>
        </div>
      </div>
    </section>
  )
}

// ===== ABOUT — split statement + fact cards =====
function AboutSection() {
  const facts = [
    { icon: 'pin_drop', label: 'Location', value: 'Colombo, Sri Lanka' },
    { icon: 'work', label: 'Role', value: 'Software Engineer' },
    { icon: 'school', label: 'Education', value: 'Postgraduate' },
    { icon: 'neurology', label: 'Focus', value: 'AI / RAG Systems, Full-Stack Web' },
  ]

  return (
    <section id="about" className="section-container section-divider" data-section="about">
      <SectionHeader num="01" tag="About" title="About Me" />

      <div className="about-flow reveal-item">
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 'var(--space-sm)' }}>
          <div className="about-status-banner">
            <span className="animate-pulse" style={{ width: 8, height: 8, borderRadius: '50%', background: 'var(--tertiary)', display: 'inline-block' }} />
            <span className="text-label-mono" style={{ color: 'var(--tertiary)' }}>ACTIVELY LOOKING FOR NEW OPPORTUNITIES</span>
          </div>
          <button onClick={() => document.getElementById('freelance')?.scrollIntoView({ behavior: 'smooth' })} className="about-status-banner" style={{ cursor: 'pointer', border: '1px solid color-mix(in srgb, var(--primary) 40%, transparent)', background: 'color-mix(in srgb, var(--primary) 8%, transparent)' }}>
            <span className="material-symbols-outlined" style={{ fontSize: 15, color: 'var(--primary)' }}>work</span>
            <span className="text-label-mono" style={{ color: 'var(--primary)' }}>OPEN TO FREELANCE PROJECTS</span>
          </button>
        </div>

        <p className="about-lead">
          I'm a full-stack software engineer who turns ambiguous product ideas into deployed, user-facing features — two years shipping production applications in React, Angular, and Python (FastAPI), with recent focus on AI-powered systems and RAG pipelines. I own what I build end to end, from API design through frontend implementation and deployment, within Agile teams. Having just completed my postgraduate studies, I'm now looking for a team or client ready to build something meaningful together.
        </p>

        <div className="about-fact-strip">
          {facts.map((f) => (
            <div key={f.label} className="about-fact-pill">
              <span className="material-symbols-outlined" style={{ fontSize: 16, color: 'var(--primary)' }}>{f.icon}</span>
              <span className="text-body-sm" style={{ color: 'var(--on-surface)', fontWeight: 600 }}>{f.value}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

// ===== EXPERIENCE — connected timeline =====
function ExperienceSection() {
  const roles = [
    {
      period: '2023 — 2024',
      title: 'Software Engineer',
      org: 'X-Venture Pvt Ltd, Colombo',
      bullets: [
        'Developed and implemented a module integration feature connecting the application with third-party platforms (Bitbucket, GitHub, and GitLab), enabling code to be pushed directly from the application to these repositories.',
        'Implemented unit testing frameworks, achieving measurable test coverage improvements that strengthened long-term maintainability and reduced regression risk.',
        'Actively participated in Agile sprints, sprint planning, daily stand-ups, and retrospectives, contributing to on-time delivery of quarterly feature milestones.',
      ],
      tags: ['Angular', 'TypeScript', 'REST API', 'GitHub', 'Bitbucket', 'GitLab', 'Unit Testing', 'Agile'],
    },
    {
      period: '2022 — 2023',
      title: 'Software Engineer Intern',
      org: 'X-Venture Pvt Ltd, Colombo',
      bullets: [
        'Fixed 50+ frontend bugs across legacy Angular modules, improving stability and reducing reported UI issues in production releases.',
        'Collaborated with cross-functional teams to align feature development with client requirements, gaining hands-on Agile Scrum experience.',
      ],
      tags: ['Angular', 'HTML5', 'CSS3', 'JavaScript', 'Agile Scrum'],
    },
  ]

  return (
    <section id="experience" className="section-container" data-section="experience">
      <SectionHeader num="02" tag="Experience" title="Professional Experience" subtitle="Two years shipping production features at X-Venture Pvt Ltd, Colombo." />

      <div className="timeline-list">
        {roles.map((role) => (
          <div key={role.title} className="timeline-row reveal-item">
            <span className="timeline-dot" />
            <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-md)' }}>
              <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'flex-start', justifyContent: 'space-between', gap: 'var(--space-sm)' }}>
                <div>
                  <h3 className="text-headline-md" style={{ color: 'var(--on-surface)' }}>{role.title}</h3>
                  <p className="text-body-md" style={{ color: 'var(--on-surface-variant)' }}>{role.org}</p>
                </div>
                <div className="period-badge">
                  <span className="material-symbols-outlined" style={{ fontSize: 14 }}>calendar_today</span>
                  <span>{role.period}</span>
                </div>
              </div>
              <ul className="bullet-list">
                {role.bullets.map((b, j) => (
                  <li key={j}>{b}</li>
                ))}
              </ul>
              <div className="tag-list">
                {role.tags.map((t) => (
                  <TechChip key={t} name={t} />
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}

// ===== EDUCATION — horizontal scroll-snap cards =====
function EducationSection() {
  const degrees = [
    {
      period: '2024 — 2026',
      title: 'MSc in Information Technology',
      org: 'Bharathiar University, Coimbatore',
      desc: 'Advanced studies in distributed architectures, intelligent systems, and enterprise computing — pursued as an ICCR Scholar.',
      tags: ['Distributed Systems', 'AI Systems', 'Research'],
    },
    {
      period: '2020 — 2023',
      title: 'BSc in Information Systems',
      org: 'University of Colombo School of Computing (UCSC)',
      desc: 'Grounding in software engineering principles, database design, software quality assurance, and systems analysis.',
      tags: ['Software Engineering', 'Databases', 'Systems Analysis'],
    },
    {
      period: '2019',
      title: 'ICT Technician — NVQ Level 4',
      org: 'Technical College Batticaloa',
      desc: 'Core foundations in networking topologies, operating system installations, and hardware diagnostics.',
      tags: ['Networking', 'Hardware', 'OS Fundamentals'],
    },
  ]

  return (
    <section id="education" className="section-container section-divider" data-section="education">
      <SectionHeader num="03" tag="Education" title="Education" subtitle="Academic background, from vocational training through postgraduate research." />

      <div className="diploma-grid">
        {degrees.map((m) => (
          <div key={m.title} className="diploma-card reveal-item">
            <div className="diploma-medallion">
              <span className="material-symbols-outlined" style={{ fontSize: 26 }}>school</span>
            </div>
            <span className="period-pill">{m.period}</span>
            <h3 className="text-headline-sm" style={{ color: 'var(--on-surface)' }}>{m.title}</h3>
            <p className="text-body-sm" style={{ color: 'var(--primary)', fontWeight: 600 }}>{m.org}</p>
            <p className="text-body-sm" style={{ color: 'var(--on-surface-variant)' }}>{m.desc}</p>
            <div className="tag-list">
              {m.tags.map((t) => (
                <span key={t} className="tag-light">{t}</span>
              ))}
            </div>
            <div className="diploma-status">
              <span className="material-symbols-outlined" style={{ fontSize: 16, color: 'var(--tertiary)' }}>check_circle</span>
              <span>Completed</span>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}

// ===== SKILLS — bento grid =====
function SkillsSection() {
  const categories = [
    { label: 'Languages', icon: 'terminal', tags: ['Python', 'Java', 'JavaScript', 'TypeScript', 'SQL'], span: 'span-narrow' },
    { label: 'Frontend', icon: 'desktop_windows', tags: ['React.js', 'Angular', 'HTML5', 'CSS3', 'Tailwind CSS', 'Material Tailwind'], span: 'span-wide' },
    { label: 'AI & Machine Learning', icon: 'psychology', tags: ['LangChain', 'RAG Architecture', 'LLM Integration', 'Prompt Design'], span: 'span-wide' },
    { label: 'Backend', icon: 'developer_board', tags: ['FastAPI', '.NET', 'Node.js', 'Express.js', 'REST API'], span: 'span-narrow' },
    { label: 'Databases', icon: 'storage', tags: ['PostgreSQL', 'MongoDB', 'Firebase', 'Pinecone Vector DB', 'SQL Server'] },
    { label: 'Tools & Platforms', icon: 'build', tags: ['Git & GitHub', 'Postman', 'Jira', 'Vercel', 'Railway', 'Google Cloud', 'VS Code', 'GoDaddy', 'Resend', 'AWS'] },
  ]

  return (
    <section id="skills" className="section-container" data-section="skills">
      <SectionHeader num="04" tag="Skills" title="Technical Skills" subtitle="Languages, frameworks, and tools used in production." />

      <div className="bento-grid">
        {categories.map((cat) => (
          <div key={cat.label} className={`bento-tile reveal-item ${cat.span || ''}`}>
            <div className="skill-category-label">
              <span className="material-symbols-outlined" style={{ fontSize: 18, color: 'var(--primary)' }}>{cat.icon}</span>
              <h3 className="text-headline-sm">{cat.label}</h3>
            </div>
            <div className="tech-grid">
              {cat.tags.map((t) => (
                <TechChip key={t} name={t} />
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}

// ===== PROJECTS =====
function ProjectsSection() {
  const allProjects = [
    { label: 'API PLATFORM', icon: 'api', title: 'XAPI', category: 'Solo', desc: 'Built and maintained frontend modules for API management workflows, implementing responsive UI components and API integration features used by internal teams. Delivered an integration feature connecting the platform with GitHub, Bitbucket, and GitLab.', tags: ['Angular', 'Spring Boot', 'MongoDB', 'REST API'] },
    { label: 'RETAIL LOYALTY', icon: 'loyalty', title: 'SMECO', category: 'Solo', desc: 'Architected a fullstack loyalty platform supporting customer records with points tracking, tier management, and transaction history. Used Sequelize ORM with cascading transactions to prevent point inconsistencies on failed redemptions.', tags: ['React.js', 'Node.js', 'Express.js', 'MySQL'], github: 'https://github.com/SME-CO' },
    { label: 'SAFETY & MONITORING', icon: 'shield', title: 'ShieldCare', category: 'Solo', desc: 'Cross-platform parental control app enabling real-time screen time tracking and per-app usage limits configurable from a parent dashboard, powered by Firebase Realtime Database listeners for live usage updates.', tags: ['React.js', 'FastAPI', 'Firebase'], github: 'https://github.com/amanasamsudeen/SheildCare' },
    { label: 'COMMUNITY IMPACT', icon: 'pets', title: 'PETSO', category: 'Team', desc: 'Full-stack social platform connecting animal welfare organizations with the public, covering adoption listings, organization profiles, and community engagement, with shelter-side matching by species, age, and location.', tags: ['PHP', 'MySQL', 'SCSS', 'AWS'], github: 'https://github.com/PetSo-IS06' },
  ]

  const filters = ['All', 'Solo', 'Team']
  const [filter, setFilter] = useState('All')
  const filtered = filter === 'All' ? allProjects : allProjects.filter((p) => p.category === filter)

  return (
    <section id="projects" className="section-container section-divider" data-section="projects">
      <SectionHeader num="05" tag="Work" title="Featured Projects" />

      {/* ResilienceQ Card */}
      <div className="project-showcase reveal-item">
        <div className="project-meta-row">
          <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
            <span className="showcase-badge">Production</span>
            <span className="live-badge">
              <span style={{ width: 6, height: 6, borderRadius: '50%', background: 'var(--tertiary)', display: 'inline-block' }} />
              <span>Live</span>
            </span>
          </div>
          <div className="text-label-mono" style={{ color: 'var(--on-surface-variant)' }}>resilienceq.in</div>
        </div>

        <div>
          <h3 className="text-headline-lg" style={{ color: 'var(--on-surface)' }}>ResilienceQ</h3>
          <p className="text-body-md" style={{ color: 'var(--primary)', fontWeight: 600, paddingTop: 4 }}>AI-Powered Resilience Assessment Platform</p>
          <p className="text-body-lg" style={{ color: 'var(--on-surface-variant)', paddingTop: 8 }}>
            Built a fullstack resilience assessment platform (React/Astro + FastAPI + PostgreSQL) where users complete adaptive questionnaires and receive LLM-generated, personalized coaching recommendations. Designed a RAG pipeline with Pinecone vector DB and Gemini 2.5 Flash to power a contextual chatbot, grounding responses in domain-specific content. Deployed to production via Railway and Vercel.
          </p>
        </div>

        <TechRow items={['React.js', 'FastAPI', 'PostgreSQL', 'MongoDB', 'Firebase']} />

        <div className="project-actions">
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 'var(--space-sm)' }}>
            <a href="https://resilienceq.in/" target="_blank" rel="noopener" className="btn-primary-sm">
              <span>Visit Website</span>
              <span className="material-symbols-outlined" style={{ fontSize: 16 }}>open_in_new</span>
            </a>
            <a href="https://github.com/amanasamsudeen/ResilienceQ" target="_blank" rel="noopener" className="btn-surface-sm">
              <span className="material-symbols-outlined" style={{ fontSize: 16 }}>code</span>
              <span>GitHub</span>
            </a>
          </div>
        </div>
      </div>

      {/* IFDC Project Card */}
      <div className="project-showcase reveal-item">
        <div className="project-meta-row">
          <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
            <span className="showcase-badge">Client Project</span>
            <span className="live-badge">
              <span style={{ width: 6, height: 6, borderRadius: '50%', background: 'var(--tertiary)', display: 'inline-block' }} />
              <span>Live</span>
            </span>
          </div>
          <div className="text-label-mono" style={{ color: 'var(--on-surface-variant)' }}>ifdchild.org</div>
        </div>

        <div className="ifdc-grid">
          <div className="ifdc-left">
            <span className="text-label-mono" style={{ color: 'var(--on-surface-variant)' }}>The International Foundation for Digital Child (IFDC)</span>
            <h3 className="text-headline-lg" style={{ color: 'var(--on-surface)' }}>IFDC — Child Online Protection Platform</h3>
            <p className="text-body-md" style={{ color: 'var(--primary)', fontWeight: 600 }}>Official Web Platform &amp; Content Management System</p>
            <p className="text-body-lg" style={{ color: 'var(--on-surface-variant)', paddingTop: 8 }}>
              Designed and developed the full-stack digital web platform for IFDC (The International Foundation for Digital Child). Engineered responsive, child-safe interactive education portals, dynamic news/blog publishing workflows, and digital awareness campaign hubs supporting nationwide child online protection initiatives.
            </p>
            <TechRow items={['Python', 'FastAPI', 'React.js', 'Tailwind CSS', 'Vercel', 'Railway', 'Namecheap']} />
          </div>
        </div>

        <div className="project-actions" style={{ borderTop: `1px solid var(--outline-variant)`, paddingTop: 'var(--space-sm)' }}>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 'var(--space-sm)' }}>
            <a href="https://ifdchild.org/" target="_blank" rel="noopener" className="btn-primary-sm">
              <span>Visit Website</span>
              <span className="material-symbols-outlined" style={{ fontSize: 16 }}>open_in_new</span>
            </a>
          </div>
        </div>
      </div>

      {/* Other Projects — filterable grid */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-md)', paddingTop: 'var(--space-lg)' }}>
        <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between', gap: 'var(--space-sm)' }}>
          <h3 className="text-headline-sm" style={{ color: 'var(--on-surface)' }}>Other Notable Projects</h3>
          <div className="filter-tabs">
            {filters.map((f) => (
              <button key={f} onClick={() => setFilter(f)} className={`filter-tab${filter === f ? ' active' : ''}`}>
                {f === 'All' ? 'All Projects' : `${f} Projects`}
              </button>
            ))}
          </div>
        </div>
        <div className="other-projects-stack">
          {filtered.map((p) => (
            <div key={p.title} className="other-project-card reveal-item">
              <div>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <span className="text-label-mono" style={{ color: 'var(--on-surface-variant)' }}>{p.label}</span>
                  <span className="material-symbols-outlined" style={{ fontSize: 18, color: 'var(--on-surface-variant)' }}>{p.icon}</span>
                </div>
                <h4 className="text-headline-sm" style={{ color: 'var(--on-surface)' }}>{p.title}</h4>
                <p className="text-body-md" style={{ color: 'var(--on-surface-variant)' }}>{p.desc}</p>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 'var(--space-sm)' }}>
                <TechRow items={p.tags} />
                {p.github && (
                  <a href={p.github} target="_blank" rel="noopener" aria-label={`${p.title} on GitHub`} className="social-icon-btn">
                    <span className="material-symbols-outlined" style={{ fontSize: 17 }}>code</span>
                  </a>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

// ===== CERTIFICATIONS — badge grid =====
function CertificationsSection() {
  const certs = [
    { title: 'Postman API Student Expert', issuer: 'Postman', icon: 'api' },
    { title: 'Java Full Stack with React.js & AI', issuer: 'Course Certificate', icon: 'code' },
    { title: 'Prompt Design in Vertex AI', issuer: 'Google Cloud', icon: 'auto_awesome', file: 'https://www.credly.com/badges/b50c881e-b652-4dd0-ab19-c5d8a54711b9/linked_in?t=t8i1yh' },
    { title: 'Introduction to Internet of Things', issuer: 'Course Certificate', icon: 'sensors', file: '/certifications/introduction-to-iot.pdf' },
    { title: 'Computer Networks & Internet Protocol', issuer: 'Course Certificate', icon: 'lan', file: '/certifications/computer-networks-and-internet-protocol.pdf' },
  ]

  return (
    <section id="certifications" className="section-container" data-section="certifications">
      <SectionHeader num="07" tag="Certifications" title="Certifications" subtitle="Credentials earned across API tooling, full-stack development, and applied AI." />

      <div className="cred-list">
        {certs.map((c, i) => (
          <div key={c.title} className="cred-row reveal-item">
            <span className="cred-index">{String(i + 1).padStart(2, '0')}</span>
            <span className="cred-icon">
              <span className="material-symbols-outlined" style={{ fontSize: 20 }}>{c.icon}</span>
            </span>
            <div className="cred-title-block">
              <span className="text-body-md" style={{ color: 'var(--on-surface)', fontWeight: 700 }}>{c.title}</span>
              <span className="text-label-mono" style={{ color: 'var(--on-surface-variant)' }}>{c.issuer}</span>
            </div>
            {c.file ? (
              <a href={c.file} target="_blank" rel="noopener" className="cred-view-btn">
                <span className="material-symbols-outlined" style={{ fontSize: 16 }}>visibility</span>
                <span>View Certificate</span>
              </a>
            ) : (
              <span className="material-symbols-outlined" style={{ fontSize: 20, color: 'var(--tertiary)' }}>check_circle</span>
            )}
          </div>
        ))}
      </div>
    </section>
  )
}

// ===== ACHIEVEMENTS — trophy shelf + publication =====
function AchievementsSection() {
  return (
    <section id="achievements" className="section-container section-divider" data-section="achievements">
      <SectionHeader num="08" tag="Achievements" title="Honors &amp; Hackathons" subtitle="Awards, competitions, and published research." />

      <div className="trophy-row">
        {[
          { badge: 'Merit Scholarship', icon: 'stars', title: 'ICCR Scholar', desc: 'Awarded the merit scholarship by the Government of India for academic excellence, funding postgraduate research in Information Technology.' },
          {
            badge: 'Hackathon Winner',
            icon: 'trophy',
            title: 'Winner — PearlHack 1.0',
            desc: 'Sabaragamuwa University of Sri Lanka. Inter-university hackathon.',
            photos: ['/achievements/pearlhack.jpeg'],
            file: '/achievements/pearlhack-certificate.pdf',
          },
          {
            badge: '2nd Place',
            icon: 'military_tech',
            title: 'Runner-up — Hackaholics 5.0',
            desc: 'University of Colombo School of Computing (UCSC). Inter-university girls\' hackathon.',
            photos: ['/achievements/hackaholics-1.jpeg', '/achievements/hackaholics-2.jpeg'],
          },
        ].map((a) => (
          <div key={a.title} className="trophy-card reveal-item">
            <span className="trophy-medal">
              <span className="material-symbols-outlined" style={{ fontSize: 26 }}>{a.icon}</span>
            </span>
            <div style={{ flex: 1 }}>
              <span className="period-pill">{a.badge}</span>
              <h4 className="text-body-lg" style={{ color: 'var(--on-surface)', fontWeight: 700, marginTop: 6 }}>{a.title}</h4>
              <p className="text-body-md" style={{ color: 'var(--on-surface-variant)' }}>{a.desc}</p>
              {a.photos && (
                <div className="achievement-photos">
                  {a.photos.map((src, i) => (
                    <img key={src} src={src} alt={`${a.title} — team photo ${i + 1}`} loading="lazy" />
                  ))}
                </div>
              )}
              {a.file && (
                <a href={a.file} target="_blank" rel="noopener" className="cred-view-btn" style={{ marginTop: 'var(--space-sm)' }}>
                  <span className="material-symbols-outlined" style={{ fontSize: 16 }}>description</span>
                  <span>View Certificate</span>
                </a>
              )}
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}

// ===== PUBLICATIONS =====
function PublicationsSection() {
  return (
    <section id="publications" className="section-container section-divider" data-section="publications">
      <SectionHeader num="09" tag="Publications" title="Peer-Reviewed Publication" subtitle="Published research in an academic book chapter." />

      <a
        href="https://www.taylorfrancis.com/chapters/edit/10.1201/9781003534679-16/waste-awareness-disposal-behaviors-path-toward-sustainable-management-study-among-undergraduate-students-university-colombo-srilanka-amana-aadhib-prashanthi-shriyani-boopathikumar"
        target="_blank"
        rel="noopener"
        className="publication-card reveal-item"
        style={{ display: 'block', marginTop: 'var(--space-lg)', cursor: 'pointer' }}
      >
        <span className="period-pill" style={{ marginBottom: 'var(--space-sm)', display: 'inline-flex' }}>Book Chapter</span>
        <h4 className="text-body-lg" style={{ color: 'var(--on-surface)', fontWeight: 700, lineHeight: 1.4 }}>
          E-Waste Awareness, Disposal Behaviors and the Path Toward Sustainable Management - A Study Among Undergraduate Students at University of Colombo, Sri Lanka
        </h4>
        <div className="pub-meta">
          <div>
            <span className="pub-meta-label">Publisher</span>
            <span className="pub-meta-value">Taylor &amp; Francis / CRC Press</span>
          </div>
          <div>
            <span className="pub-meta-label">ISBN</span>
            <span className="pub-meta-value">9781003534679</span>
          </div>
          <div>
            <span className="pub-meta-label">Date</span>
            <span className="pub-meta-value">21 Nov 2025</span>
          </div>
        </div>
        <div className="text-label-mono" style={{ display: 'flex', alignItems: 'center', gap: 6, color: 'var(--primary)', marginTop: 'var(--space-sm)' }}>
          <span>View on Taylor &amp; Francis</span>
          <span className="material-symbols-outlined" style={{ fontSize: 16 }}>open_in_new</span>
        </div>
      </a>
    </section>
  )
}

// ===== VOLUNTEERING =====
function VolunteeringSection() {
  const roles = [
    {
      org: 'The International Foundation for Digital child (IFDC)',
      role: 'Pro Bono Web Development & Digital Administration Expert',
      program: 'National Online Child Protection Advocates Program',
      period: '2025 — 2026',
      desc: 'Voluntarily provided technical support in web development and digital administration — managing and maintaining digital platforms, supporting website functionality, assisting with online communication systems, and ensuring smooth digital operations.',
      file: '/volunteering/ifdc-service-letter.pdf',
    },
    {
      org: 'The Story Cafe',
      role: 'IT Solutions Expert',
      program: 'Storycafe — Climate Storytelling Project',
      period: 'May 2025',
      desc: 'Provided technical support and guidance to strengthen the project\'s digital platform — offering IT solutions, supporting platform development, and helping maintain the digital tools used for climate storytelling and online engagement.',
      file: '/volunteering/story-cafe-service-letter.pdf',
    },
  ]

  return (
    <section id="volunteering" className="section-container section-divider" data-section="volunteering">
      <SectionHeader num="10" tag="Volunteering" title="Volunteering Services" subtitle="Pro bono technical work for mission-driven organizations." />

      <div className="volunteer-grid">
        {roles.map((v) => (
          <div key={v.org} className="volunteer-card reveal-item">
            <div className="volunteer-card-head">
              <span className="volunteer-logo-fallback">
                <span className="material-symbols-outlined" style={{ fontSize: 22 }}>volunteer_activism</span>
              </span>
              <span className="period-pill">{v.period}</span>
            </div>
            <h3 className="text-headline-sm" style={{ color: 'var(--on-surface)' }}>{v.role}</h3>
            <p className="text-body-sm" style={{ color: 'var(--primary)', fontWeight: 600 }}>{v.org}</p>
            <p className="text-label-mono" style={{ color: 'var(--on-surface-variant)' }}>{v.program}</p>
            <p className="text-body-sm" style={{ color: 'var(--on-surface-variant)' }}>{v.desc}</p>
            <a href={v.file} target="_blank" rel="noopener" className="cred-view-btn" style={{ alignSelf: 'flex-start', marginTop: 'var(--space-sm)' }}>
              <span className="material-symbols-outlined" style={{ fontSize: 16 }}>description</span>
              <span>View Service Letter</span>
            </a>
          </div>
        ))}
      </div>
    </section>
  )
}

// ===== FREELANCE =====
function FreelanceSection() {
  const services = [
    { icon: 'web', title: 'Full-Stack Web Apps', desc: 'React, Angular, and FastAPI/Node builds — from UI to database.' },
    { icon: 'neurology', title: 'AI & RAG Integrations', desc: 'LangChain pipelines, vector search, and LLM-powered features.' },
    { icon: 'rocket_launch', title: 'API & Deployment', desc: 'REST API design, cloud hosting, and CI/CD from day one.' },
  ]

  const trust = [
    { value: '2+', label: 'Years Experience' },
    { value: '6', label: 'Projects Delivered' },
    { value: '1', label: 'Client Platform Live' },
  ]

  return (
    <section id="freelance" className="section-container" data-section="freelance">
      <SectionHeader num="06" tag="Freelance" title="Open for Freelance Projects" subtitle="Available to take on select freelance and contract work — full-stack builds, AI/RAG integrations, or a feature you need shipped." />

      <div className="freelance-hero reveal-item">
        <div className="freelance-hero-glow" />
        <div className="freelance-hero-content">
          <p className="freelance-pitch text-body-lg" style={{ color: 'var(--on-surface-variant)' }}>
            Have a project in mind? I partner with founders and teams to turn product ideas into deployed, production-ready software — end to end, from API design to the interface your users see.
          </p>

          <div className="freelance-services">
            {services.map((s) => (
              <div key={s.title} className="freelance-service-card">
                <span className="material-symbols-outlined" style={{ fontSize: 24, color: 'var(--primary)' }}>{s.icon}</span>
                <h4 className="text-body-md" style={{ color: 'var(--on-surface)', fontWeight: 700 }}>{s.title}</h4>
                <p className="text-body-sm" style={{ color: 'var(--on-surface-variant)' }}>{s.desc}</p>
              </div>
            ))}
          </div>

          <div className="freelance-trust-row">
            {trust.map((t) => (
              <div key={t.label} className="freelance-trust-item">
                <span className="freelance-trust-value">{t.value}</span>
                <span className="text-label-mono" style={{ color: 'var(--on-surface-variant)' }}>{t.label}</span>
              </div>
            ))}
          </div>

          <a href="mailto:amanasamsudeen@gmail.com?subject=Freelance%20Project%20Inquiry" className="btn-primary freelance-cta">
            <span className="material-symbols-outlined" style={{ fontSize: 18 }}>mail</span>
            <span>Let's Talk About Your Project</span>
            <span className="material-symbols-outlined" style={{ fontSize: 18 }}>arrow_forward</span>
          </a>
        </div>
      </div>
    </section>
  )
}

// ===== CONTACT =====
const MESSAGE_MAX = 600

function ContactSection() {
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' })
  const [errors, setErrors] = useState({})
  const [status, setStatus] = useState('idle')

  const validate = (values) => {
    const next = {}
    if (!values.name.trim()) next.name = 'Please enter your name.'
    if (!values.email.trim()) {
      next.email = 'Please enter your email.'
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email)) {
      next.email = 'Enter a valid email address.'
    }
    if (!values.subject.trim()) next.subject = 'Please add a subject.'
    if (!values.message.trim()) {
      next.message = 'Please write a message.'
    } else if (values.message.length > MESSAGE_MAX) {
      next.message = `Message is too long (${values.message.length}/${MESSAGE_MAX}).`
    }
    return next
  }

  const handleChange = (field) => (e) => {
    const value = e.target.value
    setForm((f) => ({ ...f, [field]: value }))
    setErrors((prev) => (prev[field] ? { ...prev, [field]: undefined } : prev))
    if (status === 'sent') setStatus('idle')
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    const nextErrors = validate(form)
    setErrors(nextErrors)
    if (Object.keys(nextErrors).length > 0) return

    const body = `${form.message}\n\n— ${form.name} (${form.email})`
    const mailto = `mailto:amanasamsudeen@gmail.com?subject=${encodeURIComponent(form.subject)}&body=${encodeURIComponent(body)}`
    window.location.href = mailto

    setStatus('sent')
    setForm({ name: '', email: '', subject: '', message: '' })
  }

  return (
    <section id="contact" className="section-container section-divider" data-section="contact" style={{ paddingBottom: 'var(--margin-lg)' }}>
      <SectionHeader num="11" tag="Contact" title="Let's Build Something Meaningful" subtitle="Whether you have an ambitious AI feature to architect, a complex full-stack codebase needing leadership, or an open engineering role — my inbox is open." />

      <div className="contact-grid" style={{ marginTop: 'var(--space-md)' }}>
        <div className="contact-form-wrapper">
          <form onSubmit={handleSubmit} noValidate style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-md)' }}>
            <div className="form-row">
              <div className="form-group">
                <label htmlFor="contact-name" className="text-label-mono">YOUR NAME</label>
                <input id="contact-name" type="text" placeholder="Alex Mercer" className="form-input" value={form.name} onChange={handleChange('name')} aria-invalid={!!errors.name} />
                {errors.name && <span className="form-error">{errors.name}</span>}
              </div>
              <div className="form-group">
                <label htmlFor="contact-email" className="text-label-mono">YOUR EMAIL</label>
                <input id="contact-email" type="email" placeholder="alex@company.com" className="form-input" value={form.email} onChange={handleChange('email')} aria-invalid={!!errors.email} />
                {errors.email && <span className="form-error">{errors.email}</span>}
              </div>
            </div>
            <div className="form-group">
              <label htmlFor="contact-subject" className="text-label-mono">SUBJECT</label>
              <input id="contact-subject" type="text" placeholder="Full-Stack / AI Systems Opportunity" className="form-input" value={form.subject} onChange={handleChange('subject')} aria-invalid={!!errors.subject} />
              {errors.subject && <span className="form-error">{errors.subject}</span>}
            </div>
            <div className="form-group">
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <label htmlFor="contact-message" className="text-label-mono">MESSAGE</label>
                <span className="text-label-mono" style={{ color: form.message.length > MESSAGE_MAX ? 'var(--error)' : 'var(--on-surface-variant)' }}>
                  {form.message.length}/{MESSAGE_MAX}
                </span>
              </div>
              <textarea id="contact-message" rows="5" placeholder="Tell me about the problem, stack, and timeline..." className="form-textarea" value={form.message} onChange={handleChange('message')} aria-invalid={!!errors.message} />
              {errors.message && <span className="form-error">{errors.message}</span>}
            </div>

            {status === 'sent' && (
              <div className="form-success text-label-mono">
                <span className="material-symbols-outlined" style={{ fontSize: 18 }}>done_all</span>
                <span>Your email app should be open now — send it across and I'll reply soon!</span>
              </div>
            )}

            <button type="submit" className="btn-primary" style={{ alignSelf: 'flex-start' }}>
              <span>Send Message</span>
              <span className="material-symbols-outlined" style={{ fontSize: 18 }}>send</span>
            </button>
          </form>
        </div>

        <div>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
            {[
              { label: 'LinkedIn', href: 'https://linkedin.com/in/amanasamsudeen' },
              { label: 'GitHub', href: 'https://github.com/amanasamsudeen' },
              { label: 'Medium', href: 'https://medium.com/@amanasamsudeen' },
            ].map((s) => (
              <a key={s.label} href={s.href} target="_blank" rel="noopener" className="social-link text-label-mono">
                <SocialIcon label={s.label} size={15} />
                <span>{s.label}</span>
              </a>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

// ===== UTILITY COMPONENTS =====
function SectionHeader({ num, tag, title, subtitle }) {
  return (
    <div className="section-editorial-header">
      <div className="section-editorial-title">
        <span className="eyebrow">{num} / {tag}</span>
        <h2 className="text-headline-lg headline-gradient">{title}</h2>
        {subtitle && <p className="text-body-md" style={{ color: 'var(--on-surface-variant)' }}>{subtitle}</p>}
      </div>
    </div>
  )
}

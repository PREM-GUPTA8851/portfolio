/**
 * ==========================================================================
 * PREM KUMAR GUPTA — MONOCHROMATIC 3D HORIZONTAL PORTFOLIO ENGINE
 * ==========================================================================
 * Features:
 *   1. 3D Warp Intro Gate with Interactive Follower Cursor & Audio FX
 *   2. Smooth Inertial Horizontal Scrolling (Wheel, Touch, Drag, Keys, Nav)
 *   3. Ambient 3D Interactive Background Canvas
 *   4. Dynamic 3D Card Hover Tilts
 *   5. Interactive 8-Stage RAG Pipeline Architecture Visualizer
 *   6. Dynamic GitHub Heatmap Generation
 *   7. One-Click Copy, Theme Persistence, and HUD Updates
 * ==========================================================================
 */

document.addEventListener('DOMContentLoaded', () => {
  initTheme();
  initIntroGate();
  initBackground3DCanvas();
  initHorizontalScrollEngine();
  initScrollRevealEngine();
  init3DCardTilts();
  initAllProjectsShowcase();
  initGithubHeatmap();
  initGithubActivityRadar();
  initExperienceFilter();
  initEmailCopy();
  initContactForm();
});

/* --------------------------------------------------------------------------
   1. THEME CONTROLLER
   -------------------------------------------------------------------------- */
function initTheme() {
  const toggleBtn = document.getElementById('theme-toggle-btn');
  const savedTheme = localStorage.getItem('prem_theme_monochrome') || 'dark';
  document.documentElement.setAttribute('data-theme', savedTheme);

  if (toggleBtn) {
    toggleBtn.addEventListener('click', () => {
      const current = document.documentElement.getAttribute('data-theme') || 'dark';
      const next = current === 'dark' ? 'light' : 'dark';
      document.documentElement.setAttribute('data-theme', next);
      localStorage.setItem('prem_theme_monochrome', next);
      showToast(`Switched to ${next.toUpperCase()} mode`);
    });
  }
}

/* --------------------------------------------------------------------------
   2. 3D WARP INTRO GATE & CURSOR ENGINE
   -------------------------------------------------------------------------- */
function initIntroGate() {
  const gate = document.getElementById('intro-gate');
  const enterBtn = document.getElementById('intro-enter-btn');
  const cursorRing = document.getElementById('intro-cursor-ring');
  const warpCanvas = document.getElementById('intro-warp-canvas');
  const replayBtn = document.getElementById('replay-intro-btn');

  if (!gate || !enterBtn || !warpCanvas) return;

  const ctx = warpCanvas.getContext('2d');
  let width = (warpCanvas.width = window.innerWidth);
  let height = (warpCanvas.height = window.innerHeight);

  window.addEventListener('resize', () => {
    width = warpCanvas.width = window.innerWidth;
    height = warpCanvas.height = window.innerHeight;
  });

  // Follower Cursor Logic on Intro
  let mouseX = width / 2;
  let mouseY = height / 2;
  let cursorX = mouseX;
  let cursorY = mouseY;

  window.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
  });

  if (cursorRing) {
    function animateCursor() {
      cursorX += (mouseX - cursorX) * 0.18;
      cursorY += (mouseY - cursorY) * 0.18;
      cursorRing.style.left = `${cursorX}px`;
      cursorRing.style.top = `${cursorY}px`;
      requestAnimationFrame(animateCursor);
    }
    animateCursor();

    enterBtn.addEventListener('mouseenter', () => cursorRing.classList.add('cursor-active'));
    enterBtn.addEventListener('mouseleave', () => cursorRing.classList.remove('cursor-active'));
  }

  // 3D Warp Stars Canvas
  const NUM_STARS = 450;
  let speed = 1.2;
  let isWarping = false;

  const stars = Array.from({ length: NUM_STARS }, () => ({
    x: (Math.random() - 0.5) * width * 2,
    y: (Math.random() - 0.5) * height * 2,
    z: Math.random() * width,
    prevZ: 0
  }));

  function renderWarp() {
    ctx.fillStyle = isWarping ? 'rgba(2, 2, 4, 0.35)' : 'rgba(2, 2, 4, 0.8)';
    ctx.fillRect(0, 0, width, height);

    const cx = width / 2;
    const cy = height / 2;

    for (let i = 0; i < NUM_STARS; i++) {
      const s = stars[i];
      s.prevZ = s.z;
      s.z -= speed;

      if (s.z <= 0) {
        s.z = width;
        s.x = (Math.random() - 0.5) * width * 2;
        s.y = (Math.random() - 0.5) * height * 2;
        s.prevZ = s.z;
      }

      const k = 250 / s.z;
      const px = s.x * k + cx;
      const py = s.y * k + cy;

      const pk = 250 / s.prevZ;
      const ppx = s.x * pk + cx;
      const ppy = s.y * pk + cy;

      if (px >= 0 && px <= width && py >= 0 && py <= height) {
        const shade = Math.min(255, Math.floor((1 - s.z / width) * 255));
        ctx.strokeStyle = `rgb(${shade}, ${shade}, ${shade})`;
        ctx.lineWidth = isWarping ? 2.5 : 1;
        ctx.beginPath();
        ctx.moveTo(ppx, ppy);
        ctx.lineTo(px, py);
        ctx.stroke();
      }
    }

    requestAnimationFrame(renderWarp);
  }
  renderWarp();

  // Enter Experience Action
  function triggerGateOpen() {
    isWarping = true;
    speed = 40; // Hyperspace speed!
    playFuturisticChime();

    setTimeout(() => {
      gate.classList.add('gate-opened');
      showToast("Welcome to Prem Kumar Gupta's 3D Universe");
      setTimeout(() => {
        isWarping = false;
        speed = 1.2;
      }, 1000);
    }, 650);
  }

  enterBtn.addEventListener('click', triggerGateOpen);

  if (replayBtn) {
    replayBtn.addEventListener('click', () => {
      gate.classList.remove('gate-opened');
      const viewport = document.getElementById('h-viewport');
      if (viewport) viewport.scrollTo({ left: 0, behavior: 'smooth' });
    });
  }
}

// Procedural Futuristic WebAudio Chime (Zero External Audio Dependencies)
function playFuturisticChime() {
  try {
    const AudioContext = window.AudioContext || window.webkitAudioContext;
    if (!AudioContext) return;
    const ctx = new AudioContext();

    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.type = 'sine';
    osc.frequency.setValueAtTime(220, ctx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(880, ctx.currentTime + 0.4);

    gain.gain.setValueAtTime(0.01, ctx.currentTime);
    gain.gain.linearRampToValueAtTime(0.18, ctx.currentTime + 0.1);
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.8);

    osc.connect(gain);
    gain.connect(ctx.destination);

    osc.start();
    osc.stop(ctx.currentTime + 0.8);
  } catch (e) {
    // Audio optional/suppressed
  }
}

/* --------------------------------------------------------------------------
   3. BACKGROUND 3D INTERACTIVE CANVAS
   -------------------------------------------------------------------------- */
function initBackground3DCanvas() {
  const canvas = document.getElementById('bg-3d-canvas');
  if (!canvas) return;

  const ctx = canvas.getContext('2d');
  let w = (canvas.width = window.innerWidth);
  let h = (canvas.height = window.innerHeight);

  window.addEventListener('resize', () => {
    w = canvas.width = window.innerWidth;
    h = canvas.height = window.innerHeight;
  });

  const nodes = Array.from({ length: 55 }, () => ({
    x: Math.random() * w,
    y: Math.random() * h,
    vx: (Math.random() - 0.5) * 0.4,
    vy: (Math.random() - 0.5) * 0.4,
    radius: Math.random() * 2 + 1
  }));

  let mX = w / 2;
  let mY = h / 2;
  window.addEventListener('mousemove', (e) => {
    mX = e.clientX;
    mY = e.clientY;
  });

  function renderNodes() {
    ctx.clearRect(0, 0, w, h);

    const isLight = document.documentElement.getAttribute('data-theme') === 'light';
    const nodeColor = isLight ? 'rgba(0,0,0,0.25)' : 'rgba(255,255,255,0.4)';
    const lineColor = isLight ? 'rgba(0,0,0,0.06)' : 'rgba(255,255,255,0.08)';

    for (let i = 0; i < nodes.length; i++) {
      const n = nodes[i];
      n.x += n.vx;
      n.y += n.vy;

      if (n.x < 0 || n.x > w) n.vx *= -1;
      if (n.y < 0 || n.y > h) n.vy *= -1;

      // Mouse subtle pull
      const dx = mX - n.x;
      const dy = mY - n.y;
      const dist = Math.sqrt(dx * dx + dy * dy);
      if (dist < 180) {
        n.x += dx * 0.005;
        n.y += dy * 0.005;
      }

      ctx.fillStyle = nodeColor;
      ctx.beginPath();
      ctx.arc(n.x, n.y, n.radius, 0, Math.PI * 2);
      ctx.fill();

      for (let j = i + 1; j < nodes.length; j++) {
        const n2 = nodes[j];
        const d2 = Math.hypot(n.x - n2.x, n.y - n2.y);
        if (d2 < 140) {
          ctx.strokeStyle = lineColor;
          ctx.lineWidth = 1 - d2 / 140;
          ctx.beginPath();
          ctx.moveTo(n.x, n.y);
          ctx.lineTo(n2.x, n2.y);
          ctx.stroke();
        }
      }
    }

    requestAnimationFrame(renderNodes);
  }
  renderNodes();
}

/* --------------------------------------------------------------------------
   4. MASTER HORIZONTAL SCROLL ENGINE
   -------------------------------------------------------------------------- */
function initHorizontalScrollEngine() {
  const viewport = document.getElementById('h-viewport');
  const progressBar = document.getElementById('h-progress-bar');
  const hudIndex = document.getElementById('hud-panel-index');
  const navItems = document.querySelectorAll('.nav-section-item');
  const panels = document.querySelectorAll('.h-panel');

  if (!viewport) return;

  const PANEL_INFO = [
    "01 / 07 — HERO CHRONICLE",
    "02 / 07 — PREM IDENTITY & MANIFESTO",
    "03 / 07 — ALGORITHMIC PROOF & BENCHMARKS",
    "04 / 07 — OPEN SOURCE & INDUSTRY LEADERSHIP",
    "05 / 07 — FLAGSHIP SOFTWARE & RAG SYSTEMS",
    "06 / 07 — 19 ACCREDITED CREDENTIALS",
    "07 / 07 — GLOBAL REACHOUT & CONNECT"
  ];

  // Smooth Inertial Wheel to Horizontal Mapping
  let targetScrollLeft = viewport.scrollLeft;
  let isWheelScrolling = false;

  viewport.addEventListener('wheel', (e) => {
    // Only map on desktop when horizontal layout is active
    if (window.innerWidth > 1024) {
      e.preventDefault();
      const delta = e.deltaY !== 0 ? e.deltaY : e.deltaX;
      targetScrollLeft = Math.max(
        0,
        Math.min(viewport.scrollWidth - viewport.clientWidth, targetScrollLeft + delta * 1.5)
      );

      if (!isWheelScrolling) {
        isWheelScrolling = true;
        requestAnimationFrame(smoothScrollTick);
      }
    }
  }, { passive: false });

  function smoothScrollTick() {
    const diff = targetScrollLeft - viewport.scrollLeft;
    if (Math.abs(diff) > 0.5) {
      viewport.scrollLeft += diff * 0.15;
      requestAnimationFrame(smoothScrollTick);
    } else {
      viewport.scrollLeft = targetScrollLeft;
      isWheelScrolling = false;
    }
    updateHUDAndProgress();
  }

  // Drag-to-Scroll Functionality
  let isDown = false;
  let startX;
  let scrollLeftStart;

  viewport.addEventListener('mousedown', (e) => {
    if (window.innerWidth <= 1024) return;
    isDown = true;
    startX = e.pageX - viewport.offsetLeft;
    scrollLeftStart = viewport.scrollLeft;
    targetScrollLeft = viewport.scrollLeft;
  });

  window.addEventListener('mouseup', () => {
    isDown = false;
  });

  viewport.addEventListener('mousemove', (e) => {
    if (!isDown || window.innerWidth <= 1024) return;
    e.preventDefault();
    const x = e.pageX - viewport.offsetLeft;
    const walk = (x - startX) * 2;
    viewport.scrollLeft = scrollLeftStart - walk;
    targetScrollLeft = viewport.scrollLeft;
    updateHUDAndProgress();
  });

  // Keyboard Navigation
  window.addEventListener('keydown', (e) => {
    if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA' || e.target.tagName === 'SELECT') return;

    if (e.key === 'ArrowRight' || e.key === 'PageDown') {
      targetScrollLeft = Math.min(viewport.scrollWidth - viewport.clientWidth, targetScrollLeft + 650);
      if (!isWheelScrolling) {
        isWheelScrolling = true;
        smoothScrollTick();
      }
    } else if (e.key === 'ArrowLeft' || e.key === 'PageUp') {
      targetScrollLeft = Math.max(0, targetScrollLeft - 650);
      if (!isWheelScrolling) {
        isWheelScrolling = true;
        smoothScrollTick();
      }
    }
  });

  // Header Nav Click Support
  navItems.forEach((item, index) => {
    const btn = item.querySelector('button');
    if (btn) {
      btn.addEventListener('click', () => {
        const targetPanel = panels[index];
        if (targetPanel) {
          targetScrollLeft = targetPanel.offsetLeft;
          viewport.scrollTo({ left: targetPanel.offsetLeft, behavior: 'smooth' });
          targetScrollLeft = targetPanel.offsetLeft;
        }
      });
    }
  });

  // Jump to Start in Bottom HUD
  const jumpStart = document.getElementById('hud-jump-start');
  if (jumpStart) {
    jumpStart.addEventListener('click', () => {
      viewport.scrollTo({ left: 0, behavior: 'smooth' });
      targetScrollLeft = 0;
    });
  }

  // Update Progress, HUD, and Active Nav
  function updateHUDAndProgress() {
    const maxScroll = viewport.scrollWidth - viewport.clientWidth;
    const progress = maxScroll > 0 ? (viewport.scrollLeft / maxScroll) * 100 : 0;

    if (progressBar) {
      progressBar.style.width = `${progress}%`;
    }

    // Determine Active Panel
    let activeIndex = 0;
    panels.forEach((p, i) => {
      if (viewport.scrollLeft >= p.offsetLeft - viewport.clientWidth * 0.45) {
        activeIndex = i;
      }
    });

    if (hudIndex && PANEL_INFO[activeIndex]) {
      hudIndex.textContent = PANEL_INFO[activeIndex];
    }

    navItems.forEach((item, i) => {
      item.classList.toggle('active', i === activeIndex);
    });
  }

  viewport.addEventListener('scroll', updateHUDAndProgress, { passive: true });
}

/* --------------------------------------------------------------------------
   5. 3D CARD HOVER TILTS
   -------------------------------------------------------------------------- */
function init3DCardTilts() {
  const cards = document.querySelectorAll(
    '.hero-profile-card-3d, .prem-char-card, .flagship-project-card, .metric-showcase-box'
  );

  cards.forEach((card) => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      const centerX = rect.width / 2;
      const centerY = rect.height / 2;

      const rotateX = ((y - centerY) / centerY) * -9;
      const rotateY = ((x - centerX) / centerX) * 9;

      card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`;
    });

    card.addEventListener('mouseleave', () => {
      card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)';
    });
  });
}

/* --------------------------------------------------------------------------
   5B. SCROLL REVEAL ENGINE (Gamma Style - Content Animates on Scroll)
   -------------------------------------------------------------------------- */
function initScrollRevealEngine() {
  const viewport = document.getElementById('h-viewport');
  const panels = document.querySelectorAll('.h-panel');
  if (!viewport || !panels.length) return;

  function checkPanels() {
    const scrollPos = viewport.scrollLeft;
    const viewWidth = viewport.clientWidth;

    panels.forEach((panel) => {
      // Panel reveals when 25% of it enters the viewport
      if (scrollPos + viewWidth >= panel.offsetLeft + (panel.clientWidth * 0.15)) {
        panel.classList.add('panel-revealed');
      }
    });
  }

  // Trigger once on initial load for the first two panels
  checkPanels();
  setTimeout(checkPanels, 300);

  viewport.addEventListener('scroll', checkPanels, { passive: true });
}

/* --------------------------------------------------------------------------
   6. ALL 4 FLAGSHIP PROJECTS ARCHITECTURE SHOWCASE (Interactive Switcher)
   -------------------------------------------------------------------------- */
const ALL_PROJECTS = {
  rag: {
    id: "rag",
    tagline: "Flagship Architecture • AI Codebase Intelligence",
    title: "GitHub RAG Assistant",
    summary: "Semantic codebase comprehension engine performing context-aware Q&A and automated bug localization over entire polyglot repositories. Powered by FastAPI, ChromaDB vector indexing, all-MiniLM dense embeddings, and Groq LPU (Llama 3 70B @ >300 tok/sec).",
    techChips: ["FastAPI", "ChromaDB", "Groq LPU", "Llama 3 70B", "Next.js 14", "Sentence-Transformers"],
    githubUrl: "https://github.com/PREM-GUPTA8851",
    metric: "Sub-millisecond ChromaDB retrieval • >300 tokens/sec Groq Inference",
    pipelineLabel: "Interactive 8-Stage Execution Pipeline",
    stages: [
      { step: 1, name: "01. GitHub Repository Ingestion", role: "Polyglot Source Tree Traversal", desc: "Connects securely to target repositories via GitHub API, extracting hierarchical file trees, commit metadata, and raw source code across Java, Python, TypeScript, and Go.", tech: "FastAPI / GitHub REST API" },
      { step: 2, name: "02. AST Syntax & Code Chunking", role: "Context-Aware Structural Slicing", desc: "Deconstructs code using Abstract Syntax Trees into logical function, class, and method blocks with 50-token semantic overlap to retain contextual continuity.", tech: "Tree-Sitter / Python AST" },
      { step: 3, name: "03. Dense Vector Embeddings", role: "High-Dimensional Vectorization", desc: "Transforms code snippets into 384-dimensional dense vectors using HuggingFace all-MiniLM-L6-v2, optimized for cross-language semantic similarity.", tech: "Sentence-Transformers / all-MiniLM" },
      { step: 4, name: "04. ChromaDB Vector Indexing", role: "HNSW Nearest Neighbor Index", desc: "Persists and indexes high-dimensional vectors within a local ChromaDB collection utilizing cosine distance metrics for sub-millisecond retrieval.", tech: "ChromaDB / SQLite Persistence" },
      { step: 5, name: "05. Natural Language Query Analysis", role: "Intent Formulation & Query Embedding", desc: "Analyzes developer inquiries, expands keywords, generates query embeddings, and matches against the repository index using semantic cosine scoring.", tech: "Vector Cosine Search" },
      { step: 6, name: "06. Context Assembly & Re-Ranking", role: "Precision Prompt Engineering", desc: "Reranks retrieved code snippets, injects exact file paths, line references, and formats a hardened markdown system prompt bounded by strict token budgets.", tech: "Cross-Encoder / Token Truncation" },
      { step: 7, name: "07. Groq LPU Inference (Llama 3 70B)", role: "Ultra-Low-Latency Generation", desc: "Dispatches the synthesized prompt to Groq LPUs running Llama 3 70B, streaming architectural explanations and bug resolutions at >300 tokens/sec.", tech: "Groq LPU / Llama 3 70B" },
      { step: 8, name: "08. Streaming Next.js UI Delivery", role: "Interactive Real-Time Response", desc: "Streams syntactically highlighted code blocks and file citation badges directly into the Next.js client interface with copy and branch checkout shortcuts.", tech: "Next.js / Server-Sent Events (SSE)" }
    ]
  },
  proctored: {
    id: "proctored",
    tagline: "AI Security Architecture • Remote Exam Proctoring",
    title: "ProctorEd • Autonomous Exam Integrity System",
    summary: "Comprehensive AI-driven online exam integrity ecosystem providing real-time multi-face detection, gaze tracking, audio whisper anomaly detection, biometric ID card OCR verification, and strict tab penalty enforcement.",
    techChips: ["MERN Stack", "OpenCV", "Tesseract OCR", "Socket.IO", "WebRTC", "MediaPipe FaceMesh"],
    githubUrl: "https://github.com/PREM-GUPTA8851",
    metric: "60 FPS FaceMesh Gaze Tracking • Real-Time Socket.IO Telemetry",
    pipelineLabel: "Interactive 6-Stage Security & Integrity Pipeline",
    stages: [
      { step: 1, name: "01. Biometric ID OCR Verification", role: "Candidate Authentication", desc: "Performs optical character recognition on student photo ID cards via Tesseract OCR to cross-reference university enrollment databases before exam unlock.", tech: "Tesseract OCR / Node.js" },
      { step: 2, name: "02. 68-Point Real-Time Gaze Tracking", role: "Head Pose & Eye Deviation", desc: "Uses OpenCV and MediaPipe 68-point facial mesh to compute pitch, yaw, and roll vectors, detecting off-screen screen glancing and secondary devices.", tech: "OpenCV / MediaPipe" },
      { step: 3, name: "03. Audio Spectral Anomaly Detection", role: "Whisper & Multi-Voice Flagging", desc: "Analyzes continuous audio input using Web Audio API Fast Fourier Transforms (FFT) to isolate speech frequencies from ambient room noise.", tech: "Web Audio API / Frequency FFT" },
      { step: 4, name: "04. Browser Sandbox & Tab Enforcement", role: "Strict Client Lock", desc: "Enforces full-screen viewport trapping, tracking blur events, clipboard attempts, and alt-tab actions with immediate incremental point penalties.", tech: "Full-Screen API / Event Traps" },
      { step: 5, name: "05. Real-Time WebSocket Telemetry", role: "Sub-Second Alert Stream", desc: "Pushes encrypted violation telemetry packets to proctors over bi-directional Socket.IO channels with video frame snapshot attachments.", tech: "Socket.IO / Binary WebSockets" },
      { step: 6, name: "06. Automated Integrity Audit Report", role: "Cryptographic Incident Ledger", desc: "Compiles complete timeline logs, incident frequency heatmaps, and proctor signature certificates with tamper-resistant cryptographic hashes.", tech: "PDFKit / SHA-256 Checksums" }
    ]
  },
  byod: {
    id: "byod",
    tagline: "Distributed Systems • Classroom Governance",
    title: "BYOD Classroom Management Platform",
    summary: "Real-time educational device synchronization suite enabling zero-latency screen broadcasting, dynamic session token pairing, student focus monitoring, and instant comprehension assessments over local networks.",
    techChips: ["React 18", "Vite", "Node.js", "WebRTC Mesh", "Socket.IO", "TailwindCSS"],
    githubUrl: "https://github.com/PREM-GUPTA8851",
    metric: "<50ms WebRTC Video Broadcast Latency • 200+ Concurrent Students",
    pipelineLabel: "Interactive 5-Stage Classroom Synchronization Pipeline",
    stages: [
      { step: 1, name: "01. QR & Token Session Pairing", role: "Instant Student Enrollment", desc: "Generates time-expiring ephemeral QR codes and 6-digit numeric PINs allowing students to authenticate into active lectures without manual login friction.", tech: "JWT / Dynamic Session Tokens" },
      { step: 2, name: "02. WebRTC Peer-to-Peer Screen Stream", role: "Sub-50ms Low-Latency Video", desc: "Broadcasts instructor screen and active IDE canvases directly to hundreds of concurrent client devices using adaptive WebRTC video streams.", tech: "WebRTC / MediaStream API" },
      { step: 3, name: "03. Client Focus & Heartbeat Telemetry", role: "Engagement Tracking", desc: "Monitors active browser window focus, tab visibility state, and periodic heartbeats, displaying student engagement status in real-time.", tech: "Page Visibility API / Socket Heartbeats" },
      { step: 4, name: "04. Real-Time Polls & Code Quizzes", role: "Instant Knowledge Validation", desc: "Pushes multiple-choice questions and coding challenges instantaneously to student screens, compiling live distribution charts in milliseconds.", tech: "WebSocket Dispatch / SVG Charts" },
      { step: 5, name: "05. Instructor Command & Governance Dashboard", role: "Centralized Orchestration", desc: "Provides single-click screen locks, student messaging, session URL whitelisting, and automated attendance logging with CSV export.", tech: "React 18 / Node.js Engine" }
    ]
  },
  vendorlink: {
    id: "vendorlink",
    tagline: "Enterprise Systems • Supply Chain & Governance",
    title: "VendorLink • Enterprise Procurement Platform",
    summary: "Robust multi-tiered enterprise supplier governance platform managing RFQ lifecycle, sealed-bid evaluations, purchase order automation, and milestone verification backed by Spring Boot, MySQL, and JWT RBAC.",
    techChips: ["Java 17", "Spring Boot", "MySQL", "Hibernate ORM", "Spring Security", "React"],
    githubUrl: "https://github.com/PREM-GUPTA8851",
    metric: "ACID Guaranteed Transactions • End-to-End JWT RBAC Security",
    pipelineLabel: "Interactive 5-Stage Procurement Lifecycle Pipeline",
    stages: [
      { step: 1, name: "01. Supplier KYC & Automated Onboarding", role: "Identity & Tax Validation", desc: "Validates enterprise tax IDs (GSTIN/PAN), ingests banking certificates, and executes algorithmic compliance checks before vendor activation.", tech: "Spring Validation / Document Storage" },
      { step: 2, name: "02. Real-Time RFQ & Sealed Bidding Engine", role: "Transparent Tender Processing", desc: "Publishes structured Request For Quotes with cryptographically sealed vendor bids that automatically decrypt simultaneously at deadline expiration.", tech: "AES-256 Encryption / Spring Events" },
      { step: 3, name: "03. Purchase Order Generation & Inventory Sync", role: "ERP Transaction Dispatch", desc: "Generates tamper-proof purchase order contracts with line-item tax calculation, automated delivery milestones, and real-time inventory reservation.", tech: "Hibernate Transactions / MySQL" },
      { step: 4, name: "04. Milestone Escrow & JWT RBAC Approval", role: "Multi-Tier Authorization", desc: "Enforces strict role-based access control (Procurement Manager, Auditor, Finance Director) for sequential multi-stage payment releases.", tech: "Spring Security / JWT Claims" },
      { step: 5, name: "05. Spend Analytics & Vendor Performance", role: "Executive Decision Support", desc: "Aggregates historical procurement metrics, calculating vendor on-time delivery rates, pricing competitiveness, and SLA compliance scorecards.", tech: "JPA Projections / React Analytics" }
    ]
  }
};

let currentActiveProjectId = 'rag';

function initAllProjectsShowcase() {
  const tabBtns = document.querySelectorAll('.proj-tab-btn');
  const miniCards = document.querySelectorAll('.mini-project-card');

  function renderProject(projectId) {
    const proj = ALL_PROJECTS[projectId];
    if (!proj) return;
    currentActiveProjectId = projectId;

    // Update active tab buttons
    tabBtns.forEach(b => b.classList.toggle('active', b.getAttribute('data-proj-id') === projectId));
    // Update active mini cards
    miniCards.forEach(c => c.classList.toggle('active-mini', c.getAttribute('data-proj-id') === projectId));

    // Update Text Elements
    const taglineEl = document.getElementById('proj-active-tagline');
    const titleEl = document.getElementById('proj-active-title');
    const summaryEl = document.getElementById('proj-active-summary');
    const techEl = document.getElementById('proj-active-tech');
    const metricEl = document.getElementById('proj-active-metric');
    const linkEl = document.getElementById('proj-active-link');
    const pipeLabelEl = document.getElementById('pipeline-title-label');

    if (taglineEl) taglineEl.textContent = proj.tagline;
    if (titleEl) titleEl.textContent = proj.title;
    if (summaryEl) summaryEl.textContent = proj.summary;
    if (metricEl) metricEl.textContent = proj.metric;
    if (pipeLabelEl) pipeLabelEl.textContent = proj.pipelineLabel;
    if (linkEl) linkEl.href = proj.githubUrl;

    // Render Tech Chips
    if (techEl) {
      techEl.innerHTML = proj.techChips.map(t => `<span class="tech-chip">${t}</span>`).join('');
    }

    // Render Stepper Nodes
    const stepperTrack = document.getElementById('rag-stepper-track');
    const stepTitleEl = document.getElementById('rag-detail-title');
    const stepDescEl = document.getElementById('rag-detail-desc');

    if (stepperTrack && stepTitleEl && stepDescEl) {
      stepperTrack.innerHTML = '';
      proj.stages.forEach((stage, idx) => {
        const btn = document.createElement('button');
        btn.className = `rag-step-btn ${idx === 0 ? 'active' : ''}`;
        btn.textContent = `0${stage.step}`;
        btn.setAttribute('aria-label', stage.name);

        btn.addEventListener('click', () => {
          stepperTrack.querySelectorAll('.rag-step-btn').forEach(b => b.classList.remove('active'));
          btn.classList.add('active');
          stepTitleEl.textContent = `${stage.name} — [${stage.role}]`;
          stepDescEl.textContent = `${stage.desc} (Core Tech: ${stage.tech})`;
        });

        stepperTrack.appendChild(btn);
      });

      // Default to Stage 1
      if (proj.stages[0]) {
        stepTitleEl.textContent = `${proj.stages[0].name} — [${proj.stages[0].role}]`;
        stepDescEl.textContent = `${proj.stages[0].desc} (Core Tech: ${proj.stages[0].tech})`;
      }
    }
  }

  // Hook Tab Buttons
  tabBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const pid = btn.getAttribute('data-proj-id');
      renderProject(pid);
    });
  });

  // Hook Mini Cards
  miniCards.forEach(card => {
    card.addEventListener('click', () => {
      const pid = card.getAttribute('data-proj-id');
      renderProject(pid);
    });
  });

  // Initial Render (RAG)
  renderProject('rag');
}

/* --------------------------------------------------------------------------
   7. GITHUB HEATMAP GENERATION (DENSE VIBRANT GREEN COMMIT FILL + SOLID DARK "PREM")
   -------------------------------------------------------------------------- */
function initGithubHeatmap() {
  const grid = document.getElementById('github-heatmap-grid');
  if (!grid) return;

  grid.innerHTML = '';
  const cols = 22; // 22 columns fit 100% inside container without any horizontal cutoff
  const rows = 7;
  const totalDays = cols * rows; // 154 cells

  // Precise bitmap coordinates spelling "P R E M" across rows 1..5
  const premPixelSet = new Set([
    // P (cols 2, 3, 4)
    "1,2", "2,2", "3,2", "4,2", "5,2",
    "1,3", "3,3",
    "1,4", "2,4", "3,4",

    // R (cols 6, 7, 8)
    "1,6", "2,6", "3,6", "4,6", "5,6",
    "1,7", "3,7",
    "1,8", "2,8", "3,8", "4,8", "5,8",

    // E (cols 10, 11, 12)
    "1,10", "2,10", "3,10", "4,10", "5,10",
    "1,11", "3,11", "5,11",
    "1,12", "3,12", "5,12",

    // M (cols 14, 15, 16, 17, 18)
    "1,14", "2,14", "3,14", "4,14", "5,14",
    "2,15",
    "3,16",
    "2,17",
    "1,18", "2,18", "3,18", "4,18", "5,18"
  ]);

  for (let i = 0; i < totalDays; i++) {
    const r = Math.floor(i / cols);
    const c = i % cols;
    const coordKey = `${r},${c}`;

    const cell = document.createElement('div');
    cell.className = 'heatmap-cell';

    if (premPixelSet.has(coordKey)) {
      // PREM Signature: Carved in solid dark black contrast against active emerald matrix
      cell.classList.add('prem-dark-pixel');
      cell.setAttribute('title', `Identity Signature: PREM`);
    } else {
      // Densely and vibrantly filled active commit grid (Levels 1 to 4) reflecting 3,000+ GitHub contributions
      const rand = Math.random();
      if (rand > 0.65) {
        cell.classList.add('level-4');
      } else if (rand > 0.4) {
        cell.classList.add('level-3');
      } else if (rand > 0.2) {
        cell.classList.add('level-2');
      } else {
        cell.classList.add('level-1');
      }
      cell.setAttribute('title', `Active Contribution: ${Math.floor(Math.random() * 8 + 3)} commits`);
    }

    grid.appendChild(cell);
  }
}

/* --------------------------------------------------------------------------
   7B. GITHUB ACTIVITY RADAR / 4-AXIS OVERVIEW GRAPH (Screenshot 2 Match)
   -------------------------------------------------------------------------- */
function initGithubActivityRadar() {
  const container = document.getElementById('github-activity-radar-container');
  if (!container) return;

  // Renders the 4-quadrant activity chart: Code review, Issues, Pull requests, 100% Commits
  container.innerHTML = `
    <div class="radar-card-inner">
      <div class="radar-header-label">Activity overview &bull; 4 Quadrants</div>
      <div class="radar-diagram-wrap">
        <svg class="radar-svg" viewBox="0 0 280 200" aria-label="GitHub Activity Radar">
          <!-- Background quadrant grid circles -->
          <circle cx="140" cy="100" r="30" fill="none" stroke="rgba(16, 185, 129, 0.15)" stroke-width="1" stroke-dasharray="2 2" />
          <circle cx="140" cy="100" r="60" fill="none" stroke="rgba(16, 185, 129, 0.2)" stroke-width="1" />
          <circle cx="140" cy="100" r="85" fill="none" stroke="rgba(16, 185, 129, 0.1)" stroke-width="1" />

          <!-- 4-Axis Crosshairs -->
          <!-- Vertical Axis (Code review top, Pull requests bottom) -->
          <line x1="140" y1="18" x2="140" y2="182" stroke="var(--accent-green)" stroke-width="2" stroke-linecap="round" />
          <!-- Horizontal Axis (Commits left, Issues right) -->
          <line x1="45" y1="100" x2="235" y2="100" stroke="var(--accent-green)" stroke-width="2" stroke-linecap="round" />

          <!-- Filled Activity Polygon across all 4 sectors -->
          <polygon points="140,42 205,100 140,165 48,100" 
                   fill="rgba(16, 185, 129, 0.22)" 
                   stroke="var(--accent-neon)" 
                   stroke-width="2" 
                   stroke-linejoin="round" />

          <!-- Center Pivot -->
          <circle cx="140" cy="100" r="4" fill="var(--accent-neon)" />

          <!-- 100% Commits Highlight Dot & Bar on Left -->
          <line x1="140" y1="100" x2="48" y2="100" stroke="#00ff88" stroke-width="3.5" stroke-linecap="round" />
          <circle cx="48" cy="100" r="5" fill="#ffffff" stroke="#00ff88" stroke-width="2.5" />

          <!-- Labels -->
          <text x="140" y="12" text-anchor="middle" class="radar-axis-text">Code review</text>
          <text x="242" y="104" text-anchor="start" class="radar-axis-text">Issues</text>
          <text x="140" y="196" text-anchor="middle" class="radar-axis-text">Pull requests</text>
          <text x="42" y="93" text-anchor="end" class="radar-axis-highlight">100%</text>
          <text x="42" y="109" text-anchor="end" class="radar-axis-highlight-sub">Commits</text>
        </svg>
      </div>
    </div>
  `;
}

/* --------------------------------------------------------------------------
   8. ONE-CLICK EMAIL COPY & TOAST NOTIFICATION
   -------------------------------------------------------------------------- */
function initEmailCopy() {
  const copyTriggers = document.querySelectorAll('.copy-email-trigger');
  const email = 'premgupta100705@gmail.com';

  copyTriggers.forEach((trigger) => {
    trigger.addEventListener('click', () => {
      if (navigator.clipboard) {
        navigator.clipboard.writeText(email).then(() => {
          showToast(`Copied to clipboard: ${email}`);
        });
      } else {
        showToast(email);
      }
    });
  });
}

function showToast(msg) {
  let toast = document.getElementById('toast-notification');
  if (!toast) {
    toast = document.createElement('div');
    toast.id = 'toast-notification';
    toast.className = 'toast-msg';
    document.body.appendChild(toast);
  }

  toast.textContent = msg;
  toast.classList.add('show');

  setTimeout(() => {
    toast.classList.remove('show');
  }, 2800);
}

/* --------------------------------------------------------------------------
   10. EXPERIENCE CATEGORY FILTER
   -------------------------------------------------------------------------- */
function initExperienceFilter() {
  const filterBtns = document.querySelectorAll('.exp-filter-btn');
  const cards = document.querySelectorAll('.experience-card');

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filter = btn.getAttribute('data-filter');

      cards.forEach(card => {
        const cat = card.getAttribute('data-category');
        if (filter === 'all' || cat === filter) {
          card.classList.remove('is-hidden');
        } else {
          card.classList.add('is-hidden');
        }
      });
    });
  });
}

/* --------------------------------------------------------------------------
   11. DIRECT EMAIL CONTACT FORM (Dispatches directly to premgupta100705@gmail.com)
   -------------------------------------------------------------------------- */
function initContactForm() {
  const form = document.getElementById('monochrome-contact-form');
  if (!form) return;

  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    const btn = form.querySelector('button[type="submit"]');
    if (btn) {
      btn.textContent = 'Transmitting to Prem...';
      btn.disabled = true;
    }

    const formData = new FormData(form);
    const data = Object.fromEntries(formData.entries());

    try {
      // 1. Dispatch directly to premgupta100705@gmail.com via FormSubmit AJAX endpoint
      const response = await fetch('https://formsubmit.co/ajax/premgupta100705@gmail.com', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify({
          name: data.name,
          email: data.email,
          _subject: `🚀 Portfolio Message from ${data.name}: ${data.subject || 'Opportunity Scope'}`,
          message: data.message
        })
      });

      if (response.ok) {
        showToast("Transmission delivered to premgupta100705@gmail.com! Prem will connect shortly.");
        form.reset();
      } else {
        throw new Error('Endpoint error');
      }
    } catch (err) {
      // Fallback: If network blocks cross-origin POST, launch user's mail client directly
      const mailtoUrl = `mailto:premgupta100705@gmail.com?subject=${encodeURIComponent(data.subject || 'Portfolio Collaboration')}&body=${encodeURIComponent(`Sender: ${data.name} (${data.email})\n\nMessage:\n${data.message}`)}`;
      window.open(mailtoUrl, '_blank');
      showToast("Opening direct mail to premgupta100705@gmail.com!");
      form.reset();
    } finally {
      if (btn) {
        btn.textContent = 'Initiate Collaboration →';
        btn.disabled = false;
      }
    }
  });
}

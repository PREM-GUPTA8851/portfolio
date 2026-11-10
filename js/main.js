/**
 * PREM KUMAR GUPTA — PORTFOLIO LOGIC
 * High-performance, Accessible, Zero-dependency JavaScript
 * Inspired by Agustin Burgos (agustinburgos.com)
 */

document.addEventListener('DOMContentLoaded', () => {
  initThemeToggle();
  initMobileNav();
  initRagInteractivePipeline();
  initCertificationsFilter();
  initEmailCopy();
  initContactForm();
  initScrollSpy();
  initBackToTop();
});

/* --------------------------------------------------------------------------
   1. THEME TOGGLE
   -------------------------------------------------------------------------- */
function initThemeToggle() {
  const themeToggleBtn = document.getElementById('theme-toggle');
  if (!themeToggleBtn) return;

  const currentTheme = localStorage.getItem('prem_portfolio_theme') || 'dark';
  document.documentElement.setAttribute('data-theme', currentTheme);
  updateThemeButtonAria(themeToggleBtn, currentTheme);

  themeToggleBtn.addEventListener('click', () => {
    const activeTheme = document.documentElement.getAttribute('data-theme') || 'dark';
    const nextTheme = activeTheme === 'dark' ? 'light' : 'dark';
    
    document.documentElement.setAttribute('data-theme', nextTheme);
    localStorage.setItem('prem_portfolio_theme', nextTheme);
    updateThemeButtonAria(themeToggleBtn, nextTheme);
    showToast(`Switched to ${nextTheme} mode`);
  });
}

function updateThemeButtonAria(btn, theme) {
  const isLight = theme === 'light';
  btn.setAttribute('aria-label', isLight ? 'Switch to dark theme' : 'Switch to light theme');
  btn.setAttribute('title', isLight ? 'Switch to dark theme' : 'Switch to light theme');
}

/* --------------------------------------------------------------------------
   2. MOBILE NAVIGATION DRAWER
   -------------------------------------------------------------------------- */
function initMobileNav() {
  const toggleBtn = document.getElementById('mobile-nav-toggle');
  const drawer = document.getElementById('mobile-drawer');
  const overlay = document.getElementById('mobile-drawer-overlay');
  const mobileLinks = document.querySelectorAll('.mobile-menu-link');

  if (!toggleBtn || !drawer || !overlay) return;

  const openDrawer = () => {
    drawer.classList.add('open');
    overlay.classList.add('open');
    toggleBtn.setAttribute('aria-expanded', 'true');
    document.body.style.overflow = 'hidden';
  };

  const closeDrawer = () => {
    drawer.classList.remove('open');
    overlay.classList.remove('open');
    toggleBtn.setAttribute('aria-expanded', 'false');
    document.body.style.overflow = '';
  };

  toggleBtn.addEventListener('click', () => {
    const isOpen = drawer.classList.contains('open');
    if (isOpen) closeDrawer();
    else openDrawer();
  });

  overlay.addEventListener('click', closeDrawer);

  mobileLinks.forEach(link => {
    link.addEventListener('click', closeDrawer);
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && drawer.classList.contains('open')) {
      closeDrawer();
      toggleBtn.focus();
    }
  });
}

/* --------------------------------------------------------------------------
   3. INTERACTIVE RAG ARCHITECTURE PIPELINE
   -------------------------------------------------------------------------- */
const RAG_STAGES = [
  {
    step: 1,
    name: "01. GitHub Repository Ingestion",
    role: "Source Code & Tree Processing",
    description: "Connects via GitHub API to extract directory hierarchy, commit history, and raw source files across polyglot repositories.",
    tech: "FastAPI / GitHub API",
    input: "Public / Private GitHub Repo URL",
    output: "Raw Document Stream & Code AST"
  },
  {
    step: 2,
    name: "02. Document Parser & Cleaning",
    role: "Language-Aware Code Sanitization",
    description: "Cleans out comments, strip binary files, removes unnecessary whitespace, and normalizes file headers for token efficiency.",
    tech: "Python AST / Regex Normalizer",
    input: "Raw Code Files (.py, .ts, .java, etc.)",
    output: "Sanitized Code Blocks & Metadata"
  },
  {
    step: 3,
    name: "03. Syntax-Aware Chunking",
    role: "Recursive Function & Class Chunking",
    description: "Breaks code into semantically intact chunks based on function boundaries and class structures rather than naive line splitting.",
    tech: "LangChain RecursiveCharacterSplitter",
    input: "Sanitized Code Streams",
    output: "Overlapping Semantic Code Chunks"
  },
  {
    step: 4,
    name: "04. Vector Embeddings Generation",
    role: "High-Dimensional Vector Encoding",
    description: "Transforms each code chunk into 768-dimensional dense mathematical vector embeddings capturing contextual code intent.",
    tech: "HuggingFace all-MiniLM-L6-v2",
    input: "Code Chunks + Filepaths",
    output: "768-Dim Floating Point Vectors"
  },
  {
    step: 5,
    name: "05. ChromaDB Vector Store",
    role: "Persistent ANN Vector Indexing",
    description: "Stores vector embeddings with metadata using HNSW indexing for approximate nearest neighbor retrieval in single-digit milliseconds.",
    tech: "ChromaDB / SQLite / HNSW",
    input: "Vector Embeddings & Doc IDs",
    output: "Persistent Index & Query Interface"
  },
  {
    step: 6,
    name: "06. Semantic Similarity Retrieval",
    role: "Cosine Similarity Query Matching",
    description: "Receives user natural language question, generates question vector, and retrieves Top-K most relevant code snippets.",
    tech: "Cosine Similarity Search (k=4)",
    input: "User Query (e.g. 'How is auth verified?')",
    output: "Top Relevant Code Snippets + Source Files"
  },
  {
    step: 7,
    name: "07. Prompt Augmentation & Groq LLM",
    role: "Ultra-Fast Inference & Synthesis",
    description: "Combines original user question with retrieved source code into a structured prompt, sent to Llama 3 on Groq LPUs.",
    tech: "Groq LPU / Llama 3 70B",
    input: "Augmented System Prompt + Context",
    output: "Streaming High-Fidelity Response"
  },
  {
    step: 8,
    name: "08. Context-Aware Developer Response",
    role: "Actionable Answer & Citation",
    description: "Presents exact line citations, code references, architectural explanations, and refactoring recommendations in a Next.js UI.",
    tech: "Next.js / Markdown / Prism.js",
    input: "Streamed LLM Tokens",
    output: "Interactive Answer with File Links"
  }
];

function initRagInteractivePipeline() {
  const stepper = document.getElementById('rag-stepper');
  const stageTitle = document.getElementById('rag-stage-title');
  const stageDesc = document.getElementById('rag-stage-desc');
  const stageMeta = document.getElementById('rag-stage-meta');

  if (!stepper || !stageTitle) return;

  function renderStage(stage) {
    stageTitle.textContent = stage.name;
    stageDesc.textContent = stage.description;
    if (stageMeta) {
      stageMeta.textContent = `${stage.tech} | In: ${stage.input} → Out: ${stage.output}`;
    }

    const nodes = stepper.querySelectorAll('.rag-step-btn');
    nodes.forEach((n, idx) => {
      n.classList.toggle('active', idx + 1 === stage.step);
    });
  }

  // Populate buttons if empty
  if (stepper.children.length === 0) {
    RAG_STAGES.forEach((stage) => {
      const btn = document.createElement('button');
      btn.className = `rag-step-btn ${stage.step === 1 ? 'active' : ''}`;
      btn.textContent = `Stage ${stage.step}`;
      btn.setAttribute('aria-label', stage.name);
      btn.addEventListener('click', () => renderStage(stage));
      stepper.appendChild(btn);
    });
  }

  renderStage(RAG_STAGES[0]);
}

/* --------------------------------------------------------------------------
   4. CERTIFICATIONS FILTER TABS
   -------------------------------------------------------------------------- */
function initCertificationsFilter() {
  const tabs = document.querySelectorAll('.cert-filter-btn');
  const cards = document.querySelectorAll('.cert-card');

  if (!tabs.length || !cards.length) return;

  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      tabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');

      const cat = tab.getAttribute('data-category');

      cards.forEach(card => {
        if (cat === 'all' || card.getAttribute('data-category') === cat) {
          card.style.display = 'flex';
        } else {
          card.style.display = 'none';
        }
      });
    });
  });
}

/* --------------------------------------------------------------------------
   5. EMAIL COPY TO CLIPBOARD
   -------------------------------------------------------------------------- */
function initEmailCopy() {
  const emailBtns = document.querySelectorAll('.copy-email-trigger');

  emailBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const email = 'premgupta100705@gmail.com';

      navigator.clipboard.writeText(email).then(() => {
        showToast('Email copied: premgupta100705@gmail.com');
      }).catch(() => {
        window.location.href = `mailto:${email}`;
      });
    });
  });
}

/* --------------------------------------------------------------------------
   6. CONTACT FORM HANDLING
   -------------------------------------------------------------------------- */
function initContactForm() {
  const form = document.getElementById('agustin-contact-form');
  if (!form) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const name = form.querySelector('[name="name"]')?.value || 'Friend';
    showToast(`Thank you ${name}! Your message has been received.`);
    form.reset();
  });
}

/* --------------------------------------------------------------------------
   7. SCROLL SPY FOR NAVIGATION
   -------------------------------------------------------------------------- */
function initScrollSpy() {
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.navlink');

  if (!sections.length || !navLinks.length) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const id = entry.target.getAttribute('id');
        navLinks.forEach(link => {
          link.classList.toggle('active', link.getAttribute('href') === `#${id}`);
        });
      }
    });
  }, {
    rootMargin: '-20% 0px -60% 0px'
  });

  sections.forEach(sec => observer.observe(sec));
}

/* --------------------------------------------------------------------------
   8. BACK TO TOP
   -------------------------------------------------------------------------- */
function initBackToTop() {
  const backToTopBtn = document.getElementById('back-to-top-btn');
  if (!backToTopBtn) return;

  backToTopBtn.addEventListener('click', () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });
}

/* --------------------------------------------------------------------------
   9. TOAST NOTIFICATION HELPER
   -------------------------------------------------------------------------- */
function showToast(message) {
  let toastContainer = document.getElementById('toast');
  if (!toastContainer) {
    toastContainer = document.createElement('div');
    toastContainer.id = 'toast';
    toastContainer.className = 'toast-container';
    document.body.appendChild(toastContainer);
  }

  const toast = document.createElement('div');
  toast.className = 'toast show';
  toast.innerHTML = `
    <span style="color: var(--text-emerald); font-weight: 700;">✓</span>
    <span>${message}</span>
  `;

  toastContainer.appendChild(toast);

  setTimeout(() => {
    toast.classList.remove('show');
    setTimeout(() => toast.remove(), 300);
  }, 3500);
}

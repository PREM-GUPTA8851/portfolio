/**
 * PREM KUMAR GUPTA - PORTFOLIO LOGIC
 * High-performance, Accessible, Zero-dependency JavaScript
 */

document.addEventListener('DOMContentLoaded', () => {
  initThemeToggle();
  initMobileNav();
  initRagInteractivePipeline();
  initSkillsFilter();
  initCertificationsFilter();
  initCopyButtons();
  initScrollSpy();
  initContactForm();
});

/* --------------------------------------------------------------------------
   1. THEME TOGGLE (Dark / Light)
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
  const mobileLinks = document.querySelectorAll('.mobile-nav-link');

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
    name: "GitHub Repository",
    role: "Source Code & Repository Ingestion",
    description: "Ingests raw source files, commit history, and directory trees from target GitHub repositories for indexing.",
    tech: "FastAPI / GitHub API",
    input: "Raw GitHub Repo / Files",
    output: "Clean Document Text Stream"
  },
  {
    step: 2,
    name: "Document Processing",
    role: "Parsing & File Normalization",
    description: "Normalizes language file extensions, strips unnecessary boilerplate, and parses syntax structures.",
    tech: "Python AST / Text Parsers",
    input: "Document Stream",
    output: "Normalized Code Blocks"
  },
  {
    step: 3,
    name: "Chunking",
    role: "Context-Preserving Code Chunking",
    description: "Breaks large source files into semantically coherent chunks with overlap to ensure function boundaries and context remain intact.",
    tech: "Document Chunking Pipeline",
    input: "Normalized Code Blocks",
    output: "Overlapping Context Chunks"
  },
  {
    step: 4,
    name: "Vector Embeddings",
    role: "Dense Vector Representation",
    description: "Transforms text and code chunks into multi-dimensional numerical embeddings capturing semantic meaning and syntax relationships.",
    tech: "Vector Embedding Models",
    input: "Text Chunks",
    output: "Dense Float Vectors"
  },
  {
    step: 5,
    name: "ChromaDB",
    role: "Vector Database Indexing & Storage",
    description: "Persists vector embeddings alongside chunk metadata in ChromaDB for high-throughput cosine similarity indexing.",
    tech: "ChromaDB Vector Store",
    input: "Embeddings + Chunk Metadata",
    output: "Indexed Vector Database"
  },
  {
    step: 6,
    name: "Semantic Retrieval",
    role: "Query Similarity Search",
    description: "Converts user natural-language queries into vectors and retrieves the top contextually relevant code snippets from ChromaDB.",
    tech: "Cosine Similarity / ChromaDB Query",
    input: "User Query Vector",
    output: "Top-k Relevant Code Snippets"
  },
  {
    step: 7,
    name: "Groq LLM",
    role: "Ultra-Fast Inference Engine",
    description: "Supplies the retrieved code snippets and user prompt to Groq's high-speed LLM API for context-grounded reasoning.",
    tech: "Groq LLM API",
    input: "Retrieved Snippets + Prompt",
    output: "Synthesized Reasoning"
  },
  {
    step: 8,
    name: "Context-Aware Response",
    role: "Full-Stack Client Delivery",
    description: "Streams context-rich, citation-aware code explanations and solutions back to the React frontend interface.",
    tech: "React.js + FastAPI Response",
    input: "LLM Output Stream",
    output: "Verified Code Answer & Snippets"
  }
];

function initRagInteractivePipeline() {
  const nodeButtons = document.querySelectorAll('.rag-node-btn');
  const inspectorTitle = document.getElementById('inspector-title');
  const inspectorDesc = document.getElementById('inspector-desc');
  const inspectorRole = document.getElementById('inspector-role');
  const inspectorTech = document.getElementById('inspector-tech');
  const inspectorInput = document.getElementById('inspector-input');
  const inspectorOutput = document.getElementById('inspector-output');

  if (!nodeButtons.length || !inspectorTitle) return;

  function updateInspector(stageIndex) {
    const stage = RAG_STAGES[stageIndex];
    if (!stage) return;

    nodeButtons.forEach((btn, idx) => {
      if (idx === stageIndex) {
        btn.classList.add('active');
        btn.setAttribute('aria-selected', 'true');
      } else {
        btn.classList.remove('active');
        btn.setAttribute('aria-selected', 'false');
      }
    });

    inspectorTitle.textContent = `${stage.step}. ${stage.name}`;
    inspectorDesc.textContent = stage.description;
    if (inspectorRole) inspectorRole.textContent = stage.role;
    if (inspectorTech) inspectorTech.textContent = stage.tech;
    if (inspectorInput) inspectorInput.textContent = `Input: ${stage.input}`;
    if (inspectorOutput) inspectorOutput.textContent = `Output: ${stage.output}`;
  }

  nodeButtons.forEach((btn, idx) => {
    btn.addEventListener('click', () => updateInspector(idx));
  });

  // Default to step 1
  updateInspector(0);
}

/* --------------------------------------------------------------------------
   4. SKILLS FILTER TABS
   -------------------------------------------------------------------------- */
function initSkillsFilter() {
  const filterBtns = document.querySelectorAll('.skill-tab-btn');
  const skillCards = document.querySelectorAll('.skill-category-card');

  if (!filterBtns.length || !skillCards.length) return;

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const category = btn.getAttribute('data-category');

      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      skillCards.forEach(card => {
        const cardCat = card.getAttribute('data-category');
        if (category === 'all' || cardCat === category) {
          card.style.display = 'flex';
        } else {
          card.style.display = 'none';
        }
      });
    });
  });
}

/* --------------------------------------------------------------------------
   5. COPY TO CLIPBOARD + TOAST
   -------------------------------------------------------------------------- */
function initCopyButtons() {
  const copyButtons = document.querySelectorAll('.copy-btn');
  const toast = document.getElementById('toast');
  let toastTimer = null;

  if (!copyButtons.length || !toast) return;

  function showToast(message) {
    toast.textContent = message;
    toast.classList.add('show');
    if (toastTimer) clearTimeout(toastTimer);
    toastTimer = setTimeout(() => {
      toast.classList.remove('show');
    }, 2800);
  }

  copyButtons.forEach(btn => {
    btn.addEventListener('click', async () => {
      const textToCopy = btn.getAttribute('data-copy');
      if (!textToCopy) return;

      try {
        if (navigator.clipboard && window.isSecureContext) {
          await navigator.clipboard.writeText(textToCopy);
        } else {
          // Fallback
          const textArea = document.createElement('textarea');
          textArea.value = textToCopy;
          textArea.style.position = 'fixed';
          textArea.style.left = '-999999px';
          textArea.style.top = '-999999px';
          document.body.appendChild(textArea);
          textArea.focus();
          textArea.select();
          document.execCommand('copy');
          textArea.remove();
        }
        showToast(`Copied "${textToCopy}" to clipboard!`);
      } catch (err) {
        showToast(`Selected: ${textToCopy}`);
      }
    });
  });
}

/* --------------------------------------------------------------------------
   6. SCROLL SPY FOR NAVBAR ACTIVE LINKS
   -------------------------------------------------------------------------- */
function initScrollSpy() {
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-link, .mobile-nav-link');

  if (!sections.length || !navLinks.length) return;

  const observerOptions = {
    root: null,
    rootMargin: '-20% 0px -70% 0px',
    threshold: 0
  };

  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const currentId = entry.target.getAttribute('id');
        navLinks.forEach(link => {
          const href = link.getAttribute('href');
          if (href === `#${currentId}`) {
            link.classList.add('active');
          } else {
            link.classList.remove('active');
          }
        });
      }
    });
  }, observerOptions);

  sections.forEach(sec => observer.observe(sec));
}

/* --------------------------------------------------------------------------
   7. CONTACT FORM (Interactive Client-Side Validation)
   -------------------------------------------------------------------------- */
function initContactForm() {
  const form = document.getElementById('contact-form');
  const feedback = document.getElementById('form-feedback');
  const submitBtn = document.getElementById('contact-submit-btn');
  const btnText = document.getElementById('contact-btn-text');

  if (!form || !feedback) return;

  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    const name = document.getElementById('form-name')?.value.trim();
    const email = document.getElementById('form-email')?.value.trim();
    const message = document.getElementById('form-message')?.value.trim();

    if (!name || !email || !message) {
      alert('Please fill out all fields.');
      return;
    }

    const actionUrl = form.getAttribute('action');
    const isFormspreeConfigured = actionUrl && !actionUrl.includes('YOUR_FORMSPREE_ID');

    if (isFormspreeConfigured) {
      try {
        if (btnText) btnText.textContent = 'Sending...';
        if (submitBtn) submitBtn.disabled = true;

        const formData = new FormData(form);
        const response = await fetch(actionUrl, {
          method: 'POST',
          body: formData,
          headers: {
            'Accept': 'application/json'
          }
        });

        if (response.ok) {
          feedback.className = 'form-feedback success';
          feedback.innerHTML = `<strong>Thank you, ${name}!</strong> Your message has been sent successfully. Prem Kumar Gupta will receive it directly at <strong>premgupta100705@gmail.com</strong> and reply soon.`;
          form.reset();
        } else {
          const data = await response.json().catch(() => ({}));
          feedback.className = 'form-feedback error';
          feedback.innerHTML = `Oops! ${data.errors ? data.errors.map(err => err.message).join(', ') : 'There was a problem sending your message.'} You can also email Prem directly at <a href="mailto:premgupta100705@gmail.com" style="text-decoration:underline; font-weight:600;">premgupta100705@gmail.com</a>.`;
        }
      } catch (err) {
        feedback.className = 'form-feedback error';
        feedback.innerHTML = `Network issue. You can email Prem directly at <a href="mailto:premgupta100705@gmail.com" style="text-decoration:underline; font-weight:600;">premgupta100705@gmail.com</a>.`;
      } finally {
        if (btnText) btnText.textContent = 'Send Message';
        if (submitBtn) submitBtn.disabled = false;
      }
    } else {
      feedback.className = 'form-feedback success';
      feedback.innerHTML = `<strong>Thank you, ${name}!</strong> Click below to dispatch your message directly to Prem Kumar Gupta's inbox:<br><a href="mailto:premgupta100705@gmail.com?subject=Opportunity%20from%20${encodeURIComponent(name)}&body=${encodeURIComponent(message)}" class="btn btn-primary btn-sm" style="display:inline-flex; margin-top:0.75rem; text-decoration:none;">Open in Mail App &rarr;</a>`;
    }
  });
}

/* --------------------------------------------------------------------------
   8. CERTIFICATIONS FILTER TABS
   -------------------------------------------------------------------------- */
function initCertificationsFilter() {
  const filterBtns = document.querySelectorAll('.cert-tab-btn');
  const certCards = document.querySelectorAll('.cert-card');

  if (!filterBtns.length || !certCards.length) return;

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const category = btn.getAttribute('data-category');

      filterBtns.forEach(b => {
        b.classList.remove('active');
        b.setAttribute('aria-selected', 'false');
      });
      btn.classList.add('active');
      btn.setAttribute('aria-selected', 'true');

      certCards.forEach(card => {
        const cardCat = card.getAttribute('data-category') || '';
        if (category === 'all' || cardCat.includes(category)) {
          card.style.display = 'flex';
        } else {
          card.style.display = 'none';
        }
      });
    });
  });
}

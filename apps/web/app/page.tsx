const REPO_URL = "https://github.com/Veri5ied/tinyedge";
const README_URL = `${REPO_URL}#readme`;
const SELF_HOST_URL = `${REPO_URL}/blob/main/apps/api/SELF_HOSTING.md`;
const INSTALL_URL = "https://github.com/apps/tinyedge-app/installations/new";

export default function Page() {
  return (
    <>
      <nav>
        <a href="#" className="nav-logo">
          <div className="logo-mark" aria-hidden="true">
            <svg viewBox="0 0 16 16" fill="none">
              <path
                d="M3 8h10M8 3l5 5-5 5"
                stroke="#000"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
          <span className="logo-text">tinyedge</span>
        </a>
        <ul className="nav-links">
          <li>
            <a href="#features">What it does</a>
          </li>
          <li>
            <a href="#scope">Scope</a>
          </li>
          <li>
            <a href="#setup">Quick start</a>
          </li>
          <li>
            <a href={README_URL} target="_blank" rel="noreferrer">
              Docs
            </a>
          </li>
        </ul>
        <div className="nav-cta">
          <a href={REPO_URL} className="btn btn-ghost" target="_blank" rel="noreferrer">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
              <path d="M12 0C5.37 0 0 5.37 0 12c0 5.3 3.44 9.8 8.21 11.39.6.11.82-.26.82-.58v-2.17c-3.34.73-4.04-1.61-4.04-1.61-.55-1.39-1.34-1.76-1.34-1.76-1.09-.74.08-.73.08-.73 1.21.09 1.85 1.24 1.85 1.24 1.07 1.84 2.81 1.31 3.5 1 .11-.78.42-1.31.76-1.61-2.67-.3-5.47-1.33-5.47-5.93 0-1.31.47-2.38 1.24-3.22-.13-.3-.54-1.52.12-3.18 0 0 1.01-.32 3.3 1.23a11.5 11.5 0 0 1 3-.4c1.02.005 2.04.14 3 .4 2.28-1.55 3.29-1.23 3.29-1.23.66 1.66.25 2.88.12 3.18.77.84 1.24 1.91 1.24 3.22 0 4.61-2.81 5.63-5.48 5.92.43.37.82 1.1.82 2.22v3.29c0 .32.21.7.83.58C20.57 21.8 24 17.3 24 12c0-6.63-5.37-12-12-12z" />
            </svg>
            GitHub
          </a>
          <a href={INSTALL_URL} className="btn btn-primary" target="_blank" rel="noreferrer">
            Install App
          </a>
        </div>
      </nav>

      <div className="hero">
        <div>
          <div className="fade-in">
            <div className="hero-eyebrow">Open Source - GitHub App</div>
          </div>
          <div className="fade-in">
            <h1>
              PR reviews that <em>stay in their lane</em>
            </h1>
          </div>
          <div className="fade-in">
            <p className="hero-desc">
              Tinyedge reviews your pull requests and surfaces what matters - suggested test scenarios
              and risky logic changes - then gets out of the way. No fluff, no style nits, no
              dashboards.
            </p>
          </div>
          <div className="fade-in">
            <div className="hero-actions">
              <a href={REPO_URL} className="btn btn-primary" target="_blank" rel="noreferrer">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                  <path d="M12 0C5.37 0 0 5.37 0 12c0 5.3 3.44 9.8 8.21 11.39.6.11.82-.26.82-.58v-2.17c-3.34.73-4.04-1.61-4.04-1.61-.55-1.39-1.34-1.76-1.34-1.76-1.09-.74.08-.73.08-.73 1.21.09 1.85 1.24 1.85 1.24 1.07 1.84 2.81 1.31 3.5 1 .11-.78.42-1.31.76-1.61-2.67-.3-5.47-1.33-5.47-5.93 0-1.31.47-2.38 1.24-3.22-.13-.3-.54-1.52.12-3.18 0 0 1.01-.32 3.3 1.23a11.5 11.5 0 0 1 3-.4c1.02.005 2.04.14 3 .4 2.28-1.55 3.29-1.23 3.29-1.23.66 1.66.25 2.88.12 3.18.77.84 1.24 1.91 1.24 3.22 0 4.61-2.81 5.63-5.48 5.92.43.37.82 1.1.82 2.22v3.29c0 .32.21.7.83.58C20.57 21.8 24 17.3 24 12c0-6.63-5.37-12-12-12z" />
                </svg>
                View on GitHub
              </a>
              <a href="#setup" className="btn btn-ghost">
                Quick start -&gt;
              </a>
            </div>
            <div className="badge-oss">
              <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 14H9V8h2v8zm4 0h-2V8h2v8z" />
              </svg>
              MIT License - Works with OpenAI, Gemini, or mock endpoint
            </div>
          </div>
        </div>

        <div className="hero-visual">
          <div className="pr-card">
            <div className="pr-card-header">
              <div className="pr-dot" style={{ background: "#ff5f57" }} />
              <div className="pr-dot" style={{ background: "#febc2e" }} />
              <div className="pr-dot" style={{ background: "#28c840" }} />
              <span className="pr-title">
                feat: <span>refactor payment retry logic</span> #247
              </span>
            </div>
            <div className="diff-block">
              <div className="diff-line ctx">
                <span className="diff-num">41</span>
                <span className="diff-sign"> </span>async function processPayment(ctx) {"{"}
              </div>
              <div className="diff-line remove">
                <span className="diff-num">42</span>
                <span className="diff-sign">-</span>
                &nbsp; if (ctx.retries &gt; 0) retry(ctx);
              </div>
              <div className="diff-line add">
                <span className="diff-num">42</span>
                <span className="diff-sign">+</span>
                &nbsp; if (ctx.retries &gt; 0 &amp;&amp; !ctx.settled) {"{"}
              </div>
              <div className="diff-line add">
                <span className="diff-num">43</span>
                <span className="diff-sign">+</span>
                &nbsp;&nbsp;&nbsp; await retry(ctx, {"{"} backoff: true {"}"});
              </div>
              <div className="diff-line add">
                <span className="diff-num">44</span>
                <span className="diff-sign">+</span>
                &nbsp; {"}"}
              </div>
              <div className="diff-line ctx">
                <span className="diff-num">45</span>
                <span className="diff-sign"> </span>
                {"}"}
              </div>
            </div>
            <div className="tinyedge-comment">
              <div className="comment-header">
                <div className="bot-avatar" aria-hidden="true">
                  <svg viewBox="0 0 16 16" fill="none">
                    <path
                      d="M3 8h10M8 3l5 5-5 5"
                      stroke="#000"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </div>
                <span className="comment-author">tinyedge[bot]</span>
                <span className="comment-time">just now</span>
              </div>
              <div className="comment-section">
                <div className="comment-label tests">
                  <svg width="11" height="11" viewBox="0 0 16 16" fill="currentColor" aria-hidden="true">
                    <path d="M8 1a7 7 0 1 0 0 14A7 7 0 0 0 8 1zm0 12a5 5 0 1 1 0-10A5 5 0 0 1 8 13zm1-6H7V5h2v2zm0 4H7V9h2v2z" />
                  </svg>
                  Suggested tests
                </div>
                <div className="comment-item">
                  Verify retry is skipped when <code>ctx.settled</code> is true
                </div>
                <div className="comment-item">Confirm backoff delay applies on repeated retries</div>
              </div>
              <div className="comment-section">
                <div className="comment-label risks">
                  <svg width="11" height="11" viewBox="0 0 16 16" fill="currentColor" aria-hidden="true">
                    <path d="M8 1L1 14h14L8 1zm0 2.5l5.5 10h-11L8 3.5zM7 7v3h2V7H7zm0 4v2h2v-2H7z" />
                  </svg>
                  Risk flag
                </div>
                <div className="comment-item risk">
                  <code>ctx.settled</code> is not guarded against undefined and may skip retry on first
                  call
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <hr className="divider" />

      <section id="features">
        <div className="section-label">What it does</div>
        <h2 className="section-title">Two things. Done well.</h2>
        <p className="section-sub">
          Tinyedge is narrow by design. It reads the diff, thinks about it, and leaves exactly two
          types of feedback.
        </p>

        <div className="features-grid">
          <div className="feature-card">
            <div className="feature-icon" style={{ background: "var(--green-dim)" }}>
              🧪
            </div>
            <div className="feature-title">Suggested test scenarios</div>
            <div className="feature-desc">
              Concrete cases worth testing based on the exact logic that changed. No generic advice,
              no boilerplate, just what the diff reveals.
            </div>
          </div>
          <div className="feature-card">
            <div className="feature-icon" style={{ background: "var(--amber-dim)" }}>
              ⚠️
            </div>
            <div className="feature-title">Risky logic flags</div>
            <div className="feature-desc">
              Non-obvious edge cases, implicit assumptions, and logic changes reviewers might miss at a
              glance.
            </div>
          </div>
          <div className="feature-card">
            <div className="feature-icon" style={{ background: "#0D1A2E" }}>
              🤫
            </div>
            <div className="feature-title">Silent when there is nothing to say</div>
            <div className="feature-desc">
              Tinyedge does not post comments just to post one. If the diff is low-risk, it stays
              quiet.
            </div>
          </div>
          <div className="feature-card">
            <div className="feature-icon" style={{ background: "#0D1A2E" }}>
              ⚡
            </div>
            <div className="feature-title">Diff-only context</div>
            <div className="feature-desc">
              Operates strictly on changed lines. No codebase crawl or repository indexing.
            </div>
          </div>
          <div className="feature-card">
            <div className="feature-icon" style={{ background: "#1A1A0D" }}>
              🔌
            </div>
            <div className="feature-title">Provider adapters</div>
            <div className="feature-desc">
              Supports OpenAI and Gemini plus a mock provider for local testing.
            </div>
          </div>
          <div className="feature-card">
            <div className="feature-icon" style={{ background: "#0D1A12" }}>
              🔧
            </div>
            <div className="feature-title">Self-hostable</div>
            <div className="feature-desc">
              Express webhook server. Bring your own GitHub App credentials. Runs anywhere Node.js
              runs.
            </div>
          </div>
        </div>
      </section>

      <hr className="divider" />

      <section id="scope">
        <div className="section-label">Design philosophy</div>
        <h2 className="section-title">Intentionally narrow.</h2>
        <p className="section-sub">
          Every feature Tinyedge does not have is a deliberate choice. Scope creep is where review bots
          go to die.
        </p>

        <div className="scope-grid">
          <div className="scope-block">
            <div className="scope-head">
              <div className="scope-dot" style={{ background: "var(--green)" }} />
              Goals - what it does
            </div>
            <div className="scope-item">
              <span className="scope-item-icon">+</span>
              Analyze only changed diffs, never the full codebase
            </div>
            <div className="scope-item">
              <span className="scope-item-icon">+</span>
              Suggest concrete, diff-grounded test scenarios
            </div>
            <div className="scope-item">
              <span className="scope-item-icon">+</span>
              Flag risky or non-obvious logic changes
            </div>
            <div className="scope-item">
              <span className="scope-item-icon">+</span>
              Stay silent when there is nothing meaningful to say
            </div>
          </div>
          <div className="scope-block">
            <div className="scope-head">
              <div className="scope-dot" style={{ background: "var(--red)" }} />
              Non-goals - what it will not do
            </div>
            <div className="scope-item" style={{ color: "var(--muted)" }}>
              <span className="scope-item-icon">x</span>
              Generate test code
            </div>
            <div className="scope-item" style={{ color: "var(--muted)" }}>
              <span className="scope-item-icon">x</span>
              Style or formatting comments
            </div>
            <div className="scope-item" style={{ color: "var(--muted)" }}>
              <span className="scope-item-icon">x</span>
              UI dashboards or analytics
            </div>
            <div className="scope-item" style={{ color: "var(--muted)" }}>
              <span className="scope-item-icon">x</span>
              Replace your CI pipeline
            </div>
          </div>
        </div>
      </section>

      <hr className="divider" />

      <section id="setup">
        <div className="section-label">Quick start</div>
        <h2 className="section-title">Up in three commands.</h2>
        <p className="section-sub">
          Clone, install, configure your GitHub App credentials, and point Tinyedge at your LLM
          provider.
        </p>

        <div className="setup-grid">
          <div>
            <div className="code-block">
              <div className="code-header">
                <div className="code-header-dots">
                  <div className="code-header-dot" style={{ background: "#ff5f57" }} />
                  <div className="code-header-dot" style={{ background: "#febc2e" }} />
                  <div className="code-header-dot" style={{ background: "#28c840" }} />
                </div>
                <span className="code-title">terminal</span>
              </div>
              <pre>
                <span className="cmt"># Install dependencies</span>
                {"\n"}
                <span className="cmd">pnpm install</span>
                {"\n\n"}
                <span className="cmt"># Build the API</span>
                {"\n"}
                <span className="cmd">pnpm -C apps/api run build</span>
                {"\n\n"}
                <span className="cmt"># Start in dev mode</span>
                {"\n"}
                <span className="cmd">pnpm -C apps/api run dev</span>
              </pre>
            </div>

            <div className="code-block" style={{ marginTop: "16px" }}>
              <div className="code-header">
                <div className="code-header-dots">
                  <div className="code-header-dot" style={{ background: "#ff5f57" }} />
                  <div className="code-header-dot" style={{ background: "#febc2e" }} />
                  <div className="code-header-dot" style={{ background: "#28c840" }} />
                </div>
                <span className="code-title">.env</span>
              </div>
              <pre>
                <span className="var">GITHUB_APP_ID</span>=<span className="val">123456</span>
                {"\n"}
                <span className="var">GITHUB_PRIVATE_KEY</span>=
                <span className="val">&quot;-----BEGIN RSA...&quot;</span>
                {"\n"}
                <span className="var">GITHUB_WEBHOOK_SECRET</span>=<span className="val">your-secret</span>
                {"\n"}
                <span className="var">TINYEDGE_LLM_PROVIDER</span>=<span className="kw">openai</span>
                <span className="cmt">  # openai | gemini | mock</span>
                {"\n"}
                <span className="var">TINYEDGE_LLM_API_KEY</span>=<span className="val">sk-...</span>
                {"\n"}
                <span className="var">TINYEDGE_LLM_MODEL</span>=<span className="val">gpt-4o-mini</span>
              </pre>
            </div>
          </div>

          <div>
            <div style={{ fontSize: "13px", fontWeight: 600, color: "var(--text)", marginBottom: "16px", letterSpacing: "0.01em" }}>
              Environment variables
            </div>
            <div className="env-list">
              <div className="env-item">
                <span className="env-key">GITHUB_APP_ID</span>
                <span className="env-desc">Your GitHub App numeric ID</span>
                <span className="env-badge required">required</span>
              </div>
              <div className="env-item">
                <span className="env-key">GITHUB_PRIVATE_KEY</span>
                <span className="env-desc">RSA private key from GitHub App settings</span>
                <span className="env-badge required">required</span>
              </div>
              <div className="env-item">
                <span className="env-key">GITHUB_WEBHOOK_SECRET</span>
                <span className="env-desc">Webhook secret set in GitHub App</span>
                <span className="env-badge required">required</span>
              </div>
              <div className="env-item">
                <span className="env-key">TINYEDGE_LLM_PROVIDER</span>
                <span className="env-desc">
                  One of: <code>openai</code>, <code>gemini</code>, <code>mock</code>
                </span>
                <span className="env-badge required">required</span>
              </div>
              <div className="env-item">
                <span className="env-key">TINYEDGE_LLM_API_KEY</span>
                <span className="env-desc">API key for your selected provider</span>
                <span className="env-badge optional">optional for mock</span>
              </div>
              <div className="env-item">
                <span className="env-key">TINYEDGE_LLM_MODEL</span>
                <span className="env-desc">Model name for OpenAI or Gemini</span>
                <span className="env-badge optional">optional for mock</span>
              </div>
              <div className="env-item">
                <span className="env-key">TINYEDGE_DRY_RUN</span>
                <span className="env-desc">Log comments without posting to GitHub</span>
                <span className="env-badge optional">optional</span>
              </div>
              <div className="env-item">
                <span className="env-key">TINYEDGE_MAX_DIFF_BYTES</span>
                <span className="env-desc">Cap diff size sent to the LLM</span>
                <span className="env-badge optional">optional</span>
              </div>
              <div className="env-item">
                <span className="env-key">PORT</span>
                <span className="env-desc">HTTP port for the webhook server</span>
                <span className="env-badge optional">optional</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <footer>
        <div className="footer-left">
          <a href="#" className="nav-logo" style={{ textDecoration: "none" }}>
            <div className="logo-mark" style={{ width: "24px", height: "24px", borderRadius: "5px" }}>
              <svg viewBox="0 0 16 16" fill="none" style={{ width: "12px", height: "12px" }}>
                <path
                  d="M3 8h10M8 3l5 5-5 5"
                  stroke="#000"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
            <span className="footer-copy">tinyedge - MIT License</span>
          </a>
        </div>
        <div className="footer-links">
          <a href={README_URL} target="_blank" rel="noreferrer">
            README
          </a>
          <a href={SELF_HOST_URL} target="_blank" rel="noreferrer">
            Self-hosting guide
          </a>
          <a href={REPO_URL} target="_blank" rel="noreferrer">
            GitHub
          </a>
        </div>
      </footer>
    </>
  );
}

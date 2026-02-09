'use client'

export default function Home() {
  return (
    <main className="container">
      <h1>Getting started with Vercel Web Analytics</h1>
      
      <p>
        This guide will help you get started with using Vercel Web Analytics on your project, 
        showing you how to enable it, add the package to your project, deploy your app to Vercel, 
        and view your data in the dashboard.
      </p>

      <p className="highlight">
        <strong>Select your framework to view instructions on using the Vercel Web Analytics in your project</strong>.
      </p>

      <section id="prerequisites">
        <h2>Prerequisites</h2>
        <ul>
          <li>
            A Vercel account. If you don&apos;t have one, you can{' '}
            <a href="https://vercel.com/signup" target="_blank" rel="noopener noreferrer">
              sign up for free
            </a>.
          </li>
          <li>
            A Vercel project. If you don&apos;t have one, you can{' '}
            <a href="https://vercel.com/new" target="_blank" rel="noopener noreferrer">
              create a new project
            </a>.
          </li>
          <li>
            The Vercel CLI installed. If you don&apos;t have it, you can install it using the following command:
            <div className="code-block-group">
              <div className="code-block">
                <div className="code-tab">pnpm</div>
                <pre><code>pnpm i vercel</code></pre>
              </div>
              <div className="code-block">
                <div className="code-tab">yarn</div>
                <pre><code>yarn i vercel</code></pre>
              </div>
              <div className="code-block">
                <div className="code-tab">npm</div>
                <pre><code>npm i vercel</code></pre>
              </div>
              <div className="code-block">
                <div className="code-tab">bun</div>
                <pre><code>bun i vercel</code></pre>
              </div>
            </div>
          </li>
        </ul>
      </section>

      <section id="enable-analytics">
        <h3>Enable Web Analytics in Vercel</h3>
        <p>
          On the <a href="/dashboard">Vercel dashboard</a>, select your Project and then click the{' '}
          <strong>Analytics</strong> tab and click <strong>Enable</strong> from the dialog.
        </p>
        <blockquote className="note">
          <strong>💡 Note:</strong> Enabling Web Analytics will add new routes (scoped at{' '}
          <code>/_vercel/insights/*</code>) after your next deployment.
        </blockquote>
      </section>

      <section id="add-package">
        <h3>Add @vercel/analytics to your project</h3>
        <p>Using the package manager of your choice, add the <code>@vercel/analytics</code> package to your project:</p>
        <div className="code-block-group">
          <div className="code-block">
            <div className="code-tab">pnpm</div>
            <pre><code>pnpm i @vercel/analytics</code></pre>
          </div>
          <div className="code-block">
            <div className="code-tab">yarn</div>
            <pre><code>yarn i @vercel/analytics</code></pre>
          </div>
          <div className="code-block">
            <div className="code-tab">npm</div>
            <pre><code>npm i @vercel/analytics</code></pre>
          </div>
          <div className="code-block">
            <div className="code-tab">bun</div>
            <pre><code>bun i @vercel/analytics</code></pre>
          </div>
        </div>
      </section>

      <section id="framework-guides">
        <h2>Framework-Specific Integration</h2>

        <article id="nextjs-pages">
          <h3>Next.js (Pages Directory)</h3>
          <p>
            The <code>Analytics</code> component is a wrapper around the tracking script, offering more 
            seamless integration with Next.js, including route support.
          </p>
          <p>If you are using the <code>pages</code> directory, add the following code to your main app file:</p>
          
          <h4>TypeScript (pages/_app.tsx)</h4>
          <pre><code>{`import type { AppProps } from "next/app";
import { Analytics } from "@vercel/analytics/next";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Component {...pageProps} />
      <Analytics />
    </>
  );
}

export default MyApp;`}</code></pre>

          <h4>JavaScript (pages/_app.js)</h4>
          <pre><code>{`import { Analytics } from "@vercel/analytics/next";

function MyApp({ Component, pageProps }) {
  return (
    <>
      <Component {...pageProps} />
      <Analytics />
    </>
  );
}

export default MyApp;`}</code></pre>
        </article>

        <article id="nextjs-app">
          <h3>Next.js (App Router)</h3>
          <p>
            The <code>Analytics</code> component is a wrapper around the tracking script, offering more 
            seamless integration with Next.js, including route support.
          </p>
          <p>Add the following code to the root layout:</p>

          <h4>TypeScript (app/layout.tsx)</h4>
          <pre><code>{`import { Analytics } from "@vercel/analytics/next";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <title>Next.js</title>
      </head>
      <body>
        {children}
        <Analytics />
      </body>
    </html>
  );
}`}</code></pre>

          <h4>JavaScript (app/layout.jsx)</h4>
          <pre><code>{`import { Analytics } from "@vercel/analytics/next";

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <title>Next.js</title>
      </head>
      <body>
        {children}
        <Analytics />
      </body>
    </html>
  );
}`}</code></pre>
        </article>

        <article id="remix">
          <h3>Remix</h3>
          <p>
            The <code>Analytics</code> component is a wrapper around the tracking script, offering a 
            seamless integration with Remix, including route detection.
          </p>
          <p>Add the following code to your root file:</p>

          <h4>TypeScript (app/root.tsx)</h4>
          <pre><code>{`import {
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
} from "@remix-run/react";
import { Analytics } from "@vercel/analytics/remix";

export default function App() {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <body>
        <Analytics />
        <Outlet />
        <ScrollRestoration />
        <Scripts />
        <LiveReload />
      </body>
    </html>
  );
}`}</code></pre>

          <h4>JavaScript (app/root.jsx)</h4>
          <pre><code>{`import {
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
} from "@remix-run/react";
import { Analytics } from "@vercel/analytics/remix";

export default function App() {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <body>
        <Analytics />
        <Outlet />
        <ScrollRestoration />
        <Scripts />
        <LiveReload />
      </body>
    </html>
  );
}`}</code></pre>
        </article>

        <article id="nuxt">
          <h3>Nuxt</h3>
          <p>
            The <code>Analytics</code> component is a wrapper around the tracking script, offering more 
            seamless integration with Nuxt, including route support.
          </p>
          <p>Add the following code to your main component:</p>

          <h4>TypeScript (app.vue)</h4>
          <pre><code>{`<script setup lang="ts">
import { Analytics } from '@vercel/analytics/nuxt';
</script>

<template>
  <Analytics />
  <NuxtPage />
</template>`}</code></pre>

          <h4>JavaScript (app.vue)</h4>
          <pre><code>{`<script setup>
import { Analytics } from '@vercel/analytics/nuxt';
</script>

<template>
  <Analytics />
  <NuxtPage />
</template>`}</code></pre>
        </article>

        <article id="sveltekit">
          <h3>SvelteKit</h3>
          <p>
            The <code>injectAnalytics</code> function is a wrapper around the tracking script, offering more 
            seamless integration with SvelteKit, including route support.
          </p>
          <p>Add the following code to the main layout:</p>

          <h4>TypeScript (src/routes/+layout.ts)</h4>
          <pre><code>{`import { dev } from "$app/environment";
import { injectAnalytics } from "@vercel/analytics/sveltekit";

injectAnalytics({ mode: dev ? "development" : "production" });`}</code></pre>

          <h4>JavaScript (src/routes/+layout.js)</h4>
          <pre><code>{`import { dev } from "$app/environment";
import { injectAnalytics } from "@vercel/analytics/sveltekit";

injectAnalytics({ mode: dev ? "development" : "production" });`}</code></pre>
        </article>

        <article id="astro">
          <h3>Astro</h3>
          <p>
            The <code>Analytics</code> component is a wrapper around the tracking script, offering more 
            seamless integration with Astro, including route support.
          </p>
          <p>Add the following code to your base layout:</p>

          <h4>src/layouts/Base.astro</h4>
          <pre><code>{`---
import Analytics from '@vercel/analytics/astro';
{/* ... */}
---

<html lang="en">
  <head>
    <meta charset="utf-8" />
    <!-- ... -->
    <Analytics />
  </head>
  <body>
    <slot />
  </body>
</html>`}</code></pre>

          <blockquote className="note">
            <p>
              <strong>💡 Note:</strong> The <code>Analytics</code> component is available in version{' '}
              <code>@vercel/analytics@1.4.0</code> and later.
            </p>
            <p>
              If you are using an earlier version, you must configure the <code>webAnalytics</code> property 
              of the Vercel adapter in your <code>astro.config.mjs</code> file as shown in the code below.
            </p>
            <p>
              For further information, see the{' '}
              <a 
                href="https://docs.astro.build/en/guides/integrations-guide/vercel/#webanalytics"
                target="_blank"
                rel="noopener noreferrer"
              >
                Astro adapter documentation
              </a>.
            </p>
          </blockquote>

          <h4>astro.config.mjs (for versions before 1.4.0)</h4>
          <pre><code>{`import { defineConfig } from "astro/config";
import vercel from "@astrojs/vercel/serverless";

export default defineConfig({
  output: "server",
  adapter: vercel({
    webAnalytics: {
      enabled: true, // set to false when using @vercel/analytics@1.4.0
    },
  }),
});`}</code></pre>
        </article>

        <article id="create-react-app">
          <h3>Create React App</h3>
          <p>
            The <code>Analytics</code> component is a wrapper around the tracking script, offering more 
            seamless integration with React.
          </p>
          <blockquote className="note">
            <strong>💡 Note:</strong> When using the plain React implementation, there is no route support.
          </blockquote>
          <p>Add the following code to the main app file:</p>

          <h4>TypeScript (App.tsx)</h4>
          <pre><code>{`import { Analytics } from "@vercel/analytics/react";

export default function App() {
  return (
    <div>
      {/* ... */}
      <Analytics />
    </div>
  );
}`}</code></pre>

          <h4>JavaScript (App.jsx)</h4>
          <pre><code>{`import { Analytics } from "@vercel/analytics/react";

export default function App() {
  return (
    <div>
      {/* ... */}
      <Analytics />
    </div>
  );
}`}</code></pre>
        </article>

        <article id="vue">
          <h3>Vue</h3>
          <p>
            The <code>Analytics</code> component is a wrapper around the tracking script, offering more 
            seamless integration with Vue.
          </p>
          <blockquote className="note">
            <strong>💡 Note:</strong> Route support is automatically enabled if you&apos;re using <code>vue-router</code>.
          </blockquote>
          <p>Add the following code to your main component:</p>

          <h4>TypeScript (src/App.vue)</h4>
          <pre><code>{`<script setup lang="ts">
import { Analytics } from '@vercel/analytics/vue';
</script>

<template>
  <Analytics />
  <!-- your content -->
</template>`}</code></pre>

          <h4>JavaScript (src/App.vue)</h4>
          <pre><code>{`<script setup>
import { Analytics } from '@vercel/analytics/vue';
</script>

<template>
  <Analytics />
  <!-- your content -->
</template>`}</code></pre>
        </article>

        <article id="html">
          <h3>Plain HTML</h3>
          <p>For plain HTML sites, you can add the following script to your <code>.html</code> files:</p>

          <h4>index.html</h4>
          <pre><code>{`<script>
  window.va = window.va || function () { (window.vaq = window.vaq || []).push(arguments); };
</script>
<script defer src="/_vercel/insights/script.js"></script>`}</code></pre>

          <blockquote className="note">
            <strong>💡 Note:</strong> When using the HTML implementation, there is no need to install the{' '}
            <code>@vercel/analytics</code> package. However, there is no route support.
          </blockquote>
        </article>

        <article id="other">
          <h3>Other Frameworks</h3>
          <p>
            Import the <code>inject</code> function from the package, which will add the tracking script to your app.{' '}
            <strong>This should only be called once in your app, and must run in the client</strong>.
          </p>
          <blockquote className="note">
            <strong>💡 Note:</strong> There is no route support with the <code>inject</code> function.
          </blockquote>
          <p>Add the following code to your main app file:</p>

          <h4>TypeScript (main.ts)</h4>
          <pre><code>{`import { inject } from "@vercel/analytics";

inject();`}</code></pre>

          <h4>JavaScript (main.js)</h4>
          <pre><code>{`import { inject } from "@vercel/analytics";

inject();`}</code></pre>
        </article>
      </section>

      <section id="deploy">
        <h3>Deploy your app to Vercel</h3>
        <p>Deploy your app using the following command:</p>
        <pre><code>vercel deploy</code></pre>
        <p>
          If you haven&apos;t already, we also recommend{' '}
          <a href="/docs/git#deploying-a-git-repository" target="_blank" rel="noopener noreferrer">
            connecting your project&apos;s Git repository
          </a>, which will enable Vercel to deploy your latest commits to main without terminal commands.
        </p>
        <p>Once your app is deployed, it will start tracking visitors and page views.</p>
        <blockquote className="note">
          <strong>💡 Note:</strong> If everything is set up properly, you should be able to see a Fetch/XHR 
          request in your browser&apos;s Network tab from <code>/_vercel/insights/view</code> when you visit any page.
        </blockquote>
      </section>

      <section id="view-data">
        <h3>View your data in the dashboard</h3>
        <p>Once your app is deployed, and users have visited your site, you can view your data in the dashboard.</p>
        <p>
          To do so, go to your <a href="/dashboard">dashboard</a>, select your project, and click the{' '}
          <strong>Analytics</strong> tab.
        </p>
        <p>
          After a few days of visitors, you&apos;ll be able to start exploring your data by viewing and{' '}
          <a href="/docs/analytics/filtering" target="_blank" rel="noopener noreferrer">
            filtering
          </a>{' '}
          the panels.
        </p>
        <p>
          Users on Pro and Enterprise plans can also add{' '}
          <a href="/docs/analytics/custom-events" target="_blank" rel="noopener noreferrer">
            custom events
          </a>{' '}
          to their data to track user interactions such as button clicks, form submissions, or purchases.
        </p>
      </section>

      <section id="privacy">
        <p>
          Learn more about how Vercel supports{' '}
          <a href="/docs/analytics/privacy-policy" target="_blank" rel="noopener noreferrer">
            privacy and data compliance standards
          </a>{' '}
          with Vercel Web Analytics.
        </p>
      </section>

      <section id="next-steps">
        <h2>Next steps</h2>
        <p>Now that you have Vercel Web Analytics set up, you can explore the following topics to learn more:</p>
        <ul>
          <li>
            <a href="/docs/analytics/package" target="_blank" rel="noopener noreferrer">
              Learn how to use the @vercel/analytics package
            </a>
          </li>
          <li>
            <a href="/docs/analytics/custom-events" target="_blank" rel="noopener noreferrer">
              Learn how to set update custom events
            </a>
          </li>
          <li>
            <a href="/docs/analytics/filtering" target="_blank" rel="noopener noreferrer">
              Learn about filtering data
            </a>
          </li>
          <li>
            <a href="/docs/analytics/privacy-policy" target="_blank" rel="noopener noreferrer">
              Read about privacy and compliance
            </a>
          </li>
          <li>
            <a href="/docs/analytics/limits-and-pricing" target="_blank" rel="noopener noreferrer">
              Explore pricing
            </a>
          </li>
          <li>
            <a href="/docs/analytics/troubleshooting" target="_blank" rel="noopener noreferrer">
              Troubleshooting
            </a>
          </li>
        </ul>
      </section>

      <style jsx>{`
        .container {
          max-width: 900px;
          margin: 0 auto;
          padding: 2rem;
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif;
          line-height: 1.6;
        }

        h1 {
          font-size: 2.5rem;
          margin-bottom: 1rem;
          color: #000;
        }

        h2 {
          font-size: 2rem;
          margin-top: 3rem;
          margin-bottom: 1rem;
          color: #000;
        }

        h3 {
          font-size: 1.5rem;
          margin-top: 2rem;
          margin-bottom: 1rem;
          color: #000;
        }

        h4 {
          font-size: 1.2rem;
          margin-top: 1.5rem;
          margin-bottom: 0.5rem;
          color: #333;
        }

        p {
          margin-bottom: 1rem;
          color: #333;
        }

        .highlight {
          font-size: 1.1rem;
          margin: 1.5rem 0;
        }

        section {
          margin-bottom: 2rem;
        }

        article {
          margin-top: 2rem;
          padding-top: 1rem;
          border-top: 1px solid #e5e5e5;
        }

        ul {
          margin-left: 1.5rem;
          margin-bottom: 1rem;
        }

        li {
          margin-bottom: 0.5rem;
        }

        a {
          color: #0070f3;
          text-decoration: none;
        }

        a:hover {
          text-decoration: underline;
        }

        code {
          background-color: #f5f5f5;
          padding: 0.2rem 0.4rem;
          border-radius: 3px;
          font-family: 'Monaco', 'Courier New', monospace;
          font-size: 0.9em;
        }

        pre {
          background-color: #f5f5f5;
          padding: 1rem;
          border-radius: 5px;
          overflow-x: auto;
          margin: 1rem 0;
        }

        pre code {
          background-color: transparent;
          padding: 0;
          font-size: 0.9rem;
          line-height: 1.5;
        }

        .code-block-group {
          margin: 1rem 0;
        }

        .code-block {
          margin-bottom: 1rem;
        }

        .code-tab {
          background-color: #e5e5e5;
          padding: 0.5rem 1rem;
          border-radius: 5px 5px 0 0;
          font-weight: bold;
          font-size: 0.9rem;
        }

        blockquote {
          background-color: #f0f9ff;
          border-left: 4px solid #0070f3;
          padding: 1rem;
          margin: 1rem 0;
          border-radius: 3px;
        }

        blockquote.note {
          background-color: #fffbea;
          border-left-color: #f59e0b;
        }

        blockquote p {
          margin-bottom: 0.5rem;
        }

        blockquote p:last-child {
          margin-bottom: 0;
        }
      `}</style>
    </main>
  )
}

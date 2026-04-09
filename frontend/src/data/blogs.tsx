import React from "react";

export interface BlogPost {
  slug: string;
  title: string;
  description: string;
  date: string;
  content: React.ReactNode;
}

export const blogs: BlogPost[] = [
  {
    slug: "building-performant-react",
    title: "Building Performant React Applications",
    description: "Tips and patterns for keeping your React apps fast and responsive at scale.",
    date: "March 15, 2026",
    content: (
      <div className="space-y-6 text-muted-foreground leading-relaxed">
        <p>
          React is fast by default, but as applications scale, performance bottlenecks can slip in. Here are a few straightforward strategies to keep your app snappy.
        </p>
        
        <h3 className="text-xl font-semibold text-foreground mt-8 mb-4">1. Memoization with useMemo and useCallback</h3>
        <p>
          When you have expensive calculations or pass callbacks to optimized child components, wrapping them in <code>useMemo</code> or <code>useCallback</code> ensures they aren't recreated on every render. Use this sparingly, as memoization itself has a cost, but it's invaluable for large data sets or complex components.
        </p>

        <h3 className="text-xl font-semibold text-foreground mt-8 mb-4">2. Code Splitting</h3>
        <p>
          Don't send all your JavaScript to the user at once. Utilize <code>React.lazy</code> and Suspense to lazy-load routes and heavy components. This reduces the initial payload and speeds up the time-to-interactive.
        </p>

        <h3 className="text-xl font-semibold text-foreground mt-8 mb-4">3. Efficient State Management</h3>
        <p>
          Avoid keeping everything in a global store. Localize state as much as possible. When global state is necessary, use atomic state libraries like Jotai or Zustand, or properly structure your context providers to avoid unnecessary re-renders of deeply nested components.
        </p>
      </div>
    ),
  },
  {
    slug: "clean-code-architecture",
    title: "The Art of Clean Code Architecture",
    description: "How to structure your codebase for maintainability and developer happiness.",
    date: "February 8, 2026",
    content: (
      <div className="space-y-4 text-muted-foreground leading-relaxed">
        <p>
          Writing clean code is less about rigid rules and more about communication and clarity. When another developer (or future you) opens a file, the purpose and flow should be immediately obvious.
        </p>
        <p>
          A good architecture separates concerns: UI components should only handle presentation, while business logic lives in hooks or services. This modularity not only makes testing easier but also makes replacing or upgrading libraries down the line a breeze.
        </p>
      </div>
    ),
  },
  {
    slug: "modern-css-techniques",
    title: "Modern CSS Techniques You Should Know",
    description: "From container queries to cascade layers — the future of CSS is here.",
    date: "January 20, 2026",
    content: (
      <div className="space-y-4 text-muted-foreground leading-relaxed">
        <p>
          CSS has evolved drastically over the last few years. If you're still relying entirely on structural classes or complex preprocessors for everything, you might be missing out on native browser features.
        </p>
        <p>
          Container queries (<code>@container</code>) allow components to adapt based on their parent's width, rather than the viewport, unlocking true modular components. Cascade layers (<code>@layer</code>) finally give us explicit control over CSS specificity, ending the reign of <code>!important</code>.
        </p>
      </div>
    ),
  }
];

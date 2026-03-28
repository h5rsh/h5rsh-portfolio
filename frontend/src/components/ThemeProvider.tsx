import { createContext, useContext, useEffect, useState, useCallback } from "react";

type Theme = "dark" | "light";

interface ThemeContextType {
  theme: Theme;
  toggleTheme: (e: React.MouseEvent) => void;
}

const ThemeContext = createContext<ThemeContextType>({
  theme: "dark",
  toggleTheme: () => {},
});

export const useTheme = () => useContext(ThemeContext);

export const ThemeProvider = ({ children }: { children: React.ReactNode }) => {
  const [theme, setTheme] = useState<Theme>(() => {
    if (typeof window !== "undefined") {
      return (localStorage.getItem("theme") as Theme) || "dark";
    }
    return "dark";
  });

  useEffect(() => {
    const root = document.documentElement;
    root.classList.remove("light", "dark");
    root.classList.add(theme);
    localStorage.setItem("theme", theme);
  }, [theme]);

  const toggleTheme = useCallback((e: React.MouseEvent) => {
    const x = e.clientX;
    const y = e.clientY;
    const newTheme = theme === "dark" ? "light" : "dark";

    // Check for View Transition API support for the best experience
    if (document.startViewTransition) {
      const transition = document.startViewTransition(() => {
        setTheme(newTheme);
      });

      transition.ready.then(() => {
        const maxDim = Math.max(window.innerWidth, window.innerHeight);
        const radius = Math.sqrt(maxDim * maxDim + maxDim * maxDim);

        document.documentElement.animate(
          {
            clipPath: [
              `circle(0px at ${x}px ${y}px)`,
              `circle(${radius}px at ${x}px ${y}px)`,
            ],
          },
          {
            duration: 1200,
            easing: "cubic-bezier(0.25, 0.1, 0.25, 1)",
            pseudoElement: "::view-transition-new(root)",
          }
        );
      });
    } else {
      // Fallback: DOM overlay approach
      const overlay = document.createElement("div");
      overlay.className = "theme-transition-overlay";
      overlay.style.backgroundColor =
        newTheme === "dark" ? "hsl(240, 6%, 6%)" : "hsl(0, 0%, 98%)";
      overlay.style.clipPath = `circle(0px at ${x}px ${y}px)`;
      document.body.appendChild(overlay);

      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          const maxDim = Math.max(window.innerWidth, window.innerHeight);
          const radius = Math.sqrt(maxDim * maxDim + maxDim * maxDim);
          overlay.style.transition =
            "clip-path 1.2s cubic-bezier(0.25, 0.1, 0.25, 1)";
          overlay.style.clipPath = `circle(${radius}px at ${x}px ${y}px)`;
        });
      });

      setTimeout(() => {
        setTheme(newTheme);
        setTimeout(() => {
          overlay.remove();
        }, 50);
      }, 1200);
    }
  }, [theme]);

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

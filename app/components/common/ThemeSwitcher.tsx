import { HugeiconsIcon } from "@hugeicons/react";
import { Sun01Icon, Moon02Icon, ComputerIcon } from "@hugeicons/core-free-icons";
import { useState, useEffect } from "react";

type Theme = "light" | "dark" | undefined;

// Anything other than "light"/"dark" (e.g. a stale value from an older version
// of the site) is treated as "system" so the toggle can never get stuck.
const readStoredTheme = (): Theme => {
  const value = localStorage.getItem("theme");
  return value === "light" || value === "dark" ? value : undefined;
};

export const ThemeSwitcher = ({ className }: { className: string | undefined }) => {
  const [theme, setTheme] = useState<Theme>(undefined);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    setTheme(readStoredTheme());
    setLoaded(true);
  }, []);

  const handleClick = () => {
    if (theme === undefined) {
      setTheme("light");
    } else if (theme === "light") {
      setTheme("dark");
    } else if (theme === "dark") {
      setTheme(undefined);
    }
  };

  useEffect(() => {
    if (!loaded) return;
    if (theme) localStorage.setItem("theme", theme);
    else localStorage.removeItem("theme");
    window.dispatchEvent(new Event("theme-change"));
  }, [theme, loaded]);

  const icon = () => {
    if (!theme) return ComputerIcon;
    else if (theme === "light") return Sun01Icon;
    else return Moon02Icon;
  };

  return (
    <>
      <button
        aria-label="Switch theme"
        onClick={handleClick}
        className={`size-9 rounded-full border border-border hover:border-primary flex items-center justify-center group ${className}`}
      >
        <HugeiconsIcon
          icon={icon()}
          size={17}
          className="text-muted-foreground group-hover:text-primary"
        />
      </button>
    </>
  );
};

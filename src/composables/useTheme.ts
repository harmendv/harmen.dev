import { computed, ref } from "vue";

export type ThemePreference = "light" | "dark" | "system";
export type ResolvedTheme = "light" | "dark";

const STORAGE_KEY = "harmen-dev-theme";

const THEME_COLOR: Record<ResolvedTheme, string> = {
    light: "#ffffff",
    dark: "#0e0f13",
};

function readStoredPreference(): ThemePreference {
    try {
        const stored = localStorage.getItem(STORAGE_KEY);

        if (stored === "light" || stored === "dark") {
            return stored;
        }
    } catch {
        // Storage can be unavailable (private mode, blocked cookies).
    }

    return "system";
}

function systemTheme(): ResolvedTheme {
    return window.matchMedia("(prefers-color-scheme: dark)").matches
        ? "dark"
        : "light";
}

const preference = ref<ThemePreference>("system");
const systemPreference = ref<ResolvedTheme>("light");

const resolvedTheme = computed<ResolvedTheme>(() =>
    preference.value === "system" ? systemPreference.value : preference.value
);

function applyTheme(theme: ResolvedTheme): void {
    const root = document.documentElement;

    root.classList.toggle("dark", theme === "dark");
    root.classList.toggle("light", theme === "light");
    root.style.colorScheme = theme;

    for (const meta of document.querySelectorAll('meta[name="theme-color"]')) {
        meta.setAttribute("content", THEME_COLOR[theme]);
    }
}

/**
 * Resolves the stored (or system) theme and applies it to the document.
 * Call this before mounting so the first paint uses the right palette.
 */
export function initTheme(): void {
    preference.value = readStoredPreference();
    systemPreference.value = systemTheme();

    applyTheme(resolvedTheme.value);

    window
        .matchMedia("(prefers-color-scheme: dark)")
        .addEventListener("change", (event) => {
            systemPreference.value = event.matches ? "dark" : "light";

            if (preference.value === "system") {
                applyTheme(systemPreference.value);
            }
        });
}

export function useTheme() {
    function setPreference(next: ThemePreference): void {
        preference.value = next;

        try {
            if (next === "system") {
                localStorage.removeItem(STORAGE_KEY);
            } else {
                localStorage.setItem(STORAGE_KEY, next);
            }
        } catch {
            // Ignore storage failures; the theme still applies for this visit.
        }

        applyTheme(resolvedTheme.value);
    }

    function toggleTheme(): void {
        setPreference(resolvedTheme.value === "dark" ? "light" : "dark");
    }

    return {
        preference,
        resolvedTheme,
        setPreference,
        toggleTheme,
    };
}

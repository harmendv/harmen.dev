import {
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
} from "react-router";
import stylesheet from "./styles/global.css?url";
import { useEffect } from "react";

export const links = () => [
  { rel: "stylesheet", href: stylesheet },
  { rel: "icon", type: "image/svg+xml", href: "/favicon.svg" },
  { rel: "shortcut icon", href: "/favicon.ico" },
  { rel: "apple-touch-icon", href: "/apple-touch-icon.png" },
  { rel: "canonical", href: "https://harmen.dev"}
];

export const meta = () => [
  { charset: "UTF-8" },
  { title: "Harmen de Vries | Frontend Developer" },
  { name: "author", content: "Harmen de Vries" },
  { name: "description", content: "Portfolio of Harmen, focused on clean web interfaces, design systems, and developer tooling." },
  { name: "viewport", content: "width=device-width, initial-scale=1.0" },
  { property: "og:title", content: "Harmen de Vries | Frontend Developer"},
  { property: "og:description", content: "Portfolio of Harmen, focused on clean web interfaces, design systems, and developer tooling."},
  { property: "og:type", content: "website"},
  { property: "og:url", content: "https://harmen.dev/"},
  { property: "og:site_name", content: "harmen.dev"},
  { property: "og:image", content: "https://harmen.dev/og_image.jpg"},
  { property: "og:image:type", content: "image/jpeg"},
  { property: "og:image:width", content: "1200"},
  { property: "og:image:height", content: "630"},
  { property: "og:image:alt", content: "harmen.dev — portfolio of Harmen de Vries, frontend developer"},

]

export default function App() {

  const setThemeClass = (theme: 'light' | 'dark') => {
    if(theme === 'light') {
      document.body.classList.add('light')
      document.body.classList.remove('dark')
    } else {
      document.body.classList.add('dark')
      document.body.classList.remove('light')
    }
  };
  const removeThemeClass = () => {
    document.body.classList.remove('light', 'dark')
  };

  useEffect(() => {
    function checkModeChange() {
      const item = localStorage.getItem('theme');

      if (item) {
        setThemeClass(item as 'light' | 'dark');
      } else {
        removeThemeClass()
      }
    }
    // Check on load
    checkModeChange();

    // Check for changes
    window.addEventListener('theme-change', checkModeChange);

    return () => {
      window.removeEventListener('theme-change', checkModeChange);
    };
  }, [])

  return (
    <html lang="en">
    <head>
      <Meta />
      <Links />
    </head>

    <body className="bg-background">
    <Outlet />
    <ScrollRestoration />
    <Scripts />
    </body>
    </html>
  );
}

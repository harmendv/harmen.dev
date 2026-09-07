import { NavLink } from 'react-router';

export function Footer() {
  return (
    <footer className="bg-muted mt-auto">
      <div className="container mx-auto max-w-5xl px-6 pb-8 pt-10 sm:px-9 sm:pt-12 flex w-full flex flex-col">
        <div className="flex flex-col sm:flex-row mb-12">
          <h3 id="contact" className="mb-5 sm:mb-0 text-5xl font-display font-bold">
            Let's talk<span className="text-primary">.</span>
          </h3>
          <div className="sm:ml-auto sm:text-right grid grid-cols-1 gap-4">
            <div className="grid grid-cols-2 gap-6">
              <div className="text-md text-muted-foreground">GitHub</div>
              <a href="https://github.com/harmendv" target="_blank" rel="noopener" className="text-md text-foreground transition-opacity hover:text-primary underline">github.com/harmendv</a>
            </div>
            <div className="grid grid-cols-2 gap-6">
              <div className="text-md text-muted-foreground">LinkedIn</div>
              <a href="https://www.linkedin.com/in/harmendv" target="_blank" rel="noopener" className="text-md text-foreground transition-opacity hover:text-primary underline">linkedin.com/in/harmendv</a>
            </div>
          </div>
        </div>
        <div className="w-full flex flex-col sm:flex-row pb-2 sm:pb-6">
          <div className="text-muted-foreground">&copy; 2026 harmen.dev</div>
          <nav className="sm:ml-auto flex gap-4 text-muted-foreground" aria-label="Legal Links">
            <NavLink className="hover:text-primary underline" to="/privacy">Privacy</NavLink>
            <NavLink className="hover:text-primary underline" to="/terms">Terms of use</NavLink>
          </nav>
        </div>
      </div>
    </footer>
  );
}

import { NavLink } from "react-router";

export default function Privacy() {
  return (
    <>
      <div className="mb-8">
        <NavLink
          to="/"
          className="inline-flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-primary"
          title="Go to home page"
        >
          ← Back to harmen.dev
        </NavLink>
      </div>

      <div className="max-w-4xl">
        <h1 className="text-2xl font-semibold tracking-tight text-balance sm:text-3xl">
          Privacy Policy
        </h1>
        <p className="mt-5 text-sm leading-8 text-muted-foreground sm:text-md">
          Last updated: June 12, 2026
        </p>
      </div>

      <div className="prose max-w-none">
        <section>
          <h2>Overview</h2>
          <p className="mt-3">
            This Privacy Policy explains how harmen.dev and related subdomains, including
            guitarscales.harmen.dev, collect, use, and protect information when you use this
            website.
          </p>
        </section>
        <section>
          <h2>Who operates this website</h2>
          <p className="mt-3">This website is operated by:</p>
          <p className="mt-3">
            Harmen de Vries <br /> Website: harmen.dev
          </p>
        </section>
        <section>
          <h2>Contact</h2>
          <p className="mt-3">
            For questions about this Privacy Policy or data processing on this website, please use
            the contact option provided on harmen.dev.
          </p>
        </section>
        <section>
          <h2>What information is collected</h2>
          <p className="mt-3">
            This website does not require users to create an account and does not directly collect
            personal information such as your name, address, or phone number.
          </p>
          <p className="mt-3">
            However, this website may collect limited technical and usage information, such as:
          </p>
          <ul className="mt-3 list-disc space-y-2 pl-6">
            <li>Pages you visit</li>
            <li>Browser and device information</li>
            <li>Referring pages</li>
            <li>Approximate location, such as country or region</li>
            <li>IP address</li>
            <li>Cookie identifiers or similar technologies</li>
          </ul>
          <p className="mt-3">
            This information may be collected through analytics and advertising services.
          </p>
        </section>
        <section>
          <h2>Analytics</h2>
          <p className="mt-3">
            This website may use Google Analytics to understand how visitors use the website and to
            improve the content and functionality.
          </p>
          <p className="mt-3">
            Google Analytics may collect information about your device, browser, visited pages,
            interactions with the website, and approximate location. This information is processed
            by Google according to Google's own privacy policies.
          </p>
          <p className="mt-3">
            You can learn more about how Google uses information from sites and apps that use its
            services here:
          </p>
          <p className="mt-3">
            <a
              href="https://policies.google.com/technologies/partner-sites"
              className="underline decoration-border underline-offset-4 transition-colors hover:text-foreground"
              target="_blank"
              rel="noreferrer"
            >
              https://policies.google.com/technologies/partner-sites
            </a>
          </p>
        </section>
        <section>
          <h2>Advertising</h2>
          <p className="mt-3"> This website may use Google AdSense to display advertisements. </p>
          <p className="mt-3">
            Third-party vendors, including Google, use cookies to serve ads based on a user's prior
            visits to this website or other websites. Google's use of advertising cookies enables
            Google and its partners to serve ads based on visits to this website and/or other sites
            on the internet.
          </p>
          <p className="mt-3">
            Users may opt out of personalized advertising by visiting Google's Ads Settings:
          </p>
          <p className="mt-3">
            <a
              href="https://www.google.com/settings/ads"
              className="underline decoration-border underline-offset-4 transition-colors hover:text-foreground"
              target="_blank"
              rel="noreferrer"
            >
              https://www.google.com/settings/ads
            </a>
          </p>
          <p className="mt-3"> You can also learn more about how Google uses cookies here: </p>
          <p className="mt-3">
            <a
              href="https://policies.google.com/technologies/cookies"
              className="underline decoration-border underline-offset-4 transition-colors hover:text-foreground"
              target="_blank"
              rel="noreferrer"
            >
              https://policies.google.com/technologies/cookies
            </a>
          </p>
        </section>
        <section>
          <h2>Cookies</h2>
          <p className="mt-3"> This website may use cookies and similar technologies for: </p>
          <ul className="mt-3 list-disc space-y-2 pl-6">
            <li>Website analytics</li>
            <li>Advertisement delivery</li>
            <li>Measuring ad performance</li>
            <li>Preventing fraud and abuse</li>
            <li>Remembering user preferences, where applicable</li>
          </ul>
          <p className="mt-3">
            Cookies are small text files stored on your device by your browser.
          </p>
          <p className="mt-3">
            For visitors from the European Economic Area, the United Kingdom, or other regions where
            consent is required, cookies for analytics and advertising may only be used after
            consent has been given.
          </p>
          <p className="mt-3"> You can control or delete cookies through your browser settings. </p>
        </section>
        <section>
          <h2>Third-party services</h2>
          <p className="mt-3">
            This website may use services provided by third parties, including:
          </p>
          <ul className="mt-3 list-disc space-y-2 pl-6">
            <li>Google Analytics</li>
            <li>Google AdSense</li>
            <li>Google Tag Manager</li>
          </ul>
          <p className="mt-3">
            These services may collect and process information according to their own privacy
            policies.
          </p>
        </section>
        <section>
          <h2>External links</h2>
          <p className="mt-3">
            This website may contain links to external websites. I am not responsible for the
            content, privacy policies, or practices of third-party websites.
          </p>
        </section>
        <section>
          <h2>Data retention</h2>
          <p className="mt-3">
            This website does not directly store personal user accounts or profiles.
          </p>
          <p className="mt-3">
            Data collected by third-party services, such as Google Analytics or Google AdSense, is
            retained according to the retention settings and policies of those services.
          </p>
        </section>
        <section>
          <h2>Your rights</h2>
          <p className="mt-3">
            Depending on your location, you may have rights regarding your personal data, such as
            the right to access, correct, delete, or restrict the processing of your data.
          </p>
          <p className="mt-3">
            For questions about this Privacy Policy or data processing on this website, please use
            the contact option provided on harmen.dev.
          </p>
        </section>
        <section>
          <h2>Changes to this Privacy Policy</h2>
          <p className="mt-3">
            This Privacy Policy may be updated from time to time. The latest version will always be
            available on this page.
          </p>
        </section>
      </div>
    </>
  );
}

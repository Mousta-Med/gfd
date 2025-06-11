import { useEffect } from "react";

export default function PrivacyPolicy() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const sections = [
    {
      title: "Information We Collect",
      content: [
        {
          subtitle: "GitHub Account Information",
          text: "When you authenticate with GitHub OAuth, we access your public GitHub profile information including your username, avatar, and public follower/following lists. We do not store this information on our servers.",
        },
        {
          subtitle: "Usage Data",
          text: "We may collect anonymous usage statistics to improve our service, such as the number of users and general usage patterns. This data cannot be used to identify individual users.",
        },
        {
          subtitle: "Technical Information",
          text: "We collect standard web server logs including IP addresses, browser types, and access times for security and performance monitoring purposes.",
        },
      ],
    },
    {
      title: "How We Use Your Information",
      content: [
        {
          subtitle: "Service Provision",
          text: "Your GitHub data is used solely to provide the follower analysis service. We analyze your follower relationships in real-time and present the results to you through our interface.",
        },
        {
          subtitle: "Authentication",
          text: "We use GitHub OAuth to verify your identity and ensure secure access to your account data. We never store your GitHub credentials.",
        },
        {
          subtitle: "Service Improvement",
          text: "Anonymous usage data helps us understand how users interact with our service and identify areas for improvement.",
        },
      ],
    },
    {
      title: "Data Storage and Security",
      content: [
        {
          subtitle: "No Persistent Storage",
          text: "We do not store your GitHub data on our servers. All analysis is performed in real-time using GitHub's API, and results are displayed directly to you without being saved.",
        },
        {
          subtitle: "Secure Transmission",
          text: "All data transmission between our service and GitHub's API is encrypted using HTTPS/TLS protocols to ensure your information remains secure.",
        },
        {
          subtitle: "Access Controls",
          text: "We implement strict access controls and security measures to protect our systems and prevent unauthorized access to any temporary data.",
        },
      ],
    },
    {
      title: "Third-Party Services",
      content: [
        {
          subtitle: "GitHub API",
          text: "Our service integrates with GitHub's official API to access your follower data. Please review GitHub's Privacy Policy for information about how they handle your data.",
        },
        {
          subtitle: "OAuth Provider",
          text: "We use GitHub OAuth for authentication. No third-party tracking or analytics services are used on our platform.",
        },
      ],
    },
    {
      title: "Your Rights and Choices",
      content: [
        {
          subtitle: "Access Control",
          text: "You can revoke our application's access to your GitHub account at any time through your GitHub account settings under 'Applications'.",
        },
        {
          subtitle: "Data Deletion",
          text: "Since we don't store your personal data, there's no persistent data to delete. Revoking access immediately stops all data processing.",
        },
        {
          subtitle: "Transparency",
          text: "Our source code is open and available for review, ensuring complete transparency about how your data is handled.",
        },
      ],
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
      <div className="container mx-auto px-6 py-16 max-w-6xl">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-3 mb-8">
            <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl flex items-center justify-center shadow-2xl">
              <svg
                className="w-8 h-8 text-white"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                />
              </svg>
            </div>
            <h1 className="text-5xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
              Privacy Policy
            </h1>
          </div>

          <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed mb-8">
            Your privacy is important to us. This policy explains how GitHub
            Follower Diff handles your data and protects your privacy.
          </p>

          <div className="bg-blue-500/10 backdrop-blur-sm border border-blue-500/20 rounded-2xl p-6 max-w-4xl mx-auto">
            <div className="flex items-start gap-4">
              <div className="w-8 h-8 bg-blue-500 rounded-lg flex items-center justify-center flex-shrink-0 mt-1">
                <svg
                  className="w-4 h-4 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </div>
              <div className="text-left">
                <h3 className="text-white font-semibold mb-2">
                  Privacy-First Approach
                </h3>
                <p className="text-blue-200 text-sm leading-relaxed">
                  We believe in transparency and privacy by design. This policy
                  describes our commitment to protecting your personal
                  information and maintaining your trust.
                </p>
              </div>
            </div>
          </div>

          <div className="text-gray-400 text-sm mt-6">
            Last updated:{" "}
            {new Date().toLocaleDateString("en-US", {
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </div>
        </div>

        {/* Content Sections */}
        <div className="max-w-4xl mx-auto space-y-12">
          {sections.map((section, index) => (
            <div
              key={section.title}
              className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-3xl p-8"
              style={{
                animationDelay: `${index * 100}ms`,
                animation: "fadeInUp 0.6s ease-out forwards",
              }}
            >
              <h2 className="text-3xl font-bold text-white mb-8 flex items-center gap-3">
                <span className="w-8 h-8 bg-gradient-to-br from-amber-400 to-orange-500 rounded-lg flex items-center justify-center text-white font-bold text-sm">
                  {index + 1}
                </span>
                {section.title}
              </h2>

              <div className="space-y-6">
                {section.content.map((item, itemIndex) => (
                  <div
                    key={itemIndex}
                    className="border-l-4 border-amber-500/30 pl-6"
                  >
                    <h3 className="text-xl font-semibold text-amber-300 mb-3">
                      {item.subtitle}
                    </h3>
                    <p className="text-gray-300 leading-relaxed">{item.text}</p>
                  </div>
                ))}
              </div>
            </div>
          ))}

          {/* Contact Section */}
          <div className="bg-gradient-to-r from-amber-500/10 to-orange-500/10 backdrop-blur-sm border border-amber-500/20 rounded-3xl p-8">
            <h2 className="text-3xl font-bold text-white mb-6">
              Questions About Privacy?
            </h2>
            <p className="text-gray-300 leading-relaxed mb-6">
              If you have any questions about this Privacy Policy or how we
              handle your data, please don't hesitate to reach out to us.
            </p>

            <div className="grid md:grid-cols-2 gap-6">
              <a
                href="https://github.com/Mousta-Med/gfd/issues"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 bg-white/5 hover:bg-white/10 border border-white/10 rounded-2xl p-4 transition-all duration-200 group"
              >
                <div className="w-10 h-10 bg-gray-700 rounded-lg flex items-center justify-center group-hover:bg-gray-600 transition-colors duration-200">
                  <svg
                    className="w-5 h-5 text-white"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                  </svg>
                </div>
                <div>
                  <div className="text-white font-medium">GitHub Issues</div>
                  <div className="text-gray-400 text-sm">
                    Report privacy concerns
                  </div>
                </div>
              </a>

              <a
                href="mailto:contact@example.com"
                className="flex items-center gap-3 bg-white/5 hover:bg-white/10 border border-white/10 rounded-2xl p-4 transition-all duration-200 group"
              >
                <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center group-hover:bg-blue-500 transition-colors duration-200">
                  <svg
                    className="w-5 h-5 text-white"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                    />
                  </svg>
                </div>
                <div>
                  <div className="text-white font-medium">Email Support</div>
                  <div className="text-gray-400 text-sm">
                    Direct privacy inquiries
                  </div>
                </div>
              </a>
            </div>
          </div>

          {/* Back to App */}
          <div className="text-center">
            <a
              href="/"
              className="inline-flex items-center gap-3 bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white font-bold py-4 px-8 rounded-2xl transition-all duration-300 transform hover:scale-105 hover:shadow-2xl"
            >
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M10 19l-7-7m0 0l7-7m-7 7h18"
                />
              </svg>
              <span>Back to App</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

import { useEffect } from "react";

export default function TermsOfService() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const sections = [
    {
      title: "Acceptance of Terms",
      content: [
        {
          subtitle: "Agreement to Terms",
          text: "By accessing and using GitHub Follower Diff ('the Service'), you accept and agree to be bound by the terms and provision of this agreement. If you do not agree to abide by the above, please do not use this service.",
        },
        {
          subtitle: "Updates to Terms",
          text: "We reserve the right to update these terms at any time. Changes will be effective immediately upon posting. Your continued use of the Service after changes are posted constitutes acceptance of the updated terms.",
        },
      ],
    },
    {
      title: "Service Description",
      content: [
        {
          subtitle: "What We Provide",
          text: "GitHub Follower Diff is a web-based tool that analyzes your GitHub follower relationships, showing you who follows you but you don't follow back, and vice versa. The service integrates with GitHub's API to provide real-time analysis.",
        },
        {
          subtitle: "Service Availability",
          text: "We strive to maintain high availability but do not guarantee uninterrupted service. The service may be temporarily unavailable due to maintenance, updates, or technical issues.",
        },
        {
          subtitle: "Third-Party Dependencies",
          text: "Our service depends on GitHub's API and OAuth services. Any limitations or outages of these third-party services may affect our service availability.",
        },
      ],
    },
    {
      title: "User Responsibilities",
      content: [
        {
          subtitle: "Account Security",
          text: "You are responsible for maintaining the security of your GitHub account. Do not share your credentials or allow unauthorized access to your account.",
        },
        {
          subtitle: "Appropriate Use",
          text: "You agree to use the service only for lawful purposes and in accordance with GitHub's Terms of Service. You will not attempt to abuse, hack, or exploit the service.",
        },
        {
          subtitle: "Rate Limits",
          text: "You agree to respect GitHub's API rate limits and not attempt to circumvent them. Excessive use that impacts service availability for other users is prohibited.",
        },
        {
          subtitle: "Compliance",
          text: "You are responsible for ensuring your use of the service complies with all applicable local, state, national, and international laws and regulations.",
        },
      ],
    },
    {
      title: "Limitations and Disclaimers",
      content: [
        {
          subtitle: "Service Limitations",
          text: "The service is provided 'as is' without warranties of any kind. We do not guarantee the accuracy, completeness, or timeliness of the information provided.",
        },
        {
          subtitle: "No Liability",
          text: "In no event shall we be liable for any direct, indirect, incidental, special, or consequential damages arising from your use of the service.",
        },
        {
          subtitle: "Data Accuracy",
          text: "While we strive for accuracy, the data presented is based on GitHub's API responses and may not always reflect the most current state of your follower relationships.",
        },
        {
          subtitle: "Third-Party Actions",
          text: "We are not responsible for any actions taken on GitHub through our service. All follow/unfollow actions are performed using your GitHub account credentials and are your responsibility.",
        },
      ],
    },
    {
      title: "Intellectual Property",
      content: [
        {
          subtitle: "Our Rights",
          text: "The GitHub Follower Diff service, including its design, functionality, and code, is our intellectual property. However, the source code is made available under an open-source license.",
        },
        {
          subtitle: "Open Source",
          text: "Our service is open source and available on GitHub. You may contribute to, fork, or use the code in accordance with the repository's license terms.",
        },
        {
          subtitle: "GitHub Trademarks",
          text: "GitHub is a trademark of GitHub, Inc. We are not affiliated with or endorsed by GitHub, Inc. Our service is an independent tool that integrates with GitHub's public API.",
        },
      ],
    },
    {
      title: "Termination",
      content: [
        {
          subtitle: "Service Termination",
          text: "We reserve the right to terminate or suspend access to our service immediately, without prior notice or liability, for any reason whatsoever.",
        },
        {
          subtitle: "User Termination",
          text: "You may discontinue using our service at any time by revoking access permissions in your GitHub account settings. This will immediately stop all data processing.",
        },
        {
          subtitle: "Effect of Termination",
          text: "Upon termination, your right to use the service will cease immediately. Since we don't store personal data, no data deletion is necessary.",
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
            <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-green-600 rounded-2xl flex items-center justify-center shadow-2xl">
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
                  d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                />
              </svg>
            </div>
            <h1 className="text-5xl font-bold bg-gradient-to-r from-green-400 to-blue-400 bg-clip-text text-transparent">
              Terms of Service
            </h1>
          </div>

          <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed mb-8">
            These terms govern your use of GitHub Follower Diff. Please read
            them carefully before using our service.
          </p>

          <div className="bg-green-500/10 backdrop-blur-sm border border-green-500/20 rounded-2xl p-6 max-w-4xl mx-auto">
            <div className="flex items-start gap-4">
              <div className="w-8 h-8 bg-green-500 rounded-lg flex items-center justify-center flex-shrink-0 mt-1">
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
                    d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </div>
              <div className="text-left">
                <h3 className="text-white font-semibold mb-2">
                  Legal Agreement
                </h3>
                <p className="text-green-200 text-sm leading-relaxed">
                  By using our service, you agree to these terms. This
                  constitutes a legal agreement between you and GitHub Follower
                  Diff.
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

        {/* Quick Navigation */}
        <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6 mb-12 max-w-4xl mx-auto">
          <h3 className="text-white font-semibold mb-4">Quick Navigation</h3>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
            {sections.map((section, index) => (
              <a
                key={section.title}
                href={`#section-${index}`}
                className="text-amber-400 hover:text-amber-300 text-sm transition-colors duration-200 flex items-center gap-2"
              >
                <span className="w-4 h-4 bg-amber-500/20 rounded-full flex items-center justify-center text-xs font-bold">
                  {index + 1}
                </span>
                {section.title}
              </a>
            ))}
          </div>
        </div>

        {/* Content Sections */}
        <div className="max-w-4xl mx-auto space-y-12">
          {sections.map((section, index) => (
            <div
              key={section.title}
              id={`section-${index}`}
              className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-3xl p-8 scroll-mt-20"
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
                    className="border-l-4 border-green-500/30 pl-6"
                  >
                    <h3 className="text-xl font-semibold text-green-300 mb-3">
                      {item.subtitle}
                    </h3>
                    <p className="text-gray-300 leading-relaxed">{item.text}</p>
                  </div>
                ))}
              </div>
            </div>
          ))}

          {/* Important Notice */}
          <div className="bg-gradient-to-r from-red-500/10 to-orange-500/10 backdrop-blur-sm border border-red-500/20 rounded-3xl p-8">
            <div className="flex items-start gap-4 mb-6">
              <div className="w-8 h-8 bg-red-500 rounded-lg flex items-center justify-center flex-shrink-0 mt-1">
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
                    d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.34 16.5c-.77.833.192 2.5 1.732 2.5z"
                  />
                </svg>
              </div>
              <div>
                <h3 className="text-red-300 font-semibold mb-3">
                  Important Legal Notice
                </h3>
                <p className="text-red-200 text-sm leading-relaxed mb-4">
                  These terms are legally binding. If you do not agree with any
                  part of these terms, you must not use our service. Your use of
                  the service constitutes acceptance of these terms.
                </p>
                <p className="text-red-200 text-sm leading-relaxed">
                  For questions about these terms, please contact us through the
                  appropriate channels listed below.
                </p>
              </div>
            </div>
          </div>

          {/* Contact Section */}
          <div className="bg-gradient-to-r from-amber-500/10 to-orange-500/10 backdrop-blur-sm border border-amber-500/20 rounded-3xl p-8">
            <h2 className="text-3xl font-bold text-white mb-6">
              Questions About These Terms?
            </h2>
            <p className="text-gray-300 leading-relaxed mb-6">
              If you have any questions about these Terms of Service or need
              clarification on any provisions, please reach out to us.
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
                    Report legal concerns
                  </div>
                </div>
              </a>

              <a
                href="mailto:legal@example.com"
                className="flex items-center gap-3 bg-white/5 hover:bg-white/10 border border-white/10 rounded-2xl p-4 transition-all duration-200 group"
              >
                <div className="w-10 h-10 bg-green-600 rounded-lg flex items-center justify-center group-hover:bg-green-500 transition-colors duration-200">
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
                  <div className="text-white font-medium">Legal Team</div>
                  <div className="text-gray-400 text-sm">
                    Direct legal inquiries
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

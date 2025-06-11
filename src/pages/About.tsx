import { useState } from "react";

export default function About() {
  const [activeFeature, setActiveFeature] = useState(0);

  const features = [
    {
      title: "Follower Analysis",
      description:
        "Get detailed insights into your GitHub follower relationships with our advanced analytics engine.",
      icon: (
        <svg
          className="w-8 h-8"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
          />
        </svg>
      ),
      gradient: "from-blue-500 to-blue-600",
    },
    {
      title: "Network Management",
      description:
        "Easily follow or unfollow users with one-click actions, helping you maintain meaningful connections.",
      icon: (
        <svg
          className="w-8 h-8"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
          />
        </svg>
      ),
      gradient: "from-green-500 to-green-600",
    },
    {
      title: "Real-time Updates",
      description:
        "Live synchronization with GitHub's API ensures you always have the most current information.",
      icon: (
        <svg
          className="w-8 h-8"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
          />
        </svg>
      ),
      gradient: "from-purple-500 to-purple-600",
    },
    {
      title: "Privacy Focused",
      description:
        "Your data stays secure with GitHub OAuth. We never store your personal information.",
      icon: (
        <svg
          className="w-8 h-8"
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
      ),
      gradient: "from-amber-500 to-orange-500",
    },
  ];

  const stats = [
    { label: "GitHub Users Helped", value: "10,000+", icon: "👥" },
    { label: "Connections Analyzed", value: "1M+", icon: "🔗" },
    { label: "Time Saved", value: "500+ hrs", icon: "⏰" },
    { label: "User Satisfaction", value: "98%", icon: "⭐" },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
      <div className="container mx-auto px-6 py-16 max-w-7xl">
        {/* Hero Section */}
        <div className="text-center mb-20">
          <div className="inline-flex items-center gap-3 mb-8">
            <div className="w-16 h-16 bg-gradient-to-br from-amber-400 to-orange-500 rounded-2xl flex items-center justify-center shadow-2xl">
              <svg className="w-8 h-8 fill-white" viewBox="0 0 24 24">
                <path d="M12 1C5.9225 1 1 5.9225 1 12C1 16.8675 4.14875 20.9787 8.52125 22.4362C9.07125 22.5325 9.2775 22.2025 9.2775 21.9137C9.2775 21.6525 9.26375 20.7862 9.26375 19.865C6.5 20.3737 5.785 19.1912 5.565 18.5725C5.44125 18.2562 4.905 17.28 4.4375 17.0187C4.0525 16.8125 3.5025 16.3037 4.42375 16.29C5.29 16.2762 5.90875 17.0875 6.115 17.4175C7.105 19.0812 8.68625 18.6137 9.31875 18.325C9.415 17.61 9.70375 17.1287 10.02 16.8537C7.5725 16.5787 5.015 15.63 5.015 11.4225C5.015 10.2262 5.44125 9.23625 6.1425 8.46625C6.0325 8.19125 5.6475 7.06375 6.2525 5.55125C6.2525 5.55125 7.17375 5.2625 9.2775 6.67875C10.1575 6.43125 11.0925 6.3075 12.0275 6.3075C12.9625 6.3075 13.8975 6.43125 14.7775 6.67875C16.8813 5.24875 17.8025 5.55125 17.8025 5.55125C18.4075 7.06375 18.0225 8.19125 17.9125 8.46625C18.6138 9.23625 19.04 10.2125 19.04 11.4225C19.04 15.6437 16.4688 16.5787 14.0213 16.8537C14.42 17.1975 14.7638 17.8575 14.7638 18.8887C14.7638 20.36 14.75 21.5425 14.75 21.9137C14.75 22.2025 14.9563 22.5462 15.5063 22.4362C19.8513 20.9787 23 16.8537 23 12C23 5.9225 18.0775 1 12 1Z" />
              </svg>
            </div>
            <h1 className="text-6xl font-bold bg-gradient-to-r from-amber-400 to-orange-400 bg-clip-text text-transparent">
              About GFD
            </h1>
          </div>

          <p className="text-2xl text-gray-300 max-w-4xl mx-auto leading-relaxed mb-12">
            GitHub Follower Diff is a powerful tool designed to help developers
            analyze and manage their GitHub network connections with ease and
            precision.
          </p>

          <div className="flex flex-wrap justify-center gap-4">
            <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-full px-6 py-3">
              <span className="text-amber-400 font-semibold">Open Source</span>
            </div>
            <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-full px-6 py-3">
              <span className="text-blue-400 font-semibold">Privacy First</span>
            </div>
            <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-full px-6 py-3">
              <span className="text-green-400 font-semibold">Real-time</span>
            </div>
          </div>
        </div>

        {/* Stats Section */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-20">
          {stats.map((stat, index) => (
            <div
              key={stat.label}
              className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6 text-center hover:bg-white/10 transition-all duration-300 transform hover:scale-105"
              style={{
                animationDelay: `${index * 100}ms`,
                animation: "fadeInUp 0.6s ease-out forwards",
              }}
            >
              <div className="text-4xl mb-3">{stat.icon}</div>
              <div className="text-3xl font-bold text-white mb-2">
                {stat.value}
              </div>
              <div className="text-gray-400 text-sm">{stat.label}</div>
            </div>
          ))}
        </div>

        {/* Story Section */}
        <div className="grid lg:grid-cols-2 gap-16 items-center mb-20">
          <div>
            <h2 className="text-4xl font-bold text-white mb-6">Our Story</h2>
            <div className="space-y-6 text-gray-300 text-lg leading-relaxed">
              <p>
                Born from the frustration of manually managing GitHub followers,
                GFD was created to solve a common problem faced by developers
                worldwide.
              </p>
              <p>
                As our GitHub networks grew, it became increasingly difficult to
                track who was following us back and who wasn't. The manual
                process was time-consuming and error-prone.
              </p>
              <p>
                We built GFD to automate this process, providing developers with
                clear insights into their network relationships and tools to
                manage them effectively.
              </p>
              <div className="flex items-center gap-4 pt-6">
                <div className="w-12 h-12 bg-gradient-to-br from-amber-400 to-orange-500 rounded-full flex items-center justify-center">
                  <span className="text-white font-bold text-lg">M</span>
                </div>
                <div>
                  <div className="text-white font-semibold">Mousta-Med</div>
                  <div className="text-gray-400 text-sm">
                    Creator & Developer
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="relative">
            <div className="bg-gradient-to-br from-blue-500/20 to-purple-500/20 backdrop-blur-sm border border-white/10 rounded-3xl p-8">
              <div className="space-y-6">
                <div className="flex items-center gap-4">
                  <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
                  <span className="text-gray-300">
                    Analyzing follower networks...
                  </span>
                </div>
                <div className="bg-white/5 rounded-2xl p-4">
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-white font-medium">
                      Network Analysis
                    </span>
                    <span className="text-green-400">✓ Complete</span>
                  </div>
                  <div className="w-full bg-gray-700 rounded-full h-2">
                    <div className="bg-gradient-to-r from-amber-400 to-orange-500 h-2 rounded-full w-full"></div>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-blue-400">
                      1,247
                    </div>
                    <div className="text-gray-400 text-sm">Followers</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-green-400">892</div>
                    <div className="text-gray-400 text-sm">Following</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Features Section */}
        <div className="mb-20">
          <h2 className="text-4xl font-bold text-white text-center mb-12">
            Key Features
          </h2>

          <div className="grid lg:grid-cols-2 gap-8">
            <div className="space-y-4">
              {features.map((feature, index) => (
                <div
                  key={index}
                  className={`p-6 rounded-2xl border cursor-pointer transition-all duration-300 ${
                    activeFeature === index
                      ? "bg-white/10 border-white/20"
                      : "bg-white/5 border-white/10 hover:bg-white/8"
                  }`}
                  onClick={() => setActiveFeature(index)}
                >
                  <div className="flex items-center gap-4">
                    <div
                      className={`w-16 h-16 bg-gradient-to-br ${feature.gradient} rounded-xl flex items-center justify-center text-white`}
                    >
                      {feature.icon}
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold text-white mb-2">
                        {feature.title}
                      </h3>
                      <p className="text-gray-400">{feature.description}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-3xl p-8">
              <div className="text-center">
                <div
                  className={`w-24 h-24 bg-gradient-to-br ${features[activeFeature].gradient} rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-2xl`}
                >
                  <div className="text-white text-3xl">
                    {features[activeFeature].icon}
                  </div>
                </div>
                <h3 className="text-3xl font-bold text-white mb-4">
                  {features[activeFeature].title}
                </h3>
                <p className="text-gray-300 text-lg leading-relaxed">
                  {features[activeFeature].description}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Technology Stack */}
        <div className="text-center">
          <h2 className="text-4xl font-bold text-white mb-12">
            Built With Modern Technology
          </h2>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { name: "React", icon: "⚛️", color: "from-blue-400 to-blue-600" },
              {
                name: "TypeScript",
                icon: "📘",
                color: "from-blue-500 to-blue-700",
              },
              {
                name: "Tailwind CSS",
                icon: "🎨",
                color: "from-cyan-400 to-cyan-600",
              },
              {
                name: "GitHub API",
                icon: "🐙",
                color: "from-gray-600 to-gray-800",
              },
            ].map((tech) => (
              <div
                key={tech.name}
                className="group bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6 hover:bg-white/10 transition-all duration-300 transform hover:scale-105"
              >
                <div
                  className={`w-16 h-16 bg-gradient-to-br ${tech.color} rounded-xl flex items-center justify-center mx-auto mb-4 group-hover:shadow-lg transition-shadow duration-300`}
                >
                  <span className="text-2xl">{tech.icon}</span>
                </div>
                <h3 className="text-white font-semibold">{tech.name}</h3>
              </div>
            ))}
          </div>
        </div>

        {/* Call to Action */}
        <div className="bg-gradient-to-r from-amber-500/10 to-orange-500/10 backdrop-blur-sm border border-amber-500/20 rounded-3xl p-12 text-center mt-20">
          <h2 className="text-3xl font-bold text-white mb-4">
            Ready to Optimize Your Network?
          </h2>
          <p className="text-gray-300 text-lg mb-8 max-w-2xl mx-auto">
            Join thousands of developers who are already using GFD to manage
            their GitHub connections more effectively.
          </p>
          <a
            href="/"
            className="inline-flex items-center gap-3 bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white font-bold py-4 px-8 rounded-2xl transition-all duration-300 transform hover:scale-105 hover:shadow-2xl"
          >
            <span>Get Started Now</span>
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
                d="M17 8l4 4m0 0l-4 4m4-4H3"
              />
            </svg>
          </a>
        </div>
      </div>
    </div>
  );
}

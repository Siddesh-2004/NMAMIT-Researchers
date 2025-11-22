export default function Landing({ handleGetStarted }) {
  return (
    <div
      className="min-h-screen relative flex items-center justify-center px-4"
      style={{
        backgroundImage:
          'linear-gradient(rgba(0, 31, 63, 0.75), rgba(0, 31, 63, 0.75)), url("https://bengaluruadmission.com/wp-content/uploads/2024/02/NMAM-Institute-of-Technology.webp")',
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundAttachment: "fixed",
      }}
    >
      {/* Decorative Grid Overlay */}
      <div className="absolute inset-0 opacity-5">
        <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
              <path d="M 40 0 L 0 0 0 40" fill="none" stroke="white" strokeWidth="1"/>
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid)" />
        </svg>
      </div>

      {/* Main Content */}
      <div className="relative z-10 max-w-5xl mx-auto">
        {/* Institution Badge */}
        <div className="flex justify-center mb-8">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full">
            <div className="w-2 h-2 bg-white rounded-full animate-pulse" />
            <span className="text-sm font-medium text-white">NMAM Institute of Technology</span>
          </div>
        </div>

        {/* Main Heading */}
        <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-center mb-6 text-white drop-shadow-2xl">
          NMAMIT Researchers
        </h1>

        {/* Subtitle */}
        <p className="text-xl md:text-2xl text-center text-white/95 mb-4 font-light drop-shadow-lg">
          Advancing Knowledge Through Innovation
        </p>

        {/* Description */}
        <p className="text-base md:text-lg text-center text-white/90 mb-12 max-w-3xl mx-auto leading-relaxed drop-shadow-md">
          A comprehensive platform for submitting, managing, and showcasing academic research. 
          Join our community of scholars dedicated to pushing the boundaries of knowledge and 
          contributing to meaningful scientific discourse.
        </p>

        {/* Feature Pills */}
        <div className="flex flex-wrap justify-center gap-3 mb-12">
          {['Peer Review', 'Digital Archive', 'Collaborative Research', 'Global Impact'].map((feature) => (
            <div key={feature} className="px-4 py-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-lg text-sm text-white shadow-lg">
              {feature}
            </div>
          ))}
        </div>

        {/* CTA Button */}
        <div className="flex justify-center">
          <button
            onClick={handleGetStarted}
            className="group relative px-10 py-4 bg-white text-blue-900 text-lg font-semibold rounded-lg shadow-2xl hover:shadow-white/20 transition-all duration-300 hover:scale-105 overflow-hidden"
          >
            <span className="relative z-10 flex items-center gap-2">
              Submit Your Research
              <svg className="w-5 h-5 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </span>
            <div className="absolute inset-0 bg-gradient-to-r from-blue-50 to-white opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          </button>
        </div>

        {/* Bottom Stats/Info */}
        <div className="mt-16 pt-8 border-t border-white/20">
          <div className="grid grid-cols-3 gap-8 max-w-2xl mx-auto text-center">
            <div>
              <div className="text-3xl font-bold text-white mb-1 drop-shadow-lg">500+</div>
              <div className="text-sm text-white/80">Research Papers</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-white mb-1 drop-shadow-lg">200+</div>
              <div className="text-sm text-white/80">Active Researchers</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-white mb-1 drop-shadow-lg">15+</div>
              <div className="text-sm text-white/80">Departments</div>
            </div>
          </div>
        </div>
      </div>

      {/* Floating Decorative Shapes */}
      <div className="absolute top-1/4 left-20 w-3 h-3 bg-white/20 rounded-full animate-bounce" style={{ animationDuration: '3s' }} />
      <div className="absolute top-1/3 right-32 w-2 h-2 bg-white/20 rounded-full animate-bounce" style={{ animationDuration: '4s', animationDelay: '0.5s' }} />
      <div className="absolute bottom-1/4 left-1/4 w-2 h-2 bg-white/20 rounded-full animate-bounce" style={{ animationDuration: '3.5s', animationDelay: '1s' }} />
    </div>
  );
}
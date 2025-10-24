export default function Landing() {
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
      {/* Content Container */}
      <div className="text-center max-w-3xl mx-auto z-10">
        {/* Headline */}
        <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold mb-6 text-white drop-shadow-lg">
          Nmamit Researchers
        </h1>

        {/* Tagline */}
        <p className="text-lg md:text-xl lg:text-2xl mb-10 text-white opacity-95 drop-shadow-md">
          Welcome to Nmamit Researchers, a vibrant hub where creativity meets
          knowledge. We foster innovation, collaboration, and discovery,
          empowering students and researchers to turn groundbreaking ideas into
          real-world impact.
        </p>

        {/* CTA Button */}
        <button
          className="px-8 py-3 md:px-10 md:py-4 text-base md:text-lg font-semibold rounded-lg transition-all duration-300 shadow-lg hover:shadow-2xl hover:scale-105 bg-white"
          style={{ color: "#001F3F" }}
        >
          Get Started
        </button>
      </div>

      {/* Subtle overlay pattern for depth */}
      <div
        className="absolute inset-0 opacity-10"
        style={{
          backgroundImage:
            "radial-gradient(circle at 20% 50%, rgba(255,255,255,0.1) 0%, transparent 50%)",
        }}
      />
    </div>
  );
}

export default function Hero() {
  return (
    <section className="hero min-h-[70vh] bg-gradient-to-br from-primary/10 via-base-100 to-secondary/5 relative overflow-hidden">
      {/* Tech Pattern Background */}
      <div className="absolute inset-0 opacity-5">
        <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" preserveAspectRatio="xMidYMid slice">
          <defs>
            <pattern id="techPattern" x="0" y="0" width="40" height="40" patternUnits="userSpaceOnUse">
              {/* Computer/Monitor Icon - Position 1 (8,8) */}
              <rect x="6" y="6" width="4" height="3" fill="none" stroke="currentColor" strokeWidth="0.3"/>
              <rect x="7.5" y="9" width="1" height="0.5" fill="currentColor"/>
              <rect x="7" y="9.5" width="2" height="0.3" fill="currentColor"/>
              
              {/* WiFi Icon - Position 2 (20,4) */}
              <path d="M20 4 C21 4 21.8 4.3 22.5 5 M20 4 C19 4 18.2 4.3 17.5 5 M20 5 C20.5 5 20.8 5.2 21 5.5 M20 5 C19.5 5 19.2 5.2 19 5.5" fill="none" stroke="currentColor" strokeWidth="0.3"/>
              <circle cx="20" cy="6.2" r="0.2" fill="currentColor"/>
              
              {/* Code Brackets - Position 3 (32,8) */}
              <path d="M32 8 L30.5 9.5 L32 11" fill="none" stroke="currentColor" strokeWidth="0.3"/>
              <path d="M34 8 L35.5 9.5 L34 11" fill="none" stroke="currentColor" strokeWidth="0.3"/>
              
              {/* Mobile/Phone Icon - Position 4 (4,20) */}
              <rect x="3" y="18" width="2" height="4" rx="0.5" fill="none" stroke="currentColor" strokeWidth="0.3"/>
              <circle cx="4" cy="21.2" r="0.2" fill="currentColor"/>
              
              {/* Cloud Icon - Position 5 (20,20) */}
              <path d="M18 20 C18 19.5 18.3 19 19 19 C19.2 18.8 19.8 18.8 20 19 C20.7 19 21 19.5 21 20 C21.2 20 21.5 20.2 21.5 20.5 C21.5 20.8 21.2 21 21 21 L18.5 21 C18.2 21 18 20.8 18 20.5 C18 20.2 18.2 20 18.5 20" fill="none" stroke="currentColor" strokeWidth="0.3"/>
              
              {/* Server/Database Icon - Position 6 (36,20) */}
              <rect x="34" y="19" width="3" height="1" rx="0.3" fill="none" stroke="currentColor" strokeWidth="0.3"/>
              <rect x="34" y="20.5" width="3" height="1" rx="0.3" fill="none" stroke="currentColor" strokeWidth="0.3"/>
              <circle cx="34.5" cy="19.5" r="0.15" fill="currentColor"/>
              <circle cx="34.5" cy="21" r="0.15" fill="currentColor"/>
              
              {/* Gear/Settings Icon - Position 7 (8,32) */}
              <circle cx="8" cy="32" r="1.5" fill="none" stroke="currentColor" strokeWidth="0.3"/>
              <path d="M8 30.8 L8 33.2 M6.8 32 L9.2 32 M7.1 31.1 L8.9 32.9 M8.9 31.1 L7.1 32.9" stroke="currentColor" strokeWidth="0.2"/>
              
              {/* CPU/Chip Icon - Position 8 (32,32) */}
              <rect x="30" y="30" width="2.5" height="2.5" fill="none" stroke="currentColor" strokeWidth="0.3"/>
              <rect x="30.8" y="30.8" width="0.9" height="0.9" fill="currentColor"/>
              <path d="M30 30.6 L28.8 30.6 M30 31.2 L28.8 31.2 M30 31.8 L28.8 31.8 M32.5 30.6 L33.7 30.6 M32.5 31.2 L33.7 31.2 M32.5 31.8 L33.7 31.8" stroke="currentColor" strokeWidth="0.2"/>
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#techPattern)" className="text-primary"/>
          <rect width="100%" height="100%" fill="url(#techPattern)" className="text-primary" transform="translate(6,6)"/>
          <rect width="100%" height="100%" fill="url(#techPattern)" className="text-secondary" transform="translate(3,9)" opacity="0.5"/>
        </svg>
      </div>
      
      <div className="hero-content text-center relative z-10">
        <div className="max-w-4xl">
          <h1 className="text-5xl md:text-6xl font-bold mb-6">
            Welcome to <span className="text-primary">XoulTec</span>
          </h1>
          <p className="text-lg md:text-xl mb-8 text-base-content/80 max-w-2xl mx-auto">
            Your Ideas Spark, Our Efforts Ignite
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href="#contact" className="btn btn-primary btn-lg">Get Started</a>
            <a href="#services" className="btn btn-outline btn-lg">Our Services</a>
          </div>
        </div>
      </div>
    </section>
  );
}
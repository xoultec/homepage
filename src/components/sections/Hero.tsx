export default function Hero() {
  return (
    <section className="hero min-h-screen bg-gradient-to-b from-primary/10 to-base-100">
      <div className="hero-content text-center">
        <div className="max-w-4xl">
          <h1 className="text-6xl md:text-7xl font-bold mb-8">
            Welcome to <span className="text-primary">XoulTec</span>
          </h1>
          <p className="text-xl md:text-2xl mb-12 text-base-content/80">
            Your Ideas Spark, Our Efforts Ignite
          </p>
          <a href="#contact" className="btn btn-primary btn-lg">Get Started</a>
        </div>
      </div>
    </section>
  );
}
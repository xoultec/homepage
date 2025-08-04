interface Service {
  title: string;
  description: string;
}

const services: Service[] = [
  {
    title: "Software Projects",
    description: "Custom software development to propel your business forward with innovative web and mobile solutions."
  },
  {
    title: "Corporate Emails",
    description: "Boost your brand with secure, reliable corporate email services designed for seamless communication."
  },
  {
    title: "Antivirus Security",
    description: "Premier antivirus security to protect your business from cyber threats with robust, reliable solutions."
  }
];

export default function Services() {
  return (
    <section id="services" className="py-20">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-5xl font-bold mb-4">Our Services</h2>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {services.map((service, index) => (
            <div key={index} className="card bg-base-100 shadow-xl">
              <div className="card-body text-center">
                <h3 className="card-title text-xl justify-center mb-4">{service.title}</h3>
                <p className="text-base-content/80 mb-6">{service.description}</p>
                <div className="card-actions justify-center">
                  <a href="#contact" className="btn btn-primary">Get Started</a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
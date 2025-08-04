interface Product {
  title: string;
  description: string;
  image: string;
  link: string;
}

const products: Product[] = [
  {
    title: "SIC",
    description: "Enterprise Resource Planning System.",
    image: "/assets/sicacc.jpg",
    link: "https://www.sic.tecno-logica.org/"
  },
  {
    title: "PVenta Mobile App",
    description: "Point of Sale System for Businesses.",
    image: "/assets/unnamed.webp",
    link: "https://play.google.com/store/apps/details?id=pventa.mobile"
  }
];

export default function Products() {
  return (
    <section className="py-20 bg-base-200">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-5xl font-bold mb-4">Our Products</h2>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {products.map((product) => (
            <div key={product.title} className="card bg-base-100 shadow-xl">
              <figure className="px-6 pt-6">
                <img
                  src={product.image}
                  alt={product.title}
                  className="rounded-xl h-48 w-full object-cover object-top"
                />
              </figure>
              <div className="card-body">
                <h3 className="card-title text-2xl">{product.title}</h3>
                <p className="text-base-content/80 mb-4">{product.description}</p>
                <div className="card-actions">
                  <a 
                    href={product.link} 
                    className="btn btn-primary" 
                    target="_blank" 
                    rel="noopener noreferrer"
                  >
                    Learn More
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
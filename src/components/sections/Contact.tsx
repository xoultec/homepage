interface ContactMethod {
  icon: string;
  text: string;
  href: string;
}

const contactMethods: ContactMethod[] = [
  {
    icon: "📞",
    text: "Call Us: +1 (816) 919-3349",
    href: "tel:+18169193349"
  },
  {
    icon: "✉️",
    text: "Email Us: support@xoultec.com",
    href: "mailto:support@xoultec.com"
  }
];

export default function Contact() {
  return (
    <section id="contact" className="py-20 bg-base-200">
      <div className="container mx-auto px-4">
        <div className="text-center">
          <h2 className="text-5xl font-bold mb-12">Contact Us</h2>
          
          <div className="card bg-base-100 shadow-xl max-w-2xl mx-auto">
            <div className="card-body">
              <p className="text-lg mb-8">
                For more information on any of our products or services, please don't hesitate to contact us. Our team is ready to provide the support and answers you need.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                {contactMethods.map((method, index) => (
                  <a 
                    key={index}
                    href={method.href} 
                    className="btn btn-outline btn-primary"
                  >
                    {method.icon} {method.text}
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
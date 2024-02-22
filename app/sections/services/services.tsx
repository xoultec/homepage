import SectionWrapper from "~/components/SectionWrapper";

export default function Services() {
  return (
    <SectionWrapper>
      <div className="w-full flex flex-row justify-center mb-5 md:mb-8">
        <h2>Our Services</h2>
      </div>
      <div className="w-full flex flex-col md:flex-row md:flex-wrap lg:flex-nowrap md:justify-evenly">
        <div className="w-full md:w-[15rem] mb-3 lg:mb-0 flex flex-col items-center h-[12rem] md:h-[17rem] p-3 bg-white rounded-lg shadow-md">
          <h3 className="mb-2">Software Projects</h3>
          <span className="mb-2">
            Custom software development to propel your business forward with
            innovative web and mobile solutions.
          </span>
          <a href="#contact-us">Get Started</a>
        </div>
        <div className="w-full md:w-[15rem] mb-3 md:mb-0 flex flex-col items-center h-[12rem] md:h-[17rem] p-3 bg-white rounded-lg shadow-md">
          <h3 className="mb-2">Corporate Emails</h3>
          <span className="mb-2">
            Boost your brand with secure, reliable corporate email services
            designed for seamless communication.
          </span>
          <a href="#contact-us">Get Started</a>
        </div>
        <div className="w-full md:w-[15rem] mb-3 md:mb-0 flex flex-col items-center h-[12rem] md:h-[17rem] p-3 bg-white rounded-lg shadow-md">
          <h3 className="mb-2">Antivirus Security</h3>
          <span className="mb-2">
            Premier antivirus security to protect your business from cyber
            threats with robust, reliable solutions.
          </span>
          <a href="#contact-us">Get Started</a>
        </div>
      </div>
    </SectionWrapper>
  );
}

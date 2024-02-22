import SectionWrapper from "~/components/SectionWrapper";

export default function ContactUs() {
  return (
    <SectionWrapper>
      <div className="w-full flex flex-col items-center justify-center space-y-4 p-5">
        <h2 id="contact-us">Contact Us</h2>
        <p className="text-center bg-white p-3 shadow-sm rounded-lg">
          {
            "For more information on any of our products or services, please don't hesitate to contact us via the following methods. Our team is ready to provide the support and answers you need."
          }
        </p>
        <div>
          <a
            href="tel:+18169193349"
            className="text-blue-500 hover:text-blue-700 transition-colors duration-300"
          >
            Call Us: +1 (816) 919-3349
          </a>
        </div>
        <div>
          <a
            href="mailto:support@xoultec.com"
            className="text-blue-500 hover:text-blue-700 transition-colors duration-300"
          >
            Email Us: support@xoultec.com
          </a>
        </div>
      </div>
    </SectionWrapper>
  );
}

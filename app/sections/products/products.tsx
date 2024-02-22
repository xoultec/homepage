import SectionWrapper from "~/components/SectionWrapper";

export default function Products() {
  return (
    <SectionWrapper className="bg-white shadow-sm p-5">
      <div className="w-full flex flex-row justify-center mb-5 md:mb-8">
        <h2>Our Top Products</h2>
      </div>

      <div className="w-full bg-white flex flex-row flex-wrap justify-evenly">
        <div className="flex flex-col w-full md:w-[20rem] lg:w-[25rem] shadow-md rounded-lg mb-4 md:mb-0">
          <div className="w-full flex justify-center">
            <img
              src="/assets/sicacc.jpg"
              alt="SIC"
              className="h-[54vw] lg:h-[15.625rem] md:h-[200px] w-full object-cover object-top shadow-sm"
            />
          </div>
          <div className="p-4">
            <h3>SIC</h3>
            <p className="mb-3">Enterprise Resource Planning System.</p>
            <a href="https://www.sic.tecno-logica.org/">Learn More</a>
          </div>
        </div>

        <div className="flex flex-col w-full md:w-[20rem] lg:w-[25rem] shadow-md rounded-lg mb-4 md:mb-0">
          <div className="w-full flex justify-center">
            <img
              src="/assets/unnamed.webp"
              alt="PVenta Mobile"
              className="h-[54vw] lg:h-[15.625rem] md:h-[200px] w-full object-cover object-top"
            />
          </div>
          <div className="p-4">
            <h3>PVenta Mobile App</h3>
            <p className="mb-3">Point of Sale System for Businesses.</p>
            <a href="https://play.google.com/store/apps/details?id=pventa.mobile">
              Learn More
            </a>
          </div>
        </div>
      </div>
    </SectionWrapper>
  );
}

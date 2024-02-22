import SectionWrapper from "~/components/SectionWrapper";

export default function Hero() {
  return (
    <SectionWrapper className="mt-0">
      <div className="flex flex-col items-center">
        <h1>
          Welcome to <span>XoulTec</span>
        </h1>
        <h4>Your Ideas Spark, Our Efforts Ignite</h4>
        <br />
        <a href="#contact-us">Get Started</a>
      </div>
    </SectionWrapper>
  );
}

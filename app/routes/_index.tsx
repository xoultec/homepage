import type { MetaFunction } from "@remix-run/node";
import NavBar from "~/components/NavBar";
import Hero from "~/sections/hero/hero";
import Products from "~/sections/products/products";
import Services from "~/sections/services/services";

export const meta: MetaFunction = () => {
  return [
    { title: "XoulTec" },
    { name: "description", content: "Welcome to XoulTec!" },
  ];
};

export default function Index() {
  return (
    <div
      className="flex flex-col items-center w-full"
      style={{ fontFamily: "system-ui, sans-serif", lineHeight: "1.8" }}
    >
      <NavBar />
      <main className="w-full">
        <Hero />
        <Products />
        <Services />
      </main>
    </div>
  );
}

import type { MetaFunction } from "@remix-run/node";

export const meta: MetaFunction = () => {
  return [
    { title: "XoulTec" },
    { name: "description", content: "Welcome to XoulTec!" },
  ];
};

export default function Index() {
  return (
    <div style={{ fontFamily: "system-ui, sans-serif", lineHeight: "1.8" }}>
      <h1>Welcome to XoulTec</h1>
      <p>Homepage is under construction.</p>
      <p>
        If you are looking to pay your bill, please visit our{" "}
        <a href="https://pay.xoultec.com/p/login/6oE8xf7s9bKQ1xKaEE">
          customer portal
        </a>
        .
      </p>
    </div>
  );
}

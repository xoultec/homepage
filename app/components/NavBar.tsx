import { Link } from "@remix-run/react";
import Logo from "./Logo";

export default function NavBar() {
  return (
    <nav className="w-full flex flex-row justify-center shadow-sm bg-white items-center">
      <div className="w-full max-w-[1024px] flex flex-row justify-between items-center p-5">
        <div className="text-xl font-medium">
          <Link to="/" className="logo">
            <Logo />
          </Link>
        </div>
        <div>
          <ul className="flex flex-row">
            <li className="ml-4 nav-link">
              <a href="#contact-us">Contact Us</a>
            </li>
            <li className="ml-4 nav-link">
              <a href="https://pay.xoultec.com/p/login/6oE8xf7s9bKQ1xKaEE">
                Customer Portal
              </a>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}

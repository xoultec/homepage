import { Link } from '@tanstack/react-router'

export default function NavBar() {
  return (
    <nav className="navbar bg-base-100 shadow-lg sticky top-0 z-50">
      <div className="navbar-start">
        <Link to="/" className="btn btn-ghost text-xl">
          <img src="/assets/Logo.svg" alt="Xoultec Logo" className="h-8" />
        </Link>
      </div>
      <div className="navbar-end">
        <ul className="menu menu-horizontal px-1">
          <li>
            <Link to="/" className="btn btn-ghost">
              Home
            </Link>
          </li>
          <li>
            <Link to="/portfolio" className="btn btn-ghost">
              Portfolio
            </Link>
          </li>
          <li>
            <Link to="/templates" className="btn btn-ghost">
              Templates
            </Link>
          </li>
          <li>
            <Link to="/contact" className="btn btn-ghost">
              Contact
            </Link>
          </li>
          <li>
            <a 
              href="https://pay.xoultec.com/p/login/6oE8xf7s9bKQ1xKaEE" 
              className="btn btn-primary"
              target="_blank"
              rel="noopener noreferrer"
            >
              Customer Portal
            </a>
          </li>
        </ul>
      </div>
    </nav>
  )
}
import { Link } from "react-router-dom";

export default function Header() {
  return (
    <header>
      <div>
        <div>
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li><Link to="/joke">Joke</Link></li>
            <li>Projects</li>
            <li>Contact</li>
          </ul>
        </div>
      </div>
    </header>
  );
}

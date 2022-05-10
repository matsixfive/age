import { Link } from "react-router-dom";

import styles from "./styles/footer.module.css";
import logo from "../images/logo.png";

export default function Header() {
  return (
    <header className="header">
      <h1>
        <Link to="/">
          <img src={logo} alt="logo" />
        </Link>
        Footer
      </h1>
      <nav className={styles.nav}>
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/foot">Footer</Link>
          </li>
        </ul>
      </nav>
    </header>
  );
}
import { Link } from 'react-router-dom';

function HomePage() {
  return (
    <div>
      <h1>Home Page</h1>
      <ul>
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="projects">Projects</Link>
        </li>
        <li>
          <Link to="auth">Sign Up</Link>
        </li>
        <li>
          <Link to="auth/login">Log In</Link>
        </li>
        <li>
          <Link to="404">404</Link>
        </li>
      </ul>
    </div>
  );
}

export default HomePage;

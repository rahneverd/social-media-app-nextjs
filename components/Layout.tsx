import Link from 'next/link';
import styled from 'styled-components';

const Header = styled.header`
  background: #333;
  color: #fff;
  padding: 1rem 2rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Nav = styled.nav`
  ul {
    list-style: none;
    display: flex;
    gap: 1rem;
    margin: 0;
    padding: 0;
  }

  li {
    margin: 0;
  }

  a {
    color: #fff;
    text-decoration: none;
    font-weight: bold;
  }
`;

const Main = styled.main`
  padding: 2rem;
  background: #f0f0f0;
  min-height: 100vh;
`;

const Layout = ({ children }) => (
  <>
    <Header>
      <div>MyApp</div>
      <Nav>
        <ul>
          <li>
            <Link href="/">Home</Link>
          </li>
          <li>
            <Link href="/login">Login</Link>
          </li>
          <li>
            <Link href="/register">Register</Link>
          </li>
        </ul>
      </Nav>
    </Header>
    <Main>{children}</Main>
  </>
);

export default Layout;

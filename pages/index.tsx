import Link from 'next/link';
import styled from 'styled-components';
import Layout from '../components/Layout';

const Content = styled.div`
  text-align: center;
  max-width: 600px;
  margin: 2rem auto;
`;

const ButtonContainer = styled.div`
  display: flex;
  gap: 1rem;
  justify-content: center;
  margin-top: 2rem;
`;

const Home = () => {
  return (
    <Layout>
      <Content>
        <h1>Welcome to the Home Page</h1>
        <p>Your one-stop solution for all your needs.</p>
        <ButtonContainer>
          <Link href="/login">
            <button>Login</button>
          </Link>
          <Link href="/register">
            <button>Register</button>
          </Link>
        </ButtonContainer>
      </Content>
    </Layout>
  );
};

export default Home;

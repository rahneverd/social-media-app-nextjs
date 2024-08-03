import { useRouter } from 'next/router';
import styled from 'styled-components';
import Layout from '../../components/Layout';

const Content = styled.div`
  text-align: center;
  max-width: 600px;
  margin: 2rem auto;
`;

const UserHome = () => {
  const router = useRouter();
  const { username } = router.query;

  return (
    <Layout>
      <Content>
        <h1>Welcome to your home page, User {username}</h1>
        <p>This is your personalized dashboard.</p>
      </Content>
    </Layout>
  );
};

export default UserHome;

import { FormEvent, useState } from 'react';
import { useRouter } from 'next/router';
import styled from 'styled-components';
import { login } from '../services/api';
import Layout from '../components/Layout';

const FormContainer = styled.div`
  max-width: 400px;
  margin: 2rem auto;
`;

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    try {
      const user = await login(username, password);
      router.push(`/home/${user.username}`);
    } catch (error) {
      alert('Login failed');
    }
  };

  return (
    <Layout>
      <FormContainer>
        <h1>Login</h1>
        <form onSubmit={handleSubmit}>
          <div>
            <label>Username</label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
          <div>
            <label>Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <button type="submit">Login</button>
        </form>
      </FormContainer>
    </Layout>
  );
};

export default Login;

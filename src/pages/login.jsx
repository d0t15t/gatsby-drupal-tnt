import React from 'react';
import Layout from '../layout';
import LoginForm from '../components/LoginForm';
import { useStateWithLocalStorage } from '../hooks';

const page = () => {
  const [apiSession] = useStateWithLocalStorage('apiSession');
  if (apiSession.length > 0) location.replace('user');
  return (
    <Layout>
      <h1 style={{ color: 'black' }}>
        {!apiSession.length ? 'Login' : 'You are logged in.'}
        {apiSession.length ? <div>{apiSession}</div> : ''}
      </h1>
      <LoginForm />
    </Layout>
  );
};

export default page;

import React from 'react';
import Layout from '../layout';
import LoginForm from '../components/LoginForm';
import LogoutForm from '../components/LogoutForm';
// import './indexPage.scss';
import { useStateWithLocalStorage } from '../hooks';

const page: React.FunctionComponent = () => {
  const [apiSession] = useStateWithLocalStorage('apiSession');
  return (
    <Layout>
      <h1 style={{ color: 'black' }}>{ !apiSession.length ? 'Login' : 'Logout' }</h1>
      {/* Display Form for Login or Logout */}
      {/* <LoginForm />
      <LogoutForm /> */ }
      {apiSession.length === 0 ? (
        <LoginForm />
      ) : (
        <LogoutForm />
      )}
    </Layout>
  );
};

export default page;

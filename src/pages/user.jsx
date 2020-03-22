import React from 'react';
import Layout from '../layout';
import LogoutForm from '../components/LogoutForm';
import UserTeaser from '../components/UserTeaser';
// import './indexPage.scss';
import { useStateWithLocalStorage, log } from '../hooks';

const page = () => {
  const [apiSession] = useStateWithLocalStorage('apiSession');
  if (apiSession.length === 0) location.replace('login');
  const data = JSON.parse(apiSession);
  return (
    <Layout>
      <h1 style={{ color: 'black' }}>
        {!apiSession.length ? 'Login' : 'You are logged in.'}
      </h1>
      <LogoutForm />
      {apiSession.length ? (
        <UserTeaser
          uid={data.current_user.uid}
          name={data.current_user.name}
          csrf_token={data.csrf_token}
          logout_token={data.logout_token}
          startTime={data.start_time}
        />
      ) : (
        ''
      )}
    </Layout>
  );
};

export default page;

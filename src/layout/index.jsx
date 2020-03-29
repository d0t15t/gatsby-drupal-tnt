import React, { useEffect, AbortController } from 'react';
import { useStaticQuery, graphql } from 'gatsby';
import fetch from 'node-fetch';
// import Helmet from 'react-helmet';
// import { StaticQuery, graphql } from 'gatsby';
// eslint-disable-next-line import/extensions
import Header from '../components/Header';
import './styles.scss';
import { useStateWithLocalStorage } from '../hooks';

const Layout = props => {
  const [, setSessionToken] = useStateWithLocalStorage('sessionToken');
  const { children } = props;
  const date = new Date().getFullYear();
  const footerText = `© ${date} built with `;
  const data = useStaticQuery(graphql`
    query {
      site {
        siteMetadata {
          title
        }
      }
    }
  `);

  useEffect(() => {
    const url = `${process.env.GATSBY_API_LOGIN_URL}/session/token?_format=json`;
    const options = {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json'
      }
    };
    const fetchToken = async (url, options) => {
      const text = await fetch(url, options).then(response => {
        return response.text();
      });
      setSessionToken(text);
    };
    fetchToken(url, options);
  }, []);

  return (
    <>
      <Header siteTitle={data.site.siteMetadata.title} />
      <div
        style={{
          margin: '0 auto',
          maxWidth: 960,
          padding: '1.45rem 1.0875rem 1.45rem',
          paddingTop: 0
        }}
      >
        <main>{children}</main>
        <footer>
          <span>{footerText}</span>
          <a
            href="https://www.gatsbyjs.org"
            target="_blank"
            rel="noopener noreferrer"
          >
            Gatsby
          </a>
          <span> and </span>
          <a
            href="https://www.drupal.org"
            target="_blank"
            rel="noopener noreferrer"
          >
            Drupal
          </a>
        </footer>
      </div>
    </>
  );
};
export default Layout;

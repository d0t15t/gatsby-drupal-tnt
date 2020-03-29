import React from 'react';
import { Link } from 'gatsby';
import './styles.scss';

const Header = props => {
  const { siteTitle } = props;
  return (
    <header
      style={{
        padding: '0.1px 0',
        backgroundColor: 'rebeccapurple'
      }}
    >
      <div
        style={{
          maxWidth: '960px',
          margin: 'auto',
          position: 'relative'
        }}
      >
        <Link to="/">
          <h1 style={{ color: 'white' }}>{siteTitle}</h1>
        </Link>
      </div>
    </header>
  );
};

export default Header;

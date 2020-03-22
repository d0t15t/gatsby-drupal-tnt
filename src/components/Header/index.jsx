import React from 'react';
import './Header.scss';

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
        <h1 style={{ color: 'white' }}>{siteTitle}</h1>
      </div>
    </header>
  );
};

export default Header;

import React from 'react';
import { Link } from 'gatsby';
import Layout from '../layout';
import Image from '../components/Image';
import './indexPage.scss';

const page = () => (
  <Layout>
    <h1>With support for </h1>
    <figure className="indexPage__imgContainer">
      <Image />
    </figure>
    <h2 style={{ fontSize: '3em' }}>+ Drupal</h2>
    <h3 style={{ fontSize: '2.5em' }}>+ ESLint</h3>
    <h4 style={{ fontSize: '2em' }}>+ Prettier</h4>
    <Link to="/login">Log in</Link>
    <Link to="/page-2">Go to page 2</Link>
  </Layout>
);

export default page;

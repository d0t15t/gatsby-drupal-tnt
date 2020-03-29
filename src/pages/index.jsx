import React from 'react';
import { Link, useStaticQuery, graphql } from 'gatsby';
import Img from 'gatsby-image';
import Layout from '../layout';
import Image from '../components/Image';

import './styles.scss';

const page = () => {
  const data = useStaticQuery(graphql`
    query {
      gatsby: file(relativePath: { eq: "gatsby.png" }) {
        childImageSharp {
          fluid(maxWidth: 300) {
            ...GatsbyImageSharpFluid
          }
        }
      }
      drupal: file(relativePath: { eq: "drupal.png" }) {
        childImageSharp {
          fluid(maxWidth: 300) {
            ...GatsbyImageSharpFluid
          }
        }
      }
    }
  `);
  return (
    <Layout>
      <h1 style={{ color: 'black', margin: 0 }}>
        Gatsby Drupal TopNotchTemplate
      </h1>
      <div
        className="top"
        style={{
          backgroundColor: '#ddd',
          // padding: '10px 5px',
          display: 'flex'
        }}
      >
        <Image fluid={data.gatsby.childImageSharp.fluid} alt="Gatsby">
          <h2>Gatsby Frontend!</h2>
        </Image>
        <figure className="img-container">
          <Img fluid={data.drupal.childImageSharp.fluid} alt="Drupal" />
          <figcaption>
            <h2>+ Drupal Backend</h2>
          </figcaption>
        </figure>
      </div>
      <div style={{ display: 'flex' }}>
        <h4 style={{ fontSize: '1em' }}>+ ESLint</h4>
        <h4 style={{ fontSize: '1em' }}>+ Prettier</h4>
      </div>
      <div className="links">
        <Link to="/recipes">Recipes</Link>
        <Link to="/login">Log in</Link>
      </div>
    </Layout>
  );
};

export default page;

import React, { useEffect, useState } from 'react';
import { graphql } from 'gatsby';
import { v4 as uuidv4 } from 'uuid';
import PropTypes from 'prop-types';
import Layout from '../layout';
import Teaser from '../components/Teaser';
import Pager from '../components/Pager';

const page = props => {
  const { data } = props;
  const list = data.recipesList.edges;
  const [pagerCurrent, updatePagerCurrent] = useState(0);
  const pagerAmount = 10;

  return (
    <>
      <Layout>
        <h1>Recipes</h1>
        <ul className="teaser-list">
          {list.map(item => {
            const node = { ...item.node };
            const image = {
              ...item.node.relationships.image.relationships.imageFile.localFile
                .childImageSharp.fixed
            };
            return (
              <li key={uuidv4()}>
                <Teaser
                  key={item.node.id}
                  title={node.title}
                  image={image}
                  path={item.node.fields.path}
                />
              </li>
            );
          })}
        </ul>
        <Pager amount={pagerAmount} route="/recipes" />
      </Layout>
    </>
  );
};

page.propTypes = {
  data: PropTypes.objectOf(PropTypes.any).isRequired
};

page.defaultProps = {
  // data: null
};

export default page;
export const query = graphql`
  query ArticleOverviewPageQuery {
    recipesList: allRecipes(
      limit: 7
      sort: { fields: [createdAt], order: DESC }
      filter: { isPublished: { eq: true } }
    ) {
      edges {
        node {
          id
          fields {
            slug
            path
          }
          title
          path {
            langcode
          }
          createdAt
          isPublished
          relationships {
            image {
              id
              relationships {
                imageFile {
                  localFile {
                    childImageSharp {
                      fixed(width: 300, height: 125) {
                        ...GatsbyImageSharpFixed
                      }
                    }
                  }
                }
              }
            }
          }
        }
      }
    }
  }
`;

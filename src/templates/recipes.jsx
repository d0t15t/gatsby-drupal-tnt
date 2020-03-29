import { graphql } from 'gatsby';
import React from 'react';
import { v4 as uuidv4 } from 'uuid';
import PropTypes from 'prop-types';
import Layout from '../layout';
import Teaser from '../components/Teaser';
import Pager from '../components/Pager';

const page = props => {
  const { data, pageContext } = props;
  const getListItems = () => data.recipesList.edges;
  const list = getListItems();
  return (
    <Layout>
      <h1>Recipes</h1>
      <ul className="teaser-list">
        {list.map(item => {
          const node = { ...item.node };
          const image = {
            ...node.relationships.image.relationships.imageFile.localFile
              .childImageSharp.fixed
          };
          const { path } = node.fields;
          return (
            <li key={uuidv4()}>
              <Teaser
                key={node.id}
                title={node.title}
                image={image}
                path={path}
              />
            </li>
          );
        })}
      </ul>
      <Pager pager={pageContext} />
    </Layout>
  );
};

page.propTypes = {
  data: PropTypes.objectOf(PropTypes.any).isRequired,
  pageContext: PropTypes.objectOf(PropTypes.any).isRequired
};

export default page;

export const query = graphql`
  query ArticleOverviewPageQuery($skip: Int!, $limit: Int!) {
    recipesList: allRecipes(
      skip: $skip
      limit: $limit
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

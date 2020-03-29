import { graphql } from 'gatsby';
import React from 'react';
import Link from 'gatsby-link';
import Layout from '../layout';
import Image from '../components/Image';

// import { rhythm } from "../utils/typography"

const ArticleTemplate = props => {
  console.log(props);
  const { data, pageContext } = props;
  const { title, difficulty, preparationTime } = data.recipes;
  const { prev, next } = pageContext;
  const image = {
    ...data.recipes.relationships.image.relationships.imageFile.localFile
      .childImageSharp.fluid
  };
  return (
    <Layout>
      <article>
        <h4>{title}</h4>
        <div>
          <h3>
            Difficulty:
            {difficulty}
          </h3>
          <h3>
            Preparation time:
            {preparationTime}
          </h3>
          {prev !== null ? <Link to={prev}>Previous </Link> : null}
          {next !== null ? <Link to={next}>Next </Link> : null}
          <Image fluid={image}>{title}</Image>
        </div>
        <div />
      </article>
    </Layout>
  );
};

export default ArticleTemplate;

export const query = graphql`
  query($id: String!) {
    recipes(id: { eq: $id }) {
      title
      id
      preparationTime
      difficulty
      relationships {
        image {
          relationships {
            imageFile {
              localFile {
                childImageSharp {
                  fluid(maxWidth: 600) {
                    ...GatsbyImageSharpFluid
                  }
                }
              }
            }
          }
        }
        category {
          name
        }
      }
    }
  }
`;

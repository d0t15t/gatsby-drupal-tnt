import React, { graphql } from 'react';
// import Link from 'gatsby-link';

// import { rhythm } from "../utils/typography"

const ArticleTemplate = props => {
  const { title, image, difficulty, listItems } = props;
  return (
    <div>
      <Link to="/">← Back</Link>
      <h4>{title}</h4>
      <div>
        <img src={recipe.image.url} />
      </div>
      <div>{difficulty}</div>
      <div>
        <ul>{listItems}</ul>
      </div>
    </div>
  );
};

export default ArticleTemplate;

// export const pageQuery = graphql`
//   query articleQuery($id: String!) {
//     drupalRecipes(id: { eq: $id }) {
//       title
//       createdAt(formatString: "DD-MMM-YYYY")
//       ingredients
//       difficulty
//       preparationTime
//       instructions
//       totalTime
//       image {
//         url
//       }
//     }
//   }
// `;

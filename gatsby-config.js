/* eslint-disable @typescript-eslint/no-var-requires */
const autoprefixer = require('autoprefixer');
const cssnano = require('cssnano');

// Initialize dotenv
require('dotenv').config({
  path: `.env.${process.env.NODE_ENV}` // or '.env'
});

module.exports = {
  siteMetadata: {
    title: 'Gatsby Drupal TnT',
    siteUrl: 'https://github.com/IsaacBigsbyTrogdon/gatsby-drupal-tnt',
    description:
      "Single-origin coffee pork belly Pitchfork bitters master cleanse food truck semiotics authentic McSweeney's mumblecore."
  },
  plugins: [
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        name: 'images',
        path: `${__dirname}/src/images`
      }
    },
    {
      resolve: 'gatsby-source-drupal',
      options: {
        baseUrl: 'https://live-contentacms.pantheonsite.io/',
        apiBase: 'api', // optional, defaults to `jsonapi`
        // Use to filter which content to import.
        links: {
          articles: `https://live-contentacms.pantheonsite.io/recipes/`
        }
        // basicAuth: {
        //   username: process.env.BASIC_AUTH_USERNAME,
        //   password: process.env.BASIC_AUTH_PASSWORD,
        // },
        // params: {
        //   "api-key": process.env.BASIC_AUTH_PASSWORD
        // },
      }
    },
    {
      resolve: 'gatsby-plugin-manifest',
      options: {
        name: 'gatsby-drupal-tnt',
        short_name: 'starter',
        start_url: '/',
        background_color: '#663399',
        theme_color: '#663399',
        display: 'minimal-ui',
        icon: './src/favicon.png'
      }
    },
    {
      resolve: 'gatsby-plugin-sass',
      options: {
        postCssPlugins: [
          autoprefixer(),
          cssnano({
            preset: [
              'default',
              {
                autoprefixer: true,
                discardUnused: true,
                mergeIdents: true,
                zindex: true
              }
            ]
          })
        ]
      }
    },
    'gatsby-plugin-offline',
    'gatsby-plugin-react-helmet',
    'gatsby-plugin-sharp',
    'gatsby-plugin-sitemap',
    'gatsby-transformer-sharp'
  ]
};

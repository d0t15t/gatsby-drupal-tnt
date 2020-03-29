import React, { useEffect, useState } from 'react';
import { Link } from 'gatsby';
import fetch from 'node-fetch';
import { useQueryParams, NumberParam } from 'use-query-params';
import PropTypes from 'prop-types';

const Pager = props => {
  const { pager } = props;
  const {
    pageNumber,
    humanPageNumber,
    skip,
    limit,
    numberOfPages,
    previousPagePath,
    nextPagePath
  } = pager;
  pager.propTypes = {
    pageNumber: PropTypes.number.isRequired,
    humanPageNumber: PropTypes.number.isRequired,
    skip: PropTypes.number.isRequired,
    numberOfPages: PropTypes.number.isRequired,
    previousPagePath: PropTypes.string.isRequired,
    nextPagePath: PropTypes.string.isRequired
  };
  const PagerLink = props => {
    const { path, children } = props;
    return !path ? null : <Link to={path}>{children}</Link>;
  };
  PagerLink.propTypes = {
    path: PropTypes.string.isRequired,
    children: PropTypes.node
  };
  PagerLink.defaultProps = {
    children: null
  };
  return numberOfPages <= 1 ? null : (
    <>
      <PagerLink path={previousPagePath}>Previous</PagerLink>
      {` Page ${humanPageNumber} of ${numberOfPages} `}
      <PagerLink path={nextPagePath}>Next</PagerLink>
    </>
  );
};
Pager.propTypes = {
  pager: PropTypes.objectOf(PropTypes.any).isRequired
};
export default Pager;

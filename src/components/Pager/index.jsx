import React, { useEffect, useState } from 'react';
import { Link } from 'gatsby';
import fetch from 'node-fetch';
import { useQueryParams, NumberParam } from 'use-query-params';
import PropTypes from 'prop-types';

const Pager = props => {
  const { amount, route } = props;
  const [query, setQuery] = useQueryParams({
    p: NumberParam,
    a: NumberParam,
    o: NumberParam
  });
  const { p, a, o } = query;
  const [data, setData] = useState({
    total: 0,
    pageCount: 0,
    current: p || 1,
    offset: o || 0,
    amount: amount || a || 10
  });
  const getPageCount = total => Math.ceil(total / amount);
  useEffect(() => {
    try {
      const doFetch = async (url, options) => {
        // @TODO: implement an endpoint for pager-data
        // @TODO: check out react-hook-async to replace this simple implementation.
        const response = await fetch(url, options);
        if (!response.ok) {
          throw Error(response.statusText);
        } else {
          // Success.
          const json = await response.json();

          // updatePagerCurrent(pagerCurrent + 1);
          const count = json.data.length;
          setData({
            total: count,
            pageCount: getPageCount(count),
            current: data.current,
            offset: data.current * data.amount,
            amount: data.amount
          });
        }
      };
      const url = `${process.env.GATSBY_API_BASE_URL}/recipes`;
      doFetch(url, {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' }
      });
    } catch (error) {
      // setIsError(true);
    }
  }, []);
  const times = n => f => {
    const iter = i => {
      if (i === n) return;
      f(i);
      iter(i + 1);
    };
    return iter(0);
  };
  const PagerLink = linkProps => {
    const { step, children } = linkProps;
    const isVisible = () => {
      switch (step) {
        case -1:
          return data.current > 1;
        case 1:
          return data.current < data.pageCount;
        default:
          return false;
      }
    };
    const handleClick = newPage => {
      setQuery({ p: newPage });
      setData({
        total: data.total,
        pageCount: getPageCount(data.total),
        current: newPage,
        offset: newPage * data.amount,
        amount: data.amount
      });
      // navigate(params);
    };
    return !isVisible() ? null : (
      <Link
        to={`${route}/?p=${data.current + step}`}
        onClick={() => handleClick(data.current + step)}
      >
        {children}
      </Link>
    );
  };
  return data.total <= 0 ? null : (
    <>
      {times(data.total)(i => {
        // console.log(i, 'hi');
      })}
      <PagerLink step={-1}>Previous</PagerLink>
      {` Page ${data.current} of ${data.pageCount} `}
      <PagerLink step={1}>Next</PagerLink>
    </>
  );
};
Pager.propTypes = {
  amount: PropTypes.number,
  route: PropTypes.string.isRequired
};

Pager.defaultProps = {
  amount: 10
};
export default Pager;

import React from 'react';
import styled, { css } from 'styled-components';
import PropTypes from 'prop-types';

const Div = styled.div`
  ${ p => css`
     {
      display: inline-block;
      position: relative;
    }
    div {
      position: absolute;
      width: ${ p.size[0] }px;
      height: ${ p.size[1] }px;
      border-radius: 50%;
      background: ${ p.color };
      animation-timing-function: cubic-bezier(0, 1, 1, 0);
    }
    div:nth-child(1) {
      left: 6px;
      animation: lds-ellipsis1 0.6s infinite;
    }
    div:nth-child(2) {
      left: 6px;
      animation: lds-ellipsis2 0.6s infinite;
    }
    div:nth-child(3) {
      left: 26px;
      animation: lds-ellipsis2 0.6s infinite;
    }
    div:nth-child(4) {
      left: 45px;
      animation: lds-ellipsis3 0.6s infinite;
    }
    @keyframes lds-ellipsis1 {
      0% {
        transform: scale(0);
      }
      100% {
        transform: scale(1);
      }
    }
    @keyframes lds-ellipsis3 {
      0% {
        transform: scale(1);
      }
      100% {
        transform: scale(0);
      }
    }
    @keyframes lds-ellipsis2 {
      0% {
        transform: translate(0, 0);
      }
      100% {
        transform: translate(19px, 0);
      }
    }
  ` }
`;

const Loading = ({ size = [7, 7], color = '#ccc', style = {} }) => {
  return (
    <Div size={size} color={color} style={style}>
      <div />
      <div />
      <div />
      <div />
    </Div>
  );
};

Loading.propTypes = {
  size: PropTypes.arrayOf(PropTypes.number),
  color: PropTypes.string,
  style: PropTypes.shape({})
};

export default Loading;

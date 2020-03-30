// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import classNames from 'classnames';
import PropTypes from 'prop-types';
import React from 'react';

import t from '../../components/tachyons.scss';

const Card = ({ children, className, style }) => (
  <div className={classNames(className, t.bgWhite)} style={style}>
    {children}
  </div>
);

Card.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
  style: PropTypes.object,
};

export default Card;

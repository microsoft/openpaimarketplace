const axios = require('axios');
const jwtDecode = require('jwt-decode');
const error = require('../models/error');
const { isNil } = require('lodash');
const urljoin = require('url-join');

const idpUrl = process.env.IDP_URL || '';

const getTokenInfo = async token => {
  const queryUrl = urljoin(`${idpUrl}`, '/api/v2/tokens/check');
  return axios.get(queryUrl, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

const getUserInfo = async (userName, token) => {
  const queryUrl = urljoin(`${idpUrl}`, '/api/v2/users/', `${userName}`);
  return axios.get(queryUrl, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

const checkAuthAndGetTokenInfo = async (req, res, next) => {
  if (!req.headers.authorization) {
    return next(error.createUnauthorized());
  }
  const token = req.headers.authorization.split(' ')[1];
  let tokenInfo = {};
  try {
    const response = await getTokenInfo(token);
    tokenInfo = response.data;
  } catch (err) {
    if (!isNil(err.response) && err.response.status === 401) {
      return next(error.createUnauthorized());
    } else {
      return next(
        error.createInternalServerError('Something wrong with token idp api'),
      );
    }
  }
  req.tokenInfo = tokenInfo;
  next();
};

const checkAuthAndGetUserInfo = async (req, res, next) => {
  if (!req.headers.authorization) {
    return next(error.createUnauthorized());
  }
  const token = req.headers.authorization.split(' ')[1];
  let tokenInfo = {};
  try {
    tokenInfo = jwtDecode(token);
  } catch (err) {
    return next(error.createUnauthorized());
  }
  if (!tokenInfo.username) {
    return next(error.createUnauthorized());
  }
  let userInfo = {};
  try {
    const response = await getUserInfo(tokenInfo.username, token);
    userInfo = response.data;
  } catch (err) {
    if (!isNil(err.response) && err.response.status === 401) {
      return next(error.createUnauthorized());
    } else {
      return next(
        error.createInternalServerError('Something wrong with token idp api'),
      );
    }
  }
  req.userInfo = userInfo;
  next();
};

const tokenInfoEcho = async (req, res) => {
  res.status(200);
  res.send(req.tokenInfo);
};

const userInfoEcho = async (req, res) => {
  res.status(200);
  res.send(req.userInfo);
};

module.exports = {
  checkAuthAndGetTokenInfo,
  checkAuthAndGetUserInfo,
  tokenInfoEcho,
  userInfoEcho,
};

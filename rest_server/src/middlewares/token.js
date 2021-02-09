const axios = require('axios');
const createError = require('http-errors');

const idpUrl = process.env.IDP_URL || '';

const getTokenInfo = async token => {
  const queryUrl = `${idpUrl}/api/v2/tokens/check`;
  console.log(queryUrl);
  return axios.get(queryUrl, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

const getUserInfo = async (userName, token) => {
  const queryUrl = `${idpUrl}/api/v2/users/${userName}`;
  console.log(queryUrl);
  return axios.get(queryUrl, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

const createHttpErrorFromAxiosError = error => {
  let httpError;
  if (error.response) {
    // The request was made and the server responded with a status code
    // that falls out of the range of 2xx
    console.log(error.response.data);
    console.log(error.response.status);
    console.log(error.response.headers);
    httpError = createError(
      error.response.status,
      error.response.data.code,
      error.response.data.message,
    );
  } else if (error.request) {
    // The request was made but no response was received
    // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
    // http.ClientRequest in node.js
    console.log(error.request);
    httpError = createError('BadRequest', error.request);
  } else {
    // Something happened in setting up the request that triggered an Error
    console.log('Error', error.message);
    httpError = createError('InternalServerError', error.message);
  }
  console.log(error.config);
  return httpError;
};

const checkAuthAndGetTokenInfo = async (req, res, next) => {
  if (!req.headers.authorization) {
    return next(
      createError(
        'Unauthorized',
        'UnauthorizedUserError',
        'Guest is not allowed to do this operation.',
      ),
    );
  }
  console.log(req.body);
  const token = req.headers.authorization.split(' ')[1];
  let tokenInfo = {};
  try {
    const response = await getTokenInfo(token);
    tokenInfo = response.data;
  } catch (err) {
    const httpError = createHttpErrorFromAxiosError(err);
    return res.status(httpError.status).send(httpError.message);
  }
  console.log(tokenInfo);
  req.tokenInfo = tokenInfo;
  next();
};

const checkAuthAndGetUserInfo = async (req, res, next) => {
  if (!req.headers.authorization) {
    return next(
      createError(
        'Unauthorized',
        'UnauthorizedUserError',
        'Guest is not allowed to do this operation.',
      ),
    );
  }
  console.log(req.body);
  let userName = '';
  if (Object.prototype.hasOwnProperty.call(req.body, 'username')) {
    userName = req.body.username;
  } else {
    return res
      .status(400)
      .send('InvalidInputError: Need "username" with json format in body');
  }
  const token = req.headers.authorization.split(' ')[1];
  let userInfo = {};
  try {
    const response = await getUserInfo(userName, token);
    userInfo = response.data;
  } catch (err) {
    const httpError = createHttpErrorFromAxiosError(err);
    return res.status(httpError.status).send(httpError.message);
  }
  console.log(userInfo);
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

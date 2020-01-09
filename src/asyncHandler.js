const asyncHandler = (middleware) => {
  return (req, res, next) => {
    Promise
      .resolve(middleware(req, res, next))
      .catch(next);
  };
};

// module exports
module.exports = asyncHandler;

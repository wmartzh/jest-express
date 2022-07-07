class CustomError extends Error {
  constructor(value) {
    const { status, ...rest } = value;
    super(JSON.stringify(value));
    this.status = status;
    this.response = rest;
  }
}

const validateSchemaErrors = (res, error) => {
  if (error.details) {
    res.status(400).json({ message: error.details[0].message });
  }
};

const isBodyEmpty = (body) => {
  if (Object.keys(body).length == 0) {
    throw new CustomError({ status: 400, message: "Body is required" });
  }
};

const handleResponse = (res, status, response) => {
  res.status(status).json(response);
  return;
};

const handleErrorResponse = (res, error) => {
  console.log(
    "🔰 > file: response.helper.js > line 27 > handleErrorResponse > error",
    error
  );
  validateSchemaErrors(res, error);
  if (error.status) {
    res.status(error.status).json(error.response);
    return;
  }

  res.status(500).json({
    message: "Server Internal Error",
  });
  return;
};

module.exports = {
  handleResponse,
  handleErrorResponse,
  isBodyEmpty,
  CustomError,
};

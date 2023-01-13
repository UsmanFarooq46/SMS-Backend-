const joi = require("@hapi/joi");

const loginValidation = (data) => {
  const schema = joi.object({
    userName: joi.string().required(),
    password: joi.string().required(),
  });
  console.log("joi data : ", data);
  return schema.validate(data);
  // return joi.validate(data,schema)
};

module.exports.loginValidation = loginValidation;

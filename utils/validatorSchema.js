const joi = require("joi");

exports.userSchema = joi.object({
  firstName: joi.string().min(3).max(50).required(),
  lastName: joi.string().min(3).max(50),
  password: joi.string().pattern(new RegExp("^[a-zA-Z0-9]{3,30}$")).required(),
  email: joi
    .string()
    .email({
      minDomainSegments: 5,
    })
    .pattern(
      new RegExp(
        " /^[^0-9][a-zA-Z0-9.!#$%&'+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)$/gi;"
      )
    )
    .required(),
  role: joi.string(),
  phoneNumber: joi.string().required(),
});

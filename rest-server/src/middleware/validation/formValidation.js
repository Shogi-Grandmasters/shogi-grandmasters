import Joi from "joi";

export default {
  signUp: {
    body: {
      email: Joi.string().email(),
      username: Joi.string().regex(/^[a-zA-Z0-9]{3,30}$/),
      password: Joi.string().regex(/^[a-zA-Z0-9]{3,30}$/)
    }
  },
  login: {
    body: {
      username: Joi.string().regex(/^[a-zA-Z0-9]{3,30}$/),
      password: Joi.string().regex(/^[a-zA-Z0-9]{3,30}$/)
    }
  },
  findUser: {
    body: {
      username: Joi.string().regex(/^[a-zA-Z0-9]{3,30}$/)
    }
  },
  reset: {
    params: {
      username: Joi.string().regex(/^[a-zA-Z0-9]{3,30}$/),
      new_password: Joi.string().regex(/^[a-zA-Z0-9]{3,30}$/)
    }
  }
};

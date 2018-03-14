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
      email: Joi.string().email(),
      password: Joi.string().regex(/^[a-zA-Z0-9]{3,30}$/)
    }
  },
  findUser: {
    params: {
      email: Joi.string().email()
    }
  },
  saveChallenges: {
    body: {
      title: Joi.string().regex(/^[a-z\d\-_\,\s]+$/i),
      description: Joi.string().regex(/^[a-z\d\-_\,\s]+$/i),
      collaborators: Joi.string().regex(/^[a-z\d\-_\,\s]+$/i),
      userId: Joi.number()
    }
  }
};

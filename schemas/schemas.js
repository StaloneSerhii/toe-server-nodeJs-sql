const Joi = require("joi");

const addNews = Joi.object({
  title: Joi.string().required(),
  text: Joi.string().required(),
});

const schemasContent = {
  addNews,
};

module.exports = schemasContent;

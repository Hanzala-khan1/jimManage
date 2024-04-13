const Joi = require('joi');


const Adduser = Joi.object().keys({
    full_name:Joi.string().required().label("name"),
    BusinessLocation:Joi.string().required().label("BusinessLocation"),
    email:Joi.string().email().required().label("email"),
    password: Joi.string().required().label('password'),
    phone: Joi.string().optional().allow(null,""),
    city: Joi.string().optional().allow(null,""),
    adress: Joi.string().optional().allow(null,""),
    image: Joi.string().optional().allow(null,""),
    description: Joi.string().optional().allow(null,""),
    status: Joi.string().optional().valid('active', 'inactive'),
    // isAdmin: Joi.string().optional().allow(null,""),
    // isJimAdmin: Joi.string().optional().allow(null),
    // created_at: Joi.string().optional().allow(null)
  });
  const UpdateUser = Joi.object().keys({
    id:Joi.string().required().label("id"),
    name:Joi.string().label("name"),
    BusinessLocation:Joi.string().label("BusinessLocation"),
    email:Joi.string().email().label("email"),
    password: Joi.string().label('password'),
    phone: Joi.string().optional().allow(null,""),
    image: Joi.string().optional().allow(null,""),
    status: Joi.string().optional().valid('active', 'inactive'),
    // isAdmin: Joi.string().optional().allow(null,""),
    // isJimAdmin: Joi.string().optional().allow(null),
    // created_at: Joi.string().optional().allow(null)
  });

module.exports = { 
    Adduser,
    UpdateUser
};



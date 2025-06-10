import Joi from 'joi';

// User interfaces
export interface CreateUserDto {
  name: string;
  phone: string;
}

export interface UpdateUserDto {
  name?: string;
  phone?: string;
}

export interface UserResponse {
  id: number;
  name: string;
  phone: string;
}

// Validation schemas
export const createUserSchema = Joi.object({
  name: Joi.string()
    .min(2)
    .max(50)
    .required()
    .messages({
      'string.min': 'השם חייב להכיל לפחות 2 תווים',
      'string.max': 'השם יכול להכיל עד 50 תווים',
      'any.required': 'השם הוא שדה חובה',
    }),
  phone: Joi.string()
    .pattern(/^05\d{8}$/)
    .required()
    .messages({
      'string.pattern.base': 'מספר הטלפון חייב להיות בפורמט: 05XXXXXXXX',
      'any.required': 'מספר הטלפון הוא שדה חובה',
    }),
});

export const updateUserSchema = Joi.object({
  name: Joi.string()
    .min(2)
    .max(50)
    .messages({
      'string.min': 'השם חייב להכיל לפחות 2 תווים',
      'string.max': 'השם יכול להכיל עד 50 תווים',
    }),
  phone: Joi.string()
    .pattern(/^05\d{8}$/)
    .messages({
      'string.pattern.base': 'מספר הטלפון חייב להיות בפורמט: 05XXXXXXXX',
    }),
}).min(1).messages({
  'object.min': 'נדרש לפחות שדה אחד לעדכון',
});
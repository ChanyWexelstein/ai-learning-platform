import swaggerUi from 'swagger-ui-express';
import { Express } from 'express';

const swaggerDocument = {
  openapi: '3.0.0',
  info: {
    title: 'AI Learning Platform API',
    version: '1.0.0',
    description: 'API documentation for the AI Learning Platform'
  },
  servers: [
    {
      url: 'http://localhost:3000',
      description: 'Local development server'
    }
  ],
  paths: {
    // Auth
    '/api/auth/register': {
      post: {
        summary: 'Register a new user',
        requestBody: {
          required: true,
          content: {
            'application/json': {
              schema: {
                type: 'object',
                properties: {
                  name: { type: 'string' },
                  phone: { type: 'string' },
                  password: { type: 'string' }
                },
                required: ['name', 'phone', 'password']
              }
            }
          }
        },
        responses: {
          '201': { description: 'User registered' },
          '400': { description: 'Bad request' }
        }
      }
    },
    '/api/auth/login': {
      post: {
        summary: 'Login a user',
        requestBody: {
          required: true,
          content: {
            'application/json': {
              schema: {
                type: 'object',
                properties: {
                  name: { type: 'string' },
                  password: { type: 'string' }
                },
                required: ['name', 'password']
              }
            }
          }
        },
        responses: {
          '200': { description: 'Login successful with JWT' },
          '401': { description: 'Unauthorized' }
        }
      }
    },

    // Users
    '/api/users': {
      get: { summary: 'Get all users', responses: { '200': { description: 'Success' } } },
      post: {
        summary: 'Create new user',
        requestBody: {
          required: true,
          content: {
            'application/json': {
              schema: {
                type: 'object',
                properties: {
                  name: { type: 'string' },
                  phone: { type: 'string' },
                  password: { type: 'string' }
                },
                required: ['name', 'phone', 'password']
              }
            }
          }
        },
        responses: { '201': { description: 'User created' } }
      }
    },
    '/api/users/{id}': {
      get: { summary: 'Get user by ID', parameters: [{ name: 'id', in: 'path', required: true, schema: { type: 'string' } }], responses: { '200': { description: 'User data' } } },
      put: { summary: 'Update user', parameters: [{ name: 'id', in: 'path', required: true, schema: { type: 'string' } }], responses: { '200': { description: 'Updated' } } },
      delete: { summary: 'Delete user', parameters: [{ name: 'id', in: 'path', required: true, schema: { type: 'string' } }], responses: { '204': { description: 'Deleted' } } }
    },

    // Categories
    '/api/categories': {
      get: { summary: 'Get all categories', responses: { '200': { description: 'Success' } } },
      post: {
        summary: 'Create new category',
        requestBody: {
          required: true,
          content: {
            'application/json': {
              schema: {
                type: 'object',
                properties: { name: { type: 'string' } },
                required: ['name']
              }
            }
          }
        },
        responses: { '201': { description: 'Category created' } }
      }
    },

    // SubCategories
    '/api/sub-categories': {
      get: { summary: 'Get all sub-categories', responses: { '200': { description: 'Success' } } },
      post: {
        summary: 'Create new sub-category',
        requestBody: {
          required: true,
          content: {
            'application/json': {
              schema: {
                type: 'object',
                properties: {
                  name: { type: 'string' },
                  categoryId: { type: 'number' }
                },
                required: ['name', 'categoryId']
              }
            }
          }
        },
        responses: { '201': { description: 'Sub-category created' } }
      }
    },

    // Prompts
    '/api/prompts': {
      get: { summary: 'Get all prompts', responses: { '200': { description: 'Success' } } },
      post: {
        summary: 'Create a new prompt',
        requestBody: {
          required: true,
          content: {
            'application/json': {
              schema: {
                type: 'object',
                properties: {
                  question: { type: 'string' },
                  userId: { type: 'number' },
                  subCategoryId: { type: 'number' }
                },
                required: ['question', 'userId', 'subCategoryId']
              }
            }
          }
        },
        responses: { '201': { description: 'Prompt created' } }
      }
    },
    '/api/prompts/user/{userId}': {
      get: {
        summary: 'Get prompts by user ID',
        parameters: [
          {
            name: 'userId',
            in: 'path',
            required: true,
            schema: { type: 'string' }
          }
        ],
        responses: { '200': { description: 'List of prompts' } }
      }
    }
  }
};

export function setupSwagger(app: Express) {
  app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
}

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
  components: {
    securitySchemes: {
      bearerAuth: {
        type: 'http',
        scheme: 'bearer',
        bearerFormat: 'JWT'
      }
    }
  },
  paths: {
    '/api/auth/register': {
      post: {
        tags: ['Auth'],
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
        tags: ['Auth'],
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
    '/api/admin/users': {
      get: {
        tags: ['Admin'],
        summary: 'Get all users (ADMIN only)',
        security: [{ bearerAuth: [] }],
        responses: {
          '200': {
            description: 'List of all users with prompts',
            content: {
              'application/json': {
                schema: {
                  type: 'array',
                  items: {
                    type: 'object',
                    properties: {
                      id: { type: 'number' },
                      name: { type: 'string' },
                      phone: { type: 'string' },
                      role: { type: 'string' },
                      prompts: {
                        type: 'array',
                        items: {
                          type: 'object',
                          properties: {
                            id: { type: 'number' },
                            prompt: { type: 'string' },
                            response: { type: 'string' }
                          }
                        }
                      }
                    }
                  }
                }
              }
            }
          },
          '403': { description: 'Unauthorized - Admins only' }
        }
      }
    },
    '/api/users': {
      get: {
        tags: ['Users'],
        summary: 'Get all users',
        responses: { '200': { description: 'Success' } }
      }
    },
    '/api/users/{id}': {
      get: {
        tags: ['Users'],
        summary: 'Get user by ID',
        parameters: [{ name: 'id', in: 'path', required: true, schema: { type: 'string' } }],
        responses: { '200': { description: 'User data' } }
      },
      put: {
        tags: ['Users'],
        summary: 'Update user',
        parameters: [{ name: 'id', in: 'path', required: true, schema: { type: 'string' } }],
        responses: { '200': { description: 'Updated' } }
      }
    },
    '/api/categories': {
      get: {
        tags: ['Categories'],
        summary: 'Get all categories',
        responses: { '200': { description: 'Success' } }
      },
      post: {
        tags: ['Categories'],
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
    '/api/sub-categories': {
      get: {
        tags: ['SubCategories'],
        summary: 'Get all sub-categories',
        responses: { '200': { description: 'Success' } }
      },
      post: {
        tags: ['SubCategories'],
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
    '/api/sub-categories/byCategory/{categoryId}': {
      get: {
        tags: ['SubCategories'],
        summary: 'Get sub-categories by category ID',
        parameters: [
          {
            name: 'categoryId',
            in: 'path',
            required: true,
            schema: { type: 'string' }
          }
        ],
        responses: {
          '200': {
            description: 'List of sub-categories',
            content: {
              'application/json': {
                schema: {
                  type: 'array',
                  items: {
                    type: 'object',
                    properties: {
                      id: { type: 'number' },
                      name: { type: 'string' },
                      categoryId: { type: 'number' }
                    }
                  }
                }
              }
            }
          }
        }
      }
    },
    '/api/prompts': {
      get: {
        tags: ['Prompts'],
        summary: 'Get all prompts',
        responses: { '200': { description: 'Success' } }
      },
      post: {
        tags: ['Prompts'],
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
        tags: ['Prompts'],
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

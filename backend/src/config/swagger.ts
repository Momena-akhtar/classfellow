import swaggerJsdoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';
import { Express } from 'express';

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'ClassFellow API',
      version: '1.0.0',
      description: 'Real-time note-taking app for lectures with AI-powered summaries and transcriptions',
      contact: {
        name: 'ClassFellow API',
      }
    },
    servers: [
      {
        url: 'http://localhost:5500',
        description: 'Development server'
      }
    ],
    components: {
      schemas: {
        Student: {
          type: 'object',
          properties: {
            id: {
              type: 'string',
              example: '507f1f77bcf86cd799439011'
            },
            email: {
              type: 'string',
              format: 'email',
              example: 'momen@gmail.com'
            },
            name: {
              type: 'string',
              example: 'Momena'
            },
            university: {
              type: 'string',
              example: 'NUST'
            },
            photo: {
              type: 'string',
              example: 'https://example.com/photo.jpg'
            },
            courses: {
              type: 'array',
              items: {
                type: 'string'
              },
              example: ['507f1f77bcf86cd799439012']
            }
          }
        },
        AuthResponse: {
          type: 'object',
          properties: {
            success: {
              type: 'boolean',
              example: true
            },
            message: {
              type: 'string',
              example: 'Login successful'
            },
            student: {
              $ref: '#/components/schemas/Student'
            }
          }
        },
        SignupRequest: {
          type: 'object',
          required: ['email', 'password', 'name', 'university'],
          properties: {
            email: {
              type: 'string',
              format: 'email',
              example: 'momen@gmail.com'
            },
            password: {
              type: 'string',
              minLength: 6,
              example: 'password123'
            },
            name: {
              type: 'string',
              example: 'Momena'
            },
            university: {
              type: 'string',
              example: 'NUST'
            },
            photo: {
              type: 'string',
              example: 'https://example.com/photo.jpg'
            }
          }
        },
        LoginRequest: {
          type: 'object',
          required: ['email', 'password'],
          properties: {
            email: {
              type: 'string',
              format: 'email',
              example: 'momen@gmail.com'
            },
            password: {
              type: 'string',
              example: 'password123'
            }
          }
        },
        ErrorResponse: {
          type: 'object',
          properties: {
            success: {
              type: 'boolean',
              example: false
            },
            message: {
              type: 'string',
              example: 'Invalid email or password'
            }
          }
        }
      },
      securitySchemes: {
        cookieAuth: {
          type: 'apiKey',
          in: 'cookie',
          name: 'token',
          description: 'JWT token stored in httpOnly cookie'
        }
      }
    },
    security: [
      {
        cookieAuth: []
      }
    ]
  },
  apis: ['./src/routes/*.ts', './src/controllers/*.ts']
};

const specs = swaggerJsdoc(options);

export const setupSwagger = (app: Express) => {
  app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs, {
    customCss: '.swagger-ui .topbar { display: none }',
    customSiteTitle: 'ClassFellow API Documentation'
  }));
};

export default specs;

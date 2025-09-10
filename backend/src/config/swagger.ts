import swaggerUi from 'swagger-ui-express';
import { Express } from 'express';
import * as fs from 'fs';
import * as path from 'path';
import * as yaml from 'js-yaml';

// Load the YAML file
const yamlPath = path.join(__dirname, '../../swagger.yaml');
const yamlContent = fs.readFileSync(yamlPath, 'utf8');
const specs = yaml.load(yamlContent) as any;

export const setupSwagger = (app: Express) => {
  app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs, {
    customCss: '.swagger-ui .topbar { display: none }',
    customSiteTitle: 'ClassFellow API Documentation'
  }));
};

export default specs;

const swaggerUi = require('swagger-ui-express');
const swaggerJsdoc = require('swagger-jsdoc');

const options = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'Humic Prototyping Landing Page API',
            version: '1.0.0',
            description: 'API for managin content on Humic Prototyping Landing Page',
        },
        components: {
            securitySchemes: {
                bearerAuth: {
                    type: 'http',
                    scheme: 'bearer',
                    bearerFormat: 'JWT',
                },
            },
        },
    },
    apis: ['./src/routes/*.js', './src/controller/*.js'], // files containing annotations as above
};

const specs = swaggerJsdoc(options);

const setupSwagger = (app) => {
    const isProduction = process.env.NODE_ENV === 'production';
    const swaggerEnabled = process.env.SWAGGER_ENABLED === 'true' && !isProduction;
    if (swaggerEnabled) {
        app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs));
        console.log('Swagger docs available at /api-docs');
    }else {
        console.log('Swagger docs are disabled in production or by configuration.');
    }
};

module.exports = setupSwagger;


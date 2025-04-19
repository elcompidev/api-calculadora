const swaggerJSDoc = require('swagger-jsdoc');

const options = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'Calculadora - API',
            description: 'Calculadora con historial de operaciones, diseñada para pruebas y gestionada a través de una API',
            version: '1.0.0',
        },
        servers: [{
            url: 'http://localhost:3000/',
            description: 'Servidor Local de Desarrollo'
        }],
        components: {
            securitySchemes: {
                BearerAuth: {
                    type: 'http',
                    scheme: 'bearer',
                    bearerFormat: 'JWT',
                },
            },
        },
    },
    apis: ['./src/routes/*.js'],
};

const swaggerSpec = swaggerJSDoc(options);

module.exports = swaggerSpec;
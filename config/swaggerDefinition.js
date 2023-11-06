import swaggerJSDoc from "swagger-jsdoc";

const options = {
      swaggerDefinition: {
        openapi: '3.0.3',
        info: {
            title: "PDM API Documentation",
            version: "1.0.0",
            description: "API For PDM Project",
        },
        servers: [
            {
                url: "http://localhost:3000",
            },
        ],
        components : {
             securitySchemes: {
                bearerAuth: {
                    type: 'http',
                    scheme: 'bearer',
                },
            },
        },
    },
    apis: ["./routes/*.js"],
};

const swaggerSpec = swaggerJSDoc(options);

export default swaggerSpec;
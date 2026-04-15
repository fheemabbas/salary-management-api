import swaggerJsDoc from 'swagger-jsdoc';

const options: swaggerJsDoc.Options = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'Salary Management System API',
            version: '1.0.0',
            description: 'API documentation for Employee profiles, Salary Breakdowns, and Global Metrics',
        },
        servers: [
            {
                url: 'http://localhost:3025',
                description: 'Development Server',
            },
        ],
        components: {
            schemas: {
                Employee: {
                    type: 'object',
                    properties: {
                        id: { type: 'integer', example: 1 },
                        fullName: { type: 'string', example: 'John Doe' },
                        jobTitle: { type: 'string', example: 'Software Engineer' },
                        country: { type: 'string', example: 'India' },
                        salary: { type: 'number', example: 75000 },
                    },
                },
                CreateEmployeePayload: {
                    type: 'object',
                    required: ['fullName', 'jobTitle', 'country', 'salary'],
                    properties: {
                        fullName: { type: 'string', example: 'John Doe' },
                        jobTitle: { type: 'string', example: 'Software Engineer' },
                        country: { type: 'string', example: 'India' },
                        salary: { type: 'number', example: 75000 },
                    },
                },
                SalaryBreakdown: {
                    type: 'object',
                    properties: {
                        gross: { type: 'number', example: 75000 },
                        tds: { type: 'number', example: 7500 },
                        net: { type: 'number', example: 67500 },
                    },
                },
                CountryMetrics: {
                    type: 'object',
                    properties: {
                        min: { type: 'number', example: 50000 },
                        max: { type: 'number', example: 120000 },
                        average: { type: 'number', example: 85000 },
                    },
                },
                JobTitleMetrics: {
                    type: 'object',
                    properties: {
                        average: { type: 'number', example: 85000 },
                    },
                },
            },
        },
    },
    apis: ['./src/routes/*.ts'], // Dynamically loads annotations from all route files
};

export const swaggerSpec = swaggerJsDoc(options);

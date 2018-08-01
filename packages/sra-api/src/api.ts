import { schemas } from '@0xproject/json-schemas';
import { OpenApiSpec } from '@loopback/openapi-v3-types';

export const api: OpenApiSpec = {
    openapi: '3.0.0',
    info: {
        version: '1.0.0',
        title: 'Standard Relayer REST API',
        license: {
            name: 'Apache 2.0',
            url: 'https://www.apache.org/licenses/LICENSE-2.0.html',
        },
    },
    servers: [
        // TODO: Use relayer registry information here?
    ],
    paths: {
        '/orders': {
            get: {
                summary: 'List all pets',
                operationId: 'listPets2',
                tags: ['pets'],
                parameters: [
                    {
                        name: 'limit',
                        in: 'query',
                        description: 'How many items to return at one time (max 100)',
                        required: false,
                        schema: {
                            type: 'integer',
                            format: 'int32',
                        },
                    },
                ],
                responses: {
                    '200': {
                        description: 'An paged array of pets',
                        headers: {
                            'x-next': {
                                description: 'A link to the next page of responses',
                                schema: {
                                    type: 'string',
                                },
                            },
                        },
                        content: {
                            'application/json': {
                                schema: {
                                    $ref: '#/components/schemas/Pets',
                                },
                            },
                        },
                    },
                    default: {
                        description: 'unexpected error',
                        content: {
                            'application/json': {
                                schema: {
                                    $ref: '#/components/schemas/Error',
                                },
                            },
                        },
                    },
                },
            },
        },
        '/pets': {
            get: {
                summary: 'List all pets',
                operationId: 'listPets',
                tags: ['pets'],
                parameters: [
                    {
                        name: 'limit',
                        in: 'query',
                        description: 'How many items to return at one time (max 100)',
                        required: false,
                        schema: {
                            type: 'integer',
                            format: 'int32',
                        },
                    },
                ],
                responses: {
                    '200': {
                        description: 'An paged array of pets',
                        headers: {
                            'x-next': {
                                description: 'A link to the next page of responses',
                                schema: {
                                    type: 'string',
                                },
                            },
                        },
                        content: {
                            'application/json': {
                                schema: {
                                    $ref: '#/components/schemas/Pets',
                                },
                            },
                        },
                    },
                    default: {
                        description: 'unexpected error',
                        content: {
                            'application/json': {
                                schema: {
                                    $ref: '#/components/schemas/Error',
                                },
                            },
                        },
                    },
                },
            },
            post: {
                summary: 'Create a pet',
                operationId: 'createPets',
                tags: ['pets'],
                responses: {
                    '201': {
                        description: 'Null response',
                    },
                    default: {
                        description: 'unexpected error',
                        content: {
                            'application/json': {
                                schema: {
                                    $ref: '#/components/schemas/Error',
                                },
                            },
                        },
                    },
                },
            },
        },
        '/pets/{petId}': {
            get: {
                summary: 'Info for a specific pet',
                operationId: 'showPetById',
                tags: ['pets'],
                parameters: [
                    {
                        name: 'petId',
                        in: 'path',
                        required: true,
                        description: 'The id of the pet to retrieve',
                        schema: {
                            type: 'string',
                        },
                    },
                ],
                responses: {
                    '200': {
                        description: 'Expected response to a valid request',
                        content: {
                            'application/json': {
                                schema: {
                                    $ref: '#/components/schemas/Pets',
                                },
                            },
                        },
                    },
                    default: {
                        description: 'unexpected error',
                        content: {
                            'application/json': {
                                schema: {
                                    $ref: '#/components/schemas/Error',
                                },
                            },
                        },
                    },
                },
            },
        },
    },
    components: {
        schemas: {
            Pet: {
                required: ['id', 'name'],
                properties: {
                    id: {
                        type: 'integer',
                        format: 'int64',
                    },
                    name: {
                        type: 'string',
                    },
                    tag: {
                        type: 'string',
                    },
                },
            },
            // Orderbook: schemas.relayerApiOrderBookResponseSchema,
            Pets: {
                type: 'array',
                items: {
                    $ref: '#/components/schemas/Pet',
                },
            },
            Error: {
                required: ['code', 'message'],
                properties: {
                    code: {
                        type: 'integer',
                        format: 'int32',
                    },
                    message: {
                        type: 'string',
                    },
                },
            },
        },
    },
};
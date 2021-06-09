export default {
    type: "object",
    properties: {
        name: { 
            type: 'string',
            pattern: "^(?!\\s*$).+"
        },
        notes: {
            type: 'string'
        },
        age: {
            type: 'number'
        }
    },
    required: ['name', 'age']
  } as const;
  
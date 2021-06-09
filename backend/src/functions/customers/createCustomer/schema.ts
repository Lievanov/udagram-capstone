export default {
    type: "object",
    properties: {
        name: { 
            type: 'string',
            pattern: "^(?!\\s*$).+"
        },
        age: {
            type: 'number'
        }
    },
    required: ['name', 'age']
  } as const;
  
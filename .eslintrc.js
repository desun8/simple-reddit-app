module.exports = {
  // Add support Flow
  'parser': 'babel-eslint',
  
  // Add support Flow
  'plugins': [
    'flowtype'
  ],

  'extends': [
    'airbnb',
    'plugin:flowtype/recommended'
  ],

  'rules': {
    'no-plusplus': ['error', { 'allowForLoopAfterthoughts': true }],
    "react/jsx-filename-extension": [1, { "extensions": [".js", ".jsx"] }],

    // Add support Flow
    // "flowtype/boolean-style": [
    //   2,
    //   "boolean"
    // ],
    // "flowtype/define-flow-type": 1,
    // "flowtype/delimiter-dangle": [
    //   2,
    //   "never"
    // ],
    // "flowtype/generic-spacing": [
    //   2,
    //   "never"
    // ],
    // "flowtype/no-primitive-constructor-types": 2,
    // "flowtype/no-types-missing-file-annotation": 2,
    // "flowtype/no-weak-types": 2,
    // "flowtype/object-type-delimiter": [
    //   2,
    //   "comma"
    // ],
    // "flowtype/require-parameter-type": 2,
    // "flowtype/require-return-type": [
    //   2,
    //   "always",
    //   {
    //     "annotateUndefined": "never"
    //   }
    // ],
    // "flowtype/require-valid-file-annotation": 2,
    // "flowtype/semi": [
    //   2,
    //   "always"
    // ],
    // "flowtype/space-after-type-colon": [
    //   2,
    //   "always"
    // ],
    // "flowtype/space-before-generic-bracket": [
    //   2,
    //   "never"
    // ],
    // "flowtype/space-before-type-colon": [
    //   2,
    //   "never"
    // ],
    // "flowtype/type-id-match": [
    //   2,
    //   "^([A-Z][a-z0-9]+)+Type$"
    // ],
    // "flowtype/union-intersection-spacing": [
    //   2,
    //   "always"
    // ],
    // "flowtype/use-flow-type": 1,
    // "flowtype/valid-syntax": 1
  },

  // Add support Flow
  // "settings": {
  //   "flowtype": {
  //     "onlyFilesWithFlowAnnotation": true
  //   }
  // },

  'env': {
    'browser': true,
    'node': true,
  },
};
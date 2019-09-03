const fs = require('fs');

const config = {
    extends: ["eslint-config-airbnb-base", "prettier"],
    plugins: ["prettier"], 
    rules: {
        "prettier/prettier": ["error", { singleQuote: true, printWidth: 100 }],
        "no-underscore-dangle": 0
    },
    env: {
        node: true,
        mocha: true,
        es6: true
    },
    globals: {
        config: true,
        models: true,
        request: true
    }
};
module.exports = config;
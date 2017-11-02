module.exports = {
    "env": {
        "es6": true,
        "node": true
    },
    "extends": "eslint:recommended",
    "parserOptions": {
        "sourceType": "module"
    },
    "rules": {
        "indent": [
            "error",
            4
        ],
        "linebreak-style": [
            "error",
            "unix"
        ],
        "no-console" :  "off",
        /*
        "quotes": [
            "error",
            "double"
        ],
        */
        //semi for semi-colons
        "semi": [
            "error",
            "always"
        ],
        "no-proto": [
            "error",
            "always"
        ],
        "curly": [
            "error",
            "always"
        ]
        //"semi": "off"
    }
};

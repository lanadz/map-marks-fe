module.exports = {
    "extends": "airbnb",
    "rules": {
        "jsx-a11y/anchor-is-valid": "off",
        "jsx-a11y/anchor-has-content": "off",
        "jsx-a11y/click-events-have-key-events": "off",
        "jsx-a11y/no-static-element-interactions": "off"
    },
    parser: 'babel-eslint',
    env: {
        jest: true,
        "browser": true,
    }
};


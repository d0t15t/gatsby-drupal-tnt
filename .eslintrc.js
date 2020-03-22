module.exports = {
  extends: ['airbnb', 'prettier'],
  plugins: ['prettier'],
  rules: {
    'prettier/prettier': ['error'],
    'react/jsx-filename-extension': [2, { extensions: ['.js', '.jsx'] }],
    'import/no-extraneous-dependencies': [
      2,
      { devDependencies: ['**/test.jsx', '**/test.js'] }
    ],
    'import/extensions': [
      'error',
      'ignorePackages',
      {
        js: 'never',
        jsx: 'never'
      }
    ]
  }
};

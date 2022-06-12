module.exports = {
  root: true,
  env: {
    es6: true,
    node: true,
  },
  extends: [],
  overrides: [
    {
      files: ['lib/*.js', 'tests/**/*.js'],
      extends: ['eslint:recommended'],
    },
  ],
}

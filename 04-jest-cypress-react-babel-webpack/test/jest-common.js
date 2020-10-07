const path = require('path')

module.exports = {
  rootDir: path.join(__dirname, '..'),
  moduleDirectories: [
    'node_modules',
    path.join(__dirname, '../src'),
    'shared',
    __dirname,
  ],
  moduleNameMapper: {
    /**
     * It's actually important that this shows up before the `.css`
     * because order does matter here and this would match before
     * this gets a chance to test and match.
     * We want this to happen first and for any other CSS files in
     * our project, we'll just do the regular style mode.
     */
    '\\.module\\.css$': 'identity-obj-proxy',
    '\\.css$': require.resolve('./style-mock.js'),
  },
  collectCoverageFrom: ['**/src/**/*.js'],
}

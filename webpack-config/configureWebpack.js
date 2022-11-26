const path = require('path');

module.exports = {
  entry: {
    app: path.resolve(__dirname, '../', 'src/main.js'),
  },
  output: {
    filename: 'app.js',
    path: path.resolve(__dirname, '../', 'dist'),
  },
  optimization: {
    minimize: false,
  },
  plugins: [],
};

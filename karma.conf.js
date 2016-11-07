var webpack = require('webpack');

module.exports = function (config) {
  config.set({

    browsers: [ process.env.CONTINUOUS_INTEGRATION ? 'Firefox' : 'Chrome' ],

    singleRun: false,

    frameworks: [ 'mocha' ],

    files: [
      'tests.webpack.js'
    ],

    preprocessors: {
      'tests.webpack.js': [ 'webpack', 'sourcemap' ]
    },

    reporters: [ 'mocha' ],

    webpack: {
      devtool: 'inline-source-map',
      node: {
        fs: "empty"
      },
      module: {
        loaders: [
          { test: /\.js$/, loader: 'babel-loader' }
        ],
        noParse: [
          /node_modules\/sinon\//,
        ]

      },
      resolve: {
        alias: {
          'sinon': 'sinon/pkg/sinon'
        }
      },
      externals: {
        'jsdom': 'window',
        'cheerio': 'window',
        'react/lib/ExecutionEnvironment': true
      }
    },

    webpackServer: {
      noInfo: true
    }

  });
};

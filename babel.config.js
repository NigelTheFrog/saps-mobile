module.exports = {
  presets: ['module:metro-react-native-babel-preset'],
  plugins: [
    [
      'module-resolver',
      {
        cwd: 'babelrc',
        extensions: [
          '.ts',
          '.tsx',
          '.js',
          '.mjs',
          '.ios.js',
          '.android.js',
          '.svg',
        ],
        alias: {
          '@': './src',
        },
      },
    ],
  ],
};

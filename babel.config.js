module.exports = function(api) {
  api.cache(true);
  return {
    presets: ['babel-preset-expo'],
    plugins: [
      [
        'module-resolver',
        {
          alias: {
            '@components': './components',
            '@values': './values',
            '@screens': './screens',
            '@services': './services',
          },
        },
      ],
    ],
  };
};

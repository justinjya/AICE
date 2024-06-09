module.exports = function(api) {
  api.cache(true);
  return {
    presets: ['babel-preset-expo'],
    plugins: [
      [
        'module-resolver',
        {
          alias: {
            '@components': './src/components',
            '@values': './src/values',
            '@screens': './src/screens',
            '@navigation': './src/navigation',
            '@utils': './src/utils',
          },
        },
      ],
    ],
  };
};

module.exports = function (api) {
  api.cache(true);
  return {
    presets: ['babel-preset-expo'],
    plugins: [
      [
        'module-resolver',
        {
          root: ['./src'],
          alias: {
            '@components': './src/components',
            '@screens': './src/screens',
            '@assets': './src/assets',
            '@config': './src/config',
            '@utils': './src/utils',
            '@hooks': './src/hooks',
            '@services': './src/services',
            '@context': './src/context',
          },
        },
      ],
    ],
  };
};

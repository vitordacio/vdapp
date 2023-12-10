module.exports = function (api) {
  api.cache(true);
  return {
    presets: ['babel-preset-expo'],
    plugins: [
      '@babel/plugin-proposal-export-namespace-from',
      'react-native-reanimated/plugin',
      [
        'module-resolver',
        {
          root: ['./src'],
          extensions: [
            '.js',
            '.jsx',
            '.ts',
            '.tsx',
            '.json',
            '.svg',
            '.jpg',
            '.png',
          ],
          alias: {
            '@assets': './src/assets',
            '@components': './src/components',
            '@config': './src/config',
            '@contexts': './src/contexts',
            '@hooks': './src/hooks',
            '@interfaces': './src/interfaces',
            '@routes': './src/routes',
            '@screens': './src/screens',
            '@services': './src/services',
            '@styles': './src/styles',
            '@utils': './src/utils',
          },
        },
      ],
    ],
  };
};

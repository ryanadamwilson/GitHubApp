module.exports = {
  env: {
    test: {
      presets: [
        [
          '@babel/preset-env',
          {
            modules: 'commonjs',
            debug: false,
          },
        ],
        '@babel/preset-flow',
        '@babel/preset-react',
      ],
      plugins: ['@babel/plugin-proposal-object-rest-spread'],
    },
    development: {
      presets: [
        ['@babel/preset-env', { modules: false }],
        '@babel/preset-flow',
        '@babel/preset-react',
      ],
      plugins: ['@babel/plugin-proposal-object-rest-spread'],
    },
  },
};

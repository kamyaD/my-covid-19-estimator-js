module.exports = {
  plugins: ['@babel/plugin-transform-modules-commonjs'],

  presets: [
    [
      '@babel/preset-env',
      'es2015',
      'stage-2',
      {
        targets: {
          node: 'current'
        }
      }
    ]
  ]
};

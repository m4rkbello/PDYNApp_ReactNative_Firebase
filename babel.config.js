module.exports = {
  presets: [
    'module:metro-react-native-babel-preset',
    '@babel/preset-typescript', // 👈 Add this
  ],
  plugins: ['react-native-reanimated/plugin'],
};

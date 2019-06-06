module.exports = {
  presets: ['module:metro-react-native-babel-preset'],
  plugin: [
    ["@babel/plugin-proposal-decorators", {legacy: true}]
  ]
};
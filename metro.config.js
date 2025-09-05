const { getDefaultConfig, mergeConfig } = require('@react-native/metro-config');

const customConfig = {
  transformer: {
    getTransformOptions: async () => ({
      transform: {
        experimentalImportSupport: false,
        inlineRequires: true,
      },
    }),
  },
  resolver: {
    extraNodeModules: {
      // Add any problematic modules here if needed
    },
  },
};

module.exports = mergeConfig(getDefaultConfig(__dirname), customConfig);

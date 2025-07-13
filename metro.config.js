const { getDefaultConfig, mergeConfig } = require('@react-native/metro-config');

const config = {
    server: {
        port: 8081,
    },
    resolver: {
        assetExts: ['bin', 'txt', 'jpg', 'png', 'json', 'gif', 'webp', 'svg'],
    },
};

module.exports = mergeConfig(getDefaultConfig(__dirname), config);
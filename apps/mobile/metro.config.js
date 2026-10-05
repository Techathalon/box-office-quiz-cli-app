const { getDefaultConfig, mergeConfig } = require('@react-native/metro-config');
const { withNativeWind } = require('nativewind/metro');
const path = require('path');

const projectRoot = __dirname;
// Points up to your main 'game' workspace folder
const workspaceRoot = path.resolve(projectRoot, '../..');
//const baseDefaultConfig = getDefaultConfig(projectRoot);
const config = {
  watchFolders: [workspaceRoot],
  resolver: {
    // Enforce native symlink resolution for pnpm
    unstable_enableSymlinks: true,
    unstable_enablePackageExports: true,
    nodeModulesPaths: [
      path.resolve(projectRoot, 'node_modules'),
      path.resolve(workspaceRoot, 'node_modules'),
    ],
    // assetExts: [
    //   ...baseDefaultConfig.resolver.assetExts,
    //   'mp3',
    //   'wav',
    //   'aac',
    //   'm4a',
    //   'ogg',
    // ],
  },
};
module.exports = withNativeWind(
  mergeConfig(getDefaultConfig(projectRoot), config),
  {
    input: './global.css',
  },
);

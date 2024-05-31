const { getDefaultConfig } = require("metro-config");
const { getSentryExpoConfig } = require("@sentry/react-native/metro");
module.exports = (async () => {
  const {
    resolver: { sourceExts, assetExts },
  } = await getDefaultConfig();
  const config = getSentryExpoConfig(__dirname);

  return {
    transformer: {
      babelTransformerPath: require.resolve("react-native-svg-transformer"),
    },
    resolver: {
      assetExts: assetExts.filter((ext) => ext !== "svg"),
      sourceExts: [...sourceExts, "svg"],
    },
    config,
  };
})();

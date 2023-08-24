export default ({ config }) => {
  config.version = "1.0.0";
  config.plugins = [
    // @nozbe/watermelonDB simdjson plugin
    "./plugins/watermelon",
    "expo-router"
  ];
  return config;
};

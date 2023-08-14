export default ({ config }) => {
  config.version = "48.0.15";
  config.plugins = [
    // @nozbe/watermelonDB simdjson plugin
    "./plugins/watermelon"
  ];
  return config;
};

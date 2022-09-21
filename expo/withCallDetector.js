const { AndroidConfig, createRunOncePlugin } = require('@expo/config-plugins')
const pkg = require('react-native-call-detection/package.json')

const withAndroidPermissions = (config) => {
  return AndroidConfig.Permissions.withPermissions(config, [
    'android.permission.READ_CALL_LOG',
    'android.permission.READ_PHONE_STATE'
  ])
}

const withCallDetector = (config) => {
  config = withAndroidPermissions(config)
  return config
}

module.exports = createRunOncePlugin(withCallDetector, pkg.name, pkg.version)

# capacitor-sync-version · ![npm package version](https://img.shields.io/npm/v/capacitor-sync-version?style=flat-square)

Sync npm package version to target platform of the capacitor.

Currently supported platforms are: `[android, ios]`.

## Installation

```shell
npm add --save-dev capacitor-sync-version
```

## Usage

### Additional preparation for Android only

1. Create a file named `app.properties` in `./android/app/`, then add the following properties:

    ```
    versionName: 0.0.1
    versionCode: 1
    ```

2. Adjust codes to referrence these properties in `./android/app/build.gradle`.

    * Add the following codes after `apply plugin: 'com.android.application'`:

      ```
      def appProperties = new Properties();
      file("app.properties").withInputStream { appProperties.load(it) }
      ```

    * Set properties in `defaultConfig {}` block:

      ```
      defaultConfig {
        versionCode appProperties.getProperty("versionCode").toInteger()
        versionName appProperties.getProperty("versionName")
      }
      ```

### Excute `capacitor-sync-version` in [capacitor hooks](https://capacitorjs.com/docs/cli/hooks)

Adding the following script to `package.json`:

```json
{
  "scripts": {
    "capacitor:copy:before": "capacitor-sync-version"
  }
}
```

In this way, `capacitor-sync-version` will be executed before capacitor copy command, e.g., `npx cap copy`.

Other ways to execute `capacitor-sync-version` are:

```shell
# sync for android only
capacitor-sync-version android

# sync for both android and ios
capacitor-sync-version android ios
```

## Licence

MIT

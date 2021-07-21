# capacitor-sync-version

![npm package version](https://img.shields.io/npm/v/capacitor-sync-version?style=flat-square) ![PRs Welcome](https://img.shields.io/badge/PRs-welcome-green?style=flat-square)

Syncing version from package.json to target platform in the capacitor projects.

Currently supported platforms are: `[android, ios]`.

## Installation

```shell
npm add --save-dev capacitor-sync-version
```

## Additional preparation for Android only

**Step 1**. Create a file named `app.properties` in `./android/app/`, then add the following properties:

```
versionName=0.0.1
versionCode=1
```
These properties will be updated when capacitor-sync-version running.

**Step 2**. Adjust codes to referrence these properties in `./android/app/build.gradle`.

* Add the following codes after `apply plugin: 'com.android.application'`:

  ```
  def appProperties = new Properties();
  file("app.properties").withInputStream { appProperties.load(it) }
  ```

* Update properties in `defaultConfig {}` block:

  ```
  defaultConfig {
    versionCode appProperties.getProperty("versionCode").toInteger()
    versionName appProperties.getProperty("versionName")
  }
  ```

## Usage

The simplest way to use capacitor-sync-version is executing it in the [capacitor hooks](https://capacitorjs.com/docs/cli/hooks).

Just adding the following script to `package.json`:

```json
{
  "scripts": {
    "capacitor:copy:before": "capacitor-sync-version"
  }
}
```

In this way, capacitor-sync-version will be executed before capacitor copy command, e.g., `npx cap copy`.

Other ways to execute capacitor-sync-version are:

```shell
# sync for android only
capacitor-sync-version android

# sync for both android and ios
capacitor-sync-version android ios
```

## Licence

MIT

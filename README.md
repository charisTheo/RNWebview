# React Native WebView example imeplementation

> This repository is the final implementation of [How to build a React Native video chat app with Sendbird Calls](https://sendbird.com/developer/tutorials/react-native-video-chat) tutorial.

[Prerequisites](#prerequisites)

  * [Sendbird application](#sendbird-application)

  * [Install dependencies](#install-dependencies)

  * [Build the Sendbird Calls web app](#build-the-sendbird-calls-web-app)

[Run the app](#run-the-app)

  * [iOS](#ios)

  * [Android](#android)

[Troubleshooting](#troubleshooting)

  * [iOS](#ios-1)

  * [Android](#android-1)

----

This is a sample React Native app that demonstrates implementation of [Sendbird Calls](https://sendbird.com/features/voice-and-video) within a React Native application,
being able to call another user and receive incoming calls with Push Notifications enabled for both Android and iOS.

The project is using [`react-native-webview`](https://github.com/react-native-webview/react-native-webview) to make the above possible.

## Prerequisites

### Sendbird application

In order to use Sendbird Calls, you need to create a Sendbird application on the [Sendbird Dashboard](https://dashboard.sendbird.com/).
You will then need the App ID of your Sendbird application, also found in the Sendbird Dashboard, in order to login to the Calls SDK.

### Install dependencies

From the root of the project run:

```sh
npm i && cd ios && pod install
```

### Build the Sendbird Calls web app

This is the web app that goes inside WebView inside the React Native project.

From the root of the project run:

```sh
cd SendbirdCalls && npm i && npm run build
```

## Run the app

### iOS

```sh
npm run ios
```

### Android

```sh
npm run android
```

> ⚠️  If you are testing the Android version on an emulator, make sure you **close all emulator instances before running `npm run android`**, otherwise the metro server will be disconnected from the app in the emulator.
> When no emulator is running already, React Native scripts should start an emulator automatically and connect to the metro server successfully.

#### Android: watch and reload

When working in the `SendbirdCalls` directory which is not directly linked to `react-native` scripts, you may want to automatically build the website and reload the Android emulator or device on each save/change of the files. To do that, run the following command:

```sh
cd SendbirdCalls && npm run watch
```

----

## Troubleshooting

### iOS

> Error: "JSON value '1' of type NSNumber cannot be converted to NSString"

Remove `allowReadAccessToURLs` attribute from the `WebView` component if you have it set - [Read more here](https://dev.to/craftzdog/fixing-an-error-json-value-1-of-type-nsnumber-cannot-be-converted-to-nsstring-a7l).

> Error after running `react-native run-ios` on macOS: "Build error domain=com.apple.CoreSimulator.SimError, code=405"

Run the same command with simulator name supplied:

```sh
react-native run-ios --simulator="iPhone 13"
```

> White screen or HTTPS error

Need to visit the URL of the local server on `http://localhost/` and not the IP that is returned from the `StaticServer` component (i.e. `192.168.18.1`)

### Android

> White screen or HTTPS error

1. Need to enable Cleartext traffic within `AndroidManifest.xml` (Follow “Enable Cleartext traffic on Android” step) - [Read more here](https://medium.com/astrocoders/i-upgraded-to-android-p-and-my-react-native-wont-connect-to-my-computer-to-download-index-delta-42580377e1d3).

2. If testing on an emulator with no Google Play services connected and auto-updates, make sure you update **Google Play services** and **Android System WebView** from Play store (Will [auto-update](https://developer.chrome.com/docs/multidevice/webview/#will-the-new-webview-auto-update) on devices running Android Lollipop and above).

3. If you don’t see Android System WebView under **Updates**, you may have to enable it on the device from the App info section of the device settings. If you can’t enable it either, you may have to temporarily disable Chrome before enabling and updating the Android System WebView.

> Error: “Unable to load script.Make sure you are either running a Metro server or that your bundle 'index.android.bundle' is packaged correctly for release”

Make sure you close all emulator instances before running `npm run android`. React Native scripts should start an emulator automatically and connect to the metro server successfully.

> Webview loads with error: "net::ERR_CONNECTION_REFUSED"

Need to set the `localOnly` parameter to `true` when creating a new static server (`new StaticServer(PORT, path, {localOnly: true})`)


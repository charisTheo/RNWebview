import SendBirdCall from 'sendbird-calls';
import React, {useEffect} from 'react';
import PushNotification from 'react-native-push-notification';

const isSBDialNotification = (notification) => {
  try {
    const payload = JSON.parse(notification?.data?.sendbird_call);

    if (payload?.command?.type === 'dial') {
      return true;
    }
  } catch (e) {
    return false;
  }

  return false;
};

const RemotePushController = () => {
  useEffect(() => {
    PushNotification.getApplicationIconBadgeNumber(function (number) {
      if (number > 0) {
        PushNotification.setApplicationIconBadgeNumber(0);
      }
    });

    PushNotification.createChannel({
      channelId: 'default-channel-id', // (required)
      channelName: 'Default channel', // (required)
      channelDescription: 'A default channel', // (optional) default: undefined.
      soundName: 'default', // (optional) See `soundName` parameter of `localNotification` function
      vibrate: true, // (optional) default: true. Creates the default vibration pattern if true.
    });

    PushNotification.configure({
      onRegister: async function (token) {
        SendBirdCall.registerPushToken(token.token, SendBirdCall.TokenType.FCM)
          .then(() => console.log('token is registered.'))
          .catch((e) => console.error(`token is not registered. Error: ${e}`));
      },

      onNotification: function (notification) {
        if (isSBDialNotification(notification)) {
          PushNotification.localNotification({
            /* Android Only Properties */
            channelId: 'default-channel-id', // (required) channelId, if the channel doesn't exist, notification will not trigger.
            showWhen: true, // (optional) default: true
            autoCancel: true, // (optional) default: true
            vibrate: true, // (optional) default: true
            vibration: 300, // vibration length in milliseconds, ignored if vibrate=false, default: 1000
            ongoing: false, // (optional) set whether this is an "ongoing" notification
            priority: 'high', // (optional) set notification priority, default: high
            visibility: 'private', // (optional) set notification visibility, default: private
            ignoreInForeground: true, // (optional) if true, the notification will not be visible when the app is in the foreground (useful for parity with how iOS notifications appear). should be used in combine with `com.dieam.reactnativepushnotification.notification_foreground` setting
            onlyAlertOnce: true, // (optional) alert will open only once with sound and notify, default: false

            timeoutAfter: null, // (optional) Specifies a duration in milliseconds after which this notification should be canceled, if it is not already canceled, default: null
            messageId: 'google:message_id', // (optional) added as `message_id` to intent extras so opening push notification can find data stored by @react-native-firebase/messaging module.
            invokeApp: true, // (optional) This enable click on actions to bring back the application to foreground or stay in background, default: true

            title: 'SendBirdCalls', // (optional)
            message: 'Incoming Call...', // (required)
            userInfo: {}, // (optional) default: {} (using null throws a JSON value '<null>' error)
            playSound: false, // (optional) default: true
            soundName: 'default', // (optional) Sound to play when the notification is shown. Value of 'default' plays the default sound. It can be set to a custom sound such as 'android.resource://com.xyz/raw/my_sound'. It will look for the 'my_sound' audio file in 'res/raw' directory and play it. default: 'default' (default sound is played)
            number: 10, // (optional) Valid 32 bit integer specified as string. default: none (Cannot be zero)
          });
        } else {
          // it is not sendbird push notification
        }
      },
      popInitialNotification: true,
      requestPermissions: true,
    });
  }, []);

  return null;
};

export default RemotePushController;

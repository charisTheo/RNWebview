/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, {useState} from 'react';
import {
  Button,
  SafeAreaView,
  StyleSheet,
  View,
  Text,
  StatusBar,
  TextInput,
} from 'react-native';
import {Colors} from 'react-native/Libraries/NewAppScreen';
import {registerGlobals} from 'react-native-webrtc';
import {WebView} from 'react-native-webview';
import RemotePushController from './src/services/RemotePushController';
import SendBirdCall from 'sendbird-calls';
import base64 from 'react-native-base64';
import useStaticServer from './src/services/StaticServer';

const bypass = () => {
  registerGlobals();
  window.RTCPeerConnection.prototype.addTrack = () => {};
  window.RTCPeerConnection.prototype.getSenders = () => {};
  window.location = {protocol: 'https:'};
};

const App = () => {
  bypass();
  const [url] = useStaticServer();
  const [authed, setAuthed] = useState(false);
  const [appId, setAppId] = useState('');
  const [userId, setUserId] = useState('');
  const [accessToken, setAccessToken] = useState(null);
  const [authQuery, setAuthQuery] = useState({});

  const login = async () => {
    try {
      SendBirdCall.init(appId);
      await SendBirdCall.authenticate({
        userId: userId,
        accessToken: accessToken,
      });

      const query = base64.encode(
        JSON.stringify({
          app_id: appId,
          user_id: userId,
          access_token: accessToken,
        }),
      );
      setAuthQuery(query);
    } catch (e) {
      console.log(`login failed. Error: ${e}`);
    }

    setAuthed(true);
  };

  const logout = async () => {
    try {
      await SendBirdCall.unregisterAllPushTokens(SendBirdCall.TokenType.FCM);
      console.log('token is unregistered.');
    } catch (e) {
      console.error(`token is not registered. Error: ${e}`);
    }
    SendBirdCall.deauthenticate();
    setAuthed(false);
  };

  return (
    <>
      <StatusBar barStyle="dark-content" />
      <SafeAreaView style={styles.body}>
        {!authed && (
          <View>
            <Text>App ID</Text>
            <TextInput
              onChangeText={(value) => setAppId(value)}
              value={appId}
            />
            <Text>User ID</Text>
            <TextInput
              onChangeText={(value) => setUserId(value)}
              value={userId}
            />
            <Text>Access Token</Text>
            <TextInput
              onChangeText={(value) => setAccessToken(value)}
              value={accessToken}
            />
            <Button title="LOGIN" onPress={login} />
          </View>
        )}
        {authed && url && (
          <>
            <WebView
              source={{
                uri: url + `/?q=${authQuery}&playsinline=1`,
              }}
              originWhitelist={['*']}
              allowsInlineMediaPlayback={true}
              mediaPlaybackRequiresUserAction={false}
              allowFileAccess={true}>
              <RemotePushController />
            </WebView>
            <Button title="LOGOUT" onPress={logout} />
          </>
        )}
      </SafeAreaView>
    </>
  );
};

const styles = StyleSheet.create({
  body: {
    backgroundColor: Colors.white,
    ...StyleSheet.absoluteFill,
  },
  footer: {
    backgroundColor: Colors.lighter,
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
  },
});

export default App;

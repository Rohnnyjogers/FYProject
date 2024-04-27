/**
 * @format
 */

import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';
import PushNotification from 'react-native-push-notification';
import PushNotificationIOS from '@react-native-community/push-notification-ios';

PushNotification.configure({
  onNotification: function (notification) {
      console.log("NOTIFICATION:", notification);
      
    },
  channelId: '929255533210',
  popInitialNotification: true,
  requestPermissions: true
});

AppRegistry.registerComponent(appName, () => App);


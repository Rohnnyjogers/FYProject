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
  
      // process the notification
  
      // (required) Called when a remote is received or opened, or local notification is opened
      notification.finish(PushNotificationIOS.FetchResult.NoData);
    },
  popInitialNotification: true,
  requestPermissions: true
});

PushNotification.createChannel(
{
  channelId: '7000',
  channelName: "My_channel",
  playSound: true,
},
(created) => console.log(`createChannel returned '${created}'`)
);

AppRegistry.registerComponent(appName, () => App);


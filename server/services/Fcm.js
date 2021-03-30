import * as admin from 'firebase-admin';

const serviceAccount = require("../config/firebase-adminsdk.json");
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

export default class Fcm {
  static async sendMessage(message) {
    const tokens = [
      'diKquGjfdEZd_DexZI7L9I:APA91bEHIx1sgX8QkphN9_UZdJ-6lAdC48ofKuZ8oL69SYuG5LTeZOuxHt2rdliJjdVB-0LLgwXcsmunsLN3LLLVpsbXWBHDrnAOQh9IXqxko1VHmqYBFKCzAHci3LxKjNJilsAIn9P5'
    ]
    return Promise.all([
      admin.messaging().sendMulticast({
        notification: {
          title: 'New message',
          body: message
        },
      tokens, // This registration token comes from the client FCM SDKs.
    }).then(console.log).catch(console.error),
    // admin.messaging().send({
    //   notification: {
    //     title: 'New message',
    //     body: message
    //   },
    //   topic
    // }).then(console.log).catch(console.error)
  ]);
  }
  static async registerToRooms(rooms, token) {
    const tokens = [
      'diKquGjfdEZd_DexZI7L9I:APA91bEHIx1sgX8QkphN9_UZdJ-6lAdC48ofKuZ8oL69SYuG5LTeZOuxHt2rdliJjdVB-0LLgwXcsmunsLN3LLLVpsbXWBHDrnAOQh9IXqxko1VHmqYBFKCzAHci3LxKjNJilsAIn9P5'
    ]
    return Promise.all([
      admin.messaging().sendMulticast({
        notification: {
          title: 'New message',
          body: message
        },
      tokens, // This registration token comes from the client FCM SDKs.
    }).then(console.log).catch(console.error),
    // admin.messaging().send({
    //   notification: {
    //     title: 'New message',
    //     body: message
    //   },
    //   topic
    // }).then(console.log).catch(console.error)
  ]);
  }
  
  static async notifyNewMessage(roomKey, message, user) {
    console.log({
      notification: {
        title: user && user.name,
        body: message.message
      },
      topic: roomKey
    });
    return admin.messaging().send({
      notification: {
        title: user && user.name,
        body: message.message
      },
      topic: roomKey
    })
  }
  
  static async registerToRoom(rooms, token) {
    return Promise.all(rooms.map(room => admin.messaging().subscribeToTopic([token], room.key)
    .then(console.log).catch(console.error)))
  }

  static async unregisterToRoom(rooms, token) {
    return Promise.all(rooms.map(room => admin.messaging().unsubscribeFromTopic([token], room.key)
    .then(console.log).catch(console.error)))
  }
}

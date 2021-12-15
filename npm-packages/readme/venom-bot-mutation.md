# 🕷Venom Bot🕸

![enter image description here](https://s2.click/venom.jpg)

> Venom is a high-performance system developed with JavaScript to create a bot for WhatsApp, support for creating any interaction, such as customer service, media sending, sentence recognition based on artificial intelligence and all types of design architecture for WhatsApp.

![enter image description here](https://s2.click/flyervenom.png)

## 🕷🕷 Functions Venom🕷🕷

|                                                |     |
| ---------------------------------------------- | --- |
| Automatic QR Refresh                                       | ✔   |
| Send **text, image, video, audio and docs**                | ✔   |
| Get **contacts, chats, groups, group members,Block List**  | ✔   |
| Send contacts                                              | ✔   |
| Send stickers                                              | ✔   |
| Multiple Sessions                                          | ✔   |
| Forward Messages                                           | ✔   |
| Receive message                                            | ✔   |
| 📍 Send location!!                                          | ✔   |
| 🕸🕸 **and much more**                                     | ✔   |

## Installation

```bash
> npm i --save venom-bot
```

## Getting started

```javascript
// Supports ES6
// import { create, Whatsapp } from 'venom-bot';
const venom = require('venom-bot');

venom.create().then((client) => start(client));

function start(client) {
  client.onMessage((message) => {
    if (message.body === 'Hi') {
      client.sendText(message.from, 'Welcome Venom 🕷');
    }
  });
}
```

##### After executing `create()` function, **venom** will create an instance of whatsapp web. If you are not logged in, it will print a QR code in the terminal. Scan it with your phone and you are ready to go!

##### Venom will remember the session so there is no need to authenticate everytime.

##### Multiples sessions can be created at the same time by pasing a session name to `create()` function:

```javascript
// Init sales whatsapp bot
venom.create('sales').then((salesClient) => {...});

// Init support whatsapp bot
venom.create('support').then((supportClient) => {...});
```

<br>

## Optional create parameters

Venom `create()` method third parameter can have the following optional parameters:

```javascript
create('sessionName', qrCallback, statusFind, {
  headless: true, // Headless chrome
  devtools: false, // Open devtools by default
  useChrome: true, // If false will use Chromium instance
  debug: false, // Opens a debug session
  logQR: true, // Logs QR automatically in terminal
  browserArgs: [''], // Parameters to be added into the chrome browser instance
  refreshQR: 15000, // Will refresh QR every 15 seconds, 0 will load QR once. Default is 30 seconds
  autoClose: 60000, // Will auto close automatically if not synced, 'false' won't auto close. Default is 60 seconds (#Important!!! Will automatically set 'refreshQR' to 1000#)
  disableSpins: true, // Will disable Spinnies animation, useful for containers (docker) for a better log
});
```

## Callback Status Session

Gets the return if the session is `isLogged` or if it is `notLogged`

```javascript
create('sessionName', qrCallback, (statusFind) => {
  console.log(statusFind);
})
  .then((client) => {
    start(client);
  })
  .catch((erro) => console.log(erro));
```

## Exporting QR Code

By default QR code will appear on the terminal. If you need to pass the QR
somewhere else heres how:

```javascript
const fs = require('fs');

// Second create() parameter is the QR callback
venom.create('sessionMarketing', (base64Qr, asciiQR) => {
  // To log the QR in the terminal
  console.log(asciiQR);

  // To write it somewhere else in a file
  exportQR(base64Qr, 'marketing-qr.png');
});

// Writes QR in specified path
function exportQR(qrCode, path) {
  qrCode = qrCode.replace('data:image/png;base64,', '');
  const imageBuffer = Buffer.from(qrCode, 'base64');

  // Creates 'marketing-qr.png' file
  fs.writeFileSync(path, imageBuffer);
}
```

## Downloading Files

Puppeteer takes care of the file downloading. The decryption is being done as
fast as possible (outruns native methods). Supports big files!

```javascript
import fs = require('fs');
import mime = require('mime-types');

client.onMessage( async (message) => {
  if (message.isMedia == true) {
    const buffer = await client.decryptFile(message); 
    // At this point you can do whatever you want with the buffer
    // Most likely you want to write it into a file
    const fileName = `some-file-name.${mime.extension(message.mimetype)}`;
    await fs.writeFile(fileName, buffer, (err) => {
      ...
    });
  }
});
```

## Basic Functions (usage)

Not every available function is listed, for further look, every function
available can be found in [here](/src/api/layers) and
[here](/src/lib/wapi/functions)

### Chatting

##### Here, `chatId` could be `<phoneNumber>@c.us` or `<phoneNumber>-<groupId>@c.us`

```javascript
// Send basic text
await client.sendText(chatId, '👋 Hello from venom!');

// Send image
await client.sendImage(
  chatId,
  'path/to/img.jpg',
  'image-name.jpg',
  'Caption text'
);

// Send @tagged message
await client.sendMentioned(chatId, 'Hello @5218113130740 and @5218243160777!', [
  '5218113130740',
  '5218243160777',
]);

// Reply to a message
await client.reply(chatId, 'This is a reply!', message.id.toString());

// Reply to a message with mention
await client.reply(
  chatId,
  'Hello @5218113130740 and @5218243160777! This is a reply with mention!',
  message.id.toString(),
  ['5218113130740', '5218243160777']
);

// Send file (venom will take care of mime types, just need the path)
await client.sendFile(chatId, 'path/to/file.pdf', 'cv.pdf', 'Curriculum');

// Send gif
await client.sendVideoAsGif(
  chatId,
  'path/to/video.mp4',
  'video.gif',
  'Gif image file'
);

// Send contact
// contactId: 52155334634@c.us
await client.sendContact(chatId, contactId);

// Forwards messages
await client.forwardMessages(chatId, [message.id.toString()], true);

//Generates sticker from the provided animated gif image and sends it (Send image as animated sticker)
//image path imageBase64 A valid gif image is required. You can also send via http/https (http://www.website.com/img.gif)
await client.sendImageAsStickerGif("000000000000@c.us", './image.gif');

//Generates sticker from given image and sends it (Send Image As Sticker)
// image path imageBase64 A valid png, jpg and webp image is required. You can also send via http/https (http://www.website.com/img.jpg)
await client.sendImageAsSticker("000000000000@c.us", './image.jpg');

// Send location
await client.sendLocation(
  chatId,
  25.6801987,
  -100.4060626,
  'Some address, Washington DC',
  'Subtitle'
);

// Send seen ✔️✔️
await client.sendSeen(chatId);

// Start typing...
await client.startTyping(chatId);

// Stop typing
await client.stopTyping(chatId);

// Set chat state (0: Typing, 1: Recording, 2: Paused)
await client.setChatState(chatId, 0 | 1 | 2);
```

## Retrieving Data

```javascript

// Calls your list of blocked contacts (returns an array)
const getBlockList = await client.getBlockList();

// Retrieve contacts
const contacts = await client.getAllContacts();

// Retrieve all messages in chat
const allMessages = await client.loadAndGetAllMessagesInChat(chatId);

// Retrieve contact status
const status = await client.getStatus(contactId);

// Retrieve user profile
const user = await client.getNumberProfile(contactId);

// Retrieve all unread message
const messages = await client.getAllUnreadMessages();

// Retrieve all chats
const chats = await client.getAllChats();

// Retrieve all groups
const chats = await client.getAllGroups();

// Retrieve profile fic (as url)
const url = await client.getProfilePicFromServer(chatId);

// Retrieve chat/conversation
const chat = await client.getChat(chatId);
```

## Group Functions

```javascript
// groupId or chatId: leaveGroup 52123123-323235@g.us

// Leave group
await client.leaveGroup(groupId);

// Get group members
await client.getGroupMembers(groupId);

// Get group members ids
await client.getGroupMembersIds(groupId);

// Generate group invite url link
await client.getGroupInviteLink(groupId);

// Create group (title, participants to add)
await client.createGroup('Group name', ['123123@c.us', '45456456@c.us']);

// Remove participant
await client.removeParticipant(groupId, '123123@c.us');

// Add participant
await client.addParticipant(groupId, '123123@c.us');

// Promote participant (Give admin privileges)
await client.promoteParticipant(groupId, '123123@c.us');

// Demote particiapnt (Revoke admin privileges)
await client.demoteParticipant(groupId, '123123@c.us');

// Get group admins
await client.getGroupAdmins(groupId);

// Return the group status, jid, description from it's invite link
await client.getGroupInfoFromInviteLink(InviteCode);

// Join a group using the group invite code
await client.joinGroup(InviteCode);
```

## Profile Functions

```javascript

// set your present online or offline, online = true | offline = false 
await client.setPresence("true | false");

// Set client status
await client.setProfileStatus('On vacations! ✈️');

// Set client profile name
await client.setProfileName('Venom bot');

// Set client profile photo
await client.setProfilePic('path/to/image.jpg');
```

## Device Functions

```javascript
// Get device info
await client.getHostDevice();

// Get connection state
await client.getConnectionState();

// Get battery level
await client.getBatteryLevel();

// Is connected
await client.isConnected();

// Get whatsapp web version
await client.getWAVersion();
```

## Events

```javascript
// Listen to messages
client.onMessage(message => {
  ...
})

// Listen to state changes
client.onStateChange(state => {
  ...
});

// Listen to ack's
client.onAck(ack => {
  ...
});

// Listen to live location
// chatId: 'phone@c.us'
client.onLiveLocation(chatId, (liveLocation) => {
  ...
});

// chatId looks like this: '5518156745634-1516512045@g.us'
// Event interface is in here: https://github.com/s2click/venom/blob/master/src/api/model/participant-event.ts
client.onParticipantsChanged(chatId, (event) => {
  ...
});

// Listen when client has been added to a group
client.onAddedToGroup(chatEvent => {
  ...
});

```

## Other

```javascript
// Delete chat
await client.deleteChat(chatId);

// Clear chat messages
await client.clearChat(chatId);

// Delete message (last parameter: delete only locally)
await client.deleteMessage(chatId, message.id.toString(), false);

// Mark chat as not seen (returns true if it works)
await client.markUnseenMessage('0000000@c.us');

//blocks a user (returns true if it works)
await client.blockContact('0000000@c.us');

//unlocks contacts (returns true if it works)
await client.unblockContact('0000000@c.us');

// Retrieve a number profile / check if contact is a valid whatsapp number
const profile = await client.getNumberProfile('0000000@c.us');

```

## Misc

There are some tricks for a better usage of venom.

#### Keep session alive:

```javascript
// In case of being logged out of whatsapp web
// Force it to keep the current session
// State change
client.onStateChange((state) => {
  console.log(state);
  const conflits = [
    venom.SocketState.CONFLICT,
    venom.SocketState.UNPAIRED,
    venom.SocketState.UNLAUNCHED,
  ];
  if (conflits.includes(state)) {
    client.useHere();
  }
});
```

#### Send message to new contacts (non-added)

Also see [Whatsapp links](https://faq.whatsapp.com/en/26000030/) Be careful
since this can pretty much could cause a ban from Whatsapp, always keep your
contacts updated!

```javascript
await client.sendMessageToId('5212234234@c.us', 'Hello from venom! 👋');
```

#### Multiple sessions

If you need to run multiple sessions at once just pass a session name to
`create()` method, not use hyphen for name of sessions.

```javascript
async () => {
  const marketingClient = await venom.create('marketing');
  const salesClient = await venom.create('sales');
  const supportClient = await venom.create('support');
};
```

#### Closing (saving) sessions

Close the session properly to ensure the session is saved for the next time you
log in (So it wont ask for QR scan again). So instead of CTRL+C,

```javascript
// Catch ctrl+C
process.on('SIGINT', function() {
  client.close();
});

// Try-catch close
try {
   ...
} catch (error) {
   client.close();
}
```

### Auto closing unsynced sessions

The auto close is enabled by default and the timeout is setted to 60 sec.
Receives the time in milliseconds to countdown until paired.

##### Important with `autoClose` enabled the "refreshQR" parameter is changed to 1000 (1 sec.)!

Use "autoClose: false" to disable auto closing.

### Debugging

## Development

Building venom is really simple altough it contians 3 main projects inside

1. Wapi project

```bash
> npm run build:wapi
```

2. Middleeware

```bash
> npm run build:middleware
> npm run build:jsQR
```

3. Venom

```bash
> npm run build:venom
```

To build the entire project just run

```bash
> npm run build
```

## Maintainers

Maintainers are needed, I cannot keep with all the updates by myself. If you are
interested please open a Pull Request.

## Contributing

Pull requests are welcome. For major changes, please open an issue first to
discuss what you would like to change.

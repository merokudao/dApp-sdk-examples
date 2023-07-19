## Push API Functions

This document provides an overview of various functions that interact with the `PushAPIModule` from the "@dapp-sdk/messaging-push" package. These functions use the Push API to perform actions such as creating users, fetching chats, sending messages, approving chat requests, and more.

### Setting Up

Before using the functions, ensure you have the required dependencies installed and set up as follows:

```typescript
import PushAPIModule from "@dapp-sdk/messaging-push";
import { ENV } from "@pushprotocol/restapi/src/lib/constants";
import ethers from "ethers";

// Let's create 2 dummy wallets to use for testing out functions

const PRIVATE_KEY_1 = ethers.Wallet.createRandom().privateKey;
const PRIVATE_KEY_2 = ethers.Wallet.createRandom().privateKey;
const SIGNER_1 = new ethers.Wallet(PRIVATE_KEY_1);
const SIGNER_2 = new ethers.Wallet(PRIVATE_KEY_2);
const PUBLIC_ADDRESS_1 = SIGNER_1.address;
const PUBLIC_ADDRESS_2 = SIGNER_2.address;

const pushAPI = new PushAPIModule({ env: ENV.STAGING });
```

### Create a user

```typescript
async function createUser(signer: ethers.Signer) {
  const user = await pushAPI.createUser({
    signer: signer,
  });

  console.log("Push API response for createUser(): ", user);
  return user;
}
```

Example: `createUser(SIGNER_1)`

### Get a user

```typescript
async function getUser(publicAddress: string) {
  const user = await pushAPI.getUser({
    account: publicAddress,
  });

  console.log("Push API response for getUser(): ", user);
  return user;
}
```

Example: `getUser(PUBLIC_ADDRESS_1)`

### Get a user's chat

```typescript
async function getChats(publicAddress: string, signer: ethers.Signer) {
  // Fetch user
  const user = await getUser(publicAddress);

  // Decrypt PGP Key
  const pgpDecryptedPvtKey = await pushAPI.decryptPGPKey({
    encryptedPGPPrivateKey: user.encryptedPrivateKey,
    signer: signer,
  });

  const response = await pushAPI.fetchChats({
    account: publicAddress,
    toDecrypt: true,
    pgpPrivateKey: pgpDecryptedPvtKey,
  });
  console.log("Push API response for getChats(): ", response);
  return response;
}
```

Example: `getChats(PUBLIC_ADDRESS_1, SIGNER_1)`

### Get a user's chat Requests

```typescript
async function getChatRequests(publicAddress: string, signer: ethers.Signer) {
  // Fetch user
  const user = await getUser(publicAddress);

  // Decrypt PGP Key
  const pgpDecryptedPvtKey = await pushAPI.getPgpPrivateKey({
    encryptedPGPPrivateKey: user.encryptedPrivateKey,
    signer: signer,
  });

  const response = await pushAPI.fetchChatRequest({
    account: publicAddress,
    toDecrypt: true,
    pgpPrivateKey: pgpDecryptedPvtKey,
  });

  console.log("Push API response for getChatRequests(): ", response);
  return response;
}
```

Example: `getChatRequests(PUBLIC_ADDRESS_1, SIGNER_1)`

### Get conversation hash between 2 addressses

```typescript
async function getConversationHash(
  publicAddress: string,
  publicAddress2: string
) {
  const conversationHash = await pushAPI.conversationHash({
    account: publicAddress,
    conversationId: publicAddress2, // Receiver Address
  });

  console.log(
    "Push API response for getConversationHash(): ",
    conversationHash
  );
  return conversationHash;
}
```

Example: `getConversationHash(PUBLIC_ADDRESS_1, PUBLIC_ADDRESS_2)`

### Get latest chat

```typescript
async function getLatestChat(
  publicAddress: string,
  signer: ethers.Signer,
  publicAddress2: string
) {
  // Fetch user
  const user = await getUser(publicAddress);
  // Decrypt PGP Key
  const pgpDecryptedPvtKey = await pushAPI.getPgpPrivateKey({
    encryptedPGPPrivateKey: user.encryptedPrivateKey,
    signer: signer,
  });

  // Fetch conversation hash
  const conversationHash = await getConversationHash(
    publicAddress,
    publicAddress2
  );

  const response = await pushAPI.latestChatBetweenTwoUsers({
    threadhash: conversationHash.threadHash,
    account: publicAddress,
    toDecrypt: true,
    pgpPrivateKey: pgpDecryptedPvtKey,
  });

  console.log("Push API response for getLatestChat(): ", response);
}
```

Example: `getLatestChat(PUBLIC_ADDRESS_1, SIGNER_1,PUBLIC_ADDRESS_2)`

### Get chat history between two users

```typescript
async function getChatHistory(
  publicAddress: string,
  signer: ethers.Signer,
  publicAddress2: string
) {
  // Fetch user
  const user = await getUser(publicAddress);

  // Decrypt PGP Key
  const pgpDecryptedPvtKey = await pushAPI.getPgpPrivateKey({
    encryptedPGPPrivateKey: user.encryptedPrivateKey,
    signer: signer,
  });

  // Fetch conversation hash
  const conversationHash = await getConversationHash(
    publicAddress,
    publicAddress2
  );

  const response = await pushAPI.chatHistoryBetweenTwoUsers({
    threadhash: conversationHash.threadHash,
    account: publicAddress,
    limit: 5,
    toDecrypt: true,
    pgpPrivateKey: pgpDecryptedPvtKey,
  });

  console.log("Push API response for getChatHistory(): ", response);
  return response;
}
```

Example: `getChatHistory(PUBLIC_ADDRESS_1, SIGNER_1,PUBLIC_ADDRESS_2)`

### Send a message

```typescript
async function sendMessage(
  publicAddress: string,
  signer: ethers.Signer,
  publicAddress2: string
) {
  // Fetch user
  const user = await getUser(publicAddress);

  // Decrypt PGP Key
  const pgpDecryptedPvtKey = await pushAPI.getPgpPrivateKey({
    encryptedPGPPrivateKey: user.encryptedPrivateKey,
    signer: signer,
  });

  const response = await pushAPI.sendMessages({
    messageContent: "Hi from Push Chat!",
    messageType: "Text", // can be "Text" | "Image" | "File" | "GIF"
    receiverAddress: publicAddress2,
    signer: signer,
    pgpPrivateKey: pgpDecryptedPvtKey,
  });

  console.log("Push API response for sendMessage(): ", response);
  return response;
}
```

Example: `sendMessage(PUBLIC_ADDRESS_1, SIGNER_1,PUBLIC_ADDRESS_2)`

### Approve a chat request

```typescript
async function approveChat(
  publicAddress: string,
  signer: ethers.Signer,
  publicAddress2: string
) {
  // Fetch user
  const user = await getUser(publicAddress);

  // Decrypt PGP Key
  const pgpDecryptedPvtKey = await pushAPI.getPgpPrivateKey({
    encryptedPGPPrivateKey: user.encryptedPrivateKey,
    signer: signer,
  });

  const approve = await pushAPI.approveRequest({
    status: "Approved",
    senderAddress: publicAddress2,
    signer: signer,
    pgpPrivateKey: pgpDecryptedPvtKey,
  });

  console.log("Push API response for approveChat(): ", approve);
}
```

Example: `approveChat(PUBLIC_ADDRESS_1, SIGNER_1,PUBLIC_ADDRESS_2)`

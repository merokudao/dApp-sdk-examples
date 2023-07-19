import PushAPIModule from "@dapp-sdk/messaging-push";
import { ENV } from "@pushprotocol/restapi/src/lib/constants";
import ethers from "ethers";

const PRIVATE_KEY_1 = ethers.Wallet.createRandom().privateKey;
const PRIVATE_KEY_2 = ethers.Wallet.createRandom().privateKey;
const SIGNER_1 = new ethers.Wallet(PRIVATE_KEY_1);
const SIGNER_2 = new ethers.Wallet(PRIVATE_KEY_2);
const PUBLIC_ADDRESS_1 = SIGNER_1.address;
const PUBLIC_ADDRESS_2 = SIGNER_2.address;

const pushAPI = new PushAPIModule({ env: ENV.STAGING });

async function createUser(signer: ethers.Signer) {
  const user = await pushAPI.createUser({
    signer: signer,
  });

  console.log("Push API response for createUser(): ", user);
  return user;
}

async function getUser(publicAddress: string) {
  const user = await pushAPI.getUser({
    account: publicAddress,
  });

  console.log("Push API response for getUser(): ", user);
  return user;
}

// Get Chats of PUBLIC_ADDRESS_1
async function getChats(publicAddress: string, signer: ethers.Signer) {
  // Fetch user
  const user = await getUser(publicAddress);

  // Decrypt PGP Key
  const pgpDecrpyptedPvtKey = await pushAPI.decryptPGPKey({
    encryptedPGPPrivateKey: user.encryptedPrivateKey,
    signer: signer,
  });

  const response = await pushAPI.fetchChats({
    account: publicAddress,
    toDecrypt: true,
    pgpPrivateKey: pgpDecrpyptedPvtKey,
  });
  console.log("Push API response for getChats(): ", response);
  return response;
}
// Get Chat requests for PUBLIC_ADDRESS_1
async function getChatRequests(publicAddress: string, signer: ethers.Signer) {
  // Fetch user
  const user = await getUser(publicAddress);

  // Decrypt PGP Key
  const pgpDecrpyptedPvtKey = await pushAPI.getPgpPrivateKey({
    encryptedPGPPrivateKey: user.encryptedPrivateKey,
    signer: signer,
  });

  const response = await pushAPI.fetchChatRequest({
    account: publicAddress,
    toDecrypt: true,
    pgpPrivateKey: pgpDecrpyptedPvtKey,
  });

  console.log("Push API response for getChatRequests(): ", response);
  return response;
}

// getConversationHash between PUBLIC_ADDRESS_1 and PUBLIC_ADDRESS_2
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

// getLatestChat between PUBLIC_ADDRESS_1 and PUBLIC_ADDRESS_2
async function getLatestChat(
  publicAddress: string,
  signer: ethers.Signer,
  publicAddress2: string
) {
  // Fetch user
  const user = await getUser(publicAddress);
  // Decrypt PGP Key
  const pgpDecrpyptedPvtKey = await pushAPI.getPgpPrivateKey({
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
    pgpPrivateKey: pgpDecrpyptedPvtKey,
  });

  console.log("Push API response for getLatestChat(): ", response);
}

// Chat history between PUBLIC_ADDRESS_1 and PUBLIC_ADDRESS_2
async function getChatHistory(
  publicAddress: string,
  signer: ethers.Signer,
  publicAddress2: string
) {
  // Fetch user
  const user = await getUser(publicAddress);

  // Decrypt PGP Key
  const pgpDecrpyptedPvtKey = await pushAPI.getPgpPrivateKey({
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
    pgpPrivateKey: pgpDecrpyptedPvtKey,
  });

  console.log("Push API response for getChatHistory(): ", response);
  return response;
}

// Send message
async function sendMessage(
  publicAddress: string,
  signer: ethers.Signe,
  publicAddress2: string
) {
  // Fetch user
  const user = await getUser(publicAddress);

  // Decrypt PGP Key
  const pgpDecrpyptedPvtKey = await pushAPI.getPgpPrivateKey({
    encryptedPGPPrivateKey: user.encryptedPrivateKey,
    signer: signer,
  });

  const response = await pushAPI.sendMessages({
    messageContent: "Hi from Push Chat!",
    messageType: "Text", // can be "Text" | "Image" | "File" | "GIF"
    receiverAddress: publicAddress2,
    signer: signer,
    pgpPrivateKey: pgpDecrpyptedPvtKey,
  });

  console.log("Push API response for sendMessage(): ", response);
  return response;
}

// Approve the chat request
async function approveChat(
  publicAddress: string,
  signer: ethers.Signer,
  publicAddress2: string
) {
  // Fetch user
  const user = await getUser(publicAddress);

  // Decrypt PGP Key
  const pgpDecrpyptedPvtKey = await pushAPI.getPgpPrivateKey({
    encryptedPGPPrivateKey: user.encryptedPrivateKey,
    signer: signer,
  });

  const approve = await pushAPI.approveRequest({
    status: "Approved",
    senderAddress: publicAddress2,
    signer: signer,
    pgpPrivateKey: pgpDecrpyptedPvtKey,
  });

  console.log("Push API response for approveChat(): ", approve);
}

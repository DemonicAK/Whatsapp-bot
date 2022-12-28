const qrcode = require("qrcode-terminal");

const fs = require("fs");

const { Client, LocalAuth, MessageMedia } = require("whatsapp-web.js");
const memes = require("random-memes");

const client = new Client({
  authStrategy: new LocalAuth(),
});

client.on("qr", (qr) => {
  qrcode.generate(qr, { small: true });
});

let chart = "A K";

client.on("ready", () => {
  console.log("Client is ready!");
  client.getChats().then((chats) => {
    const mychat = chats.find((chat) => chat.name === chart);
    console.log(mychat);
    mychat.sendMessage("Hello from NodeJS!");
  });
});

client.initialize();

client.on("message", (message) => {
  console.log(message.body);
});

client.on("message", async (message) => {
  // console.log(message.body);
  if (message.body === "Hi") {
    message.reply("Hello");
  } else if (message.body === "!meme") {
    // const imgurl = await memes.random();
    const imgurl = "https://picsum.photos/500/300?random=2";
    // message.reply("https://i.imgur.com/7Z1q4qE.jpg");
    const attachment = await MessageMedia.fromUrl(imgurl);
    client.sendMessage(message.from, message.reply(await attachment));
  }
});


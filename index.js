import { Client, GatewayIntentBits } from "discord.js";
import { ChatGPT } from "discord-chat-gpt";

//  Creating Client
const client = new Client({
    intents: [
        GatewayIntentBits.Guilds, // for guild
        GatewayIntentBits.GuildMembers, // for guild members
        GatewayIntentBits.GuildMessages, // for guild messages
        GatewayIntentBits.MessageContent, // to access message content from channel or member
    ],
    allowedMentions: {
        repliedUser: false, // Will not ping you in replies
    }
});

const gptClient = new ChatGPT({
    apiKey: "API_KEY_HERE",
    orgKey: "ORG_KEY_HERE",
});

// Checking if the bot is online
client.on("ready", () => {
    console.log(`> ${client.user.username} is Online!`);
});

// Chat bot system
client.on('messageCreate', async (message) => {
    if (!message.guild || message.author.bot) return;
    let channelID = "CHANNEL_ID_HERE";
    let channel = message.guild.channels.cache.get(channelID);
    if (!channel) return;
    
    if (message.channel.id === channel.id){
        let msg = await message.reply({
            content: `Loading...`,
        });
        let reply = await gptClient.chat(message.content, message.author.username); // Will return text
        msg.edit({
            content: `${reply}`
        });
    }
});

// Bot login
client.login(
    'DISCORD_BOT_TOKEN_HERE'
);


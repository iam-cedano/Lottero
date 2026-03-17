import "reflect-metadata";
import app from "@/app";
import { config, getParty } from "@/config";
import "@/container";

const PORT = config.port;

console.info("Starting Server!");

app.listen(PORT, () => {
  console.log(`🚀 Telegram Broadcast API is running on port ${PORT}`);
  if (!config.botToken)
    console.warn("⚠️  WARNING: TELEGRAM_BOT_TOKEN is not set.");
  if (!config.defaultChannelId)
    console.warn("⚠️  WARNING: TELEGRAM_CHANNEL_ID is not set.");
  if (config.apiSecretKey)
    console.log("🔒 API is protected with a secret key.");
});

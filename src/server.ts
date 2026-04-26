import "reflect-metadata";
import app from "@/app";
import { config } from "@/config";
import "@/container";

const PORT = config.port;

console.info("Starting Server!");

app.listen(PORT, () => {
  console.log(`🚀 Telegram Broadcast API is running on port ${PORT}`);
  if (!config.botToken)
    console.warn("⚠️  WARNING: TELEGRAM_BOT_TOKEN is not set.");
  else
    console.warn("✅ Telegram Bot Token is set.");
  if (config.apiSecretKey)
    console.log("🔒 API is protected with a secret key.");
});

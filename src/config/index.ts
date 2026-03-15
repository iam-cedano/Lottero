import dotenv from "dotenv";

dotenv.config();

export const config = {
  port: process.env.PORT || 3000,
  botToken: process.env.TELEGRAM_BOT_TOKEN,
  defaultChannelId: process.env.TELEGRAM_CHANNEL_ID,
  apiSecretKey: process.env.API_SECRET_KEY,
  authToken: process.env.AUTH_TOKEN,
  db: {
    host: process.env.DB_HOST || "localhost",
    port: parseInt(process.env.DB_PORT || "5432"),
    user: process.env.DB_USER || "lottero",
    password: process.env.DB_PASSWORD || "lottero_secret",
    name: process.env.DB_NAME || "lottero",
  },
};

export enum Actions {
  SEND_MESSAGE = "send_message",
  EDIT_MESSAGE = "edit_message",
  DELETE_MESSAGE = "delete_message",
  BET = "bet",
}

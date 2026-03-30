import { container } from "tsyringe";
import { pool } from "@/database";
import TelegramService from "@/services/telegram.service";

container.register("PgPool", { useValue: pool });

container.registerSingleton(TelegramService);

export default container;

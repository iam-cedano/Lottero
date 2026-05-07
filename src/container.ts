import { container } from "tsyringe";
import { pool } from "@/database";
import TelegramService from "@/services/telegram.service";
import Clock from "@/utils/clock.util";

container.register("PgPool", { useValue: pool });

container.registerSingleton(TelegramService);
container.registerSingleton(Clock);

export default container;

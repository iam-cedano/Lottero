import { container } from "tsyringe";
import { pool } from "@/database";
import OneWinBroadcastService from "@/services/casinos/OneWinBroadcast.service";
import OneWinAviatorService from "@/services/aviator/OneWin.service";

container.register("PgPool", { useValue: pool });

container.register("one_win_broadcast", { useClass: OneWinBroadcastService });
container.register("one_win_aviator", { useClass: OneWinAviatorService });

export default container;

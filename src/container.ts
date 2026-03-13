import { container } from "tsyringe";
import { pool } from "@/database";

import OneWinAviators from "@/services/strategies/onewin.aviators.namespace";
import OneWinBroadcasts from "@/services/broadcasts/onewin.broadcasts.namespace";
import OneWinGames from "./services/games/onewin.games.namespace";

container.register("PgPool", { useValue: pool });

container.registerSingleton("onewin", OneWinBroadcasts.GlobalService);

container.registerSingleton("onewin-aviator", OneWinGames.Aviator);

container.registerSingleton(
  "onewin-aviator-simple_strategy",
  OneWinAviators.SimpleStrategyService,
);

container.resolve("onewin");
container.resolve("onewin-aviator");
container.resolve("onewin-aviator-simple_strategy");

export default container;

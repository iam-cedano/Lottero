"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const tsyringe_1 = require("tsyringe");
const database_1 = require("./database");
const OneWinGroups_service_1 = __importDefault(require("./services/groups/OneWinGroups.service"));
const OneWin_simple_strategy_service_1 = __importDefault(require("./services/games/aviator/OneWin.simple-strategy.service"));
tsyringe_1.container.register("PgPool", { useValue: database_1.pool });
tsyringe_1.container.register("one_win_broadcast", { useClass: OneWinGroups_service_1.default });
tsyringe_1.container.register("one_win_aviator", { useClass: OneWin_simple_strategy_service_1.default });
exports.default = tsyringe_1.container;

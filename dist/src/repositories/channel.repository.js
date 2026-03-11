"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const pg_1 = require("pg");
const tsyringe_1 = require("tsyringe");
const base_repository_1 = __importDefault(require("../repositories/base.repository"));
let ChannelRepository = class ChannelRepository extends base_repository_1.default {
    constructor(pool) {
        super(pool, "channels");
    }
    async findByGroupId(groupId) {
        const result = await this.pool.query(`SELECT c.* FROM ${this.tableName} c JOIN channels_groups cg ON c.id = cg.channel_id WHERE cg.group_id = $1`, [groupId]);
        return result.rows;
    }
    async findByGroupIdAndLanguage(groupId, language) {
        const result = await this.pool.query(`SELECT c.* FROM ${this.tableName} c JOIN channels_groups cg ON c.id = cg.channel_id WHERE cg.group_id = $1 AND c.language = $2`, [groupId, language]);
        return result.rows[0] || null;
    }
    async findAllWithGroup() {
        const result = await this.pool.query(`SELECT c.*, 
        COALESCE(
          json_agg(
            json_build_object(
              'casino_id', g.casino_id, 
              'game_id', g.game_id, 
              'strategy', g.strategy, 
              'status', g.status
            )
          ) FILTER (WHERE g.id IS NOT NULL), '[]'
        ) as groups
       FROM ${this.tableName} c 
       LEFT JOIN channels_groups cg ON c.id = cg.channel_id 
       LEFT JOIN groups g ON cg.group_id = g.id
       GROUP BY c.id`);
        return result.rows.map((row) => {
            const channel = { ...row };
            if (channel.groups && channel.groups.length === 0) {
                delete channel.groups;
            }
            return channel;
        });
    }
    async findByIdWithGroup(id) {
        const result = await this.pool.query(`SELECT c.*, 
        COALESCE(
          json_agg(
            json_build_object(
              'casino_id', g.casino_id, 
              'game_id', g.game_id, 
              'strategy', g.strategy, 
              'status', g.status
            )
          ) FILTER (WHERE g.id IS NOT NULL), '[]'
        ) as groups
       FROM ${this.tableName} c 
       LEFT JOIN channels_groups cg ON c.id = cg.channel_id 
       LEFT JOIN groups g ON cg.group_id = g.id 
       WHERE c.id = $1
       GROUP BY c.id`, [id]);
        if (result.rows.length === 0)
            return null;
        const channel = { ...result.rows[0] };
        if (channel.groups && channel.groups.length === 0) {
            delete channel.groups;
        }
        return channel;
    }
};
ChannelRepository = __decorate([
    (0, tsyringe_1.injectable)(),
    __param(0, (0, tsyringe_1.inject)("PgPool")),
    __metadata("design:paramtypes", [pg_1.Pool])
], ChannelRepository);
exports.default = ChannelRepository;

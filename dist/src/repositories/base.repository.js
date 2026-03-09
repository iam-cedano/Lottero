"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class BaseRepository {
    pool;
    tableName;
    constructor(pool, tableName) {
        this.pool = pool;
        this.tableName = tableName;
    }
    async findAll() {
        const result = await this.pool.query(`SELECT * FROM ${this.tableName}`);
        return result.rows;
    }
    async findById(id) {
        const result = await this.pool.query(`SELECT * FROM ${this.tableName} WHERE id = $1`, [id]);
        return result.rows[0] ?? null;
    }
    async create(entity) {
        const keys = Object.keys(entity);
        const values = Object.values(entity);
        const placeholders = keys.map((_, i) => `$${i + 1}`).join(", ");
        // Safely quote column identifiers to prevent SQL injection
        const columns = keys
            .map((key) => `"${key.replace(/"/g, '""')}"`)
            .join(", ");
        const result = await this.pool.query(`INSERT INTO "${this.tableName}" (${columns}) VALUES (${placeholders}) RETURNING *`, values);
        return result.rows[0];
    }
    async update(id, entity) {
        const keys = Object.keys(entity);
        const values = Object.values(entity);
        // Safely quote column identifiers
        const setClause = keys
            .map((key, i) => `"${key.replace(/"/g, '""')}" = $${i + 1}`)
            .join(", ");
        const result = await this.pool.query(`UPDATE "${this.tableName}" SET ${setClause} WHERE id = $${keys.length + 1} RETURNING *`, [...values, id]);
        return result.rows[0] ?? null;
    }
    async delete(id) {
        const result = await this.pool.query(`DELETE FROM ${this.tableName} WHERE id = $1`, [id]);
        return (result.rowCount ?? 0) > 0;
    }
}
exports.default = BaseRepository;

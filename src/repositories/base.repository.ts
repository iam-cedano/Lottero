import { Pool } from "pg";
import { IRepository } from "@/repositories/repository.interface";
import ConflictException from "@/exceptions/conflict.exception";

export default abstract class BaseRepository<T> implements IRepository<T> {
  constructor(
    protected readonly pool: Pool,
    protected readonly tableName: string,
  ) {}

  async findAll(): Promise<T[]> {
    try {
      const result = await this.pool.query(`SELECT * FROM ${this.tableName}`);
      return result.rows;
    } catch (error) {
      throw new ConflictException((error as Error).message);
    }
  }

  async findById(id: string | number): Promise<T | null> {
    try {
      const result = await this.pool.query(
        `SELECT * FROM ${this.tableName} WHERE id = $1`,
        [id],
      );
      return result.rows[0] ?? null;
    } catch (error) {
      throw new ConflictException((error as Error).message);
    }
  }

  async create(entity: Partial<T>): Promise<T> {
    try {
      const keys = Object.keys(entity as object);
      const values = Object.values(entity as object);
      const placeholders = keys.map((_, i) => `$${i + 1}`).join(", ");
      // Safely quote column identifiers to prevent SQL injection
      const columns = keys
        .map((key) => `"${key.replace(/"/g, '""')}"`)
        .join(", ");

      const result = await this.pool.query(
        `INSERT INTO "${this.tableName}" (${columns}) VALUES (${placeholders}) RETURNING *`,
        values,
      );
      return result.rows[0];
    } catch (error) {
      throw new ConflictException((error as Error).message);
    }
  }

  async update(id: string | number, entity: Partial<T>): Promise<T | null> {
    try {
      const keys = Object.keys(entity as object);
      const values = Object.values(entity as object);
      // Safely quote column identifiers
      const setClause = keys
        .map((key, i) => `"${key.replace(/"/g, '""')}" = $${i + 1}`)
        .join(", ");

      const result = await this.pool.query(
        `UPDATE "${this.tableName}" SET ${setClause} WHERE id = $${keys.length + 1} RETURNING *`,
        [...values, id],
      );
      return result.rows[0] ?? null;
    } catch (error) {
      throw new ConflictException((error as Error).message);
    }
  }

  async delete(id: string | number): Promise<boolean> {
    try {
      const result = await this.pool.query(
        `DELETE FROM ${this.tableName} WHERE id = $1`,
        [id],
      );
      return (result.rowCount ?? 0) > 0;
    } catch (error) {
      throw new ConflictException((error as Error).message);
    }
  }
}

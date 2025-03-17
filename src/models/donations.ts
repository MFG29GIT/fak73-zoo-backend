import type { QueryConfig } from "pg";
import { pool } from "../clients/pool.js";
import type { DonationType } from "../schemas/donations.js";

export class Donation {
  static async findAll() {
    const result = await pool.query(`SELECT * FROM "Spende"`);
    return result.rows;
  }
  static async findById(id: string) {
    const query: QueryConfig = {
      text: `SELECT * FROM "Spende" WHERE id = $1`,
      values: [id],
    };

    const result = await pool.query(query);
    return result.rows;
  }
  static async insertDonation(newDonation: DonationType) {
    const query: QueryConfig = {
      text: `INSERT INTO "Spende"(spender,pdfUrl) VALUES($1, $2)`,
      values: [newDonation.donor, newDonation.pdfUrl],
    };

    const result = await pool.query(query);
    return result.rows[0];
  }
  static async deleteById(id: string) {
    const query: QueryConfig = {
      text: `DELETE FROM "Spende" WHERE id = $1`,
      values: [id],
    };

    const result = await pool.query(query);
    return result.rows;
  }
}

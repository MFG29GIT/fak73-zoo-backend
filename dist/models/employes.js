import { pool } from "../clients/pool.js";
import { HTTPException } from "hono/http-exception";
export class Employe {
    static async findAll() {
        const result = await pool.query(`SELECT * FROM "Personal"`);
        return result.rows;
    }
    static async findById(id) {
        const query = {
            text: `SELECT * FROM "Personal" WHERE id = $1`,
            values: [id],
        };
        const result = await pool.query(query);
        return result.rows;
    }
    static async insertEmploye(newEmploye) {
        const query = {
            text: `INSERT INTO "Personal"(name,rolle,gehalt) VALUES($1, $2, $3)`,
            values: [newEmploye.name, newEmploye.role, newEmploye.salary],
        };
        const result = await pool.query(query);
        return result.rows[0];
    }
    static async deleteById(id) {
        const query = {
            text: `DELETE FROM "Personal" WHERE id = $1`,
            values: [id],
        };
        const result = await pool.query(query);
        return result.rows;
    }
}

import type { QueryConfig } from "pg";
import { pool } from "../clients/pool.js";
import { HTTPException } from "hono/http-exception";
import type { AnimalType } from "../types.js";

export class Animal {
  static async findAll() {
    const result = await pool.query(`SELECT * FROM "Tier"`);
    return result.rows;
  }
  static async findById(id: string) {
    const query: QueryConfig = {
      text: `SELECT * FROM "Tier" WHERE id = $1`,
      values: [id],
    };

    const result = await pool.query(query);
    return result.rows;
  }
  static async insertAnimal(newAnimal: AnimalType) {
    const query: QueryConfig = {
      text: `INSERT INTO "Tier"(verpflegungskosten,name,geschlecht,art) VALUES($1, $2, $3, $4)`,
      values: [
        newAnimal.foodCost,
        newAnimal.name,
        newAnimal.gender,
        newAnimal.kind,
      ],
    };

    const result = await pool.query(query);
    return result.rows[0];
  }
  static async deleteById(id: string) {
    const query: QueryConfig = {
      text: `DELETE FROM "Tier" WHERE id = $1`,
      values: [id],
    };

    const result = await pool.query(query);
    return result.rows;
  }

  // Tier einem Gehege zuweisen
  // POST /animals/1/assign-compound?compoundId=1
  static async assignAnimal(animalId: number, enclosureId: number) {
    // Zuerst prüfen, ob das Tier existiert
    const animalQueryResult = await pool.query(
      'SELECT * FROM "Tier" WHERE id = $1',
      [animalId]
    );
    if (animalQueryResult.rowCount === 0) {
      throw new HTTPException(404, {
        message: `Animal with id ${animalId} does not exist!`,
      });
    }

    // Prüfen, ob das Gehege existiert
    const compoundQueryResult = await pool.query(
      'SELECT * FROM "Gehege" WHERE id = $1',
      [enclosureId]
    );
    if (compoundQueryResult.rowCount === 0) {
      throw new HTTPException(404, {
        message: `Compound with id ${enclosureId} does not exist!`,
      });
    }

    // Das Tier im Gehege zuweisen (Update)
    const updateResult = await pool.query(
      'UPDATE "Tier" SET gehege_id = $1 WHERE id = $2 RETURNING *',
      [enclosureId, animalId]
    );

    // Falls kein Tier aktualisiert wurde
    if (updateResult.rowCount === 0) {
      throw new HTTPException(400, {
        message: "Failed to assign animal to compound",
      });
    }

    // Rückgabe des aktualisierten Tiers
    return updateResult.rows[0];
  }

  // Tier einem Tierarzt zuweisen
  static async assignVet(animalId: number, personalId: number) {
    // Zuerst prüfen ob das Tier existiert
    const animalQueryResult = await pool.query(
      'SELECT * FROM "Tier" WHERE id = $1',
      [animalId]
    );
    if (animalQueryResult.rowCount === 0) {
      throw new HTTPException(404, {
        message: `Animal with id ${animalId} does not exist!`,
      });
    }

    // Prüfen ob die Pernonal Id ein Tierarzt ist
    const veterinarianQueryResult = await pool.query(
      `SELECT * FROM "Personal" WHERE id = $1 AND rolle = $2`,
      [personalId, "Tierarzt"]
    );
    if (veterinarianQueryResult.rowCount === 0) {
      throw new HTTPException(404, {
        message: `Veterinarian with id ${personalId} does not exist!`,
      });
    }

    // Prüfen, ob der Tierarzt weniger als 25 Tiere hat
    const vetAnimalCountResult = await pool.query(
      `SELECT COUNT(*) FROM "Tier" WHERE tierarzt_id = $1`,
      [personalId]
    );

    const assignedAnimalCount = Number(vetAnimalCountResult.rows[0].count);
    if (assignedAnimalCount >= 25) {
      throw new HTTPException(400, {
        message: `Veterinarian with id ${personalId} already have 25 animals assigned!`,
      });
    }

    // Tierarzt zuweisen
    const updateResult = await pool.query(
      'UPDATE "Tier" SET tierarzt_id = $1 WHERE id = $2 RETURNING *',
      [personalId, animalId]
    );

    // Falls kein Tier aktualisiert wurde
    if (updateResult.rowCount === 0) {
      throw new HTTPException(400, {
        message: "Failed to assign animal to veterinarian",
      });
    }

    // Rückgabe des aktualisierten Tiers
    return updateResult.rows[0];
  }
}

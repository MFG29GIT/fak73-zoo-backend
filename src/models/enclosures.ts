import type { QueryConfig } from "pg";
import type {
  AnimalType,
  EnclosureType,
  patchEnclosureBody,
  StaffType,
} from "../types.js";
import { pool } from "../clients/pool.js";

export class Enclosure {
  static async findAll() {
    const result = await pool.query(`SELECT * FROM "Gehege"`);
    return result.rows;
  }
  static async findById(id: string) {
    const query: QueryConfig = {
      text: `SELECT * FROM "Gehege" WHERE id = $1`,
      values: [id],
    };

    const result = await pool.query(query);
    return result.rows;
  }
  static async insertEmploye(newEnclosure: EnclosureType) {
    const query: QueryConfig = {
      text: `INSERT INTO "Gehege"(name,groesse,kosten) VALUES($1, $2, $3)`,
      values: [newEnclosure.name, newEnclosure.size, newEnclosure.cost],
    };

    const result = await pool.query(query);
    return result.rows[0];
  }
  static async deleteById(id: string) {
    const query: QueryConfig = {
      text: `DELETE FROM "Gehege" WHERE id = $1`,
      values: [id],
    };

    const result = await pool.query(query);
    return result.rows;
  }

  static async patchEnclosure(id: string, patchBody: patchEnclosureBody) {
    const enclosureQueryResult = await pool.query(
      'SELECT * FROM "Gehege" WHERE id = $1',
      [id]
    );
    const enclosureFromDatabase = enclosureQueryResult.rows[0];

    const patchObject = {
      name: patchBody.name,
      size: patchBody.size,
      uokeepCost: patchBody.upkeepCost,
    };

    const updateBody = {
      ...enclosureFromDatabase,
      ...patchObject,
    };

    const updateResult = await pool.query(
      'UPDATE "Gehege" SET name=$1, groesse=$2, kosten=$3 WHERE id=$4',
      [updateBody.name, updateBody.size, updateBody.updateBody, id]
    );
    console.log("Update von Gehege Werten: ", updateResult.rows);

    const relationQueryResult = await pool.query(
      'SELECT * FROM "Personal_Gehege" WHERE gehege_id=$1',
      [id]
    );

    const insertIdArray: number[] = [];
    const caretakerIdsInDatabase = relationQueryResult.rows.map(
      (row) => row.personal.id
    );
    patchBody.assignedCaretakers?.forEach((caretakerId: number) => {
      if (!caretakerIdsInDatabase.includes(id)) {
        pool.query(
          'INSERT INTO "Personal_Gehege" (gehege_id, tierpfleger_id) VALUES ($1,$2)',
          [id, caretakerId]
        );
      }
    });

    return relationQueryResult.rows;
  }
}

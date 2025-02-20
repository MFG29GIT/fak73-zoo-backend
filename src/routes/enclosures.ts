import { Hono } from "hono";
import { Enclosure } from "../models/enclosures.js";
import { pool } from "../clients/pool.js";
import type { patchEnclosureBody } from "../../types.js";

export const enclosure = new Hono();

// Alle Tiere abrufen
enclosure.get("/", async (c) => {
  try {
    const enclosures = await Enclosure.findAll();
    return c.json({ data: enclosures }, 200);
  } catch (err) {
    console.error("❌ Fehler beim Abrufen der Gehege:", err);
    return c.json({ message: "Fehler beim Abrufen der Gehege" }, 500);
  }
});

// Tier mit ID abrufen
enclosure.get("/:id", async (c) => {
  try {
    const { id } = c.req.param();
    const enclosure = await Enclosure.findById(id);

    if (!enclosure) {
      return c.json({ message: `Kein Gehege mit ID ${id} gefunden` }, 404);
    }

    return c.json({ data: enclosure }, 200);
  } catch (err) {
    console.error("❌ Fehler beim Abrufen des Geheges mit ID:", err);
    return c.json({ message: "Fehler beim Abrufen des Geheges" }, 500);
  }
});

// Neues Tier einfügen
enclosure.post("/insertEn", async (c) => {
  try {
    const body = await c.req.json();
    const newEnclosure = await Enclosure.insertEmploye(body);

    return c.json({ data: newEnclosure }, 201);
  } catch (err) {
    console.error("❌ Fehler beim Einfügen:", err);
    return c.json({ message: "Fehler beim Einfügen des Geheges" }, 500);
  }
});

// Tier Löschen(verstorben)
enclosure.delete("/:id", async (c) => {
  try {
    const { id } = c.req.param();
    const newEnclosure = await Enclosure.deleteById(id);

    return c.json({ data: newEnclosure }, 201);
  } catch (err) {
    console.error("❌ Fehler beim Löschen:", err);
    return c.json({ message: "Fehler beim Löschen des Geheges" }, 500);
  }
});

// Patch body
enclosure.patch("/:id", async (c) => {
  try {
    const { id } = c.req.param();
    const patchBody = (await c.req.json()) as patchEnclosureBody;

    const patchedEnclosure = await Enclosure.patchEnclosure(id, patchBody);
  } catch (err) {
    console.error("❌ Fehler beim bearbeiten des Geheges:", err);
    return c.json({ message: "Fehler beim bearbeiten des Geheges" }, 500);
  }
});

import { Hono } from "hono";
import { Enclosure } from "../models/enclosures.js";
import { pool } from "../clients/pool.js";
import { EnclosureSchema } from "../schemas/enclosures.js";
import {
  PatchEnclosureBodySchema,
  type PatchEnclosureBodyType,
} from "../schemas/patchEnclosureBody.js";

export const enclosure = new Hono();

// Alle Enclosures abrufen
enclosure.get("/", async (c) => {
  try {
    const enclosures = await Enclosure.findAll();
    return c.json({ data: enclosures }, 200);
  } catch (err) {
    console.error("❌ Fehler beim Abrufen der Gehege:", err);
    return c.json({ message: "Fehler beim Abrufen der Gehege" }, 500);
  }
});

// Enclosure mit ID abrufen
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

// Neues Enclosure einfügen
enclosure.post("/insertEn", async (c) => {
  try {
    const body = await c.req.json();
    const result = EnclosureSchema.safeParse(body);

    if (result.success === false) {
      return c.json({ error: result.error.flatten().fieldErrors });
    }

    const newEnclosure = await Enclosure.insertEnclosure(result.data);
    return c.json({ data: newEnclosure }, 201);
  } catch (error) {
    console.error(error);
    if (error instanceof SyntaxError) {
      return c.json({ error: "Well, thats not JSON my friend." });
    }
    // not handled errors
    return c.json({ error: "Oh Snap. Server Error" });
  }
});

// Enclosure Löschen(verstorben)
enclosure.delete("/:id", async (c) => {
  try {
    const { id } = c.req.param();
    const newEnclosure = await Enclosure.deleteById(id);

    return c.json({ data: newEnclosure }, 201);
  } catch (error) {
    console.error(error);
    if (error instanceof SyntaxError) {
      return c.json({ error: "Well, thats not JSON my friend." });
    }
    // not handled errors
    return c.json({ error: "Oh Snap. Server Error" });
  }
});

// Patch body
enclosure.patch("/:id", async (c) => {
  try {
    const { id } = c.req.param();
    const patchBody = await c.req.json();

    const result = PatchEnclosureBodySchema.safeParse(patchBody);

    if (result.success === false) {
      return c.json({ error: result.error.flatten().fieldErrors });
    }
    // Here we got safe valid data!

    const patchedEnclosure = await Enclosure.patchEnclosure(id, result.data);
  } catch (error) {
    console.error(error);
    if (error instanceof SyntaxError) {
      return c.json({ error: "Well, thats not JSON my friend." });
    }
    // not handled errors
    return c.json({ error: "Oh Snap. Server Error" });
  }
});

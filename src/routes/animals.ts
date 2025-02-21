import { Hono } from "hono";
import { Animal } from "../models/animals.js";

export const animal = new Hono();

// Alle Tiere abrufen
animal.get("/", async (c) => {
  try {
    const animals = await Animal.findAll();
    return c.json({ data: animals }, 200);
  } catch (err) {
    console.error("❌ Fehler beim Abrufen der Tiere:", err);
    return c.json({ message: "Fehler beim Abrufen der Tiere" }, 500);
  }
});

// Tier mit ID abrufen
animal.get("/:id", async (c) => {
  try {
    const { id } = c.req.param();
    const animal = await Animal.findById(id);

    if (!animal) {
      return c.json({ message: `Kein Tier mit ID ${id} gefunden` }, 404);
    }

    return c.json({ data: animal }, 200);
  } catch (err) {
    console.error("❌ Fehler beim Abrufen eines Tieres mit ID:", err);
    return c.json({ message: "Fehler beim Abrufen des Tieres" }, 500);
  }
});

// Neues Tier einfügen
animal.post("/insertAn", async (c) => {
  try {
    const body = await c.req.json();
    const newAnimal = await Animal.insertAnimal(body);

    return c.json({ data: newAnimal }, 201);
  } catch (err) {
    console.error("❌ Fehler beim Einfügen:", err);
    return c.json({ message: "Fehler beim Einfügen des Tieres" }, 500);
  }
});

// Tier Löschen(verstorben)
animal.delete("/:id", async (c) => {
  try {
    const { id } = c.req.param();
    const newAnimal = await Animal.deleteById(id);

    return c.json({ data: newAnimal }, 201);
  } catch (err) {
    console.error("❌ Fehler beim Löschen:", err);
    return c.json({ message: "Fehler beim Löschen des Tieres" }, 500);
  }
});

// Tier einem Gehege zuweisen
animal.post("/:id/assign-compound", async (c) => {
  try {
    const id = Number(c.req.param().id);
    const enclosureId = Number(c.req.query("compoundId"));

    if (isNaN(enclosureId)) {
      return c.json(
        { message: "Query parameter 'compoundId' must be a valid number" },
        400
      );
    }

    const updatedAnimal = await Animal.assignAnimal(id, enclosureId);

    return c.json({ data: updatedAnimal }, 200);
  } catch (err) {
    console.error("❌ Fehler beim Zuweisen des Tiers:", err);
    return c.json({ message: "Fehler beim Zuweisen des Tieres" }, 500);
  }
});

// Tier einem Tierarzt zuweisen
animal.post("/:id/assign-veterinarian", async (c) => {
  try {
    const id = Number(c.req.param().id);
    const personalId = Number(c.req.query("personalId"));

    if (isNaN(personalId)) {
      return c.json(
        { message: "Query parameter 'personalId' must be a valid number" },
        400
      );
    }

    const updatedAnimal = await Animal.assignVet(id, personalId);
    return c.json({ data: updatedAnimal }, 200);
  } catch (err) {
    console.error("❌ Fehler beim Zuweisen des Tierarztes:", err);
    return c.json({ message: "Fehler beim Zuweisen des Tierarztes" }, 500);
  }
});

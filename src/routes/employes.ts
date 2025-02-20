import { Hono } from "hono";
import { Employe } from "../models/employes.js";

export const employe = new Hono();

// Alle Tiere abrufen
employe.get("/", async (c) => {
  try {
    const employes = await Employe.findAll();
    return c.json({ data: employes }, 200);
  } catch (err) {
    console.error("❌ Fehler beim Abrufen der Mitarbeiter:", err);
    return c.json({ message: "Fehler beim Abrufen der Mitarbeiter" }, 500);
  }
});

// Tier mit ID abrufen
employe.get("/:id", async (c) => {
  try {
    const { id } = c.req.param();
    const employe = await Employe.findById(id);

    if (!employe) {
      return c.json({ message: `Kein Mitarbeiter mit ID ${id} gefunden` }, 404);
    }

    return c.json({ data: employe }, 200);
  } catch (err) {
    console.error("❌ Fehler beim Abrufen eines Mitarbeiters mit ID:", err);
    return c.json({ message: "Fehler beim Abrufen des Mitarbeiters" }, 500);
  }
});

// Neues Tier einfügen
employe.post("/insertEmp", async (c) => {
  try {
    const body = await c.req.json();
    const newEmploye = await Employe.insertEmploye(body);

    return c.json({ data: newEmploye }, 201);
  } catch (err) {
    console.error("❌ Fehler beim Einfügen:", err);
    return c.json({ message: "Fehler beim Einfügen des Mitarbeiters" }, 500);
  }
});

// Tier Löschen(verstorben)
employe.delete("/:id", async (c) => {
  try {
    const { id } = c.req.param();
    const newEmploye = await Employe.deleteById(id);

    return c.json({ data: newEmploye }, 201);
  } catch (err) {
    console.error("❌ Fehler beim Löschen:", err);
    return c.json({ message: "Fehler beim Löschen des Mitarbeiters" }, 500);
  }
});

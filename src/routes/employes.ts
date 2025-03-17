import { Hono } from "hono";
import { Employe } from "../models/employes.js";
import { EmployeSchema } from "../schemas/employe.js";

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
    const result = EmployeSchema.safeParse(body);

    if (result.success === false) {
      return c.json({ error: result.error.flatten().fieldErrors });
    }
    // Here we got safe valid data!

    const newEmploye = await Employe.insertEmploye(result.data);

    return c.json({ data: newEmploye }, 201);
  } catch (error) {
    console.error(error);
    if (error instanceof SyntaxError) {
      return c.json({ error: "Well, thats not JSON my friend." });
    }
    // not handled errors
    return c.json({ error: "Oh Snap. Server Error" });
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

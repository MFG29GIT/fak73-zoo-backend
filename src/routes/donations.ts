import { Hono } from "hono";
import { Animal } from "../models/animals.js";
import { DonationSchema } from "../schemas/donations.js";
import { Donation } from "../models/donations.js";

export const donations = new Hono();

// Alle Spenden abrufen
donations.get("/", async (c) => {
  try {
    const donations = await Donation.findAll();
    return c.json({ data: donations }, 200);
  } catch (err) {
    console.error("❌ Fehler beim Abrufen der Spenden:", err);
    return c.json({ message: "Fehler beim Abrufen der Spenden" }, 500);
  }
});

// Spende mit ID abrufen
donations.get("/:id", async (c) => {
  try {
    const { id } = c.req.param();
    const donation = await Donation.findById(id);

    if (!donation) {
      return c.json({ message: `Keine Spende mit ID ${id} gefunden` }, 404);
    }

    return c.json({ data: donation }, 200);
  } catch (err) {
    console.error("❌ Fehler beim Abrufen einer Spende mit ID:", err);
    return c.json({ message: "Fehler beim Abrufen der Spende" }, 500);
  }
});

// Neue Spende einfügen
donations.post("/insertDon", async (c) => {
  try {
    const body = await c.req.json();
    const result = DonationSchema.safeParse(body);

    if (result.success === false) {
      return c.json({
        errors: result.error.flatten().fieldErrors,
      });
    }
    // Data ist valid here

    const newDonation = await Donation.insertDonation(body);

    return c.json({ data: newDonation }, 201);
  } catch (err) {
    console.error("❌ Fehler beim Einfügen:", err);
    return c.json({ message: "Fehler beim Einfügen des Tieres" }, 500);
  }
});

// Tier Löschen(verstorben)
donations.delete("/:id", async (c) => {
  try {
    const { id } = c.req.param();
    const newDonation = await Donation.deleteById(id);

    return c.json({ data: newDonation }, 201);
  } catch (err) {
    console.error("❌ Fehler beim Löschen:", err);
    return c.json({ message: "Fehler beim Löschen der Spende" }, 500);
  }
});

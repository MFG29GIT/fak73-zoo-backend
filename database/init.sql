CREATE TYPE "geschlecht" AS ENUM (
  'maennlich',
  'weiblich'
);
 
CREATE TYPE "rolle" AS ENUM (
  'Tierpfleger',
  'Tierarzt',
  'Verkaeufer',
  'Normal'
);
 
CREATE TABLE "Gehege" (
  "id" serial PRIMARY KEY,
  "name" text,
  "groesse" numeric,
  "kosten" numeric
);
 
CREATE TABLE "Tier" (
  "id" serial PRIMARY KEY,
  "verpflegungskosten" numeric,
  "name" text,
  "geburtsdatum" date,
  "geschlecht" Geschlecht,
  "art" text,
  "tierarzt_id" integer,
  "gehege_id" integer
);
 
CREATE TABLE "Personal" (
  "id" serial PRIMARY KEY,
  "name" text,
  "rolle" Rolle,
  "gehalt" numeric
);
 
CREATE TABLE "Personal_Gehege" (
  "gehege_id" integer NOT NULL,
  "tierpfleger_id" integer NOT NULL
);
 
CREATE TABLE "Zoo" (
  "id" serial PRIMARY KEY,
  "eintrittspreis" numeric,
  "kontostand" numeric
);
 
CREATE TABLE "Verkaufsstand" (
  "id" serial PRIMARY KEY,
  "produktart" text,
  "profit" numeric,
  "verkauefer_id" integer
);
 
CREATE TABLE "Umsatz" (
  "id" serial PRIMARY KEY,
  "wert" numeric,
  "datum" date,
  "stand_id" integer,
  "spende_id" integer,
  "is_eintritt" boolean
);
 
CREATE TABLE "Spende" (
  "id" serial PRIMARY KEY,
  "spender" text,
  "pdf_url" text
);
 
ALTER TABLE "Tier" ADD FOREIGN KEY ("tierarzt_id") REFERENCES "Personal" ("id");
 
ALTER TABLE "Tier" ADD FOREIGN KEY ("gehege_id") REFERENCES "Gehege" ("id");
 
ALTER TABLE "Personal_Gehege" ADD FOREIGN KEY ("gehege_id") REFERENCES "Gehege" ("id");
 
ALTER TABLE "Personal_Gehege" ADD FOREIGN KEY ("tierpfleger_id") REFERENCES "Personal" ("id");
 
ALTER TABLE "Verkaufsstand" ADD FOREIGN KEY ("verkauefer_id") REFERENCES "Personal" ("id");
 
ALTER TABLE "Umsatz" ADD FOREIGN KEY ("stand_id") REFERENCES "Verkaufsstand" ("id");
 
ALTER TABLE "Umsatz" ADD FOREIGN KEY ("spende_id") REFERENCES "Spende" ("id");


-- Zoo Kontostand & Eintritt
INSERT INTO "Zoo" ("id", "kontostand", "eintrittspreis") VALUES (DEFAULT, 50000, 39.99);

-- Personal
INSERT INTO "Personal" ("id", "name", "rolle", "gehalt") VALUES
(DEFAULT, 'Dr. Müller', 'Tierarzt', 4500),
(DEFAULT, 'Dr. Schmidt', 'Tierarzt', 4700),
(DEFAULT, 'Anna Becker', 'Tierpfleger', 2800),
(DEFAULT, 'Tom Wagner', 'Tierpfleger', 2900),
(DEFAULT, 'Sophie Klein', 'Tierpfleger', 2750),
(DEFAULT, 'Lena Hofmann', 'Verkaeufer', 2500),
(DEFAULT, 'Max Fischer', 'Verkaeufer', 2600);

-- Gehege
INSERT INTO "Gehege" ("id", "name", "groesse", "kosten") VALUES
(DEFAULT, 'Affengehege', 100, 950),
(DEFAULT, 'Löwengehege', 250, 1500),
(DEFAULT, 'Elefantengehege', 300, 1700),
(DEFAULT, 'Giraffengehege', 200, 1200),
(DEFAULT, 'Zebra-Gehege', 180, 1100),
(DEFAULT, 'Pinguinbecken', 90, 800),
(DEFAULT, 'Känguru-Gehege', 70, 600);

-- Personal_Gehege Zuordnung (Tierpfleger)
INSERT INTO "Personal_Gehege" ("gehege_id", "tierpfleger_id") VALUES
(1, 3),
(2, 4),
(3, 5),
(4, 3),
(5, 4),
(6, 5),
(7, 3);

-- Tiere
INSERT INTO "Tier" ("id", "verpflegungskosten", "name", "geburtsdatum", "geschlecht", "art", "tierarzt_id", "gehege_id") VALUES
(DEFAULT, 150, 'Bobo', '2020-06-01', 'maennlich', 'Affe', 1, 1),
(DEFAULT, 160, 'Charlie', '2019-07-12', 'maennlich', 'Affe', 1, 1),
(DEFAULT, 250, 'Simba', '2018-05-10', 'maennlich', 'Löwe', 2, 2),
(DEFAULT, 240, 'Nala', '2018-05-15', 'weiblich', 'Löwe', 2, 2),
(DEFAULT, 500, 'Dumbo', '2015-08-23', 'maennlich', 'Elefant', 1, 3),
(DEFAULT, 520, 'Elsa', '2016-09-30', 'weiblich', 'Elefant', 1, 3),
(DEFAULT, 350, 'Melman', '2017-04-19', 'maennlich', 'Giraffe', 2, 4),
(DEFAULT, 300, 'Gloria', '2021-01-25', 'weiblich', 'Zebra', 1, 5),
(DEFAULT, 310, 'Marty', '2021-03-02', 'maennlich', 'Zebra', 1, 5),
(DEFAULT, 100, 'Pingo', '2022-05-05', 'maennlich', 'Pinguin', 2, 6),
(DEFAULT, 110, 'Skipper', '2022-06-10', 'maennlich', 'Pinguin', 2, 6),
(DEFAULT, 200, 'Joey', '2020-11-12', 'maennlich', 'Känguru', 1, 7);

-- Verkaufsstände
INSERT INTO "Verkaufsstand" ("id", "produktart", "profit", "verkauefer_id") VALUES
(DEFAULT, 'Eis', 700, 6),
(DEFAULT, 'Burger', 800, 7),
(DEFAULT, 'Infokarte', 300, 6),
(DEFAULT, 'Regenschirm', 500, 7);

-- Umsätze
INSERT INTO "Umsatz" ("id", "wert", "datum", "stand_id", "spende_id", "is_eintritt") VALUES
(DEFAULT, 2000, '2025-02-01', NULL, NULL, TRUE),
(DEFAULT, 1500, '2025-02-02', NULL, NULL, TRUE),
(DEFAULT, 800, '2025-02-02', 1, NULL, FALSE),
(DEFAULT, 1200, '2025-02-03', 2, NULL, FALSE),
(DEFAULT, 1800, '2025-02-04', NULL, NULL, TRUE),
(DEFAULT, 1300, '2025-02-05', 3, NULL, FALSE),
(DEFAULT, 500, '2025-02-06', 4, NULL, FALSE);

-- Spenden
INSERT INTO "Spende" ("id", "spender", "pdf_url") VALUES
(DEFAULT, 'Max Mustermann', 'beleg1.pdf'),
(DEFAULT, 'Lisa Beispiel', 'beleg2.pdf'),
(DEFAULT, 'Karl Test', 'beleg3.pdf'),
(DEFAULT, 'Zoe Musterfrau', 'beleg4.pdf'),
(DEFAULT, 'Ben Experiment', 'beleg5.pdf');

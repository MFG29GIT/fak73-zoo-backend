export type patchEnclosureBody = {
  name?: string;
  size?: number;
  upkeepCost?: number;
  assignedCaretakers?: number[];
};

export type EnclosureType = {
  id: number;
  name: string;
  size: number;
  cost: number;
};

export type AnimalType = {
  id: number;
  foodCost: number;
  name: string;
  birthDate: Date;
  gender: Gender;
  kind: string;
  veterinarianId: number | null;
  enclosureId: number | null;
};

export type StaffType = {
  id: number;
  name: string;
  role: Role;
  salary: number;
};

export type StaffEnclosureType = {
  enclosureId: number;
  caretakerId: number;
};

export type ZooType = {
  id: number;
  admissionPrice: number;
  accountBalance: number;
};

export type ShopType = {
  id: number;
  productType: string;
  profit: number;
  sellerId: number | null;
};

export type RevenueType = {
  id: number;
  amount: number;
  date: Date;
  shopId: number | null;
  donationId: number | null;
  isAdmission: boolean;
};

export type DonationType = {
  id: number;
  donor: string;
  pdfUrl: string;
};

export type Gender = "maennlich" | "weiblich" | "Unknown";

export type Role = "Tierarzt" | "Tierpfleger" | "Verkäufer" | "Normal";

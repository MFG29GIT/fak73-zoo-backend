
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

export type Gender = "maennlich" | "weiblich" | "Unknown";

export type Role = "Tierarzt" | "Tierpfleger" | "Verkäufer" | "Normal";

import type { Company } from "@/types/emissions";

export const companies: Company[] = [
  {
    id: "c1",
    name: "Acme Manufacturing",
    country: "US",
    emissions: [
      { yearMonth: "2025-01", source: "diesel", emissions: 120 },
      { yearMonth: "2025-01", source: "electricity", emissions: 210 },
      { yearMonth: "2025-02", source: "diesel", emissions: 108 },
      { yearMonth: "2025-02", source: "electricity", emissions: 198 },
      { yearMonth: "2025-03", source: "lpg", emissions: 92 },
    ],
  },
  {
    id: "c2",
    name: "Globex Logistics",
    country: "DE",
    emissions: [
      { yearMonth: "2025-01", source: "gasoline", emissions: 84 },
      { yearMonth: "2025-01", source: "diesel", emissions: 156 },
      { yearMonth: "2025-02", source: "gasoline", emissions: 91 },
      { yearMonth: "2025-02", source: "diesel", emissions: 149 },
      { yearMonth: "2025-03", source: "electricity", emissions: 130 },
    ],
  },
  {
    id: "c3",
    name: "HanRiver Foods",
    country: "KR",
    emissions: [
      { yearMonth: "2025-01", source: "lpg", emissions: 72 },
      { yearMonth: "2025-01", source: "electricity", emissions: 188 },
      { yearMonth: "2025-02", source: "lpg", emissions: 76 },
      { yearMonth: "2025-02", source: "electricity", emissions: 174 },
      { yearMonth: "2025-03", source: "diesel", emissions: 69 },
    ],
  },
  {
    id: "c4",
    name: "Manila Retail Group",
    country: "PH",
    emissions: [
      { yearMonth: "2025-01", source: "electricity", emissions: 142 },
      { yearMonth: "2025-01", source: "gasoline", emissions: 58 },
      { yearMonth: "2025-02", source: "electricity", emissions: 151 },
      { yearMonth: "2025-02", source: "gasoline", emissions: 62 },
      { yearMonth: "2025-03", source: "diesel", emissions: 80 },
    ],
  },
  {
    id: "c5",
    name: "Pacific Cement Works",
    country: "US",
    emissions: [
      { yearMonth: "2025-01", source: "coal", emissions: 260 },
      { yearMonth: "2025-01", source: "diesel", emissions: 118 },
      { yearMonth: "2025-02", source: "coal", emissions: 248 },
      { yearMonth: "2025-02", source: "electricity", emissions: 203 },
      { yearMonth: "2025-03", source: "lpg", emissions: 97 },
    ],
  },
];

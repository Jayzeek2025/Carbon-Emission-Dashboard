export type EmissionTheme = "green" | "orange" | "red";

export function getEmissionTheme(totalEmissions: number): EmissionTheme {
  if (totalEmissions <= 5000) {
    return "green";
  }

  if (totalEmissions <= 15000) {
    return "orange";
  }

  return "red";
}

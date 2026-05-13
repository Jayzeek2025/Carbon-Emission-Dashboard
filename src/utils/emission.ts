import type {
  Company,
  Country,
  GhgEmission,
} from "@/types/emissions";

export function getTotalEmissions(companies: Company[]) {
  return companies.reduce((companyTotal, company) => {
    return (
      companyTotal +
      company.emissions.reduce((emissionTotal, emission) => {
        return emissionTotal + emission.emissions;
      }, 0)
    );
  }, 0);
}

export function getCompanyTotalEmissions(company: Company) {
  return company.emissions.reduce((total, emission) => {
    return total + emission.emissions;
  }, 0);
}

export function getHighestEmittingCompany(companies: Company[]) {
  if (companies.length === 0) {
    return null;
  }

  return companies.reduce((highest, current) => {
    return getCompanyTotalEmissions(current) >
      getCompanyTotalEmissions(highest)
      ? current
      : highest;
  });
}

export function getLowestEmittingCompany(companies: Company[]) {
  if (companies.length === 0) {
    return null;
  }

  return companies.reduce((lowest, current) => {
    return getCompanyTotalEmissions(current) <
      getCompanyTotalEmissions(lowest)
      ? current
      : lowest;
  });
}

export function getMonthlyTotals(emissions: GhgEmission[]) {
  const monthlyTotals: Record<string, number> = {};

  emissions.forEach((emission) => {
    const existingValue =
      monthlyTotals[emission.yearMonth] ?? 0;

    monthlyTotals[emission.yearMonth] =
      existingValue + emission.emissions;
  });

  return monthlyTotals;
}

export function getEmissionsBySource(
  emissions: GhgEmission[],
) {
  const sourceTotals: Record<string, number> = {};

  emissions.forEach((emission) => {
    const existingValue =
      sourceTotals[emission.source] ?? 0;

    sourceTotals[emission.source] =
      existingValue + emission.emissions;
  });

  return sourceTotals;
}

export function getMonthlyChangePercentage(
  currentMonth: number,
  previousMonth: number,
) {
  if (previousMonth === 0) {
    return 0;
  }

  return (
    ((currentMonth - previousMonth) /
      previousMonth) *
    100
  );
}

export function getCountryName(
  code: string,
  countries: Country[],
) {
  const country = countries.find(
    (country) => country.code === code,
  );

  return country?.name ?? code;
}
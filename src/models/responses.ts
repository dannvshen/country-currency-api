export interface CountryResponse {
  fullName: string;
  population: number;
  currencies: Currency[];
}

export interface Currency {
  code: string;
  name: string;
  symbol: string;
  exchangeRateToSEK: number | undefined;
}

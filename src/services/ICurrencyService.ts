import { ExchangeRates } from '../models';

interface ICurrencyService {
  getUniqueCurrencyString(currencyCodes: string[]): string;
  getExchangeRates(currencyCodes: string): Promise<ExchangeRates>;
  getExchangeRateToSET(
    currencyCode: string,
    euroExchangeRateToSEK: number,
    allRates: {
      [key: string]: number;
    }
  ): number | undefined;
}

export default ICurrencyService;

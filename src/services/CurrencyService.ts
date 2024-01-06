import { inject, injectable } from 'inversify';
import ICurrencyService from './ICurrencyService';
import { ExchangeRates } from '../models';
import axios, { AxiosResponse } from 'axios';
import SERVICE_IDENTIFIERS from '../config/serviceIdentifiers';

@injectable()
class CurrencyService implements ICurrencyService {
  private API_ENDPOINT_FIXER: string;
  private API_KEY_FIXER: string;
  private SEK: string;

  constructor(
    @inject(SERVICE_IDENTIFIERS.API_ENDPOINT_FIXER) API_ENDPOINT_FIXER: string,
    @inject(SERVICE_IDENTIFIERS.API_KEY_FIXER) API_KEY_FIXER: string,
    @inject(SERVICE_IDENTIFIERS.SEK) SEK: string
  ) {
    this.API_ENDPOINT_FIXER = API_ENDPOINT_FIXER;
    this.API_KEY_FIXER = API_KEY_FIXER;
    this.SEK = SEK;
  }

  getUniqueCurrencyString(currencyCodes: string[]): string {
    const uniqueCurrencies = currencyCodes.filter((value, index, array) => array.indexOf(value) === index);

    if (!uniqueCurrencies.includes(this.SEK)) {
      uniqueCurrencies.push(this.SEK);
    }

    return uniqueCurrencies.join(',');
  }

  async getExchangeRates(currencyCodes: string): Promise<ExchangeRates> {
    const fixerRes: AxiosResponse<ExchangeRates> = await axios.get(
      `${this.API_ENDPOINT_FIXER}?access_key=${this.API_KEY_FIXER}&symbols=${currencyCodes}`
    );

    return fixerRes.data;
  }

  getExchangeRateToSET(
    currencyCode: string,
    euroExchangeRateToSEK: number,
    allRates: {
      [key: string]: number;
    }
  ): number | undefined {
    let exchangeRateToSEK;

    const currencyRate = Object.entries(allRates).find(([code]) => currencyCode === code);
    if (currencyRate) {
      const euroExchangeRateToCurrency = currencyRate[1];
      exchangeRateToSEK = euroExchangeRateToSEK / euroExchangeRateToCurrency;
    }

    return exchangeRateToSEK;
  }
}

export default CurrencyService;

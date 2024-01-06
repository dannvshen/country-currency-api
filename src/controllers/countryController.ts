import { Request, Response } from 'express';
import { inject } from 'inversify';
import axios from 'axios';
import { controller, httpGet } from 'inversify-express-utils';
import SERVICE_IDENTIFIERS from '../config/serviceIdentifiers';
import { CountryResponse } from '../models/responses';
import logger from '../services/logger';
import ICountryService from '../services/ICountryService';
import ICurrencyService from '../services/ICurrencyService';

@controller('/country')
class CountryController {
  private countryService: ICountryService;
  private currencyService: ICurrencyService;
  private SEK: string;

  constructor(
    @inject(SERVICE_IDENTIFIERS.ICurrencyService)
    currencyService: ICurrencyService,
    @inject(SERVICE_IDENTIFIERS.ICountryService)
    countryService: ICountryService,
    @inject(SERVICE_IDENTIFIERS.SEK)
    SEK: string
  ) {
    this.countryService = countryService;
    this.currencyService = currencyService;
    this.SEK = SEK;
  }

  @httpGet('/:name')
  async getCountry(req: Request, res: Response): Promise<void> {
    const countryName = req.params.name;

    // Input validation
    if (!countryName) {
      res.status(400).json({ error: 'Missing country name' });
      return;
    }

    try {
      // Fetch country details
      const countryData = await this.countryService.getCountryByName(countryName);
      const country = countryData[0];

      // Build a comma-separated string of unique currency codes
      const currencyCodes = Object.keys(country.currencies);
      const currencyString = this.currencyService.getUniqueCurrencyString(currencyCodes);

      // Fetch exchange rates for the currencies
      const exchangeRates = await this.currencyService.getExchangeRates(currencyString);
      const rates = exchangeRates.rates;
      const euroToSEKRate = rates[this.SEK];

      // Map country and currency data to CountryResponse format
      const response: CountryResponse = {
        fullName: country.name.official,
        population: country.population,
        currencies: Object.entries(country.currencies).map(([code, currency]) => {
          return {
            code: code,
            name: currency.name,
            symbol: currency.symbol,
            exchangeRateToSEK: this.currencyService.getExchangeRateToSET(code, euroToSEKRate, rates)
          };
        })
      };

      res.json(response);
    } catch (error) {
      if (axios.isAxiosError(error) && error.response && error.response.status < 500) {
        // The request was made and the server responded with a status code
        res
          .status(error.response.status)
          .json({ error: `${error.response.statusText}, make sure to provide a common or full country name.` });
        return;
      }

      logger.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  }
}

export default CountryController;

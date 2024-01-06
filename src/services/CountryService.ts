import axios, { AxiosResponse } from 'axios';
import { Country } from '../models';
import ICountryService from './ICountryService';
import { inject, injectable } from 'inversify';
import SERVICE_IDENTIFIERS from '../config/serviceIdentifiers';

@injectable()
class CountryService implements ICountryService {
  private API_ENDPOINT_COUNTRY: string;

  constructor(@inject(SERVICE_IDENTIFIERS.API_ENDPOINT_COUNTRY) apiEndpoint: string) {
    this.API_ENDPOINT_COUNTRY = apiEndpoint;
  }

  async getCountryByName(countryName: string): Promise<Country[]> {
    const res: AxiosResponse<Country[]> = await axios.get(
      `${this.API_ENDPOINT_COUNTRY}/name/${countryName}?fullText=true&fields=name,population,currencies`
    );

    return res.data;
  }
}

export default CountryService;

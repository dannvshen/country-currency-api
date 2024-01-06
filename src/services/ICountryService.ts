import { Country } from '../models';

interface ICountryService {
  getCountryByName(countryName: string): Promise<Country[]>;
}

export default ICountryService;

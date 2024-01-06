import { Container } from 'inversify';
import dotenv from 'dotenv';
import SERVICE_IDENTIFIERS from '../config/serviceIdentifiers';
import AuthMiddleware from '../middleware/AuthMiddleware';
import CountryController from '../controllers/countryController';
import CurrencyService from '../services/CurrencyService';
import ICurrencyService from '../services/ICurrencyService';
import ICountryService from '../services/ICountryService';
import CountryService from '../services/CountryService';

dotenv.config();

const container = new Container();

const JWT_SECRET = process.env.JWT_SECRET || '';
const API_ENDPOINT_COUNTRY = process.env.API_ENDPOINT_COUNTRY || '';
const API_ENDPOINT_FIXER = process.env.API_ENDPOINT_FIXER || '';
const API_KEY_FIXER = process.env.API_KEY_FIXER || '';
const SEK = process.env.SEK || '';

container.bind<string>(SERVICE_IDENTIFIERS.JWT_SECRET).toConstantValue(JWT_SECRET);
container.bind<string>(SERVICE_IDENTIFIERS.API_ENDPOINT_COUNTRY).toConstantValue(API_ENDPOINT_COUNTRY);
container.bind<string>(SERVICE_IDENTIFIERS.API_ENDPOINT_FIXER).toConstantValue(API_ENDPOINT_FIXER);
container.bind<string>(SERVICE_IDENTIFIERS.API_KEY_FIXER).toConstantValue(API_KEY_FIXER);
container.bind<string>(SERVICE_IDENTIFIERS.SEK).toConstantValue(SEK);

container.bind<AuthMiddleware>(AuthMiddleware).toSelf().inTransientScope();
container.bind<ICurrencyService>(SERVICE_IDENTIFIERS.ICurrencyService).to(CurrencyService).inTransientScope();
container.bind<ICountryService>(SERVICE_IDENTIFIERS.ICountryService).to(CountryService).inTransientScope();

container.bind<CountryController>(CountryController).toSelf().inTransientScope();

export default container;

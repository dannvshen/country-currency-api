const SERVICE_IDENTIFIERS = {
  JWT_SECRET: Symbol.for('JWT_SECRET'),
  API_ENDPOINT_COUNTRY: Symbol.for('API_ENDPOINT_COUNTRY'),
  API_ENDPOINT_FIXER: Symbol.for('API_ENDPOINT_FIXER'),
  API_KEY_FIXER: Symbol.for('API_KEY_FIXER'),
  SEK: Symbol.for('SEK'),
  ICountryService: Symbol.for('ICountryService'),
  ICurrencyService: Symbol.for('ICurrencyService')
};

export default SERVICE_IDENTIFIERS;

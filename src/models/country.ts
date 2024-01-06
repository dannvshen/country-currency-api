export interface Country {
  name: {
    official: string;
  };
  population: number;
  currencies: {
    [key: string]: {
      name: string;
      symbol: string;
    };
  };
}

// Enums from API documentation
export enum Countries {
    UNKNOWN = 0,
    IL = 1
  }
  
  // Country information for UI components
  export const CountryInfo = {
    [Countries.UNKNOWN]: {
      code: 'UNKNOWN',
      name: 'Unknown',
      flag: '🏳️'
    },
    [Countries.IL]: {
      code: 'IL',
      name: 'Israel',
      flag: '🇮🇱'
    }
  } as const;
  
  // Helper functions for country information
  export const getCountryInfo = (country: Countries) => {
    return CountryInfo[country] || CountryInfo[Countries.UNKNOWN];
  };
  
  export const getCountryName = (country: Countries) => {
    return getCountryInfo(country).name;
  };
  
  export const getCountryFlag = (country: Countries) => {
    return getCountryInfo(country).flag;
  };
  
  export const getCountryCode = (country: Countries) => {
    return getCountryInfo(country).code;
  };
  
  // Get all available countries as array for pickers
  export const getAllCountries = () => {
    return Object.values(Countries)
      .filter((value): value is Countries => typeof value === 'number' && value !== Countries.UNKNOWN)
      .map(country => ({
        value: country,
        ...getCountryInfo(country)
      }));
  };
export enum Langugaes {
    UNKNOWN = 0,
    IL = 1
  }
  
  // Country information for UI components
  export const LanguageInfo = {
    [Langugaes.UNKNOWN]: {
      code: 'UNKNOWN',
      name: 'Unknown',
      flag: '🏳️'    
    },
    [Langugaes.IL]: {
      code: 'IL',
      name: 'Israel',
      flag: '🇮🇱'
    }
  } as const;
  
  // Helper functions for country information
  export const getLanguageInfo = (language: Langugaes) => {
    return LanguageInfo[language] || LanguageInfo[Langugaes.UNKNOWN];
  };
  
  export const getLanguageName = (language: Langugaes) => {
    return getLanguageInfo(language).name;
  };
  
  export const getLanguageFlag = (language: Langugaes) => {
    return getLanguageInfo(language).flag;
  };
  
  export const getLanguageCode = (language: Langugaes) => {
    return getLanguageInfo(language).code;
  };
  
  // Get all available countries as array for pickers
  export const getAllLanguages = () => {
    return Object.values(Langugaes)
      .filter((value): value is Langugaes => typeof value === 'number' && value !== Langugaes.UNKNOWN)
      .map(language => ({
        value: language,
        ...getLanguageInfo(language)
      }));
  };
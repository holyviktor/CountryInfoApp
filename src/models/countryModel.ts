export interface ICountry {
    commonName: string;
    officialName: string;
    countryCode: string;
    region: string;
    borders: string[] | null;
}

export interface ICountryInfo {
    borderCountries: ICountry[];
    populationData: IPopulationData[];
    flagUrl: string;
}

export interface IFlagsResponse {
    error: boolean;
    msg: string;
    data: {
        name: string;
        flag: string;
        iso2: string;
        iso3: string;
    }[];
}

export interface IPopulationAPIResponse {
    error: boolean;
    msg: string;
    data: {
        country: string;
        code: string;
        iso3: string;
        populationCounts: IPopulationData[];
    }[];
}

export interface IPopulationData {
    year: number;
    value: number;
}

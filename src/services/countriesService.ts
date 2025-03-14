import { CustomError } from '../models/customError';
import {
    ICountry,
    ICountryInfo,
    IFlagsResponse,
    IPopulationAPIResponse,
    IPopulationData,
} from '../models/countryModel';

const URL_COUNTRIES: string = process.env.URL_COUNTRIES!;
const URL_COUNTRY_INFO: string = process.env.URL_COUNTRY_INFO!;
const URL_POPULATION_INFO: string = process.env.URL_POPULATION_INFO!;
const URL_FLAG: string = process.env.URL_FLAG!;

const mapCountryCodes: Record<string, string> = {
    UA: 'UKR',
};

export async function getAllCountries() {
    const response = await fetch(URL_COUNTRIES);
    if (!response.ok) {
        throw new Error(`Response status: ${response.status}`);
    }
    return response.json();
}

export async function getCountryInfoByCode(
    countryCode: string,
): Promise<ICountryInfo> {
    const borderCountries: ICountry[] =
        await getCountryBorderCountries(countryCode);
    const population: IPopulationData[] = await getCountryPopulationData(
        mapCountryCodes[countryCode] || countryCode,
    );

    const flag: string = await getCountryFlagURL(countryCode);

    return {
        borderCountries: borderCountries,
        populationData: population,
        flagUrl: flag,
    };
}

export async function getCountryBorderCountries(countryCode: string) {
    const response = await fetch(`${URL_COUNTRY_INFO}/${countryCode}`);
    if (!response.ok) {
        throw new CustomError(response.status, 'Failed to get data from api.');
    }
    const jsonResult = await response.json();
    if (!jsonResult.borders) {
        throw new CustomError(400, "Error getting country's border countries.");
    }
    return jsonResult.borders;
}

export async function getCountryPopulationData(countryCode: string) {
    const response = await fetch(URL_POPULATION_INFO);
    if (!response.ok) {
        throw new CustomError(response.status, 'Failed to get data from api.');
    }
    const jsonResult: IPopulationAPIResponse = await response.json();

    if (!jsonResult.data) {
        throw new CustomError(400, 'Error getting population data');
    }

    const currentCountryPopulation = jsonResult.data.find(
        countryData => countryData.code === countryCode,
    );
    if (!currentCountryPopulation) {
        throw new Error(
            `Error getting population data for country with code ${countryCode}.`,
        );
    }
    return currentCountryPopulation.populationCounts;
}

export async function getCountryFlagURL(countryCode: string) {
    const response = await fetch(URL_FLAG);
    if (!response.ok) {
        throw new CustomError(response.status, 'Failed to get data from api.');
    }
    const jsonResult: IFlagsResponse = await response.json();

    if (!jsonResult.data) {
        throw new Error(`Error getting flag data`);
    }

    const currentCountryPopulation = jsonResult.data.find(
        countryData => countryData.iso2 === countryCode,
    );
    if (!currentCountryPopulation) {
        throw new Error(
            `Error getting flag for country with code ${countryCode}.`,
        );
    }
    return currentCountryPopulation.flag;
}

import { urlRegex } from '../constants/regExpConstants';

export const validateEnv = () => {
    const urls = [
        { name: 'URL_COUNTRIES', value: process.env.URL_COUNTRIES },
        { name: 'URL_COUNTRY_INFO', value: process.env.URL_COUNTRY_INFO },
        { name: 'URL_POPULATION_INFO', value: process.env.URL_POPULATION_INFO },
        { name: 'URL_FLAG', value: process.env.URL_FLAG },
        { name: 'URL_HOLIDAYS', value: process.env.URL_HOLIDAYS },
    ];

    urls.forEach(({ name, value }) => {
        if (!value) {
            throw new Error(`${name} is missing in the .env file`);
        }

        if (!urlRegex.test(value)) {
            throw new Error(`${name} is not a valid URL`);
        }
    });
    if (!process.env.DB_CONNECTION_STRING) {
        throw new Error('No connection string!');
    }
};

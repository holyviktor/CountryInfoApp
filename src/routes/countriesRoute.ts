import express from 'express';
import {
    getAvailableCountries,
    getCountryInfo,
} from '../controllers/countriesController';
import { ROUTES_COUNTRIES } from '../constants/routesConstants';

const countriesRouter = express.Router();

countriesRouter.get(ROUTES_COUNTRIES.GET_COUNTRIES, getAvailableCountries);
countriesRouter.get(ROUTES_COUNTRIES.GET_COUNTRY_INFO, getCountryInfo);

export { countriesRouter };

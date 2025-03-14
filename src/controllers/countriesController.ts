import { NextFunction, Response, Request } from 'express';

import {
    getAllCountries,
    getCountryInfoByCode,
} from '../services/countriesService';

export async function getAvailableCountries(
    req: Request,
    res: Response,
    next: NextFunction,
): Promise<void> {
    try {
        res.json(await getAllCountries());
    } catch (error) {
        next(error);
    }
}

export async function getCountryInfo(
    req: Request,
    res: Response,
    next: NextFunction,
): Promise<void> {
    try {
        const countryCode: string = req.params.countryCode;
        const countryInfo = await getCountryInfoByCode(countryCode);
        res.json(countryInfo);
    } catch (error) {
        next(error);
    }
}

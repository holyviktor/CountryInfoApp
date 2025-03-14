import { NextFunction, Request, Response } from 'express';
import { saveHolidaysToCalendar } from '../services/holidaysService';

export async function addHolidayToCalendar(
    req: Request,
    res: Response,
    next: NextFunction,
): Promise<void> {
    try {
        res.json(await saveHolidaysToCalendar(req.params.userId, req.body));
    } catch (error) {
        next(error);
    }
}

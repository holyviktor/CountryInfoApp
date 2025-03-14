import express from 'express';
import { addHolidayToCalendar } from '../controllers/holidaysController';
import { ROUTES_HOLIDAYS } from '../constants/routesConstants';

const holidaysRouter = express.Router();

holidaysRouter.post(
    ROUTES_HOLIDAYS.POST_HOLIDAY_TO_CALENDAR,
    addHolidayToCalendar,
);

export { holidaysRouter };

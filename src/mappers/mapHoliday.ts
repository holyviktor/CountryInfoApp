import { IHolidayAPIResponse } from '../models/holidayModel';
import { IHoliday } from '../models/holidayModel';

export const mapHoliday = (
    userId: string,
    apiHoliday: IHolidayAPIResponse,
): IHoliday => {
    return {
        userId,
        date: new Date(apiHoliday.date),
        name: apiHoliday.name,
    };
};

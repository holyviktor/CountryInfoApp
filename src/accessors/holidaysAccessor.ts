import Holiday from '../schemas/holidaySchema';
import { IHoliday, IHolidayRequest } from '../models/holidayModel';

export async function addHolidaysToUserCalendar(
    holidaysToCreate: IHoliday[],
): Promise<IHoliday[]> {
    return await Holiday.insertMany(holidaysToCreate);
}

export async function isHolidaysInCalendar(
    userId: string,
    holidaysRequest: IHolidayRequest,
): Promise<boolean> {
    const existingHoliday = await Holiday.find({
        name: { $in: holidaysRequest.holidays },
    });

    return !!existingHoliday.find(
        value =>
            value.date.getFullYear() === holidaysRequest.year &&
            value.userId === userId &&
            holidaysRequest.holidays.some(other => value.name === other),
    );
}

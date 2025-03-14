import { IHolidayRequest, IHolidayAPIResponse } from '../models/holidayModel';
import { CustomError } from '../models/customError';
import { mapHoliday } from '../mappers/mapHoliday';
import {
    addHolidaysToUserCalendar,
    isHolidaysInCalendar,
} from '../accessors/holidaysAccessor';
import { IHoliday } from '../models/holidayModel';

const URL_HOLIDAYS = process.env.URL_HOLIDAYS;

export async function getHolidays(
    year: number,
    countryCode: string,
): Promise<IHolidayAPIResponse[]> {
    const response = await fetch(`${URL_HOLIDAYS}/${year}/${countryCode}`);
    if (!response.ok) {
        throw new Error(`Response status: ${response.status}`);
    }
    return await response.json();
}

export async function saveHolidaysToCalendar(
    userId: string,
    holidaysInfo: IHolidayRequest,
): Promise<IHoliday[]> {
    if (!holidaysInfo.holidays || holidaysInfo.holidays.length === 0) {
        throw new CustomError(400, 'Holidays are not specified.');
    }

    if (await isHolidaysInCalendar(userId, holidaysInfo)) {
        throw new CustomError(400, 'Such holiday already exists.');
    }

    let holidays: IHolidayAPIResponse[] = await getHolidays(
        holidaysInfo.year,
        holidaysInfo.countryCode,
    );

    holidays = holidays.filter((holidayObj: IHolidayAPIResponse) =>
        holidaysInfo.holidays.includes(holidayObj.localName),
    );
    const holidaysToCreate = holidays.map(holiday =>
        mapHoliday(userId, holiday),
    );

    return await addHolidaysToUserCalendar(holidaysToCreate);
}

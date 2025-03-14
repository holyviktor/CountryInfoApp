export interface IHoliday {
    userId: string;
    date: Date;
    name: string;
}

export interface IHolidayRequest {
    countryCode: string;
    year: number;
    holidays: string[];
}

export interface IHolidayAPIResponse {
    date: string;
    localName: string;
    name: string;
    countryCode: string;
    fixed: boolean;
    global: boolean;
    counties: string[] | null;
    launchYear: number | null;
    types: string[];
}

import {HTTPRequest} from "@/lib/utils/http_request";
import {OPENWATHERMAP_API_KEY} from "@/lib/variables";

export interface Location {
    coord: {
        lon: number;
        lat: number;
    };
    weather: Array<{
        id: number;
        main: string;
        description: string;
        icon: string;
    }>;
    base: string;
    main: {
        temp: number;
        feels_like: number;
        temp_min: number;
        temp_max: number;
        pressure: number;
        humidity: number;
        sea_level: number;
        grnd_level: number;
    };
    visibility: number;
    wind: {
        speed: number;
        deg: number;
        gust: number;
    };
    clouds: {
        all: number;
    };
    dt: number;
    sys: {
        type: number;
        id: number;
        country: string;
        sunrise: number;
        sunset: number;
    };
    timezone: number;
    id: number;
    name: string;
    cod: number;
}

export class LocationStore {
    httpRequest: HTTPRequest;

    constructor() {
        this.httpRequest = new HTTPRequest({});
    }

    /**
     * Get by Zip Code
     * @param {string} zipCode
     */
    async getByZipCode(zipCode: string): Promise<Location> {
        try {
            const response = await this.httpRequest.fetch(`https://api.openweathermap.org/data/2.5/weather?zip=${zipCode},US&appid=${OPENWATHERMAP_API_KEY}`);
            return await HTTPRequest.response(response) as Location;
        } catch (error) {
            console.error(`Could not get location by zip code. Error: ${error}`);
            throw error;
        }
    }
}
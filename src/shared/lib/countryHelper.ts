// @ts-ignore
import countries from './countryCodeWithFlags.json';

const countryList = countries;

export function useCountryHelper() {
    /**
     * Get all country details.
     */
    const getAllCountries = () => {
        return countryList;
    };

    /**
     * Get details of a specific country based on a key-value pair.
     */
    const getCountryByKey = (key, value) => {
        return countryList.find((country) => country[key] === value) || null;
    };

    /**
     * Get specific details of a country by key(s).
     */
    const getDetailsByKeys = (code, keys) => {
        const country = getCountryByKey('code', code);
        if (!country) return null;

        const details = {};
        keys.forEach((key) => {
            if (country[key] !== undefined) {
                details[key] = country[key];
            }
        });

        return details;
    };

    /**
     * Search countries by a key-value pair (case-insensitive).
     */
    const searchCountries = (key, value) => {
        const search = value.toLowerCase();

        return countryList.filter((country) =>
            String(country[key]).toLowerCase().includes(search)
        );
    };

    return {
        getAllCountries,
        getCountryByKey,
        getDetailsByKeys,
        searchCountries,
    };
}

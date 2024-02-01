import { IQueryOptions } from '../query.js';

const BASE_URL = 'https://www.linkedin.com/jobs/search';

// =================================================================

export interface ILinkedinJobsUserInput {
    query?: string;
    location?: string;
    geoId?: string;
    options: IQueryOptions;
    pageNumber?: number;
    companyIds?: string[];
}

// =================================================================

export const buildSearchUrl = (props: ILinkedinJobsUserInput): string => {
    const { query, location, geoId, options, pageNumber, companyIds } = props;

    const url = new URL(BASE_URL);

    let locationValue: string | null = null;

    if (!location && !geoId) {
        locationValue = 'Worldwide';
    } else if (location && !geoId) {
        locationValue = location;
    }

    const params: [string, string | string[] | null | undefined][] = [
        ['keywords', query || null],
        ['location', locationValue],
        ['geoId', geoId],
        ['f_C', companyIds?.length ? companyIds.join(',') : null],
        ['sortBy', options?.filters?.relevance],
        ['f_TPR', options?.filters?.time],
        ['f_JT', options?.filters?.type],
        ['f_E', options?.filters?.experience],
        ['f_WT', options?.filters?.onSiteOrRemote],
        ['f_F', options?.filters?.jobFunctions],
        ['f_I', options?.filters?.industries],
        ['start', pageNumber ? pageNumber.toString() : '0'],
        ['_l', 'en'],
    ];

    params.forEach(([key, value]) => {
        if (value) {
            if (Array.isArray(value)) {
                value = value.join(',');
            }
            url.searchParams.append(key, value);
        }
    });

    return url.href;
};

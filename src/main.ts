/* eslint-disable @typescript-eslint/ban-ts-comment */
import { Actor } from 'apify';
import { CheerioCrawler } from 'crawlee';
import { MAX_RESULTS } from './constants.js';
import { Labels } from './labels.js';
import { buildFilters } from './query.js';
import { router } from './routes.js';
import { InputSchema } from './types.js';
import { ILinkedinJobsUserInput, buildSearchUrl } from './utils/buildSearchUrl.js';

// Check for required environment variables
// if (!process.env.DATA_CENTER_PROXY_URL) {
//     throw new Error('DATA_CENTER_PROXY_URL environment variable is missing!');
// }

// Initialize the Apify SDK
await Actor.init();

// Set up proxy configuration
const proxyConfiguration = await Actor.createProxyConfiguration({
    useApifyProxy: true,
    groups: ['BUYPROXIES94952'],
});

// Get input data
const input = await Actor.getInput<InputSchema>();

if (!input) {
    throw new Error('Input is missing!');
}

const companyIds = input?.companyIds?.map((item: string | number) => {
    if (typeof item === 'string') {
        return item.trim();
    } if (typeof item === 'number') {
        return item.toString();
    }
    return item;
}) || [];

// Set up search parameters
const search: ILinkedinJobsUserInput = {
    query: input?.query,
    location: Number.isNaN(Number(input?.location)) ? input?.location : undefined,
    geoId: !Number.isNaN(Number(input?.location)) ? input.location : input?.geoId,
    options: {
        limit: Math.min(input?.limit || MAX_RESULTS, MAX_RESULTS),
        filters: buildFilters(input),
    },
};

// Generate start URLs based on company IDs
const startUrls = companyIds.map((companyId) => ({
    label: Labels.START,
    url: buildSearchUrl({ ...search, companyIds: [companyId] }),
    userData: {
        companyId,
        ...input,
    } || {},
}));

// Set up crawler
const crawler = new CheerioCrawler({
    maxRequestsPerMinute: 200,
    requestHandlerTimeoutSecs: 60,
    proxyConfiguration,
    maxConcurrency: 5,
    maxRequestRetries: 6,
    requestHandler: router,
});

// Run crawler
await crawler.run(startUrls);

// Exit successfully
await Actor.exit();

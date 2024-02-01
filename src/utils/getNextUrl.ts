import { ITEMS_PER_PAGE, MAX_RESULTS } from '../constants.js';

export const getNextUrl = (url: string) => {
    const urlObject = new URL(url);
    const start = urlObject.searchParams.get('start');
    const nextStartNumber = (start ? parseInt(start, 10) : 0) + ITEMS_PER_PAGE;

    urlObject.searchParams.set('start', (nextStartNumber < MAX_RESULTS ? nextStartNumber : MAX_RESULTS).toString());

    return urlObject.toString();
};

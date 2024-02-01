import { CheerioRoot, log } from 'crawlee';
import { Element } from 'cheerio';
import { JOB_DETAIL_URL } from '../constants.js';
import { Selector } from '../selectors.js';
import { InputSchema } from '../types.js';
import { getMatchedKeywords } from './getMatchedKeywords.js';

export const processJobCards = ($: CheerioRoot, jobsToCheck: Element[], userData: InputSchema) => {
    if (!jobsToCheck?.length) return;

    const { excludeTitles = [], includeTitles = [] } = userData;

    const jobIds: string[] = [];

    for (const jobCard of jobsToCheck) {
        const CheerioJob = $(jobCard);

        const jobTitle = CheerioJob.find(Selector.SR_ONLY)?.text()?.trim();
        const jobUrn = CheerioJob.find(Selector.JOB_SEARCH_CARD)?.attr(Selector.DATA_ENTITY_URN);

        log.info(`Job`, { jobTitle });

        const matchedExcludedKeyword = getMatchedKeywords(jobTitle, excludeTitles);
        const matchedIncludedKeyword = getMatchedKeywords(jobTitle, includeTitles);

        if (matchedExcludedKeyword) {
            log.warning(`Skipping`, { jobTitle, matchedKeyword: matchedExcludedKeyword });
            continue;
        }

        if (!includeTitles?.length || matchedIncludedKeyword) {
            const jobId = jobUrn?.split(':')?.[3];

            if (jobId) {
                log.info(`Including`, { jobTitle, matchedKeyword: matchedIncludedKeyword });
                jobIds.push(jobId);
            }
        } else {
            log.warning(`Skipping job`, {
                jobTitle,
                matchedKeyword: 'not included in titleIncluded',
            });
        }
    }

    return jobIds.map((id) => `${JOB_DETAIL_URL.replace('{{id}}', id)}`);
};

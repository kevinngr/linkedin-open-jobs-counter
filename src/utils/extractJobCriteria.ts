import { CheerioRoot } from 'crawlee';
import { Element } from 'cheerio';
import { getJobCriteriaList } from '../extractors.js';
import { Selector } from '../selectors.js';
import { Criteria } from '../types.js';
import { toCamelCase } from './toCamelCase.js';

export const extractJobCriteria = ($: CheerioRoot): Criteria => {
    const criteriaList = getJobCriteriaList($);

    return criteriaList.toArray().reduce((criterias: Criteria, element: Element) => {
        const subheader = $(element).find(Selector.JOB_CRITERIA_SUB_HEADER)?.text()?.trim();
        const text = $(element).find(Selector.JOB_CRITERIA_TEXT)?.text()?.trim();
        const camelSubheader = toCamelCase(subheader) as keyof Criteria;

        return {
            ...criterias,
            [camelSubheader]: text,
        };
    }, {
        seniorityLevel: '',
        employmentType: '',
        jobFunction: '',
        industries: '',
    });
};

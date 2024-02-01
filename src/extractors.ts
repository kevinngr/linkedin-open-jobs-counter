import { CheerioRoot } from 'crawlee';
import { Selector } from './selectors.js';

export const getJobCards = ($: CheerioRoot) => $('li').toArray();
export const getJobTitleDetail = ($: CheerioRoot) => $(Selector.JOB_TITLE)?.text()?.trim();
export const getWhoHasHiredLink = ($: CheerioRoot) => $(Selector.SEE_WHO_WAS_HIRED)?.attr('href');
export const getJobDescription = ($: CheerioRoot) => $(Selector.JOB_DESCRIPTION)?.text()?.replace(/(Show more|Show less)/g, '') || '';
export const getJobExperience = ($: CheerioRoot) => $(Selector.SENEORITY_LEVEL).text()?.trim();
export const getCompanyName = ($: CheerioRoot) => $(Selector.COMPANY_LINK)?.text()?.trim();
export const getLinkedinUrl = ($: CheerioRoot) => $(Selector.COMPANY_LINK)?.attr('href')?.match(/^(https?:\/\/)([^/]+\.)*([^/?#]+\.[^/?#]+)(\/[^?#]*)?/)?.[0];
export const getPostedTimeAgo = ($: CheerioRoot) => $(Selector.POSTED_TIME_AGO)?.text()?.trim();
export const getMessageRecruiter = ($: CheerioRoot) => $(Selector.MESSAGE_THE_RECRUITER)?.text()?.trim();
export const getMessageRecruiterUrl = ($: CheerioRoot) => $(Selector.MESSAGE_THE_RECRUITER_CTA).attr('href');
export const getRecruiterName = ($: CheerioRoot) => $(Selector.MESSAGE_THE_RECRUITER_NAME)?.text()?.trim();
export const getRecruiterTitle = ($: CheerioRoot) => $(Selector.MESSAGE_THE_RECRUITER_TITLE)?.text()?.trim();
export const getJobCriteriaList = ($: CheerioRoot) => $(Selector.JOB_CRITERIA_LIST)?.children();
export const getJobLocation = ($: CheerioRoot) => $(Selector.JOB_LOCATION)?.text()?.trim();

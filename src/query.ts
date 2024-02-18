import { InputSchema } from './types.js';

// =================================================================

export interface IQuery {
    query?: string;
    options?: IQueryOptions;
}

export interface IQueryOptions {
    limit?: number;
    filters?: IFilters,
}
export interface IFilters {
    companyIds?: string[];
    industries?: string[];
    jobFunctions?: string[];
    relevance?: string;
    distance?: string;
    time?: string;
    type?: string[];
    experience?: string[];
    onSiteOrRemote?: string[];
}

// =================================================================

export const buildFilters = (input: InputSchema): IFilters => {
    const result: InputSchema = {};

    if (input.companyIds && input.companyIds.length > 0) {
        result.companyIds = input.companyIds;
    }

    if (input.location) {
        result.location = input.location;
    }

    if (input.distance) {
        result.distance = input.distance;
    }

    if (input.includeTitles && input.includeTitles.length > 0) {
        result.includeTitles = input.includeTitles;
    }

    if (input.excludeTitles && input.excludeTitles.length > 0) {
        result.excludeTitles = input.excludeTitles;
    }

    if (input.keywordsInDescription && input.keywordsInDescription.length > 0) {
        result.keywordsInDescription = input.keywordsInDescription;
    }

    if (input.keywordsInDescriptionRequired) {
        result.keywordsInDescriptionRequired = input.keywordsInDescriptionRequired;
    }

    if (input.relevance) {
        result.relevance = input.relevance;
    }

    if (input.experience && input.experience.length > 0) {
        result.experience = input.experience;
    }

    if (input.jobFunctions && input.jobFunctions.length > 0) {
        result.jobFunctions = input.jobFunctions;
    }

    if (input.industries && input.industries.length > 0) {
        result.industries = input.industries;
    }

    if (input.onSiteOrRemote && input.onSiteOrRemote.length > 0) {
        result.onSiteOrRemote = input.onSiteOrRemote;
    }

    if (input.jobType) {
        result.jobType = input.jobType;
    }

    if (input.time) {
        result.time = input.time;
    }

    return result;
};

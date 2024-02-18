export interface InputSchema {
    maxConcurrency?: number;
    query?: string;
    limit?: number;
    companyIds?: string[];
    location?: string;
    distance?: string;
    geoId?: string;
    includeTitles?: string[];
    excludeTitles?: string[];
    keywordsInDescription?: string[];
    keywordsInDescriptionRequired?: boolean;
    skipDuplicatedHighlights?: boolean;
    relevance?: string;
    experience?: string[];
    jobFunctions?: string[];
    industries?: string[];
    onSiteOrRemote?: string[];
    jobType?: string;
    time?: string;
}

export interface IUserDataSet extends IJobDataSet {
    companyId?: string;
    workLocationType?: string;
}

export interface IJobDataSet {
    jobId: string;
    jobTitle?: string;
    location?: string;
    jobDescription?: string;
    highlights?: string;
    keywords?: string;
    seniorityLevel?: string;
    employmentType?: string;
    jobFunction?: string;
    industries?: string;
    postedTimeAgo?: string;
    jobUrl?: string;
    recruiterName?: string;
    recruiterTitle?: string;
    recruiterLinkedinUrl?: string;
    companyId?: string;
    companyName?: string;
    linkedinCompanyUrl?: string;
};

export interface Criteria {
    seniorityLevel: string;
    employmentType: string;
    jobFunction: string;
    industries: string;
}

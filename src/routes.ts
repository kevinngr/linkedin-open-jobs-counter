import { createCheerioRouter } from 'crawlee';
import { Actor } from 'apify';
import { Labels } from './labels.js';

import { IUserDataSet } from './types.js';

// =================================================================

export const router = createCheerioRouter();

// =================================================================

router.addHandler<IUserDataSet>(Labels.START, async ({ request, $, log }) => {
    const { userData, loadedUrl } = request;
    const { companyId, workLocationType } = userData;

    const numberOfJobs = Number($('.results-context-header__job-count').text().trim().replace(/\D/g, ''));

    log.info(`Loaded ${loadedUrl}`);
    log.info(`Found ${numberOfJobs} jobs for company ${companyId}`);

    const payload = {
        companyId,
        loadedUrl,
        numberOfJobs: Number.isNaN(numberOfJobs) ? 0 : numberOfJobs,
        workLocationType,
    };

    if (numberOfJobs > 0) {
        await Actor.pushData(payload);
    }
});

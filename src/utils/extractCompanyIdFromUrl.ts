export const extractCompanyIdFromUrl = (url?: string): string => {
    if (!url) {
        return '';
    }

    const decodedUrl = decodeURIComponent(url);
    const regex = /\bfacetCurrentCompany=(\d+)/;
    const match = decodedUrl.match(regex)?.[1];

    return match || '';
};

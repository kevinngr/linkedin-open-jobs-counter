export const getRedirectUrlFromLinkedInUrl = (linkedInUrl?: string): string => {
    if (!linkedInUrl) {
        return '';
    }

    const urlSearchParams = new URLSearchParams(new URL(linkedInUrl).searchParams);
    const redirectUrl = urlSearchParams.get('session_redirect');

    return redirectUrl || '';
};

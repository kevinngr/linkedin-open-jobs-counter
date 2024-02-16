export const getWorkLocationType = (jobType: string) => {
    switch (jobType) {
        case '1':
            return 'On-site';
        case '2':
            return 'Remote';
        case '3':
            return 'Hybrid';
        default:
            return null;
    }
};

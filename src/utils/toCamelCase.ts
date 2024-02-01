export const toCamelCase = (str: string): string => {
    const firstLetterLower = str.charAt(0).toLowerCase();
    const capitalized = str.slice(1).replace(/[-_\s]+(.)?/g, (_, c) => (c ? c.toUpperCase() : ''));
    return firstLetterLower + capitalized;
};

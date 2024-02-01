export const getMatchedKeywords = (title: string, titles: string[]) => titles.find((t) => new RegExp(`\\b${t.trim()}\\b`, 'i').test(title?.trim()));

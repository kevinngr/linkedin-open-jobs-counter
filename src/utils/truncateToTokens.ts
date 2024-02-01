type TruncateDirection = 'start' | 'end';

export const truncateToTokens = (sentence: string, maxTokens: number, direction: TruncateDirection = 'end'): string => {
    const words = sentence.split(/\s+/);
    let result = '';
    let tokens = 0;
    let isTruncated = false;

    if (direction === 'end') {
        for (const word of words) {
            if (tokens + word.length <= maxTokens) {
                result += `${word} `;
                tokens += word.length;
            } else {
                isTruncated = true;
                break;
            }
        }
        if (isTruncated) result += '...';
    } else { // start
        for (let i = words.length - 1; i >= 0; i--) {
            const word = words[i];
            if (tokens + word.length <= maxTokens) {
                result = `${word} ${result}`;
                tokens += word.length;
            } else {
                isTruncated = true;
                break;
            }
        }
        if (isTruncated) result = `...${result}`;
    }

    return result.trim();
};

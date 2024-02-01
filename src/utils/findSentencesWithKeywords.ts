import { getNumberOfTextTokens } from './getNumberOfTextTokens.js';
import { truncateToTokens } from './truncateToTokens.js';
import { tokenizeText } from './tokenizeText.js';

// =================================================================================

export interface IMatchedSentence {
    sentence: string;
    keywords: string[];
}

export interface IMatchedSentenceWithKeywords {
    highlights: string;
    keywords: string;
}

// =================================================================================

export const findSentencesWithKeywords = (
    text: string | null | undefined,
    keywords: string[],
): IMatchedSentenceWithKeywords => {
    if (!text) return { highlights: '', keywords: '' };

    const sentences = tokenizeText(text);

    const highlights = sentences.reduce((acc: IMatchedSentence[], sentence, index) => {
        const { keywords: keywordsInSentence, sentence: matchedSentence } = findKeywordsInSentence(sentence, keywords);

        if (keywordsInSentence.size === 0) return acc;
        if (getNumberOfTextTokens(matchedSentence) < 100) {
            sentence = mergeSentences(sentences, index, matchedSentence);
        }

        acc.push({
            sentence,
            keywords: Array.from(keywordsInSentence),
        });

        return acc;
    }, []);

    return formatResult(highlights);
};

function escapeRegExp(string: string): string {
    return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'); // $& means the whole matched string
}

function findKeywordsInSentence(sentence: string, keywords: string[]): { keywords: Set<string>, sentence: string } {
    const matchedKeywords = new Set<string>();

    for (const keyword of keywords) {
        const regex = new RegExp(`\\b${(keyword.trim())}\\b`, 'gi'); // Use word boundaries to prevent partial matches
        let match: RegExpExecArray | null;

        // eslint-disable-next-line no-cond-assign
        while ((match = regex.exec(sentence))) {
            const matchedWord = match[0];
            matchedKeywords.add(matchedWord);

            // Using global regular expression to replace all occurrences of matchedWord
            const highlightRegex = new RegExp(escapeRegExp(matchedWord), 'g');
            sentence = sentence.replace(highlightRegex, `[${matchedWord}]`);
        }
    }

    return { keywords: matchedKeywords, sentence };
}

const mergeSentences = (sentences: string[], index: number, matchedSentence: string): string => {
    const nextSentence = index < sentences.length - 1 ? sentences[index + 1] : '';
    const previousSentence = index > 0 ? sentences[index - 1] : '';

    let merged = previousSentence + matchedSentence + nextSentence;

    const tokens = getNumberOfTextTokens(merged);

    if (tokens > 300) {
        const spaceForPrevAndNext = (300 - getNumberOfTextTokens(matchedSentence)) / 2;
        const truncatedPrev = truncateToTokens(previousSentence, spaceForPrevAndNext, 'start');
        const truncatedNext = truncateToTokens(nextSentence, spaceForPrevAndNext, 'end');

        merged = truncatedPrev + matchedSentence + truncatedNext;
    }

    return merged;
};

function formatResult(highlights: IMatchedSentence[]): IMatchedSentenceWithKeywords {
    if (highlights.length === 0) return { highlights: '', keywords: '' };

    const joinedSentences = highlights.map(({ sentence }) => sentence).join('\n');
    const keywords = [...new Set(highlights.flatMap((item) => item.keywords))].join(', ');

    return { highlights: joinedSentences, keywords };
}

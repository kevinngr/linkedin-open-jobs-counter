import { encode } from 'gpt-3-encoder';

export const getNumberOfTextTokens = (text: string) => {
    const encodedText = encode(text);
    return encodedText.length;
};

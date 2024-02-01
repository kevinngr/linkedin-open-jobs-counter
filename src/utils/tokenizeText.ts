import natural from 'natural';

export const tokenizeText = (text: string): string[] => {
    const tokenizer = new natural.SentenceTokenizer();
    return tokenizer.tokenize(text);
};

import crypto from 'crypto';

export class Cache {
    private store: Map<string, boolean>;

    constructor() {
        this.store = new Map();
    }

    /**
   * Compute the hash of the given text.
   * @param text Text to be hashed.
   * @returns Hashed string.
   */
    private computeHash(text: string): string {
        return crypto.createHash('sha256').update(text).digest('hex');
    }

    /**
   * Add the text to the store.
   * @param text Text to be added.
   */
    add(text: string): void {
        const hash = this.computeHash(text);
        this.store.set(hash, true);
    }

    /**
   * Check if the text exists in the store.
   * @param text Text to be checked.
   * @returns Boolean indicating presence of the text.
   */
    has(text: string): boolean {
        const hash = this.computeHash(text);
        return this.store.has(hash);
    }

    /**
   * Clear the store.
   */
    clear(): void {
        this.store.clear();
    }
}

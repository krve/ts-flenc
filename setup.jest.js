crypto = {
    importedKey: null,

    getRandomValues(input) {
        return input;
    },
}

crypto.subtle = {
    async importKey(format, keyData, algorithm, extractable, keyUsages) {
        crypto.importedKey = keyData;

        return keyData;
    },

    async deriveKey(algorithm, baseKey, derivedKeyType, extractable, keyUsages) {
        return baseKey;
    },
}

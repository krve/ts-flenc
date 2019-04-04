import * as encoding from 'text-encoding';
const encoder = new encoding.TextEncoder();

export default class Keychain {
    private rawSecret: Uint8Array;
    private secretKeyPromise: PromiseLike<CryptoKey>;
    private encryptKeyPromise: PromiseLike<CryptoKey>;

    constructor(rawSecret: Uint8Array = null) {
        if (rawSecret) {
            this.rawSecret = rawSecret;
        } else {
            this.rawSecret = this.generateRawSecret();
        }

        this.secretKeyPromise = crypto.subtle.importKey('raw', this.rawSecret, 'HKDF', false, ['deriveKey']);

        this.encryptKeyPromise = this.secretKeyPromise.then(secretKey => {
            return crypto.subtle.deriveKey(
                {
                    name: 'HKDF',
                    salt: new Uint8Array(),
                    // @ts-ignore
                    info: encoder.encode('encryption'),
                    hash: 'SHA-256',
                },
                secretKey,
                {
                    name: 'AES-GCM',
                    length: 128,
                },
                false,
                ['encrypt', 'decrypt'],
            );
        });
    }

    public getRawSecret(): Uint8Array {
        return this.rawSecret;
    }

    public getEncryptionKey(): PromiseLike<CryptoKey> {
        return this.encryptKeyPromise;
    }

    private generateRawSecret(): Uint8Array {
        return crypto.getRandomValues(new Uint8Array(16));
    }
}

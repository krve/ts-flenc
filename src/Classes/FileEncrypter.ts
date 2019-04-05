import Keychain from './Keychain';

export default class FileEncrypter {
    private keychain: Keychain;

    constructor(rawSecret: Uint8Array = null) {
        this.keychain = new Keychain(rawSecret);
    }

    public async encrypt(file: File): Promise<ArrayBuffer> {
        return new Promise(async resolve => {
            const key = await this.keychain.getEncryptionKey();
            const fileReader = new FileReader();

            fileReader.onload = e => {
                crypto.subtle
                    .encrypt(
                        {
                            name: 'AES-GCM',
                            iv: this.keychain.getRawSecret(),
                        },
                        key,
                        // @ts-ignore
                        e.target.result,
                    )
                    .then(encrypted => {
                        resolve(encrypted);
                    });
            };

            fileReader.readAsArrayBuffer(file);
        });
    }

    public async decrypt(encryptedValue): Promise<ArrayBuffer> {
        const key = await this.keychain.getEncryptionKey();

        return crypto.subtle.decrypt(
            {
                name: 'AES-GCM',
                iv: this.keychain.getRawSecret(),
            },
            key,
            encryptedValue,
        );
    }

    public async decryptToBlob(encryptedValue): Promise<Blob> {
        const buffer = this.decrypt(encryptedValue);

        // @ts-ignore
        return new Blob([new DataView(buffer)]);
    }

    public getRawSecret(): Uint8Array {
        return this.keychain.getRawSecret();
    }
}

import { Keychain } from '../index';

test('It can get the raw secret', () => {
    let keychain = new Keychain();

    expect(keychain.getRawSecret()).toBeDefined();
});

test('It can specfiy the raw secret', () => {
    let rawSecret = crypto.getRandomValues(new Uint8Array(16));
    let keychain = new Keychain(rawSecret);

    expect(keychain.getRawSecret()).toBe(rawSecret);
});

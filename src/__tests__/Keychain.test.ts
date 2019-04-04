import Keychain from '../index';

test('Keychain', () => {
    let keychain = new Keychain;

    expect(keychain.getRawSecret()).toBeDefined();
});
import { FileEncrypter } from '../index';

jest.mock('../Classes/Keychain');

test('It can get the raw secret', () => {
    let encrypter = new FileEncrypter();

    // @ts-ignore
    encrypter.keychain.getRawSecret.mockReturnValue('foobar');

    expect(encrypter.getRawSecret()).toBe('foobar');
});

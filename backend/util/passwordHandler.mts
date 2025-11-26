import crypto, { randomBytes } from 'crypto'

function encode(password: string) {
    const salt : string = randomBytes(15).toString('utf-8');
    return {hash:hasher(password, salt), salt:salt};
}

function check(password: string, savedHash: string, salt: string) : boolean {
    return savedHash === hasher(password, salt);
}

function hasher(password: string, salt: string) {
    var hash = crypto.createHmac('sha512', salt + password + salt);
    return hash.digest('base64');
}

const passwordHandler = {
    encode: encode,
    check: check
};

export default passwordHandler;
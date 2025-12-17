import crypto, { randomBytes } from 'crypto'

const key: string = process.env.JWT_SECRET ?? "defaultkey";
var alg = { "alg": "sha512", "typ": "JWT" };

function encodeBase64(str: string) {
    return btoa(str);
}

function decodeBase64(str: string) {
    return atob(str);
}

//generates determanistic hash for jwt
function generateCheckSum(head: string, body: string, refresh: boolean) {
    var checkSumStr = head + '.' + body;
    const currentDate = new Date();
    let localizedDate
    if (refresh) {
        localizedDate = currentDate.toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
    }
    else {
        localizedDate = currentDate.toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            hour: 'numeric'
        });
    }
    var hash = crypto.createHmac(alg.alg, key + localizedDate);
    var checkSum = hash.update(checkSumStr).digest('base64');
    return checkSum;
}

//generates hash jwtToken for API authentication
function encode(payload: any, refresh: boolean) {
    var result = "";
    var header = encodeBase64(JSON.stringify(alg));
    result += header + ".";
    var body = encodeBase64(JSON.stringify(payload));
    result += body + ".";

    var checkSum = generateCheckSum(header, body, refresh);
    result += checkSum;
    return result;
}

//decodes hash to return user details
function decode(hash: string, refresh: boolean) {
    var jwtArr = hash.split(".");
    var head = jwtArr[0];
    var body = jwtArr[1];
    var signature = jwtArr[2];
    var checkSum = generateCheckSum(head, body, refresh);

    return signature === checkSum ? JSON.parse(decodeBase64(body.toString())) : false;
}


function hashPassword(password: string) {
    const salt : string = randomBytes(15).toString('utf-8');
    return {hash:hasher(password, salt), salt:salt};
}

function checkPassword(password: string, savedHash: string, salt: string) : boolean {
    return savedHash === hasher(password, salt);
}

function hasher(password: string, salt: string) {
    var hash = crypto.createHmac('sha512', salt + password + salt);
    return hash.digest('base64');
}

const secretHandler = {
    //jwt token stuff
    encode: encode,
    decode: decode,
    //password stuff
    hashPassword:hashPassword,
    checkPassword: checkPassword
};

export default secretHandler;
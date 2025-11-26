import crypto from 'crypto'

const key: string = process.env.JWT_SECRET ?? "defaultkey";
var alg = { "alg": "sha256", "typ": "JWT" };

function encodeBase64(str: string) {
    return btoa(str);
}

function decodeBase64(str: string) {
    return atob(str);
}

function checkSumGen(head: string, body: string) {
    var checkSumStr = head + '.' + body;
    const currentDate = new Date();
    const localizedDate = currentDate.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: 'numeric'
    });
    var hash = crypto.createHmac('sha512', key + localizedDate);
    var checkSum = hash.update(checkSumStr).digest('base64');
    return checkSum;
}



function encode(obj: any) {
    var result = "";
    var header = encodeBase64(JSON.stringify(alg));
    result += header + ".";
    var body = encodeBase64(JSON.stringify(obj));
    result += body + ".";

    var checkSum = checkSumGen(header, body);
    result += checkSum;
    return result;
}

function decode(str: string) {
    var jwtArr = str.split(".");
    var head = jwtArr[0];
    var body = jwtArr[1];
    var hash = jwtArr[2];
    var checkSum = checkSumGen(head, body);

    return hash === checkSum ? JSON.parse(decodeBase64(body.toString())) : false;
}

const jwtController = {
    encode: encode,
    decode: decode
};

export default jwtController;
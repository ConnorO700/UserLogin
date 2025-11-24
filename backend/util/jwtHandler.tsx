import crypto from 'crypto'

 const key : string = process.env.JWT_SECRET ?? "defaultkey";
function jwtHandler () {
    function encodeBase64(str : string) {
        return Buffer.from(str, 'base64');
    }

    function decodeBase64(str : string) {
        return Buffer.from(str, 'utf-8').toString();
    }

    function checkSumGen(head : Buffer, body : Buffer) {
        var checkSumStr = head + '.' + body;
        var hash = crypto.createHmac('sha265', key);
        var checkSum = hash.update(checkSumStr).digest('base64');
        return checkSum;
    }

    var alg = {"alg": "HS256", "typ": "JWT"};

    return {
        encode:(obj : any) => {
            var result = "";
            var header = encodeBase64(JSON.stringify(alg));
            result += header + ".";
            var body = encodeBase64(JSON.stringify(obj));
            result += body + ".";

            var checkSum = checkSumGen(header, body);
            result += checkSum;
        },
        decode:(str : string) => {
            var jwtArr = str.split(".");
            var head = Buffer.from(jwtArr[0]);
            var body = Buffer.from(jwtArr[1]);
            var hash = jwtArr[2];
            var checkSum = checkSumGen(head, body);

            if (hash === checkSum){
                console.log("jwt hash: " + hash);
                console.log("gen hash: " + checkSum);
                console.log('JWT was authenticated');
                return JSON.parse(decodeBase64(body.toString()));
            } else {
                console.log('JWT was not authenticated');
                console.log("jwt hash: " + hash);
                console.log("gen hash: " + checkSum);
                return false;
            }


        }
    }
}
export default jwtHandler;
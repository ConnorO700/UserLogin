const maskEmail = (str: string) => {
    const ret = str.split('@');
    let name = ret[0];
    let domain = ret[1];
    if (ret[0].length > 3) {
        name = ret[0].substring(0, 2) + '*'.repeat(ret[0].length - 3);
    }
    else {
        name = '*'.repeat(ret[0].length);
    }
    if (ret[1].length > 3) {
        domain = ret[1].substring(0, 2) + '*'.repeat(ret[1].length - 3);
    }
    else {
        domain = '*'.repeat(ret[0].length);
    }
    return `${name}@${domain}`;
}

const maskHandler = {
    email: maskEmail
}


export default maskHandler;
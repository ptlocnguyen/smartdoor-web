async function post(url, data, isFile = false) {
    let opt = { method: "POST" };

    if (isFile) {
        opt.body = data;
    } else {
        opt.headers = { "Content-Type": "application/json" };
        opt.body = JSON.stringify(data);
    }

    const res = await fetch(API + url, opt);
    return res.json();
}

async function get(url) {
    return fetch(API + url).then(r => r.json());
}
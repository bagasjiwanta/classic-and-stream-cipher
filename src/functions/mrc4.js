/** Panjang S */
const N = 256;

/** Menukar 2 elemen array di index i dan j */
function swap(arr = [], i = 0, j = 0) {
    [arr[i], arr[j]] = [arr[j], arr[i]];
}

/** Mengulangi key jika panjangnya lebih kecil dari N (256) */
function repeatKey(key) {
    const output = [];

    if (key.length >= N) {
        return key
    }

    const multiplier = Math.floor(N / key.length);
    const remainder = N % key.length;
    const fixedKey = [...key];
    for (let i = 0; i < multiplier; i++) {
        output.push(...fixedKey);
    }
    output.push(...fixedKey.slice(0, remainder));
    return output;
}


/** Key Swapping Algorithm */
function ksa(key = []) {
    let S = []
    for (let i = 0; i < 256; i++) {
        S[i] = i
    }
    let j = 0;
    for (let i = 0; i < N; i++) {
        j = (j + S[i] + key[i % key.length]) % N;
        swap(S, i, j)
    }
    return S;
}

/** Pseudo-Random Generator Algorithm */
function prga(S = [], M = []) {
    let i = 0;
    let j = 0;
    const output = new Uint8Array(M.length)

    // modification (add 256 to the upper limit)
    for (let x = 0; x < M.length + 256; x++) {
        i = (i + 1) % N;
        j = (j + S[i]) % N;
        swap(S, i, j)

        // modification. Drop the first 256 bytes to defend against Fluhrer, Mantin, and Shamir Attack.
        if(x > 255) {
            let g = S[(S[i] + S[j]) % N];
            let out = g ^ M[x - 256]
            // let lfsr = 10
            // out = lfsr ^ out
            output[x - 256] = out;
        } 
    }
    return output
}

/** 
 * Modified RC4 (MRC4). 
 * This MRC4 skips the first 256 bytes in PRGA.
 * */
export function mrc4(input = [], key = [], string = true) {
    let _input = input
    let _key = stringToArray(key)
    if (string) {
        _input = stringToArray(input)
    }
    /* Main Algorithm */
    const fixKey = repeatKey(_key)
    const S = ksa(fixKey)
    let output = prga(S, _input)
    /* End Main Algorithm*/
    if (string) output = arrayToString(output)
    return output
}

/** Converts string to array of ascii values as integers */
function stringToArray(string = '') {
    return new Uint8Array(string.split('').map(v => v.charCodeAt()))
}

/** Converts array of integer ascii values to string */
function arrayToString(array = []) {
    let output = ''
    array.forEach(v => output += String.fromCharCode(v))
    return output;
}
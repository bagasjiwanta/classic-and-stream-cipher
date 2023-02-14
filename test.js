/** Panjang S */
const N = 256;

/** Menukar 2 elemen array di index i dan j */
function swap(arr = [], i = 0, j = 0) {
    [arr[i], arr[j]] = [arr[j], arr[i]];
}

const stats = {
    time: [],
    strength: []
}

/** Mengukur lama waktu eksekusi fungsi dalam hitungan ms */
function measureTime(next = () => {}) {
    const begin = new Date().getTime();
    const result = next();
    const end = new Date().getTime();
    stats.time.push(end - begin)
    return result
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
    const S = [];

    for (let i = 0; i < N; i++) {
        S[i] = i;
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
    const output = []

    for (let x = 0; x < M.length; x++) {
        i = (i + 1) % N;
        j = (j + S[i]) % N;
        swap(S, i, j)
        let g = S[(S[i] + S[j]) % N];
        output.push(g ^ M[x]);
    }

    return output
}

/** 
 * Modified RC4. 
 * Will be modified in the future, currently it is the same as the original
 * */
function mrc4(input = [], key = [], string = true) {
    let _input = input
    let _key = key
    if (string) {
        _input = stringToArray(input)
        _key = stringToArray(key)
    }

    /* Main Algorithm */
    const fixKey = repeatKey(_key)
    const S = ksa(fixKey)
    let output = prga(S, _input)
    /* End Main Algorithm*/
    console.log({ mrc4: output })

    if (string) output = arrayToString(output)
    return output
}

/** Converts string to array of ascii values as integers */
function stringToArray(string = '') {
    return string.split('').map(v => v.charCodeAt())
}

/** Converts array of integer ascii values to string */
function arrayToString(array = []) {
    return String.fromCharCode(...array)
}

function main() {
    
}

main()
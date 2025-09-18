import { get_encoding } from "tiktoken";

// encoding are dictionaries that map token ID -> tokens 
// ex: 904 -> hello
const encoding = get_encoding('cl100k_base');
const token = encoding.encode('Hello word! This is first test with get_encoding');
console.log(token); // [ 9906, 3492, 0, 1115, 374, 1176, 1296, 449, 636, 38713]
import 'dotenv/config';
import * as sha256 from 'fast-sha256';
import { TextEncoder, TextDecoder } from 'util';

const secretKey: string = process.env.SECRET_KEY;

export default {
  encodingSHA256(data: string): string {
    const textEncoder = new TextEncoder();
    const encodedKey: Uint8Array = textEncoder.encode(secretKey);
    const encodedMsg: Uint8Array = textEncoder.encode(data);
    const hmac = sha256.hmac(encodedKey, encodedMsg);
    return new TextDecoder().decode(hmac);
  },
};

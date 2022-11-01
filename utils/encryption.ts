import crypto from 'crypto';

export const encrypt = (plaintext: string, key: string) => {
  const iv = crypto.randomBytes(16);
  const cipher = crypto.createCipheriv('aes-256-gcm', Buffer.from(key, 'hex'), iv);
  const encrypted = Buffer.concat([cipher.update(plaintext, 'utf8'), cipher.final()]);
  const tag = cipher.getAuthTag();
  return Buffer.concat([iv, tag, encrypted]).toString('hex');
};

export const decrypt = (ciphertext: string, key: string) => {
  const data = Buffer.from(ciphertext, 'hex');
  const iv = data.subarray(0, 16);
  const tag = data.subarray(16, 32);
  const text = data.subarray(32);
  const decipher = crypto.createDecipheriv('aes-256-gcm', Buffer.from(key, 'hex'), iv);
  decipher.setAuthTag(tag);
  return decipher.update(text, undefined, 'utf8') + decipher.final('utf8');
};

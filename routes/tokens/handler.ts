import { Request, Response } from 'express';
import { encrypt, decrypt } from '../../utils/encryption';
import db from '../../database';
import crypto from 'crypto';

const getSecrets = async (req: Request, res: Response) => {
  const query = req.query.t as string;
  if (!query) return res.send();
  try {
    const tokenIds = query.split(',');
    const tokenEntries = await db.tokens.getMany(tokenIds);
    const tokens = tokenEntries.reduce(
      (obj, t) =>
        Object.assign(obj, { [t.token]: decrypt(t.secret, process.env.ENCRYPTION_KEY as string) }),
      {}
    );
    return res.send(tokens);
  } catch (error) {
    return res.status(500).send(error);
  }
};

const createToken = async (req: Request, res: Response) => {
  const { secret } = req.body;
  try {
    const encryptedSecret = encrypt(secret, process.env.ENCRYPTION_KEY as string);
    const token = crypto.randomBytes(16).toString('hex');
    await db.tokens.create({ token, secret: encryptedSecret });
    return res.send({ token });
  } catch (error) {
    return res.status(500).send(error);
  }
};

const updateSecret = async (req: Request, res: Response) => {
  const { token } = req.params;
  const { secret } = req.body;
  try {
    const encryptedSecret = encrypt(secret, process.env.ENCRYPTION_KEY as string);
    await db.tokens.update(token, { secret: encryptedSecret });
    return res.status(204).send();
  } catch (error) {
    return res.status(500).send(error);
  }
};

const deleteToken = async (req: Request, res: Response) => {
  const { token } = req.params;
  try {
    await db.tokens.del(token);
    return res.status(204).send();
  } catch (error) {
    return res.status(500).send(error);
  }
};

export default { getSecrets, createToken, updateSecret, deleteToken };

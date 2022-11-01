export type Token = {
  token: string;
  secret: string;
};

const tokens: Token[] = [];

const create = (item: any) => {
  tokens.push(item);
};

const get = (id: string) => {
  return tokens.find((t) => t.token === id);
};

const getMany = (ids: string[]) => {
  return tokens.filter((t) => ids.includes(t.token));
};

const update = (id: string, item: any) => {
  const token = tokens.find((t) => t.token === id);
  const updated = { ...token, ...item };
  const filtered = tokens.filter((t) => t.token !== id);
  tokens.splice(0, tokens.length, ...filtered, ...[updated]);
  return updated;
};

const del = (id: string) => {
  const filtered = tokens.filter((t) => t.token !== id);
  tokens.splice(0, tokens.length, ...filtered);
};

export default { create, get, getMany, update, del };

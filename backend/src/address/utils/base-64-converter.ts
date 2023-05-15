import { TokenPayload } from '../../auth/dtos/TokenPayload.dto';

export const payloadConversor = (token: string): TokenPayload | undefined => {
  const dataToken = token.split('.');

  if (dataToken.length < 3 || !dataToken[1]) {
    return undefined;
  }

  return JSON.parse(Buffer.from(dataToken[1], 'base64').toString('ascii'));
};

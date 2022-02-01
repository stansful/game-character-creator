export interface JwtPayloadInterface {
  id: number;
  username: string;
  email: string;
  iat: number;
  exp: number;
}

import { JwtModuleOptions } from '@nestjs/jwt';

export const jwtConfig: JwtModuleOptions = {
  secret: 'ono',
  signOptions: {
    expiresIn: '1h',
  },
};

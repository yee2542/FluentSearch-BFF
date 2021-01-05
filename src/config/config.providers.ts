import { Provider } from '@nestjs/common';
import { APP_CONFIG } from './config.constant';
import { ConfigurationInterface } from './config.interface';
import { ProcessConfigType } from './process.config.type';

export const configProviders: Provider[] = [
  {
    provide: APP_CONFIG,
    useValue: ((): ConfigurationInterface => {
      const {
        DATABASE_CONNECTION,
        DATABASE_USERNAME,
        DATABASE_PASSWORD,
        DATABASE_AUTH_SOURCE,
        JWT_SECRET_KEY,
        JWT_EXPIRES,
        OPS_KEY,
        ORIGIN,
        PORT,
      } = process.env as ProcessConfigType;
      return {
        database: {
          connection:
            DATABASE_CONNECTION ||
            'mongodb://mongodb-sharded:27017/fluent-search-bff',
          username: DATABASE_USERNAME || 'root',
          password: DATABASE_PASSWORD || 'FluentSearch.BFF.DB.Password',
          authSource: DATABASE_AUTH_SOURCE || 'admin',
        },
        jwt: {
          secretKey: JWT_SECRET_KEY || 'FluentSearch.BFF.DB.Password',
          expires: JWT_EXPIRES || '3600s',
        },
        opsKey: OPS_KEY || 'FluentSearch.BFF.OpsKey',
        node_env:
          (process.env.NODE_ENV as ConfigurationInterface['node_env']) ||
          'development',
        origin: new RegExp(ORIGIN),
        port: Number(PORT || 5000),
      };
    })(),
  },
];

import { getModelToken } from '@nestjs/mongoose';
import {
  UserPackageEnum,
  UserRoleEnum,
  USERS_SCHEMA_NAME,
  UserZoneEnum,
} from 'fluentsearch-types';
import { Types } from 'mongoose';
import { IUser } from '../interfaces/user';

export const MOCK_USER_DOCUMENT = {
  _id: Types.ObjectId(),
  mainEmail: 'john@doe.com',
  email: ['john@doe.com'],
  password: '12345678',
  name: 'John',

  oauth: [],

  // logic
  role: UserRoleEnum.user,
  package: UserPackageEnum.freeUser,

  //   meta
  zone: UserZoneEnum.TH1,

  createAt: new Date(),
  updateAt: new Date(),
} as IUser & { _id: Types.ObjectId };

// jest
//     .fn()
//     .mockImplementation(() => Promise.resolve(MOCK_USER_DOCUMENT)),

export const MOCK_USER_VALUE = {
  find: jest.fn().mockReturnThis(),
  skip: jest.fn().mockReturnThis(),
  limit: jest.fn().mockReturnThis(),
  create: jest.fn().mockReturnThis(),
  findOneAndUpdate: jest.fn().mockReturnThis(),
  findByIdAndUpdate: jest.fn().mockReturnThis(),
  findById: jest.fn().mockReturnThis(),
  select: jest.fn().mockReturnThis(),
  lean: jest.fn().mockReturnThis(),
  findOne: jest.fn().mockReturnThis(),
};

export const MOCK_USER_MODEL = {
  provide: getModelToken(USERS_SCHEMA_NAME),
  useValue: MOCK_USER_VALUE,
};

export const MOCK_USER_SERVICE = {
  getUserByEmail: jest.fn().mockResolvedValue(MOCK_USER_DOCUMENT),
};

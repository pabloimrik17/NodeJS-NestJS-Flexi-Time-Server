import { Test, TestingModule } from '@nestjs/testing';
import { UsersService } from './users.service';
import User from './interfaces/User';

describe('UsersService', () => {
  let usersService: UsersService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UsersService],
    }).compile();

    usersService = module.get<UsersService>(UsersService);
  });

  describe('root', () => {
    it('should be defined', () => {
      expect(usersService).toBeDefined();
    });
  });

  // TODO Those test should be updated once real users comes from Database.
  describe('findOne', () => {
    it('should return a user when the username match', async () => {
      const result: User = {
        userId: 1,
        username: 'john',
        password: 'changeme',
      };

      expect(await usersService.findOne('john')).toEqual(result);
    });
  });

  it('should return undefined when the username doesnt match', async () => {
    const result = undefined;

    expect(await usersService.findOne('non existing username')).toEqual(result);
  });
});

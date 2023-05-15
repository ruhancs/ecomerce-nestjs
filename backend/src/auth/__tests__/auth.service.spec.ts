import { Test, TestingModule } from '@nestjs/testing';
import { userEntityMock } from './mocks/user.mock';
import { AuthService } from '../auth.service';
import { JwtService } from '@nestjs/jwt';
import { UserService } from '../../user/user.service';
import { jwtMock } from './mocks/jwt.mock';
import { loginDtoMock } from './mocks/login-user.mock';
import { ResponseUserDto } from '../../user/dtos/responseUser.dto';

describe('UserService', () => {
  let service: AuthService;
  let userService: UserService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthService,
        {
          provide: UserService,
          useValue: {
            findUserByEmail: jest.fn().mockResolvedValue(userEntityMock),
          },
        },
        {
          provide: JwtService,
          useValue: {
            sign: () => jwtMock,
          },
        },
      ],
    }).compile();

    service = module.get<AuthService>(AuthService);
    userService = module.get<UserService>(UserService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
    expect(userService).toBeDefined();
  });

  // it('should return user if email and password is valid', async () => {
  //   const user = await service.login(loginDtoMock);

  //   expect(user).toEqual({
  //     accessToken: jwtMock,
  //     user: new ResponseUserDto(userEntityMock),
  //   });
  // });
});

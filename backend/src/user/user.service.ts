import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ICreateUserDto } from './dtos/createUserDto';
import { UserEntity } from './entity/user.entity';
import { hash } from 'bcrypt';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
  ) {}

  async createUser(creatUserDto: ICreateUserDto): Promise<UserEntity> {
    const emailExist = await this.findUserByEmail(creatUserDto.email);

    if (emailExist) {
      throw new ConflictException('Email is already registered');
    }

    const salt = 10;
    const passwordhashed = await hash(creatUserDto.password, salt);

    return this.userRepository.save({
      ...creatUserDto,
      typeUser: 1,
      password: passwordhashed,
    });
  }

  async getUserIncludeAddress(id): Promise<UserEntity> {
    return this.userRepository.findOne({
      where: {
        id,
      },
      relations: {
        addresses: {
          city: {
            state: true,
          },
        },
      },
    });
  }

  async getAllUsers(): Promise<UserEntity[]> {
    return this.userRepository.find();
  }

  async findUserById(id: number): Promise<UserEntity> {
    const user = await this.userRepository.findOne({
      where: {
        id: id,
      },
    });

    if (!user) {
      throw new NotFoundException('user not found');
    }

    return user;
  }

  async findUserByEmail(email: string): Promise<UserEntity> {
    const user = await this.userRepository.findOne({
      where: {
        email,
      },
    });

    return user;
  }

  async login(email: string, password: string): Promise<UserEntity> {
    const user = await this.userRepository.findOne({
      where: {
        email,
        password,
      },
    });

    if (!user) {
      throw new NotFoundException('Email or password is wrong');
    }

    return user;
  }
}

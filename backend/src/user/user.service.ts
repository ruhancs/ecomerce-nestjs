import { Injectable } from '@nestjs/common';
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
    const salt = 10;
    const passwordhashed = await hash(creatUserDto.password, salt);

    return this.userRepository.save({
      ...creatUserDto,
      typeUser: 1,
      password: passwordhashed,
    });
  }

  async getAllUsers(): Promise<UserEntity[]> {
    return this.userRepository.find();
  }
}

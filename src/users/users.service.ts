import {
  BadRequestException,
  Injectable,
  RequestTimeoutException,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { DataSource, Repository } from 'typeorm';
import { Users } from './entities/user.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(Users) private userRepository: Repository<Users>,
    private readonly dataSource: DataSource,
  ) {}

  async create(createUserDto: CreateUserDto) {
    try {
      let prevUser = await this.userRepository.findOne({
        where: {
          email: createUserDto.email,
        },
      });
      if (prevUser) {
        throw new BadRequestException('The user already exist');
      }
      let user = this.userRepository.create(createUserDto);
      user = await this.userRepository.save(user);
      return user;
    } catch (error) {
      throw error;
      // (new RequestTimeoutException('unable to process your request'),
      // {
      //   description: 'Error connecting to database',
      // })
    }
  }

  async findAll() {
    try {
      const users = await this.userRepository.find();
      if (!users) {
        throw new BadRequestException('Users not found');
      }
    } catch (error) {
      throw error;
    }
  }

  findOne(id: number) {
    return this.userRepository.findOne({ where: { id } });
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }

  async createMany(createUserDto: CreateUserDto[]) {
    let newUsers: Users[] = [];

    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();
    try {
      for (let user of createUserDto) {
        let newUser = queryRunner.manager.create(Users, user);
        let res = await queryRunner.manager.save(newUser);
        newUsers.push(res);
      }
      await queryRunner.commitTransaction();
    } catch (error) {
      await queryRunner.rollbackTransaction();
    } finally {
      await queryRunner.release();
    }
  }
}

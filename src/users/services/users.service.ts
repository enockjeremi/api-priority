import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import * as bcrypt from 'bcrypt';
import { Users } from '../../common/entities/users.entity';
import { Repository } from 'typeorm';
import { CreateUserDto, UpdateUserDto } from '../dto/users.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(Users) private userRepository: Repository<Users>,
  ) {}

  async create(data: CreateUserDto) {
    const { username, email, password } = data;
    await this.uniqueValues(username, email);
    const hash = await this.hashPassword(password);
    const newUser = this.userRepository.create(data);
    newUser.password = hash;
    return this.userRepository.save(newUser);
  }

  async getAll() {
    return await this.userRepository.find({});
  }

  async getOne(id: number) {
    const user = await this.userRepository.findOne({
      where: { id },
    });
    if (!user) throw new BadRequestException('User not found');
    return user;
  }

  async getUserByToken(id: number) {
    const user = await this.userRepository.findOne({
      where: { id },
    });
    if (!user) throw new BadRequestException('User not found');
    return user;
  }

  async update(id: number, data: UpdateUserDto) {
    // await this.uniqueValues(data.username, data.email);
    const user = await this.userRepository.findOne({
      where: { id },
    });
    if (!user) throw new BadRequestException('User not found');

    this.userRepository.merge(user, data);
    return await this.userRepository.save(user);
  }

  async delete(id: number) {
    const user = await this.userRepository.findOne({
      where: { id },
    });
    if (!user) throw new BadRequestException('User not found');
    await this.userRepository.delete(user.id);
    return { message: 'User has been deleted' };
  }
  async getByEmail(email: string) {
    const user = await this.userRepository.findOne({ where: { email } });
    return user;
  }

  async hashPassword(password: string): Promise<string> {
    const salt = await bcrypt.genSalt(10);
    return await bcrypt.hash(password, salt);
  }

  async uniqueValues(username: string, email: string) {
    const uniqueUser = await this.userRepository.find({ where: { username } });
    const uniqueEmail = await this.userRepository.find({ where: { email } });
    if (uniqueUser.length > 0) {
      throw new BadRequestException('El nombre de usuario ya existe.');
    }
    if (uniqueEmail.length > 0) {
      throw new BadRequestException('El email ya existe.');
    }
    return true;
  }
}

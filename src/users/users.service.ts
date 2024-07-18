import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateUserDto } from './dto/create-user-dto';
import * as bcrypt from 'bcryptjs';
import passport from 'passport';

@Injectable()
export class UsersService {
   
    constructor(private prisma: PrismaService) {}
    
    async createUser(createUserDto: CreateUserDto) {
      const hashedPassword = bcrypt.hashSync(createUserDto.password, 10)
        return this.prisma.user.create({
            data: {
                email: createUserDto.email,
                password: hashedPassword,
            }
        })
    }

    async getUsers() {
        return this.prisma.user.findMany();
    }
    
    async findOneByEmail(email: string) {
        return this.prisma.user.findUnique({
          where: {
            email,
          },
        });
      }
}

import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateUserDto } from './dto/create-user-dto';
import * as bcrypt from 'bcryptjs';

@Injectable()
export class UsersService {
   
    constructor(private prisma: PrismaService) {}
    
    async createUser(createUserDto: CreateUserDto) {
        try {
            const hashedPassword = bcrypt.hashSync(createUserDto.password, 10);
            return await this.prisma.user.create({
                data: {
                    email: createUserDto.email,
                    password: hashedPassword,
                }
            });
        } catch (error) {
            throw new Error(`User creation failed: ${error.message}`);
        }
    }

    async getUsers() {
        try {
            return await this.prisma.user.findMany();
        } catch (error) {
            throw new Error(`Failed to get users: ${error.message}`);
        }
    }
    
    async findOneByEmail(email: string) {
        try {
            return await this.prisma.user.findUnique({
                where: {
                    email,
                },
            });
        } catch (error) {
            throw new Error(`Failed to find user by email: ${error.message}`);
        }
    }
}

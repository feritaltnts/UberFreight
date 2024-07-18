import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { UsersService } from './users.service';
import { ApiBearerAuth, ApiBody, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CreateUserDto } from './dto/create-user-dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@ApiTags('Users')
@Controller('users')
export class UsersController {

    constructor(private readonly usersService: UsersService){}

    @Post()
    @ApiOperation({summary: 'Create User'})
    @ApiResponse({ status: 201, description: 'The user has been successfully created.' })
    @ApiResponse({ status: 400, description: 'Bad Request' })
    @ApiBody({type: CreateUserDto})
    async createUser(@Body() createUserDto: CreateUserDto){
        return this.usersService.createUser(createUserDto);
    }

    @Get()
    @UseGuards(JwtAuthGuard)
    @ApiBearerAuth('access-token')
    @ApiOperation({summary:"Get all users"})
    @ApiResponse({status: 200, description: 'Return all users'})
    async getUsers() {
        return this.usersService.getUsers();
    }


}

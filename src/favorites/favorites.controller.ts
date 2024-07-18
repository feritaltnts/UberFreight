import { Body, Controller, Delete, Get, Param, Post, UseGuards } from '@nestjs/common';
import { FavoritesService } from './favorites.service';
import { CreateFavoriteDto } from './dto/create-favorite.dto';
import { ApiTags, ApiOperation, ApiResponse, ApiBody, ApiBearerAuth } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';

@ApiTags('favorites')
@Controller('favorites')
@UseGuards(JwtAuthGuard)
@ApiBearerAuth('access-token')
export class FavoritesController {
    constructor(private readonly favoritesService: FavoritesService) {}

    @Post()
    @ApiOperation({ summary: 'Create favorite' })
    @ApiResponse({ status: 201, description: 'The favorite has been successfully created.' })
    @ApiResponse({ status: 400, description: 'Bad Request' })
    @ApiBody({ type: CreateFavoriteDto })
    async createFavorite(@Body() createFavoriteDto: CreateFavoriteDto){ 
       return this.favoritesService.createFavorite(createFavoriteDto); 
    }

    @Get(':userId')
    @ApiOperation({ summary: 'Get favorites by user' })
    @ApiResponse({ status: 200, description: 'Return all favorites for a user.' })
    async getFavoriteByUser(@Param('userId') userId: string) {
        return this.favoritesService.getFavorite(userId);
    }
    @Delete(':id')
    @ApiOperation({ summary: 'Delete favorite' })
    @ApiResponse({ status: 200, description: 'The favorite has been successfully deleted.' })
    async deleteFavorite(@Param("id")id : string){
        return this.favoritesService.deleteFavorite(id);
    }  
}

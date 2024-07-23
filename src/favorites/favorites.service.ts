import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateFavoriteDto } from './dto/create-favorite.dto';

@Injectable()
export class FavoritesService {

    constructor(private prisma: PrismaService) {}

    async createFavorite(createFavoriteDto: CreateFavoriteDto) {
        try {
            return await this.prisma.favorite.create({
                data: {
                    userId: createFavoriteDto.userId,
                    carrierId: createFavoriteDto.carrierId,
                },
            });
        } catch (error) {
            throw new Error(`Favorite creation failed: ${error.message}`);
        }
    }

    async getFavorite(userId: string) {
        try {
            return await this.prisma.favorite.findMany({
                where: { userId },
                include: { carrier: true },
            });
        } catch (error) {
            throw new Error(`Failed to get favorites: ${error.message}`);
        }
    }
    
    async deleteFavorite(id: string) {
        try {
            return await this.prisma.favorite.delete({
                where: { id },
            });
        } catch (error) {
            throw new Error(`Failed to delete favorite: ${error.message}`);
        }
    }
}

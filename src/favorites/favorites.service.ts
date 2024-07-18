import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateFavoriteDto } from './dto/create-favorite.dto';

@Injectable()
export class FavoritesService {

    constructor(private prisma: PrismaService){}

    async createFavorite(createFavoriteDto: CreateFavoriteDto ) {
        return this.prisma.favorite.create({
            data: {
                userId: createFavoriteDto.userId,
                carrierId: createFavoriteDto.carrierId
            }
        })
    }

    async getFavorite(userId: string) {
        return this.prisma.favorite.findMany({
            where: {userId},
            include : {carrier: true}
        })
    }
    
    async deleteFavorite(id: string) {
        return this.prisma.favorite.delete({
            where: {id}
        })
    }
}

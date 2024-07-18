import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreatePromotionDto } from './dto/create-promotion.dto';
import { connect } from 'http2';

@Injectable()
export class PromotionsService {
    constructor(private prisma: PrismaService) {}

    async createPromotion(createPromotionDto: CreatePromotionDto) {
        return this.prisma.promotion.create({
          data: {
            title: createPromotionDto.title,
            startDate: createPromotionDto.startDate,
            endDate: createPromotionDto.endDate,
            carrier: {
              connect: { id: createPromotionDto.carrierId },
            },
            discount: createPromotionDto.discount,
          },
        });
      }
      
    async getPromotionsByUser(carrierId: string) {
        return this.prisma.promotion.findMany({
            where: {carrierId},
            include: {carrier: true}
        })
    }

    async deletePromotion(id: string) {
        return this.prisma.promotion.delete({
            where: {id}
        })
    }

}

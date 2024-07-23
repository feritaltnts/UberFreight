import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreatePromotionDto } from './dto/create-promotion.dto';

@Injectable()
export class PromotionsService {
    constructor(private prisma: PrismaService) {}

    async createPromotion(createPromotionDto: CreatePromotionDto) {
        try {
            return await this.prisma.promotion.create({
                data: {
                    title: createPromotionDto.title,
                    startDate: createPromotionDto.startDate,
                    endDate: createPromotionDto.endDate,
                    carrierId: createPromotionDto.carrierId,
                    discount: createPromotionDto.discount,
                },
            });
        } catch (error) {
            throw new Error(`Promotion creation failed: ${error.message}`);
        }
    }

    async getPromotionsByUser(carrierId: string) {
        try {
            return await this.prisma.promotion.findMany({
                where: { carrierId },
                include: { carrier: true },
            });
        } catch (error) {
            throw new Error(`Failed to get promotions: ${error.message}`);
        }
    }

    async deletePromotion(id: string) {
        try {
            return await this.prisma.promotion.delete({
                where: { id },
            });
        } catch (error) {
            throw new Error(`Failed to delete promotion: ${error.message}`);
        }
    }
}

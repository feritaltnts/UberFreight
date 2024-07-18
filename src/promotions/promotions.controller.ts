import { Body, Controller, Delete, Get, Param, Post, UseGuards } from '@nestjs/common';
import { PromotionsService } from './promotions.service';
import { ApiBearerAuth, ApiBody, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CreatePromotionDto } from './dto/create-promotion.dto';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';

@ApiTags('Promotions')
@Controller('promotions')
@UseGuards(JwtAuthGuard)
@ApiBearerAuth('access-token')
export class PromotionsController {
    constructor(private readonly promotiosSerivce: PromotionsService){}

    @Post()
    @ApiOperation({ summary: 'Create promotion' })
    @ApiResponse({ status: 201, description: 'The promotion has been successfully created.' })
    @ApiResponse({ status: 400, description: 'Bad Request' })
    @ApiBody({ type: CreatePromotionDto })
    async createPromotion(@Body() createPromotionDto: CreatePromotionDto) {
        return this.promotiosSerivce.createPromotion(createPromotionDto);
    }


    @Get(':id')
    @ApiOperation({ summary: 'Get all promotions' })
    @ApiResponse({ status: 200, description: 'Return all promotions.' })
    async getPromotions(@Param('id')id: string) {
        return this.promotiosSerivce.getPromotionsByUser(id);
    }

    @Delete(':id')
    @ApiOperation({ summary: 'Delete promotion' })
    @ApiResponse({ status: 200, description: 'The promotion has been successfully deleted.' })
    async deletePromotion(@Param('id') id: string) {
        return this.promotiosSerivce.deletePromotion(id);
    }
}



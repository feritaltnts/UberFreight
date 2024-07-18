import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBody, ApiBearerAuth } from '@nestjs/swagger';
import { CarriersService } from './carriers.service';
import { CreateCarrierDto } from './dto/create-carrier.dto';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';

@ApiTags('carriers')
@Controller('carriers')
@UseGuards(JwtAuthGuard)
@ApiBearerAuth('access-token')
export class CarriersController {
  constructor(private readonly carriersService: CarriersService) {}

  @Post()
  @ApiOperation({ summary: 'Create carrier' })
  @ApiResponse({ status: 201, description: 'The carrier has been successfully created.' })
  @ApiResponse({ status: 400, description: 'Bad Request' })
  @ApiBody({ type: CreateCarrierDto })
  async createCarrier(@Body() createCarrierDto: CreateCarrierDto) {
    return this.carriersService.createCarrier(createCarrierDto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all carriers' })
  @ApiResponse({ status: 200, description: 'Return all carriers.' })
  async getCarriers() {
    return this.carriersService.getCarrier();
  }
}

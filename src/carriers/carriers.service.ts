import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateCarrierDto } from './dto/create-carrier.dto';

@Injectable()
export class CarriersService {
  constructor(private prisma: PrismaService) {}

  async createCarrier(createCarrierDto: CreateCarrierDto) {
    try {
      return await this.prisma.carrier.create({
        data: {
          name: createCarrierDto.name,
        },
      });
    } catch (error) {
      throw new Error(`Carrier creation failed: ${error.message}`);
    }
  }

  async getCarrier() {
    try {
      return await this.prisma.carrier.findMany();
    } catch (error) {
      throw new Error(`Failed to get carriers: ${error.message}`);
    }
  }
}

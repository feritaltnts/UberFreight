import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateCarrierDto } from './dto/create-carrier.dto';

@Injectable()
export class CarriersService {
  constructor(private prisma: PrismaService) {}

  async createCarrier(createCarrierDto: CreateCarrierDto) {
    return this.prisma.carrier.create({
      data: {
        name: createCarrierDto.name,
      },
    });
  }

  async getCarrier() {
    return this.prisma.carrier.findMany();
  }
}

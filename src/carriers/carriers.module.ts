import { Module } from '@nestjs/common';
import { PrismaModule } from 'src/prisma/prisma.module';
import { CarriersService } from './carriers.service';
import { CarriersController } from './carriers.controller';

@Module({
    imports: [PrismaModule],
    providers: [CarriersService],
    controllers: [CarriersController]
})
export class CarriersModule {}

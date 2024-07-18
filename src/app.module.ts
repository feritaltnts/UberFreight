import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { UsersModule } from './users/users.module';
import { PrismaModule } from './prisma/prisma.module';
import { PromotionsModule } from './promotions/promotions.module';
import { AuthModule } from './auth/auth.module';
import { CarriersModule } from './carriers/carriers.module';
import { FavoritesModule } from './favorites/favorites.module';
@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    UsersModule,
    PrismaModule,
    CarriersModule,
    FavoritesModule,
    PromotionsModule,
    AuthModule,
  ],
})
export class AppModule {}

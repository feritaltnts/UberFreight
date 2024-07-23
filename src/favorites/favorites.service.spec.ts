import { Test, TestingModule } from '@nestjs/testing';
import { FavoritesService } from './favorites.service';
import { PrismaService } from '../prisma/prisma.service';
import { CreateFavoriteDto } from './dto/create-favorite.dto';

describe('FavoritesService', () => {
  let service: FavoritesService;
  let prisma: PrismaService;

  const mockPrismaService = {
    favorite: {
      create: jest.fn().mockImplementation((dto) => Promise.resolve({ id: 'some-id', ...dto.data })),
      findMany: jest.fn().mockImplementation(({ where }) => Promise.resolve([{ id: 'some-id', userId: where.userId, carrier: {} }])),
      delete: jest.fn().mockImplementation(({ where }) => Promise.resolve({ id: where.id })),
    },
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        FavoritesService,
        { provide: PrismaService, useValue: mockPrismaService },
      ],
    }).compile();

    service = module.get<FavoritesService>(FavoritesService);
    prisma = module.get<PrismaService>(PrismaService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should create a favorite', async () => {
    const dto: CreateFavoriteDto = { userId: 'user-id', carrierId: 'carrier-id' };

    expect(await service.createFavorite(dto)).toEqual({
      id: 'some-id',
      userId: 'user-id',
      carrierId: 'carrier-id',
    });

    expect(prisma.favorite.create).toHaveBeenCalledWith({
      data: dto,
    });
  });

  it('should get favorites by user', async () => {
    const userId = 'user-id';

    expect(await service.getFavorite(userId)).toEqual([
      {
        id: 'some-id',
        userId: 'user-id',
        carrier: {},
      },
    ]);

    expect(prisma.favorite.findMany).toHaveBeenCalledWith({
      where: { userId },
      include: { carrier: true },
    });
  });

  it('should delete a favorite', async () => {
    const id = 'some-id';

    expect(await service.deleteFavorite(id)).toEqual({
      id,
    });

    expect(prisma.favorite.delete).toHaveBeenCalledWith({
      where: { id },
    });
  });
});

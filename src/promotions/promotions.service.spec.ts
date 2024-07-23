import { Test, TestingModule } from '@nestjs/testing';
import { PromotionsService } from './promotions.service';
import { PrismaService } from '../prisma/prisma.service';
import { CreatePromotionDto } from './dto/create-promotion.dto';

describe('PromotionsService', () => {
  let service: PromotionsService;
  let prisma: PrismaService;

  const mockPrismaService = {
    promotion: {
      create: jest.fn().mockImplementation((dto) => Promise.resolve({ id: 'some-id', ...dto.data })),
      findMany: jest.fn().mockImplementation(({ where }) => Promise.resolve([{ id: 'some-id', ...where }])),
      delete: jest.fn().mockImplementation(({ where }) => Promise.resolve({ id: where.id })),
    },
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        PromotionsService,
        { provide: PrismaService, useValue: mockPrismaService },
      ],
    }).compile();

    service = module.get<PromotionsService>(PromotionsService);
    prisma = module.get<PrismaService>(PrismaService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should create a promotion', async () => {
    const dto: CreatePromotionDto = {
      title: 'Summer Sale',
      startDate: new Date(),
      endDate: new Date(),
      carrierId: 'carrier-id',
      discount: 20,
    };
    
    expect(await service.createPromotion(dto)).toEqual({
      id: 'some-id',
      ...dto,
    });
    
    expect(prisma.promotion.create).toHaveBeenCalledWith({
      data: dto,
    });
  });

  it('should get promotions by user', async () => {
    const carrierId = 'carrier-id';
    
    expect(await service.getPromotionsByUser(carrierId)).toEqual([
      {
        id: 'some-id',
        carrierId,
      },
    ]);

    expect(prisma.promotion.findMany).toHaveBeenCalledWith({
      where: { carrierId },
      include: { carrier: true },
    });
  });

  it('should delete a promotion', async () => {
    const id = 'some-id';

    expect(await service.deletePromotion(id)).toEqual({
      id,
    });

    expect(prisma.promotion.delete).toHaveBeenCalledWith({
      where: { id },
    });
  });
});

import { Test, TestingModule } from '@nestjs/testing';
import { CarriersService } from './carriers.service';
import { PrismaService } from '../prisma/prisma.service';
import { CreateCarrierDto } from './dto/create-carrier.dto';

describe('CarriersService', () => {
  let service: CarriersService;
  let prisma: PrismaService;

  const mockPrismaService = {
    carrier: {
      create: jest.fn().mockImplementation((dto) => Promise.resolve({ id: 'some-id', ...dto.data })),
      findMany: jest.fn().mockImplementation(() => Promise.resolve([{ id: 'some-id', name: 'CarrierName' }])),
    },
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CarriersService,
        { provide: PrismaService, useValue: mockPrismaService },
      ],
    }).compile();

    service = module.get<CarriersService>(CarriersService);
    prisma = module.get<PrismaService>(PrismaService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should create a carrier', async () => {
    const dto: CreateCarrierDto = { name: 'New Carrier' };
    
    expect(await service.createCarrier(dto)).toEqual({
      id: 'some-id',
      name: 'New Carrier',
    });

    expect(prisma.carrier.create).toHaveBeenCalledWith({
      data: dto,
    });
  });

  it('should get all carriers', async () => {
    expect(await service.getCarrier()).toEqual([
      { id: 'some-id', name: 'CarrierName' },
    ]);

    expect(prisma.carrier.findMany).toHaveBeenCalled();
  });
});

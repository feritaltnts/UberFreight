import { IsUUID, IsNumber, IsString, IsDate, Min, Max } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreatePromotionDto {
  @ApiProperty({
    description: 'Title of the promotion',
    example: 'Summer Sale',
  })
  @IsString()
  title: string;

  @ApiProperty({
    description: 'Start date of the promotion',
    example: '2024-07-01T00:00:00.000Z',
  })
  @IsDate()
  startDate: Date;

  @ApiProperty({
    description: 'End date of the promotion',
    example: '2024-07-31T23:59:59.000Z',
  })
  @IsDate()
  endDate: Date;

  @ApiProperty({
    description: 'ID of the carrier',
    example: 'p6o5n4m3-l2k1-j0i9-h8g7-f6e5d4c3b2a1',
  })
  @IsUUID()
  carrierId: string;

  @ApiProperty({
    description: 'Discount percentage',
    example: 20,
  })
  @IsNumber()
  @Min(0)
  @Max(100)
  discount: number;
}

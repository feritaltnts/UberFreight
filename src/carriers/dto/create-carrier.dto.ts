import { IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateCarrierDto {
  @ApiProperty({
    description: 'Carrier name',
    example: 'CarrierName',
  })
  @IsString()
  name: string;
}

import { IsUUID } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class CreateFavoriteDto {
    @ApiProperty({
        description: 'ID of the user',
        example: 'a1b2c3d4-e5f6-7g8h-9i0j-k1l2m3n4o5p6',
    })
    @IsUUID()
    userId: string;

    @ApiProperty({
        description : 'ID of the carrirer',
        example: 'p6o5n4m3-l2k1-j0i9-h8g7-f6e5d4c3b2a1'
    })
    @IsUUID()
    carrierId: string;
}
import { ApiProperty } from "@nestjs/swagger";

export class CreateAlbumDto {
    @ApiProperty({ example: 'Winter', description: 'Название альбома' })
    readonly albumName: string;

    @ApiProperty({ example: 'John Lennon', description: 'Имя исполнителя' })
    readonly author: string;
}
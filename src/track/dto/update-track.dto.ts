import { ApiProperty } from '@nestjs/swagger';

export class UpdateTrackDto {
  @ApiProperty({ example: 'Imagine', description: 'Название трека', required: false })
  trackName?: string;

  @ApiProperty({ example: 'John Lennon', description: 'Имя исполнителя', required: false })
  artist?: string;

  @ApiProperty({ example: 'Imagine all the people...', description: 'Текст песни', required: false })
  trackText?: string;

  @ApiProperty({ example: 'Imagine', description: 'Название альбома', required: false })
  albumId?: string;
}
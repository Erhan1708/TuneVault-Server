import { ApiProperty } from '@nestjs/swagger';

export class CreateTrackDto {
  @ApiProperty({ example: 'Imagine', description: 'Название трека' })
  readonly trackName: string;

  @ApiProperty({ example: 'John Lennon', description: 'Имя исполнителя' })
  readonly artist: string;

  @ApiProperty({ example: 'Imagine all the people...', description: 'Текст песни' })
  readonly trackText: string;

  @ApiProperty({ example: 'Imagine', description: 'Название альбома' })
  readonly albumName: string;
}

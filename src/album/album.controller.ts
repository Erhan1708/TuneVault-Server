import { Body, Controller, Get, Param, Post, UploadedFiles, UseInterceptors } from "@nestjs/common";
import { ApiBody, ApiConsumes, ApiOperation, ApiParam, ApiTags } from "@nestjs/swagger";
import { AlbumService } from "./album.service";
import { FileService } from "src/file/file.service";
import { FileFieldsInterceptor } from "@nestjs/platform-express";
import { CreateAlbumDto } from "./dto/create-album.dto";

@ApiTags('Albums')
@Controller('api/albums')
export class AlbumController {
    constructor(
       private albumService: AlbumService,
       private fileService: FileService,
    ) {}

    @Post('create-album')
    @ApiOperation({ summary: 'Добавить альбом' })
    @ApiConsumes('multipart/form-data')
    @ApiBody({
        description: 'Данные для создания альбома',
        schema: {
            type: 'object',
            properties: {
                albumName: { type:'string', example: 'Winter' },
                author: { type:'string', example: 'John Lennon' },
                imgPath: { type:'string', format: 'binary'},
            },
            required: ['albumName', 'author', 'imgPath'],
        }
    })
    @UseInterceptors(FileFieldsInterceptor([
        { name: 'imgPath', maxCount: 1}
    ]))
    createAlbum(
        @UploadedFiles() files,
        @Body() dto: CreateAlbumDto,
    ) {
        const { imgPath } = files
        return this.albumService.createAlbum(dto, imgPath[0])
    }

    @Get()
    @ApiOperation({ summary: 'Получить список альбомов' })
    getAllAlbums() {
        return this.albumService.getAllAlbums()
    }

    @Get(':id')
    @ApiParam({ name: 'id', description: 'Идентификатор альбома', type:'string' })
    @ApiOperation({ summary: 'Получить альбом по идентификатору' })
    getAlbumOne(@Param('id') id: string) {
        return this.albumService.getAlbumOne(id)
    }
}
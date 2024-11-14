import { Body, Controller, Delete, Get, Param, Patch, Post, Put, UploadedFiles, UseInterceptors } from "@nestjs/common";
import { ApiBody, ApiConsumes, ApiOperation, ApiParam, ApiTags } from "@nestjs/swagger";
import { TrackService } from "./track.service";
import { CreateTrackDto } from "./dto/create-track.dto";
import { FileFieldsInterceptor } from "@nestjs/platform-express";
import { FileService, FileType } from "src/file/file.service";
import { UpdateTrackDto } from "./dto/update-track.dto";

@ApiTags('Tracks')
@Controller('api/tracks')
export class TrackController {

    constructor(
        private trackService: TrackService,
        private fileService: FileService,
    ) {

    }

    @Post('create-track')
    @ApiOperation({ summary: 'Добавить трек' })
    @ApiConsumes('multipart/form-data')
    @ApiBody({
        description: 'Данные для создания трека',
        schema: {
            type: 'object',
            required: ['trackName', 'artist', 'imgPath', 'audio'],
            properties: {
                trackName: { type: 'string', example: 'Imagine' },
                artist: { type: 'string', example: 'John Lennon' },
                trackText: { type: 'string', example: 'Imagine all the people...' },
                albumName: { type: 'string', example: 'Imagine' },
                imgPath: { type: 'string', format: 'binary' },
                audio: { type: 'string', format: 'binary' },
            },
        },
    })
    @UseInterceptors(FileFieldsInterceptor([
        { name: 'imgPath', maxCount: 1 },
        { name: 'audio', maxCount: 1 },
    ]))
    createTrack(
        @UploadedFiles() files,
        @Body() dto: CreateTrackDto,
    ) {
        const { imgPath, audio } = files;
        return this.trackService.createTrack(dto, imgPath[0], audio[0]);
    }

    @Get()
    @ApiOperation({ summary: 'Получить список треков'})
    getAllTracks() {
        return this.trackService.getAllTracks()
    }

    @Get(':id')
    @ApiParam({ name: 'id', description: 'Идентификатор трека', type: 'string' })
    @ApiOperation({ summary: 'Получить трек по идентификатору'})
    getTrackOne(@Param('id') id: string) {
        return this.trackService.getTrackOne(id)
    }

    @Patch('update-track/:id')
    @ApiParam({ name: 'id', description: 'Идентификатор трека', type: 'string' })
    @ApiOperation({ summary: 'Частично обновить трек по ID' })
    @ApiConsumes('multipart/form-data')
    @ApiBody({
        description: 'Данные для частичного обновления трека',
        schema: {
            type: 'object',
            properties: {
                trackName: { type: 'string', example: '' },
                artist: { type: 'string', example: '' },
                trackText: { type: 'string', example: '' },
                albumName: { type: 'string', example: '' },
                imgPath: { type: 'string', format: 'binary' },
                audio: { type: 'string', format: 'binary' },
            },
        },
    })
    @UseInterceptors(FileFieldsInterceptor([
        { name: 'imgPath', maxCount: 1 },
        { name: 'audio', maxCount: 1 },
    ]))
    async updateTrack(
        @Param('id') id: string,
        @UploadedFiles() files,
        @Body() dto: UpdateTrackDto,
    ) {
        const track = await this.trackService.getTrackOne(id);

        const updateData: Partial<UpdateTrackDto & { imgPath?: string; audio?: string }> = {};

        if (dto.trackName) updateData.trackName = dto.trackName;
        if (dto.artist) updateData.artist = dto.artist;
        if (dto.trackText) updateData.trackText = dto.trackText;
        if (dto.albumName) updateData.albumName = dto.albumName;

        if (files?.imgPath?.[0]) {
            if (track.imgPath) {
                this.fileService.removeDirectoryFile(track.imgPath);
            }
            updateData.imgPath = this.fileService.createDirectoryFile(FileType.IMAGE, files.imgPath[0]);
        }

        if (files?.audio?.[0]) {
            if (track.audio) {
                this.fileService.removeDirectoryFile(track.audio);
            }
            updateData.audio = this.fileService.createDirectoryFile(FileType.AUDIO, files.audio[0]);
        }

        return this.trackService.updateTrack(id, updateData);
    }

    @Delete('delete/:id')
    @ApiParam({ name: 'id', description: 'Идентификатор трека', type: 'string' })
    @ApiOperation({ summary: 'Удалить трек по идентификатору'})
    deleteTrack(@Param('id') id: string) {
        return this.trackService.deleteTrack(id)
    }
}

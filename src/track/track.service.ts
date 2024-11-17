import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Track, TrackDocument } from "./schemas/track.schema";
import { Model } from "mongoose";
import { CreateTrackDto } from "./dto/create-track.dto";
import { v4 as uuidv4 } from 'uuid';
import { CategoryType, FileService, FileType } from "src/file/file.service";
import { Album, AlbumDocument } from "src/album/schemas/album.schema";

@Injectable()
export class TrackService {
    constructor(
        @InjectModel(Track.name) private trackModel: Model<TrackDocument>,
        @InjectModel(Album.name) private albumModel: Model<AlbumDocument>,
        private fileService: FileService,
    ) {}

    async createTrack(dto: CreateTrackDto, img, audio): Promise<Track> {
        const audioPath = this.fileService.createDirectoryFile(FileType.AUDIO, audio, CategoryType.TRACK)
        const imgPath = this.fileService.createDirectoryFile(FileType.IMAGE, img, CategoryType.TRACK)

        const album = await this.albumModel.findOne({ id: dto.albumId });

        if (!album) {
            throw new HttpException('Album not found', HttpStatus.NOT_FOUND);
        }
        
        const track = await this.trackModel.create({
            ...dto,
            listens: 0,
            id: uuidv4(),
            imgPath: imgPath,
            audio: audioPath,
            albumId: album.id,
            albumName: album.albumName,
        });

        album.tracks.push(track)
        await album.save();

        return track;
    }

    async getAllTracks(): Promise<Track[]> {
        const tracks = await this.trackModel.find();
        return tracks;
    }

    async getTrackOne(id: string): Promise<Track> {
        const track = await this.trackModel.findOne({ id });
        return track;
    }

    async updateTrack(id: string, updateData: Partial<CreateTrackDto & { imgPath?: string; audio?: string }>): Promise<Track> {
        const updatedTrack = await this.trackModel.findOneAndUpdate({ id }, updateData, { new: true });
        return updatedTrack;
    }

    async deleteTrack(id: string): Promise<Track> {
        const track = await this.trackModel.findOneAndDelete({ id });

        if (track) {
            const album = await this.albumModel.findOne({ id: track.albumId });
            if (album) {
                album.tracks = album.tracks.filter(t => t.id!== track.id);
                await album.save();
            }
        }
        return track;
    }
}
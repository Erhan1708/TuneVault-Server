import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Album, AlbumDocument } from "./schemas/album.schema";
import { Model } from "mongoose";
import { CreateAlbumDto } from "./dto/create-album.dto";
import { v4 as uuidv4 } from "uuid";
import { CategoryType, FileService, FileType } from "src/file/file.service";

@Injectable()
export class AlbumService {
    constructor(
        @InjectModel(Album.name)
        private albumModel: Model<AlbumDocument>,
        private fileService: FileService,
    ) {}

    async createAlbum(dto: CreateAlbumDto, img): Promise<Album> {
        const imgPath = this.fileService.createDirectoryFile(FileType.IMAGE, img, CategoryType.ALBUM)
        const album = await this.albumModel.create({
            ...dto,
            id: uuidv4(),
            imgPath: imgPath
        })

        return album
    }

    async getAllAlbums(): Promise<Album[]> {
        const albums = await this.albumModel.find()
        return albums
    }

    async getAlbumOne(id: string): Promise<Album> {
        const album = await this.albumModel.findOne({ id })
        return album
    }

    async updateAlbum(id: string, updateData: Partial<CreateAlbumDto & { imgPath?: string }>): Promise<Album> {
        const updatedAlbum = await this.albumModel.findOneAndUpdate({ id }, updateData, { new: true })
        return updatedAlbum
    }

    async deleteAlbum(id: string): Promise<Album> {
        const album = await this.albumModel.findOneAndDelete({ id })
        return album
    }
}
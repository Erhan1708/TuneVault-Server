import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { Album, AlbumSchema } from "./schemas/album.schema";
import { AlbumController } from "./album.controller";
import { AlbumService } from "./album.service";
import { FileService } from "src/file/file.service";

@Module({
    imports: [
        MongooseModule.forFeature([{ name: Album.name, schema: AlbumSchema}])
    ],
    controllers: [AlbumController],
    providers: [
        AlbumService,
        FileService
    ],
    exports: [MongooseModule]
})
export class AlbumModule {}
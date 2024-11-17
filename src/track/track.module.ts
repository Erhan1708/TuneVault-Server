import { Module } from "@nestjs/common";
import { TrackController } from "./track.controller";
import { TrackService } from "./track.service";
import { MongooseModule } from "@nestjs/mongoose";
import { Track, TrackSchema } from "./schemas/track.schema";
import { FileService } from "src/file/file.service";
import { Album, AlbumSchema } from "src/album/schemas/album.schema";
import { AlbumModule } from "src/album/album.module";

@Module({
    imports: [
        MongooseModule.forFeature([
            { name: Track.name, schema: TrackSchema },
            { name: Album.name, schema: AlbumSchema },
        ]),
        AlbumModule
    ],
    controllers: [TrackController],
    providers : [
        TrackService, 
        FileService
    ]
})

export class TrackModule {}
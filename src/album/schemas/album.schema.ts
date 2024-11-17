import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";
import { Track } from "src/track/schemas/track.schema";

export type AlbumDocument = Album & Document

@Schema()
export class Album {
    @Prop()
    id: string;

    @Prop()
    albumName: string;
    
    @Prop()
    author: string;
    
    @Prop()
    imgPath: string;
    
    @Prop([Track])
    tracks: Track[];
}

export const AlbumSchema = SchemaFactory.createForClass(Album)

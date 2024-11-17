import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type TrackDocument = Track & Document

@Schema()
export class Track {
  @Prop()
  id: string;

  @Prop()
  trackName: string;

  @Prop()
  artist: string;

  @Prop()
  trackText: string;

  @Prop({ default: 0 })
  listens: number;

  @Prop()
  audio: string;

  @Prop()
  imgPath: string;
  
  @Prop()
  albumName: string;
  
  @Prop()
  albumId: string;
}

export const TrackSchema = SchemaFactory.createForClass(Track)

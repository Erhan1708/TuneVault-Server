import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { TrackModule } from './track/track.module';
import { AlbumModule } from './album/album.module';
import { FileModule } from './file/file.module';
import { ServeStaticModule } from '@nestjs/serve-static';
import * as path from 'path';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    AlbumModule,
    TrackModule,
    FileModule,
    ServeStaticModule.forRoot({rootPath: path.resolve(__dirname, 'static')}),
    ConfigModule.forRoot({ isGlobal: true, envFilePath: '.env'}),
    MongooseModule.forRoot('mongodb+srv://erhan:gtx1708erhan@clustertunevaultserver.aweti.mongodb.net/?retryWrites=true&w=majority&appName=ClusterTuneVaultServer')
  ],
})
export class AppModule {}

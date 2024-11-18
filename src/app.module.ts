import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { TrackModule } from './track/track.module';
import { AlbumModule } from './album/album.module';
import { FileModule } from './file/file.module';
import { ServeStaticModule } from '@nestjs/serve-static';
import * as path from 'path';
import { AppController } from './app.controller';

@Module({
  imports: [
    AlbumModule,
    TrackModule,
    FileModule,
    ServeStaticModule.forRoot({rootPath: path.resolve(__dirname, 'static')}),
    ServeStaticModule.forRoot({rootPath: path.resolve(__dirname, 'static/admin'), serveRoot: '/admin'}),
    MongooseModule.forRoot('mongodb+srv://erhan:gtx1708erhan@clustertunevaultserver.aweti.mongodb.net/?retryWrites=true&w=majority&appName=ClusterTuneVaultServer')
  ],
  controllers: [
    AppController
  ]
})
export class AppModule {}

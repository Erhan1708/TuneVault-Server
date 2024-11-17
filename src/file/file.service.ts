import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import * as path from "path";
import * as fs from "fs"
import { v4 as uuidv4 } from 'uuid';

export enum FileType {
    AUDIO = 'audio',
    IMAGE = 'image',
    VIDEO = 'video'
}

export enum CategoryType {
    ALBUM = 'album',
    TRACK = 'track'
}

@Injectable()
export class FileService {
    createDirectoryFile(type: FileType, file, category: CategoryType): string {
        try {
            const fileException = file.originalname.split('.').pop();
            const fileName = uuidv4() + '.' + fileException

            const filePath = path.resolve(
                __dirname,
                '..',
                'static',
                category,
                type === FileType.IMAGE ? 'images' : 'audios'
            )
            
            if (!fs.existsSync(filePath)) {
                fs.mkdirSync(filePath, { recursive: true })
            }

            fs.writeFileSync(path.resolve(filePath, fileName), file.buffer)

            return `${category}/${type === FileType.IMAGE ? 'images' : 'audios'}/${fileName}`;
        } catch (e) {
            throw new HttpException(e.message, HttpStatus.INTERNAL_SERVER_ERROR)
        }
    }

    removeDirectoryFile(filePath: string): void {
        try {
            const fullPath = path.resolve(__dirname, '..', 'static', filePath);
    
            if (fs.existsSync(fullPath)) {
                fs.unlinkSync(fullPath)
            } else {
                throw new HttpException('Файл не найден', HttpStatus.NOT_FOUND);
            }
        } catch (e) {
            throw new HttpException(e.message, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}
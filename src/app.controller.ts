import { Controller, Get, Res } from '@nestjs/common';
import { Response } from 'express';

@Controller()
export class AppController {
  @Get()
  homePage(@Res() res: Response) {
    res.send(`
      <div style="display: flex; align-items: center; justify-content: center; width: 100%; height: 100vh;">
        <button 
          onclick="location.href='/api'" 
          style="background-color: #0d6efd; color: white; padding: 0.375rem 0.75rem; margin: 5px; border: none; cursor: pointer; border-radius: 0.25rem; font-size: 1rem;">
          Документация
        </button>
        <button 
          onclick="location.href='/admin'" 
          style="background-color: #198754; color: white; padding: 0.375rem 0.75rem; margin: 5px; border: none; cursor: pointer; border-radius: 0.25rem; font-size: 1rem;">
          Админка
        </button>
      </div>
    `);
  }
}
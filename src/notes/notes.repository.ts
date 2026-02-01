import { Injectable } from '@nestjs/common';
import { readFile, writeFile } from 'fs/promises';
import { existsSync, mkdirSync, writeFileSync } from 'fs';
import { join } from 'path';
import { Note } from './entities/note.entity';

@Injectable()
export class NotesRepository {
  private readonly filePath = join(process.cwd(), 'data', 'notes.json');
  private readonly dirPath = join(process.cwd(), 'data');

  constructor() {
    this.ensureDataFileExists();
  }

  private ensureDataFileExists(): void {
    if (!existsSync(this.dirPath)) {
      mkdirSync(this.dirPath, { recursive: true });
    }

    if (!existsSync(this.filePath)) {
      writeFileSync(this.filePath, '[]', 'utf-8');
    }
  }

  async readNotes(): Promise<Note[]> {
    const fileContent = await readFile(this.filePath, 'utf-8');
    return JSON.parse(fileContent);
  }

  async writeNotes(notes: Note[]): Promise<void> {
    return await writeFile(this.filePath, JSON.stringify(notes), 'utf-8');
  }
}

import { Injectable } from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';
import { NotesRepository } from './notes.repository';
import { CreateNoteDto } from './dto/create-note.dto';
import { Note } from './entities/note.entity';

@Injectable()
export class NotesService {
  constructor(private readonly repository: NotesRepository) {}

  async create(createNoteDto: CreateNoteDto): Promise<Note> {
    const now = new Date();

    const newNote: Note = {
      id: uuidv4(),
      ...createNoteDto,
      tags: createNoteDto.tags || [],
      createdAt: now,
      updatedAt: now,
    };

    const notes = await this.repository.readNotes();

    notes.push(newNote);

    await this.repository.writeNotes(notes);

    return newNote;
  }
}

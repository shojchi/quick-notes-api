import { Injectable, NotFoundException } from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';
import { NotesRepository } from './notes.repository';
import { CreateNoteDto } from './dto/create-note.dto';
import { Note } from './entities/note.entity';
import { UpdateNoteDto } from './dto/update-note.dto';

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

  async findAll(): Promise<Note[]> {
    return await this.repository.readNotes();
  }

  async findOne(id: string): Promise<Note> {
    const notes = await this.repository.readNotes();

    const note = notes.find((n) => n.id === id);

    if (!note) {
      throw new NotFoundException(`Note with ID "${id}" not found`);
    }

    return note;
  }

  async update(id: string, updateNoteDto: UpdateNoteDto): Promise<Note> {
    const notes = await this.repository.readNotes();
    const noteIndex = notes.findIndex((n) => n.id === id);

    if (noteIndex === -1) {
      throw new NotFoundException(`Note with ID "${id}" not found`);
    }

    const updatedNote = {
      ...notes[noteIndex],
      ...updateNoteDto,
      updatedAt: new Date(),
    };

    notes[noteIndex] = updatedNote;

    await this.repository.writeNotes(notes);

    return updatedNote;
  }

  async remove(id: string): Promise<void> {
    const notes = await this.repository.readNotes();
    const noteIndex = notes.findIndex((n) => n.id === id);

    if (noteIndex === -1) {
      throw new NotFoundException(`Note with ID "${id}" not found`);
    }

    notes.splice(noteIndex, 1);

    await this.repository.writeNotes(notes);
  }
}

import { Body, Controller, Param, Get, Post, Patch, Delete } from '@nestjs/common';
import { NotesService } from './notes.service';
import { CreateNoteDto } from './dto/create-note.dto';
import { UpdateNoteDto } from './dto/update-note.dto';

@Controller('notes')
export class NotesController {
  constructor(private readonly notesService: NotesService) {}

  @Post()
  createNote(@Body() createNoteDto: CreateNoteDto) {
    return this.notesService.create(createNoteDto);
  }

  @Get()
  getAllNotes() {
    return this.notesService.findAll();
  }

  @Get(':id')
  getSpecificNote(@Param('id') id: string) {
    return this.notesService.findOne(id);
  }

  @Patch(':id')
  updateNote(@Param('id') id: string, @Body() updateNoteDto: UpdateNoteDto) {
    return this.notesService.update(id, updateNoteDto);
  }

  @Delete(':id')
  deleteNote(@Param('id') id: string) {
    return this.notesService.remove(id);
  }
}

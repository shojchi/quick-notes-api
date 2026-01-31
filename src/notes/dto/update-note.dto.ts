import { PartialType } from '@nestjs/mapped-types';
import { CreateNoteDto } from './create-note.dto';

/**
 * UpdateNoteDto
 *
 * Data Transfer Object for updating an existing note.
 *
 * Uses PartialType utility to make ALL fields from CreateNoteDto optional.
 * This allows partial updates - client can send only the fields they want to change.
 *
 * Example:
 * - Update only title: { title: "New Title" }
 * - Update only tags: { tags: ["new-tag"] }
 * - Update multiple: { title: "New Title", content: "New content" }
 */
export class UpdateNoteDto extends PartialType(CreateNoteDto) {
  // All fields from CreateNoteDto are now optional:
  // - title?: string;
  // - content?: string;
  // - tags?: string[];
}

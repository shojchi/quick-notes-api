/**
 * Note Entity
 *
 * Represents a quick note in the system.
 * This is the data model for how notes are stored and retrieved.
 */
export interface Note {
  /**
   * Unique identifier for the note
   * Generated using UUID v4
   */
  id: string;

  /**
   * Note title/summary
   * Required, non-empty string
   * Max length: 200 characters
   */
  title: string;

  /**
   * Full note content
   * Can be multi-line, markdown-formatted
   * Max length: 10,000 characters
   */
  content: string;

  /**
   * Tags for categorization and search
   * Optional array of strings
   * Example: ['react', 'hooks', 'frontend']
   */
  tags: string[];

  /**
   * Timestamp when note was created
   * ISO 8601 format
   * Set automatically on creation
   */
  createdAt: Date;

  /**
   * Timestamp when note was last updated
   * ISO 8601 format
   * Updated automatically on modification
   */
  updatedAt: Date;
}

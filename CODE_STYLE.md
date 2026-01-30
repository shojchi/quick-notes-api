# Code Style Guide - Quick Notes API

> **Nest.js and TypeScript coding conventions for consistency and maintainability**

## 🎯 Philosophy

This project follows **official N est.js and TypeScript conventions** to:

- Maintain consistency with the ecosystem
- Make code readable and maintainable
- Follow industry best practices
- Align with Angular developers' expectations (similar patterns)

**Sources:**

- [Nest.js Official CLI conventions](https://docs.nestjs.com/cli/overview)
- [TypeScript Official Style Guide](https://www.typescriptlang.org/docs/handbook/declaration-files/do-s-and-don-ts.html)
- [Google TypeScript Style Guide](https://google.github.io/styleguide/tsguide.html)
- [Airbnb JavaScript Style Guide](https://github.com/airbnb/javascript) (TypeScript applicable parts)

---

## 📁 File Naming Conventions

### General Rule: **kebab-case** for ALL files

| Type            | Pattern                  | Example                     | ✅ Correct | ❌ Wrong                   |
| --------------- | ------------------------ | --------------------------- | ---------- | -------------------------- |
| **Module**      | `<name>.module.ts`       | `notes.module.ts`           | ✅         | `NotesModule.ts`           |
| **Controller**  | `<name>.controller.ts`   | `notes.controller.ts`       | ✅         | `notes-controller.ts`      |
| **Service**     | `<name>.service.ts`      | `notes.service.ts`          | ✅         | `NotesService.ts`          |
| **Repository**  | `<name>.repository.ts`   | `notes.repository.ts`       | ✅         | `notesRepository.ts`       |
| **Entity**      | `<name>.entity.ts`       | `note.entity.ts`            | ✅         | `Note.ts`                  |
| **Interface**   | `<name>.interface.ts`    | `note.interface.ts`         | ✅         | `INote.ts`                 |
| **DTO**         | `<action>-<name>.dto.ts` | `create-note.dto.ts`        | ✅         | `CreateNote.dto.ts`        |
| **Test**        | `<name>.spec.ts`         | `notes.service.spec.ts`     | ✅         | `notes.test.ts`            |
| **E2E Test**    | `<name>.e2e-spec.ts`     | `notes.e2e-spec.ts`         | ✅         | `notes.e2e.ts`             |
| **Guard**       | `<name>.guard.ts`        | `auth.guard.ts`             | ✅         | `AuthGuard.ts`             |
| **Interceptor** | `<name>.interceptor.ts`  | `logging.interceptor.ts`    | ✅         | `loggingInterceptor.ts`    |
| **Pipe**        | `<name>.pipe.ts`         | `validation.pipe.ts`        | ✅         | `ValidationPipe.ts`        |
| **Filter**      | `<name>.filter.ts`       | `http-exception.filter.ts`  | ✅         | `HttpExceptionFilter.ts`   |
| **Middleware**  | `<name>.middleware.ts`   | `logger.middleware.ts`      | ✅         | `LoggerMiddleware.ts`      |
| **Decorator**   | `<name>.decorator.ts`    | `current-user.decorator.ts` | ✅         | `CurrentUser.decorator.ts` |

**Key principle:** File names are **always lowercase with dashes**, class names are **PascalCase**.

---

## 🏷️ Naming Conventions

### Classes, Interfaces, Types

```typescript
// ✅ Classes: PascalCase with suffix
export class NotesController {}
export class NotesService {}
export class NotesRepository {}
export class CreateNoteDto {}

// ✅ Interfaces: PascalCase (NO "I" prefix!)
export interface Note {}
export interface Config {}

// ✅ Types: PascalCase
export type NoteStatus = "draft" | "published";

// ✅ Enums: PascalCase for enum, SCREAMING_SNAKE_CASE for values
export enum NotePriority {
  LOW = "LOW",
  MEDIUM = "MEDIUM",
  HIGH = "HIGH",
}

// ❌ AVOID: "I" prefix for interfaces (old C# convention)
export interface INote {} // NO!
export interface Note {} // YES!
```

### Variables, Functions, Methods

```typescript
// ✅ Variables: camelCase
const noteId = 'abc123';
const currentUser = { ... };
let isLoading = false;

// ✅ Constants: SCREAMING_SNAKE_CASE (for true constants)
const MAX_NOTES_PER_PAGE = 50;
const API_BASE_URL = 'http://localhost:3000';

// ✅ Functions/Methods: camelCase, verb-based
function createNote() { }
function findNoteById(id: string) { }
async function deleteNote(id: string) { }

// ✅ Boolean variables: is/has/can prefix
const isValid = true;
const hasPermission = false;
const canEdit = checkPermissions();

// ✅ Array variables: plural nouns
const notes = [];
const users = [];
const errors = [];

// ❌ AVOID: Hungarian notation
const strTitle = 'Note';  // NO!
const title = 'Note';     // YES!
```

### Private Members

```typescript
// ✅ Private properties/methods: prefix with underscore (optional but common)
class NotesService {
  private _cache: Map<string, Note>;
  private readonly _maxCacheSize = 100;

  private _invalidateCache(): void {}
}

// ✅ OR: No underscore (also acceptable)
class NotesService {
  private cache: Map<string, Note>;
  private readonly maxCacheSize = 100;

  private invalidateCache(): void {}
}

// Choose one style and be consistent! This project uses NO underscore.
```

---

## 📂 Folder Structure

### Feature Module Structure

```
src/
├── notes/                         # Feature module (kebab-case)
│   ├── dto/                       # DTOs subfolder
│   │   ├── create-note.dto.ts
│   │   ├── update-note.dto.ts
│   │   └── index.ts               # Barrel export (optional)
│   ├── entities/                  # Domain models
│   │   ├── note.entity.ts
│   │   └── index.ts
│   ├── interfaces/                # Interfaces (if needed)
│   │   └── note.interface.ts
│   ├── notes.controller.ts        # Controller
│   ├── notes.service.ts           # Service
│   ├── notes.repository.ts        # Repository (optional)
│   ├── notes.module.ts            # Module definition
│   ├── notes.controller.spec.ts  # Controller tests
│   └── notes.service.spec.ts     # Service tests
│
├── common/                        # Shared utilities
│   ├── decorators/
│   ├── filters/
│   ├── guards/
│   ├── interceptors/
│   ├── pipes/
│   └── utils/
│
├── config/                        # Configuration
│   └── configuration.ts
│
├── app.module.ts                  # Root module
└── main.ts                        # Entry point
```

### Rules

- ✅ One feature module per folder
- ✅ Group related files together (controller + service + module)
- ✅ Use subfolders for DTOs, entities, interfaces
- ✅ Keep shared code in `common/`
- ❌ Don't nest feature modules deeply

---

## 📝 Code Formatting

### Line Length

```typescript
// ✅ Keep lines under 100 characters (120 max)
export class NotesController {
  constructor(
    private readonly notesService: NotesService,
    private readonly configService: ConfigService,
  ) {}
}

// ✅ Break long lines at logical points
const note = await this.notesRepository.findOne({
  where: { id },
  relations: ["author", "tags"],
});

// ❌ Avoid horizontal scrolling
const note = await this.notesRepository.findOne({
  where: { id },
  relations: ["author", "tags", "comments", "attachments"],
});
```

### Indentation

```typescript
// ✅ 2 spaces (standard TypeScript/Nest.js)
@Injectable()
export class NotesService {
  constructor(private repository: NotesRepository) {}

  async findAll(): Promise<Note[]> {
    return this.repository.getAll();
  }
}

// ❌ Not 4 spaces or tabs
```

### Spacing

```typescript
// ✅ Space after keywords
if (condition) { }
for (const item of items) { }
while (isRunning) { }

// ✅ Space around operators
const sum = a + b;
const isValid = x > 0 && y < 10;

// ✅ No space before function parentheses (except named functions)
function greet() { }          // ✅ Function declaration
const greet = () => { };      // ✅ Arrow function
obj.method() { };             // ✅ Method

// ❌ Excessive spacing
const  sum  =  a  +  b;       // NO!
```

---

## 🎨 TypeScript Style

### Type Annotations

```typescript
// ✅ Explicit return types for public methods
export class NotesService {
  async create(dto: CreateNoteDto): Promise<Note> {
    // ...
  }

  findAll(): Promise<Note[]> {
    // ...
  }
}

// ✅ Type function parameters
function processNote(id: string, data: Partial<Note>): void {
  // ...
}

// ✅ Let TypeScript infer simple variable types
const count = 5; // Inferred as number
const notes = []; // Inferred as any[] (but add type!)
const notes: Note[] = []; // ✅ Better!

// ❌ Don't use 'any' (use 'unknown' if needed)
function process(data: any) {} // NO!
function process(data: unknown) {} // Better!
```

### Interfaces vs Types

```typescript
// ✅ Use interfaces for object shapes
export interface Note {
  id: string;
  title: string;
  content: string;
}

// ✅ Use types for unions, intersections, primitives
export type NoteStatus = "draft" | "published" | "archived";
export type NotesMap = Record<string, Note>;

// ✅ Both work, but interfaces are preferred for objects
```

### Optional vs Undefined

```typescript
// ✅ Use optional properties (?:)
interface Note {
  id: string;
  tags?: string[]; // Optional, might not exist
}

// ✅ Use undefined for explicit "can be undefined"
interface Config {
  apiKey: string | undefined; // Explicit: can be string or undefined
}

// ❌ Don't mark as required then use undefined
interface Bad {
  value: string | undefined; // Should use value?: string
}
```

---

## 🏗️ Class Structure

### Order of Class Members

```typescript
@Injectable()
export class NotesService {
  // 1. Public static properties
  static readonly DEFAULT_LIMIT = 50;

  // 2. Private static properties
  private static _instance: NotesService;

  // 3. Public instance properties
  public readonly config: Config;

  // 4. Private instance properties
  private cache: Map<string, Note>;
  private readonly repository: NotesRepository;

  // 5. Constructor
  constructor(repository: NotesRepository) {
    this.repository = repository;
  }

  // 6. Public static methods
  static getInstance(): NotesService {}

  // 7. Private static methods
  private static validate(): void {}

  // 8. Lifecycle methods (if applicable)
  onModuleInit() {}

  // 9. Public instance methods
  async create(dto: CreateNoteDto): Promise<Note> {}
  async findAll(): Promise<Note[]> {}

  // 10. Private instance methods
  private buildQuery(): Query {}
  private mapToEntity(dto: CreateNoteDto): Note {}
}
```

---

## 🧪 Testing Conventions

### Test File Structure

```typescript
// notes.service.spec.ts
import { Test, TestingModule } from "@nestjs/testing";
import { NotesService } from "./notes.service";
import { NotesRepository } from "./notes.repository";

describe("NotesService", () => {
  let service: NotesService;
  let repository: NotesRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        NotesService,
        {
          provide: NotesRepository,
          useValue: {
            getAll: jest.fn(),
            save: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<NotesService>(NotesService);
    repository = module.get<NotesRepository>(NotesRepository);
  });

  describe("create", () => {
    it("should create a note with generated ID", async () => {
      // Arrange
      const dto = { title: "Test", content: "Content" };

      // Act
      const result = await service.create(dto);

      // Assert
      expect(result.id).toBeDefined();
      expect(result.title).toBe("Test");
    });
  });
});
```

### Test Naming

- ✅ `describe` blocks: Class/method name
- ✅ `it` blocks: Human-readable behavior description

```typescript
describe("NotesService", () => {
  describe("create", () => {
    it("should create a note with auto-generated ID", () => {});
    it("should add timestamps to new note", () => {});
    it("should throw if title is empty", () => {});
  });
});
```

---

## 📦 Import Organization

### Import Order

```typescript
// 1. Node.js built-in modules
import { readFile, writeFile } from "fs/promises";

// 2. External dependencies
import { Injectable, NotFoundException } from "@nestjs/common";
import { v4 as uuidv4 } from "uuid";

// 3. Internal modules (absolute paths)
import { NotesRepository } from "./notes.repository";
import { CreateNoteDto } from "./dto/create-note.dto";

// 4. Types/Interfaces (grouped separately - optional)
import type { Note } from "./entities/note.entity";
```

### Import Style

```typescript
// ✅ Named imports (preferred)
import { Controller, Get, Post } from "@nestjs/common";

// ✅ Namespace import (for utils)
import * as fs from "fs/promises";

// ✅ Default import (when appropriate)
import express from "express";

// ❌ Mixed default + named (avoid if possible)
import express, { Request } from "express"; // Confusing
```

---

## 💬 Comments & Documentation

### JSDoc for Public APIs

````typescript
/**
 * Creates a new note with auto-generated ID and timestamps.
 *
 * @param createNoteDto - The note data from the request
 * @returns The created note with ID and timestamps
 * @throws {BadRequestException} If title is empty
 *
 * @example
 * ```typescript
 * const note = await service.create({
 *   title: 'My Note',
 *   content: 'Note content'
 * });
 * ```
 */
async create(createNoteDto: CreateNoteDto): Promise<Note> {
  // Implementation
}
````

### Inline Comments

```typescript
// ✅ Explain WHY, not WHAT
// Use temp file + atomic rename to prevent file corruption
await writeFile(tempPath, data);
await rename(tempPath, finalPath);

// ❌ Don't state the obvious
// Increment counter
counter++;
```

### TODO Comments

```typescript
// ✅ Use TODO for future work
// TODO: Add caching layer for frequently accessed notes
// TODO(yourname): Optimize search algorithm for large datasets

// ✅ Use FIXME for known issues
// FIXME: Race condition when multiple requests update same note
```

---

## 🚫 Anti-Patterns to Avoid

### Don't Use

```typescript
// ❌ var (use const/let)
var count = 0;

// ❌ any (use unknown or specific type)
function process(data: any) {}

// ❌ Non-null assertion (!.) without certainty

const value = maybeNull!.property;

// ❌ == or != (use === or !==)
if (value == null) {
} // NO!
if (value === null || value === undefined) {
} // YES!

// ❌ Inline types (extract to interface)
function create(note: { title: string; content: string }) {} // NO!
function create(note: CreateNoteDto) {} // YES!

// ❌ Deeply nested code
if (a) {
  if (b) {
    if (c) {
      // NO! Extract to functions or early returns
    }
  }
}
```

### Do Use

```typescript
// ✅ const by default, let when reassignment needed
const notes = [];
let counter = 0;

// ✅ Early returns to reduce nesting
function findNote(id: string): Note | null {
  if (!id) return null;
  if (notes.length === 0) return null;
  return notes.find((n) => n.id === id);
}

// ✅ Optional chaining (?.)
const title = note?.title ?? "Untitled";

// ✅ Nullish coalescing (??)
const limit = queryLimit ?? 50;

// ✅ Template literals
const message = `Found ${count} notes`; // Not: 'Found ' + count + ' notes'
```

---

## 🎯 Nest.js-Specific Patterns

### Dependency Injection

```typescript
// ✅ Constructor injection (readonly preferred)
@Injectable()
export class NotesService {
  constructor(
    private readonly repository: NotesRepository,
    private readonly config: ConfigService,
  ) {}
}

// ❌ Property injection (rarely needed)
@Injectable()
export class NotesService {
  @Inject(NotesRepository)
  private repository: NotesRepository;
}
```

### Async/Await

```typescript
// ✅ Use async/await (not .then())
async findAll(): Promise<Note[]> {
  const notes = await this.repository.getAll();
  return notes.filter(n => !n.isArchived);
}

// ❌ Promise chains (harder to read)
findAll(): Promise<Note[]> {
  return this.repository.getAll()
    .then(notes => notes.filter(n => !n.isArchived));
}
```

---

## 🛠️ Tools & Configuration

### ESLint

```json
// .eslintrc.js (generated by Nest CLI)
{
  "parser": "@typescript-eslint/parser",
  "extends": [
    "plugin:@typescript-eslint/recommended",
    "plugin:prettier/recommended"
  ],
  "rules": {
    "@typescript-eslint/interface-name-prefix": "off",
    "@typescript-eslint/explicit-function-return-type": "warn",
    "@typescript-eslint/no-explicit-any": "error"
  }
}
```

### Prettier

```json
// .prettierrc
{
  "singleQuote": true,
  "trailingComma": "all",
  "printWidth": 100,
  "tabWidth": 2,
  "semi": true
}
```

### Run

```bash
# Lint code
npm run lint

# Format code
npm run format

# Both
npm run lint && npm run format
```

---

## 📋 Checklist for New Files

Before committing:

- [ ] File name is kebab-case
- [ ] Class name is PascalCase with appropriate suffix
- [ ] Public methods have return type annotations
- [ ] No `any` types used
- [ ] ESLint passes
- [ ] Prettier formatted
- [ ] Tests written (if applicable)
- [ ] JSDoc added for public APIs

---

## 🔗 References

- [Nest.js CLI Schematics](https://docs.nestjs.com/cli/usages#nest-generate)
- [TypeScript Do's and Don'ts](https://www.typescriptlang.org/docs/handbook/declaration-files/do-s-and-don-ts.html)
- [Google TypeScript Style Guide](https://google.github.io/styleguide/tsguide.html)
- [Airbnb JavaScript Style Guide](https://github.com/airbnb/javascript)

---

**Remember:** Consistency is more important than perfection. When in doubt, follow what the Nest CLI generates! 🎯

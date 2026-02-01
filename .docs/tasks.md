# Implementation Tasks

> **Progress tracker for building the Quick Notes API**

## 🎯 MVP Scope

Build a simple REST API for managing developer quick notes with:

- CRUD operations (Create, Read, Update, Delete)
- Basic search functionality
- File-based storage (JSON)
- No authentication (single user for MVP)

---

## ✅ Step 0: Project Setup

- [x] **0.1 Initialize Nest.js project**
  - [x] Install Node.js v18+ (check with `node -v`)
  - [x] Install Nest CLI globally: `npm i -g @nestjs/cli`
  - [x] Create new project: `nest new .` (in current directory)
  - [x] Explore generated structure
  - [x] Run dev server: `npm run start:dev`
  - [x] Test default endpoint: `http://localhost:3000`
  - _Learn: Nest CLI, project structure, hot reload_

- [x] **0.2 Set up documentation**
  - [x] Create `.docs/` folder
  - [x] Create `.ai/` folder
  - [x] Write documentation files
  - [x] Create README.md in root
  - [x] Add .gitignore
  - _Learn: Documentation-driven development_

- [ ] **0.3 Configure TypeScript**
  - [ ] Review `tsconfig.json`
  - [ ] Enable strict mode
  - [ ] Understand compiler options
  - _Learn: TypeScript configuration for Node.js_

---

## 📚 Step 1: Understanding Nest.js Architecture (Learning Phase)

> **Goal:** Understand how Nest.js works BEFORE writing code

- [x] **1.1 Explore default generated code**
  - [x] Read `src/main.ts` - Application bootstrap
  - [x] Read `src/app.module.ts` - Root module
  - [x] Read `src/app.controller.ts` - Default controller
  - [x] Read `src/app.service.ts` - Default service
  - [x] Understand the connection: main → module → controller → service
  - _Learn: Application lifecycle, module imports, dependency injection_

- [x] **1.2 Experiment with default endpoint**
  - [x] Modify the default `getHello()` to return different text
  - [x] Add a new method in controller
  - [x] Add a new method in service
  - [x] See hot reload in action
  - _Learn: Controller-Service pattern, hot reload_

- [x] **1.3 Understand decorators**
  - [x] What does `@Module()` do?
  - [x] What does `@Controller()` do?
  - [x] What does `@Injectable()` do?
  - [x] What does `@Get()` do?
  - [x] Compare to Angular decorators
  - _Learn: Decorator pattern, metadata_

**Checkpoint:** Can you explain the flow from HTTP request → Controller → Service → Response?

---

## 📚 Step 2: Data Modeling

> **Goal:** Design the data structures BEFORE implementation

- [x] **2.1 Define Note entity**
  - [x] Create `src/notes/entities/note.entity.ts`
  - [x] Define `Note` interface with all fields
  - [x] Consider: id, title, content, tags, createdAt, updatedAt
  - [x] Document field purposes
  - _Learn: Data modeling, TypeScript interfaces_

- [x] **2.2 Design DTOs (Data Transfer Objects)**
  - [x] Create `src/notes/dto/create-note.dto.ts`
  - [x] Create `src/notes/dto/update-note.dto.ts`
  - [x] Understand why separate DTO from Entity
  - [x] Plan validation rules
  - _Learn: DTO pattern, separation of concerns_

**Checkpoint:** Can you explain the difference between Entity and DTO?

---

## 📚 Step 3: Generate Notes Module

> **Goal:** Use Nest CLI to scaffold the Notes feature

- [x] **3.1 Generate Notes module**
  - [x] Run: `nest g module notes`
  - [x] Examine what was created
  - [x] Check `app.module.ts` - module was manually imported!
  - _Learn: Nest CLI generators, module registration_

- [x] **3.2 Generate Notes controller**
  - [x] Run: `nest g controller notes`
  - [x] Examine generated file and test file
  - [x] Check `notes.module.ts` - controller was auto-registered!
  - _Learn: Controller scaffolding, automatic registration_

- [x] **3.3 Generate Notes service**
  - [x] Run: `nest g service notes`
  - [x] Examine generated file and test file
  - [x] Check `notes.module.ts` - service was auto-registered!
  - [x] Check controller - service is injectable!
  - _Learn: Service scaffolding, dependency injection_

**Checkpoint:** Understand the relationship: Module → Controller → Service

---

## 📚 Step 4: Implement DTOs with Validation

> **Goal:** Create type-safe, validated data contracts

- [x] **4.1 Install validation packages**
  - [x] Run: `npm install class-validator class-transformer`
  - [x] Understand what each package does
  - _Learn: npm packages, dependency management_

- [x] **4.2 Create CreateNoteDto**
  - [x] Define class with properties: title, content, tags
  - [x] Add validation decorators (@IsString, @IsNotEmpty, etc.)
  - [x] Add @ApiProperty() for Swagger (later)
  - _Learn: class-validator, decorators_

- [x] **4.3 Create UpdateNoteDto**
  - [x] Use `PartialType(CreateNoteDto)` utility
  - [x] Understand why all fields are optional in update
  - _Learn: Type utilities, partial updates_

- [x] **4.4 Enable ValidationPipe globally**
  - [x] Add ValidationPipe in `main.ts`
  - [x] Configure options (whitelist, transform)
  - [x] Test with invalid data
  - _Learn: Global pipes, validation configuration_

**Checkpoint:** Can you explain what happens when invalid data is sent to an endpoint?

---

## 📚 Step 5: Implement Controller Endpoints

> **Goal:** Create REST API endpoints following conventions

- [x] **5.1 Create Note - POST /notes**

  ```typescript
  @Post()
  create(@Body() createNoteDto: CreateNoteDto) {
    return this.notesService.create(createNoteDto);
  }
  ```

  - [x] Implement method signature
  - [x] Use `@Body()` decorator
  - [x] Call service method (returns mock data for now)
  - _Learn: POST requests, request body handling_

- [x] **5.2 Get All Notes - GET /notes**

  ```typescript
  @Get()
  findAll(@Query('search') search?: string) {
    return this.notesService.findAll(search);
  }
  ```

  - [x] Implement method
  - [ ] Optional query parameter for search (later)
  - _Learn: GET requests, query parameters_

- [x] **5.3 Get One Note - GET /notes/:id**

  ```typescript
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.notesService.findOne(id);
  }
  ```

  - [x] Implement method
  - [x] Use `@Param()` decorator
  - _Learn: Route parameters, dynamic routing_

- [x] **5.4 Update Note - PATCH /notes/:id**

  ```typescript
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateNoteDto: UpdateNoteDto) {
    return this.notesService.update(id, updateNoteDto);
  }
  ```

  - [x] Implement method
  - [x] Use both @Param and @Body
  - _Learn: PATCH vs PUT, partial updates_

- [x] **5.5 Delete Note - DELETE /notes/:id**

  ```typescript
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.notesService.remove(id);
  }
  ```

  - [x] Implement method
  - _Learn: DELETE requests, resource deletion_

**Checkpoint:** Test all endpoints with placeholder service methods (return fake data)

---

## 📚 Step 6: Implement Service Business Logic

> **Goal:** Implement actual data operations with file storage

- [ ] **6.1 Design storage strategy**
  - [ ] Decide on file location: `data/notes.json`
  - [ ] Decide on data structure: Array of notes
  - [ ] Plan for concurrent access
  - _Learn: File-based persistence, data structures_

- [ ] **6.2 Implement file operations helper**
  - [ ] Create `src/notes/notes.repository.ts`
  - [ ] Method: `readNotes(): Promise<Note[]>`
  - [ ] Method: `writeNotes(notes: Note[]): Promise<void>`
  - [ ] Handle file not found (first run)
  - [ ] Use `fs/promises` for async file I/O
  - _Learn: File system operations, async/await, repository pattern_

- [ ] **6.3 Implement create() in service**
  - [ ] Generate unique ID (use `uuid` package)
  - [ ] Add timestamps (createdAt, updatedAt)
  - [ ] Read existing notes
  - [ ] Add new note to array
  - [ ] Write back to file
  - [ ] Return created note
  - _Learn: Data creation, ID generation, timestamps_

- [ ] **6.4 Implement findAll() in service**
  - [ ] Read notes from file
  - [ ] If search query exists, filter notes
  - [ ] Search in title, content, tags
  - [ ] Return filtered results
  - _Learn: Array operations, filtering, search logic_

- [ ] **6.5 Implement findOne() in service**
  - [ ] Read notes from file
  - [ ] Find note by ID
  - [ ] Throw NotFoundException if not found
  - [ ] Return note
  - _Learn: Error handling, HTTP exceptions_

- [ ] **6.6 Implement update() in service**
  - [ ] Read notes from file
  - [ ] Find note by ID
  - [ ] Throw NotFoundException if not found
  - [ ] Merge updates (preserve createdAt, update updatedAt)
  - [ ] Write back to file
  - [ ] Return updated note
  - _Learn: Partial updates, immutability, object spreading_

- [ ] **6.7 Implement remove() in service**
  - [ ] Read notes from file
  - [ ] Find and remove note
  - [ ] Throw NotFoundException if not found
  - [ ] Write back to file
  - [ ] Return success message or deleted note
  - _Learn: Array filtering, deletion patterns_

**Checkpoint:** All CRUD operations work end-to-end!

---

## 📚 Step 7: Error Handling & Validation

> **Goal:** Robust error handling and user-friendly error messages

- [ ] **7.1 Use built-in HTTP exceptions**
  - [ ] Use `NotFoundException` for missing resources
  - [ ] Use `BadRequestException` for invalid data
  - [ ] Use `InternalServerErrorException` for server errors
  - _Learn: Exception types, HTTP status codes_

- [ ] **7.2 Create custom exception filter (optional)**
  - [ ] Format error responses consistently
  - [ ] Add timestamp and path to errors
  - _Learn: Exception filters, response formatting_

- [ ] **7.3 Add error handling to file operations**
  - [ ] Handle file read errors
  - [ ] Handle file write errors
  - [ ] Handle JSON parse errors
  - [ ] Log errors appropriately
  - _Learn: Try-catch, graceful degradation_

**Checkpoint:** API returns proper HTTP status codes and clear error messages

---

## 📚 Step 8: Testing

> **Goal:** Write tests to ensure code quality

- [ ] **8.1 Unit test NotesService**
  - [ ] Mock file operations
  - [ ] Test create()
  - [ ] Test findAll() with and without search
  - [ ] Test findOne() - success and not found
  - [ ] Test update()
  - [ ] Test remove()
  - _Learn: Jest, mocking, unit testing_

- [ ] **8.2 Unit test NotesController**
  - [ ] Mock NotesService
  - [ ] Test all endpoints
  - [ ] Verify service methods are called correctly
  - _Learn: Controller testing, dependency mocking_

- [ ] **8.3 E2E testing (optional)**
  - [ ] Test full request/response cycle
  - [ ] Use supertest for HTTP assertions
  - _Learn: End-to-end testing, integration testing_

**Checkpoint:** All tests pass, >80% code coverage

---

## 📚 Step 9: API Documentation with Swagger

> **Goal:** Auto-generate interactive API documentation

- [ ] **9.1 Install Swagger**
  - [ ] Run: `npm install @nestjs/swagger`
  - [ ] Configure in `main.ts`
  - [ ] Access Swagger UI at `/api`
  - _Learn: OpenAPI, Swagger UI_

- [ ] **9.2 Document DTOs**
  - [ ] Add `@ApiProperty()` to DTO fields
  - [ ] Add examples and descriptions
  - _Learn: API documentation_

- [ ] **9.3 Document endpoints**
  - [ ] Add `@ApiTags('notes')`
  - [ ] Add `@ApiOperation()` for each endpoint
  - [ ] Add `@ApiResponse()` for status codes
  - _Learn: API design, documentation best practices_

**Checkpoint:** Complete, interactive API docs available at `/api`

---

## 📚 Step 10: Configuration & Environment

> **Goal:** Proper configuration management

- [ ] **10.1 Install config module**
  - [ ] Run: `npm install @nestjs/config`
  - [ ] Create `.env` file
  - [ ] Add to `.gitignore`
  - _Learn: Environment variables, configuration_

- [ ] **10.2 Configure port and data path**
  - [ ] Add PORT to .env
  - [ ] Add DATA_PATH to .env
  - [ ] Use ConfigService in code
  - _Learn: ConfigService, environment-based configuration_

**Checkpoint:** App can be configured via .env file

---

## 🚀 Step 11: Polish & Deployment

- [ ] **11.1 Add README.md**
  - [ ] Project description
  - [ ] Installation steps
  - [ ] API endpoints documentation
  - [ ] Example requests

- [ ] **11.2 Add logging**
  - [ ] Use built-in Logger
  - [ ] Log important operations
  - [ ] Log errors with context

- [ ] **11.3 Production build**
  - [ ] Run: `npm run build`
  - [ ] Test production build
  - [ ] Optimize bundle size

---

## ✅ MVP Complete Checklist

- [ ] All 5 CRUD endpoints working
- [ ] Data persists to JSON file
- [ ] Search functionality works
- [ ] Input validation works
- [ ] Error handling is robust
- [ ] Tests pass
- [ ] Swagger documentation available
- [ ] Code is clean and well-commented

---

## 🔮 Future Enhancements (Post-MVP)

### Phase 2: Improvements

- [ ] Add tags filtering
- [ ] Add pagination
- [ ] Add sorting (by date, title)
- [ ] Add favorites feature
- [ ] Add note categories

### Phase 3: Database

- [ ] Migrate to PostgreSQL
- [ ] Use TypeORM
- [ ] Add migrations
- [ ] Implement proper transactions

### Phase 4: Authentication

- [ ] Add JWT authentication
- [ ] User registration/login
- [ ] Multi-user support
- [ ] User-specific notes

### Phase 5: Advanced Features

- [ ] GraphQL API (alternative to REST)
- [ ] WebSocket support (real-time updates)
- [ ] Full-text search with Elasticsearch
- [ ] Note sharing
- [ ] Note history/versioning

### Phase 6: CLI Tool

- [ ] Create separate CLI package (`notes-cli`)
- [ ] Implement commands:
  - [ ] `notes add "title" --content "content"` - Create note
  - [ ] `notes list` - List all notes
  - [ ] `notes search "query"` - Search notes
  - [ ] `notes get <id>` - Get specific note
  - [ ] `notes update <id>` - Update note
  - [ ] `notes delete <id>` - Delete note
- [ ] Use `commander` for CLI framework
- [ ] Use `axios` to call REST API
- [ ] Add `chalk` for colored output
- [ ] Support configuration: `--api <url>` to specify API endpoint
- [ ] Optional: Add offline mode (direct file access)
- [ ] Publish to npm as installable global package
- [ ] _Learn: CLI tool development, npm publishing_

**See:** ADR-004 in `.docs/decisions.md` for architectural decision details

---

## 📊 Progress Tracking

| Step | Description                    | Status | Date       | Notes                        |
| ---- | ------------------------------ | ------ | ---------- | ---------------------------- |
| 0.1  | Initialize Nest.js project     | 🟢     | 2026-01-30 | Project scaffolded           |
| 0.2  | Set up documentation           | 🟢     | 2026-01-30 | Docs created                 |
| 0.3  | Configure TypeScript           | 🔵     | -          | Using default strict config  |
| 1.1  | Explore default generated code | 🟢     | 2026-01-30 | Understood bootstrap flow    |
| 1.2  | Experiment with endpoints      | 🟢     | 2026-01-30 | Added /goodbye route         |
| 1.3  | Understand decorators          | 🟢     | 2026-01-30 | Compared with Angular        |
| 2.1  | Define Note entity             | 🟢     | 2026-01-31 | Created interface            |
| 2.2  | Design DTOs                    | 🟢     | 2026-01-31 | Created Create & Update DTOs |
| 3.1  | Generate Notes module          | 🟢     | 2026-01-31 | CLI generated                |
| 3.2  | Generate Notes controller      | 🟢     | 2026-01-31 | CLI generated with tests     |
| 3.3  | Generate Notes service         | 🟢     | 2026-01-31 | CLI generated with tests     |
| 4.1  | Install validation packages    | 🟢     | 2026-01-31 | class-validator installed    |
| 4.2  | Create CreateNoteDto           | 🟢     | 2026-01-31 | With full validation         |
| 4.3  | Create UpdateNoteDto           | 🟢     | 2026-01-31 | Using PartialType            |
| 4.4  | Enable ValidationPipe          | 🟢     | 2026-01-31 | Globally configured          |
| 5.1  | POST /notes endpoint           | 🟢     | 2026-01-31 | Create note (mock)           |
| 5.2  | GET /notes endpoint            | 🟢     | 2026-01-31 | Get all notes (mock)         |
| 5.3  | GET /notes/:id endpoint        | 🟢     | 2026-01-31 | Get one note (mock)          |
| 5.4  | PATCH /notes/:id endpoint      | 🟢     | 2026-01-31 | Update note (mock)           |
| 5.5  | DELETE /notes/:id endpoint     | 🟢     | 2026-01-31 | Delete note (mock)           |
| 6.x  | Implement Service Logic        | 🟡     | -          | Next up!                     |

**Legend:**

- 🔵 Not Started
- 🟡 In Progress
- 🟢 Completed
- 🔴 Blocked

---

**Remember:** Focus on learning, not speed. Each step builds foundational knowledge! 🎯

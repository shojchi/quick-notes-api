# Quick Notes API - Requirements

> **MVP Requirements for Learning Project**

## 🎯 Project Goal

Build a simple REST API to manage quick developer notes, focusing on learning Nest.js fundamentals.

**Primary Goal:** Learn Nest.js, Node.js, and backend development
**Secondary Goal:** Create a useful tool for daily development work

---

## 📋 Functional Requirements

### FR1: Note Management (CRUD)

**FR1.1: Create Note**

- User can create a new note with title and content
- Note receives unique ID automatically
- Timestamps (createdAt, updatedAt) added automatically
- Tags are optional

**FR1.2: View Notes**

- User can retrieve all notes
- User can retrieve a single note by ID
- Notes returned with all fields (id, title, content, tags, timestamps)

**FR1.3: Update Note**

- User can update any field of an existing note
- updatedAt timestamp updated automatically
- Partial updates supported (only update provided fields)
- Returns error if note not found

**FR1.4: Delete Note**

- User can delete a note by ID
- Returns error if note not found
- Deletion is permanent (no soft delete for MVP)

### FR2: Search & Filter

**FR2.1: Basic Search**

- User can search notes by text query
- Search looks in: title, content, tags
- Case-insensitive search
- Returns matching notes only

**FR2.2: Filter by Tag (Future)**

- Not in MVP
- Will allow filtering notes by specific tag

---

## 🔧 Non-Functional Requirements

### NFR1: Data Persistence

**NFR1.1: Storage**

- Notes stored in JSON file (`data/notes.json`)
- File created automatically if doesn't exist
- Data survives server restarts

**NFR1.2: Data Integrity**

- No duplicate IDs allowed
- All required fields validated before save
- Atomic file writes (no corruption)

### NFR2: API Design

**NFR2.1: REST Conventions**

- Follow RESTful API design principles
- Proper HTTP methods (GET, POST, PATCH, DELETE)
- Proper HTTP status codes (200, 201, 404, 400, 500)
- Consistent response format

**NFR2.2: Validation**

- Input validation on all endpoints
- Clear error messages for invalid data
- Type safety (TypeScript)

**NFR2.3: Documentation**

- Swagger/OpenAPI documentation available
- Interactive API testing via Swagger UI
- Clear endpoint descriptions

### NFR3: Code Quality

**NFR3.1: Architecture**

- Follow Nest.js best practices (Module-Controller-Service)
- Clear separation of concerns
- Dependency injection for testability

**NFR3.2: Testing**

- Unit tests for services
- Unit tests for controllers
- Test coverage >80% (goal)

**NFR3.3: Code Style**

- TypeScript strict mode enabled
- ESLint configured
- Prettier for formatting
- Clear naming conventions

### NFR4: Developer Experience

**NFR4.1: Development**

- Hot reload in dev mode
- Clear error messages
- Easy setup (minimal dependencies)

**NFR4.2: Documentation**

- README with setup instructions
- API examples
- Learning notes in `.docs/`

---

## 🚫 Explicitly Out of Scope (MVP)

These features are intentionally excluded from MVP to keep the project small and focused on learning:

### Authentication & Security

- ❌ User authentication (JWT, sessions, etc.)
- ❌ Authorization (roles, permissions)
- ❌ Rate limiting
- ❌ CORS configuration (use defaults)
- ❌ API keys
- ❌ Multi-user support

### Advanced Features

- ❌ Database (PostgreSQL, MongoDB) - using file storage
- ❌ GraphQL API - REST only for MVP
- ❌ WebSockets / Real-time updates
- ❌ Caching (Redis, etc.)
- ❌ Background jobs / Queues
- ❌ Email notifications
- ❌ File uploads

### Data Features

- ❌ Pagination (will load all notes for MVP)
- ❌ Sorting (beyond default order)
- ❌ Advanced search (fuzzy matching, etc.)
- ❌ Note categories/folders
- ❌ Note sharing
- ❌ Note versioning/history
- ❌ Soft delete / Trash

### DevOps

- ❌ Docker containerization
- ❌ CI/CD pipelines
- ❌ Production deployment
- ❌ Monitoring/Logging service integration
- ❌ Performance optimization
- ❌ Scaling considerations

---

## 📊 Data Model

### Note Entity

```typescript
interface Note {
  id: string; // UUID v4, auto-generated
  title: string; // Required, 1-200 characters
  content: string; // Required, can be empty string
  tags: string[]; // Optional, array of tag strings
  createdAt: Date; // Auto-generated on create
  updatedAt: Date; // Auto-updated on modify
}
```

### Field Validation Rules

| Field     | Type          | Required | Validation                  |
| --------- | ------------- | -------- | --------------------------- |
| id        | string (UUID) | Auto     | Valid UUID v4               |
| title     | string        | Yes      | 1-200 characters, not empty |
| content   | string        | Yes      | Max 10,000 characters       |
| tags      | string[]      | No       | Each tag: 1-50 characters   |
| createdAt | Date          | Auto     | Valid ISO date              |
| updatedAt | Date          | Auto     | Valid ISO date              |

---

## 🔌 API Endpoints

### Base URL

```
http://localhost:3000
```

### Endpoints

| Method | Endpoint              | Description                          | Request Body  | Response        |
| ------ | --------------------- | ------------------------------------ | ------------- | --------------- |
| GET    | `/notes`              | Get all notes (with optional search) | -             | Note[]          |
| GET    | `/notes?search=query` | Search notes                         | -             | Note[]          |
| GET    | `/notes/:id`          | Get single note                      | -             | Note            |
| POST   | `/notes`              | Create note                          | CreateNoteDto | Note            |
| PATCH  | `/notes/:id`          | Update note                          | UpdateNoteDto | Note            |
| DELETE | `/notes/:id`          | Delete note                          | -             | Success message |

### Request/Response Examples

**POST /notes** - Create Note

```json
// Request
{
  "title": "React useEffect Hook",
  "content": "useEffect(() => {\n  // effect logic\n}, [deps]);",
  "tags": ["react", "hooks", "javascript"]
}

// Response (201 Created)
{
  "id": "550e8400-e29b-41d4-a716-446655440000",
  "title": "React useEffect Hook",
  "content": "useEffect(() => {\n  // effect logic\n}, [deps]);",
  "tags": ["react", "hooks", "javascript"],
  "createdAt": "2026-01-30T18:00:00.000Z",
  "updatedAt": "2026-01-30T18:00:00.000Z"
}
```

**GET /notes** - Get All Notes

```json
// Response (200 OK)
[
  {
    "id": "550e8400-e29b-41d4-a716-446655440000",
    "title": "React useEffect Hook",
    "content": "useEffect(() => {\n  // effect logic\n}, [deps]);",
    "tags": ["react", "hooks", "javascript"],
    "createdAt": "2026-01-30T18:00:00.000Z",
    "updatedAt": "2026-01-30T18:00:00.000Z"
  }
]
```

**GET /notes/:id** - Get Single Note

```json
// Response (200 OK) - Same as create response
// Error (404 Not Found)
{
  "statusCode": 404,
  "message": "Note with ID 'invalid-id' not found",
  "error": "Not Found"
}
```

**PATCH /notes/:id** - Update Note

```json
// Request (partial update)
{
  "title": "Updated Title"
}

// Response (200 OK) - Full note with updated fields
```

**DELETE /notes/:id** - Delete Note

```json
// Response (200 OK)
{
  "message": "Note successfully deleted"
}
```

---

## 🎯 Success Criteria

The MVP is complete when:

- ✅ All 5 CRUD endpoints work correctly
- ✅ Data persists to file system
- ✅ Search functionality works
- ✅ Input validation prevents invalid data
- ✅ Proper error handling with clear messages
- ✅ Swagger documentation is accessible
- ✅ Unit tests pass with >80% coverage
- ✅ Code follows Nest.js best practices
- ✅ README has clear setup/usage instructions

---

## 📈 Future Roadmap (Post-MVP)

### Version 2.0: Enhanced Features

- Pagination support
- Advanced search (fuzzy matching)
- Tags filtering
- Sorting options
- Favorites/pinned notes

### Version 3.0: Database Integration

- PostgreSQL with TypeORM
- Database migrations
- Better concurrency handling
- Performance optimization

### Version 4.0: Multi-User

- JWT authentication
- User registration/login
- User-specific notes
- Note sharing

### Version 5.0: Advanced

- GraphQL API
- Real-time updates (WebSockets)
- Docker deployment
- Cloud deployment (AWS/GCP)

---

**Note:** This is a learning project. The focus is on understanding concepts, not building a production-ready system. Keep it simple! 🎯

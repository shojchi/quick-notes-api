# Quick Notes API 📝

> A lightweight REST API for managing developer quick notes, built with Nest.js as a learning project.

## 🎯 Project Purpose

This project serves two goals:

1. **Learn Nest.js and backend development** - Coming from Angular/frontend background
2. **Build a useful tool** - Quick notes API for daily developer work

## 🚀 Quick Start

### Prerequisites

- Node.js v18+ ([Download](https://nodejs.org/))
- npm v8+ (comes with Node.js)

### Installation

```bash
# Install Nest CLI globally (if not already installed)
npm install -g @nestjs/cli

# Install dependencies
npm install

# Run in development mode (with hot reload)
npm run start:dev

# Build for production
npm run build

# Run tests
npm test
```

### Access the API

- **API Base URL:** `http://localhost:3000`
- **Swagger Docs:** `http://localhost:3000/api` (after implementation)

## 📚 Project Documentation

All documentation is in the `.docs/` folder:

| Document                                   | Purpose                          |
| ------------------------------------------ | -------------------------------- |
| [README.md](.docs/README.md)               | Documentation index              |
| [requirements.md](.docs/requirements.md)   | Project requirements & API specs |
| [tasks.md](.docs/tasks.md)                 | Implementation tasks & progress  |
| [learning-path.md](.docs/learning-path.md) | Nest.js concepts roadmap         |
| [rules.md](.docs/rules.md)                 | AI assistant guidelines          |

**Start here:** [.docs/README.md](.docs/README.md)

## 🔌 API Endpoints (MVP)

| Method   | Endpoint     | Description                                   |
| -------- | ------------ | --------------------------------------------- |
| `GET`    | `/notes`     | Get all notes (with optional `?search=query`) |
| `GET`    | `/notes/:id` | Get single note by ID                         |
| `POST`   | `/notes`     | Create new note                               |
| `PATCH`  | `/notes/:id` | Update existing note                          |
| `DELETE` | `/notes/:id` | Delete note                                   |

### Example Usage

```bash
# Create a note
curl -X POST http://localhost:3000/notes \
  -H "Content-Type: application/json" \
  -d '{
    "title": "React useEffect Hook",
    "content": "useEffect(() => { }, [deps]);",
    "tags": ["react", "hooks"]
  }'

# Get all notes
curl http://localhost:3000/notes

# Search notes
curl http://localhost:3000/notes?search=react

# Get specific note
curl http://localhost:3000/notes/{id}

# Update note
curl -X PATCH http://localhost:3000/notes/{id} \
  -H "Content-Type: application/json" \
  -d '{ "title": "Updated Title" }'

# Delete note
curl -X DELETE http://localhost:3000/notes/{id}
```

## 🛠️ Tech Stack

- **Runtime:** Node.js v18+
- **Framework:** [Nest.js](https://nestjs.com/) v10+
- **Language:** TypeScript 5+ (strict mode)
- **Validation:** class-validator, class-transformer
- **Testing:** Jest (built into Nest.js)
- **Documentation:** Swagger/OpenAPI
- **Storage:** JSON file (MVP) → PostgreSQL (future)

## 📁 Project Structure

```
quick-notes-api/
├── .ai/                    # AI assistant configuration
│   └── rules.md           # Quick reference
├── .docs/                 # Project documentation
│   ├── README.md          # Docs index
│   ├── requirements.md    # Requirements & API specs
│   ├── tasks.md           # Tasks & progress
│   ├── learning-path.md   # Nest.js learning roadmap
│   └── rules.md           # Full AI guidelines
├── src/                   # Source code
│   ├── notes/             # Notes feature module
│   │   ├── dto/           # Data Transfer Objects
│   │   ├── entities/      # Data models
│   │   ├── notes.controller.ts
│   │   ├── notes.service.ts
│   │   └── notes.module.ts
│   ├── app.module.ts      # Root module
│   └── main.ts            # Application entry point
├── data/                  # JSON storage (created on first run)
│   └── notes.json
├── test/                  # E2E tests
├── package.json
├── tsconfig.json
└── README.md              # This file
```

## 🎓 Learning Focus

### Nest.js Concepts Covered

- ✅ **Modules** - Organizing features
- ✅ **Controllers** - Handling HTTP requests
- ✅ **Services** - Business logic layer
- ✅ **DTOs** - Data validation & transformation
- ✅ **Pipes** - ValidationPipe for automatic validation
- ✅ **Exception Filters** - Error handling
- ✅ **Dependency Injection** - Nest.js DI container
- ✅ **File System** - JSON file storage
- ✅ **Testing** - Unit & E2E tests
- ✅ **Swagger** - API documentation

### Angular → Nest.js Parallels

If you know Angular, you already understand these Nest.js concepts:

| Angular           | Nest.js                   |
| ----------------- | ------------------------- |
| `@Component()`    | `@Controller()`           |
| `@Injectable()`   | `@Injectable()` (same!)   |
| `@NgModule()`     | `@Module()`               |
| Route Guards      | Guards with `CanActivate` |
| HTTP Interceptors | Interceptors              |
| Form Validation   | DTO Validation            |

## 🧪 Testing

```bash
# Unit tests
npm run test

# E2E tests
npm run test:e2e

# Test coverage
npm run test:cov

# Watch mode (during development)
npm run test:watch
```

## 📦 Build & Deploy

```bash
# Build production bundle
npm run build

# Run production build
npm run start:prod
```

## 🔮 Future Enhancements

### Phase 2: Improvements (Planned)

- [ ] Pagination for large note collections
- [ ] Tag filtering
- [ ] Sorting options
- [ ] Favorites feature

### Phase 3: Database (Planned)

- [ ] PostgreSQL integration
- [ ] TypeORM
- [ ] Database migrations

### Phase 4: Authentication (Planned)

- [ ] JWT authentication
- [ ] Multi-user support
- [ ] User-specific notes

### Phase 5: Advanced (Ideas)

- [ ] GraphQL API
- [ ] WebSocket support
- [ ] Docker containerization
- [ ] Cloud deployment

## 🤝 Contributing

This is a personal learning project, but feedback and suggestions are welcome!

## 📄 License

MIT - Feel free to use this for your own learning!

## 📞 Questions?

Check the `.docs/` folder for detailed documentation, learning paths, and implementation guides.

---

**Happy Learning! 🚀**

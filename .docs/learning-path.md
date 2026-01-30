# Nest.js Learning Path

> **From Angular Developer to Nest.js Mastery**

This document outlines the concepts you'll learn building the Quick Notes API, organized by dependency and complexity.

## 🎯 Learning Philosophy

**You already know:**

- TypeScript & Decorators
- Dependency Injection
- Modular architecture
- RxJS and async patterns
- Testing mindset

**You're learning:**

- Backend/server-side thinking
- HTTP request/response cycle
- API design patterns
- File system operations
- Nest.js-specific patterns

## 📚 Phase 1: Foundations (Week 1)

### 1.1 Node.js Basics

**Status:** 🔵 Not Started

**Concepts:**

- [ ] Node.js runtime vs browser
- [ ] Event loop basics
- [ ] CommonJS vs ES Modules
- [ ] npm/package.json
- [ ] File system (`fs/promises`)

**Angular Connection:**

```typescript
// Angular: Browser APIs
window.localStorage.setItem("key", "value");

// Node.js: File system APIs
import { writeFile } from "fs/promises";
await writeFile("data.json", JSON.stringify(data));
```

**Resources:**

- [Node.js Getting Started](https://nodejs.org/en/docs/guides/getting-started-guide/)
- [Understanding the Event Loop](https://nodejs.org/en/docs/guides/event-loop-timers-and-nexttick/)

---

### 1.2 TypeScript in Nest.js

**Status:** 🔵 Not Started

**Concepts:**

- [ ] tsconfig.json for Node.js
- [ ] Decorators (review + new ones)
- [ ] Type inference in Nest.js
- [ ] Interface vs Type vs Class
- [ ] Generics in DTOs

**Angular Connection:**

```typescript
// Both use decorators heavily!
@Component({ ... })    // Angular
@Controller('notes')   // Nest.js

@Injectable()          // Both use this!
```

**Practice:**

- Compare your Angular `tsconfig.json` with Nest.js version
- Notice similarities in decorator patterns

---

### 1.3 Nest.js Architecture

**Status:** 🔵 Not Started

**Concepts:**

- [ ] Module-based architecture
- [ ] Controllers → Services → Repositories pattern
- [ ] Dependency Injection (DI) container
- [ ] Providers and exports
- [ ] Imports vs Exports

**Angular Connection:**

```typescript
// Angular Module
@NgModule({
  imports: [CommonModule],
  declarations: [MyComponent],
  providers: [MyService]
})

// Nest.js Module (almost identical!)
@Module({
  imports: [OtherModule],
  controllers: [NotesController],
  providers: [NotesService]
})
```

**Key Insight:**

- Angular: Modules organize UI components
- Nest.js: Modules organize API endpoints

**Resources:**

- [Nest.js Modules](https://docs.nestjs.com/modules)

---

## 📚 Phase 2: Core Patterns (Week 1-2)

### 2.1 Controllers - HTTP Layer

**Status:** 🔵 Not Started

**Concepts:**

- [ ] `@Controller()` decorator and routing
- [ ] HTTP method decorators (@Get, @Post, @Put, @Delete)
- [ ] Route parameters (`@Param()`)
- [ ] Query parameters (`@Query()`)
- [ ] Request body (`@Body()`)
- [ ] Response handling

**Angular Connection:**

```typescript
// Angular: Handling UI events
@Component({ ... })
export class MyComponent {
  onClick(event) { }     // UI event
}

// Nest.js: Handling HTTP requests
@Controller('notes')
export class NotesController {
  @Get()                 // HTTP GET request
  findAll() { }
}
```

**Practice:**

- Create 5 endpoints (CRUD + search)
- Understand REST conventions
- Test with Postman/Swagger

**Resources:**

- [Nest.js Controllers](https://docs.nestjs.com/controllers)
- [REST API Conventions](https://restfulapi.net/)

---

### 2.2 Services - Business Logic Layer

**Status:** 🔵 Not Started

**Concepts:**

- [ ] `@Injectable()` decorator (same as Angular!)
- [ ] Single Responsibility Principle
- [ ] Service injection in controllers
- [ ] Async/await in services
- [ ] Error handling

**Angular Connection:**

```typescript
// Angular Service
@Injectable({ providedIn: 'root' })
export class DataService {
  constructor(private http: HttpClient) {}
  getData() { return this.http.get(...); }
}

// Nest.js Service (very similar!)
@Injectable()
export class NotesService {
  constructor(private repository: NotesRepository) {}
  async findAll() { return this.repository.getAll(); }
}
```

**Key Difference:**

- Angular services: Call HTTP APIs (client-side)
- Nest.js services: Implement business logic (server-side)

**Resources:**

- [Nest.js Providers](https://docs.nestjs.com/providers)

---

### 2.3 DTOs - Data Validation

**Status:** 🔵 Not Started

**Concepts:**

- [ ] What are DTOs (Data Transfer Objects)?
- [ ] Class-based validation
- [ ] `class-validator` decorators
- [ ] `class-transformer` for type conversion
- [ ] ValidationPipe

**Angular Connection:**

```typescript
// Angular: Reactive Forms Validation
this.form = new FormGroup({
  title: new FormControl("", [Validators.required]),
});

// Nest.js: DTO Class Validation
export class CreateNoteDto {
  @IsString()
  @IsNotEmpty()
  title: string;
}
```

**Both validate data, different mechanisms!**

**Practice:**

- Create DTOs for all endpoints
- Try different validators (@IsEmail, @MinLength, etc.)
- Handle validation errors

**Resources:**

- [Nest.js Validation](https://docs.nestjs.com/techniques/validation)
- [class-validator decorators](https://github.com/typestack/class-validator)

---

## 📚 Phase 3: Advanced Patterns (Week 2-3)

### 3.1 Pipes - Data Transformation

**Status:** 🔵 Not Started

**Concepts:**

- [ ] Built-in pipes (ValidationPipe, ParseIntPipe)
- [ ] Pipe execution order
- [ ] Custom pipes
- [ ] Global vs route-level pipes

**Angular Connection:**

```typescript
// Angular: Template pipes
{{ date | date:'short' }}

// Nest.js: Request transformation pipes
@Get(':id')
findOne(@Param('id', ParseIntPipe) id: number) {}
```

**Resources:**

- [Nest.js Pipes](https://docs.nestjs.com/pipes)

---

### 3.2 Exception Filters - Error Handling

**Status:** 🔵 Not Started

**Concepts:**

- [ ] Built-in HTTP exceptions
- [ ] Custom exception filters
- [ ] Global error handling
- [ ] Error response formatting

**Practice:**

- Handle 404 (Not Found)
- Handle 400 (Bad Request)
- Create consistent error format

**Resources:**

- [Nest.js Exception Filters](https://docs.nestjs.com/exception-filters)

---

### 3.3 Interceptors - Request/Response Manipulation

**Status:** 🔵 Not Started

**Concepts:**

- [ ] RxJS in interceptors (you know this!)
- [ ] Transform responses
- [ ] Logging requests
- [ ] Performance monitoring

**Angular Connection:**

```typescript
// Angular: HTTP Interceptor
@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  intercept(req, next) {
    return next.handle(req.clone({ ... }));
  }
}

// Nest.js: Very similar pattern!
@Injectable()
export class LoggingInterceptor implements NestInterceptor {
  intercept(context, next) {
    return next.handle().pipe(tap(...));
  }
}
```

**Resources:**

- [Nest.js Interceptors](https://docs.nestjs.com/interceptors)

---

### 3.4 Guards - Access Control

**Status:** 🔵 Not Started

**Concepts:**

- [ ] `CanActivate` interface (like Angular Guards!)
- [ ] ExecutionContext
- [ ] Route guards
- [ ] Global guards

**Angular Connection:**

```typescript
// Angular Route Guard
export class AuthGuard implements CanActivate {
  canActivate(route, state) {
    return this.auth.isLoggedIn();
  }
}

// Nest.js Guard (almost identical!)
@Injectable()
export class AuthGuard implements CanActivate {
  canActivate(context: ExecutionContext) {
    const request = context.switchToHttp().getRequest();
    return validateRequest(request);
  }
}
```

**Resources:**

- [Nest.js Guards](https://docs.nestjs.com/guards)

---

## 📚 Phase 4: Data & Persistence (Week 3)

### 4.1 File System Operations

**Status:** 🔵 Not Started

**Concepts:**

- [ ] `fs/promises` API
- [ ] Reading/writing JSON files
- [ ] Error handling (file not found, etc.)
- [ ] Atomic writes
- [ ] Path manipulation

**Practice:**

- Implement `NotesRepository` with file storage
- Handle concurrent writes
- Implement backup strategy

**Resources:**

- [Node.js File System](https://nodejs.org/api/fs.html)

---

### 4.2 Testing

**Status:** 🔵 Not Started

**Concepts:**

- [ ] Jest basics (built into Nest.js!)
- [ ] Unit testing controllers
- [ ] Unit testing services
- [ ] Mocking dependencies
- [ ] E2E testing

**Angular Connection:**

```typescript
// Both use Jest/Jasmine!
// Testing patterns are very similar

// Angular Component Test
TestBed.configureTestingModule({
  declarations: [MyComponent],
});

// Nest.js Controller Test
Test.createTestingModule({
  controllers: [NotesController],
  providers: [NotesService],
});
```

**Resources:**

- [Nest.js Testing](https://docs.nestjs.com/fundamentals/testing)

---

## 📚 Phase 5: API Documentation (Week 3-4)

### 5.1 Swagger/OpenAPI

**Status:** 🔵 Not Started

**Concepts:**

- [ ] `@nestjs/swagger` module
- [ ] `@ApiTags()`, `@ApiOperation()`
- [ ] DTO documentation
- [ ] Swagger UI
- [ ] API versioning

**Practice:**

- Auto-generate API docs
- Test endpoints in Swagger UI
- Export OpenAPI spec

**Resources:**

- [Nest.js OpenAPI](https://docs.nestjs.com/openapi/introduction)

---

## 📚 Phase 6: Configuration & Deployment (Week 4)

### 6.1 Configuration Management

**Status:** 🔵 Not Started

**Concepts:**

- [ ] `@nestjs/config` module
- [ ] `.env` files
- [ ] Environment variables
- [ ] Configuration validation
- [ ] Config namespaces

---

### 6.2 Logging

**Status:** 🔵 Not Started

**Concepts:**

- [ ] Built-in Logger
- [ ] Custom loggers
- [ ] Log levels
- [ ] Request logging

---

## 🚀 Future Enhancements

After mastering the basics, you can explore:

- [ ] **Database:** TypeORM + PostgreSQL (more powerful than file storage)
- [ ] **GraphQL:** Alternative to REST (you know this from widget library!)
- [ ] **Authentication:** JWT, Passport.js
- [ ] **WebSockets:** Real-time updates
- [ ] **Caching:** Redis integration
- [ ] **Microservices:** Scale beyond monolith
- [ ] **Deployment:** Docker, Docker Compose, cloud platforms

---

## 📊 Progress Tracking

Update this as you learn:

| Phase | Concept               | Status         | Date Completed | Notes |
| ----- | --------------------- | -------------- | -------------- | ----- |
| 1.1   | Node.js Basics        | 🔵 Not Started | -              | -     |
| 1.2   | TypeScript in Nest.js | 🔵 Not Started | -              | -     |
| 1.3   | Nest.js Architecture  | 🔵 Not Started | -              | -     |
| 2.1   | Controllers           | 🔵 Not Started | -              | -     |
| 2.2   | Services              | 🔵 Not Started | -              | -     |
| 2.3   | DTOs                  | 🔵 Not Started | -              | -     |
| ...   | ...                   | ...            | ...            | ...   |

**Legend:**

- 🔵 Not Started
- 🟡 In Progress
- 🟢 Completed
- ⭐ Mastered (can teach others!)

---

**Remember:** You're not starting from zero! Your Angular knowledge gives you a huge head start. Many patterns are identical - you're just applying them on the backend now. 🎯

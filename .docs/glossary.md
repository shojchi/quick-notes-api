# Nest.js & Backend Glossary

> **Terms, concepts, and translations for Angular developers learning Nest.js**

## 🎯 How to Use This Glossary

- **Bold terms** = Core Nest.js concepts
- 🔗 Links to official docs for deep learning
- 🅰️ Angular equivalents where applicable

---

## A

### **API (Application Programming Interface)**

A set of endpoints that allow clients to interact with your server.

**In this project:** REST API with endpoints like `GET /notes`, `POST /notes`

---

### **Apollo Server**

GraphQL server implementation for Node.js. Nest.js has built-in support.

**Status:** Future enhancement (Phase 5)  
🔗 [NestJS GraphQL](https://docs.nestjs.com/graphql/quick-start)

---

## B

### **Body** (`@Body()`)

Decorator to extract the request body (payload) from HTTP POST/PUT/PATCH requests.

**Example:**

```typescript
@Post()
create(@Body() createNoteDto: CreateNoteDto) {
  // createNoteDto contains the JSON body
}
```

🅰️ **Angular equivalent:** Template forms `[(ngModel)]` or `formControl.value`

---

## C

### **Controller**

Class that handles incoming HTTP requests and returns responses to the client.

**Decorator:** `@Controller('prefix')`

**Example:**

```typescript
@Controller("notes") // Handles /notes routes
export class NotesController {}
```

🅰️ **Angular equivalent:** `@Component()` but for HTTP, not UI  
🔗 [NestJS Controllers](https://docs.nestjs.com/controllers)

---

### **CRUD**

**C**reate, **R**ead, **U**pdate, **D**elete - the four basic operations for data management.

**In this project:**

- Create: `POST /notes`
- Read: `GET /notes`, `GET /notes/:id`
- Update: `PATCH /notes/:id`
- Delete: `DELETE /notes/:id`

---

## D

### **Decorator**

TypeScript feature that adds metadata to classes, methods, or parameters.

**Nest.js uses many:**

- `@Controller()`, `@Get()`, `@Post()`
- `@Injectable()`, `@Module()`
- `@Body()`, `@Param()`, `@Query()`

🅰️ **Angular uses too:** `@Component()`, `@Injectable()`, `@Input()`, `@Output()`

---

### **Dependency Injection (DI)**

Design pattern where dependencies are provided ("injected") rather than created inside a class.

**How it works:**

```typescript
// NotesService is injected, not created with `new`
constructor(private notesService: NotesService) {}
```

🅰️ **Angular equivalent:** EXACTLY the same pattern!  
🔗 [NestJS Providers](https://docs.nestjs.com/providers)

---

### **DTO (Data Transfer Object)**

Class that defines the shape and validation rules for data coming into or out of the API.

**Example:**

```typescript
export class CreateNoteDto {
  @IsString()
  @IsNotEmpty()
  title: string;

  @IsString()
  content: string;
}
```

**Why use:** Type safety, validation, documentation  
🅰️ **Angular equivalent:** Form models, but with validation decorators  
🔗 [NestJS Validation](https://docs.nestjs.com/techniques/validation)

---

## E

### **Entity**

Class representing a data model/schema (the structure of your database table or document).

**Example:**

```typescript
export interface Note {
  id: string;
  title: string;
  content: string;
  tags: string[];
  createdAt: Date;
  updatedAt: Date;
}
```

**DTO vs Entity:**

- **DTO:** Data coming IN (from client) or OUT (to client)
- **Entity:** Data stored in database

🔗 [TypeORM Entities](https://typeorm.io/entities)

---

### **Exception Filter**

Component that catches and handles errors, formatting error responses.

**Built-in exceptions:**

- `NotFoundException`
- `BadRequestException`
- `UnauthorizedException`
- `InternalServerErrorException`

🅰️ **Angular equivalent:** `ErrorHandler` or HTTP interceptor error handling  
🔗 [NestJS Exception Filters](https://docs.nestjs.com/exception-filters)

---

## G

### **GraphQL**

Query language for APIs, alternative to REST. Clients can request exactly the data they need.

**Status:** Future enhancement (Phase 5)  
🔗 [NestJS GraphQL](https://docs.nestjs.com/graphql/quick-start)

---

### **Guard**

Component that determines whether a request should be handled. Used for authentication/authorization.

**Interface:** `CanActivate` (execute before route handler)

**Example:**

```typescript
@Injectable()
export class AuthGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest();
    return validateRequest(request);
  }
}
```

🅰️ **Angular equivalent:** Route Guards (`CanActivate`, `CanDeactivate`) - SAME interface!  
🔗 [NestJS Guards](https://docs.nestjs.com/guards)

---

## H

### **HTTP Methods**

Standard request methods in HTTP protocol.

| Method     | Action         | Idempotent? | Example           |
| ---------- | -------------- | ----------- | ----------------- |
| **GET**    | Retrieve data  | Yes         | Get all notes     |
| **POST**   | Create new     | No          | Create note       |
| **PUT**    | Replace entire | Yes         | Replace note      |
| **PATCH**  | Update partial | No          | Update title only |
| **DELETE** | Remove         | Yes         | Delete note       |

**Idempotent:** Calling multiple times has same effect as calling once

---

## I

### **Injectable** (`@Injectable()`)

Decorator marking a class as a provider (can be injected into other classes via DI).

**Example:**

```typescript
@Injectable()
export class NotesService {}
```

🅰️ **Angular equivalent:** `@Injectable()` - EXACTLY the same!

---

### **Interceptor**

Component that intercepts and transforms requests/responses. Runs before and after route handler.

**Use cases:**

- Logging requests
- Transforming responses
- Adding headers
- Performance monitoring

🅰️ **Angular equivalent:** `HttpInterceptor` - very similar!  
🔗 [NestJS Interceptors](https://docs.nestjs.com/interceptors)

---

## M

### **Middleware**

Function that runs BEFORE the route handler. Has access to request/response objects.

**Use cases:**

- Logging
- CORS
- Body parsing
- Session handling

**Difference from Interceptor:** Middleware runs earlier in the pipeline  
🔗 [NestJS Middleware](https://docs.nestjs.com/middleware)

---

### **Module** (`@Module()`)

Class that organizes related components (controllers, services, etc.) into cohesive blocks.

**Example:**

```typescript
@Module({
  imports: [ConfigModule],
  controllers: [NotesController],
  providers: [NotesService],
  exports: [NotesService],
})
export class NotesModule {}
```

🅰️ **Angular equivalent:** `@NgModule()` - almost identical!  
🔗 [NestJS Modules](https://docs.nestjs.com/modules)

---

## N

### **Nest CLI**

Command-line tool for creating and managing Nest.js projects.

**Common commands:**

```bash
nest new <project>        # Create new project
nest generate module <name>  # Generate module
nest generate controller <name>  # Generate controller
nest generate service <name>    # Generate service
```

🅰️ **Angular equivalent:** `ng` CLI - very similar commands!  
🔗 [NestJS CLI](https://docs.nestjs.com/cli/overview)

---

## O

### **ORM (Object-Relational Mapping)**

Library that maps database tables to TypeScript classes.

**Popular ORMs for Nest.js:**

- **TypeORM** - Most popular, SQL databases
- **Prisma** - Modern, type-safe
- **MikroORM** - TypeScript-first

**Status:** Future (Phase 3 - Database migration)  
🔗 [NestJS Database](https://docs.nestjs.com/techniques/database)

---

## P

### **Param** (`@Param()`)

Decorator to extract URL parameters (route variables).

**Example:**

```typescript
@Get(':id')  // Route: /notes/123
findOne(@Param('id') id: string) {
  // id === '123'
}
```

🅰️ **Angular equivalent:** `ActivatedRoute.params`

---

### **Pipe**

Component that transforms or validates data BEFORE it reaches the route handler.

**Built-in pipes:**

- `ValidationPipe` - Validates DTOs
- `ParseIntPipe` - Converts string → number
- `ParseBoolPipe` - Converts string → boolean

**Example:**

```typescript
@Get(':id')
findOne(@Param('id', ParseIntPipe) id: number) {
  // id is guaranteed to be a number
}
```

🅰️ **Angular equivalent:** Template pipes (`| date`) - DIFFERENT purpose!  
🔗 [NestJS Pipes](https://docs.nestjs.com/pipes)

---

### **Provider**

General term for any class that can be injected (services, repositories, factories, etc.).

**Marked with:** `@Injectable()`  
**Registered in:** Module's `providers` array

🔗 [NestJS Providers](https://docs.nestjs.com/providers)

---

## Q

### **Query** (`@Query()`)

Decorator to extract query parameters from URL.

**Example:**

```typescript
@Get()
findAll(@Query('search') search?: string) {
  // URL: /notes?search=react
  // search === 'react'
}
```

🅰️ **Angular equivalent:** `ActivatedRoute.queryParams`

---

## R

### **Repository**

Pattern where data access logic is separated into its own class.

**Purpose:** Abstract database/file operations from business logic

**Example:**

```typescript
@Injectable()
export class NotesRepository {
  async findAll(): Promise<Note[]> { ... }
  async save(note: Note): Promise<void> { ... }
}
```

**Why use:** Easy to swap storage (file → database) without changing service  
🔗 [Repository Pattern](https://docs.nestjs.com/techniques/database#repository-pattern)

---

### **REST (Representational State Transfer)**

Architectural style for APIs using HTTP methods and URL resources.

**Principles:**

- Resources identified by URLs (`/notes`, `/notes/:id`)
- Use HTTP methods correctly (GET for read, POST for create)
- Stateless requests
- JSON responses

🔗 [REST API Tutorial](https://restfulapi.net/)

---

## S

### **Service**

Class containing business logic. No HTTP knowledge.

**Decorator:** `@Injectable()`

**Example:**

```typescript
@Injectable()
export class NotesService {
  create(dto: CreateNoteDto): Note { ... }
  findAll(): Note[] { ... }
}
```

🅰️ **Angular equivalent:** `@Injectable()` service - SAME pattern!  
🔗 [NestJS Providers](https://docs.nestjs.com/providers)

---

### **Swagger / OpenAPI**

Tool for auto-generating interactive API documentation.

**In Nest.js:** Install `@nestjs/swagger`, decorate DTOs, access at `/api`

**Status:** Step 9 in tasks.md  
🔗 [NestJS OpenAPI](https://docs.nestjs.com/openapi/introduction)

---

## T

### **TypeORM**

ORM for TypeScript/JavaScript. Works with PostgreSQL, MySQL, SQLite, etc.

**Features:**

- Decorators for entities (`@Entity()`, `@Column()`)
- Active Record or Data Mapper pattern
- Migrations
- Relationships

**Status:** Future (Phase 3 - Database)  
🔗 [TypeORM Official](https://typeorm.io/)

---

## U

### **UUID (Universally Unique Identifier)**

128-bit number used as unique ID. Format: `550e8400-e29b-41d4-a716-446655440000`

**Why use:** Guaranteed unique, no central coordination needed  
**Package:** `npm install uuid`

```typescript
import { v4 as uuidv4 } from "uuid";
const id = uuidv4(); // Generate random UUID
```

---

## V

### **ValidationPipe**

Built-in pipe that validates request data against DTO rules.

**Setup (globally):**

```typescript
app.useGlobalPipes(new ValidationPipe());
```

**Works with:** `class-validator` decorators like `@IsString()`, `@IsEmail()`  
🔗 [NestJS Validation](https://docs.nestjs.com/techniques/validation)

---

## W

### **WebSocket**

Protocol for real-time, two-way communication between client and server.

**In Nest.js:** `@nestjs/websockets` module

**Status:** Future enhancement (Phase 5)  
🔗 [NestJS WebSockets](https://docs.nestjs.com/websockets/gateways)

---

## 🎓 HTTP Status Codes (Common Ones)

| Code    | Meaning               | When to Use                          |
| ------- | --------------------- | ------------------------------------ |
| **200** | OK                    | Successful GET, PATCH, DELETE        |
| **201** | Created               | Successful POST (resource created)   |
| **204** | No Content            | Successful DELETE (no response body) |
| **400** | Bad Request           | Invalid input (validation failed)    |
| **401** | Unauthorized          | Not authenticated                    |
| **403** | Forbidden             | Authenticated but not authorized     |
| **404** | Not Found             | Resource doesn't exist               |
| **500** | Internal Server Error | Server crashed/errored               |

🔗 [HTTP Status Codes Reference](https://developer.mozilla.org/en-US/docs/Web/HTTP/Status)

---

## 🅰️ Angular → Nest.js Quick Reference

| Concept                  | Angular                 | Nest.js                  |
| ------------------------ | ----------------------- | ------------------------ |
| **Organize code**        | `@NgModule()`           | `@Module()`              |
| **Handle requests**      | `@Component()`          | `@Controller()`          |
| **Business logic**       | `@Injectable()` service | `@Injectable()` service  |
| **Dependency Injection** | Constructor injection   | Constructor injection ✅ |
| **Route guards**         | `CanActivate`           | `CanActivate` ✅         |
| **Intercept HTTP**       | `HttpInterceptor`       | `NestInterceptor`        |
| **Transform data**       | Template pipes          | Validation pipes ⚠️      |
| **CLI tool**             | `ng`                    | `nest`                   |

✅ = Same concept  
⚠️ = Similar name, different purpose

---

## 📖 Official Resources

- [Nest.js Documentation](https://docs.nestjs.com/)
- [Nest.js GitHub](https://github.com/nestjs/nest)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)
- [Node.js Documentation](https://nodejs.org/docs/)
- [MDN HTTP Reference](https://developer.mozilla.org/en-US/docs/Web/HTTP)

---

**Pro Tip:** Whenever you encounter a new term, add it to this glossary with your own explanation. Teaching yourself reinforces learning! 🎯

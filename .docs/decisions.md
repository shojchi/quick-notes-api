# Architecture Decision Records (ADR)

> **Documenting important technical decisions and their rationale**

## 📖 What is an ADR?

An **Architecture Decision Record** documents a significant decision made during the project, including:

- The context (problem we're solving)
- The decision (what we chose)
- The rationale (why we chose it)
- The consequences (trade-offs and implications)

**Purpose:** Future you (and others) can understand **why** decisions were made, not just **what** was decided.

---

## 📝 ADR Template

Use this template for all future decisions:

```markdown
## ADR-XXX: [Decision Title]

**Date:** YYYY-MM-DD  
**Status:** [Proposed | Accepted | Deprecated | Superseded]  
**Deciders:** [Your name or team]

### Context

[Describe the problem, challenge, or opportunity that requires a decision.
Include relevant background and constraints.]

### Decision

[State the decision clearly and concisely.
What are we doing?]

### Rationale

[Explain WHY this decision was made.
What alternatives did you consider?
Why is this the best choice given the context?]

### Consequences

**Positive:**

- [Benefit 1]
- [Benefit 2]

**Negative:**

- [Trade-off 1]
- [Trade-off 2]

**Neutral:**

- [Implications that are neither good nor bad]

### Related Decisions

- [Link to ADR-YYY if this supersedes or relates to another decision]
```

---

## 📚 Current Decisions

---

## ADR-001: JSON File Storage vs Database for MVP

**Date:** 2026-01-30  
**Status:** Accepted  
**Deciders:** Project Team

### Context

The Quick Notes API needs persistent data storage for notes. We're building an MVP to learn Nest.js fundamentals. Options considered:

1. **JSON File Storage** - Read/write notes to a local JSON file
2. **PostgreSQL** - Relational database with TypeORM
3. **MongoDB** - NoSQL document database with Mongoose
4. **SQLite** - Embedded SQL database, single file

**Constraints:**

- This is a **learning project** - simplicity is valuable
- MVP should work with minimal setup
- Single user for MVP (no concurrent access needed)
- Expected data size: <1000 notes
- Must be able to upgrade later

### Decision

**Use JSON file storage** (`data/notes.json`) for the MVP.

### Rationale

**Why JSON File Storage:**

1. **Learning Focus** - One less system to learn/configure (no DB setup, no ORM, no migrations)
2. **Zero Setup** - Works immediately without installing PostgreSQL, MongoDB, etc.
3. **Simplicity** - File I/O with `fs/promises` is straightforward Node.js
4. **Sufficient for MVP** - Single user, <1000 notes, no complex queries needed
5. **Easy Migration Path** - Can switch to PostgreSQL in Phase 3 (see tasks.md)

**Why NOT Database:**

- **PostgreSQL/MongoDB** - Requires installation, setup, connection management (too much for MVP)
- **SQLite** - Better than JSON but still requires ORM learning

**Alternatives Considered:**

- ❌ PostgreSQL + TypeORM - Too complex for MVP, want to focus on Nest.js basics first
- ❌ MongoDB + Mongoose - Different data paradigm, want to learn SQL later
- ❌ In-memory storage - Data doesn't persist across server restarts

### Consequences

**Positive:**

- ✅ Faster MVP development - focus on Nest.js, not database
- ✅ No external dependencies to install
- ✅ Easy to inspect data (just open JSON file)
- ✅ Simple backup (copy file)
- ✅ Perfect for learning Nest.js fundamentals

**Negative:**

- ❌ No concurrent write handling (acceptable - single user MVP)
- ❌ No transactions (acceptable - simple CRUD operations)
- ❌ No advanced queries (filtering/search done in memory)
- ❌ Not production-ready (expected - this is an MVP)
- ❌ Will require migration later (planned in tasks.md Phase 3)

**Neutral:**

- Repository pattern still applies - easy to swap storage layer later
- File location: `./data/notes.json` (configurable via .env)

### Related Decisions

- Will be superseded by ADR-004 (PostgreSQL Migration) in Phase 3

---

## ADR-002: REST API vs GraphQL for MVP

**Date:** 2026-01-30  
**Status:** Accepted  
**Deciders:** Project Team

### Context

The Quick Notes API needs an API design. We're learning Nest.js and already have GraphQL experience from the widget library project.

**Options:**

1. **REST API** - Traditional HTTP methods (GET, POST, PATCH, DELETE)
2. **GraphQL** - Flexible query language with single endpoint
3. **Both** - Offer both REST and GraphQL

**Constraints:**

- Learning Nest.js fundamentals is the priority
- Already know GraphQL from widget library
- MVP should be simple
- Can add more later

### Decision

**Build REST API** for MVP, add GraphQL in Phase 5 (future enhancement).

### Rationale

**Why REST for MVP:**

1. **Learn Basics First** - REST is simpler, learn Nest.js controllers/services without GraphQL complexity
2. **Standard Pattern** - Most Nest.js tutorials start with REST
3. **Easy Testing** - Use Postman/Swagger UI without GraphQL client setup
4. **Incremental Learning** - Add GraphQL later when fundamentals are solid

**Why NOT GraphQL (Yet):**

- Already know GraphQL from widget library (less learning value for MVP)
- Want to focus on Nest.js-specific patterns first
- Can add as enhancement (Nest.js has excellent GraphQL support)

**Why NOT Both:**

- Overkill for MVP
- Doubles maintenance during learning phase

### Consequences

**Positive:**

- ✅ Simpler API design - standard CRUD endpoints
- ✅ Easy to test with Swagger UI
- ✅ Learn REST conventions (useful baseline knowledge)
- ✅ Can add GraphQL later without rewriting (parallel APIs)

**Negative:**

- ❌ Less flexible for clients (compared to GraphQL)
- ❌ More endpoints to maintain (vs single GraphQL endpoint)
- ❌ Over-fetching/under-fetching possible

**Neutral:**

- GraphQL can be added in Phase 5 (see tasks.md)
- Swagger documentation will make REST easy to use

### Related Decisions

- See tasks.md Step 11 for GraphQL future enhancement

---

## ADR-003: Data File Location and Structure

**Date:** 2026-01-30  
**Status:** Accepted  
**Deciders:** Project Team

### Context

Using JSON file storage (ADR-001), need to decide:

- Where to store the data file
- What data structure to use
- How to handle file initialization

**Options for Location:**

1. `./data/notes.json` (project folder)
2. `~/.quick-notes/notes.json` (user home directory)
3. `/tmp/notes.json` (temporary directory)
4. Configurable via environment variable

**Options for Structure:**

1. Array of notes: `[{note1}, {note2}]`
2. Object with notes: `{notes: [{note1}, {note2}]}`
3. Map/Record: `{id1: {note1}, id2: {note2}}`

### Decision

**Location:** `./data/notes.json` (relative to project root), configurable via `.env`  
**Structure:** Simple array of note objects

```json
[
  {
    "id": "uuid-1",
    "title": "Example Note",
    "content": "Note content...",
    "tags": ["tag1", "tag2"],
    "createdAt": "2026-01-30T10:00:00.000Z",
    "updatedAt": "2026-01-30T10:00:00.000Z"
  }
]
```

### Rationale

**Why `./data/notes.json`:**

- ✅ Easy to find and inspect during development
- ✅ Gitignored but in project structure
- ✅ Easy backup (just copy folder)
- ✅ Works for MVP (single developer)

**Why Simple Array Structure:**

- ✅ Straightforward to read/write
- ✅ Easy to iterate and filter
- ✅ JSON.parse/stringify work naturally
- ✅ Matches mental model (list of notes)

**Why Configurable:**

- Can change via `DATA_PATH` in `.env` if needed
- Allows testing with different files
- Future flexibility

**Alternatives Considered:**

- ❌ User home directory - Harder to find/backup
- ❌ `/tmp` - Data might be deleted by OS
- ❌ Object wrapper - Extra complexity for no benefit
- ❌ Map/Record - More complex, array is sufficient

### Consequences

**Positive:**

- ✅ Simple to implement and understand
- ✅ Easy to debug (just cat data/notes.json)
- ✅ Natural structure for small datasets
- ✅ Easy to seed test data

**Negative:**

- ❌ Array lookup is O(n) - fine for <1000 notes
- ❌ Must read entire file for any operation
- ❌ No built-in indexing

**Neutral:**

- File created automatically if doesn't exist (empty array)
- Atomic writes using temp file + rename pattern
- `.gitignore` includes `/data/` directory

### Related Decisions

- Based on ADR-001 (JSON file storage decision)

---

## 🔮 Future Decisions to Document

When you encounter these situations, create a new ADR:

### Phase 2: Enhanced Features

- **ADR-004:** Pagination Strategy (offset vs cursor)
- **ADR-005:** Search Implementation (in-memory vs full-text)

### Phase 3: Database Migration

- **ADR-006:** PostgreSQL vs MySQL vs MongoDB
- **ADR-007:** TypeORM vs Prisma vs MikroORM
- **ADR-008:** Migration Strategy (all at once vs gradual)

### Phase 4: Authentication

- **ADR-009:** JWT vs Session-based auth
- **ADR-010:** Password hashing algorithm (bcrypt vs argon2)

### Phase 5: GraphQL

- **ADR-011:** GraphQL alongside REST or replace REST
- **ADR-012:** Apollo Server vs Mercurius

### General

- **ADR-0XX:** Any time you make a significant choice between alternatives

---

## 📋 When to Create an ADR

Create an ADR when:

- ✅ The decision has **significant** impact on the project
- ✅ Multiple alternatives exist with different trade-offs
- ✅ Future you might wonder "why did we do it this way?"
- ✅ The decision constrains future choices
- ✅ Others might need to understand the reasoning

**Don't create an ADR for:**

- ❌ Trivial choices (variable naming, simple refactoring)
- ❌ Obvious industry standards (use TypeScript for Nest.js)
- ❌ Temporary decisions (quick debugging changes)

---

## 🔄 Updating ADRs

ADRs are **immutable** once accepted. Instead:

1. **Status Change:** Change status to "Deprecated" or "Superseded"
2. **New ADR:** Create new ADR that references the old one
3. **Link Both:** "This supersedes ADR-XXX" and "Superseded by ADR-YYY"

**Example:**

```markdown
## ADR-001: JSON File Storage

Status: Superseded by ADR-006

## ADR-006: PostgreSQL Migration

Related Decisions: Supersedes ADR-001
```

---

## 🎓 Learning Value

Writing ADRs teaches you:

- **Critical Thinking** - Evaluate trade-offs explicitly
- **Communication** - Explain technical decisions clearly
- **Reflection** - Understand your own reasoning
- **Documentation** - Practice technical writing

**For this learning project:** Document major decisions to build good habits!

---

## 📖 ADR Template (Copy/Paste)

```markdown
## ADR-XXX: [Title]

**Date:** YYYY-MM-DD  
**Status:** [Proposed | Accepted | Deprecated]  
**Deciders:** [Name]

### Context

[Problem/challenge description]

### Decision

[What we're doing]

### Rationale

[Why this choice? Alternatives?]

### Consequences

**Positive:**

- [Benefits]

**Negative:**

- [Trade-offs]

**Neutral:**

- [Implications]

### Related Decisions

- [Links to other ADRs]
```

---

## 🔗 References

- [Architecture Decision Records (GitHub)](https://github.com/joelparkerhenderson/architecture-decision-record)
- [ADR Tools](https://github.com/npryce/adr-tools)
- [Documenting Architecture Decisions](https://cognitect.com/blog/2011/11/15/documenting-architecture-decisions)
- [ThoughtWorks Technology Radar: Lightweight ADRs](https://www.thoughtworks.com/radar/techniques/lightweight-architecture-decision-records)

---

**Remember:** Good ADRs explain the "why" behind your decisions. Future you will be grateful! 🎯

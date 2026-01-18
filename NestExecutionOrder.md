## 1. npm run start

- Node.js starts execution
- It eventually runs main.ts (or dist/main.js after build)

## 2. main.ts — App bootstrap (ENTRY POINT)

- This is the first NestJS code that runs.

```typescript
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.listen(3000);
}
bootstrap();
```

### What happens here internally

- NestFactory.create(AppModule)
  - Creates the **Nest Application**

  - Loads the **root module** (AppModule)

- Nest builds a **Dependency Injection (DI)** container

- All modules, providers, controllers are registered

- App starts listening on a port

➡️ Think of this as turning on the NestJS engine

## 3. AppModule — Root module loads everything

```typescript
@Module({
  imports: [UserModule, AuthModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
```

### What Nest does now

- Reads the @Module() metadata

- Recursively loads:
  - imports → other modules

  - controllers

  - providers

➡️ This creates the full application graph

## 4. Modules load → Providers are instantiated

```typescript
@Injectable()
export class UserService {
  constructor(private readonly repo: UserRepository) {}
}
```

### NestJS Dependency Injection flow

- Nest sees UserService

- Sees it needs UserRepository

- Finds where UserRepository is provided

- Creates singletons by default

- Injects dependencies via constructor

➡️ No new **keyword** — Nest manages object creation

## 5. Controllers are registered with routes

```typescript
@Controller('users')
export class UserController {
  @Get()
  findAll() {
    return 'users';
  }
}
```

### Internally

- Nest scans all controllers

- Maps routes:

  ```bash
  GET /users → UserController.findAll
  ```

- Attaches them to the underlying HTTP adapter (Express/Fastify)
  ➡️ At this point, routes are **LIVE**

## 6. App starts listening (Express/Fastify)

```typescript
app.listen(3000);
```

### Now:

- Express/Fastify server is running

- App is waiting for incoming requests

You’ll see:

```bash
Nest application succesfully started
```

# 🧠 NestJS Request Lifecycle — Complete Flow Guide

This README explains **what happens when an HTTP request hits a NestJS application**, step by step, using a real-world mental model.

---

## 📌 Example Request

```http
GET /users
```

## 7️. Request Lifecycle (VERY IMPORTANT)

High-level pipeline

```text
Request
  ↓
Middleware
  ↓
Guards
  ↓
Interceptors (before)
  ↓
Pipes
  ↓
Controller
  ↓
Service
  ↓
Interceptors (after)
  ↓
Response

```

## 8. Middleware (Optional)

```typescript
@Injectable()
export class LoggerMiddleware {
  use(req, res, next) {
    console.log(req.url);
    next();
  }
}
```

**What Middleware Does**

- Runs before routing

- Can access req and res

- Must call next()

🔹 **Common Use Cases**

- Request logging

- Auth token extraction

- Request mutation

- Metrics / tracing

➡️ Very similar to Express middleware

## 9. Guards — Authorization Layer

```typescript
@UseGuards(AuthGuard)
```

🔹 **Purpose**

- Runs before the controller

- Decides whether a request is allowed

🔹 **Behavior**

✅ Return true → request proceeds

❌ Return false → request rejected

🔹 **Common Use Cases**

- JWT authentication

- Role-based access control (RBAC)

- Permission checks

## 10. Interceptors — Wrap Execution

```ts
@UseInterceptors(LoggingInterceptor)
```

**How Interceptors Work**

```text
Before logic
   ↓
Controller execution
   ↓
After logic
```

🔹 **Common Use Cases**

- Logging

- Response transformation

- Performance monitoring

- Caching

- Timeout handling

## 11. Pipes — Validation & Transformation

```ts
@Get()
find(@Query('id', ParseIntPipe) id: number) {}
```

### Purpose

- Runs before the controller method

- Works on method parameters

🔹 **Common Use Cases**

- DTO validation (class-validator)

- Type conversion

- Sanitization

## 12. Controller Method Executes

```ts
@Get()
findAll() {
  return this.userService.findAll();
}
```

- Controller Responsibilities

- Handle HTTP requests

- Map routes

- Delegate logic to services

📌 **Controllers should be thin**

## 13. Service Handles Business Logic

```ts
@Injectable()
export class UserService {
  findAll() {
    return this.userRepo.find();
  }
}
```

- Service Responsibilities

- Business logic

- Database access

- External API calls

- Complex workflows

## 14. Response Sent Back

- Interceptors may modify the response

- NestJS serializes the returned value

- Express/Fastify sends JSON

```test
HTTP Response → Client
```

## NestJS Flow Summary (One Look)

```test
npm run start
  ↓
main.ts
  ↓
NestFactory.create(AppModule)
  ↓
Modules loaded
  ↓
Providers instantiated (DI)
  ↓
Controllers + routes registered
  ↓
Server starts
  ↓
Request
  ↓
Middleware → Guards → Interceptors → Pipes
  ↓
Controller → Service
  ↓
Response
```

# NestJS - TypeORM Entity Annotations Guide

This guide explains the most commonly used **TypeORM decorators** (annotations) in NestJS applications.  
Each decorator is shown with a practical example + detailed explanation of **why** we use it and when.

## 1. Basic Entity Structure

```ts
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  OneToMany,
  JoinColumn,
} from 'typeorm';

@Entity() // ← Marks this class as a database table (entity)
export class Team {
  // ──────────────────────────────────────────────────────────────
  // PRIMARY KEY
  // ──────────────────────────────────────────────────────────────
  @PrimaryGeneratedColumn() // Auto-increment integer (1,2,3...) - most common choice
  // @PrimaryGeneratedColumn("uuid") ← Alternative: generates UUID string
  id: number;

  // ──────────────────────────────────────────────────────────────
  // REGULAR COLUMNS
  // ──────────────────────────────────────────────────────────────
  @Column({ length: 100 }) // varchar(100) NOT NULL by default
  name: string;

  @Column({ nullable: true }) // Can be NULL in database
  description?: string;

  @Column({ type: 'decimal', precision: 10, scale: 2, default: 0 })
  budget: number;

  // ──────────────────────────────────────────────────────────────
  // TIMESTAMPS - automatic date management
  // ──────────────────────────────────────────────────────────────
  @CreateDateColumn() // Automatically sets on INSERT
  createdAt: Date;

  @UpdateDateColumn() // Automatically updates on every UPDATE
  updatedAt: Date;

  // Optional: soft delete support
  // @DeleteDateColumn()
  // deletedAt?: Date;

  // ──────────────────────────────────────────────────────────────
  // RELATIONSHIPS
  // ──────────────────────────────────────────────────────────────
  @OneToMany(() => TeamMember, (teamMember) => teamMember.team, {
    cascade: true, // ← When save team → also save/update/delete related members
  })
  teamMembers: TeamMember[];
}
```

```typescript
@Entity()
export class TeamMember {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  role: string; // e.g. "admin", "member", "guest"

  // ──────────────────────────────────────────────────────────────
  // MANY-TO-ONE  (many team-members → belong to one user)
  // ──────────────────────────────────────────────────────────────
  @ManyToOne(() => User, (user) => user.teamMembers, {
    onDelete: 'CASCADE', // When user is deleted → also delete his memberships
    nullable: false,
  })
  @JoinColumn({ name: 'userId' }) // ← Foreign key column name in DB = userId
  user: User;

  // ──────────────────────────────────────────────────────────────
  // MANY-TO-ONE  (many team-members → belong to one team)
  // ──────────────────────────────────────────────────────────────
  @ManyToOne(() => Team, (team) => team.teamMembers, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'teamId' }) // ← Foreign key column name = teamId
  team: Team;
}
```

## Quick Reference Table - Most Important Decorators

| **Decorator**                  | **Purpose**                                          | **When to use?**                                   | **Common Options**                             |
| ------------------------------ | ---------------------------------------------------- | -------------------------------------------------- | ---------------------------------------------- |
| `@Entity()`                    | Marks class as a database table                      | Every entity class                                 | `{ name: "custom_table_name" }`                |
| `@PrimaryGeneratedColumn()`    | Auto-increment ID / UUID primary key                 | Almost every table                                 | `("uuid"), { type: "int" }`                    |
| `@Column()`                    | Regular column (string, number, boolean, json, etc.) | Most properties                                    | `{ nullable, default, unique, type, length }`  |
| `@CreateDateColumn()`          | Auto current timestamp on insert                     | Audit / creation date                              | —                                              |
| `@UpdateDateColumn()`          | Auto update timestamp on every change                | Audit / last modified date                         | —                                              |
| `@DeleteDateColumn()`          | Soft delete - sets timestamp instead of real DELETE  | Soft-delete needed                                 | —                                              |
| `@ManyToOne()`                 | Many records point to one parent                     | Foreign key owner side (usually has `@JoinColumn`) | `cascade, onDelete: "CASCADE/RESTRICT"`        |
| `@OneToMany()`                 | One parent has many children                         | Inverse side of `ManyToOne`                        | `cascade`                                      |
| `@OneToOne()`                  | 1:1 relationship                                     | Profile ↔ User, etc                                | Usually one side has `@JoinColumn`             |
| `@ManyToMany()`                | N:N relationship (needs junction table)              | Users ↔ Roles, Posts ↔ Tags                        | `cascade, joinTable()` on one side             |
| `@JoinColumn({ name: "..." })` | Defines foreign key column name & behavior           | On `@ManyToOne` / owning side of `@OneToOne`       | Very important!                                |
| `@Injectable()`                | Marks class as injectable for Dependency Injection   | Service classes, Providers                         | —                                              |
| `@InjectRepository()`          | Injects a TypeORM repository for an entity           | In services where a repository is needed           | `{ target: EntityClass }`                      |
|                                |
| `@Module()`                    | Defines a NestJS module                              | Grouping related providers, controllers, etc.      | `{ imports, providers, controllers, exports }` |

## Best Practices & Recommendations (2025–2026)

1. Always use @PrimaryGeneratedColumn() for new tables (prefer uuid in distributed systems)
2. Use explicit @JoinColumn() → makes foreign key names predictable
3. Prefer onDelete: "CASCADE" or "RESTRICT" instead of default "NO ACTION"
4. Use { cascade: true } carefully – very powerful but can cause unwanted deletes
5. Add @CreateDateColumn() + @UpdateDateColumn() to almost every entity
6. Consider soft deletes (@DeleteDateColumn()) for production systems
7. Use synchronize: false + migrations in production!
8. Avoid circular dependencies between entities → can break hot-reload & metadata reflection

## Bonus: Minimal Real-World Entity Example (User + Profile 1:1)

```typescript
@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true })
  email: string;

  @Column()
  passwordHash: string;

  @OneToOne(() => Profile, (profile) => profile.user, { cascade: true })
  @JoinColumn()
  profile: Profile;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}

@Entity()
export class Profile {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  fullName: string;

  @Column({ nullable: true })
  avatarUrl?: string;

  @OneToOne(() => User, (user) => user.profile)
  user: User;
}
```

### \* Since a task is typically assigned to one user, but a user can have multiple tasks, you might want to use a many-to-one relationship instead. \*

```typescript

// In the Tasks entity:
@ManyToOne(() => User, (user: User) => user.tasks)
@JoinColumn({ name: 'userId' })
user: User;

// In the User entity:
@OneToMany(() => Tasks, (task: Tasks) => task.user)
tasks: Tasks[];
```

## ER Diagram link

https://excalidraw.com/#json=GUnwIec3wAlF-IegfNVS2,eeuyfMkFb7YMipqHvpPd5g

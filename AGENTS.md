# Agent Guidelines

## Project Overview

This is a Bun + React application (Matchly) using:
- **Runtime**: Bun (NOT Node.js)
- **UI Framework**: React 19 with TypeScript
- **Styling**: Tailwind CSS v4 with shadcn/ui patterns
- **Components**: Radix UI primitives with class-variance-authority
- **Path Alias**: `@/*` maps to `./src/*`

---

## Development Commands

```bash
bun install              # Install dependencies
bun dev                  # Start dev server with HMR
bun start                # Start production server
bun run build.ts         # Build project to dist/
```

**Note**: There are currently no tests in this project. If adding tests:
```bash
bun test                 # Run all tests
bun test <path>          # Run specific test file
bun test --coverage      # Run tests with coverage
```

---

## Build System

The build script (`build.ts`) supports options:
- `--outdir <path>` - Output directory (default: "dist")
- `--minify` - Enable minification
- `--sourcemap <type>` - sourcemap: none|linked|inline|external
- `--target <target>` - browser|bun|node
- `--external <list>` - External packages (comma-separated)
- `--define <key=value>` - Define global constants

---

## Code Style Guidelines

### TypeScript
- Strict mode enabled with `noUncheckedIndexedAccess: true`
- Use explicit type imports: `import { type X } from "..."`
- Prefer `React.ComponentProps<"element">` for component props
- Use variant props pattern: `VariantProps<typeof buttonVariants>`
- Explicitly type refs: `useRef<HTMLTextAreaElement>(null)`

### Imports
- Use `@/*` path alias for internal imports: `import { Button } from "@/components/ui/button"`
- Group imports: external packages first, then internal, then types
- Example: `import { Slot } from "@radix-ui/react-slot";` then `import { cn } from "@/lib/utils";`

### React Components
- Use functional components with hooks
- Export named components: `export function Button()`
- Follow shadcn/ui pattern: export multiple from one file
- Use `className` prop merging via `cn()` utility
- Add `data-slot` attributes for styling hooks
- Use Radix UI primitives for accessible components

### Styling
- Tailwind CSS v4 with inline @theme config
- Use `cva` (class-variance-authority) for component variants
- Merge classes with `cn(...inputs)` from `@/lib/utils`
- Prefer Tailwind utility classes over custom CSS
- CSS variables for theming in `styles/globals.css`

### Naming Conventions
- PascalCase for components: `function Homepage()`
- camelCase for functions/variables: `const handleNavigate = ...`
- PascalCase for types/interfaces: `interface Profile { ... }`
- camelCase for type properties: `firstName: string`
- Descriptive names that indicate purpose

### Error Handling
- Use try/catch for async operations
- Convert errors to strings for display: `String(error)`
- Return proper HTTP status codes in API routes

### File Structure
```
src/
├── index.ts           # Server entry point
├── App.tsx           # Main React component
├── frontend.tsx      # Frontend entry
├── components/
│   ├── ui/           # Reusable UI components (shadcn style)
│   ├── layout/       # Layout components
│   └── profile/     # Feature-specific components
├── pages/            # Page-level components
├── lib/
│   ├── utils.ts      # Utilities (cn function)
│   └── types.ts      # TypeScript interfaces
├── data/             # Mock data
└── styles/           # Global styles
```

---

## E2E Testing Attributes (If Adding Tests)

All interactable elements should include `data-testid` attributes:
- Section-based prefix: `header-`, `login-`, `profile-`
- Descriptive suffix: `-button`, `-input`, `-label`, `-title`
- Examples: `header-nav-button`, `login-email-input`, `profile-save-button`

---

## Type Definitions (src/lib/types.ts)

Key types to understand:
- `Profile` - Main user profile with skills, experience, education
- `Skill` - Skill with name and level (beginner|intermediate|advanced|expert)
- `Experience` - Work experience entries
- `Education` - Education entries
- `Availability` - Work availability (full-time|part-time|contract, remote|on-site|hybrid)

---

## Server/API Development

- Use `Bun.serve()` for HTTP server, not Express
- Use `Response.json()` for JSON responses
- Use async/await patterns in route handlers
- Import HTML files directly: `import index from "./index.html"`

## Common Tasks

### Adding a new UI component
1. Create file in `src/components/ui/` following shadcn pattern
2. Use `cva` for variants if needed
3. Export both component and variants
4. Add `data-slot` attribute for styling hooks

### Adding a new page
1. Create file in `src/pages/`
2. Export named component
3. Add routing in `App.tsx`
4. Add navigation link in Header if needed

### Adding new data types
1. Add interface to `src/lib/types.ts`
2. Export type
3. Add mock data to `src/data/` if needed

## Notes

- This project uses Bun APIs exclusively, not Node.js equivalents
- ES modules with `.ts`/`.tsx` extensions in imports allowed
- No ESLint or Prettier configuration currently
- The project has no existing test files
- Always prefer Bun APIs over Node.js equivalents
- Use non-null assertions sparingly

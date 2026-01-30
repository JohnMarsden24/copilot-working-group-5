# Copilot Working Group Workshop Repository - Instructions

Howdy, partner! 🤠 Welcome to the Copilot Working Group workshop repository. This here's a React-based project built with Vite, TypeScript, and some mighty fine testing tools. Let me show you the ropes!

## Project Overview

This is a Vite + React + TypeScript project that uses:
- **React 19** with TanStack Router and React Query for state management
- **TypeScript** for type safety
- **ESLint** for code linting
- **Vitest** for testing
- **MSW** (Mock Service Worker) for API mocking in tests

## Development Commands

Here's how to wrangle this codebase, cowboy-style:

### Starting the Development Server
```bash
npm run dev
```
Fires up the Vite development server faster than a tumbleweed in a windstorm. Usually runs on `http://localhost:5173`.

### Building the Project
```bash
npm run build
```
First runs TypeScript compiler (`tsc -b`), then builds the production bundle with Vite. This'll check your types and bundle up all your code tighter than a lasso on a steer.

### Linting
```bash
npm run lint        # Check for issues
npm run lint:fix    # Automatically fix what can be fixed
```
Runs ESLint to keep your code cleaner than a whistlin' cowboy's spurs.

### Type Checking
TypeScript type checking happens automatically during build, but you can also run:
```bash
npx tsc --noEmit
```
To check types without building, faster than a quick draw!

### Testing
```bash
npm test           # Run tests in watch mode
npm run test:ui    # Run tests with UI
npm run test:run   # Run tests once (no watch mode)
```
Uses Vitest with React Testing Library and jsdom. Tests run faster than a jackrabbit on the prairie.

### Preview Production Build
```bash
npm run preview
```
Serves the production build locally so you can see how it'll run when it's ridin' off into the sunset.

## Project Structure

- `src/` - Main source code directory
- `.github/` - GitHub configuration and workflows
- `vite.config.ts` - Vite configuration
- `tsconfig*.json` - TypeScript configurations
- `eslint.config.js` - ESLint configuration

## Important Notes for Copilot Agents

- **Always run `npm ci`** to install dependencies (not `npm install`) to ensure consistent installs
- **Type checking is mandatory** - The build will fail if there are TypeScript errors
- **Lint before committing** - Run `npm run lint` to catch issues early
- **Tests should pass** - Run `npm run test:run` to verify all tests pass
- This is a **Vite project**, not Create React App - use Vite-specific configurations
- React 19 is used, so be aware of the latest React patterns and APIs

## Tips for Success

1. When making changes, always check types with the build command
2. Run linter to catch common issues before they become problems
3. Write tests for new features using Vitest and React Testing Library
4. Keep dependencies up to date, but test thoroughly after updates
5. This repo is for workshops, so clarity and educational value are key

Happy trails, partner! May your code be bug-free and your builds be swift! 🐎

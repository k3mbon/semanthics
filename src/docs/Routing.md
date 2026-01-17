# Routing Configuration

## Overview
The application uses `react-router-dom` for client-side routing. The main configuration is located in `src/App.jsx`.

## Recent Changes
- **Nested Routes for Games**: The arithmetic games (`Penjumlahan`, `Pengurangan`, etc.) have been moved under the `/berlatih` path.
  - New Path: `/berlatih/penjumlahan`
  - Old Path: `/penjumlahan` (now redirects to the new path)

## Route Structure
```
/                   -> Landing Page (Menu)
/login              -> Login Page
/info               -> Info Page
/belajar            -> Learning Materials
/berlatih           -> Practice Menu
  /berlatih/penjumlahan -> Addition Game
  /berlatih/pengurangan -> Subtraction Game
  /berlatih/perkalian   -> Multiplication Game
  /berlatih/pembagian   -> Division Game
```

## Legacy Redirects
Requests to legacy paths (e.g., `/penjumlahan`) are automatically redirected to their new locations (e.g., `/berlatih/penjumlahan`) with `replace: true` to keep history clean.

## Adding New Games
1. Create the game component in `src/pages/`.
2. Import it in `src/App.jsx`.
3. Add a new route under the `/berlatih` parent route:
   ```jsx
   <Route path="new-game" element={<NewGameComponent />} />
   ```

# Responsive Design Guidelines

## Mobile-First Approach
- Styles should be written for mobile devices first (default).
- Use `@media (min-width: 768px)` for tablet/desktop overrides.
- Use `flexbox` and `grid` for layout instead of absolute positioning.
- Ensure images are responsive (`max-width: 100%`, `height: auto`).

## Breakpoints
- **Mobile**: < 768px (Default)
- **Tablet**: 768px - 1023px
- **Desktop**: >= 1024px

## Viewport
Ensure `min-height: 100dvh` is used for full-screen backgrounds to account for mobile browser address bars. The `viewport` meta tag is configured in `index.html` to ensure proper scaling.

# Testing Procedures

## Running Tests
To run the full test suite (unit and integration):
```bash
npm test
```

## Test Stack
- **Runner**: Vitest
- **Environment**: jsdom
- **Utilities**: @testing-library/react, @testing-library/jest-dom

## Types of Tests
1. **Unit Tests**: Located next to components (e.g., `src/pages/Penjumlahan.test.jsx`). These test individual component rendering and logic.
2. **Integration Tests**: Located in `src/App.test.jsx`. These test routing logic and navigation between pages using mocked components.

## Writing Tests
Create a `.test.jsx` file next to your component.
```jsx
import { render, screen } from '@testing-library/react';
import MyComponent from './MyComponent';

test('renders correctly', () => {
  render(<MyComponent />);
  expect(screen.getByText('Hello')).toBeInTheDocument();
});
```
For components using `react-dnd`, you may need to mock the library (see `src/pages/Penjumlahan.test.jsx` for reference).

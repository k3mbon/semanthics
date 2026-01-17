import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { BrowserRouter } from 'react-router-dom';
import Pengurangan from './Pengurangan';

// Mock react-dnd to avoid HTML5Backend issues in test environment
vi.mock('react-dnd-html5-backend', () => ({
  HTML5Backend: {},
}));

vi.mock('react-dnd', async () => {
  const actual = await vi.importActual('react-dnd');
  return {
    ...actual,
    DndProvider: ({ children }) => <>{children}</>,
    useDrag: () => [{ isDragging: false }, () => {}],
    useDrop: () => [{ isOver: false }, () => {}],
  };
});

describe('Pengurangan Component', () => {
  it('renders the game title/question correctly', () => {
    render(
      <BrowserRouter>
        <Pengurangan />
      </BrowserRouter>
    );
    expect(screen.getByText(/Soal 1/i)).toBeInTheDocument();
  });

  it('renders navigation buttons', () => {
    render(
      <BrowserRouter>
        <Pengurangan />
      </BrowserRouter>
    );
    expect(screen.getByText('Keluar')).toBeInTheDocument();
    expect(screen.getByText('◀')).toBeInTheDocument();
    expect(screen.getByText('▶')).toBeInTheDocument();
  });

  it('renders counting grids', () => {
    const { container } = render(
      <BrowserRouter>
        <Pengurangan />
      </BrowserRouter>
    );
    // Soal 1 is 10 - 4 = 6. Max size is 10.
    // 2 groups * 10 slots = 20 slots.
    const slots = container.getElementsByClassName('grid-slot');
    expect(slots.length).toBe(20);
  });

  it('renders sidebar icons', () => {
    render(
      <BrowserRouter>
        <Pengurangan />
      </BrowserRouter>
    );
    expect(screen.getByAltText('BOLA')).toBeInTheDocument();
  });

  it('renders draggable numbers', () => {
    render(
      <BrowserRouter>
        <Pengurangan />
      </BrowserRouter>
    );
    // Check for a few numbers
    expect(screen.getByText('1')).toBeInTheDocument();
    expect(screen.getByText('5')).toBeInTheDocument();
    // Static operators should be present
    expect(screen.getAllByText('-').length).toBeGreaterThan(0);
    expect(screen.getAllByText('=').length).toBeGreaterThan(0);
  });

  it('navigates through questions', () => {
    render(
      <BrowserRouter>
        <Pengurangan />
      </BrowserRouter>
    );
    const nextButton = screen.getByText('▶');
    fireEvent.click(nextButton);
    expect(screen.getByText(/Soal 2/i)).toBeInTheDocument();
  });
});

import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { BrowserRouter } from 'react-router-dom';
import Penjumlahan from './Penjumlahan';

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

describe('Penjumlahan Component', () => {
  it('renders the game title/question correctly', () => {
    render(
      <BrowserRouter>
        <Penjumlahan />
      </BrowserRouter>
    );
    expect(screen.getByText(/Soal 1/i)).toBeInTheDocument();
  });

  it('renders navigation buttons', () => {
    render(
      <BrowserRouter>
        <Penjumlahan />
      </BrowserRouter>
    );
    expect(screen.getByText('Keluar')).toBeInTheDocument();
    expect(screen.getByText('◀')).toBeInTheDocument();
    expect(screen.getByText('▶')).toBeInTheDocument();
  });

  it('renders counting grids', () => {
    const { container } = render(
      <BrowserRouter>
        <Penjumlahan />
      </BrowserRouter>
    );
    // There are 2 groups of 10 slots = 20 slots
    const slots = container.getElementsByClassName('grid-slot');
    expect(slots.length).toBe(20);
  });

  it('renders sidebar icons', () => {
    render(
      <BrowserRouter>
        <Penjumlahan />
      </BrowserRouter>
    );
    expect(screen.getByAltText('BOLA')).toBeInTheDocument();
  });

  it('renders draggable numbers', () => {
    render(
      <BrowserRouter>
        <Penjumlahan />
      </BrowserRouter>
    );
    // Check for a few numbers
    expect(screen.getByText('1')).toBeInTheDocument();
    expect(screen.getByText('5')).toBeInTheDocument();
    // Use getAllByText because + and = appear in both counting area and equation bar
    expect(screen.getAllByText('+').length).toBeGreaterThan(0);
    expect(screen.getAllByText('=').length).toBeGreaterThan(0);
  });

  it('navigates through questions', () => {
    render(
      <BrowserRouter>
        <Penjumlahan />
      </BrowserRouter>
    );
    const nextButton = screen.getByText('▶');
    fireEvent.click(nextButton);
    expect(screen.getByText(/Soal 2/i)).toBeInTheDocument();
  });
});

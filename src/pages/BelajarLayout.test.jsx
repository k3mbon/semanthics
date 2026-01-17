import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { MemoryRouter, Routes, Route } from 'react-router-dom';
import Belajar from './Belajar';

// Mock the useParams hook
vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual('react-router-dom');
  return {
    ...actual,
    // We don't mock useParams here because we want real routing logic to pick up the params from MemoryRouter
  };
});

describe('Belajar Layout', () => {
  it('renders Header with sticky positioning and correct branding', () => {
    render(
      <MemoryRouter initialEntries={['/belajar']}>
        <Routes>
          <Route path="/belajar/*" element={<Belajar />} />
        </Routes>
      </MemoryRouter>
    );

    const header = screen.getByRole('banner');
    expect(header).toHaveClass('sticky');
    expect(header).toHaveClass('top-0');
    expect(header).toHaveClass('z-50');

    // Check Branding
    expect(screen.getByText('SIMATIKA')).toBeInTheDocument();
    const logo = screen.getByAltText('Simatika Logo');
    expect(logo).toBeInTheDocument();
    expect(logo).toHaveAttribute('src', '/logo-simatika.png');
  });

  it('renders content with flex-1 for responsive filling', () => {
    render(
      <MemoryRouter initialEntries={['/belajar']}>
        <Routes>
          <Route path="/belajar/*" element={<Belajar />} />
        </Routes>
      </MemoryRouter>
    );
    
    const contentText = screen.getByText('Ayo Belajar');
    const contentContainer = contentText.closest('.flex-1');
    expect(contentContainer).toBeInTheDocument();
    expect(contentContainer).toHaveClass('flex-col');
  });

  it('renders VideoPlayer content with correct layout', () => {
    render(
      <MemoryRouter initialEntries={['/belajar/penjumlahan']}>
        <Routes>
          <Route path="/belajar/*" element={<Belajar />} />
        </Routes>
      </MemoryRouter>
    );

    // Header check
    const header = screen.getByRole('banner');
    expect(header).toHaveClass('sticky');

    // Content check
    // Note: VideoPlayer uses useParams. Since we are using real Router, it should work if we set up route correctly.
    // However, the component relies on `const { topicId } = useParams();`
    // In Belajar, `<Route path=":topicId" ... />` handles it.
    
    const topicTitle = screen.getByText('Belajar Penjumlahan');
    const contentContainer = topicTitle.closest('.flex-1');
    expect(contentContainer).toBeInTheDocument();
    expect(contentContainer).toHaveClass('relative');
    expect(contentContainer).toHaveClass('z-0');
    expect(contentContainer).toHaveClass('py-10');
  });
});

import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import Info from './Info';
import { describe, it, expect } from 'vitest';

describe('Info Page', () => {
  it('renders with scrollable container and back button', () => {
    const { container } = render(
      <BrowserRouter>
        <Info />
      </BrowserRouter>
    );

    // Verify back button
    const backLink = screen.getByText('Kembali ke Menu');
    expect(backLink).toBeInTheDocument();
    
    // Verify main content
    // Use getAllByText for repeated headings
    const headings = screen.getAllByText('Tim Pengembang');
    expect(headings.length).toBeGreaterThan(0);

    // Check for scrolling classes on the root element
    // The first child of the rendered container is our root div
    const rootDiv = container.firstChild;
    expect(rootDiv).toHaveClass('h-dvh');
    expect(rootDiv).toHaveClass('overflow-y-auto');
    expect(rootDiv).toHaveClass('w-full');
  });
});

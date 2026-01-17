import { render, screen, waitFor } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import App from './App';

// Mock page components to verify routing without rendering full pages
vi.mock('./pages/Menu', () => ({ default: () => <div data-testid="menu-page">Menu Page</div> }));
vi.mock('./pages/Login', () => ({ default: () => <div data-testid="login-page">Login Page</div> }));
vi.mock('./pages/Info', () => ({ default: () => <div data-testid="info-page">Info Page</div> }));
vi.mock('./pages/Belajar', () => ({ default: () => <div data-testid="belajar-page">Belajar Page</div> }));
vi.mock('./pages/Berlatih', () => ({ default: () => <div data-testid="berlatih-page">Berlatih Page</div> }));
vi.mock('./pages/Penjumlahan', () => ({ default: () => <div data-testid="penjumlahan-page">Penjumlahan Page</div> }));
vi.mock('./pages/Pengurangan', () => ({ default: () => <div data-testid="pengurangan-page">Pengurangan Page</div> }));
vi.mock('./pages/Perkalian', () => ({ default: () => <div data-testid="perkalian-page">Perkalian Page</div> }));
vi.mock('./pages/Pembagian', () => ({ default: () => <div data-testid="pembagian-page">Pembagian Page</div> }));

describe('App Routing', () => {
  beforeEach(() => {
    window.history.pushState({}, 'Test page', '/');
  });

  it('renders Menu page on root route', () => {
    render(<App />);
    expect(screen.getByTestId('menu-page')).toBeInTheDocument();
  });

  it('renders Penjumlahan page on /berlatih/penjumlahan', () => {
    window.history.pushState({}, 'Test page', '/berlatih/penjumlahan');
    render(<App />);
    expect(screen.getByTestId('penjumlahan-page')).toBeInTheDocument();
  });

  it('redirects /penjumlahan to /berlatih/penjumlahan', async () => {
    window.history.pushState({}, 'Test page', '/penjumlahan');
    render(<App />);
    // Should verify it renders the target page
    expect(screen.getByTestId('penjumlahan-page')).toBeInTheDocument();
  });

  it('renders Berlatih page on /berlatih', () => {
    window.history.pushState({}, 'Test page', '/berlatih');
    render(<App />);
    expect(screen.getByTestId('berlatih-page')).toBeInTheDocument();
  });
});

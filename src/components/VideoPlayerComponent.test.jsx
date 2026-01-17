import { render, screen, fireEvent } from '@testing-library/react';
import VideoPlayerComponent from './VideoPlayerComponent';
import { describe, it, expect, vi } from 'vitest';

describe('VideoPlayerComponent', () => {
  it('renders with loading spinner initially', () => {
    const { container } = render(<VideoPlayerComponent src="/test.mp4" poster="/test.jpg" title="Test Video" />);
    // Check for spinner by class
    const spinner = container.querySelector('.animate-spin');
    expect(spinner).toBeInTheDocument();

    // Check fallback text is present
    expect(screen.getByText(/Browser Anda tidak mendukung tag video/i)).toBeInTheDocument();
  });

  it('renders poster image', () => {
    render(<VideoPlayerComponent src="/test.mp4" poster="/test.jpg" title="Test Video" />);
    // Access the video element and check 'poster' attribute
    // We can select by the fallback text parent
    const fallbackText = screen.getByText(/Browser Anda tidak mendukung tag video/i);
    const videoElement = fallbackText.closest('video');
    expect(videoElement).toHaveAttribute('poster', '/test.jpg');
  });

  it('has preload attribute set to auto', () => {
    render(<VideoPlayerComponent src="/test.mp4" poster="/test.jpg" title="Test Video" />);
    const fallbackText = screen.getByText(/Browser Anda tidak mendukung tag video/i);
    const videoElement = fallbackText.closest('video');
    expect(videoElement).toHaveAttribute('preload', 'auto');
  });
});

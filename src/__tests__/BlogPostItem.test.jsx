import React from 'react';
import { render, screen } from '@testing-library/react';
import BlogPostItem from '../components/BlogPostItem/BlogPostItem';

describe('BlogPostItem', () => {
  const mockPost = {
    id: '1',
    title: 'Test Blog Title',
    summary: 'This is a summary of the blog post.',
    date: '2023-01-01',
  };

  test('renders the blog title', () => {
    render(<BlogPostItem {...mockPost} />);
    expect(screen.getByRole('heading', { level: 2 })).toHaveTextContent(mockPost.title);
  });

  test('renders the summary', () => {
    render(<BlogPostItem {...mockPost} />);
    expect(screen.getByText(mockPost.summary)).toBeInTheDocument();
  });

  test('renders the formatted date', () => {
    render(<BlogPostItem {...mockPost} />);
    expect(screen.getByText(/Published on/i)).toHaveTextContent('January 1, 2023');
  });
});

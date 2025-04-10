import React from 'react';
import { render, screen } from '@testing-library/react';
import BlogPostList from '../components/BlogPostList/BlogPostList';

describe('BlogPostList', () => {
  const samplePosts = [
    {
      id: '1',
      title: 'First Post',
      summary: 'This is the first blog post.',
      date: '2023-01-01',
    },
    {
      id: '2',
      title: 'Second Post',
      summary: 'This is the second blog post.',
      date: '2023-02-01',
    },
  ];

  test('renders list of blog posts', () => {
    render(<BlogPostList posts={samplePosts} />);
    expect(screen.getByText('First Post')).toBeInTheDocument();
    expect(screen.getByText('Second Post')).toBeInTheDocument();
  });

  test('renders no posts message when empty', () => {
    render(<BlogPostList posts={[]} />);
    expect(screen.getByText(/No blog posts available/i)).toBeInTheDocument();
  });

  test('does not render no posts message when posts exist', () => {
    render(<BlogPostList posts={samplePosts} />);
    expect(screen.queryByText(/No blog posts available/i)).not.toBeInTheDocument();
  });
});

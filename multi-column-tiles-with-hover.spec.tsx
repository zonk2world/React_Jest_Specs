import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';

import { ImageReveal } from './multi-column-tiles-with-hover';

test('renders content', async () => {
  const props = {
    imgSrc: '/fakeImg.jpg',
    title: 'All-inclusive benefits',
    revealItems: '<p>Lorem ipsum</p>',
  };
  render(<ImageReveal {...props} />);
  await screen.findAllByText(props.title);
});

test('renders without href', async () => {
  const props = {
    imgSrc: '/fakeImg.jpg',
    title: 'All-inclusive benefits',
    revealItems: '<p>Lorem ipsum</p>',
  };
  render(<ImageReveal {...props} />);
  await screen.getByTestId('image-reveal-anchor');
  const button = screen.getByTestId('image-reveal-anchor');
  expect(button).not.toHaveAttribute('href');
});

test('renders with href', async () => {
  const url = 'https://www.google.com';
  const props = {
    imgSrc: '/fakeImg.jpg',
    title: 'All-inclusive benefits',
    revealItems: '<p>Lorem ipsum</p>',
    button: {
      url: url,
    },
  };
  render(<ImageReveal {...props} />);
  await screen.getByTestId('image-reveal-anchor');
  const button = screen.getByTestId('image-reveal-anchor');
  expect(button).toHaveAttribute('href', url);
});

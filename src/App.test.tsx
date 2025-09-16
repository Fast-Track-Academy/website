import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';

test('renders Fast Track Academy homepage', () => {
  render(<App />);
  const titleElement = screen.getByText(/Fast Track Academy/i);
  expect(titleElement).toBeInTheDocument();
});

import React from 'react';
import { render, screen } from '@testing-library/react';
import ExampleComponent from '../frontend/components/ExampleComponent';

test('renders Example Component', () => {
  render(<ExampleComponent />);
  expect(screen.getByText('Example Component')).toBeInTheDocument();
}); 
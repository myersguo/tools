import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';

test('renders terminal CLI template tool link', () => {
 render(<App />);
 const linkElement = screen.getByText(/Terminal \/ CLI Template Studio/i);
 expect(linkElement).toBeInTheDocument();
});

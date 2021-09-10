import { render, screen } from '@testing-library/react';
import Header from './components/Header';

test('Test Header Componennt', () => {
  render(<Header title="Dudi" subtitle="stockbit" />);
  const linkElement = screen.getByText('Dudi')
  expect(linkElement).toBeInTheDocument();
});

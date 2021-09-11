import { render, screen } from '@testing-library/react';
import Header from './components/Header';

test('Test Header Componennt', () => {
  render(<Header title="Dudi" subtitle="stockbit" />);
  const title = screen.getByText('Dudi')
  const subtitle = screen.getByText('stockbit')
  expect(title).toBeInTheDocument();
  expect(subtitle).toBeInTheDocument();
});

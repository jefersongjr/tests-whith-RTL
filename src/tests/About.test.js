import React from 'react';
import { screen, render } from '@testing-library/react';
import About from '../pages/About';

describe('Teste se a página contém as informações sobre a Pokédex ', () => {
  test('Teste se a página contém um heading h2 com o texto About Pokédex', () => {
    render(<About />);
    const aboutHeader = screen.getByText(/about pokédex/i);

    expect(aboutHeader).toBeInTheDocument();
  });
});

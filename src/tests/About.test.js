import React from 'react';
import { screen, render } from '@testing-library/react';
import About from '../pages/About';

describe('Teste se a página contém as informações sobre a Pokédex: ', () => {
  test('Teste se a página contém um heading h2 com o texto About Pokédex', () => {
    render(<About />);
    const aboutHeader = screen.getByText(/about pokédex/i);

    expect(aboutHeader).toBeInTheDocument();
  });

  test('Teste se a página contém dois parágrafos com texto sobre a Pokédex: ', () => {
    render(<About />);
    const paragraphsAbout1 = screen.getByText(/This application/i);
    const paragraphsAbout2 = screen.getByText(/One can filter/i);

    expect(paragraphsAbout1).toBeInTheDocument();
    expect(paragraphsAbout2).toBeInTheDocument();
  });
});

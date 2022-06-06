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

  test(`Teste se a página contém a seguinte imagem de uma Pokédex: 
       https://cdn2.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png.`, () => {
    render(<About />);
    const imageUrl = 'https://cdn2.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png';
    const imageAbout = screen.getByRole('img', { name: /pokédex/i });

    expect(imageAbout).toBeInTheDocument();
    expect(imageAbout.src).toBe(imageUrl);
  });
});

import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import renderWithRouter from '../services/renderWithRouter';

describe(`Teste se o topo da aplicação 
          contém um conjunto fixo de links de navegação: `, () => {
  test(`Teste se a aplicação é redirecionada para a página inicial,
    na URL (/ ao clicar no link Home da barra de navegação;`, () => {
    renderWithRouter(<App />);

    const linkHome = screen.getByRole('link', { name: /home/i });
    expect(linkHome).toBeInTheDocument();

    userEvent.click(linkHome);

    const homeHeader = screen.getByText(/encountered pokémons/i);
    expect(homeHeader).toBeInTheDocument();
  });

  test(`Teste se a aplicação é redirecionada para a página de About,
   na URL /about, ao clicar no link About da barra de navegação;`, () => {
    renderWithRouter(<App />);

    const linkAbout = screen.getByRole('link', { name: /about/i });
    expect(linkAbout).toBeInTheDocument();

    userEvent.click(linkAbout);

    const aboutHeader = screen.getByText(/about pokédex/i);
    expect(aboutHeader).toBeInTheDocument();
  });

  test(`Teste se a aplicação é redirecionada para a página de Pokémons Favoritados, 
        na URL /favorites, ao clicar no link Favorite 
        Pokémons da barra de navegação`, () => {
    renderWithRouter(<App />);

    const linkFavorites = screen.getByRole('link', { name: /favorite pokémons/i });
    expect(linkFavorites).toBeInTheDocument();

    userEvent.click(linkFavorites);

    const favoritesHeader = screen.getByRole('heading', { name: /favorite pokémons/i });
    expect(favoritesHeader).toBeInTheDocument();
  });

  test(`Teste se a aplicação é redirecionada para a página 
        Not Found ao entrar em uma URL desconhecida.`, () => {
    renderWithRouter(<App />);
  });

  
});

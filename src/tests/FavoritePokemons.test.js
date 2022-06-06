import React from 'react';
import { screen, render } from '@testing-library/react';
import FavoritePokemons from '../pages/FavoritePokemons';

describe('Testa a página de Pokemóns Favoritos', () => {
  test(`Teste se é exibida na tela a mensagem 
     No favorite pokemon found, caso a pessoa não tenha pokémons favoritos;`, () => {
    render(<FavoritePokemons />);
    const notFavorites = screen.getByText(/No favorite/i);

    expect(notFavorites).toBeInTheDocument();
  });
  test('Teste se são exibidos todos os cards de pokémons favoritados; ', () => {
    render(<FavoritePokemons />);
    const favoritePokemon = screen.findByTestId('pokemon-name');
    expect(favoritePokemon).toBeInTheDocument();
  });
});

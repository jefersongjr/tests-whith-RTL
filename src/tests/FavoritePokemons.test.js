import React from 'react';
import { screen, render } from '@testing-library/react';
import FavoritePokemons from '../pages/FavoritePokemons';
import renderWithRouter from '../renderWithRouter';

describe('Testa a página de Pokemóns Favoritos', () => {
  test(`Teste se é exibida na tela a mensagem 
     No favorite pokemon found, caso a pessoa não tenha pokémons favoritos;`, () => {
    render(<FavoritePokemons />);
    const notFavorites = screen.getByText(/No favorite/i);

    expect(notFavorites).toBeInTheDocument();
  });
  test('Teste se são exibidos todos os cards de pokémons favoritados; ', async () => {
    const favoritePokemons = [{
      id: 25,
      name: 'Pikachu',
      type: 'Electric',
      averageWeight: {
        value: '6.0',
        measurementUnit: 'kg',
      },
      image: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/25.png',
      moreInfo: 'https://bulbapedia.bulbagarden.net/wiki/Pikachu_(Pok%C3%A9mon)',
    }];

    renderWithRouter(<FavoritePokemons pokemons={ favoritePokemons } />);

    const favorite = await screen.findByText(/pikachu/i);
    expect(favorite).toBeInTheDocument();
  });
});

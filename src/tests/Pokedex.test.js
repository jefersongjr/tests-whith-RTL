import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import pokemons from '../data';
import renderWithRouter from '../renderWithRouter';
import Pokedex from '../pages/Pokedex';

describe('Teste o componente <Pokedex />', () => {
  const isPokemonFavoriteByIdType = {
    10: false,
    143: false,
    148: false,
    151: false,
    23: false,
    65: false,
    78: false,
    5: false,
  };
  beforeEach(() => renderWithRouter(<Pokedex
    pokemons={ pokemons }
    isPokemonFavoriteById={ isPokemonFavoriteByIdType }
  />));
  test(`Teste se a página contém um 
      heading h2 com o texto Encountered pokémons; `, () => {
    const headerPokedex = screen.getByText(/encountered pokémons/i);

    expect(headerPokedex).toBeInTheDocument();
  });

  test(`Teste se é exibido o próximo pokémon da 
  lista quando o botão Próximo pokémon é clicado: `, async () => {
    const btnNextPokemon = screen.getByText(/próximo pokémon/i);
    expect(btnNextPokemon).toBeInTheDocument();

    const firstPokemon = screen.getByText(/pikachu/i);
    expect(firstPokemon).toBeInTheDocument();

    userEvent.click(btnNextPokemon);

    const nextPokemon = screen.getByText(/Charmander/i);
    expect(nextPokemon).toBeInTheDocument();

    userEvent.click(btnNextPokemon);
    userEvent.click(btnNextPokemon);
    userEvent.click(btnNextPokemon);
    userEvent.click(btnNextPokemon);
    userEvent.click(btnNextPokemon);
    userEvent.click(btnNextPokemon);
    userEvent.click(btnNextPokemon);

    const lastPokemon = screen.getByText(/Dragonair/i);
    expect(lastPokemon).toBeInTheDocument();

    userEvent.click(btnNextPokemon);

    expect(firstPokemon).toBeInTheDocument();
  });

  test('Teste se é mostrado apenas um pokémon por vez; ', () => {
    const pokemonView = screen.getAllByTestId('pokemon-name');

    expect(pokemonView).toHaveLength(1);
  });
});

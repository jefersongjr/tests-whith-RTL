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

  test('Teste se a Pokédex tem os botões de filtro: ', () => {
    const btnNextPokemon = screen.getByText(/próximo pokémon/i);
    const btnAll = screen.getAllByText(/all/i);
    expect(btnAll).toHaveLength(1);

    const btnEletric = screen.getByRole('button', { name: /electric/i });
    expect(btnEletric).toBeInTheDocument();

    userEvent.click(btnEletric);
    const firstPokemonEletric = screen.getByText(/pikachu/i);
    expect(firstPokemonEletric).toBeInTheDocument();
    expect(btnNextPokemon).not.toBeEnabled();

    const btnFire = screen.getByText(/fire/i);
    expect(btnFire).toBeInTheDocument();

    const btnBug = screen.getAllByText(/bug/i);
    expect(btnBug).toHaveLength(1);

    const btnPoison = screen.getAllByText(/poison/i);
    expect(btnPoison).toHaveLength(1);

    const btnPsychic = screen.getAllByText(/psychic/i);
    expect(btnPsychic).toHaveLength(1);

    const btnNormal = screen.getAllByText(/normal/i);
    expect(btnNormal).toHaveLength(1);

    const btnDragon = screen.getAllByText(/dragon/i);
    expect(btnDragon).toHaveLength(1);
  });
});

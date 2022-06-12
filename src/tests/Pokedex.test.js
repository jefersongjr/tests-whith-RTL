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

  const testButtonType = (button, nextType, pokemon) => {
    userEvent.click(button);
    expect(screen.getByText(pokemon)).toBeInTheDocument();
    expect(nextType).not.toBeEnabled();
  };

  const testButtonType2Poke = (button, nextType, pokemon, pokemon2) => {
    userEvent.click(button);
    expect(screen.getByText(pokemon)).toBeInTheDocument();
    expect(nextType).toBeEnabled();

    userEvent.click(nextType);
    expect(screen.getByText(pokemon2)).toBeInTheDocument();

    userEvent.click(nextType);
    expect(screen.getByText(pokemon)).toBeInTheDocument();
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
    const btnAll = screen.getByText(/all/i);
    expect(btnAll).toBeInTheDocument();

    const btnEletric = screen.getByRole('button', { name: /electric/i });
    expect(btnEletric).toBeInTheDocument();

    testButtonType(btnEletric, btnNextPokemon, /pikachu/i);

    const btnFire = screen.getByText(/fire/i);
    expect(btnFire).toBeInTheDocument();

    testButtonType2Poke(btnFire, btnNextPokemon, /charmander/i, /rapidash/i);

    const btnBug = screen.getByText(/bug/i);
    expect(btnBug).toBeInTheDocument();

    testButtonType(btnBug, btnNextPokemon, /caterpie/i);

    const btnPoison = screen.getByText(/poison/i);
    expect(btnPoison).toBeInTheDocument();

    testButtonType(btnPoison, btnNextPokemon, /ekans/i);

    const btnPsychic = screen.getByText(/psychic/i);
    expect(btnPsychic).toBeInTheDocument();

    testButtonType2Poke(btnPsychic, btnNextPokemon, /alakazam/i, /mew/i);

    const btnNormal = screen.getByText(/normal/i);
    expect(btnNormal).toBeInTheDocument();

    testButtonType(btnNormal, btnNextPokemon, /snorlax/i);

    const btnDragon = screen.getByText(/dragon/i);
    expect(btnDragon).toBeInTheDocument();

    testButtonType(btnDragon, btnNextPokemon, /dragonair/i);
  });
});

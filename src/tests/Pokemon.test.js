import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Pokemon from '../components/Pokemon';
import pokemons from '../data';
import renderWithRouter from '../renderWithRouter';

describe(' o componente <Pokemon.js />', () => {
  test(`Teste se é renderizado um card com as 
    informações de determinado pokémon: `, () => {
    renderWithRouter(<Pokemon
      pokemon={ pokemons[0] }
      isFavorite={ false }
    />);
    const nomePokemon = screen.getByText(/pikachu/i);
    const typePokemon = screen.getByText(/electric/i);
    const averagePokemon = screen.getByText(/6.0 kg/);
    const imgPokemon = screen.getByAltText(/pikachu sprite/i);
    const imgUrl = 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/25.png';

    expect(nomePokemon).toBeInTheDocument();
    expect(typePokemon).toBeInTheDocument();
    expect(averagePokemon).toBeInTheDocument();
    expect(imgPokemon).toBeInTheDocument();
    expect(imgPokemon.src).toBe(imgUrl);
  });

  test(`Teste se o card do pokémon indicado na Pokédex contém um
   link de navegação para exibir detalhes deste pokémon.
   O link deve possuir a URL /pokemons/<id>, onde <id> é 
   o id do pokémon exibido;`, () => {
    const { history } = renderWithRouter(<Pokemon
      pokemon={ pokemons[0] }
      isFavorite={ false }
    />);
    const linkMoreDetail = screen.getByRole('link', { name: /more details/i });
    expect(linkMoreDetail).toBeInTheDocument();

    userEvent.click(linkMoreDetail);

    const pokemonDetailsH2 = screen.getByText(/details/i);
    expect(pokemonDetailsH2).toBeInTheDocument();

    const { pathname } = history.location;
    expect(pathname).toBe('/pokemons/25');
  });
  test('Teste se existe um ícone de estrela nos pokémons favoritados:', () => {
    const TRUE = true;
    renderWithRouter(<Pokemon
      pokemon={ pokemons[0] }
      isFavorite={ TRUE }
    />);
    const favoriteImg = screen.getByAltText(/pikachu is marked as favorite/i);
    expect(favoriteImg).toBeInTheDocument();

    const favoriteImgUrl = 'http://localhost/star-icon.svg';
    expect(favoriteImg.src).toBe(favoriteImgUrl);
  });
});

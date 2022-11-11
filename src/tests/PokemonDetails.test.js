import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from '../renderWithRouter'
import App from '../App';

describe('Testes para página pokemon details', () => {
  const more = 'More details';
  it('Deve aparecer o texto correto aparece quando nenhum pokemon foi adicionado', () => {
    const { history } = renderWithRouter(<App />);
    const details = screen.getByRole('link', {
      name: more,
    });
    expect(details).toBeInTheDocument();
    userEvent.click(details);
    expect(details).not.toBeInTheDocument();
    const title = (
      screen.getByRole('heading', {
        name: 'Pikachu Details', level: 2,
      })
    );
    const title2 = (
      screen.getByRole('heading', {
        name: 'Summary', level: 2,
      })
    );
    const name = screen.getByTestId('pokemon-name');
    const type = screen.getByTestId('pokemon-type');
    const pokemonWeight = screen.getByTestId('pokemon-weight');
    const image = screen.getByAltText('Pikachu sprite');
    const pPart = 'This intelligent Pokémon roasts hard berries ';
    const p = `${pPart}with electricity to make them tender enough to eat.`;
    const par = screen.getByText(p);
    expect(title).toBeInTheDocument();
    expect(title2).toBeInTheDocument();
    expect(par).toBeInTheDocument();
    expect(history.location.pathname).toBe('/pokemons/25');

    expect(name).toHaveTextContent('Pikachu');
    expect(type).toHaveTextContent('Electric');
    expect(pokemonWeight).toHaveTextContent('Average weight: 6.0 kg');
    expect(image).toHaveAttribute('src', 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/25.png');
  });

  it('Teste se existe na página uma seção com os mapas:', () => {
    renderWithRouter(<App />);
    const details = screen.getByRole('link', {
      name: more,
    });
    expect(details).toBeInTheDocument();
    userEvent.click(details);
    expect(details).not.toBeInTheDocument();
    const title3 = (
      screen.getByRole('heading', {
        name: 'Game Locations of Pikachu', level: 2,
      })
    );
    expect(title3).toBeInTheDocument();

    const maps = screen.getAllByAltText('Pikachu location');
    expect(maps[0]).toHaveAttribute('src', 'https://pwo-wiki.info/images/4/47/Viridian_Forest.gif');
    expect(maps[1]).toHaveAttribute('src', 'https://pwo-wiki.info/images/5/5b/Pp.gif');
  });

  it('Teste se o usuário pode favoritar um pokémon através da página de detalhes', () => {
    const { history } = renderWithRouter(<App />);
    const details = screen.getByRole('link', {
      name: more,
    });
    expect(details).toBeInTheDocument();
    userEvent.click(details);
    const title = (
      screen.getByRole('checkbox', {
        name: 'Pokémon favoritado?',
      })
    );
    expect(title).toBeInTheDocument();

    userEvent.click(title);
    expect(title.checked).toBe(true);
    userEvent.click(title);
    expect(title.checked).toBe(false);
    userEvent.click(title);
    expect(title.checked).toBe(true);
    expect(details).not.toBeInTheDocument();

    const favoritesButton = screen.getByRole('link', {
      name: 'Favorite Pokémons',
    });

    userEvent.click(favoritesButton);

    const title2 = screen.getByRole('heading', {
      name: 'Favorite pokémons', level: 2,
    });

    expect(title2).toBeInTheDocument();
    expect(history.location.pathname).toBe('/favorites');
  });
});
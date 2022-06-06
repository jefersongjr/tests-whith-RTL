import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import renderWithRouter from '../services/renderWithRouter';

describe('Testando o Componente App ', () => {
  test(`Teste se a aplicação é redirecionada para a página inicial,
    na URL (/ ao clicar no link Home da barra de navegação;`, () => {
    renderWithRouter(<App />);

    const linkHome = screen.getByRole('link', { name: /home/i });
    expect(linkHome).toBeInTheDocument();

    userEvent.click(linkHome);

    const homeHeader = screen.getByText(/encountered pokémons/i);
    expect(homeHeader).toBeInTheDocument();
  });
});

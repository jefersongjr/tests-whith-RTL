import React from 'react';
import { screen, render } from '@testing-library/react';
import NotFound from '../pages/NotFound';

describe('Testa a página Not Found', () => {
  test(`Teste se a página contém um heading h2 
    com o texto Page requested not found 😭;`, () => {
    render(<NotFound />);
    const notFoundHeader = screen.getByText(/page requested not found/i);

    expect(notFoundHeader).toBeInTheDocument();
  });
  test('Teste se a página mostra a imagem https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif', () => {
    render(<NotFound />);
    const imageUrl = 'https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif';
    const notFoundImage = (
      screen.getByAltText(/Pikachu crying because the page requested was not found/i)
    );
    expect(notFoundImage).toBeInTheDocument();
    expect(notFoundImage.src).toBe(imageUrl);
  });
});

import { expect, describe, test, jest } from '@jest/globals';
import { render, screen } from "@testing-library/react";
import Async from './Async';

describe('Async component', () => {
    test('render posts if request succedes', async () => {
        // Mocking: para evitar llamadas a servidor
        window.fetch = jest.fn();
        window.fetch.mockResolvedValueOnce({ // hay que generar el valor esperado por la funcion fetch del componente
            json: async () => [{id :'p1', title: 'First post'}]
        });
        render(<Async />);

        // Usamos find ya que devuelve una promesa por que espera a encontrar el elemento, como tercer parametro
        // puedes pasarle un timeout
        const listItemElements = await screen.findAllByRole('listitem');
        expect(listItemElements).not.toHaveLength(0);
    });
});
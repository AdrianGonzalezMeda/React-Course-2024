import { expect, describe, test } from '@jest/globals'; // No hace falta importarlas pero asi tenemos preview de sus metodos en el IDE
import userEvent from '@testing-library/user-event';
import { render, screen } from "@testing-library/react";
import Greeting from "./Greeting";

// Suit tests: agrupar tests
describe('Greeting component', () => {
    // Simple test
    test('renders Hello world as a text', () => {
        // Arrange: Set up the test data, test conditions and test enviroment
        render(<Greeting />);

        //Act: Run logic that shouled be tested (e.g., execute function)
        // ... nothing in this case

        //Assert: Compare execution results with ecpected results
        const helloWorld = screen.getByText('Hello world!');
        expect(helloWorld).toBeInTheDocument();
    });

    test('renders good to see you when the button was NOT clicked', () => {
        render(<Greeting />);
        const element = screen.getByText("good to see you", { exact: false });
        expect(element).toBeInTheDocument();
    });

    test('renders Changed! when the button was clicked', () => {
        // Arrange
        render(<Greeting />);
        // Act
        const buttonElement = screen.getByRole('button');
        userEvent.click(buttonElement);
        // Assert
        const element = screen.getByText("Changed!");
        expect(element).toBeInTheDocument();
    });

    test('does not render "good to see you" if the button was clicked', () => {
        // Arrange
        render(<Greeting />);
        // Act
        const buttonElement = screen.getByRole('button');
        userEvent.click(buttonElement);
        // Assert
        const element = screen.queryByText("good to see you", { exact: false }); // Las diferencias entre query, get y find es si devuelven errores, promesas o null si no encuentran el elemento 
        expect(element).not.toBeInTheDocument();
    })
});



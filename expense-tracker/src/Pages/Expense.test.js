
import { render, screen } from "@testing-library/react";
import Expense from "./Expense";

describe('Expense Component', () => {
    test('render  premium when the button was not clicked', () => {
        render(<Expense />);

        const outputElement = screen.getByText('premium', { exact: false});
        expect(outputElement).toBeInTheDocument();
    })

    test('render Download CSV FILE when the button was clicked', () => {
        render(<Expense />);
        const buttonElement = screen.getByRole('button');
        userEvent.click(buttonElement);
        const outputElement = screen.getByText('Download CSV file');
        expect(outputElement).toBeInTheDocument();
    })
} )
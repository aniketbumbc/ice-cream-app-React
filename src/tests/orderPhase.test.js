import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';

describe('App', () => {
  test('order phase happy path', async () => {
    // render app
    render(<App />);

    // add scoop and toppings
    const vanillaInput = await screen.findByRole('spinbutton', {
      name: 'Vanilla',
    });
    //click on button
    userEvent.clear(vanillaInput);
    userEvent.type(vanillaInput, '1');

    const choclateInput = await screen.findByRole('spinbutton', {
      name: 'Chocolate',
    });

    userEvent.clear(choclateInput);
    userEvent.type(choclateInput, '2');

    const gummieBearsCheckbox = await screen.findByRole('checkbox', {
      name: 'Gummi bears',
    });
    userEvent.click(gummieBearsCheckbox);

    const orderSummaryButton = screen.getByRole('button', {
      name: /order sundae/i,
    });

    userEvent.click(orderSummaryButton);

    const summaryHeading = screen.getByRole('heading', {
      name: 'Order Summary',
    });
    expect(summaryHeading).toBeInTheDocument();

    const scoopsHeading = screen.getByRole('heading', {
      name: 'Scoops: $6.00',
    });
    expect(scoopsHeading).toBeInTheDocument();

    const toppingHeading = screen.getByRole('heading', {
      name: 'Toppings: $1.50',
    });
    expect(toppingHeading).toBeInTheDocument();

    expect(screen.getByText('1 Vanilla')).toBeInTheDocument();
    expect(screen.getByText('Gummi bears')).toBeInTheDocument();
    expect(screen.getByText('2 Chocolate')).toBeInTheDocument();

    const confirmButton = screen.getByRole('button', { name: 'Confirm Order' });

    userEvent.click(confirmButton);

    const thankYouHeader = await screen.findAllByRole('heading', {
      name: /think you/i,
    });

    expect(thankYouHeader).toBeInTheDocument();

    const newOrderButton = screen.getByRole('button', { name: /new order/i });
    userEvent.click(newOrderButton);

    const scoopsTotal = screen.getByText('Scoops total: $0.00');
    expect(scoopsTotal).toBeInTheDocument();
    const toppingsTotal = screen.getByText('Scoops total: $0.00');
    expect(toppingsTotal).toBeInTheDocument();

    await screen.findByRole('spinbutton', {
      name: 'Vanilla',
    });
    await screen.findByRole('checkbox', {
      name: 'Gummi bears',
    });
  });
});

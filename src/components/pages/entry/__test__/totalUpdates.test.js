import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Options from '../Options';
import { OrderDetailsProvider } from '../../../../context/OrderDetails';

it('update scoop subtotal when change', async () => {
  render(<Options optionType='scoops' />, { wrapper: OrderDetailsProvider });
  // make sure subtotal 0
  const scoopTotal = screen.getByText('Scoops total: $', { exact: false });

  expect(scoopTotal).toHaveTextContent('0.00');

  // update vanilla scoop

  const vanillaInput = await screen.findByRole('spinbutton', {
    name: 'Vanilla',
  });

  userEvent.clear(vanillaInput);
  userEvent.type(vanillaInput, '1');

  expect(scoopTotal).toHaveTextContent('2.00');

  const choclateInput = await screen.findByRole('spinbutton', {
    name: 'Chocolate',
  });

  userEvent.clear(choclateInput);
  userEvent.type(choclateInput, '2');

  expect(scoopTotal).toHaveTextContent('6.00');
});

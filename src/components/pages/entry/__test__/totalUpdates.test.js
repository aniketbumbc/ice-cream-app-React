import { render, screen } from '../../../../test-utils/testing-library-utils';
import userEvent from '@testing-library/user-event';
import Options from '../Options';

it('update scoop subtotal when change', async () => {
  render(<Options optionType='scoops' />);
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

it('update topping subtotal when toppings change', async () => {
  render(<Options optionType='toppings' />);

  const toppingsTotal = screen.getByText('Toppings total: $', {
    exact: false,
  });
  expect(toppingsTotal).toHaveTextContent('0.00');

  const gummieBearsCheckbox = await screen.findByRole('checkbox', {
    name: 'Gummi bears',
  });
  userEvent.click(gummieBearsCheckbox);
  expect(toppingsTotal).toHaveTextContent('1.50');

  const mochiCheckbox = await screen.findByRole('checkbox', {
    name: 'Mochi',
  });
  userEvent.click(mochiCheckbox);
  expect(toppingsTotal).toHaveTextContent('3.00');

  userEvent.click(mochiCheckbox);
  expect(toppingsTotal).toHaveTextContent('1.50');
});

import {
  render,
  screen,
  waitForElementToBeRemoved,
} from '@testing-library/react';
import SummaryFrom from '../SummaryForm';
import userEvent from '@testing-library/user-event';

it('Should render checkbox correctly', () => {
  render(<SummaryFrom />);
  const checkBoxEle = screen.getByRole('checkbox', {
    name: 'I agree to Terms and Conditions',
  });

  expect(checkBoxEle).not.toBeChecked();

  const confirmButton = screen.getByRole('button', { name: 'Confirm Order' });
  expect(confirmButton).toBeDisabled();
});

it('Should enable button on first click and disable on second click checkbox', () => {
  render(<SummaryFrom />);
  const checkBoxEle = screen.getByRole('checkbox', {
    name: 'I agree to Terms and Conditions',
  });

  const confirmButton = screen.getByRole('button', { name: 'Confirm Order' });

  userEvent.click(checkBoxEle);

  expect(confirmButton).toBeEnabled();

  userEvent.click(checkBoxEle);

  expect(confirmButton).toBeDisabled();
});

it('popover responds to hover', async () => {
  render(<SummaryFrom />);
  // start out hidden

  const nullPopover = screen.queryByText(
    /no ice cream will actully be delivered/i
  );
  expect(nullPopover).toBeNull();

  //mouse over on label

  const termsAndConditions = screen.getByText(/Terms and Conditions/);
  userEvent.hover(termsAndConditions);

  const popover = screen.getByText(/No icecream will actually delivered/i);
  expect(popover).toBeInTheDocument();

  // disappears when mouse out
  userEvent.unhover(termsAndConditions);

  await waitForElementToBeRemoved(() =>
    screen.queryByText(/No icecream will actually delivered/i)
  );
});

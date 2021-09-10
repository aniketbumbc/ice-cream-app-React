import { render, screen, fireEvent } from '@testing-library/react';
import SummaryFrom from '../SummaryForm';

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

  fireEvent.click(checkBoxEle);

  expect(confirmButton).toBeEnabled();

  fireEvent.click(checkBoxEle);

  expect(confirmButton).toBeDisabled();
});

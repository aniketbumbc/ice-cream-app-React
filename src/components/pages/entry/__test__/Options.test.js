import { render, screen } from '@testing-library/react';
import Options from '../Options';

it('Displays image for each scoop option from the server', async () => {
  render(<Options optionType='scoops' />);

  // find images
  const scoopImages = await screen.findAllByRole('img', { name: /scoop$/i });
  //const scoopImages = await screen.findAllByTestId('image-id');
  expect(scoopImages).toHaveLength(3);

  // confirm alt text of images
  const altText = scoopImages.map((element) => element.alt);
  expect(altText).toEqual([
    'Mint chip scoop',
    'Vanilla scoop',
    'Chocolate scoop',
  ]);
});

it('Should display image for each toppings from server', async () => {
  render(<Options optionType='toppings' />);

  const toppingImages = await screen.findAllByRole('img', {
    name: /toppings$/i,
  });

  expect(toppingImages).toHaveLength(2);
}, 50000);

it('Should display image for correct toppings', async () => {
  render(<Options optionType='toppings' />);
  debugger;
  const toppingImages = await screen.findAllByRole('img', {
    name: /toppings$/i,
  });
  const altText = toppingImages.map((ele) => ele.alt);

  expect(altText).toHaveLength(2);
  expect(altText).toEqual(['Gummi bears toppings', 'Mochi toppings']);
}, 50000);

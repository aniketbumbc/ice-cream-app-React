import { render, screen } from '@testing-library/react';
import Options from '../Options';

test('Displays image for each scoop option from the server', async () => {
  render(<Options optionType='scoops' />);

  // find images
  const scoopImages = await screen.findAllByRole('img', { name: /scoop$/i });
  expect(scoopImages).toHaveLength(3);

  // confirm alt text of images
  const altText = scoopImages.map((element) => element.alt);
  expect(altText).toEqual([
    'Mint chip scoop',
    'Vanilla scoop',
    'Chocolate scoop',
  ]);
});

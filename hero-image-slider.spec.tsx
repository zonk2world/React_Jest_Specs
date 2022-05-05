import React from 'react';
import { HeroImageSlider } from './hero-image-slider';

import { render, screen, fireEvent } from '@testing-library/react';

test('renders image slider', async () => {
  render(
    <HeroImageSlider
      images={[
        {
          url:
            'https://assets.hiltonstatic.com/images/f_auto,c_limit,w_3840,q_auto/v1610467117/dx/wp/hiltoncancun/media-library/Assets_Masthead-2@1x_25405af7/Assets_Masthead-2@1x_25405af7.jpg',
          alt: 'test image 1',
        },
        {
          url:
            'https://assets.hiltonstatic.com/images/f_auto,c_limit,w_3840,q_auto/v1610467117/dx/wp/hiltoncancun/media-library/Assets_Masthead-2@1x_25405af7/Assets_Masthead-2@1x_25405af7.jpg',
          alt: 'test image 2',
        },
      ]}
    />
  );
  await screen.getByAltText(/test image 1/i);
  const buttons = await screen.findAllByRole('button');
  fireEvent.click(buttons[1]);
  await screen.getByAltText(/test image 2/i);
  fireEvent.click(buttons[0]);
});

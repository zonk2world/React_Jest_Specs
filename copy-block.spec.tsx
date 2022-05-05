import React from 'react';
import { IntroText } from './copy-block';

import { render, screen } from '@testing-library/react';

test('renders links when added - non frontpage', async () => {
  render(
    <IntroText
      headline="My headline"
      headlineAccent="subtext"
      text="<p>Some content</p>"
      buttons={[
        {
          link: {
            url: '/example',
            title: 'Example',
            target: undefined,
          },
        },
      ]}
    />
  );

  screen.getByText('My headline');
  screen.getByRole('link', { name: 'Example' });
});

test('renders links when added - homepage', async () => {
  render(
    <IntroText
      headline="My headline"
      headlineAccent="subtext"
      text="<p>Some content</p>"
      buttons={[
        {
          link: {
            url: '/example',
            title: 'Example',
            target: undefined,
          },
        },
      ]}
    />
  );

  screen.getByText('My headline');
  screen.getByRole('link', { name: 'Example' });
});

test('Checks that the component is first in the flexible field queue', async () => {
  render(
    <IntroText
      headline="My headline"
      isFirst={0}
      headlineAccent="subtext"
      text="<p>Some content</p>"
      extraInformation="yes"
      phone="123456789"
    />
  );

  screen.getByTestId('intro-extra');
  screen.getByText('123456789');
});

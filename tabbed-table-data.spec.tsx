import React from 'react';
import { TabbedSection } from './tabbed-table-data';
import { render, screen, fireEvent } from '@testing-library/react';

test('Renders the tabs and can click through each tab.', async () => {
  render(
    <TabbedSection
      header="This is the tabbed section component"
      menuRepeater={[
        {
          fieldGroupName: 'menu_repeater',
          menuName: 'tab1',
          menuColumn: [
            {
              fieldGroupName: 'menu_column',
              menuHeader: 'Item 1',
              menuItems:
                '<ul>\n<li>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</li>\n<li>Curabitur accumsan ligula ac urna tempus, quis hendrerit nunc tempus.</li>\n<li>Cras malesuada erat blandit ultrices laoreet.</li>\n<li>Sed eu neque faucibus diam scelerisque euismod nec id risus.</li>\n<li>Ut blandit velit ac laoreet varius.</li>\n</ul>\n',
            },
            {
              fieldGroupName: 'menu_column',
              menuHeader: 'Item 2',
              menuItems:
                '<ul>\n<li>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</li>\n<li>Curabitur accumsan ligula ac urna tempus, quis hendrerit nunc tempus.</li>\n<li>Cras malesuada erat blandit ultrices laoreet.</li>\n<li>Sed eu neque faucibus diam scelerisque euismod nec id risus.</li>\n<li>Ut blandit velit ac laoreet varius.</li>\n</ul>\n',
            },
            {
              fieldGroupName: 'menu_column',
              menuHeader: 'Item 3',
              menuItems:
                '<ul>\n<li>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</li>\n<li>Curabitur accumsan ligula ac urna tempus, quis hendrerit nunc tempus.</li>\n<li>Cras malesuada erat blandit ultrices laoreet.</li>\n<li>Sed eu neque faucibus diam scelerisque euismod nec id risus.</li>\n<li>Ut blandit velit ac laoreet varius.</li>\n</ul>\n',
            },
          ],
        },
        {
          fieldGroupName: 'menu_repeater',
          menuName: 'tab2',
          menuColumn: [
            {
              fieldGroupName: 'menu_column',
              menuHeader: 'Item 1',
              menuItems:
                '<ul>\n<li>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</li>\n<li>Curabitur accumsan ligula ac urna tempus, quis hendrerit nunc tempus.</li>\n<li>Cras malesuada erat blandit ultrices laoreet.</li>\n<li>Sed eu neque faucibus diam scelerisque euismod nec id risus.</li>\n<li>Ut blandit velit ac laoreet varius.</li>\n</ul>\n',
            },
            {
              fieldGroupName: 'menu_column',
              menuHeader: 'Item 2',
              menuItems:
                '<ul>\n<li>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</li>\n<li>Curabitur accumsan ligula ac urna tempus, quis hendrerit nunc tempus.</li>\n<li>Cras malesuada erat blandit ultrices laoreet.</li>\n<li>Sed eu neque faucibus diam scelerisque euismod nec id risus.</li>\n<li>Ut blandit velit ac laoreet varius.</li>\n</ul>\n',
            },
          ],
        },
      ]}
    />
  );

  await screen.findByText('This is the tabbed section component');
  const tabButton1 = screen.getByRole('tab', {
    name: 'tab1',
  });
  const tabButton2 = screen.getByRole('tab', {
    name: 'tab2',
  });

  fireEvent.click(tabButton2);
  expect(tabButton1).toHaveAttribute('aria-expanded', 'false');
  expect(tabButton2).toHaveAttribute('aria-expanded', 'true');
  await screen.findByText('tab1');
  fireEvent.click(tabButton1);
  expect(tabButton1).toHaveAttribute('aria-expanded', 'true');
  expect(tabButton2).toHaveAttribute('aria-expanded', 'false');
  await screen.findByText('tab1');
});

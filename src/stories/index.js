import React from 'react';

import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { linkTo } from '@storybook/addon-links';

import { Button, Welcome } from '@storybook/react/demo';
import ProcessingButton from '../components/work/dynamic_components/buttons/ProcessingButton';
import ReactSelect from '../components/work/dynamic_components/select/ReactSelect';
import Pagination from '../components/work/dynamic_components/pagination/Pagination';

storiesOf('Welcome', module).add('to Storybook', () => <Welcome showApp={linkTo('Button')} />);

storiesOf('Button', module)
  .add('with text', () => <Button onClick={action('clicked')}>Hello Button</Button>)
  .add('with some emoji', () => (
    <Button onClick={action('clicked')}>
      <span role="img" aria-label="so cool">
        😀 😎 👍 💯
      </span>
    </Button>
  ));

async function watchMe() {
  const hello = await new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve("Hello World. It took me 5 seconds to show!");
    }, 5000)
  })
  console.log(hello);
}
storiesOf('Work/Type_Availables/Dynamic_Components', module)
  .add('ProcessingButtons', () => <ProcessingButton onClick={watchMe} type='submit' value="Click me!" />)
  .add('Pagination', () => <Pagination />)

storiesOf('Third Party Libraries', module)
  .add('React-Select', () => <ReactSelect
    theme={(theme) => ({
      ...theme,
      borderRadius: 0,
      colors: {
        ...theme.colors,
        text: 'orangered',
        primary25: 'hotpink',
        primary: 'black',
      },
    })}
  />)
import React from 'react';
import { storiesOf } from '@storybook/react';
import PasswordField from '../components/PasswordField';
import Thumbnail from '../components/Thumbnail';
import UserThumbnail from '../components/UserThumbnail';
import Link from '../components/Link';
import UserAvatar from '../components/UserAvatar';
import SignBackground from '../components/SignBackground';
import Navigator from '../components/Navigator';
import SearchField from '../components/SearchField';
import Step from '../components/Step';
import Ingredient from '../components/Ingredient';
import Notification from '../components/Notification';
import userImg from '../assets/images/user_icon.png';
import backgroundImg from '../assets/images/background.jpg';
import Task from '../components/Task';


const recipes = [];
const user = {
  id: 11111,
  rating: 4,
  href: '#',
  name: 'Lionel Nanchen',
  email: 'lionel-nanchen@hotmail.com',
  avatar: userImg,
};
for (let i = 0; i < 43; ++i) {
  const recipe = {
    href: '#',
    chief: user,
    image: backgroundImg,
    name: `Crêpes ${i}`,
    description:
      'De bonnes crêpes. dkjsfhgkjshfgjkhsgjkhsfjkhsfdjkghsdjkfghsdkjfhgjkdfhgdhfsjghsdkgfdskjghfkjhgjksdhgjkhsdfghdfskghdsfgdskfghdfshgdksjfhgksdfhgkjsdhfgdhsfgkhsdfkjghdfjksghsfdkhgkdfshgkjfdshgkjhdfgjhsdfjghdkjfshgjksdfhgjsdhfgkdsfhgkjhdfjghdsfjhgsdjkhgjdfhgjsfdhgjkdshfgjdhfsjkghdsfkjghjksdfhgkjsdhfgkjsfdhgjkfhdsajkdsfhdjkashkfjdhfkjadshfjkshfkjhfasdjkfhdsjkhfjkhsdj',
    preparationTime: 135,
    yield: 4,
    rating: 2.4,
    totalRating: 132,
    ingredientsCategories: [
      {
        category: 'Pate à crêpe',
        ingredients: [
          {
            quantity: '2',
            name: 'oeufs',
          },
          {
            quantity: '2dl',
            name: 'lait',
          },
          {
            quantity: '100g',
            name: 'farine',
          },
        ],
      },
      {
        category: 'Garnitures',
        ingredients: [
          {
            quantity: '100g',
            name: 'jambon',
          },
          {
            quantity: '20g',
            name: 'parmesan',
          },
        ],
      },
    ],
    steps: [
      {
        iteration: 1,
        explanation:
          'Mélanger le lait, la farine et et les oeux pendant quelque seconde. Le liquide doit devenir plus épais. Réserver environ 20 minutes dans le frigo.',
      },
      {
        iteration: 2,
        explanation: 'Chauffer la pâte',
      },
    ],
    tags: ['Europe', 'Rapide', 'Simple', 'French', 'Egg'],
  };
  recipes.push(recipe);
}
user.recipes = recipes;

const users = [];
for (let i = 0; i < 40; ++i) users.push(user);

users.push({
  href: '#',
  name: 'Lionel Nanchen',
  email: 'lionel-nanchen@hotmail.com',
  avatar: userImg,
  recipes: {},
});

const notifications = [
  {
    user: users[0],
    text: 'rated 4/5 your Crêpes',
    date: '3 hours ago',
    page: 'your Crêpes RecipePage',
  },
  {
    user: users[1],
    text: 'added a new Recipe: Banana split',
    date: '5 days ago',
    page: 'the Banana split RecipePage',
  },
  {
    user: users[2],
    text: 'follows you',
    date: '1 minutes ago',
    page: "this user's UserPage",
  },
];

user.notifications = notifications;
user.followed = [user[3], user[4], user[5]];
user.followers = [user[3], user[4], user[5]];

let subtasks = [
  {
    title: 'Subtask 1',
    date: '01.01.2020',
    checked: false
  },
  {
    title: 'Subtask 2',
    checked: false
  },
];

storiesOf('Fields', module)
  .add('PasswordField', () => <PasswordField placeholder="password" />)
  .add('SearchField', () => <SearchField className={{ color: 'red' }} />)
  .add('Task', () => <Task title="Task" description="Some description" date="01.01.2020" subtasks={subtasks}/>)
  .add('Link', () => <Link href="#">Link</Link>)
  .add('Navigator', () => <Navigator navigator={navigator} />)
  .add('Step', () => <Step step={recipes[0].steps[0]} />)
  .add('Notification', () => (
    <Notification
      notification={notifications[0]}
      primary="Lionel rated 4.3 your Crêpes"
      secondary="5 days ago"
    />
  ))
  .add('Ingredient', () => (
    <Ingredient
      ingredient={{
        category: 'Pate à crêpe',
        ingredients: [
          {
            quantity: '2',
            name: 'oeufs',
          },
          {
            quantity: '2dl',
            name: 'lait',
          },
          {
            quantity: '100g',
            name: 'farine',
          },
        ],
      }}
    />
  ));

storiesOf('Images', module)
  .add('UserAvatar', () => <UserAvatar avatar={backgroundImg} />)
  .add('SignBackground', () => <SignBackground src={backgroundImg} />);

storiesOf('Thumbnail', module)
  .add('Thumbnail', () => <Thumbnail recipe={recipes[0]} />)
  .add('UserThumbnail', () => <UserThumbnail user={user} />);

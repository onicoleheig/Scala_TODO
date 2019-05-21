export default class Util {
  static tags() {
    return [
      { name: 'african food' },
      { name: 'american food' },
      { name: 'asian food' },
      { name: 'australian food' },
      { name: 'breakfast' },
      { name: 'chocolate' },
      { name: 'contains meat' },
      { name: 'contains pork' },
      { name: 'dessert' },
      { name: 'european food' },
      { name: 'gluten free' },
      { name: 'halal' },
      { name: 'lactose free' },
      { name: 'main dish' },
      { name: 'meal' },
      { name: 'oceania food' },
      { name: 'peanuts' },
      { name: 'salty' },
      { name: 'starter' },
      { name: 'sweet' },
      { name: 'vegetarian' },
    ];
  }

  static plural(number) {
    if (number > 1) return 's';
    return '';
  }

  static checkIsValidEmail(email) {
    return !!(email && email.includes('@'));
  }
}

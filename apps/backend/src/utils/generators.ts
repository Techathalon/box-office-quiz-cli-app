export const TEDDY_EMOJIS = [
  '🐻',
  '🧸',
  '🐼',
  '🐨',
  '🐯',
  '🦁',
  '🦊',
  '🐱',
  '🐶',
];

const FILMY_COMEDY_NAMES = [
  'Baburao_Apte',
  'Crime_Master_Gogo',
  'Circuit',
  'Vasooli_Bhai',
  'Chhote_Pandit',
  'Choocha',
  'Majnu_Bhai',
  'Bandya',
  'Uday_Shetty',
  'Chatur_Silencer',
];

export function generateTeddyEmoji() {
  return TEDDY_EMOJIS[Math.floor(Math.random() * TEDDY_EMOJIS.length)];
}

export function generateFilmyComedyName() {
  return FILMY_COMEDY_NAMES[
    Math.floor(Math.random() * FILMY_COMEDY_NAMES.length)
  ];
}

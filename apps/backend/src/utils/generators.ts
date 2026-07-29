export const avatarNames = [
  // Playful Male & Guys
  'Felix Fizz',
  'Leo Lollipop',
  'Milo Marshmallow',
  'Ollie Outlaw',
  'Archie Spark',
  'Ziggy Zap',
  'Nico Noodle',
  'Toby Twister',
  'Barney Baffle',
  'Jasper Jitter',

  // Cute & Spunky Female
  'Pixie Pippa',
  'Daisy Doodle',
  'Chloe Cupcake',
  'Gigi Giggles',
  'Lulu Whiz',
  'Ruby Rascal',
  'Trixie Toffee',
  'Penny Pop',
  'Zoe Zoom',
  'Mimi Moffett',

  // Fun Character & Whimsical Roles
  'Captain Bubble',
  'Professor Puff',
  'Baron Von Waffles',
  'Sir Snickerdoodle',
  'Doctor Jellybean',
  'Major Muffin',
  'Agent Gummy',
  'Sheriff Sprinkles',
  'Count Crisp',
  'Duke Donuts',
];

const FILMY_COMEDY_NAMES = [
  // Legendary Classics & 90s Comedy
  'Kachra_Seth',
  'Pappu_Pager',
  'Teja_Mark',
  'Robert_Goli',
  'Bhiku_Mhatre',
  'Raju_Guide',
  'Dr_Ghunghroo',
  'Bullaa_Chulla',
  'Thakur_Kala',
  'Sambha_Gabbar',

  // Modern Cult Favorites & Memes
  'Gaitonde_Don',
  'Bunty_Sabun',
  'Shyam_Ghanshyam',
  'Totla_Seth',
  'Kisna_Gopi',
  'Phatak_Single',
  'Master_Jodi',
  'Babu_Bislerii',
  'Lal_Singh',
  'Chacha_Chaudhary',

  // Iconic Sidekicks & Quirky Villains
  'Jaggu_Dada',
  'Pappu_Can',
  'Samba_Goli',
  'Chhota_Chattri',
  'Raja_Babu',
  'Pandit_Gangadhar',
  'Sunder_Lal',
  'Dhan_Te_Nan',
  'Mamu_Jaan',
  'Laddoo_Gopal',
];

export function generateTeddyEmoji() {
  return avatarNames[Math.floor(Math.random() * avatarNames.length)];
}

export function generateFilmyComedyName() {
  return FILMY_COMEDY_NAMES[
    Math.floor(Math.random() * FILMY_COMEDY_NAMES.length)
  ];
}

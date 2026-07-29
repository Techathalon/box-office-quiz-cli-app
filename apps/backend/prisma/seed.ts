import { GameMode } from '../generated/prisma/enums.js';
import prisma from '../src/config/prisma.js';

async function main() {
  console.log('🌱 Starting complete database seeding...');

  // 1. Clean existing records in correct order (child tables first to satisfy foreign keys)
  await prisma.userGameProgress.deleteMany({});
  await prisma.question.deleteMany({});
  await prisma.user.deleteMany({});

  console.log('🧹 Cleaned existing database records.');

  // ==========================================
  // --- 2. SEED QUESTIONS ---
  // ==========================================
  const initialQuestions = [
    // ==========================================
    // BLURRED_POSTER
    // ==========================================
    {
      mode: GameMode.BLURRED_POSTER,
      levelNumber: 1,
      content: {
        imageUrl: null,
        options: [
          'Dilwale Dulhania Le Jayenge',
          'Kuch Kuch Hota Hai',
          'Kabhi Khushi Kabhie Gham',
          'Mohabbatein',
        ],
        correctAnswer: 'Dilwale Dulhania Le Jayenge',
        hint1: 'Stars Shah Rukh Khan and Kajol on a Europe trip.',
        hint2:
          'Famous for Raj and Simran in mustard fields with "Tujhe Dekha To".',
      },
    },
    {
      mode: GameMode.BLURRED_POSTER,
      levelNumber: 2,
      content: {
        imageUrl: null,
        options: ['Don', 'Zanjeer', 'Sholay', 'Deewaar'],
        correctAnswer: 'Sholay',
        hint1: '1975 classic featuring Jai and Veeru.',
        hint2: 'Features the famous villain Gabbar Singh in Ramgarh.',
      },
    },
    {
      mode: GameMode.BLURRED_POSTER,
      levelNumber: 3,
      content: {
        imageUrl: null,
        options: ['PK', '3 Idiots', 'Dangal', 'Taare Zameen Par'],
        correctAnswer: '3 Idiots',
        hint1: 'Directed by Rajkumar Hirani, centered on engineering students.',
        hint2: 'Rancho, Farhan, and Raju at ICE college with "All Is Well".',
      },
    },
    {
      mode: GameMode.BLURRED_POSTER,
      levelNumber: 4,
      content: {
        imageUrl: null,
        options: ['Baahubali: The Beginning', 'RRR', 'KGF', 'Pushpa'],
        correctAnswer: 'Baahubali: The Beginning',
        hint1: 'Directed by S.S. Rajamouli and set in Mahishmati.',
        hint2:
          'Ends with the ultimate cliffhanger: "Why did Kattappa kill...?"',
      },
    },
    {
      mode: GameMode.BLURRED_POSTER,
      levelNumber: 5,
      content: {
        imageUrl: null,
        options: ['Pathaan', 'Jawan', 'Dunki', 'Raees'],
        correctAnswer: 'Jawan',
        hint1: 'Shah Rukh Khan in a dual role as father and son.',
        hint2: 'Features Vikram Rathore and Azad with a bandaged face look.',
      },
    },
    {
      mode: GameMode.BLURRED_POSTER,
      levelNumber: 6,
      content: {
        imageUrl: null,
        options: ['Lagaan', 'Swades', 'Mangal Pandey', 'Ganga Jal'],
        correctAnswer: 'Lagaan',
        hint1: 'Aamir Khan plays Bhuvan fighting British land tax.',
        hint2: 'Nominated for Best Foreign Language Film at the Oscars.',
      },
    },
    {
      mode: GameMode.BLURRED_POSTER,
      levelNumber: 7,
      content: {
        imageUrl: null,
        options: ['Sultan', 'Dangal', 'Bhaag Milkha Bhaag', 'Mary Kom'],
        correctAnswer: 'Dangal',
        hint1: 'Biopic based on Mahavir Singh Phogat and his daughters.',
        hint2: 'Famous catchphrase: "Mhari choriyan chhoron se kam hain ke?".',
      },
    },
    {
      mode: GameMode.BLURRED_POSTER,
      levelNumber: 8,
      content: {
        imageUrl: null,
        options: ['War', 'KGF: Chapter 1', 'Pushpa: The Rise', 'Vikram'],
        correctAnswer: 'KGF: Chapter 1',
        hint1: 'Yash stars as Rocky Bhai conquering gold fields.',
        hint2: 'Prashanth Neel directorial set in Narachi gold mines.',
      },
    },
    {
      mode: GameMode.BLURRED_POSTER,
      levelNumber: 9,
      content: {
        imageUrl: null,
        options: ['Magadheera', 'Eega', 'RRR', 'Pushpa'],
        correctAnswer: 'RRR',
        hint1: 'Period action drama featuring Jr NTR and Ram Charan.',
        hint2: 'Won an Academy Award for the viral song "Naatu Naatu".',
      },
    },
    {
      mode: GameMode.BLURRED_POSTER,
      levelNumber: 10,
      content: {
        imageUrl: null,
        options: ['Kantara', 'Tumbbad', 'Stree', 'Lucifer'],
        correctAnswer: 'Kantara',
        hint1:
          'Rishab Shetty directed and acted in this divine coastal folklore story.',
        hint2:
          'Centers around the sacred Panjurli Daiva and Bhoota Kola tradition.',
      },
    },
    {
      mode: GameMode.BLURRED_POSTER,
      levelNumber: 11,
      content: {
        imageUrl: null,
        options: ['War', 'Bang Bang!', 'Pathaan', 'Tiger Zinda Hai'],
        correctAnswer: 'Pathaan',
        hint1: 'SRK plays an exiled RAW agent alongside Deepika Padukone.',
        hint2:
          'Features John Abraham as villain Jim and the song "Besharam Rang".',
      },
    },
    {
      mode: GameMode.BLURRED_POSTER,
      levelNumber: 12,
      content: {
        imageUrl: null,
        options: [
          'Dil Chahta Hai',
          'Zindagi Na Milegi Dobara',
          'Tamasha',
          'Rock On!!',
        ],
        correctAnswer: 'Zindagi Na Milegi Dobara',
        hint1:
          'Road trip movie across Spain starring Hrithik, Farhan, and Abhay.',
        hint2:
          'Features deep-sea diving, skydiving, and the La Tomatina festival.',
      },
    },
    {
      mode: GameMode.BLURRED_POSTER,
      levelNumber: 13,
      content: {
        imageUrl: null,
        options: ['Singham', 'Simmba', 'Sooryavanshi', 'Dabangg'],
        correctAnswer: 'Singham',
        hint1: 'Ajay Devgn plays an honest police inspector named Bajirao.',
        hint2: 'Prakash Raj plays the main antagonist Jaikant Shikre.',
      },
    },
    {
      mode: GameMode.BLURRED_POSTER,
      levelNumber: 14,
      content: {
        imageUrl: null,
        options: ['Animal', 'Kabir Singh', 'Sanju', 'Rockstar'],
        correctAnswer: 'Kabir Singh',
        hint1:
          'Shahid Kapoor plays an intense medical student with anger issues.',
        hint2: 'Remake of the hit Telugu film "Arjun Reddy".',
      },
    },
    {
      mode: GameMode.BLURRED_POSTER,
      levelNumber: 15,
      content: {
        imageUrl: null,
        options: [
          'Chak De! India',
          'Lagaan',
          '83',
          'MS Dhoni: The Untold Story',
        ],
        correctAnswer: 'Chak De! India',
        hint1: 'Shah Rukh Khan plays Kabir Khan, a disgraced hockey coach.',
        hint2:
          'Iconic monologue: "Sattar Minute... 70 minute hai tumhare paas".',
      },
    },
    {
      mode: GameMode.BLURRED_POSTER,
      levelNumber: 16,
      content: {
        imageUrl: null,
        options: [
          'Om Shanti Om',
          'Main Hoon Na',
          'Chennai Express',
          'Happy New Year',
        ],
        correctAnswer: 'Om Shanti Om',
        hint1:
          'Reincarnation saga marking Deepika Padukone’s debut opposite SRK.',
        hint2: 'Features the massive multi-starrer song "Deewangi Deewangi".',
      },
    },
    {
      mode: GameMode.BLURRED_POSTER,
      levelNumber: 17,
      content: {
        imageUrl: null,
        options: ['Bajrangi Bhaijaan', 'Sultan', 'Ek Tha Tiger', 'Kick'],
        correctAnswer: 'Bajrangi Bhaijaan',
        hint1:
          'Salman Khan plays Pawan, helping a mute Pakistani girl return home.',
        hint2: 'Harshaali Malhotra plays the beloved character Munni.',
      },
    },
    {
      mode: GameMode.BLURRED_POSTER,
      levelNumber: 18,
      content: {
        imageUrl: null,
        options: ['Uri: The Surgical Strike', 'Shershaah', 'Fighter', 'Border'],
        correctAnswer: 'Uri: The Surgical Strike',
        hint1: 'Vicky Kaushal plays Major Vihaan Singh Shergill.',
        hint2: 'Popularized the famous dialogue: "How’s the Josh? High, Sir!".',
      },
    },
    {
      mode: GameMode.BLURRED_POSTER,
      levelNumber: 19,
      content: {
        imageUrl: null,
        options: ['Queen', 'English Vinglish', 'Tanu Weds Manu', 'Piku'],
        correctAnswer: 'Queen',
        hint1:
          'Kangana Ranaut goes on her honeymoon alone to Paris and Amsterdam.',
        hint2: 'Her character Rani meets Vijaylakshmi and learns self-love.',
      },
    },
    {
      mode: GameMode.BLURRED_POSTER,
      levelNumber: 20,
      content: {
        imageUrl: null,
        options: ['Bhool Bhulaiyaa', 'Stree', 'Roohi', 'Bhediya'],
        correctAnswer: 'Bhool Bhulaiyaa',
        hint1: 'Psychological thriller starring Akshay Kumar and Vidya Balan.',
        hint2: 'Famous for Dr. Aditya Shrivastav and the spirit of Monjulika.',
      },
    },
    {
      mode: GameMode.BLURRED_POSTER,
      levelNumber: 21,
      content: {
        imageUrl: null,
        options: ['Gangs of Wasseypur', 'Sacred Games', 'Mirzapur', 'Satya'],
        correctAnswer: 'Gangs of Wasseypur',
        hint1: 'Anurag Kashyap’s two-part crime saga starring Manoj Bajpayee.',
        hint2:
          'Famous character Sardar Khan and the line "Baap ka, dada ka...".',
      },
    },
    {
      mode: GameMode.BLURRED_POSTER,
      levelNumber: 22,
      content: {
        imageUrl: null,
        options: [
          'Devdas',
          'Bajirao Mastani',
          'Padmaavat',
          'Hum Dil De Chuke Sanam',
        ],
        correctAnswer: 'Devdas',
        hint1:
          'Sanjay Leela Bhansali grand drama starring SRK, Aishwarya, and Madhuri.',
        hint2: 'Features iconic dance duets like "Dola Re Dola".',
      },
    },
    {
      mode: GameMode.BLURRED_POSTER,
      levelNumber: 23,
      content: {
        imageUrl: null,
        options: ['Drishyam', 'Andhadhun', 'Special 26', 'Kahaani'],
        correctAnswer: 'Drishyam',
        hint1: 'Ajay Devgn plays Vijay Salgaonkar protecting his family.',
        hint2: 'Famous meme reference: "2 October ko Panaji gaye the".',
      },
    },
    {
      mode: GameMode.BLURRED_POSTER,
      levelNumber: 24,
      content: {
        imageUrl: null,
        options: ['Gadar: Ek Prem Katha', 'Border', 'Lagaan', 'Refugee'],
        correctAnswer: 'Gadar: Ek Prem Katha',
        hint1:
          'Sunny Deol stars as Tara Singh opposite Ameesha Patel as Sakina.',
        hint2: 'Famous for the iconic handpump extraction scene in Pakistan.',
      },
    },
    {
      mode: GameMode.BLURRED_POSTER,
      levelNumber: 25,
      content: {
        imageUrl: null,
        options: ['Stree', 'Roohi', 'Munjya', 'Bhediya'],
        correctAnswer: 'Stree',
        hint1:
          'Rajkummar Rao and Shraddha Kapoor horror-comedy set in Chanderi.',
        hint2: 'Famous slogan written on village walls: "O Stree Kal Aana".',
      },
    },
    {
      mode: GameMode.BLURRED_POSTER,
      levelNumber: 26,
      content: {
        imageUrl: null,
        options: ['Andhadhun', 'Badla', 'Article 15', 'Talvar'],
        correctAnswer: 'Andhadhun',
        hint1: 'Ayushmann Khurrana plays a pianist pretending to be blind.',
        hint2:
          'Tabu stars as Simi in this Sriram Raghavan dark comedy thriller.',
      },
    },
    {
      mode: GameMode.BLURRED_POSTER,
      levelNumber: 27,
      content: {
        imageUrl: null,
        options: ['Swades', 'Lagaan', 'My Name Is Khan', 'Pardes'],
        correctAnswer: 'Swades',
        hint1:
          'Shah Rukh Khan plays Mohan Bhargava, a NASA scientist returning to Charanpur.',
        hint2:
          'Directed by Ashutosh Gowariker, focusing on village electricity generation.',
      },
    },
    {
      mode: GameMode.BLURRED_POSTER,
      levelNumber: 28,
      content: {
        imageUrl: null,
        options: ['Vikram', 'Master', 'Leo', 'Jailer'],
        correctAnswer: 'Vikram',
        hint1: 'Lokesh Kanagaraj action universe movie starring Kamal Haasan.',
        hint2: 'Features Vijay Sethupathi as Santhanam and Surya as Rolex.',
      },
    },
    {
      mode: GameMode.BLURRED_POSTER,
      levelNumber: 29,
      content: {
        imageUrl: null,
        options: ['Super 30', 'Krrish', 'Koi... Mil Gaya', 'Guzaarish'],
        correctAnswer: 'Super 30',
        hint1: 'Hrithik Roshan plays mathematician Anand Kumar from Patna.',
        hint2:
          'Focuses on training 30 underprivileged kids for the IIT-JEE exam.',
      },
    },
    {
      mode: GameMode.BLURRED_POSTER,
      levelNumber: 30,
      content: {
        imageUrl: null,
        options: [
          'Barfi!',
          'Jagga Jasoos',
          'Rockstar',
          'Yeh Jawaani Hai Deewani',
        ],
        correctAnswer: 'Barfi!',
        hint1:
          "Ranbir Kapoor, Priyanka Chopra, and Ileana D'Cruz in Anurag Basu’s drama.",
        hint2: 'Ranbir plays a deaf-mute man named Murphy in Darjeeling.',
      },
    },

    // ==========================================
    // EMOJI_RIDDLES
    // ==========================================
    {
      mode: GameMode.EMOJI_RIDDLES,
      levelNumber: 1,
      content: {
        emojis: '🦁👑',
        options: ['Singham', 'Sher Khan', 'The Lion King', 'Jungle Book'],
        correctAnswer: 'The Lion King',
        hint1: 'Classic animated movie about wildlife royalty.',
        hint2: 'The emojis literally stand for "Lion" and "King".',
      },
    },
    {
      mode: GameMode.EMOJI_RIDDLES,
      levelNumber: 2,
      content: {
        emojis: '🎸🧑‍🎤🥁',
        options: ['Rockstar', 'Rock On!!', 'Aashiqui 2', 'Gully Boy'],
        correctAnswer: 'Rock On!!',
        hint1: 'Features Farhan Akhtar, Arjun Rampal, and Luke Kenny.',
        hint2: 'Focuses on a rock band named "Magik".',
      },
    },
    {
      mode: GameMode.EMOJI_RIDDLES,
      levelNumber: 3,
      content: {
        emojis: '👓🎒✈️',
        options: [
          'Zindagi Na Milegi Dobara',
          'Yeh Jawaani Hai Deewani',
          'Tamasha',
          'Dil Dhadakne Do',
        ],
        correctAnswer: 'Yeh Jawaani Hai Deewani',
        hint1: 'Stars Ranbir Kapoor and Deepika Padukone.',
        hint2: 'Glasses = Naina, Backpack/Plane = Bunny’s passion for travel.',
      },
    },
    {
      mode: GameMode.EMOJI_RIDDLES,
      levelNumber: 4,
      content: {
        emojis: '🥛🏃‍♂️🏅',
        options: ['Bhaag Milkha Bhaag', 'Dangal', 'Mary Kom', 'Chak De! India'],
        correctAnswer: 'Bhaag Milkha Bhaag',
        hint1: 'Biopic of an iconic Indian track and field sprinter.',
        hint2: 'Milk glass + Running man + Gold medal = The Flying Sikh.',
      },
    },
    {
      mode: GameMode.EMOJI_RIDDLES,
      levelNumber: 5,
      content: {
        emojis: '👻🏰👑',
        options: ['Stree', 'Bhool Bhulaiyaa', 'Roohi', 'Bhootnath'],
        correctAnswer: 'Bhool Bhulaiyaa',
        hint1: 'Psychological horror-comedy set in an ancestral palace.',
        hint2: 'Ghost + Palace + Crown = Monjulika in the royal haveli.',
      },
    },
    {
      mode: GameMode.EMOJI_RIDDLES,
      levelNumber: 6,
      content: {
        emojis: '🌾🏏🇬🇧',
        options: ['Lagaan', 'Swades', '83', 'Patiala House'],
        correctAnswer: 'Lagaan',
        hint1:
          'Villagers play cricket against British officers to waive land tax.',
        hint2: 'Crops + Cricket + British Flag = Bhuvan’s epic match.',
      },
    },
    {
      mode: GameMode.EMOJI_RIDDLES,
      levelNumber: 7,
      content: {
        emojis: '🤼‍♀️🏅👨‍👧‍👧',
        options: ['Sultan', 'Dangal', 'Brothers', 'Mary Kom'],
        correctAnswer: 'Dangal',
        hint1: 'A father trains his daughters to become world-class wrestlers.',
        hint2:
          'Wrestlers + Gold Medal + Father with Daughters = Mahavir Phogat.',
      },
    },
    {
      mode: GameMode.EMOJI_RIDDLES,
      levelNumber: 8,
      content: {
        emojis: '⛏️🪙💣',
        options: ['KGF: Chapter 1', 'Pushpa', 'Gangs of Wasseypur', 'Kantara'],
        correctAnswer: 'KGF: Chapter 1',
        hint1: 'Rocky Bhai rises from poverty to conquer the gold fields.',
        hint2: 'Pickaxe + Gold Coin + Bomb = Narachi Gold Mines.',
      },
    },
    {
      mode: GameMode.EMOJI_RIDDLES,
      levelNumber: 9,
      content: {
        emojis: '🌊🏹🔥🐅',
        options: ['Baahubali', 'RRR', 'Magadheera', 'Pushpa'],
        correctAnswer: 'RRR',
        hint1: 'Features the dual forces of Water (Bheem) and Fire (Raju).',
        hint2: 'Stars Jr NTR fighting a tiger and Ram Charan with a bow.',
      },
    },
    {
      mode: GameMode.EMOJI_RIDDLES,
      levelNumber: 10,
      content: {
        emojis: '🪓🪵🔴',
        options: ['Pushpa: The Rise', 'KGF', 'Kantara', 'Vikram'],
        correctAnswer: 'Pushpa: The Rise',
        hint1: 'Allu Arjun stars as a laborer smuggling rare timber.',
        hint2: 'Axe + Wood + Red circle = Red Sanders smuggling.',
      },
    },
    {
      mode: GameMode.EMOJI_RIDDLES,
      levelNumber: 11,
      content: {
        emojis: '🚀🛰️🇮🇳',
        options: ['Swades', 'Mission Mangal', 'Tik Tik Tik', 'Rocketry'],
        correctAnswer: 'Mission Mangal',
        hint1: 'Female scientists achieve Mars Orbiter Mission on a budget.',
        hint2: 'Rocket + Satellite + Indian Flag = ISRO’s Mangalyaan.',
      },
    },
    {
      mode: GameMode.EMOJI_RIDDLES,
      levelNumber: 12,
      content: {
        emojis: '🦯🎹🕶️👁️',
        options: ['Andhadhun', 'Kaabil', 'Drishyam', 'Badla'],
        correctAnswer: 'Andhadhun',
        hint1: 'Ayushmann Khurrana plays a pianist pretending to be blind.',
        hint2: 'Cane + Piano + Dark Glasses + Eye = Akash’s deception.',
      },
    },
    {
      mode: GameMode.EMOJI_RIDDLES,
      levelNumber: 13,
      content: {
        emojis: '🏑👭🏆🇮🇳',
        options: ['Chak De! India', '83', 'Gold', 'Sultan'],
        correctAnswer: 'Chak De! India',
        hint1:
          'Kabir Khan coaches the Indian women’s national field hockey team.',
        hint2: 'Hockey + Teammates + Trophy + India = "Sattar Minute".',
      },
    },
    {
      mode: GameMode.EMOJI_RIDDLES,
      levelNumber: 14,
      content: {
        emojis: '🚗🚘🏎️💥',
        options: ['Race', 'Dhoom', 'Ta Ra Rum Pum', 'Drive'],
        correctAnswer: 'Dhoom',
        hint1: 'High-speed robberies using fast bikes and sports cars.',
        hint2: 'Iconic cop-and-robber franchise filled with speed and stunts.',
      },
    },
    {
      mode: GameMode.EMOJI_RIDDLES,
      levelNumber: 15,
      content: {
        emojis: '🚂🤝🏻🚉',
        options: [
          'Dilwale Dulhania Le Jayenge',
          'Chennai Express',
          'Jab We Met',
          'Sholay',
        ],
        correctAnswer: 'Dilwale Dulhania Le Jayenge',
        hint1: 'Famous train catching scene where Raj holds Simran’s hand.',
        hint2: 'Train + Handshake + Station = "Jee le apni zindagi".',
      },
    },
    {
      mode: GameMode.EMOJI_RIDDLES,
      levelNumber: 16,
      content: {
        emojis: '🦽👩‍🦼🎭♟️',
        options: ['Wazir', 'Black', 'Guzaarish', 'Taare Zameen Par'],
        correctAnswer: 'Wazir',
        hint1: 'Amitabh Bachchan plays a paralyzed chess grandmaster.',
        hint2: 'Wheelchair + Drama + Pawn = A high-stakes game of revenge.',
      },
    },
    {
      mode: GameMode.EMOJI_RIDDLES,
      levelNumber: 17,
      content: {
        emojis: '🚂🍬🥥🌶️',
        options: ['Chennai Express', 'Barfi!', 'Jab We Met', 'Ra.One'],
        correctAnswer: 'Chennai Express',
        hint1: 'Rahul boards a South-bound train and meets Meenamma.',
        hint2: 'Train + South Indian spices & sweets = "Ready Steady Po!".',
      },
    },
    {
      mode: GameMode.EMOJI_RIDDLES,
      levelNumber: 18,
      content: {
        emojis: '🥼🩺😡💔',
        options: ['Kabir Singh', 'Munna Bhai M.B.B.S.', 'Anand', 'Sanju'],
        correctAnswer: 'Kabir Singh',
        hint1: 'A brilliant house surgeon spirals into heartbreak and anger.',
        hint2:
          'Lab Coat + Stethoscope + Angry Face + Broken Heart = Medical anger.',
      },
    },
    {
      mode: GameMode.EMOJI_RIDDLES,
      levelNumber: 19,
      content: {
        emojis: '👶💼🧪3️⃣',
        options: ['3 Idiots', 'Taare Zameen Par', 'Chhichhore', 'PK'],
        correctAnswer: '3 Idiots',
        hint1:
          'Three engineering students challenge the rigid education system.',
        hint2: 'Baby birth scene + Briefcase + Science experiments + Number 3.',
      },
    },
    {
      mode: GameMode.EMOJI_RIDDLES,
      levelNumber: 20,
      content: {
        emojis: '🛸👽📻',
        options: ['PK', 'Koi... Mil Gaya', 'Ra.One', 'Krrish'],
        correctAnswer: 'PK',
        hint1:
          'An alien gets stranded on Earth after losing his remote control.',
        hint2:
          'UFO + Alien + Radio = Aamir Khan carrying a yellow helmet and radio.',
      },
    },
    {
      mode: GameMode.EMOJI_RIDDLES,
      levelNumber: 21,
      content: {
        emojis: '🩸🪓👨‍👦‍👦',
        options: ['Animal', 'Kabir Singh', 'Gangs of Wasseypur', 'KGF'],
        correctAnswer: 'Animal',
        hint1:
          'Ranbir Kapoor stars as Ranvijay in a hyper-violent father-son drama.',
        hint2: 'Blood + Axe + Father and Sons = Obsessive family loyalty.',
      },
    },
    {
      mode: GameMode.EMOJI_RIDDLES,
      levelNumber: 22,
      content: {
        emojis: '🚰🪛🇵🇰🇮🇳',
        options: ['Gadar: Ek Prem Katha', 'Border', 'Bajrangi Bhaijaan', 'Uri'],
        correctAnswer: 'Gadar: Ek Prem Katha',
        hint1: 'Tara Singh fights for Sakina across the border.',
        hint2: 'Water Tap (Handpump) + Screwdriver + Pakistan + India.',
      },
    },
    {
      mode: GameMode.EMOJI_RIDDLES,
      levelNumber: 23,
      content: {
        emojis: '🥻👩‍🦰👠🧵',
        options: ['Sui Dhaaga', 'Queen', 'Fashion', 'English Vinglish'],
        correctAnswer: 'Sui Dhaaga',
        hint1: 'Varun Dhawan and Anushka Sharma start a tailoring business.',
        hint2: 'Saree + Tailor Needle + Thread = "Sab Badhiya Hai".',
      },
    },
    {
      mode: GameMode.EMOJI_RIDDLES,
      levelNumber: 24,
      content: {
        emojis: '🩸🦷🐺🌕',
        options: ['Bhediya', 'Stree', 'Roohi', 'Creature 3D'],
        correctAnswer: 'Bhediya',
        hint1:
          'Varun Dhawan transforms into a mythical creature in Arunachal Pradesh.',
        hint2:
          'Blood + Fangs + Wolf + Full Moon = Supernatural werewolf comedy.',
      },
    },
    {
      mode: GameMode.EMOJI_RIDDLES,
      levelNumber: 25,
      content: {
        emojis: '📻🎙️🧓🫂',
        options: ['Lage Raho Munna Bhai', 'Munna Bhai M.B.B.S.', 'Sanju', 'PK'],
        correctAnswer: 'Lage Raho Munna Bhai',
        hint1:
          'Sanjay Dutt sees visions of Mahatma Gandhi while hosting a radio show.',
        hint2:
          'Radio + Microphone + Old Man (Gandhiji) + Hug = "Jadoo Ki Jhappi".',
      },
    },
    {
      mode: GameMode.EMOJI_RIDDLES,
      levelNumber: 26,
      content: {
        emojis: '📜🎦🕊️👨‍🦯',
        options: ['Fanaa', 'Black', 'Barfi!', 'Taare Zameen Par'],
        correctAnswer: 'Fanaa',
        hint1:
          'Aamir Khan plays a tour guide/terrorist and Kajol plays a blind woman.',
        hint2: 'Poetry + Cinema + Dove + Blind Man = Love against all odds.',
      },
    },
    {
      mode: GameMode.EMOJI_RIDDLES,
      levelNumber: 27,
      content: {
        emojis: '📻👧🇵🇰🤝',
        options: ['Bajrangi Bhaijaan', 'Tubelight', 'Pathaan', 'Tiger 3'],
        correctAnswer: 'Bajrangi Bhaijaan',
        hint1: 'Pawan promises to safely return a mute Pakistani child home.',
        hint2:
          'Radio + Young Girl + Pakistan Flag + Handshake = Munni’s journey.',
      },
    },
    {
      mode: GameMode.EMOJI_RIDDLES,
      levelNumber: 28,
      content: {
        emojis: '🍫🤐🎈⛰️',
        options: ['Barfi!', 'Jagga Jasoos', 'Ludo', 'Tamasha'],
        correctAnswer: 'Barfi!',
        hint1: 'A deaf-mute man named Murphy forms a sweet bond in Darjeeling.',
        hint2:
          'Chocolate + Mute + Balloon + Mountains = Ranbir & Priyanka’s tale.',
      },
    },
    {
      mode: GameMode.EMOJI_RIDDLES,
      levelNumber: 29,
      content: {
        emojis: '👨‍🏫🎨👦🌟',
        options: ['Taare Zameen Par', 'Super 30', 'Hichki', 'Chalk n Duster'],
        correctAnswer: 'Taare Zameen Par',
        hint1:
          'An art teacher helps a dyslexic child discover his true creative talent.',
        hint2:
          'Teacher + Painting Palette + Boy + Shining Star = Ishaan Awasthi.',
      },
    },
    {
      mode: GameMode.EMOJI_RIDDLES,
      levelNumber: 30,
      content: {
        emojis: '🐅🔫🕶️🕵️',
        options: ['Ek Tha Tiger', 'War', 'Pathaan', 'Agent Vinod'],
        correctAnswer: 'Ek Tha Tiger',
        hint1: 'Salman Khan plays RAW agent Avinash Singh Rathore.',
        hint2:
          'Tiger + Gun + Sunglasses + Secret Agent = The original Spy Universe hit.',
      },
    },

    // ==========================================
    // LETTER_PUZZLE
    // ==========================================
    {
      mode: GameMode.LETTER_PUZZLE,
      levelNumber: 1,
      content: {
        scrambledLetters: ['A', 'Y', 'L', 'O', 'S', 'H'],
        clue: "Amitabh Bachchan and Dharmendra's legendary cinematic epic.",
        correctAnswer: 'SHOLAY',
        hint1: 'Includes character names like Thakur, Sambha, and Kaalia.',
        hint2: 'Starts with S and ends with Y (6 letters).',
      },
    },
    {
      mode: GameMode.LETTER_PUZZLE,
      levelNumber: 2,
      content: {
        scrambledLetters: ['N', 'A', 'A', 'G', 'L', 'A'],
        clue: 'Aamir Khan British-era cricket match masterpiece nominated for an Oscar.',
        correctAnswer: 'LAGAAN',
        hint1: 'Features Bhuvan leading villagers against Captain Russell.',
        hint2:
          'The word translates to land revenue tax (6 letters, starts with L).',
      },
    },
    {
      mode: GameMode.LETTER_PUZZLE,
      levelNumber: 3,
      content: {
        scrambledLetters: ['K', 'N', 'I', 'P'],
        clue: 'Amitabh Bachchan and Taapsee Pannu court-room thriller drama.',
        correctAnswer: 'PINK',
        hint1: 'Famous for the court dialogue: "No means No".',
        hint2: 'It is a 4-letter color name.',
      },
    },
    {
      mode: GameMode.LETTER_PUZZLE,
      levelNumber: 4,
      content: {
        scrambledLetters: ['I', 'F', 'R', 'A', 'B'],
        clue: 'Ranbir Kapoor and Priyanka Chopra comedy-drama about unique love.',
        correctAnswer: 'BARFI',
        hint1: 'Ranbir plays Murphy, a deaf-mute man in Darjeeling.',
        hint2: 'Word is named after a sweet Indian dessert (5 letters).',
      },
    },
    {
      mode: GameMode.LETTER_PUZZLE,
      levelNumber: 5,
      content: {
        scrambledLetters: ['E', 'E', 'R', 'T', 'S'],
        clue: 'Classic horror-comedy set in Chanderi starring Rajkummar Rao.',
        correctAnswer: 'STREE',
        hint1: 'Contains the iconic line: "O _____ Kal Aana".',
        hint2: '5-letter Hindi word for "Woman".',
      },
    },
    {
      mode: GameMode.LETTER_PUZZLE,
      levelNumber: 6,
      content: {
        scrambledLetters: ['N', 'A', 'G', 'M', 'A', 'I', 'S'],
        clue: 'Ajay Devgn police action blockbuster featuring Bajirao.',
        correctAnswer: 'SINGHAM',
        hint1: 'Prakash Raj plays the antagonist Jaikant Shikre.',
        hint2: '7 letters, starts with S and ends with M.',
      },
    },
    {
      mode: GameMode.LETTER_PUZZLE,
      levelNumber: 7,
      content: {
        scrambledLetters: ['A', 'L', 'D', 'N', 'A', 'G'],
        clue: 'Aamir Khan wrestling biopic about the Phogat sisters.',
        correctAnswer: 'DANGAL',
        hint1: 'Famous line: "Mhari choriyan chhoron se kam hain ke?".',
        hint2: '6 letters, translates to a wrestling arena/competition.',
      },
    },
    {
      mode: GameMode.LETTER_PUZZLE,
      levelNumber: 8,
      content: {
        scrambledLetters: ['A', 'A', 'S', 'W', 'D', 'E'],
        clue: 'Shah Rukh Khan plays a NASA scientist returning to his Indian village.',
        correctAnswer: 'SWADES',
        hint1:
          'Directed by Ashutosh Gowariker, featuring the song "Yeh Jo Des Hai Tera".',
        hint2: '6 letters, starts with S and ends with S.',
      },
    },
    {
      mode: GameMode.LETTER_PUZZLE,
      levelNumber: 9,
      content: {
        scrambledLetters: ['A', 'P', 'T', 'A', 'A', 'H', 'N'],
        clue: 'Shah Rukh Khan spy action thriller featuring the song Besharam Rang.',
        correctAnswer: 'PATHAAN',
        hint1: 'John Abraham plays the main antagonist named Jim.',
        hint2: '7 letters, starts with P and ends with N.',
      },
    },
    {
      mode: GameMode.LETTER_PUZZLE,
      levelNumber: 10,
      content: {
        scrambledLetters: ['N', 'A', 'A', 'J', 'W'],
        clue: 'Shah Rukh Khan double-role blockbuster as Vikram and Azad.',
        correctAnswer: 'JAWAN',
        hint1: 'Directed by Atlee, featuring SRK in a bandaged look.',
        hint2: '5 letters, translates to "Soldier".',
      },
    },
    {
      mode: GameMode.LETTER_PUZZLE,
      levelNumber: 11,
      content: {
        scrambledLetters: ['R', 'A', 'A', 'N', 'A', 'T', 'K'],
        clue: 'Rishab Shetty directed coastal folklore story on Bhoota Kola.',
        correctAnswer: 'KANTARA',
        hint1: 'Centers around the divine spirit Panjurli Daiva.',
        hint2: '7 letters, starts with K and ends with A.',
      },
    },
    {
      mode: GameMode.LETTER_PUZZLE,
      levelNumber: 12,
      content: {
        scrambledLetters: ['A', 'S', 'H', 'P', 'U', 'P'],
        clue: 'Allu Arjun stars as a red sanders smuggler in Rayalaseema.',
        correctAnswer: 'PUSHPA',
        hint1: 'Famous catchphrase: "Jhukega nahi saala".',
        hint2: '6 letters, starts with P and ends with A.',
      },
    },
    {
      mode: GameMode.LETTER_PUZZLE,
      levelNumber: 13,
      content: {
        scrambledLetters: ['L', 'A', 'N', 'I', 'M', 'A'],
        clue: 'Ranbir Kapoor action drama about an intense, violent father-son bond.',
        correctAnswer: 'ANIMAL',
        hint1: 'Sandeep Reddy Vanga directorial featuring Bobby Deol as Abrar.',
        hint2: '6 letters, starts with A and ends with L.',
      },
    },
    {
      mode: GameMode.LETTER_PUZZLE,
      levelNumber: 14,
      content: {
        scrambledLetters: ['K', 'I', 'V', 'A', 'M', 'R'],
        clue: 'Lokesh Kanagaraj action thriller starring Kamal Haasan and Vijay Sethupathi.',
        correctAnswer: 'VIKRAM',
        hint1: 'Features Surya in a cameo as the villain Rolex.',
        hint2: '6 letters, starts with V and ends with M.',
      },
    },
    {
      mode: GameMode.LETTER_PUZZLE,
      levelNumber: 15,
      content: {
        scrambledLetters: ['M', 'U', 'Q', 'E', 'N', 'E'],
        clue: 'Kangana Ranaut comedy-drama about a girl who goes on her solo honeymoon.',
        correctAnswer: 'QUEEN',
        hint1: 'Her character Rani travels to Paris and Amsterdam.',
        hint2: '5 letters, starts with Q and ends with N.',
      },
    },
    {
      mode: GameMode.LETTER_PUZZLE,
      levelNumber: 16,
      content: {
        scrambledLetters: ['U', 'S', 'A', 'H', 'A', 'M', 'T'],
        clue: 'Ranbir Kapoor and Deepika Padukone romantic film set in Corsica.',
        correctAnswer: 'TAMASHA',
        hint1:
          'Features character identities Ved and Tara with the song "Matargashti".',
        hint2: '7 letters, starts with T and ends with A.',
      },
    },
    {
      mode: GameMode.LETTER_PUZZLE,
      levelNumber: 17,
      content: {
        scrambledLetters: ['A', 'D', 'M', 'A', 'A', 'P', 'V', 'A', 'T'],
        clue: 'Sanjay Leela Bhansali epic starring Deepika Padukone and Ranveer Singh.',
        correctAnswer: 'PADMAAVAT',
        hint1: 'Ranveer Singh plays the ruler Alauddin Khilji.',
        hint2: '9 letters, starts with P and ends with T.',
      },
    },
    {
      mode: GameMode.LETTER_PUZZLE,
      levelNumber: 18,
      content: {
        scrambledLetters: ['A', 'U', 'B', 'L', 'I', 'B', 'F'],
        clue: 'Mammootty period Malayalam horror film directed by Rahul Sadasivan.',
        correctAnswer: 'BRAMAYUGAM',
        hint1:
          'Shot entirely in black-and-white, set in an old ancestral mansion.',
        hint2: '10 letters, starts with B and ends with M.',
      },
    },
    {
      mode: GameMode.LETTER_PUZZLE,
      levelNumber: 19,
      content: {
        scrambledLetters: ['U', 'D', 'B', 'A', 'B', 'A', 'T', 'M'],
        clue: 'Rahi Anil Barve iconic horror-fantasy masterpiece about Hastar.',
        correctAnswer: 'TUMBBAD',
        hint1: 'Sohum Shah plays Vinayak searching for endless gold in rain.',
        hint2: '7 letters, starts with T and ends with D.',
      },
    },
    {
      mode: GameMode.LETTER_PUZZLE,
      levelNumber: 20,
      content: {
        scrambledLetters: ['O', 'D', 'O', 'M', 'H'],
        clue: 'Iconic YRF action franchise known for fast bikes, thieves, and police chases.',
        correctAnswer: 'DHOOM',
        hint1: 'John Abraham was the villain in the first installment.',
        hint2: '5 letters, starts with D and ends with M.',
      },
    },
    {
      mode: GameMode.LETTER_PUZZLE,
      levelNumber: 21,
      content: {
        scrambledLetters: ['A', 'A', 'D', 'R', 'G'],
        clue: 'Sunny Deol stars as Tara Singh fighting for his love across the border.',
        correctAnswer: 'GADAR',
        hint1: 'Famous for the handpump extraction scene in Pakistan.',
        hint2: '5 letters, starts with G and ends with R.',
      },
    },
    {
      mode: GameMode.LETTER_PUZZLE,
      levelNumber: 22,
      content: {
        scrambledLetters: ['S', 'D', 'A', 'V', 'E', 'D'],
        clue: 'Sanjay Leela Bhansali romantic period film starring SRK and Aishwarya.',
        correctAnswer: 'DEVDAS',
        hint1:
          'Features Madhuri Dixit as Chandramukhi and the song "Dola Re Dola".',
        hint2: '6 letters, starts with D and ends with S.',
      },
    },
    {
      mode: GameMode.LETTER_PUZZLE,
      levelNumber: 23,
      content: {
        scrambledLetters: ['A', 'N', 'U', 'J', 'S'],
        clue: 'Biopic starring Ranbir Kapoor as legendary Bollywood actor Sanjay Dutt.',
        correctAnswer: 'SANJU',
        hint1: 'Directed by Rajkumar Hirani, featuring Vicky Kaushal as Kamli.',
        hint2: '5 letters, starts with S and ends with U.',
      },
    },
    {
      mode: GameMode.LETTER_PUZZLE,
      levelNumber: 24,
      content: {
        scrambledLetters: ['U', 'L', 'S', 'A', 'N', 'T'],
        clue: 'Salman Khan sports drama about a disgraced wrestler from Haryana.',
        correctAnswer: 'SULTAN',
        hint1: 'Anushka Sharma plays fellow wrestler Aarfa.',
        hint2: '6 letters, starts with S and ends with N.',
      },
    },
    {
      mode: GameMode.LETTER_PUZZLE,
      levelNumber: 25,
      content: {
        scrambledLetters: ['K', 'I', 'C', 'K'],
        clue: 'Salman Khan and Jacqueline Fernandez action-comedy film as Devi Lal Singh.',
        correctAnswer: 'KICK',
        hint1: 'Nawazuddin Siddiqui plays the villain Shivam Gajra.',
        hint2: '4 letters, starts with K and ends with K.',
      },
    },
    {
      mode: GameMode.LETTER_PUZZLE,
      levelNumber: 26,
      content: {
        scrambledLetters: ['H', 'I', 'S', 'A', 'I', 'A', 'Q', 'U'],
        clue: 'Aditya Roy Kapur and Shraddha Kapoor romantic musical hit.',
        correctAnswer: 'AASHIQUI',
        hint1:
          'Famous for romantic tracks like "Tum Hi Ho" and "Sunn Raha Hai".',
        hint2: '8 letters, starts with A and ends with I.',
      },
    },
    {
      mode: GameMode.LETTER_PUZZLE,
      levelNumber: 27,
      content: {
        scrambledLetters: ['A', 'B', 'D', 'L', 'A'],
        clue: 'Mystery thriller starring Amitabh Bachchan and Taapsee Pannu in Glasgow.',
        correctAnswer: 'BADLA',
        hint1: 'Directed by Sujoy Ghosh, remake of The Invisible Guest.',
        hint2: '5 letters, translates to "Revenge".',
      },
    },
    {
      mode: GameMode.LETTER_PUZZLE,
      levelNumber: 28,
      content: {
        scrambledLetters: ['A', 'I', 'H', 'A', 'N', 'A', 'K'],
        clue: 'Vidya Balan mystery thriller set during Durga Puja in Kolkata.',
        correctAnswer: 'KAHAANI',
        hint1: 'Vidya Bagchi searches for her missing husband Arnab.',
        hint2: '7 letters, translates to "Story".',
      },
    },
    {
      mode: GameMode.LETTER_PUZZLE,
      levelNumber: 29,
      content: {
        scrambledLetters: ['E', 'I', 'D', 'Y', 'A', 'H', 'B'],
        clue: 'Varun Dhawan horror-comedy werewolf film set in Arunachal Pradesh.',
        correctAnswer: 'BHEDIYA',
        hint1: 'Part of the Maddock Supernatural Universe alongside Stree.',
        hint2: '7 letters, translates to "Werewolf" or "Wolf".',
      },
    },
    {
      mode: GameMode.LETTER_PUZZLE,
      levelNumber: 30,
      content: {
        scrambledLetters: ['L', 'U', 'C', 'I', 'F', 'E', 'R'],
        clue: 'Mohanlal stars as Stephen Nedumpally in Prithviraj Sukumaran political thriller.',
        correctAnswer: 'LUCIFER',
        hint1:
          'Highest-grossing Malayalam film of 2019, featuring Vivek Oberoi.',
        hint2: '7 letters, starts with L and ends with R.',
      },
    },

    // ==========================================
    // DIALOGUE_GURU
    // ==========================================
    {
      mode: GameMode.DIALOGUE_GURU,
      levelNumber: 1,
      content: {
        dialogue: 'Mogambo khush hua!',
        options: ['Sholay', 'Mr. India', 'Shaan', 'Agneepath'],
        correctAnswer: 'Mr. India',
        hint1: 'Delivered by the late Amrish Puri as an iconic villain.',
        hint2: 'From the superhero classic starring Anil Kapoor & Sridevi.',
      },
    },
    {
      mode: GameMode.DIALOGUE_GURU,
      levelNumber: 2,
      content: {
        dialogue:
          'Bade bade deshon mein aisi chhoti chhoti baatein hoti rehti hain, Senorita.',
        options: [
          'Kuch Kuch Hota Hai',
          'Dilwale Dulhania Le Jayenge',
          'Dil To Pagal Hai',
          'Mohabbatein',
        ],
        correctAnswer: 'Dilwale Dulhania Le Jayenge',
        hint1: 'Spoken by SRK to Kajol in Europe.',
        hint2: 'Commonly abbreviated as DDLJ.',
      },
    },
    {
      mode: GameMode.DIALOGUE_GURU,
      levelNumber: 3,
      content: {
        dialogue: 'Don ko pakadna mushkil hi nahi... namumkin hai.',
        options: ['Zanjeer', 'Don', 'Agneepath', 'Deewaar'],
        correctAnswer: 'Don',
        hint1:
          'Originally spoken by Amitabh Bachchan in 1978, later remade by SRK.',
        hint2: 'The title character’s name is right inside the dialogue.',
      },
    },
    {
      mode: GameMode.DIALOGUE_GURU,
      levelNumber: 4,
      content: {
        dialogue: 'All is well.',
        options: ['PK', '3 Idiots', 'Taare Zameen Par', 'Munna Bhai M.B.B.S.'],
        correctAnswer: '3 Idiots',
        hint1:
          'Spoken by Aamir Khan’s character Rancho whenever he is under stress.',
        hint2: 'Set at the prestigious ICE engineering institute.',
      },
    },
    {
      mode: GameMode.DIALOGUE_GURU,
      levelNumber: 5,
      content: {
        dialogue: 'Ek chutki sindoor ki keemat tum kya jaano Ramesh babu.',
        options: ['Om Shanti Om', 'Devdas', 'Main Hoon Na', 'Chennai Express'],
        correctAnswer: 'Om Shanti Om',
        hint1: 'Spoken by Deepika Padukone in her debut film.',
        hint2: 'Movie directed by Farah Khan about reincarnation in Bollywood.',
      },
    },
    {
      mode: GameMode.DIALOGUE_GURU,
      levelNumber: 6,
      content: {
        dialogue: 'Kitne aadmi the?',
        options: ['Sholay', 'Deewaar', 'Don', 'Zanjeer'],
        correctAnswer: 'Sholay',
        hint1: 'Delivered by Amjad Khan as Gabbar Singh in Ramgarh.',
        hint2: 'Spoken to his henchmen Sambha and Kaalia.',
      },
    },
    {
      mode: GameMode.DIALOGUE_GURU,
      levelNumber: 7,
      content: {
        dialogue:
          'Rishte mein toh hum tumhare baap lagte hain... naam hai Shahenshah.',
        options: ['Agneepath', 'Shahenshah', 'Muqaddar Ka Sikandar', 'Trishul'],
        correctAnswer: 'Shahenshah',
        hint1:
          'Delivered by Amitabh Bachchan wearing an iconic jacket with iron sleeves.',
        hint2: "The character's name completes the title and the dialogue.",
      },
    },
    {
      mode: GameMode.DIALOGUE_GURU,
      levelNumber: 8,
      content: {
        dialogue: 'Pushpa, I hate tears... tumhe kitni baar bola hai rona mat.',
        options: ['Aradhana', 'Kati Patang', 'Amar Prem', 'Anand'],
        correctAnswer: 'Amar Prem',
        hint1: 'Spoken by Rajesh Khanna to Sharmila Tagore.',
        hint2:
          'Directed by Shakti Samanta and features the song "Chingari Koi Bhadke".',
      },
    },
    {
      mode: GameMode.DIALOGUE_GURU,
      levelNumber: 9,
      content: {
        dialogue: 'Mhari choriyan chhoron se kam hain ke?',
        options: ['Dangal', 'Sultan', 'Mary Kom', 'Chak De! India'],
        correctAnswer: 'Dangal',
        hint1: 'Spoken by Aamir Khan playing Mahavir Singh Phogat.',
        hint2:
          'Celebrates his daughters Geeta and Babita winning wrestling medals.',
      },
    },
    {
      mode: GameMode.DIALOGUE_GURU,
      levelNumber: 10,
      content: {
        dialogue: 'Sattar Minute... 70 minute hai tumhare paas.',
        options: ['Lagaan', 'Chak De! India', '83', 'Gold'],
        correctAnswer: 'Chak De! India',
        hint1: 'Famous motivational speech by SRK as coach Kabir Khan.',
        hint2: "Delivered before the Women's Hockey World Cup final match.",
      },
    },
    {
      mode: GameMode.DIALOGUE_GURU,
      levelNumber: 11,
      content: {
        dialogue: 'Tareekh pe tareekh, tareekh pe tareekh milte gayi My Lord!',
        options: ['Damini', 'Ghayal', 'Gadar', 'Jolly LLB'],
        correctAnswer: 'Damini',
        hint1:
          'Iconic courtroom outburst by Sunny Deol playing advocate Govind.',
        hint2:
          'Directed by Rajkumar Santoshi and co-starring Meenakshi Seshadri.',
      },
    },
    {
      mode: GameMode.DIALOGUE_GURU,
      levelNumber: 12,
      content: {
        dialogue: 'Rahul, naam toh suna hoga?',
        options: [
          'Dil To Pagal Hai',
          'Kuch Kuch Hota Hai',
          'Kabhi Khushi Kabhie Gham',
          'Darr',
        ],
        correctAnswer: 'Dil To Pagal Hai',
        hint1:
          "SRK's signature line to Madhuri Dixit in this Yash Chopra romance.",
        hint2: 'Co-stars Karisma Kapoor and Akshay Kumar in a guest role.',
      },
    },
    {
      mode: GameMode.DIALOGUE_GURU,
      levelNumber: 13,
      content: {
        dialogue: "How's the Josh? High, Sir!",
        options: ['Uri: The Surgical Strike', 'Shershaah', 'Fighter', 'Border'],
        correctAnswer: 'Uri: The Surgical Strike',
        hint1: 'Spoken by Vicky Kaushal as Major Vihaan Singh Shergill.',
        hint2: 'A battle cry used to motivate army soldiers before a mission.',
      },
    },
    {
      mode: GameMode.DIALOGUE_GURU,
      levelNumber: 14,
      content: {
        dialogue: 'Babumoshai, zindagi badi honi chahiye... lambi nahi.',
        options: ['Anand', 'Bawarchi', 'Chupke Chupke', 'Nayak'],
        correctAnswer: 'Anand',
        hint1: 'Delivered by Rajesh Khanna to Amitabh Bachchan.',
        hint2:
          "Hrishikesh Mukherjee's heartwarming film about living life to the fullest.",
      },
    },
    {
      mode: GameMode.DIALOGUE_GURU,
      levelNumber: 15,
      content: {
        dialogue: 'Picture abhi baaki hai mere dost!',
        options: [
          'Om Shanti Om',
          'Main Hoon Na',
          'Happy New Year',
          'Chennai Express',
        ],
        correctAnswer: 'Om Shanti Om',
        hint1:
          'SRK says this as Om Prakash Makhija during an emotional monologue.',
        hint2:
          "Features Farah Khan's directorial story about 70s cinema and reincarnation.",
      },
    },
    {
      mode: GameMode.DIALOGUE_GURU,
      levelNumber: 16,
      content: {
        dialogue: 'Kattappa ne Baahubali ko kyun maara?',
        options: [
          'Baahubali: The Beginning',
          'Baahubali 2: The Conclusion',
          'RRR',
          'Magadheera',
        ],
        correctAnswer: 'Baahubali: The Beginning',
        hint1: 'The massive cliffhanger dialogue that gripped India in 2015.',
        hint2: 'Directed by S.S. Rajamouli and starring Prabhas.',
      },
    },
    {
      mode: GameMode.DIALOGUE_GURU,
      levelNumber: 17,
      content: {
        dialogue: 'Pushpa naam sunke flower samjha kya? Fire hai main!',
        options: ['Pushpa: The Rise', 'KGF: Chapter 1', 'RRR', 'Vikram'],
        correctAnswer: 'Pushpa: The Rise',
        hint1: 'Delivered by Allu Arjun with a beard-sliding hand gesture.',
        hint2: 'Directed by Sukumar about red sanders smuggling.',
      },
    },
    {
      mode: GameMode.DIALOGUE_GURU,
      levelNumber: 18,
      content: {
        dialogue: 'Mere paas maa hai.',
        options: ['Deewaar', 'Sholay', 'Trishul', 'Zanjeer'],
        correctAnswer: 'Deewaar',
        hint1:
          "Shashi Kapoor's iconic response to Amitabh Bachchan's property monologue.",
        hint2: 'Written by the legendary screenwriting duo Salim-Javed.',
      },
    },
    {
      mode: GameMode.DIALOGUE_GURU,
      levelNumber: 19,
      content: {
        dialogue:
          'Crime Master Gogo naam hai mera, aankhen nikal kar gotiyan khelta hoon.',
        options: [
          'Andaz Apna Apna',
          'Hera Pheri',
          'Jaane Bhi Do Yaaro',
          'Welcome',
        ],
        correctAnswer: 'Andaz Apna Apna',
        hint1: 'Spoken by Shakti Kapoor wearing a red cape.',
        hint2: 'Cult comedy co-starring Aamir Khan and Salman Khan.',
      },
    },
    {
      mode: GameMode.DIALOGUE_GURU,
      levelNumber: 20,
      content: {
        dialogue: 'Ata majhi satakli!',
        options: ['Singham', 'Simmba', 'Sooryavanshi', 'Dabangg'],
        correctAnswer: 'Singham',
        hint1:
          'Marathi phrase delivered by Ajay Devgn when he loses his temper.',
        hint2: 'Features Bajirao Singham fighting villain Jaikant Shikre.',
      },
    },
    {
      mode: GameMode.DIALOGUE_GURU,
      levelNumber: 21,
      content: {
        dialogue: 'Teja main hoon, mark idhar hai.',
        options: ['Andaz Apna Apna', 'Hera Pheri', 'Dulhe Raja', 'Partner'],
        correctAnswer: 'Andaz Apna Apna',
        hint1:
          'Paresh Rawal in a hilarious double role as Ram Gopal Bajaj and Teja.',
        hint2: 'Points to a mark on his cheek to prove his identity.',
      },
    },
    {
      mode: GameMode.DIALOGUE_GURU,
      levelNumber: 22,
      content: {
        dialogue: 'Hum jahan khade ho jaate hain, line wahi se shuru hoti hai.',
        options: ['Kalia', 'Shahenshah', 'Deewaar', 'Don'],
        correctAnswer: 'Kalia',
        hint1: 'Spoken by Amitabh Bachchan to Bob Christo inside prison.',
        hint2: '1981 classic action-drama directed by Tinnu Anand.',
      },
    },
    {
      mode: GameMode.DIALOGUE_GURU,
      levelNumber: 23,
      content: {
        dialogue:
          'Utha le re baba, utha le... mere ko nahi re, in dono ko utha le!',
        options: ['Hera Pheri', 'Phir Hera Pheri', 'Hungama', 'Golmaal'],
        correctAnswer: 'Hera Pheri',
        hint1: 'Spoken by Paresh Rawal as Baburao Ganpatrao Apte.',
        hint2: "Frustrated reaction to Raju and Shyam's constant fighting.",
      },
    },
    {
      mode: GameMode.DIALOGUE_GURU,
      levelNumber: 24,
      content: {
        dialogue: 'Thappad se darr nahi lagta saab, pyar se lagta hai.',
        options: ['Dabangg', 'Wanted', 'Bodyguard', 'Kick'],
        correctAnswer: 'Dabangg',
        hint1:
          "Sonakshi Sinha's debut dialogue spoken to Salman Khan (Chulbul Pandey).",
        hint2:
          'Action comedy set in Uttar Pradesh featuring Inspector Robinhood.',
      },
    },
    {
      mode: GameMode.DIALOGUE_GURU,
      levelNumber: 25,
      content: {
        dialogue:
          "Violence, Violence, Violence... I don't like it. I avoid! But, violence likes me!",
        options: ['KGF: Chapter 2', 'Pushpa', 'RRR', 'Animal'],
        correctAnswer: 'KGF: Chapter 2',
        hint1: 'Spoken by Yash as Rocky Bhai in Narachi.',
        hint2:
          'Delivered right before he blows up a police station with a machine gun.',
      },
    },
    {
      mode: GameMode.DIALOGUE_GURU,
      levelNumber: 26,
      content: {
        dialogue:
          'Parampara, Pratishtha, Anushasan... Ye is gurukul ke teen stambh hain.',
        options: [
          'Mohabbatein',
          'Kabhi Khushi Kabhie Gham',
          'Dil To Pagal Hai',
          'Aarakshan',
        ],
        correctAnswer: 'Mohabbatein',
        hint1:
          'Spoken by Amitabh Bachchan as Narayan Shankar, headmaster of Gurukul.',
        hint2: 'Co-stars Shah Rukh Khan playing music teacher Raj Aryan.',
      },
    },
    {
      mode: GameMode.DIALOGUE_GURU,
      levelNumber: 27,
      content: {
        dialogue:
          'Baap ka, dada ka, bhai ka... sabka badla lega re tera Faizal.',
        options: ['Gangs of Wasseypur', 'Sacred Games', 'Mirzapur', 'Satya'],
        correctAnswer: 'Gangs of Wasseypur',
        hint1: "Spoken by Nawazuddin Siddiqui in Anurag Kashyap's crime epic.",
        hint2:
          'Part 2 of the legendary coal-mafia revenge drama set in Dhanbad.',
      },
    },
    {
      mode: GameMode.DIALOGUE_GURU,
      levelNumber: 28,
      content: {
        dialogue: 'O Stree kal aana.',
        options: ['Stree', 'Roohi', 'Bhediya', 'Bhool Bhulaiyaa'],
        correctAnswer: 'Stree',
        hint1:
          'Slogan written on village walls in red paint to ward off a spirit.',
        hint2:
          'Horror-comedy set in Chanderi starring Rajkummar Rao & Shraddha Kapoor.',
      },
    },
    {
      mode: GameMode.DIALOGUE_GURU,
      levelNumber: 29,
      content: {
        dialogue:
          '2 October ko hum Panaji gaye the, Swami Chinmayanand ji ke ashram mein.',
        options: ['Drishyam', 'Andhadhun', 'Special 26', 'Kahaani'],
        correctAnswer: 'Drishyam',
        hint1:
          'Spoken by Ajay Devgn as Vijay Salgaonkar creating a airtight alibi.',
        hint2: 'Features Tabu as Inspector General Meera Deshmukh.',
      },
    },
    {
      mode: GameMode.DIALOGUE_GURU,
      levelNumber: 30,
      content: {
        dialogue:
          'Life mein jitna bhi try karo, kuch na kuch toh chhootega hi.',
        options: [
          'Yeh Jawaani Hai Deewani',
          'Zindagi Na Milegi Dobara',
          'Tamasha',
          'Wake Up Sid',
        ],
        correctAnswer: 'Yeh Jawaani Hai Deewani',
        hint1:
          'Spoken by Ranbir Kapoor (Bunny) to Deepika Padukone (Naina) in Udaipur.',
        hint2:
          "Teaches that it's okay to be present instead of chasing everything.",
      },
    },

    // ==========================================
    // SPOT_THE_EXACT
    // ==========================================
    {
      mode: GameMode.SPOT_THE_EXACT,
      levelNumber: 1,
      content: {
        options: [
          'Kabhi Khushi Kabhi Gham',
          'Kabhi Khushi Kabhie Gham',
          'Kabhie Khushi Kabhie Gham',
          'Kabhi Khushi Kabhi Gam',
        ],
        correctAnswer: 'Kabhi Khushi Kabhie Gham',
        hint1: 'Focus on the second "Kabhie" in the title.',
        hint2:
          'Karan Johar used numerology: the 3rd word has an "ie" (Kabhie).',
      },
    },
    {
      mode: GameMode.SPOT_THE_EXACT,
      levelNumber: 2,
      content: {
        options: [
          'Zindagi Na Milegi Dobara',
          'Zindagi Na Milegi Dobarah',
          'Jeendagi Na Milegi Dobara',
          'Zindagi Naa Milegi Dobara',
        ],
        correctAnswer: 'Zindagi Na Milegi Dobara',
        hint1: 'Check the spelling of "Zindagi" and "Dobara".',
        hint2: 'No extra "h" at the end of Dobara, and single "a" in Na.',
      },
    },
    {
      mode: GameMode.SPOT_THE_EXACT,
      levelNumber: 3,
      content: {
        options: [
          'Dilwale Dulhaniya Le Jayenge',
          'Dilwale Dulhania Le Jayenge',
          'Dilwale Dulhania Ley Jayenge',
          'Deelwale Dulhania Le Jayenge',
        ],
        correctAnswer: 'Dilwale Dulhania Le Jayenge',
        hint1: 'Focus on how "Dulhania" is spelled in the middle.',
        hint2: 'It uses an "i" instead of a "y" (Dulhania, not Dulhaniya).',
      },
    },
    {
      mode: GameMode.SPOT_THE_EXACT,
      levelNumber: 4,
      content: {
        options: [
          'Gangs of Wasseypur',
          'Gangs of Waaseypur',
          'Gangs off Wasseypur',
          'Gangs of Wasipur',
        ],
        correctAnswer: 'Gangs of Wasseypur',
        hint1: 'Look closely at the double letters in Wasseypur.',
        hint2: 'It has double "s" and includes "ey" (W-a-s-s-e-y-p-u-r).',
      },
    },
    {
      mode: GameMode.SPOT_THE_EXACT,
      levelNumber: 5,
      content: {
        options: [
          'Bajirao Mastani',
          'Bajerao Mastani',
          'Bajirao Maastani',
          'Bajirao Mastany',
        ],
        correctAnswer: 'Bajirao Mastani',
        hint1: 'Focus on the vowels in "Bajirao" and ending of "Mastani".',
        hint2: 'It uses "ji" (not "je") and ends with "ni" (not "ny").',
      },
    },
    {
      mode: GameMode.SPOT_THE_EXACT,
      levelNumber: 6,
      content: {
        options: [
          'Singh Is King',
          'Singh Is Kinng',
          'Singh Is Kiing',
          'Sing Is Kinng',
        ],
        correctAnswer: 'Singh Is Kinng',
        hint1: 'Akshay Kumar’s comedy film used a double letter for luck.',
        hint2: 'Look at the end of "Kinng" — it has a double "n".',
      },
    },
    {
      mode: GameMode.SPOT_THE_EXACT,
      levelNumber: 7,
      content: {
        options: ['Krrish', 'Krish', 'Krrishh', 'Krrish3'],
        correctAnswer: 'Krrish',
        hint1: 'Hrithik Roshan’s superhero title features repeated letters.',
        hint2:
          'It has a double "r" (K-R-R-I-S-H) with no extra "h" at the end.',
      },
    },
    {
      mode: GameMode.SPOT_THE_EXACT,
      levelNumber: 8,
      content: {
        options: ['Heyy Babyy', 'Hey Baby', 'Heyy Baby', 'Hey Babyy'],
        correctAnswer: 'Heyy Babyy',
        hint1:
          'The title of Sajid Khan’s comedy multiplies the last letter in both words.',
        hint2: 'Both "Heyy" and "Babyy" end with a double "y".',
      },
    },
    {
      mode: GameMode.SPOT_THE_EXACT,
      levelNumber: 9,
      content: {
        options: ['Kaminey', 'Kaminay', 'Kaminei', 'Kamminey'],
        correctAnswer: 'Kaminey',
        hint1: 'Shahid Kapoor’s thriller directed by Vishal Bhardwaj.',
        hint2: 'Ends with "ey" (K-a-m-i-n-e-y) and single "m".',
      },
    },
    {
      mode: GameMode.SPOT_THE_EXACT,
      levelNumber: 10,
      content: {
        options: ['Piku', 'Peeku', 'Pikku', 'Peeku'],
        correctAnswer: 'Piku',
        hint1:
          'Deepika Padukone and Amitabh Bachchan’s road-trip comedy drama.',
        hint2: 'Short and sweet 4-letter title: P-I-K-U.',
      },
    },
    {
      mode: GameMode.SPOT_THE_EXACT,
      levelNumber: 11,
      content: {
        options: [
          'Jaane Tu... Ya Jaane Na',
          'Jane Tu... Ya Jane Na',
          'Jaane Tu... Ya Jaane Naa',
          'Jaane Tu... Yaa Jaane Na',
        ],
        correctAnswer: 'Jaane Tu... Ya Jaane Na',
        hint1: 'Imran Khan and Genelia D’Souza’s rom-com.',
        hint2:
          '"Jaane" has a double "a" (J-a-a-n-e) while "Ya" and "Na" are single vowel.',
      },
    },
    {
      mode: GameMode.SPOT_THE_EXACT,
      levelNumber: 12,
      content: {
        options: ['Tumbbad', 'Tumbad', 'Tumbaad', 'Thumbbad'],
        correctAnswer: 'Tumbbad',
        hint1: 'Cult horror film set in a rainy village in Maharashtra.',
        hint2: 'Features a double "b" in the middle: T-u-m-b-b-a-d.',
      },
    },
    {
      mode: GameMode.SPOT_THE_EXACT,
      levelNumber: 13,
      content: {
        options: ['Andhadhun', 'Andhadhun', 'Andhadhoon', 'Andhadun'],
        correctAnswer: 'Andhadhun',
        hint1: 'Ayushmann Khurrana’s black comedy crime thriller.',
        hint2: 'Contains two "h"s: A-n-d-h-a-d-h-u-n.',
      },
    },
    {
      mode: GameMode.SPOT_THE_EXACT,
      levelNumber: 14,
      content: {
        options: [
          'Kaho Naa... Pyaar Hai',
          'Kaho Na... Pyaar Hai',
          'Kaho Naa... Pyar Hai',
          'Kaho Naa... Pyaar Haii',
        ],
        correctAnswer: 'Kaho Naa... Pyaar Hai',
        hint1: 'Hrithik Roshan’s iconic debut movie title.',
        hint2: 'Both "Naa" and "Pyaar" feature double "a"s.',
      },
    },
    {
      mode: GameMode.SPOT_THE_EXACT,
      levelNumber: 15,
      content: {
        options: [
          'Om Shanti Om',
          'Aum Shanti Om',
          'Om Shaanti Om',
          'Om Shanthi Om',
        ],
        correctAnswer: 'Om Shanti Om',
        hint1: 'SRK and Deepika’s reincarnation hit.',
        hint2:
          'Standard spelling: "Shanti" has single "a" and "ti" (not "thi").',
      },
    },
    {
      mode: GameMode.SPOT_THE_EXACT,
      levelNumber: 16,
      content: {
        options: ['Raanjhanaa', 'Ranjhana', 'Raanjhana', 'Ranjhanaa'],
        correctAnswer: 'Raanjhanaa',
        hint1: 'Dhanush and Sonam Kapoor’s Varanasi love story.',
        hint2:
          'Features double "a"s at the beginning AND at the end (R-a-a-n-j-h-a-n-a-a).',
      },
    },
    {
      mode: GameMode.SPOT_THE_EXACT,
      levelNumber: 17,
      content: {
        options: ['Aashiqui 2', 'Ashiqui 2', 'Aashique 2', 'Aashiki 2'],
        correctAnswer: 'Aashiqui 2',
        hint1:
          'Aditya Roy Kapur and Shraddha Kapoor’s blockbuster romantic musical.',
        hint2: 'Starts with "Aa" and ends with "qui" (A-a-s-h-i-q-u-i).',
      },
    },
    {
      mode: GameMode.SPOT_THE_EXACT,
      levelNumber: 18,
      content: {
        options: [
          'Chak De! India',
          'Chak De India',
          'Chakde! India',
          'Chak De!! India',
        ],
        correctAnswer: 'Chak De! India',
        hint1: 'SRK’s sports drama title includes punctuation.',
        hint2:
          'Space between "Chak" and "De", followed by a single exclamation point.',
      },
    },
    {
      mode: GameMode.SPOT_THE_EXACT,
      levelNumber: 19,
      content: {
        options: [
          'Ajab Prem Ki Ghazab Kahani',
          'Ajab Prem Ki Gazab Kahani',
          'Ajab Prem Ki Ghazab Kahaani',
          'Ajab Prem Ki Gazab Kahaani',
        ],
        correctAnswer: 'Ajab Prem Ki Ghazab Kahani',
        hint1: 'Ranbir Kapoor and Katrina Kaif’s slapstick rom-com.',
        hint2: 'Uses "Ghazab" (with an "h") and single "a" in "Kahani".',
      },
    },
    {
      mode: GameMode.SPOT_THE_EXACT,
      levelNumber: 20,
      content: {
        options: [
          'Bhool Bhulaiyaa',
          'Bhool Bhulaiya',
          'Bhool Bhulayya',
          'Bhol Bhulaiyaa',
        ],
        correctAnswer: 'Bhool Bhulaiyaa',
        hint1: 'Akshay Kumar and Vidya Balan’s psychological horror comedy.',
        hint2: '"Bhool" has double "o" and "Bhulaiyaa" ends with double "a".',
      },
    },
    {
      mode: GameMode.SPOT_THE_EXACT,
      levelNumber: 21,
      content: {
        options: [
          'Once Upon A Time In Mumbaai',
          'Once Upon A Time In Mumbai',
          'Once Upon A Time In Mumbay',
          'Once Upon A Time In Mumbaaii',
        ],
        correctAnswer: 'Once Upon A Time In Mumbaai',
        hint1: 'Ajay Devgn and Emraan Hashmi’s retro gangster movie.',
        hint2: 'Extends "Mumbaai" with a double "a" at the end.',
      },
    },
    {
      mode: GameMode.SPOT_THE_EXACT,
      levelNumber: 22,
      content: {
        options: [
          'Lage Raho Munna Bhai',
          'Lage Raho Munnabhai',
          'Lagge Raho Munna Bhai',
          'Lage Raho Munna Bhai!',
        ],
        correctAnswer: 'Lage Raho Munna Bhai',
        hint1: 'Sanjay Dutt’s Gandhigiri comedy masterpiece.',
        hint2: '"Munna" and "Bhai" are written as two separate words.',
      },
    },
    {
      mode: GameMode.SPOT_THE_EXACT,
      levelNumber: 23,
      content: {
        options: [
          'Hum Dil De Chuke Sanam',
          'Hum Dil De Chuke Sanam!',
          'Hum Dil De Chukke Sanam',
          'Hum Dil Dey Chuke Sanam',
        ],
        correctAnswer: 'Hum Dil De Chuke Sanam',
        hint1: 'Salman Khan, Aishwarya Rai, and Ajay Devgn’s classic romance.',
        hint2:
          'Clean 5-word title without extra punctuation or double letters.',
      },
    },
    {
      mode: GameMode.SPOT_THE_EXACT,
      levelNumber: 24,
      content: {
        options: [
          'Rab Ne Bana Di Jodi',
          'Rabb Ne Bana Di Jodi',
          'Rab Ne Bana Di Joddie',
          'Rab Ne Banadi Jodi',
        ],
        correctAnswer: 'Rab Ne Bana Di Jodi',
        hint1: 'Shah Rukh Khan and Anushka Sharma’s romance film.',
        hint2:
          '"Rab" has a single "b", and "Bana" and "Di" are separate words.',
      },
    },
    {
      mode: GameMode.SPOT_THE_EXACT,
      levelNumber: 25,
      content: {
        options: [
          'Bhaag Milkha Bhaag',
          'Bhag Milkha Bhag',
          'Bhaag Milka Bhaag',
          'Bhaag Milkha Bhag',
        ],
        correctAnswer: 'Bhaag Milkha Bhaag',
        hint1: 'Farhan Akhtar’s biopic on Flying Sikh Milkha Singh.',
        hint2: 'Both instances of "Bhaag" feature double "a" and an "h".',
      },
    },
    {
      mode: GameMode.SPOT_THE_EXACT,
      levelNumber: 26,
      content: {
        options: [
          'Taare Zameen Par',
          'Taare Zameen Par...',
          'Taare Zamin Par',
          'Tare Zameen Par',
        ],
        correctAnswer: 'Taare Zameen Par',
        hint1: 'Aamir Khan’s emotional directorial film about Ishaan Awasthi.',
        hint2: '"Taare" has double "a" and "Zameen" has double "e".',
      },
    },
    {
      mode: GameMode.SPOT_THE_EXACT,
      levelNumber: 27,
      content: {
        options: [
          'Special 26',
          'Special CHABBIS',
          'Special Chabbis',
          'Special 26!',
        ],
        correctAnswer: 'Special 26',
        hint1:
          'Akshay Kumar’s heist movie based on the 1987 Opera House robbery.',
        hint2:
          'Official movie title uses numerals "26" rather than spelled out in Hindi.',
      },
    },
    {
      mode: GameMode.SPOT_THE_EXACT,
      levelNumber: 28,
      content: {
        options: [
          'Bareilly Ki Barfi',
          'Bareilly Ki Barfee',
          'Barely Ki Barfi',
          'Bareilly Kee Barfi',
        ],
        correctAnswer: 'Bareilly Ki Barfi',
        hint1: 'Kriti Sanon, Ayushmann Khurrana, and Rajkummar Rao’s rom-com.',
        hint2:
          'Spelled "Bareilly" (double l, ended in y) and "Barfi" (ends in i).',
      },
    },
    {
      mode: GameMode.SPOT_THE_EXACT,
      levelNumber: 29,
      content: {
        options: [
          'Sonu Ke Titu Ki Sweety',
          'Sonu Ke Titu Ki Sweety!',
          'Sonu Ke Teetu Ki Sweety',
          'Sonu Ki Titu Ke Sweety',
        ],
        correctAnswer: 'Sonu Ke Titu Ki Sweety',
        hint1: 'Kartik Aaryan and Luv Ranjan’s comedy blockbuster.',
        hint2: 'Sequence goes: "Sonu Ke" then "Titu Ki" (T-i-t-u).',
      },
    },
    {
      mode: GameMode.SPOT_THE_EXACT,
      levelNumber: 30,
      content: {
        options: ['Badhaai Ho', 'Badhai Ho', 'Badhaai Ho!', 'Badhaai Hoo'],
        correctAnswer: 'Badhaai Ho',
        hint1: 'Ayushmann Khurrana and Neena Gupta’s family comedy.',
        hint2: '"Badhaai" features double "a" before the "i" (B-a-d-h-a-a-i).',
      },
    },

    // ==========================================
    // MISSING_LETTERS
    // ==========================================
    {
      mode: GameMode.MISSING_LETTERS,
      levelNumber: 1,
      content: {
        maskedWord: 'D_NG_L',
        clue: "Aamir Khan's record-breaking wrestling biopic.",
        correctAnswer: 'DANGAL',
        scrambledLetters: ['A', 'A', 'N', 'M', 'G', 'L', 'O', 'P'],
        hint1: 'Both missing letters are vowels.',
        hint2: 'Both missing slots require the letter "A".',
      },
    },
    {
      mode: GameMode.MISSING_LETTERS,
      levelNumber: 2,
      content: {
        maskedWord: 'P_TH__N',
        clue: "Shah Rukh Khan's grand espionage action comeback movie.",
        correctAnswer: 'PATHAAN',
        scrambledLetters: ['A', 'A', 'A', 'R', 'H', 'M', 'T', 'S'],
        hint1: 'All missing letters are identical.',
        hint2: 'You need three "A"s to fill the blanks (P-A-T-H-A-A-N).',
      },
    },
    {
      mode: GameMode.MISSING_LETTERS,
      levelNumber: 3,
      content: {
        maskedWord: 'BR_HM_STR_',
        clue: 'Astraverse fantasy film starring Ranbir Kapoor and Alia Bhatt.',
        correctAnswer: 'BRAHMASTRA',
        scrambledLetters: ['A', 'A', 'A', 'M', 'S', 'H', 'K', 'T', 'V', 'B'],
        hint1: 'All three missing slots are the exact same vowel.',
        hint2: 'Fill all three blanks with the letter "A".',
      },
    },
    {
      mode: GameMode.MISSING_LETTERS,
      levelNumber: 4,
      content: {
        maskedWord: 'QU__N',
        clue: 'Kangana Ranaut solo honeymoon cult classic movie.',
        correctAnswer: 'QUEEN',
        scrambledLetters: ['E', 'E', 'O', 'U', 'I', 'N', 'Z', 'M'],
        hint1: 'The missing middle part consists of repeated vowels.',
        hint2: 'The missing letters are double "EE".',
      },
    },
    {
      mode: GameMode.MISSING_LETTERS,
      levelNumber: 5,
      content: {
        maskedWord: 'CH_K D_! IND__',
        clue: 'Legendary Indian women hockey team sports drama.',
        correctAnswer: 'CHAK DE! INDIA',
        scrambledLetters: ['A', 'E', 'I', 'A', 'K', 'D', 'N', 'H', 'S', 'T'],
        hint1: 'All 4 missing letters are vowels.',
        hint2: 'The letters needed in order are: A, E, I, A.',
      },
    },
    {
      mode: GameMode.MISSING_LETTERS,
      levelNumber: 6,
      content: {
        maskedWord: 'SH_L_Y',
        clue: "Amitabh Bachchan and Dharmendra's legendary Ramesh Sippy blockbuster.",
        correctAnswer: 'SHOLAY',
        scrambledLetters: ['O', 'A', 'E', 'I', 'S', 'H', 'L', 'Y'],
        hint1: 'Both missing letters are vowels.',
        hint2: 'The missing letters in order are "O" and "A".',
      },
    },
    {
      mode: GameMode.MISSING_LETTERS,
      levelNumber: 7,
      content: {
        maskedWord: 'L_G__N',
        clue: 'Aamir Khan Oscar-nominated cricket masterpiece.',
        correctAnswer: 'LAGAAN',
        scrambledLetters: ['A', 'A', 'A', 'G', 'N', 'L', 'O', 'R'],
        hint1: 'All three missing letters are the exact same letter.',
        hint2: 'Fill all blanks with "A" to spell LAGAAN.',
      },
    },
    {
      mode: GameMode.MISSING_LETTERS,
      levelNumber: 8,
      content: {
        maskedWord: 'S_NGH_M',
        clue: 'Ajay Devgn police action drama directed by Rohit Shetty.',
        correctAnswer: 'SINGHAM',
        scrambledLetters: ['I', 'A', 'E', 'O', 'S', 'N', 'G', 'M'],
        hint1: 'Both missing slots require vowels.',
        hint2: 'The missing letters in order are "I" and "A".',
      },
    },
    {
      mode: GameMode.MISSING_LETTERS,
      levelNumber: 9,
      content: {
        maskedWord: 'P_SHP_',
        clue: 'Allu Arjun stars as a red sanders smuggler.',
        correctAnswer: 'PUSHPA',
        scrambledLetters: ['U', 'A', 'O', 'I', 'P', 'S', 'H', 'K'],
        hint1: 'Both missing blanks are vowels.',
        hint2: 'The missing letters in order are "U" and "A".',
      },
    },
    {
      mode: GameMode.MISSING_LETTERS,
      levelNumber: 10,
      content: {
        maskedWord: 'J_W_N',
        clue: 'Shah Rukh Khan double-role blockbuster as Vikram and Azad.',
        correctAnswer: 'JAWAN',
        hint1: 'Both missing letters are identical.',
        scrambledLetters: ['A', 'A', 'E', 'U', 'J', 'W', 'N', 'K'],
        hint2: 'Fill both blanks with the letter "A".',
      },
    },
    {
      mode: GameMode.MISSING_LETTERS,
      levelNumber: 11,
      content: {
        maskedWord: 'K_NT_R_',
        clue: 'Rishab Shetty coastal folklore movie about Panjurli Daiva.',
        correctAnswer: 'KANTARA',
        scrambledLetters: ['A', 'A', 'A', 'E', 'K', 'N', 'T', 'R'],
        hint1: 'All three missing letters are the exact same vowel.',
        hint2: 'Fill all three blanks with the letter "A".',
      },
    },
    {
      mode: GameMode.MISSING_LETTERS,
      levelNumber: 12,
      content: {
        maskedWord: '_NIM_L',
        clue: 'Ranbir Kapoor action drama directed by Sandeep Reddy Vanga.',
        correctAnswer: 'ANIMAL',
        scrambledLetters: ['A', 'A', 'I', 'E', 'N', 'M', 'L', 'T'],
        hint1: 'Both missing letters are the first letter of the alphabet.',
        hint2: 'Fill both missing slots with "A".',
      },
    },
    {
      mode: GameMode.MISSING_LETTERS,
      levelNumber: 13,
      content: {
        maskedWord: 'STR__',
        clue: 'Rajkummar Rao and Shraddha Kapoor horror-comedy set in Chanderi.',
        correctAnswer: 'STREE',
        scrambledLetters: ['E', 'E', 'A', 'I', 'S', 'T', 'R', 'O'],
        hint1: 'The two missing end letters are double vowels.',
        hint2: 'Fill both end blanks with the letter "E".',
      },
    },
    {
      mode: GameMode.MISSING_LETTERS,
      levelNumber: 14,
      content: {
        maskedWord: 'D_VD_S',
        clue: 'Sanjay Leela Bhansali romantic period film starring SRK, Aishwarya, and Madhuri.',
        correctAnswer: 'DEVDAS',
        scrambledLetters: ['E', 'A', 'I', 'O', 'D', 'V', 'S', 'R'],
        hint1: 'Both missing blanks are vowels.',
        hint2: 'The missing letters in order are "E" and "A".',
      },
    },
    {
      mode: GameMode.MISSING_LETTERS,
      levelNumber: 15,
      content: {
        maskedWord: 'SW_D_S',
        clue: 'Shah Rukh Khan plays NASA scientist Mohan Bhargava.',
        correctAnswer: 'SWADES',
        scrambledLetters: ['A', 'E', 'I', 'O', 'S', 'W', 'D', 'N'],
        hint1: 'Both missing slots require vowels.',
        hint2: 'The missing letters in order are "A" and "E".',
      },
    },
    {
      mode: GameMode.MISSING_LETTERS,
      levelNumber: 16,
      content: {
        maskedWord: 'B_RF_',
        clue: 'Ranbir Kapoor plays Murphy, a deaf-mute man in Darjeeling.',
        correctAnswer: 'BARFI',
        scrambledLetters: ['A', 'I', 'E', 'O', 'B', 'R', 'F', 'L'],
        hint1: 'The word opens with a vowel and ends with a vowel.',
        hint2: 'The missing letters in order are "A" and "I".',
      },
    },
    {
      mode: GameMode.MISSING_LETTERS,
      levelNumber: 17,
      content: {
        maskedWord: 'S_NJ_',
        clue: 'Ranbir Kapoor biopic based on the life of actor Sanjay Dutt.',
        correctAnswer: 'SANJU',
        scrambledLetters: ['A', 'U', 'I', 'O', 'S', 'N', 'J', 'K'],
        hint1: 'Both missing letters are vowels.',
        hint2: 'The missing letters in order are "A" and "U".',
      },
    },
    {
      mode: GameMode.MISSING_LETTERS,
      levelNumber: 18,
      content: {
        maskedWord: 'DH__M',
        clue: 'High-octane YRF action franchise about bike thieves.',
        correctAnswer: 'DHOOM',
        scrambledLetters: ['O', 'O', 'U', 'A', 'D', 'H', 'M', 'S'],
        hint1: 'The missing middle consists of repeated vowels.',
        hint2: 'Fill both middle slots with the letter "O".',
      },
    },
    {
      mode: GameMode.MISSING_LETTERS,
      levelNumber: 19,
      content: {
        maskedWord: 'G_D_R',
        clue: 'Sunny Deol stars as Tara Singh fighting across the border.',
        correctAnswer: 'GADAR',
        scrambledLetters: ['A', 'A', 'E', 'I', 'G', 'D', 'R', 'T'],
        hint1: 'Both missing letters are identical.',
        hint2: 'Fill both blanks with the letter "A".',
      },
    },
    {
      mode: GameMode.MISSING_LETTERS,
      levelNumber: 20,
      content: {
        maskedWord: 'BH_DIY_',
        clue: 'Varun Dhawan horror-comedy werewolf film set in Arunachal Pradesh.',
        correctAnswer: 'BHEDIYA',
        scrambledLetters: ['E', 'A', 'I', 'O', 'B', 'H', 'D', 'Y'],
        hint1: 'Both missing letters are vowels.',
        hint2: 'The missing letters in order are "E" and "A".',
      },
    },
    {
      mode: GameMode.MISSING_LETTERS,
      levelNumber: 21,
      content: {
        maskedWord: 'T_MBB_D',
        clue: 'Fantasy horror cult classic set in a rainy village centered on Hastar.',
        correctAnswer: 'TUMBBAD',
        scrambledLetters: ['U', 'A', 'O', 'E', 'T', 'M', 'B', 'D'],
        hint1: 'Both missing slots are vowels.',
        hint2: 'The missing letters in order are "U" and "A".',
      },
    },
    {
      mode: GameMode.MISSING_LETTERS,
      levelNumber: 22,
      content: {
        maskedWord: 'VIKR_M',
        clue: 'Kamal Haasan action thriller directed by Lokesh Kanagaraj.',
        correctAnswer: 'VIKRAM',
        scrambledLetters: ['A', 'E', 'I', 'O', 'V', 'K', 'R', 'M'],
        hint1: 'The single missing letter is the first vowel of the alphabet.',
        hint2: 'Fill the blank with the letter "A".',
      },
    },
    {
      mode: GameMode.MISSING_LETTERS,
      levelNumber: 23,
      content: {
        maskedWord: 'S_LT_N',
        clue: 'Salman Khan plays a disgraced wrestler from Haryana seeking redemption.',
        correctAnswer: 'SULTAN',
        scrambledLetters: ['U', 'A', 'O', 'E', 'S', 'L', 'T', 'N'],
        hint1: 'Both missing letters are vowels.',
        hint2: 'The missing letters in order are "U" and "A".',
      },
    },
    {
      mode: GameMode.MISSING_LETTERS,
      levelNumber: 24,
      content: {
        maskedWord: 'K_AH__NI',
        clue: 'Vidya Balan mystery thriller set in Kolkata during Durga Puja.',
        correctAnswer: 'KAHAANI',
        scrambledLetters: ['A', 'A', 'A', 'E', 'K', 'H', 'N', 'I'],
        hint1: 'All three missing letters are the exact same vowel.',
        hint2: 'Fill all three blanks with the letter "A".',
      },
    },
    {
      mode: GameMode.MISSING_LETTERS,
      levelNumber: 25,
      content: {
        maskedWord: 'L_C_F_R',
        clue: 'Mohanlal stars as Stephen Nedumpally in Prithviraj Sukumaran political drama.',
        correctAnswer: 'LUCIFER',
        scrambledLetters: ['U', 'I', 'E', 'O', 'L', 'C', 'F', 'R'],
        hint1: 'All three missing letters are vowels.',
        hint2: 'The missing letters in order are "U", "I", and "E".',
      },
    },
    {
      mode: GameMode.MISSING_LETTERS,
      levelNumber: 26,
      content: {
        maskedWord: 'B_DL_',
        clue: 'Amitabh Bachchan and Taapsee Pannu crime mystery thriller in Glasgow.',
        correctAnswer: 'BADLA',
        scrambledLetters: ['A', 'A', 'E', 'I', 'B', 'D', 'L', 'S'],
        hint1: 'Both missing letters are identical.',
        hint2: 'Fill both blanks with the letter "A".',
      },
    },
    {
      mode: GameMode.MISSING_LETTERS,
      levelNumber: 27,
      content: {
        maskedWord: 'T_M_SH_',
        clue: 'Ranbir Kapoor and Deepika Padukone drama directed by Imtiaz Ali.',
        correctAnswer: 'TAMASHA',
        scrambledLetters: ['A', 'A', 'A', 'E', 'T', 'M', 'S', 'H'],
        hint1: 'All three missing letters are the exact same vowel.',
        hint2: 'Fill all three blanks with the letter "A".',
      },
    },
    {
      mode: GameMode.MISSING_LETTERS,
      levelNumber: 28,
      content: {
        maskedWord: 'A_DH_DH_N',
        clue: 'Ayushmann Khurrana black comedy thriller about a pianist pretending to be blind.',
        correctAnswer: 'ANDHADHUN',
        scrambledLetters: ['N', 'A', 'U', 'E', 'A', 'D', 'H', 'N'],
        hint1:
          'The three missing letters in order are a consonant and two vowels.',
        hint2: 'The letters needed in order are "N", "A", and "U".',
      },
    },
    {
      mode: GameMode.MISSING_LETTERS,
      levelNumber: 29,
      content: {
        maskedWord: 'DR_SHY_M',
        clue: 'Ajay Devgn plays Vijay Salgaonkar protecting his family on October 2nd.',
        correctAnswer: 'DRISHYAM',
        scrambledLetters: ['I', 'A', 'E', 'O', 'D', 'R', 'S', 'M'],
        hint1: 'Both missing letters are vowels.',
        hint2: 'The missing letters in order are "I" and "A".',
      },
    },
    {
      mode: GameMode.MISSING_LETTERS,
      levelNumber: 30,
      content: {
        maskedWord: 'K_M_N_Y',
        clue: 'Shahid Kapoor double-role thriller directed by Vishal Bhardwaj.',
        correctAnswer: 'KAMINEY',
        scrambledLetters: ['A', 'I', 'E', 'O', 'K', 'M', 'N', 'Y'],
        hint1: 'All three missing slots are vowels.',
        hint2: 'The missing letters in order are "A", "I", and "E".',
      },
    },
  ];

  await prisma.question.createMany({
    data: initialQuestions,
  });
  console.log(`✅ Seeded ${initialQuestions.length} Questions`);

  // ==========================================
  // --- 3. SEED USERS ---
  // ==========================================
  const newUsersData = [
    {
      deviceToken: 'dt_iOS_981a17fa_2026_x01',
      deviceType: 'iOS',
      name: 'Aarav Sharma',
      avatar: 'Mogambo',
    },
    {
      deviceToken: 'dt_Android_442b881c_2026_x02',
      deviceType: 'Android',
      name: 'Ananya Patel',
      avatar: 'Circuit',
    },
    {
      deviceToken: 'dt_iOS_110c993d_2026_x03',
      deviceType: 'iOS',
      name: 'Rohan Verma',
      avatar: 'Chota Pandit',
    },
    {
      deviceToken: 'dt_Android_773d224e_2026_x04',
      deviceType: 'Android',
      name: 'Priya Nair',
      avatar: 'Dramatic Maa',
    },
    {
      deviceToken: 'dt_iOS_334e555f_2026_x05',
      deviceType: 'iOS',
      name: 'Kabir Mehta',
      avatar: 'Superstar Entry',
    },
    {
      deviceToken: 'dt_Android_885f666g_2026_x06',
      deviceType: 'Android',
      name: 'Diya Joshi',
      avatar: 'Stunt Double',
    },
    {
      deviceToken: 'dt_iOS_556g777h_2026_x07',
      deviceType: 'iOS',
      name: 'Siddharth Rao',
      avatar: 'Bollywood Disco King',
    },
    {
      deviceToken: 'dt_Android_227h888i_2026_x08',
      deviceType: 'Android',
      name: 'Isha Kapoor',
      avatar: 'Superstar Entry',
    },
    {
      deviceToken: 'dt_iOS_998i000j_2026_x09',
      deviceType: 'iOS',
      name: 'Vikram Singh',
      avatar: 'Dramatic Maa',
    },
    {
      deviceToken: 'dt_Android_119j222k_2026_x10',
      deviceType: 'Android',
      name: 'Sneha Reddy',
      avatar: 'Chota Pandit',
    },
  ];

  // Insert users individually and collect created records to retain real IDs
  const createdUsers = [];
  for (const user of newUsersData) {
    const createdUser = await prisma.user.create({ data: user });
    createdUsers.push(createdUser);
  }
  console.log(`✅ Seeded ${createdUsers.length} Users`);

  // ==========================================
  // --- 4. SEED USER GAME PROGRESS ---
  // ==========================================
  // Dynamically attach progress using actual database user IDs
  // Add '!' after array index access so TypeScript knows userId is strictly a number
  const gameProgressData = [
    // User 1
    {
      userId: createdUsers[0]!.id,
      mode: GameMode.EMOJI_RIDDLES,
      currentLevel: 15,
      levelsWon: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14],
      levelsLost: [3, 8],
    },
    {
      userId: createdUsers[0]!.id,
      mode: GameMode.DIALOGUE_GURU,
      currentLevel: 8,
      levelsWon: [1, 2, 3, 4, 5, 6, 7],
      levelsLost: [2],
    },

    // User 2
    {
      userId: createdUsers[1]!.id,
      mode: GameMode.EMOJI_RIDDLES,
      currentLevel: 22,
      levelsWon: Array.from({ length: 21 }, (_, i) => i + 1),
      levelsLost: [5, 12, 19],
    },
    {
      userId: createdUsers[1]!.id,
      mode: GameMode.MISSING_LETTERS,
      currentLevel: 10,
      levelsWon: [1, 2, 3, 4, 5, 6, 7, 8, 9],
      levelsLost: [4],
    },

    // User 3
    {
      userId: createdUsers[2]!.id,
      mode: GameMode.DIALOGUE_GURU,
      currentLevel: 18,
      levelsWon: Array.from({ length: 17 }, (_, i) => i + 1),
      levelsLost: [6, 11],
    },
    {
      userId: createdUsers[2]!.id,
      mode: GameMode.MISSING_LETTERS,
      currentLevel: 5,
      levelsWon: [1, 2, 3, 4],
      levelsLost: [],
    },

    // User 4
    {
      userId: createdUsers[3]!.id,
      mode: GameMode.EMOJI_RIDDLES,
      currentLevel: 30,
      levelsWon: Array.from({ length: 29 }, (_, i) => i + 1),
      levelsLost: [10, 20],
    },

    // User 5
    {
      userId: createdUsers[4]!.id,
      mode: GameMode.DIALOGUE_GURU,
      currentLevel: 12,
      levelsWon: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11],
      levelsLost: [3],
    },

    // User 6
    {
      userId: createdUsers[5]!.id,
      mode: GameMode.MISSING_LETTERS,
      currentLevel: 16,
      levelsWon: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15],
      levelsLost: [2, 9, 14],
    },

    // User 7
    {
      userId: createdUsers[6]!.id,
      mode: GameMode.EMOJI_RIDDLES,
      currentLevel: 8,
      levelsWon: [1, 2, 3, 4, 5, 6, 7],
      levelsLost: [4],
    },

    // User 8
    {
      userId: createdUsers[7]!.id,
      mode: GameMode.DIALOGUE_GURU,
      currentLevel: 25,
      levelsWon: Array.from({ length: 24 }, (_, i) => i + 1),
      levelsLost: [7, 15, 21],
    },

    // User 9
    {
      userId: createdUsers[8]!.id,
      mode: GameMode.MISSING_LETTERS,
      currentLevel: 11,
      levelsWon: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
      levelsLost: [5],
    },

    // User 10
    {
      userId: createdUsers[9]!.id,
      mode: GameMode.EMOJI_RIDDLES,
      currentLevel: 6,
      levelsWon: [1, 2, 3, 4, 5],
      levelsLost: [2],
    },
  ];

  await prisma.userGameProgress.createMany({
    data: gameProgressData,
  });
  console.log(
    `✅ Seeded ${gameProgressData.length} User Game Progress records`,
  );

  console.log('🎉 Database seeding completed successfully!');
}

main()
  .catch((e) => {
    console.error('❌ Seeding failed:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

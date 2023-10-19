const DESCRIPTIONS = [
  'Пляж санатория',
  'Дорожный указатель',
  'Пляж острова Пхукет',
  'Девушка с фотоаппаратом',
  'Тарелки с супом',
  'Суперкар McLaren P1',
  'Клубника на тарелке',
  'Виноградный компот',
  'Девушка машет самолёту в небе над пляжем',
  'Подставка для обуви',
  'Дорога к морю',
  'Audi A5',
  'Овощная тарелка с рыбой',
  'Сушикот',
  'Тёплые тапки-сапоги',
  'Вид на горы с самолёта',
  'Хор на сцене',
  'Chevrolet Impala 1964',
  'Тапочки с фонариками',
  'Отель на море',
  'Тарелка с курицей и овощами',
  'Закат на море',
  'Краб на камне',
  'Концерт рэпера',
  'Бегемот ругается на машину',
];

const NAMES = ['Роберто', 'Хуан', 'Екатерина', 'Кристоф', 'Себастьян', 'Юлия', 'Люпита', 'Дэнзел',];

const MESSAGES = [
  'Всё отлично!',
  'В целом всё неплохо. Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Юлия',
  'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!',
];

const SIMILAR_IMAGE_COUNT = 25;
const LikesCount = {
  MIN_LENGTH: 15,
  MAX_LENGTH: 200
};
const AVATAR_COUNT = 6;
const COMMENT_COUNT = 30;

const getRandomInteger = (a, b) => {
  const lower = Math.ceil(Math.min(a, b));
  const upper = Math.floor(Math.max(a, b));
  const result = Math.random() * (upper - lower + 1) + lower;
  return Math.floor(result);
};

const getRandomArrayElement = (elements) => elements[getRandomInteger(0, elements.length - 1)];

const generateComment = () => ({
  id: getRandomInteger(0, 1000),
  avatar: `img/avatar-${getRandomInteger(1, AVATAR_COUNT)}.svg`,
  message: getRandomArrayElement(MESSAGES),
  name: getRandomArrayElement(NAMES),
});

const addImages = () => {
  const photos = [];
  for (let i = 1; i <= SIMILAR_IMAGE_COUNT; i++) {
    photos.push({
      id: i,
      url: `photos/${i}.jpg`,
      likes: getRandomInteger(LikesCount.MIN_LENGTH, LikesCount.MAX_LENGTH),
      comments: Array.from({ length: getRandomInteger(0, COMMENT_COUNT) },
        generateComment),
      description: getRandomArrayElement(DESCRIPTIONS),
    });
  }
  return photos;
};

console.log(addImages());

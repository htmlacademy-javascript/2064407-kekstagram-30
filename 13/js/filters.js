import { renderThumbnails } from './thumbnail';
import { debounce } from './util';

const filtersElement = document.querySelector('.img-filters');
const filterForm = document.querySelector('.img-filters__form');
const defaultBtn = filterForm.querySelector('#filter-default');
const randomBtn = filterForm.querySelector('#filter-random');
const discussedBtn = filterForm.querySelector('#filter-discussed');
const pictureContainerElement = document.querySelector('.pictures');

const MAX_RANDOM_FILTER = 10;

const FilterEnum = {
  DEFAULT: 'default',
  RANDOM: 'random',
  DISCUSSED: 'discussed'
};

const getRandomIndex = function (min, max) {
  return Math.floor(Math.random() * (max - min));
};

const filterHandlers = {
  [FilterEnum.DEFAULT]: function (data) {
    return data;
  },
  [FilterEnum.RANDOM]: (data) => {
    const randomIndexList = [];
    const max = Math.min(MAX_RANDOM_FILTER, data.length);
    while (randomIndexList.length < max) {
      const index = getRandomIndex(0, data.length);
      if (!randomIndexList.includes(index)) {
        randomIndexList.push(index);
      }
    }
    return randomIndexList.map((index) => data[index]);
  },
  [FilterEnum.DISCUSSED]: (data) => [...data].sort((item1, item2) => item2.comments.length - item1.comments.length)
};

let currentFilter = FilterEnum.DEFAULT;

const repaint = (event, filter, data) => {
  if (currentFilter !== filter) {
    const filteredData = filterHandlers[filter](data);
    const pictures = document.querySelectorAll('.picture');
    pictures.forEach((item) => item.remove());
    renderThumbnails(filteredData, pictureContainerElement);
    const currentActiveEl = filterForm.querySelector('.img-filters__button--active');
    currentActiveEl.classList.remove('img-filters__button--active');
    event.target.classList.add('img-filters__button--active');
    currentFilter = filter;
  }
};

const debouncedRepaint = debounce(repaint);

const initFilter = (data) => {
  filtersElement.classList.remove('img-filters--inactive');
  defaultBtn.addEventListener('click', (event) => {
    debouncedRepaint(event, FilterEnum.DEFAULT, data);
  });
  randomBtn.addEventListener('click', (event) => {
    debouncedRepaint(event, FilterEnum.RANDOM, data);
  });
  discussedBtn.addEventListener('click', (event) => {
    debouncedRepaint(event, FilterEnum.DISCUSSED, data);
  });
};

export { initFilter };

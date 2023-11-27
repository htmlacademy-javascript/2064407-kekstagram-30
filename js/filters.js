import { renderThumbnails } from './thumbnail';
import { debounce } from './util';

const MAX_RANDOM_FILTER = 10;

const filtersElement = document.querySelector('.img-filters');
const filterFormElement = document.querySelector('.img-filters__form');
const filterButtonElements = filterFormElement.querySelectorAll('button');
const pictureContainerElement = document.querySelector('.pictures');

const FilterEnum = {
  DEFAULT: 'filter-default',
  RANDOM: 'filter-random',
  DISCUSSED: 'filter-discussed'
};

const getRandomIndex = (min, max) => Math.floor(Math.random() * (max - min));

const filterHandlers = {
  [FilterEnum.DEFAULT]: (data) => data,
  [FilterEnum.RANDOM]: (data) => {
    const elements = [];
    const max = Math.min(MAX_RANDOM_FILTER, data.length);
    while (elements.length < max) {
      const index = getRandomIndex(0, data.length);
      if (!elements.includes(index)) {
        elements.push(index);
      }
    }
    return elements.map((index) => data[index]);
  },
  [FilterEnum.DISCUSSED]: (data) => [...data].sort((item1, item2) => item2.comments.length - item1.comments.length)
};

let currentFilter = FilterEnum.DEFAULT;

const repaint = (filter, data) => {
  if (currentFilter !== filter) {
    const filteredData = filterHandlers[filter](data);
    const pictures = document.querySelectorAll('.picture');
    pictures.forEach((item) => item.remove());
    renderThumbnails(filteredData, pictureContainerElement);
    currentFilter = filter;
  }
};

const debouncedRepaint = debounce(repaint);

const initFilter = (data) => {
  filtersElement.classList.remove('img-filters--inactive');
  filterButtonElements.forEach((button) => {
    button.addEventListener('click', (event) => {
      const currentActiveEl = filterFormElement.querySelector('.img-filters__button--active');
      currentActiveEl.classList.remove('img-filters__button--active');
      event.target.classList.add('img-filters__button--active');
      debouncedRepaint(event.target.id, data);
    });
  });
};

export { initFilter };

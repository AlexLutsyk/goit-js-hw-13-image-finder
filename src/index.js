import './sass/main.scss';

import ApiService from './js/apiService.js';
import imgTemplate from './templates/imgTemplate.hbs'

const refs = {
    searchForm: document.querySelector('.form-search'),
    loadMoreBtn: document.querySelector('[data-action="load-more"]'),
    gallery: document.querySelector('.gallery'),
};

const imgApiService = new ApiService();

refs.searchForm.addEventListener('submit', onSearch);
refs.loadMoreBtn.addEventListener('click', onLoadMore);

function onSearch(elements) {
    elements.preventDefault();

    clearImageContainer()

    imgApiService.query = elements.currentTarget.elements.query.value;
    imgApiService.resetPage();
    imgApiService.fetchImages().then(appendImagesMarkup);

};

function onLoadMore() {
    imgApiService.fetchImages().then(appendImagesMarkup);
    scrollAfterLoad();
};

function appendImagesMarkup(articles) {
    refs.gallery.insertAdjacentHTML('beforeend', imgTemplate(articles));
    refs.loadMoreBtn.classList.remove('is-hidden');
};

function clearImageContainer() {
    refs.gallery.innerHTML = '';
};

function scrollAfterLoad () {
    refs.loadMoreBtn.scrollIntoView({
        behavior: 'smooth',
        block: 'end',
    });
}
import './sass/main.scss';

import apiService from "./js/apiService";

import photoCardTemplate from './template/photo-card.hbs';

import { alert, notice, info, success, error, defaultModules } from'@pnotify/core';
import"@pnotify/core/dist/PNotify.css";
import"@pnotify/core/dist/BrightTheme.css";

const refs = {
    submitButton: document.querySelector("#search-button"),
    input: document.querySelector("#input"),
    gallery: document.querySelector("#gallery"),
    form: document.querySelector("#search-form"),
    loadMoreBtn: document.querySelector("#load-more-btn")
}

refs.form.addEventListener("submit", onSearch)
refs.loadMoreBtn.addEventListener("click", onLoadMore)

function onSearch(e) {
    e.preventDefault()

    apiService.query = e.currentTarget.elements.query.value;
    apiService.resetPage();
    clearInterface();
    apiService.fetchPhotos().then(photos => {
        if (photos.length === 0) {
            throw Error()
        }
        appendPhotosMarkup(photos)
    }).catch(err => alert({text: 'No Photos Found, try to change your query'}))
}

async function onLoadMore() {
    await apiService.fetchPhotos().then(appendPhotosMarkup);
    refs.gallery.scrollIntoView({behavior: "smooth", block: "end"});
}

function appendPhotosMarkup(photos) {
    refs.gallery.insertAdjacentHTML('beforeend', photoCardTemplate(photos))
}

function clearInterface() {
    refs.gallery.innerHTML = '';
}
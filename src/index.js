import './sass/main.scss';

import apiService from "./js/apiService";

import photoCardTemplate from './template/photo-card.hbs';
import modalTemplate from './template/modal.hbs';

import { alert, notice, info, success, error, defaultModules } from'@pnotify/core';
import"@pnotify/core/dist/PNotify.css";
import"@pnotify/core/dist/BrightTheme.css";

import * as basicLightbox from 'basiclightbox';

const refs = {
    submitButton: document.querySelector("#search-button"),
    input: document.querySelector("#input"),
    gallery: document.querySelector("#gallery"),
    form: document.querySelector("#search-form"),
    loadMoreBtn: document.querySelector("#load-more-btn"),
    body: document.querySelector("body"),
    modal: document.querySelector(".basicLightbox")
}

refs.form.addEventListener("submit", onSearch)
refs.loadMoreBtn.addEventListener("click", onLoadMore)
refs.gallery.addEventListener("click", onImg)

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

function onImg(e) {
    if (e.target.nodeName != "IMG") {
        return;
    }

    apiService.id = e.target.id;

    apiService.fetchBigImg().then(img => {
        const modalHTML = modalTemplate(img);
        const modal = basicLightbox.create(
            `${modalHTML}`
        )
        modal.show();
    })
}

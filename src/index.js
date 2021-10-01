import './css/styles';
import refs from './js/refs';
import cardMarkup from './tamplates/card-markup';
import ApiService from './js/api-service';
import debounce from 'lodash.debounce';

const apiService = new ApiService()

refs.searchForm.addEventListener('input', debounce(onInputChange, 1000));
refs.loadMoreBtn.addEventListener('click', onLoadMore);


function addMarkup (data) {
    const markup = cardMarkup(data);
    refs.gallery.insertAdjacentHTML('beforeend', markup);  
}

function clearMarkup () {
    refs.gallery.innerHTML = '';
}

function removeBtnClass () {
    refs.loadMoreBtn.classList.remove('is-hidden')
}

function addBtnClass () {
    refs.loadMoreBtn.classList.add('is-hidden')
}

function onInputChange(e) {
    clearMarkup()
    addBtnClass()
    apiService.query = e.target.value.trim();
    if(!apiService.query) {return clearMarkup()}
    apiService.fetchImage()
    .then(data => { if (data.length === 0 || data.length < 12) {return addMarkup(data)};
    addMarkup(data), removeBtnClass()
})
}

function onLoadMore() {  
    apiService.fetchImage().then(data => 
        {if(data.length === 0 || data.length < 12) {addBtnClass();};
        addMarkup(data), imageScroll ()      
})}

function imageScroll () {
    refs.gallery.scrollIntoView({
        behavior: 'smooth',
        block: 'end',
      })   
}

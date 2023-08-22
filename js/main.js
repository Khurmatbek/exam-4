const elForm = document.querySelector('.js-form');
const elInputName = document.querySelector('.js-search');
const elInputNumber = document.querySelector('.js-number');
const elInputLastNumber = document.querySelector('.js-number-last');
const elList = document.querySelector('.movies__list');
const icon = document.querySelector('.header__icon');
const SecList = document.querySelector('.header__second-list');
const Noneitem = document.querySelector('.header__icon-book');
const Eror = document.querySelector('.header__icon-desc');
const Myfunction = function (element) {
	elList.innerHTML = '';
	element.forEach(function (element) {
		let Item = document.createElement('li');
		Item.classList.add('movies__item');
		let imgBox = document.createElement('div');
		imgBox.classList.add('movies__img-box');
		let image = document.createElement('img');
		image.classList.add('movies__img');
		let textdiv = document.createElement('div');
		textdiv.classList.add('movies__textdiv');
		let title = document.createElement('h3');
		title.classList.add('movies__title');
		let year = document.createElement('p');
		year.classList.add('movies__year');
		let datalis = document.createElement('details');
		datalis.classList.add('movies__detalis');
		let datalistext = document.createElement('p');
		datalistext.classList.add('movies__detalis-text');
		let summary = document.createElement('summary');
		summary.classList.add('movies__summmary');
		let lastbox = document.createElement('div');
		lastbox.classList.add('movies__last-box');
		let rating = document.createElement('span');
		rating.classList.add('movies__rating');
		let language = document.createElement('span');
		language.classList.add('movies__language');
		let movieslinkbox = document.createElement('div');
		movieslinkbox.classList.add('movies__link-box');
		let movieslink = document.createElement('a');
		movieslink.classList.add('movies__link');
		let bookmark = document.createElement('button');
		bookmark.classList.add('bookmarking');
		bookmark.dataset.id = element.ytid;
		movieslinkbox.appendChild(movieslink);
		lastbox.append(rating, language);
		datalis.appendChild(summary);
		datalis.appendChild(datalistext);
		imgBox.appendChild(image);
		Item.append(imgBox, textdiv, lastbox, movieslinkbox, bookmark);
		lastbox.appendChild(rating, language);
		textdiv.append(title, year, datalis);
		movieslinkbox.appendChild(movieslink);
		elList.appendChild(Item);
		image.setAttribute(
			'src',
			`http://i3.ytimg.com/vi/${element.ytid}/hqdefault.jpg`,
		);
		image.setAttribute('width', '220', 'heigh', '400');
		title.textContent = `${element.Title}`;
		year.textContent = `${element.movie_year}`;
		datalistext.textContent = `${element.summary}`;
		summary.textContent = `summary`;
		movieslink.textContent = `Movies more ...   `;
		movieslink.setAttribute(
			'href',
			`https://www.imdb.com/title/${element.imdb_id}/`,
		);
		movieslink.setAttribute('target', '_blank');
		rating.textContent = `${element.imdb_rating}`;
		language.textContent = `${element.language}`;
	});
};
Myfunction(movies);
elInputName.addEventListener('keyup', function (evt) {
	evt.preventDefault();
	const elInputNameValeu = elInputName.value.trim();
	const filterArr = movies.filter((item) => {
		if (
			item.Title.toLocaleLowerCase().indexOf(
				elInputNameValeu.toLocaleLowerCase(),
			) != -1
		) {
			return item;
		}
	});
	Myfunction(filterArr);
});
elForm.addEventListener('submit', function (evt) {
	evt.preventDefault();
	const elInputNumberValue = Number(elInputNumber.value.trim());
	const elInputNumberLastValue = Number(elInputLastNumber.value.trim());
	const newFiltermovies = movies.filter(function (item) {
		if (
			elInputNumberValue <= item.movie_year &&
			elInputNumberLastValue == 0
		) {
			return item;
		} else if (
			elInputNumberLastValue >= item.movie_year &&
			elInputNumberValue == 0
		) {
			return item;
		} else if (
			elInputNumberValue <= item.movie_year &&
			elInputNumberLastValue >= item.movie_year
		) {
			return item;
		}
	});
	Myfunction(newFiltermovies);
});

let bookArr = JSON.parse(localStorage.getItem('bookmark') || '[]');
localStorage.setItem('bookmark', JSON.stringify(bookArr));
console.log(bookArr);
bookmayfunc(bookArr);
elList.addEventListener('click', (evt) => {
	if (evt.target.matches('.bookmarking')) {
		const BtnID = evt.target.dataset.id;
		const finded = movies.find((item) => {
			return item.ytid == BtnID;
		});
		bookArr.push(finded);
		localStorage.setItem('bookmark', JSON.stringify(bookArr));
		Eror.classList.add('error');
		bookmayfunc(bookArr);
	}
});

function bookmayfunc(last) {
	Noneitem.innerHTML = '';
	last.forEach((item) => {
		let div = document.createElement('div');
		div.classList.add('movies__img-box');
		div.style.marginBottom = '20px';
		let bookimg = document.createElement('img');
		bookimg.classList.add('movies__img');
		let BookLinkBox = document.createElement('div');
		BookLinkBox.classList.add('movies__link-box');
		let BookLink = document.createElement('a');
		BookLink.classList.add('movies__link');
		let deleteBtn = document.createElement('button');
		deleteBtn.classList.add('delete');
		deleteBtn.dataset.id = item.ytid;
		div.appendChild(bookimg);
		BookLinkBox.appendChild(BookLink);
		Noneitem.append(div, BookLinkBox, deleteBtn);
		bookimg.setAttribute(
			'src',
			`http://i3.ytimg.com/vi/${item.ytid}/hqdefault.jpg`,
		);
		bookimg.setAttribute('width', '220', 'heigh', '400');
		BookLink.textContent = `Movies more ...   `;
		BookLink.setAttribute(
			'href',
			`https://www.imdb.com/title/${item.imdb_id}/`,
		);
		BookLink.setAttribute('target', '_blank');
	});

}
bookmayfunc(bookArr);
Noneitem.addEventListener('click', (evt) => {
	if (evt.target.matches('.delete')) {
		const DeletID = evt.target.dataset.id;
		const FindDelete = bookArr.findIndex((item) => {
			return item.ytid == DeletID;
		});
		bookArr.splice(FindDelete, 1);
		bookmayfunc(bookArr);
		localStorage.setItem('bookmark', JSON.stringify(bookArr));
	}
});
icon.addEventListener('click', (evt) => {
	Noneitem.classList.toggle('none');
});

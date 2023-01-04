'use strict';
const searchBar = document.querySelector('.search__bar'),
	searchContent = document.querySelector('.search__content'),
	searchBtn = document.querySelector('button.fa-search'),
	resultContainer = document.querySelector('.result__container'),
	playBtn = document.querySelector('.fa-volume-up'),
	audio = document.querySelector('audio'),
	searchText = document.querySelector('.search__text'),
	phoneticsText = document.querySelector('.phonetics__text'),
	definitionEl = document.querySelector('.definition'),
	synAndAntoEl = document.querySelector('.synonyms__antonyms'),
	previousPageBtn = document.querySelector('.previous__btn'),
	typeContainer = document.querySelector('.type__container'),
	typeBtn = document.querySelectorAll('.type__btn'),
	interDefinitionheaderEl = document.querySelector('.definition__text'),
	nounDefinitionheaderEl = document.querySelector('.noun__definition__text'),
	verbDefinitionheaderEl = document.querySelector('.verb__definition__text'),
	mainDefinitionEl = document.querySelector('.definition__text div'),
	interjectionContent = document.querySelector('.interjection'),
	nounContent = document.querySelector('.noun'),
	verbContent = document.querySelector('.verb'),
	contents = document.querySelectorAll('.content'),
	interjectionText = document.querySelector('.interjection__definition'),
	interjectNumOfDefs = document.querySelector('.inter__num'),
	nounNumofDefs = document.querySelector('.noun_num'),
	verbNumofDefs = document.querySelector('.verb__num'),
	errorContainer = document.querySelector('.error__container'),
	nounWordExample = document.querySelector('.noun__word__example'),
	verbWordExample = document.querySelector('.verb__word__example'),
	interWordExample = document.querySelector('.inter__word__example'),
	errorBtn = document.querySelector('.error__btn');

searchBtn.addEventListener('click', () => {
	let searchValue = searchBar.value;
	if (!searchBar.value) return;

	(async function () {
		let url = `https://api.dictionaryapi.dev/api/v2/entries/en/`;
		let resp = await fetch(`${url}${searchValue}`);
		let data = await resp.json().catch(() => {
			errorContainer.classList.toggle('hidden');
		});
		if(resp.status === 404){
			errorContainer.classList.toggle('hidden');
		}
		let noun = data[0].meanings;
		let phonetics = data[0].phonetics;
		// console.log(noun);
		let phoneticsTextData = phonetics[0].text || phonetics[1].text || phonetics[2].text;
		let pronounceTextData = phonetics[0].audio || phonetics[1].audio || phonetics[2].audio;
		let nounDefinition = noun[0].definitions[0].definition;
		// changing HTML
		phoneticsText.innerHTML = phoneticsTextData;
		audio.src = pronounceTextData;
		let nounDefs = data?.[0].meanings[0]?.definitions[0].definition || 'Not Found';
		// FOR NOUN SECTION
		if (typeof nounDefs === 'object') {
			nounNumofDefs.innerHTML = nounDefs.length;
			for (let i = 0; i < nounDefs.length; i++) {
				nounDefinitionheaderEl.insertAdjacentHTML(
					'beforebegin',
					`<div class="definition__text">
				<span class="index">${i + 1} </span> ${nounDefs[i]}
			</div>`
				);
			}
		} else {
			nounNumofDefs.innerHTML = '';
			nounDefinitionheaderEl.insertAdjacentHTML(
				'beforebegin',
				`<div class="definition__text">
			<span class="index"></span> ${nounDefs}
		</div>`
			);
		}
		nounWordExample.innerHTML = `<h2>EXAMPLE</h2> <br><h3>${
			data?.[0].meanings[0]?.definitions[0]?.example || 'Not Found'
		}</h3>`;
		// FOR VERB SECTION

		let verbDefs = data?.[0].meanings[1]?.definitions[0].definition || 'Not Found';

		if (typeof verbDefs === 'object') {
			for (let i = 0; i < verbDefs.length; i++) {
				verbNumofDefs.innerHTML = verbDefs.length;
				verbDefinitionheaderEl.insertAdjacentHTML(
					'beforebegin',
					`<div class="definition__text">
				<span class="index">${i + 1} </span> ${verbDefs[i]}
			</div>`
				);
				// console.log(nounDefs[i].definition);
			}
		} else {
			verbNumofDefs.innerHTML = '';
			verbDefinitionheaderEl.insertAdjacentHTML(
				'beforebegin',
				`<div class="definition__text">
			<span class="index"></span> ${verbDefs}
		</div>`
			);
		}
		verbWordExample.innerHTML = `<h2>EXAMPLE</h2> <br><h3>${
			data?.[0].meanings[1]?.definitions[0]?.example || 'Not Found'
		}</h3>`;
		// FOR INTERJECTION SECTION
		let interjectionDefs = data?.[0].meanings[2]?.definitions[0].definition || 'Not Found';
		if (typeof interjectionDefs === 'object') {
			for (let i = 0; i < verbDefs.length; i++) {
				interjectNumOfDefs.innerHTML = verbDefs.length;
				interDefinitionheaderEl.insertAdjacentHTML(
					'beforebegin',
					`<div class="definition__text">
				<span class="index">${i + 1} </span> ${interjectionDefs[i]}
			</div>`
				);
			}
		} else {
			interjectNumOfDefs.innerHTML = '';
			interDefinitionheaderEl.insertAdjacentHTML(
				'beforebegin',
				`<div class="definition__text">
			<span class="index"></span> ${interjectionDefs}
		</div>`
			);
		}
		interWordExample.innerHTML = `<h2>EXAMPLE</h2> <br><h3>${
			data?.[0].meanings[2]?.definitions[0]?.example || 'Not Found'
		}</h3>`;
		typeContainer.addEventListener('click', e => {
			const clickedBtn = e.target,
				clickedBtnData = clickedBtn.dataset.type;

			contents.forEach(content => content.classList.remove('active__content'));
			document.querySelector(`.${clickedBtnData}`).classList.add('active__content');

			typeBtn.forEach(btn => btn.classList.remove('active'));
			clickedBtn.classList.toggle('active');
		});
	})();

	resultContainer.classList.toggle('hidden');
	searchContent.classList.toggle('hidden');
	searchText.innerHTML = searchBar.value.toLowerCase();
	// clear search bar input
	searchBar.value = '';
});

playBtn.addEventListener('click', () => {
	audio.play()
});

previousPageBtn.addEventListener('click', () => {
	nounDefinitionheaderEl.innerHTML = '';
	location.reload(0);

	resultContainer.classList.toggle('hidden');
	searchContent.classList.toggle('hidden');
});
errorBtn.addEventListener('click', () => {
	nounDefinitionheaderEl.innerHTML = '';
	location.reload(0);

	resultContainer.classList.toggle('hidden');
	searchContent.classList.toggle('hidden');
});

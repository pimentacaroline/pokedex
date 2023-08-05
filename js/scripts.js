// list of pokemons loaded from an API
let pokemonRepository = (function () {

	let pokemonList = [];

	let apiUrl = 'https://pokeapi.co/api/v2/pokemon/?limit=150';

	function add(pokemon) {
		pokemonList.push(pokemon);
	}

	function getAll() {
		return pokemonList;
	}

	function addListItem(pokemon) {
		let pokemonList = document.querySelector('.pokemon-list');
		let listItem = document.createElement('li');
		let button = document.createElement('button');

		listItem.classList.add('list-group-item', 'col-sm-4', 'col-lg-2');
		button.innerText = pokemon.name;
		button.classList.add('btn', 'btn-primary', 'btn-block', 'capitalize-first-letter');
		button.setAttribute('data-toggle', 'modal');
		button.setAttribute('data-target', '#exampleModal');
		button.addEventListener('click', function (event) {
			showDetails(pokemon);
		})

		listItem.appendChild(button);
		pokemonList.appendChild(listItem);
	}

	function showDetails(pokemon) {
		pokemonRepository.loadDetails(pokemon).then(function () {
			console.log(pokemon);
			showModal(pokemon);
		});
	}

	function loadList() {
		return fetch(apiUrl).then(function (response) {
			return response.json();
		}).then(function (json) {
			json.results.forEach(function (item) {
				let pokemon = {
					name: item.name,
					detailsUrl: item.url
				};
				add(pokemon);
			});
		}).catch(function (e) {
			console.error(e);
		})
	}

	function loadDetails(item) {
		let url = item.detailsUrl;
		return fetch(url).then(function (response) {
			return response.json();
		}).then(function (details) {
			item.imageUrlFront = details.sprites.front_default;
			item.imageUrlBack = details.sprites.back_default;
			item.height = details.height;
			item.weight = details.weight;
			item.types = details.types.map((type) => type.type.name);
			item.abilities = details.abilities.map((ability) => ability.ability.name);
		}).catch(function (e) {
			console.error(e);
		});
	}

	//show the modal content
	function showModal(item) {
		let modalBody = document.querySelector(".modal-body");
		let modalTitle = document.querySelector(".modal-title");
		modalTitle.innerHTML = "";
		modalBody.innerHTML = "";

		let nameElement = document.createElement("h1");
		nameElement.textContent = item.name;
		nameElement.classList.add("capitalize-first-letter");

		let imageElementFront = document.createElement("img");
		imageElementFront.classList.add("modal-img");
		imageElementFront.style.width = "50%";
		imageElementFront.src = item.imageUrlFront;

		let imageElementBack = document.createElement("img");
		imageElementBack.classList.add("modal-img");
		imageElementBack.style.width = "50%";
		imageElementBack.src = item.imageUrlBack;

		let heightElement = document.createElement("p");
		heightElement.textContent = "Height : " + item.height;

		let weightElement = document.createElement("p");
		weightElement.textContent = "Weight : " + item.weight;

		let typesElement = document.createElement("p");
		typesElement.textContent = "Types : " + item.types.join(", ");

		let abilitiesElement = document.createElement("p");
		abilitiesElement.textContent = "Abilities : " + item.abilities.join(", ");

		modalTitle.appendChild(nameElement);
		modalBody.appendChild(imageElementFront);
		modalBody.appendChild(imageElementBack);
		modalBody.appendChild(heightElement);
		modalBody.appendChild(weightElement);
		modalBody.appendChild(typesElement);
		modalBody.appendChild(abilitiesElement);
	}

	return {
		add: add,
		getAll: getAll,
		addListItem: addListItem,
		loadList: loadList,
		loadDetails: loadDetails,
		showDetails: showDetails,
	};
})();

pokemonRepository.loadList().then(function () {
	pokemonRepository.getAll().forEach(function (pokemon) {
		pokemonRepository.addListItem(pokemon);
	});
});

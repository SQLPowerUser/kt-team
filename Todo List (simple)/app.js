+function () {
	'use strict';

	function QS(el,s) {return el.querySelector(s);}

	const initData = `[
			{"text": "Task 99"},{"text": "Task 98"},{"text": "Task 97"},{"text": "Task 96"},{"text": "Task 95"},{"text": "Task 94"},{"text": "Task 93"},{"text": "Task 92"},{"text": "Task 91"},{"text": "Task 90"},{"text": "Task 89"},{"text": "Task 88"},{"text": "Task 87"},{"text": "Task 86"},{"text": "Task 85"},{"text": "Task 84"},{"text": "Task 83"},{"text": "Task 82"},{"text": "Task 81"},{"text": "Task 80"},{"text": "Task 79"},{"text": "Task 78"},{"text": "Task 77"},{"text": "Task 76"},{"text": "Task 75"},{"text": "Task 74"},{"text": "Task 73"},{"text": "Task 72"},{"text": "Task 71"},{"text": "Task 70"},
			{"text": "Task 69"},{"text": "Task 68"},{"text": "Task 67"},{"text": "Task 66"},{"text": "Task 65"},{"text": "Task 64"},{"text": "Task 63"},{"text": "Task 62"},{"text": "Task 61"},{"text": "Task 60"},{"text": "Task 59"},{"text": "Task 58"},{"text": "Task 57"},{"text": "Task 56"},{"text": "Task 55"},{"text": "Task 54"},{"text": "Task 53"},{"text": "Task 52"},{"text": "Task 51"},{"text": "Task 50"},{"text": "Task 49"},{"text": "Task 48"},{"text": "Task 47"},{"text": "Task 46"},{"text": "Task 45"},{"text": "Task 44"},{"text": "Task 43"},{"text": "Task 42"},{"text": "Task 41"},{"text": "Task 40"},
			{"text": "Task 39"},{"text": "Task 38"},{"text": "Task 37"},{"text": "Task 36"},{"text": "Task 35"},{"text": "Task 34"},{"text": "Task 33"},{"text": "Task 32"},{"text": "Task 31"},{"text": "Task 30"},{"text": "Task 29"},{"text": "Task 28"},{"text": "Task 27"},{"text": "Task 26"},{"text": "Task 25"},{"text": "Task 24"},{"text": "Task 23"},{"text": "Task 22"},{"text": "Task 21"},{"text": "Task 20"},{"text": "Task 19"},{"text": "Task 18"},{"text": "Task 17"},{"text": "Task 16"},{"text": "Task 15"},{"text": "Task 14"},{"text": "Task 13"},{"text": "Task 12"},
			{"text": "Длинный текст, общий список задач должен прокручиваться. Длинный текст, общий список задач должен прокручиваться. Длинный текст, общий список задач должен прокручиваться. Длинный текст, общий список задач должен прокручиваться. Длинный текст, общий список задач должен прокручиваться. Длинный текст, общий список задач должен прокручиваться. Длинный текст, общий список задач должен прокручиваться. Длинный текст, общий список задач должен прокручиваться. Длинный текст, общий список задач должен прокручиваться. Длинный текст, общий список задач должен прокручиваться. Длинный текст, общий список задач должен прокручиваться. Длинный текст, общий список задач должен прокручиваться. Длинный текст, общий список задач должен прокручиваться. Длинный текст, общий список задач должен прокручиваться. Длинный текст, общий список задач должен прокручиваться. Длинный текст, общий список задач должен прокручиваться. Длинный текст, общий список задач должен прокручиваться. Длинный текст, общий список задач должен прокручиваться. Длинный текст, общий список задач должен прокручиваться. Длинный текст, общий список задач должен прокручиваться. Длинный текст, общий список задач должен прокручиваться. Длинный текст, общий список задач должен прокручиваться. Длинный текст, общий список задач должен прокручиваться. Длинный текст, общий список задач должен прокручиваться. Длинный текст, общий список задач должен прокручиваться."},
			{"text": "Task 10"},{"text": "Task 9"},{"text": "Task 8"},{"text": "Task 7"},{"text": "Task 6"},{"text": "Task 5"},{"text": "Task 4"},{"text": "Task 3"},{"text": "Task 2"}, {"text": "Task 1"},
			{"text": "Несложная задача"},
			{"text": "Лёгкая задача"},
			{"text": "Очень большая и сложная задача, которую необходимо обсудить с коллегами"},
			{"text": "Простая задача"}
		]`;

	const store = new Vuex.Store({
		state: {
			pageNumber: 0,
			size: 10,
			notes: [],
		},

		getters: {
			notesReverse(state) {
				return state.notes.map( (el, i, arr) =>
					({idx: arr.length - i, text: el.text})
				).reverse();
			},
			pageCount(state) {
				return Math.ceil(state.notes.length / state.size);
			},
		}, // getters

		mutations: {
			loadInit(state, note) {
				state.notes = JSON.parse(initData);
			},

			changePage(state, page) {
				state.pageNumber = page-1;
			},
			nextPage(state) {
				state.pageNumber++;
			},

			prevPage(state) {
				state.pageNumber--;
			},

			addNote(state, note) {
				state.notes.push({text: note});
			},
			deleteNote(state, idx) {
				state.notes.splice(-idx, 1);
			},
		}, // mutations

		actions: {
			loadInit({commit}) {
				commit('loadInit');
			},
			addNote({commit}, note) {
				commit('addNote', note);
			}
		} // actions
	}); // Vuex.Store


	/***********************************************************************************************/
	Vue.component('todo', {
		template: '#todo-template',
		data() {
			return {
				newNote: '',
				showEdit: false
			}
		},

		computed: {
			paginatedNotes() {
				let start = store.state.pageNumber * store.state.size,
				    end = start + store.state.size;
				return store.getters.notesReverse.slice(start, end);
			},
			trimNote() {
				return this.newNote.trim();
			}
		}, // computed

		methods: {
			addCard() {
				if (!this.trimNote) {return;}
				store.dispatch('addNote', this.trimNote);
				store.commit('changePage', 1);
				this.newNote = '';
			},
			deleteNote(idx) {
				store.commit('deleteNote', idx);
			},
		},
	}); // Vue.component('todo')


	/***********************************************************************************************/
	Vue.component('navigation', {
		template: '#navigation-template',
		props: {
			pageRange: {
				type: Number,
				default: 2
			}
		}, // props

		computed: {
			pageCount() {
				return store.getters.pageCount;
			},
			current() {
				return store.state.pageNumber + 1;
			},
			rangeStart() {
				let start = this.current - this.pageRange;
				return (start > 0) ? start : 1;
			},
			rangeEnd() {
				let end = this.current + this.pageRange;
				return (end < this.pageCount) ? end : this.pageCount;
			},
			pages() {
				let pages = [];
				for(let i = this.rangeStart; i <= this.rangeEnd; i++) {
					pages.push(i);
				}
				return pages;
			}
		}, //computed

		methods: {
			changePage: function(page) {
				store.commit('changePage', page);
			},
			nextPage() {
				store.commit('nextPage');
			},
			prevPage() {
				store.commit('prevPage');
			},
			hasFirst: function() {
				return this.rangeStart !== 1
			},
			hasLast: function() {
				return this.rangeEnd < this.pageCount
			},
			hasPrev: function() {
				return this.current > 1
			},
			hasNext: function() {
				return this.current < this.pageCount
			}
		}, // methods
	}); // Vue.component('navigation')


	/***********************************************************************************************/
	let appV = new Vue({
		el: '#appV',
		store,
	});

	store.dispatch('loadInit');
}();

+function() {
	'use strict';

	function gid(i) {return document.getElementById(i);}
	function QS(el,s) {return el.querySelector(s);}
	function CEL(s) {return document.createElement(s);}
	function ACH(p,c) {p.appendChild(c);}

	function getUrlVars(url) {
		let vars = {};
		let parts = url.replace(/[?&]+([^=&]+)=([^&]*)/gi, function(m,key,value) {
			vars[key] = value;
		});
		return vars;
	}

	function goPage(pn) {
		window.location.href = window.location.href.split('?')[0] + `?page=${pn}`;
	}

	function showModal(el) {
		if (!gid('modal-over')) {
			let fogDiv = CEL('div');
			fogDiv.id = 'modal-over';
			fogDiv.onmousedown = function() {return false};
			ACH(document.body, fogDiv);
		}
		el.style.display = 'block';
	}

	function hideModal(el) {
		try {
			el.style.display = 'none';
			gid('modal-over').remove();
		} catch (e) {};
	}


	const loading = gid('loading');


	function showModalLoading() {
		gid('appV').style.visibility = 'hidden';
		showModal(loading);
	}

	function hideModalLoading() {
		hideModal(loading);
		gid('appV').style.visibility = 'visible';
	}

	function errF(er) {
		hideModalLoading();
		gid('appV').innerHTML = er;
	}


	/*************************************************************************************/
	showModalLoading();


	const fbConfig = {
		apiKey: "AIzaSyCX7iHElhb61JZ03xi9foY2DHv6yrZ7MA0",
		authDomain: "myproject-01-63778.firebaseapp.com",
		databaseURL: "https://myproject-01-63778.firebaseio.com",
		projectId: "myproject-01-63778",
		storageBucket: "",
		messagingSenderId: "630828608997",
		appId: "1:630828608997:web:579cd01cce7ea8a2e2130c"
	};

	firebase.initializeApp(fbConfig);
	const dbRef = firebase.firestore().collection('notes');
	/*************************************************************************************/


	if (getUrlVars(window.location.href)['restoreDB']) {
		restoreDB();
		return;
	}

	function restoreDB() {
		document.title = 'Todo List (Restore database)';
		let arrId = [], cnt = 1;

		dbRef.get().then(function(qs) {
			let size = qs.size;
			qs.forEach( el => {
				arrId.push(el.id);
			});
			+function delDoc(docId) {
				if (!docId) {
					addDocs();
					return;
				}
				dbRef.doc(docId).delete().then(function() {
					loading.textContent = 'Deleting: ' + Math.round(cnt*100/size) + '%';
					cnt++;
					delDoc(arrId.shift());
				});
			}(arrId.shift());
		});

		function addDocs() {
			const initData = `[
					{"text": "Task 99"},{"text": "Task 98"},{"text": "Task 97"},{"text": "Task 96"},{"text": "Task 95"},{"text": "Task 94"},{"text": "Task 93"},{"text": "Task 92"},{"text": "Task 91"},{"text": "Task 90"},{"text": "Task 89"},{"text": "Task 88"},{"text": "Task 87"},{"text": "Task 86"},{"text": "Task 85"},{"text": "Task 84"},{"text": "Task 83"},{"text": "Task 82"},{"text": "Task 81"},{"text": "Task 80"},{"text": "Task 79"},{"text": "Task 78"},{"text": "Task 77"},{"text": "Task 76"},{"text": "Task 75"},{"text": "Task 74"},{"text": "Task 73"},{"text": "Task 72"},{"text": "Task 71"},{"text": "Task 70"},
					{"text": "Task 69"},{"text": "Task 68"},{"text": "Task 67"},{"text": "Task 66"},{"text": "Task 65"},{"text": "Task 64"},{"text": "Task 63"},{"text": "Task 62"},{"text": "Task 61"},{"text": "Task 60"},{"text": "Task 59"},{"text": "Task 58"},{"text": "Task 57"},{"text": "Task 56"},{"text": "Task 55"},{"text": "Task 54"},{"text": "Task 53"},{"text": "Task 52"},{"text": "Task 51"},{"text": "Task 50"},{"text": "Task 49"},{"text": "Task 48"},{"text": "Task 47"},{"text": "Task 46"},{"text": "Task 45"},{"text": "Task 44"},{"text": "Task 43"},{"text": "Task 42"},{"text": "Task 41"},{"text": "Task 40"},
					{"text": "Task 39"},{"text": "Task 38"},{"text": "Task 37"},{"text": "Task 36"},{"text": "Task 35"},{"text": "Task 34"},{"text": "Task 33"},{"text": "Task 32"},{"text": "Task 31"},{"text": "Task 30"},{"text": "Task 29"},{"text": "Task 28"},{"text": "Task 27"},{"text": "Task 26"},{"text": "Task 25"},{"text": "Task 24"},{"text": "Task 23"},{"text": "Task 22"},{"text": "Task 21"},{"text": "Task 20"},{"text": "Task 19"},{"text": "Task 18"},{"text": "Task 17"},{"text": "Task 16"},{"text": "Task 15"},{"text": "Task 14"},{"text": "Task 13"},{"text": "Task 12"},
					{"text": "Длинный текст, общий список задач должен прокручиваться. Длинный текст, общий список задач должен прокручиваться. Длинный текст, общий список задач должен прокручиваться. Длинный текст, общий список задач должен прокручиваться. Длинный текст, общий список задач должен прокручиваться. Длинный текст, общий список задач должен прокручиваться. Длинный текст, общий список задач должен прокручиваться. Длинный текст, общий список задач должен прокручиваться. Длинный текст, общий список задач должен прокручиваться. Длинный текст, общий список задач должен прокручиваться. Длинный текст, общий список задач должен прокручиваться. Длинный текст, общий список задач должен прокручиваться. Длинный текст, общий список задач должен прокручиваться. Длинный текст, общий список задач должен прокручиваться. Длинный текст, общий список задач должен прокручиваться. Длинный текст, общий список задач должен прокручиваться. Длинный текст, общий список задач должен прокручиваться. Длинный текст, общий список задач должен прокручиваться. Длинный текст, общий список задач должен прокручиваться. Длинный текст, общий список задач должен прокручиваться. Длинный текст, общий список задач должен прокручиваться."},
					{"text": "Task 10"},{"text": "Task 9"},{"text": "Task 8"},{"text": "Task 7"},{"text": "Task 6"},{"text": "Task 5"},{"text": "Task 4"},{"text": "Task 3"},{"text": "Task 2"}, {"text": "Task 1"},
					{"text": "Несложная задача"},
					{"text": "Лёгкая задача"},
					{"text": "Очень большая и сложная задача, которую необходимо обсудить с коллегами"},
					{"text": "Простая задача"}
				]`;

			let arrData = JSON.parse(initData), size = arrData.length, cnt = 1;
			+function addNote(el) {
					if (!el) {
						goPage(1);
						return;
					}
					dbRef.add({text: el.text, isCompleted: false, createTime: new Date()}).then(function() {
						loading.textContent = 'Adding: ' + Math.round(cnt*100/size) + '%';
						cnt++;
						addNote(arrData.shift());
					});
			}(arrData.shift());
		} // addDoc
	} // restoreDB



	/*************************************************************************************/
	const store = new Vuex.Store({
		state: {
			pageNumber: 0,
			pageSize: 10,
			dbSize: 0,
			fragment: []
		},

		getters: {
			pageCount(state) {
				return Math.ceil(state.dbSize / state.pageSize);
			},
		}, // getters

		mutations: {
			setDBsize(state, n) {
				state.dbSize = n;
			},

			setFragment(state, arr) {
				state.fragment = arr;
			},

			changePage(state, page) {
				state.pageNumber = page-1;
			}
		} // mutations
	}); // Vuex.Store


	/***********************************************************************************************/
	Vue.component('todo', {
		template: '#todo-template',
		data() {
			return {
				newText: '',
				currentText: '',
				docId: '',
				showEdit: false
			}
		},

		computed: {
			paginatedNotes() {
				return store.state.fragment;
			},
		}, // computed

		methods: {
			addNote() {
				let txt = this.newText.trim();
				if (!txt) {return;}
				showModalLoading();
				dbRef.add({text: txt, isCompleted: false, createTime: new Date()}).then(function() {
					goPage(1);
				}).catch(function(er) {
					errF(er);
				});
			},

			editNote(docId, docText) {
				showModal(gid('edit-window'));
				QS(gid('edit-window'), 'textarea').focus();
				this.docId = docId;
				this.currentText = docText;
			},

			updateNote() {
				let txt = this.currentText.trim();
				if (!txt) {return;}
				showModalLoading();
				dbRef.doc(this.docId).update({text: txt}).then(function() {
					goPage(store.state.pageNumber+1);
				}).catch(function(er) {
					errF(er);
				});
			},

			cancelNote() {
				hideModal(gid('edit-window'));
			},

			deleteNote(docId) {
				showModalLoading();
				dbRef.doc(docId).delete().then(function() {
					goPage(store.state.pageNumber+1);
				}).catch(function(er) {
					errF(er);
				});
			}
		} // methods
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
				goPage(page);
			},
			nextPage() {
				goPage(store.state.pageNumber + 2);
			},
			prevPage() {
				goPage(store.state.pageNumber);
			},
			hasFirst: function() {
				return this.rangeStart !== 1
			},
			hasDiffFirst: function() {
				return this.current - this.pageRange - 2 > 0
			},
			hasLast: function() {
				return this.rangeEnd < this.pageCount
			},
			hasDiffLast: function() {
				return this.current + this.pageRange + 2 <= this.pageCount
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


	dbRef.orderBy('createTime', 'desc').get().then(function(qs) {
		store.commit('setDBsize', qs.size);

		let pageNumber = getUrlVars(window.location.href)['page']^0;
		if (pageNumber < 1) {
			pageNumber = 1;
		}
		if (pageNumber > store.getters.pageCount) {
			pageNumber = store.getters.pageCount;
		}

		store.commit('changePage', pageNumber);
		let start = store.state.pageNumber * store.state.pageSize;

		let frag = dbRef.orderBy('createTime', 'desc')
						.startAt(qs.docs[start])
						.limit(store.state.pageSize);

		frag.get().then(function(el) {
			let arr = [];
			el.forEach( w => {
				arr.push({num: ++start, id: w.id, text: w.data().text, isCompleted: w.data().isCompleted});
			});
			store.commit('setFragment', arr);
			hideModalLoading();
		}).catch(function(er) {
			errF(er);
		});
	});
}();

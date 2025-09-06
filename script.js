const products = document.querySelector('.products');
const categorie = document.querySelector('.categorie');
const centerCheckbox = document.querySelector('.center-checkbox');
const cardStorege = JSON.parse(localStorage.getItem('cards')) || [];
const countCard = document.querySelector('.countCard');
const searchText = document.querySelector('.searchText');
const btnSearch = document.querySelector('.btnSearch');

let tele = 'Телевизоры';
let smartPhon = 'Смартфоны';
let laptop = 'Ноутбуки';


//let value = searchText.value.trim();
//    btnSearch.addEventListener('click', () => {
//        let value = searchText.value.trim().toLowerCase();
        
//        fetch(`http://localhost:4000/products/?categorie=${value}`)
//        .then(response => {
//           return response.json();
//        })
//        .then(data => {
//         console.log(data);
//           const saveStorege = localStorage.setItem('products', JSON.stringify(data));
//           renderCard();
//           searchText.value = '';
//        })
//        .catch(err => {
//           console.log('Error...' + err);
//        });

//});


fetch('database.json')
   .then(response => {
      return response.json();
   })
   .then(data => {
      localStorage.setItem('products', JSON.stringify(data));
      renderCard();
   })
   .catch(err => {
      alert('Error' + err);
   })

const totalCard = cardStorege.reduce((prev, item) => {
 return prev + item.quantity;
},0);

countCard.textContent = totalCard;

function renderCard() {
    products.innerHTML = '';
    const getCardStorege = JSON.parse(localStorage.getItem('products') || '[]');
    getCardStorege.forEach((product, index) => {
        const {id, img, title, price, categorie, quantity} = product;
        let priTolocale = price.toLocaleString('ru-Ru');
      
        const card = document.createElement('div');
        card.className = 'card';
        card.setAttribute('id', id);

        const spanCategor = document.createElement('span');
        spanCategor.className = 'cardCategorie';
        spanCategor.textContent = `${categorie}`;
        
        const imgCard = document.createElement('img');
        imgCard.className = 'imgcard';
        imgCard.src = `${img}`;

        const h3title = document.createElement('h3');
        h3title.className = 'title';
        h3title.textContent = `${title}`;

        const prices = document.createElement('p');
        prices.className = 'price';
        prices.textContent = `${priTolocale}` + ' ₸';
        
        const btnAdd = document.createElement('button');
        btnAdd.className = 'btnAdd';
        const inCart = JSON.parse(localStorage.getItem('cards')) || [];
        const checkCart = inCart.find(item => item.id == id);
        if(checkCart) {
            btnAdd.textContent = 'В корзине';
            btnAdd.style.backgroundColor = 'black';
        } else {
            btnAdd.className = 'btnAdd';
            btnAdd.textContent = 'В корзину';
        };
        
        card.appendChild(spanCategor);
        card.appendChild(imgCard);
        card.appendChild(h3title);
        card.appendChild(prices);
        card.appendChild(btnAdd);
        products.appendChild(card);
        
    });
};

renderCard();

document.addEventListener('click', (e) => {
    if(e.target.classList.contains('btnAdd')) {
        const cardElem = e.target.closest('.card');
        const id = cardElem.id;
        const img = cardElem.querySelector('.imgcard').src;
        const title = cardElem.querySelector('.title').textContent;
        const categorie = cardElem.querySelector('.cardCategorie').textContent;
        const prices = cardElem.querySelector('.price').textContent;
        const price = parseInt(prices.replace(/\s/g, ''),10);
        let carts = {id, img, title, categorie, price, quantity:1};

        const cardStorege = localStorage.getItem('cards') || '[]';
        const cards = JSON.parse(cardStorege);
        const existCard = cards.findIndex(item => item.id == id);
        if(existCard !== -1) {
            alert('Товар уже добален в корзину!');
        } else {
            cards.push(carts);
            localStorage.setItem('cards', JSON.stringify(cards));
            e.target.textContent = 'В корзине';
            e.target.style.backgroundColor = 'black';
            const totalCard = cards.reduce((prev, item) => {
                return prev + item.quantity;
            },0);
            countCard.textContent = totalCard;
        };

    };
});




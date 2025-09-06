const cardStorege = JSON.parse(localStorage.getItem('cards')) || [];
const cart = document.querySelector('.cart-cart');
const countCard = document.querySelector('.countCard');
const textCard = document.querySelector('.textCart');
const totals = document.querySelector('.totals');
const imgEmpty = document.querySelector('.imgEmpty');

function quntityPrice() {
    const total = cardStorege.reduce((pre, item) => {
        return pre + item.price * item.quantity;
    },0)
    const priceTotals = total.toLocaleString('kk-KZ');
    document.querySelector('.totalPrice').textContent = `${priceTotals}` + '₸';
};

function renderCart() {
    cart.innerHTML = '';
    textCard.innerHTML = '';
    if(cardStorege.length <= 0) {
       textCard.textContent = 'Ваша корзина пуста!';
       totals.style.display = 'none';
       imgEmpty.style.display = 'flex';
    } else {
       textCard.textContent = 'Ваша корзина';
       totals.style.display = 'flex';
       imgEmpty.style.display = 'none';
    };

    const totalCard = cardStorege.reduce((prev, item) => {
        return prev + item.quantity;
    },0);

    countCard.textContent = totalCard;

    if(cardStorege) {
        cardStorege.forEach((item, index) => {
            const {id, img, title, price, categorie, quantity} = item;
            const quntityPrice = price * quantity;
            const priceString = quntityPrice.toLocaleString('kk-KZ') + ' ₸';
            const cards = document.createElement('div');
            cards.className = 'cards';
            cards.setAttribute('id', id);
            cards.innerHTML = `
                <img src="${img}" alt="imgcard" class="imgcart">
                <div class="centerContent">
                <h3 class="titlecart">${title}</h3>
                <span class="pricecart">${priceString}</span>
                <div class="quantity">
                    <span class="minus" data-index="${index}">-</span>
                    <span class="valueQuantity">${quantity}</span>
                    <spn class="plus" data-index="${index}">+</spn>
                </div>
                <button class="btnDelete" data-index="${index}">X</button>
            `;
            cart.appendChild(cards);
        });
        quntityPrice();
    };
};

renderCart();

document.addEventListener('click', (e) => {
    const index = e.target.getAttribute('data-index');
    if(e.target.classList.contains('btnDelete')) {
       cardStorege.splice(index, 1);
    } else if(e.target.classList.contains('plus')) {
        cardStorege[index].quantity++;
    } else if(e.target.classList.contains('minus')) {
        cardStorege[index].quantity--;
        if(cardStorege[index].quantity <= 1) {
            cardStorege[index].quantity = 1;
        };
    };

    localStorage.setItem('cards', JSON.stringify(cardStorege));
    renderCart();
});






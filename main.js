const template = item => 
     `<li class="item">
        <img src="${item.image}" alt="${item.type}" class="item__thumbnail">
            <span class="item__description">${item.gender}, ${item.size}</span>
    </li>`;

function loadItems(){
    const items = fetch('data/data.json')
    .then(items => { // 성공 => then, 실패 => catch, then은 연쇄 가능
        return items.json(); // items(String)을 json 형식으로 읽어서 나오는 객체를 반환
    })
    .catch(() => {
        console.log("fetch error\n");
    })
    return items;
}

function displayItems(items){
    /*
    DOM (Document Object Model) : HTML 요소를 탐색하고 조작하는 API
    */
    const $list = document.querySelector('.items'); // 문서 요소 탐색 (태그, 클래스명, 아이디)

    $list.innerHTML = items.map(item => template(item)).join('');
}

function onClickButton(items, event){
    const key = event.target.dataset.key;
    const value = event.target.dataset.value;

    if(key == null || value == null) return;

    const filtered = items.filter(item => item[key] === value);
    displayItems(filtered);
}

function setEventListeners(items){
    const $logo = document.querySelector('.logo');
    const $buttons = document.querySelector('.buttons');

    $logo.addEventListener('click', () => {
        displayItems(items);
    });

    $buttons.addEventListener('click', event => {
        onClickButton(items, event);
    });
}

loadItems()
.then(loadedItems => {
    let items = loadedItems.items
    displayItems(items);
    setEventListeners(items);
})
.catch(() =>{
    console.log("load error\n");
});
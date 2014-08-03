function App() {
    var Gallery = {};

    var ulItems = document.getElementById('item-list')
    var itemId = 0;
    var cardsArr;
    var startIndex;

    function createButton(title, className, onClickFuncId, fatherId) {
        var button = document.createElement('button');
        button.className = className;
        button.setAttribute('type', 'button');
        button.textContent = title;
        button.dataset.funcId = onClickFuncId;

        button.dataset.fatherId = fatherId;
        return button;
    }

    function createDiv(className) {
        var divItem = document.createElement('div');
        divItem.className = className;
        return divItem;
    }


    Gallery.appendGalleryItem = function (url, title, alt) {
        var item = document.createElement('li');
        item.id = itemId;
        itemId++;
        var divItem = createDiv('gl-item grid');
        item.appendChild(divItem);
        var divHeader = createDiv('gl-item-header');

        var divContent = createDiv('gl-item-content');

        var divFooter = createDiv('gl-item-footer');

        divItem.appendChild(divHeader);
        divItem.appendChild(divContent);
        divItem.appendChild(divFooter);
        divHeader.textContent = title;
        divHeader.setAttribute('title', title);
        var img = new Image();
        img.dataset.funcId = 'center';

        img.className = 'gallery-images';
        img.setAttribute('alt', alt);
        divContent.appendChild(img);
        img.onerror = function(){
            this.setAttribute('src','http://static.tvtropes.org/pmwiki/pub/images/MagicCardBack.jpg')
            this.style['border-radius'] = '13px';
        }
        img.setAttribute('src', url);
        var buttonRemove = createButton('Remove', 'gl-item-footer-btn', 'remove', item.id);

        var buttonEdit = createButton('Edit', 'gl-item-footer-btn', 'edit', item.id);

        divFooter.appendChild(buttonRemove);
        divFooter.appendChild(buttonEdit);

        ulItems.appendChild(item);
        return item;
    }
    var functions = {
        remove : removeButton,
        edit : editButton,
        search : makeRequest,
        grid : grid,
        lines : list,
        center : centerImg
    }
    var centered= null;
    function centerImg(event){
        if (centered != null){
            centered.classList.remove('centered-img');
        }
        if (centered!=event.target)
            event.target.classList.add('centered-img');

        centered=event.target;
    }
    function grid(){
        $('li').css('display', 'inline-block');
        $('.gl-item').addClass('grid');
    }

    function list(){
        $('li').css('display', 'block');
        $('.gl-item').removeClass('grid');


    }
    var eventHandler = function(event){
        if (event.target.dataset.funcId !== undefined){
            functions[event.target.dataset.funcId](event);
        }
        event.stopPropagation();
        event.preventDefault();

    }
    document.body.addEventListener('click', eventHandler, false);
    document.body.addEventListener('submit', eventHandler, false);

    function removeButton(event) {
        var fatherId = event.target.dataset.fatherId;
        ulItems.removeChild(document.getElementById(fatherId));
    }

    function editButton(event) {

    }

    function makeRequest(event){
        var element = event.target;
        var input;
        while(element.className != 'header-form')
            element = event.target.parentNode;
        input = element.children[0];
//        console.log(input.value);
        if (!input.value)
            return;
        var xhr = new XMLHttpRequest();
        xhr.open('get', 'http://localhost:3001/search/'+input.value, true);
        xhr.onload = loadHandler;
        xhr.send();
    }

    function unique(arrOfObjects, key){
        var o = {};
        arrOfObjects.forEach(function(obj){
            o[obj[key]] = obj;
        });
        return Object.keys(o).map(function(k){
            return o[k];
        })
    }




    function exposeImages(length) {
        for (var i = startIndex; i < length; i++) {
            var currentObj = cardsArr[i];
            console.log(currentObj);
            gl.appendGalleryItem(currentObj['imgUrl'], currentObj['name'], currentObj['name']);


        }
        startIndex = length;
        var countElement = document.getElementById('count');
        countElement.textContent = 'Items: ' + startIndex + '/' + cardsArr.length;
    }

    function loadHandler(){
        console.log(this.responseText);
        try {
            ulItems.innerHTML='';
            var prop;
            var photosObj = JSON.parse(this.responseText);
            cardsArr = unique(photosObj, 'imageName');
            var length = Math.min(20, cardsArr.length);
            startIndex = 0;
            exposeImages(length, 0);
        }
        catch(e){
            alert(e);
        }
    }


    function showMore(){
        var length = Math.min(startIndex+20, cardsArr.length);
        exposeImages(length);
    }

    window.addEventListener('scroll', onScroll);

    function onScroll() {
        var body = document.body,
            html = document.documentElement;

        var height = Math.max( body.scrollHeight, body.offsetHeight,
            html.clientHeight, html.scrollHeight, html.offsetHeight );

        if (height <= document.body.scrollTop + window.innerHeight) {
            showMore();
        }
    }

    return Gallery;
}
var gl = new App();

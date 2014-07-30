function Gallery() {
    var Gallery = {};

    var ulItems = document.getElementById('item-list')
    var itemId = 0;

    function createButton(title, className, onClickFunc, fatherId) {
        var button = document.createElement('button');
        button.className = className;
        button.setAttribute('type', 'button');
        button.textContent = title;
        button.onclick = onClickFunc;
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
        var divItem = createDiv('gl-item');
        item.appendChild(divItem);
        var divHeader = createDiv('gl-item-header');

        var divContent = createDiv('gl-item-content');

        var divFooter = createDiv('gl-item-footer');

        divItem.appendChild(divHeader);
        divItem.appendChild(divContent);
        divItem.appendChild(divFooter);
        divHeader.textContent = title;
        var img = new Image();
        img.className = 'gallery-images';
        img.setAttribute('alt', alt);
        divContent.appendChild(img);
        img.setAttribute('src', url);
        var buttonRemove = createButton('Remove', 'gl-item-footer-btn', removeButton, item.id);

        var buttonEdit = createButton('Edit', 'gl-item-footer-btn', item.id);

        divFooter.appendChild(buttonRemove);
        divFooter.appendChild(buttonEdit);

        ulItems.appendChild(item);
        return item;
    }

    function removeButton(event) {
        var fatherId = event.target.dataset.fatherId;
        ulItems.removeChild(document.getElementById(fatherId));

    }

    return Gallery;
}
var gl = new Gallery();
gl.appendGalleryItem('http://dummyimage.com/200X142/822c00/fff.png', 'a', 'Image');
gl.appendGalleryItem('http://dummyimage.com/200X142/822c00/fff.png', 'b', 'Image');
gl.appendGalleryItem('http://dummyimage.com/200X142/822c00/fff.png', 'c', 'Image');
gl.appendGalleryItem('http://dummyimage.com/200X142/822c00/fff.png', 'd', 'Image');
gl.appendGalleryItem('http://dummyimage.com/200X142/822c00/fff.png', 'e', 'Image');
gl.appendGalleryItem('http://dummyimage.com/200X142/822c00/fff.png', 'f', 'Image');
gl.appendGalleryItem('http://dummyimage.com/200X142/822c00/fff.png', 'f', 'Image');
gl.appendGalleryItem('http://dummyimage.com/200X142/822c00/fff.png', 'f', 'Image');
gl.appendGalleryItem('http://dummyimage.com/200X142/822c00/fff.png', 'f', 'Image');
gl.appendGalleryItem('http://dummyimage.com/200X142/822c00/fff.png', 'f', 'Image');
gl.appendGalleryItem('http://dummyimage.com/200X142/822c00/fff.png', 'f', 'Image');
gl.appendGalleryItem('http://dummyimage.com/200X142/822c00/fff.png', 'f', 'Image');

////<li>
////    <div class="gl-item">
//        <div class="gl-item-header">
//                            {{Title}}
//        </div>
//        <div class="gl-item-content">
//            <img class="gallery-images" src="http://dummyimage.com/200X142/822c00/fff.png" alt="dolphin"/>
//        </div>
//        <div class="gl-item-footer">
//            <button class="gl-item-footer-btn" type="button">Remove</button>
//            <button class="gl-item-footer-btn" type="button">Edit</button>
//        </div>
//    </div>
//</li>
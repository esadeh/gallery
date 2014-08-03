

function jDom(context, exports) {

    function jDomItem(element) {
        this.element = element;
    }

    jDomItem.prototype.addClass = function (className) {
        this.element.classList.add(className);
        return this;
    };

    jDomItem.prototype.removeClass = function (className) {
        this.element.classList.remove(className);
        return this;
    };


    jDomItem.prototype.hasClass = function (className) {
        return this.element.classList.contains(className);
    };


    jDomItem.prototype.toggleClass = function (className) {
        return this.hasClass(className)? this.removeClass(className) : this.addClass(className);
    };

    jDomItem.prototype.addAttr = function (key, value) {
        this.element.setAttribute(key, value);
        return this;
    };
    jDomItem.prototype.removeAttr = function (key) {
        this.element.removeAttribute(key);
        return this;
    };

    jDomItem.prototype.hasAttr = function (key) {
        return this.element.hasAttribute(key);
    };

    jDomItem.prototype.clone = function (deep) {
        var element = this.element.cloneNode(deep)
        return new jDomItem(element);
    };

    jDomItem.prototype.on = function (event, func) {
        this.event.addEventListener(event,func, false);
    };

    jDomItem.prototype.off = function (event, func) {
        this.event.removeEventListener(event,func, false);
    };

    jDomItem.prototype.html = function (html) {
        if (html !== undefined){
            this.element.innerHTML = html;
            return this;
        }
        return this.element.innerHTML;
    };

    jDomItem.prototype.text = function (text) {
        if (text !== undefined){
            this.element.textContent = text;
            return this;
        }
        return this.element.textContent;
    };


    jDomItem.prototype.append = function (content) {
        if (typeof content === 'string' ){
            this.element.innerHTML += content;
        }
        else if(content instanceof Element){
            this.element.appendChild(content.cloneNode(true));
        }
        return this;
    };


    function insertBefore(element, content) {
        element.parentNode.insertBefore(content, element);
    }

    jDomItem.prototype.before = function (content) {
        if (typeof content === 'string' ){
            var div = document.createElement('div');
            div.innerHTML = content;
            while(div.firstChild){
                insertBefore(this.element, div.firstChild);
            }
        }
        else if(content instanceof Element){
            insertBefore(this.element, content.cloneNode(true));
        }
        return this;
    };

    function insertAfter(element, content) {
        element.parentNode.insertBefore(content, element.nextSibling);
    }
    jDomItem.prototype.after = function (content) {
        if (typeof content === 'string' ){
            var div = document.createElement('div');
            div.innerHTML = content;
            while(div.firstChild){
                insertAfter(this.element, div.firstChild);
            }
        }
        else if(content instanceof Element){
            insertAfter(this.element, content.cloneNode(true));
        }
        return this;
    };



    jDomItem.prototype.remove = function () {
        if (this.element) {
            this.element.parentNode.removeChild(this.element);
        }
        return this;
    };

    jDomItem.prototype.empty = function () {
        var myNode = this.element;
        while (myNode.firstChild) {
            myNode.removeChild(myNode.firstChild);
        }
        return this;
    };


    //////////////////////////////////////////////////////////////////////

    function jDOMCollection(jDomItems) {
        this.nodes = jDomItems||[];
    }
    jDOMCollection.prototype.addClass = function(className){
        return this.each(function(){
            this.addClass(className);
        });

    };

    jDOMCollection.prototype.removeClass = function(className){
        return this.each(function(){
            this.removeClass(className);
        });

    };

    jDOMCollection.prototype.hasClass = function(className){
        return this.nodes[0].hasClass(className);

    };

    jDOMCollection.prototype.toggleClass = function(className){
        return this.each(function(item){
            item.toggleClass(className);
        })
    };


    jDOMCollection.prototype.addAttr = function(key, value){
        return this.each(function(){
            this.addAttr(key, value);
        });

    };

    jDOMCollection.prototype.removeAttr = function(key){
        return this.each(function(){
            this.removeAttr(key);
        });
    };

    jDOMCollection.prototype.hasAttr = function(key){
        return this.nodes[0].hasAttr(key);
    };

    jDOMCollection.prototype.size = function(){
        return this.nodes.length;
    };

    jDOMCollection.prototype.clone = function(deep){
        return  this.map(function(item){
            return item.clone(deep)});
    };


    jDOMCollection.prototype.on = function(){
        return  this.each(jDomItem.prototype.on);
    };

    jDOMCollection.prototype.off = function(){
        return  this.each(jDomItem.prototype.off);
    };


    jDOMCollection.prototype.html = function(html){
        if (html !== undefined){
            return this.each(function(){
                this.html(html);
            })
        }
        return this.nodes[0].html();
    };


    jDOMCollection.prototype.text = function(text){
        if (text !== undefined){
            return this.each(function(){
                this.text(text);
            })
        }
        return this.nodes[0].text();
    };

    jDOMCollection.prototype.remove = function(){
        return  this.each(jDomItem.prototype.remove);
    };


    jDOMCollection.prototype.empty = function(){
        return  this.each(jDomItem.prototype.empty);
    };

    jDOMCollection.prototype.eq = function(index){
        if (this.nodes[index]) {
            var newArr = [this.nodes[index]];
            return new jDOMCollection(newArr);
        }
        return new jDOMCollection([]);
    };

    jDOMCollection.prototype.append = function(content){
        return this.each(function(item){
            item.append(content);
        });
    };


    jDOMCollection.prototype.before = function(content){
        return this.each(function(item){
            item.before(content);
        });
    };

    jDOMCollection.prototype.after = function(content){
        return this.each(function(item){
            item.after(content);
        });
    };


    jDOMCollection.prototype.css = function(key, value){
        return this.each(function(item){
            item.element.style[key] = value;
        });
    };

    jDOMCollection.prototype.children = function(){
        var arr = this.nodes.reduce(function(previousValue, currentValue){
            return previousValue.concat($.nodeListToArrayOfjDomItems(currentValue.element.children));
        },[]);
        return new jDOMCollection(arr);
    };


//    jDOMCollection.prototype.siblings = function(){
//        var arr = this.nodes.reduce(function(previousValue, currentValue){
//            return previousValue.concat($.nodeListToArrayOfjDomItems(currentValue.element.siblings));
//        },[]);
//        return new jDOMCollection(arr);
//    };

    jDOMCollection.prototype.next = function(){
        var arr = this.nodes.reduce(function(previousValue, currentValue){
            if (currentValue.element.nextSibling)
            {
                previousValue = previousValue.concat(new jDomItem(currentValue.element.nextSibling))
            }
            return previousValue;
        },[]);
        return new jDOMCollection(arr);
    };


    jDOMCollection.prototype.prev = function(){
        var arr = this.nodes.reduce(function(previousValue, currentValue){
            if (currentValue.element.previousSibling)
            {
                previousValue = previousValue.concat(new jDomItem(currentValue.element.previousSibling))
            }
            return previousValue;
        },[]);
        return new jDOMCollection(arr);
    };


    jDOMCollection.prototype.each = function (func) {
        this.nodes.forEach(function(item, i, arr){
            func.call(item, item, i, arr);

        });
        return this;
    };

    jDOMCollection.prototype.map = function (func) {
        var arr = this.nodes.map(function(item, i, arr){
            return func.call(item, item, i, arr);
        })
        return new jDOMCollection(arr);
    };

    jDOMCollection.prototype.filter = function () {};

    //////////////////////////////////////////////////////////////////////

    function $(selectorOrNode, root) {
        root = root || document;
        if (typeof selectorOrNode === 'string') {
            var nlist = root.querySelectorAll(selectorOrNode);
            return new jDOMCollection($.nodeListToArrayOfjDomItems(nlist));
        }
        else if(selectorOrNode instanceof Element) {
            return new jDOMCollection([new jDomItem(selectorOrNode)]);
        } else{
            throw new Error('TODO: implement more modes');
        }
    }

    $.is_jDomEntity = function(thing){
        return thing instanceof jDomItem || thing instanceof jDOMCollection;
    }

    $.nodeListToArrayOfjDomItems = function(nodeList){
        return Array.prototype.map.call(nodeList, function (element) {
            return new jDomItem(element);
        });
    }

    return context[exports] = $;

}

jDom(window, '$');


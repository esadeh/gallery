

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

    jDomItem.prototype.clone = function () {
        var element = this.element.cloneNode(true)
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



    //////////////////////////////////////////////////////////////////////

    function jDOMCollection(jDomItems) {
        this.nodes = jDomItems;
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
        this.nodes[0].toggleClass(className);
        return this;
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

    jDOMCollection.prototype.clone = function(){
        return  this.map(jDomItem.prototype.clone);
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
        } else {
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


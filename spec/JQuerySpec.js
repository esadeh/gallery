/**
 * Created by Eyal_Sadeh on 7/29/14.
 */
describe("JDom", function() {
    beforeEach(function () {
        var innerHtml = '<div>Test<ul></ul></div><div>Test2</div><button></button>';
        document.body.innerHTML = innerHtml;
    });


    it("should generate collection with 2 items", function () {
        var collection = $('div');
        expect(collection.nodes.length).toEqual(2);
    });

    it("should add class test and remove it", function () {
        var collection = $('div');
        expect(collection.addClass('test').nodes[0].element.className).toEqual('test');
        expect(collection.removeClass('test').nodes[1].element.className).toEqual('');
    });

    it("should add class test and remove it", function () {
        var collection = $('div');
        expect(collection.addClass('test').nodes[0].hasClass('test')).toBe(true);
        expect(collection.addClass('test2').nodes[0].hasClass('test3')).toBe(false);
        expect(collection.nodes[0].hasClass('test')).toBe(true);
    });


    it("should toggle class", function () {
        var collection = $('div');
        expect(collection.toggleClass('test').nodes[0].hasClass('test')).toBeTruthy();
        expect(collection.toggleClass('test').nodes[0].hasClass('test')).toBeFalsy();

    });


    it("should set attribute key = '5'", function () {
        var collection = $('div');
        collection = collection.addAttr('key', '5');
        expect(collection.nodes[0].element.getAttribute('key')).toEqual('5');
        expect(collection.nodes[1].element.getAttribute('key')).toEqual('5');

        expect(collection.hasAttr('key')).toBeTruthy();
        expect(collection.nodes[0].hasAttr('key')).toBeTruthy();
        expect(collection.nodes[1].hasAttr('key')).toBeTruthy();
        collection = collection.removeAttr('key');
        expect(collection.hasAttr('key')).toBeFalsy();
        expect(collection.nodes[0].hasAttr('key')).toBeFalsy();
        expect(collection.nodes[1].hasAttr('key')).toBeFalsy();
    });

    it("should generate collection with size 2", function () {
        var collection = $('div');
        expect(collection.size()).toEqual(2);
    });

    it("should clone collection", function () {
        var collection = $('div');
        var collection2 = collection.clone(true);
        expect(collection2.nodes[0].element.innerHTML).toEqual(collection.nodes[0].element.innerHTML);
        collection.addClass('aaa');
        expect(collection2.hasClass('aaa')).toBeFalsy();

    });
//    it("should create eventlistener and remove it", function () {
//        var collection = $('div');
//        var collection2 = collection.clone();
//        expect(collection2.nodes[0].element.innerHTML).toEqual(collection.nodes[0].element.innerHTML);
//        collection.addClass('aaa');
//        expect(collection2.hasClass('aaa')).toBeFalsy();
//
//    });

    it("should set and return inner html", function () {
        var collection = $('div');
        expect(collection.html()).toEqual(collection.nodes[0].element.innerHTML);


        var html = '<button></button>';
        collection.html(html);

        expect(collection.html(html).html()).toEqual(html);
    });

    it("should set and return content when using function text", function () {
        var collection = $('div');
        expect(collection.text()).toEqual('Test');

        expect(collection.text('T').text()).toEqual('T');

    });

    it("should remove all elements in the collection from the dom", function () {
        var collection = $('div');
        collection.remove();
        var collection = $('div');
        expect(collection.size()).toEqual(0);
    });



    it("should empty all the collection content", function () {
        var collection = $('div');
        collection.empty();
        var ulCollection = $('ul');
        expect(ulCollection.size()).toEqual(0);
    });


    it("should create new collection with element that have the given index", function () {
        var collection = $('div');
        collection = collection.eq(1);
        expect(collection.size()).toEqual(1);
        expect(collection.text()).toEqual('Test2');
    });

//    it("should appendTo", function () {
//        var collection = $('div');
//    });

    it("should append given html", function () {
        var collection = $('div');
        collection.append('<p>hello</p>');
        var newInnerHtml = '<div>Test<ul></ul><p>hello</p></div><div>Test2<p>hello</p></div><button></button>';
        expect(document.body.innerHTML).toEqual(newInnerHtml);

    });

    it("should append clone of given element to every element in the collection", function () {
        var collection = $('div');
        var p = document.createElement('p');
        p.textContent='hello';
        collection.append(p);
        var newInnerHtml = '<div>Test<ul></ul><p>hello</p></div><div>Test2<p>hello</p></div><button></button>';
        expect(document.body.innerHTML).toEqual(newInnerHtml);
    });

    it("should place given html text before every element in the collection", function () {
        var collection = $('div');
        collection.before('<p>before</p>');
        var newInnerHtml = '<p>before</p><div>Test<ul></ul></div><p>before</p><div>Test2</div><button></button>';
        expect(document.body.innerHTML).toEqual(newInnerHtml);
    });

    it("should place clone of given element before every element in the collection", function () {
        var collection = $('div');
        var p = document.createElement('p');
        p.textContent='hello';
        collection.before(p);
        var newInnerHtml = '<p>hello</p><div>Test<ul></ul></div><p>hello</p><div>Test2</div><button></button>';
        expect(document.body.innerHTML).toEqual(newInnerHtml);
    });


    it("should place given html text after every element in the collection", function () {
        var collection = $('div');
        collection.after('<p>after</p>');
        var newInnerHtml = '<div>Test<ul></ul></div><p>after</p><div>Test2</div><p>after</p><button></button>';
        expect(document.body.innerHTML).toEqual(newInnerHtml);
    });

    it("should place clone of given element after every element in the collection", function () {
        var collection = $('div');
        var p = document.createElement('p');
        p.textContent='hello';
        collection.after(p);
        var newInnerHtml = '<div>Test<ul></ul></div><p>hello</p><div>Test2</div><p>hello</p><button></button>';
        expect(document.body.innerHTML).toEqual(newInnerHtml);
    });

    it("should get new collection with the children of the original collection", function () {
        var innerHtml = '<div>Test<ul>Im ul</ul></div><div>Test2</div><button></button>';
        document.body.innerHTML = innerHtml;

        var collection = $('div');
        var childrenCollection = collection.children();
        var html = childrenCollection.html();
        expect(html).toEqual('Im ul');

        expect(childrenCollection.size()).toEqual(1);
    });


    xit("should get new collection with the siblings of the original collection", function () {
        var innerHtml = '<div>Test<ul>Im ul</ul><li>Im li</li></div><div>Test2</div><button></button>';
        document.body.innerHTML = innerHtml;

        var collection = $('ul');
        var childrenCollection = collection.siblings();
        var html = childrenCollection.html();
        expect(html).toEqual('Im li');

        expect(childrenCollection.size()).toEqual(1);
    });

    it("should get new collection with next siblings of the original collection", function () {
        var innerHtml = '<div>Test<ul>Im ul</ul><li>Im li</li></div><div>Test2</div><button></button><div>Test2</div>';
        document.body.innerHTML = innerHtml;

        var collection = $('div');
        var childrenCollection = collection.next();

        expect(childrenCollection.size()).toEqual(2);
    });

    it("should get new collection with next siblings of the original collection", function () {
        var innerHtml = '<div>Test<ul>Im ul</ul><li>Im li</li></div><div>Test2</div><button></button><div>Test2</div>';
        document.body.innerHTML = innerHtml;

        var collection = $('div');
        var childrenCollection = collection.next();

        expect(childrenCollection.size()).toEqual(2);
    });


    it("should get new collection with previous siblings of the original collection", function () {
        var innerHtml = '<div>Test<ul>Im ul</ul><li>Im li</li></div><div>Test2</div><button></button><div>Test2</div>';
        document.body.innerHTML = innerHtml;

        var collection = $('div');
        var childrenCollection = collection.prev();

        expect(childrenCollection.size()).toEqual(2);
    });


//    xit("should get new collection with all next siblings of the original collection", function () {
//        var innerHtml = '<div>Test<ul>Im ul</ul><li>Im li</li></div><div>Test2</div><button></button>';
//        document.body.innerHTML = innerHtml;
//
//        var collection = $('ul');
//        var childrenCollection = collection.siblings();
//        var html = childrenCollection.html();
//        expect(html).toEqual('Im li');
//
//        expect(childrenCollection.size()).toEqual(1);
//    });





});


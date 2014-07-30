/**
 * Created by Eyal_Sadeh on 7/29/14.
 */
describe("JDom", function() {
    beforeEach(function () {
        document.body.innerHTML = '<div>Test</div><div>Test2</div><button></button>';
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
        expect(collection.addClass('test').nodes[0].hasClass('test')).toBeTruthy();
        expect(collection.addClass('test2').nodes[0].hasClass('test3')).toBeFalsy();

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

        expect(collection.nodes[0].hasAttr('key')).toBeTruthy();
        expect(collection.nodes[1].hasAttr('key')).toBeTruthy();
        collection = collection.removeAttr('key');
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



});




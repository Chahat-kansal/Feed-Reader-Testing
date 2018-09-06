
$(function() {

  describe("RSS Feeds", function() {

    // Make sure all feeds are not empty
    it("are defined", function() {
      expect(allFeeds).toBeDefined();
      expect(allFeeds instanceof Array).toBeTruthy();
      expect(allFeeds.length).not.toBe(0);
    });

    // Make sure all feeds have URL that starts with "http(s)://"
    it("have URLs", function() {
      allFeeds.forEach(function(feed) {
        expect(feed.url).toBeDefined();
        expect(feed.url.length).not.toBe(0);
        expect(feed.url).toMatch(/^(http|https):\/\//);
      });
    });

    // Make sure all feeds have names (String), not empty
    it("have names", function() {
      allFeeds.forEach(function(feed) {
        expect(feed.name).toBeDefined();
        expect(typeof feed.name).toBe("string");
        expect(feed.name.length).not.toBe(0);
      });
    });
  });

  describe("The menu", function() {

    // Pre-define elements needed for testing hiding/showing of the menu
    var body = document.body;
    var menu = document.querySelector(".menu-icon-link");

    // Make sure the menu is hidden initially
    it("body has 'menu-hidden' initially", function() {
      expect($('body').hasClass('menu-hidden')).toBe(true);
    });

    // Make sure menu icon toggles hide/show on clicking
    it("body toggles the class 'menu-hidden' on clicking menu icon", function() {
      menu.click();
      expect($('body').hasClass('menu-hidden')).toBe(false);

      menu.click();
      expect($('body').hasClass('menu-hidden')).toBe(true);
    });
  });

  // Testing suite of Initial Entries
  describe("Initial Entries", function() {
    // Avoid duplicated setup
    beforeEach(function(done) {
      loadFeed(0, function() {
        done();
      });
    });

    it("has at least 1 entry after loadFeed function is called", function(done) {
      var numE = document.querySelector(".feed").getElementsByClassName("entry").length;
      expect(numE).toBeGreaterThan(0);
      done();
    });

    // Make sure each (.feed .entry-link) element has valid link
    it("has a entry that has a link starting with 'http(s)://'", function(done) {
      var entries = document.querySelector(".feed").getElementsByClassName("entry-link");
      for(var i = 0; i < entries.length; i++){
        expect(entries[i].href).toMatch(/^(http|https):\/\//);
      }
      done();
    });
  });


  describe("New Feed Selection", function() {

    var initF;
    beforeEach(function(done) {
      loadFeed(0, function() {
        initF = document.querySelector(".feed").innerHTML;
        loadFeed(1, function() {
          done();
        });
      });
    });

    // Make sure when new feed is loaded
    it("changes its loaded content", function(done) {
      var newF = document.querySelector(".feed").innerHTML;
      expect(initF).not.toBe(newF);
      done();
    });
  });

}());
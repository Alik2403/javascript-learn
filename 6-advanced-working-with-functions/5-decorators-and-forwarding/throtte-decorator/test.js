describe("throttle(f, 1000)", function() {
    let f1000;
    let log = "";
  
    function f(a) {
      log += a;
    }
  
    before(function() {
      this.clock = sinon.useFakeTimers();
      f1000 = throttle(f, 1000);
    });
  
    it("the first call runs now", function() {
      f1000(1);
      assert.equal(log, "1");
    });
  
    it("then calls are ignored till 1000ms when the last call works", function() {
      f1000(2);
      f1000(3);

  
      assert.equal(log, "1");
  
      this.clock.tick(1000);
      assert.equal(log, "13");
    });
  
    it("the third call waits 1000ms after the second call", function() {
      this.clock.tick(100);
      f1000(4); 
      this.clock.tick(100);
      f1000(5); 
      this.clock.tick(700);
      f1000(6); 
  
      this.clock.tick(100);
  
      assert.equal(log, "136");
    });
  
    after(function() {
      this.clock.restore();
    });
  
  });
  
  describe('throttle', () => {
  
    it('runs a forwarded call once', done => {
      let log = '';
      const f = str => log += str;
      const f10 = throttle(f, 10);
      f10('once');
  
      setTimeout(() => {
        assert.equal(log, 'once');
        done();
      }, 20);
    });
  
  });
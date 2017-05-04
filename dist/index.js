'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

// import 'babel-polyfill'

var DFPDemo = function () {
  function DFPDemo() {
    _classCallCheck(this, DFPDemo);

    this.setUpRefreshAd = this.setUpRefreshAd.bind(this);
    this.setUpRefreshAdWithReloadDfp = this.setUpRefreshAdWithReloadDfp.bind(this);
    this.setUpAd = this.setUpAd.bind(this);
    this.displayAd = this.displayAd.bind(this);
    this.removeDfp = this.removeDfp.bind(this);
    this.readGPTJs = this.readGPTJs.bind(this);
  }

  _createClass(DFPDemo, [{
    key: 'setUpRefreshAd',
    value: function setUpRefreshAd() {
      var _this = this;

      console.log('set up /setUpRefreshAd/ completely.');
      var _btn = document.querySelector('#btn-refresh');
      _btn.addEventListener('click', function () {
        googletag.cmd.push(function () {
          googletag.destroySlots([window.adSLot['/40175602/test_pc_np_ap_970x250_HD']]);
          delete window.adSLot['/40175602/test_pc_np_ap_970x250_HD'];
          console.log('do refresh', window.adSLot);
          _this.setUpAd();
          _this.displayAd();
        });
        console.log('do refresh');
      });
    }
  }, {
    key: 'setUpRefreshAdWithReloadDfp',
    value: function setUpRefreshAdWithReloadDfp() {
      var _this2 = this;

      console.log('set up /setUpRefreshAdWithReloadDfp/ completely.');
      var _btn = document.querySelector('#btn-refresh-gpt');
      _btn.addEventListener('click', function () {
        console.log('do refresh gpt');
        _this2.removeDfp();
        _this2.readGPTJs();
        _this2.setUpAdBasic();
        _this2.setUpAd();
        _this2.displayAd();
      });
    }
  }, {
    key: 'removeDfp',
    value: function removeDfp() {
      for (var slotId in window.adSlots) {
        googletag.destroySlots([window.adSlots[slotId]]);
        document.querySelector('#' + window.adSlots[slotId].adid).innerHtml = '';
      }
      window.adSlots = {};
      document.querySelector('head').removeChild(document.querySelector('script[src*="googletagservices.com/tag/js/gpt.js"]'));
      window.googletag = undefined;
    }
  }, {
    key: 'readGPTJs',
    value: function readGPTJs() {
      var gads = document.createElement('script');
      gads.async = true;
      gads.type = 'text/javascript';
      var useSSL = document.location.protocol === 'https:';
      gads.src = (useSSL ? 'https:' : 'http:') + '//www.googletagservices.com/tag/js/gpt.js';
      var node = document.getElementsByTagName('script')[0];
      node.parentNode.insertBefore(gads, node);
    }
  }, {
    key: 'setUpAdBasic',
    value: function setUpAdBasic() {
      window.googletag = window.googletag || {};
      window.googletag.cmd = window.googletag.cmd || [];
      googletag.cmd.push(function () {
        googletag.pubads().enableSingleRequest();
        googletag.pubads().collapseEmptyDivs();
        googletag.enableServices();
      });
    }
  }, {
    key: 'setUpAd',
    value: function setUpAd() {
      window.googletag = window.googletag || {};
      window.googletag.cmd = window.googletag.cmd || [];
      googletag.cmd.push(function () {
        var slot = googletag.defineSlot('/40175602/test_pc_np_ap_970x250_HD', [970, 250], 'div-gpt-ad-1493805526222-0').addService(googletag.pubads());
        slot.adid = 'div-gpt-ad-1493805526222-0';
        window.adSLot['/40175602/test_pc_np_ap_970x250_HD'] = slot;
      });
    }
  }, {
    key: 'displayAd',
    value: function displayAd() {
      window.googletag = window.googletag || {};
      window.googletag.cmd = window.googletag.cmd || [];
      googletag.cmd.push(function () {
        console.log('show', window.adSLot['/40175602/test_pc_np_ap_970x250_HD'].adid);
        googletag.display(window.adSLot['/40175602/test_pc_np_ap_970x250_HD'].adid);
        googletag.pubads().refresh([window.adSLot['/40175602/test_pc_np_ap_970x250_HD']]);
      });
    }
  }, {
    key: 'initialize',
    value: function initialize() {
      this.setUpAdBasic();
      this.setUpAd();
      this.displayAd();
      this.setUpRefreshAd();
      this.setUpRefreshAdWithReloadDfp();
    }
  }]);

  return DFPDemo;
}();

window.onload = function () {
  console.log('loded');
  window.adSLot = {};
  var dfpDemo = new DFPDemo();
  dfpDemo.initialize();
};
// import 'babel-polyfill'

class DFPDemo {
  constructor() {
    this.setUpRefreshAd = this.setUpRefreshAd.bind(this)
    this.setUpRefreshAdWithReloadDfp = this.setUpRefreshAdWithReloadDfp.bind(this)
    this.setUpAd = this.setUpAd.bind(this)
    this.displayAd = this.displayAd.bind(this)
    this.removeDfp = this.removeDfp.bind(this)
    this.readGPTJs = this.readGPTJs.bind(this)
  }

  setUpRefreshAd() {
    console.log('set up /setUpRefreshAd/ completely.')
    const _btn = document.querySelector('#btn-refresh')
    _btn.addEventListener('click', () => {
      googletag.cmd.push(() => {
        googletag.destroySlots([ window.adSLot[ '/40175602/test_pc_np_ap_970x250_HD' ] ])
        delete window.adSLot[ '/40175602/test_pc_np_ap_970x250_HD' ]
        console.log('do refresh', window.adSLot)
        this.setUpAd()
        this.refreshAd()
      })
      console.log('do refresh')
    })
  }
  setUpRefreshAdWithReloadDfp() {
    console.log('set up /setUpRefreshAdWithReloadDfp/ completely.')
    const _btn = document.querySelector('#btn-refresh-gpt')
    _btn.addEventListener('click', () => {
      console.log('do refresh gpt')
      this.removeDfp()
      this.readGPTJs()
      this.setUpAdBasic()
      this.setUpAd()
      this.displayAd()
    })
  }


  removeDfp() {
    for (const slotId in window.adSlots) {
      googletag.destroySlots([ window.adSlots[ slotId ] ])
      document.querySelector(`#${window.adSlots[slotId].adid}`).innerHtml = ''
    }
    window.adSlots = {}
    document.querySelector('head').removeChild(document.querySelector('script[src*="googletagservices.com/tag/js/gpt.js"]'))
    window.googletag = undefined
  }

  readGPTJs() {
    const gads = document.createElement('script')
    gads.async = true
    gads.type = 'text/javascript'
    const useSSL = document.location.protocol === 'https:'
    gads.src = (useSSL ? 'https:' : 'http:') + '//www.googletagservices.com/tag/js/gpt.js'
    const node = document.getElementsByTagName('script')[ 0 ]
    node.parentNode.insertBefore(gads, node)
  }


  setUpAdBasic() {
    window.googletag = window.googletag || {}
    window.googletag.cmd = window.googletag.cmd || []
    googletag.cmd.push(function() {
      googletag.pubads().enableSingleRequest()
      googletag.pubads().collapseEmptyDivs()
      googletag.enableServices()
    });
  }

  setUpAd() {
    window.googletag = window.googletag || {}
    window.googletag.cmd = window.googletag.cmd || []
    googletag.cmd.push(function() {
      const slot = googletag.defineSlot('/40175602/test_pc_np_ap_970x250_HD', [970, 250], 'div-gpt-ad-1493805526222-0').addService(googletag.pubads())
      slot.adid = 'div-gpt-ad-1493805526222-0'
      window.adSLot[ '/40175602/test_pc_np_ap_970x250_HD' ] = slot
    });
  }
  displayAd() {
    window.googletag = window.googletag || {}
    window.googletag.cmd = window.googletag.cmd || []    
    googletag.cmd.push(function() { 
      console.log('show', window.adSLot[ '/40175602/test_pc_np_ap_970x250_HD' ].adid)
      googletag.display(window.adSLot[ '/40175602/test_pc_np_ap_970x250_HD' ].adid); 
    });
  }
  refreshAd() {
    window.googletag = window.googletag || {}
    window.googletag.cmd = window.googletag.cmd || []    
    googletag.cmd.push(function() { 
      console.log('refresh', window.adSLot[ '/40175602/test_pc_np_ap_970x250_HD' ].adid)
      googletag.pubads().refresh([ window.adSLot[ '/40175602/test_pc_np_ap_970x250_HD' ] ]); 
    });
  }

  initialize() {
    this.setUpAdBasic()
    this.setUpAd()
    this.displayAd()
    this.setUpRefreshAd()
    this.setUpRefreshAdWithReloadDfp()
  }
}
window.onload = function () {
  console.log('loded')
  window.adSLot = {}
  const dfpDemo = new DFPDemo()
  dfpDemo.initialize()

}
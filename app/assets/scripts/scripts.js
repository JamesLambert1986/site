import $ from 'jquery';
import Alert from './libs/bootstrap-4.4.1/alert'
// import Button from './libs/bootstrap-4.4.1/button'
// import Carousel from './libs/bootstrap-4.4.1/carousel'
import Collapse from './libs/bootstrap-4.4.1/collapse'
// import Dropdown from './libs/bootstrap-4.4.1/dropdown'
// import Modal from './libs/bootstrap-4.4.1/modal'
// import Popover from './libs/bootstrap-4.4.1/popover'
// import Scrollspy from './libs/bootstrap-4.4.1/scrollspy'
// import Tab from './libs/bootstrap-4.4.1/tab'
// import Toast from './libs/bootstrap-4.4.1/toast'
// import Tooltip from './libs/bootstrap-4.4.1/tooltip'
import Util from './libs/bootstrap-4.4.1/util'
import Vmcharts from './modules/Vmcharts'

(($) => {

  if (typeof $ === 'undefined') {
    throw new TypeError('Bootstrap\'s JavaScript requires jQuery. jQuery must be included before Bootstrap\'s JavaScript.')
  }

  const version = $.fn.jquery.split(' ')[0].split('.')
  const minMajor = 1
  const ltMajor = 2
  const minMinor = 9
  const minPatch = 1
  const maxMajor = 4

  if (version[0] < ltMajor && version[1] < minMinor || version[0] === minMajor && version[1] === minMinor && version[2] < minPatch || version[0] >= maxMajor) {
    throw new Error('Bootstrap\'s JavaScript requires at least jQuery v1.9.1 but less than v4.0.0')
  }

  Vmcharts.init()


  // Add our modules into a gloabl variable so that we can grab them to test them
  // This in the future will hopefully be more sophisticated 
  if(window.test){
    window.Vmcharts = Vmcharts;
  }
})($)

export {
  Util,
  Alert,
  // Button,
  // Carousel,
  Collapse,
  // Dropdown,
  //Modal,
  // Popover,
  // Scrollspy,
  // Tab,
  // Toast,
  // Tooltip,
  Vmcharts
}
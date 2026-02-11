// Check slider dimensions and position
(function() {
  if (typeof jQuery !== 'undefined') {
    jQuery(document).ready(function() {
      setTimeout(function() {
        var slider = jQuery('#rev_slider_13_1');
        var wrapper = jQuery('#rev_slider_13_1_wrapper');
        
        console.log('[SLIDER CHECK] Slider element:', slider.length > 0 ? 'EXISTS' : 'MISSING');
        console.log('[SLIDER CHECK] Wrapper element:', wrapper.length > 0 ? 'EXISTS' : 'MISSING');
        
        if (slider.length > 0) {
          console.log('[SLIDER CHECK] Slider dimensions:', {
            width: slider.width(),
            height: slider.height(),
            display: slider.css('display'),
            visibility: slider.css('visibility'),
            opacity: slider.css('opacity'),
            position: slider.css('position')
          });
        }
        
        if (wrapper.length > 0) {
          console.log('[SLIDER CHECK] Wrapper dimensions:', {
            width: wrapper.width(),
            height: wrapper.height(),
            display: wrapper.css('display'),
            visibility: wrapper.css('visibility')
          });
        }
        
        // Check if any slides exist
        var slides = jQuery('#rev_slider_13_1 > ul > li');
        console.log('[SLIDER CHECK] Number of slides:', slides.length);
        
        // Check if first slide image loaded
        var firstImg = jQuery('#rev_slider_13_1 .rev-slidebg').first();
        if (firstImg.length > 0) {
          console.log('[SLIDER CHECK] First slide image:', {
            src: firstImg.attr('src'),
            width: firstImg.width(),
            height: firstImg.height(),
            naturalWidth: firstImg[0].naturalWidth,
            naturalHeight: firstImg[0].naturalHeight
          });
        }
      }, 4000);
    });
  }
})();

// Debug script to catch RevSlider errors
(function() {
  console.log('[DEBUG] RevSlider debug script loaded');
  
  // Intercept console.error
  var originalError = console.error;
  console.error = function() {
    var args = Array.prototype.slice.call(arguments);
    var msg = args.join(' ');
    console.log('[DEBUG] Console error:', msg.substring(0, 200));
    return originalError.apply(console, arguments);
  };
  
  // Global error handler
  window.addEventListener('error', function(e) {
    console.log('[DEBUG] Global error:', e.message, 'at', e.filename + ':' + e.lineno);
  });
  
  // Check if RevSlider loads
  if (typeof jQuery !== 'undefined') {
    jQuery(document).ready(function() {
      console.log('[DEBUG] jQuery ready, slider exists:', jQuery('#rev_slider_13_1').length > 0);
      console.log('[DEBUG] Revolution method exists:', typeof jQuery.fn.revolution !== 'undefined');
      
      setTimeout(function() {
        var slider = jQuery('#rev_slider_13_1');
        console.log('[DEBUG] After 3s - slider display:', slider.css('display'));
        console.log('[DEBUG] After 3s - slider visible:', slider.is(':visible'));
      }, 3000);
    });
  }
})();

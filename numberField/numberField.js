(function() {
  var scriptName;

  scriptName = 'numberField.coffee';

  (function($) {
    var methods;

    methods = {
      init: function() {
        var field;

        field = $(this);
        return field.keydown(function(event) {
          var _ref;

          if (((_ref = event.keyCode) === 46 || _ref === 8 || _ref === 9 || _ref === 27 || _ref === 13 || _ref === 107 || _ref === 109 || _ref === 110 || _ref === 118) || (event.keyCode === 65 && event.ctrlKey === true) || (event.keyCode >= 35 && event.keyCode <= 39)) {

          } else {
            if (event.shiftKey || (event.keyCode < 48 || event.keyCode > 57) && (event.keyCode < 96 || event.keyCode > 105)) {
              return event.preventDefault();
            }
          }
        });
      }
    };
    return $.fn.numberField = function(method) {
      if (methods[method]) {
        return methods[method].apply(this, Array.prototype.slice.call(arguments, 1));
      } else if (typeof method === 'object' || !method) {
        return methods.init.apply(this, arguments);
      } else {
        return $.error("Method " + method + " is not defined in " + scriptName);
      }
    };
  })(jQuery);

}).call(this);

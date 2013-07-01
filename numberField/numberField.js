(function() {
  var scriptName;

  scriptName = 'numberField.coffee';

  (function($) {
    var methods;

    methods = {
      init: function() {
        var escr, field, type;

        field = $(this);
        escr = window.ESCR !== void 0 ? new ESCR() : null;
        if (!escr) {
          console.warn("" + scriptName + " - escr not found. Czech special chars will not be translated to numbers");
        }
        field.keydown(function(event) {
          var _ref;

          if (((_ref = event.keyCode) === 16 || _ref === 46 || _ref === 8 || _ref === 9 || _ref === 27 || _ref === 13 || _ref === 107 || _ref === 109 || _ref === 110 || _ref === 118) || (event.keyCode === 65 && event.ctrlKey === true) || ((event.keyCode >= 35 && event.keyCode <= 39) || (event.keyCode >= 48 && event.keyCode <= 57))) {

          } else {
            if ((event.keyCode < 48 || event.keyCode > 57) && (event.keyCode < 96 || event.keyCode > 105)) {
              return event.preventDefault();
            }
          }
        });
        type = field.attr('type');
        if (!!escr && (type === 'text' || !type)) {
          return field.keyup(function(event) {
            var newVal, val;

            val = field[0].value;
            newVal = escr.rewrite(val);
            return field.val(newVal);
          });
        }
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

(function() {
  var OnchangeListener, scriptName;

  scriptName = 'OnchangeListener.coffee';

  OnchangeListener = (function() {

    function OnchangeListener() {
      this.subscriptions = [];
      this.saveButtons = null;
      this.hilightCssClass = stso.buttons.dangerClass;
    }

    /*
    	Add custom data- attribute on all inputs in form
    	Stores its default value there
    	On positive change -> fires callbackOnChange
    	On revert change -> fires callbackOnChangeBack
    */


    OnchangeListener.prototype.initIsFormChangedListener = function(forms, callbackOnChange, callbackOnChangeBack) {
      if (!callbackOnChangeBack || !callbackOnChangeBack) {
        console.error("" + scriptName + " - initIsFormChangedListener has wrong parameters. Initialization of listener aborted.");
        return;
      }
      $.each(forms, function() {
        var form, formData;
        form = $(this);
        formData = form.formSerialize();
        return form.data('defaultValues', formData);
      });
      forms.on('change', function(event) {
        var field, form, newFormValues, oldFormValues;
        field = $(event.target);
        form = field.closest('form');
        if (field.is(':hidden')) {
          return;
        }
        newFormValues = form.formSerialize();
        oldFormValues = form.data('defaultValues');
        if (newFormValues === oldFormValues) {
          return callbackOnChangeBack();
        } else {
          return callbackOnChange();
        }
      });
      return forms;
    };

    OnchangeListener.prototype.initSaveButtonHilighter = function(forms, saveButtons) {
      var _this = this;
      this.saveButtons = saveButtons;
      return forms.on('change', function(event) {
        return saveButtons.addClass(_this._getHilightCssClass());
      });
    };

    OnchangeListener.prototype.unhilightOnEvent = function(eventName) {
      var _this = this;
      return this.subscriptions.push($.fn.stso.subscribe(eventName, function(jQbuttons) {
        return jQbuttons.each(function(index) {
          var button;
          button = jQbuttons[index];
          if (button === _this.saveButtons[index]) {
            return _this._unhilightButton(button);
          }
        });
      }));
    };

    OnchangeListener.prototype._unhilightButton = function(button) {
      var $button;
      $button = $(button);
      return $button.removeClass(this._getHilightCssClass()).addClass(stso.buttons.defaultClass);
    };

    OnchangeListener.prototype._getHilightCssClass = function() {
      if (this.hilightCssClass === null) {
        this.hilightCssClass = stso.buttons.dangerClass;
      }
      return this.hilightCssClass;
    };

    OnchangeListener.prototype._unsubscribe = function() {
      var sub, _i, _len, _ref, _results;
      _ref = this.subscriptions;
      _results = [];
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        sub = _ref[_i];
        _results.push($.fn.stso.unsubscribe(sub));
      }
      return _results;
    };

    OnchangeListener.prototype.destroy = function() {
      return this._unsubscribe();
    };

    return OnchangeListener;

  })();

  namespace('stso', function(exports, window) {
    return exports.OnchangeListener = OnchangeListener;
  });

}).call(this);

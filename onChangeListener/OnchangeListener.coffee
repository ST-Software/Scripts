# requires namespace.coffee
# requires form.coffee
# requires alerts.coffee # because of stso.buttons namespace included there

scriptName = 'OnchangeListener.coffee'

class OnchangeListener

	constructor : () ->
		@subscriptions = []
		@saveButtons = null
		@hilightCssClass = stso.buttons.dangerClass


	###
	Add custom data- attribute on all inputs in form
	Stores its default value there
	On positive change -> fires callbackOnChange
	On revert change -> fires callbackOnChangeBack
	###
	initIsFormChangedListener : ( forms, callbackOnChange, callbackOnChangeBack ) ->
		if ! callbackOnChangeBack || ! callbackOnChangeBack
			console.error "#{scriptName} - initIsFormChangedListener has wrong parameters. Initialization of listener aborted."
			return

		$.each forms, () ->
			form = $ this
			formData = form.formSerialize()
			form.data 'defaultValues', formData

		forms.on 'change', ( event ) ->
			field = $ event.target
			form = field.closest 'form'

			if field.is ':hidden'
				return

			newFormValues = form.formSerialize()
			oldFormValues = form.data 'defaultValues'

			if newFormValues is oldFormValues 
				callbackOnChangeBack()
			else
				callbackOnChange()

		return forms


	initSaveButtonHilighter : ( forms, saveButtons ) ->
		@saveButtons = saveButtons
		forms.on 'change', ( event ) =>			
			saveButtons.addClass @_getHilightCssClass()

	unhilightOnEvent : ( eventName ) ->
		@subscriptions.push $.fn.stso.subscribe eventName, ( jQbuttons ) =>
			jQbuttons.each ( index ) =>
				button = jQbuttons[ index ]
				if button is @saveButtons[ index ]
					@_unhilightButton button

	_unhilightButton : ( button ) ->
		$button = $ button
		$button.removeClass( @_getHilightCssClass() ).addClass stso.buttons.defaultClass

	_getHilightCssClass : () ->
		if @hilightCssClass is null
			@hilightCssClass = stso.buttons.dangerClass

		@hilightCssClass

	_unsubscribe : () ->
		for sub in @subscriptions
			$.fn.stso.unsubscribe sub

	destroy : () ->
		@_unsubscribe()

namespace 'stso', ( exports, window ) ->
	exports.OnchangeListener = OnchangeListener
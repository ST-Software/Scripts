scriptName = 'numberField.coffee'

do ($ = jQuery) ->
	methods = 
		init : () ->
			# prevent user from typing anything non-numeric
			field = $ this
			field.keydown (event) ->
				# Allow: backspace 46, delete 8, tab 9, escape 27, enter 13, plus 107, minus 109, dot 110, decimal dot 118
				if ( event.keyCode in [46, 8, 9, 27, 13, 107, 109, 110, 118] ||
					# Allow: Ctrl+A
					(event.keyCode is 65 && event.ctrlKey is true) || 
					# Allow: home, end, left, right
					(event.keyCode >= 35 && event.keyCode <= 39))
						# let it happen, don't do anything
						return
				else
					# Ensure that it is a number and stop the keypress
					if (event.shiftKey || (event.keyCode < 48 || event.keyCode > 57) && (event.keyCode < 96 || event.keyCode > 105 ))
						event.preventDefault()

	$.fn.numberField = ( method ) ->
		if methods[method]
			return methods[ method ].apply( this, Array.prototype.slice.call( arguments, 1 ))
		else if typeof method == 'object' || ! method 
			return methods.init.apply this, arguments 
		else
			$.error "Method #{method} is not defined in #{scriptName}"

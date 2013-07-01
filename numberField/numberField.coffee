#requires ESCR script by Jiri Knesl https://bitbucket.org/jiriknesl/escr/overview

scriptName = 'numberField.coffee'

do ($ = jQuery) ->
	methods = 
		init : () ->
			# prevent user from typing anything non-numeric
			field = $ this
			escr = if window.ESCR != undefined then new ESCR() else null

			if ! escr
				console.warn "#{scriptName} - escr not found. Czech special chars will not be translated to numbers"

			field.keydown ( event ) ->
<<<<<<< .mine
				# Allow: shift 16, backspace 46, delete 8, tab 9, escape 27, enter 13, plus 107, minus 109, dot 110, decimal dot 118
				if ( event.keyCode in [16, 46, 8, 9, 27, 13, 107, 109, 110, 118] ||
=======
				# Allow: backspace 46, delete 8, tab 9, escape 27, enter 13, plus 107, minus 109, dot 110, decimal dot 118, 188
				if ( event.keyCode in [46, 8, 9, 27, 13, 107, 109, 110, 118, 188] ||
>>>>>>> .theirs
					# Allow: Ctrl+A
					(event.keyCode is 65 && event.ctrlKey is true) || 
					# Allow: home, end, left, right
					((event.keyCode >= 35 && event.keyCode <= 39) || (event.keyCode >= 48 && event.keyCode <= 57)))
						# let it happen, don't do anything
						return
				else
					# Ensure that it is a number and stop the keypress
					# if (event.shiftKey || (event.keyCode < 48 || event.keyCode > 57) && (event.keyCode < 96 || event.keyCode > 105 ))
					if ((event.keyCode < 48 || event.keyCode > 57) && (event.keyCode < 96 || event.keyCode > 105 ))
						event.preventDefault()

			type = field.attr 'type'
			if !! escr and (type is 'text' or !type)
				field.keyup ( event ) ->
					val = field[0].value
					newVal = escr.rewrite val
					field.val newVal

	$.fn.numberField = ( method ) ->
		if methods[method]
			return methods[ method ].apply( this, Array.prototype.slice.call( arguments, 1 ))
		else if typeof method == 'object' || ! method 
			return methods.init.apply this, arguments 
		else
			$.error "Method #{method} is not defined in #{scriptName}"
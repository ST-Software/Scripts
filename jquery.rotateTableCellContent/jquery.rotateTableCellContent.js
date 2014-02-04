(function ($) {
  $.fn.rotateTableCellContent = function (options) {
  /*
  Version 1.0
  7/2011
  Written by David Votrubec (davidjs.com) and
  Michal Tehnik (@Mictech) for ST-Software.com
 --
  Version 1.1
  4/2013
  Updated by FBoucher (@FBoucheros)
  */

		var cssClass = ((options) ? options.className : false) || "vertical";

		var cellsToRotate = $('.' + cssClass, this);

		var betterCells = [];
		cellsToRotate.each(function () {
			var cell = $(this)
		  , newText = cell.html()
		  , height = cell.height()
		  , width = cell.text().length * parseInt(cell.css('font-size')) * 0.75
		  , newDiv = $('<div>', { height: width, width: height })
		  , newInnerDiv = $('<div>', { html: newText, 'class': 'rotated' });

			newDiv.append(newInnerDiv);

			betterCells.push(newDiv);
		});

		cellsToRotate.each(function (i) {
			$(this).html(betterCells[i]);
		});
	};
})(jQuery);
"use strict";

(function($) {
	var CharacterCounter = {
		init : function(element, options) {
			this.element = element;
			this.$element = $(element);
			this.options = $.extend({}, this._defaults, options);
			this._build();
			return this;
		},
		_defaults : {
			limit : 140,
			cssClass : "character-counter",
			message : "{charsLeft}/{charLimit}",
			limitExceeded : function(){
				
			}
		},
		$characterCounterElement : null,
		_build : function() {
			var that = this;
			this.$element.on("keyup keydown blur", function(e) {
				that.update();
			});
			this.$characterCounterElement = $('<span/>').addClass(this.options.cssClass);
			this.$element.after(this.$characterCounterElement);

			//update once
			this.update();
		},
		_volatile : false,
		update : function() {
			if(!this._volatile) {
				var value = this.$element.val() ? this.$element.val() : "";
				if(value.length > this.options.limit) {
					//give user a change to change limits etc.
					this._volatile = true;
					this.options.limitExceeded.call(this);
					this._volatile = false;
					//value may have been changed
					value = this.$element.val();
				}

				var charLeft = this.options.limit - value.length;
				
				var message = "";
				if(typeof this.options.message === "function") {
					message = this.options.message(charLeft, this.options.limit);
				} else {
					message = this.options.message.replace("{charsLeft}", charLeft).
					replace("{charLimit}", this.options.limit);
				}

				this.$characterCounterElement.empty().append(message);
				}
			}
	};

	$.fn.mkcl = function(){
		var elements = this;
		return {
			characterCounter : function(options) {
				elements.filter("input, textreaa").each(function() {
					var characterCounter = Object.create(CharacterCounter);
					characterCounter.init(this, options);
					$.data(this, "CharacterCounter", characterCounter);
				});

				return elements;
			}
		}
	}
})(jQuery);
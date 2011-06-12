// 
//  script.js
//  jgalenski
//  
//  Created by julien galenski on 2011-06-03.
//  Copyright 2011 Usineproduction. All rights reserved.
// 


// EventDispater Created by http://www.devscape.co.uk/?p=30
// Modified by Julien Galenski
$E = EventDispatcher = function(){
  var eventListeners = {};
  return{
    addEventListener:function(event, func){
      if(!eventListeners[event]){
        eventListeners[event] = [];
      }
      eventListeners[event].push(func);
      return this;
    },

    removeEventListener: function(event, func){
      for(var i = 0, len = eventListeners[event].length; i < len; i+=1){
        if (eventListeners[event][i] == func){
          eventListeners[event].splice(i, 1);
		} else {
			eventListeners[event] = null;
		}
      }
      return this;
    },

    dispatchEvent:function(event){
      var args = [];
      for(var i = 1, len = arguments.length; i < len; i+=1){
        args.push(arguments[i]);
      }
      if (eventListeners[event]) {
        for(var j = 0, len = eventListeners[event].length; j < len; j+=1){
          eventListeners[event][j].apply(this, args);
        }
      }
      return this;
    }
  }
}();


/**
 * Move the little Cube
 *
 * @return void
 * @author julien galenski
 **/
$CUBE = littleCube = function() {
	var BLOCK_CLICK = true;
	return {
		moveUp:function(){
			jQuery('#little-cube').animate({marginTop:'0'}, 1000, function(){$E.dispatchEvent('endMoveUp');});
		},

		moveDown:function(){
			jQuery('#little-cube').animate({marginTop:'250'}, 1000, function(){$E.dispatchEvent('endMoveDown');});
		},

		moveLeft:function(){
			jQuery('#little-cube').animate({marginLeft: '-300'}, 1000, function(){$E.dispatchEvent('endMoveLeft');});
		},

		moveRight:function(){
			jQuery('#little-cube').animate({marginLeft: '50'}, 1000, function(){$E.dispatchEvent('endMoveRight');});
		},
	}
}();


function main(){
	$CUBE.moveDown();
	$E.addEventListener('endMoveDown', function(){
		$CUBE.moveLeft();
		$E.removeEventListener('endMoveDown');
	});

	jQuery('#techno img').click(function(){
		if(!$CUBE.BLOCK_CLICK){
			jQuery('#techno img').each(function(){
				$(this).attr({'src' : $(this).attr('data-default')});
			});
			$(this).attr({'src' : $(this).attr('data-active')});
			var data_info = jQuery('#cube-info-' + jQuery(this).attr('data-info')).html();
			$CUBE.moveLeft();
			$E.addEventListener('endMoveLeft', function(){
				jQuery('#little-cube .info').html(data_info);
				$CUBE.moveRight();
				$E.removeEventListener('endMoveLeft');
				$E.addEventListener('endMoveRight', function(){
					$CUBE.BLOCK_CLICK = false;
					$E.removeEventListener('endMoveRight');
				});
			});
			$CUBE.BLOCK_CLICK = true;
		}
	});
}

jQuery(document).ready(main);
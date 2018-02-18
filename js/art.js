
// var context = document.getElementById('canvas').getContext('2d');

function dlCanvas() {
	var drawing = document.getElementById("canvas");
    var dt = drawing.toDataURL('image/png');
    this.href = dt;
};

var getUrlParameter = function getUrlParameter(sParam) {
    var sPageURL = decodeURIComponent(window.location.search.substring(1)),
        sURLVariables = sPageURL.split('&'),
        sParameterName,
        i;

    for (i = 0; i < sURLVariables.length; i++) {
        sParameterName = sURLVariables[i].split('=');

        if (sParameterName[0] === sParam) {
            return sParameterName[1] === undefined ? true : sParameterName[1];
        }
    }
};

jQuery(document).ready(function() {

	$('#dl').click(dlCanvas);

	var fn = getUrlParameter('fn');
	window.console.log(fn);

	$('canvas').each(function() {

		var canvas = this;
		var context = this.getContext('2d');

		$.getJSON( "/files/"+fn, function( data ) {
			
				context.clearRect(0, 0, canvas.width, canvas.height);

				window.console.log('width:',canvas.width,'height:',canvas.height);
				var targetWidth = canvas.width;
				var targetHeight = canvas.height;
				var hScalar = targetWidth/2048;  // 256 samples * 8 wavetables
				var vScalar = targetHeight/512;      // ±32 * 8
				var rowOffset = (512/8)*vScalar;
				var columnOffset = (2048/8)*hScalar;

				var wavIdx = 0;
				var vOffset = 0;
				var segment;

				vOffset = vScalar * 32;

				for (wavIdx=0; wavIdx<64;wavIdx++) {
					if (wavIdx>0 && wavIdx%8==0) {
						// vOffset += 32*2;
						vOffset += rowOffset;
					}
					// hOffset = (wavIdx%8)*256;
					hOffset = (wavIdx%8)*columnOffset;

					segment = data.slice(wavIdx*256,wavIdx*256+256);

					context.lineWidth = 1;
					context.beginPath();
					context.strokeStyle = '#000';

					context.moveTo(hOffset*hScalar, vOffset + segment[x]*vScalar);
					for (var x=0; x<segment.length ;x++) {
						context.lineTo(hOffset+x*hScalar, vOffset + segment[x]*vScalar);
					}
					context.stroke();
				}
			});

	});

});	



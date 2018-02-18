
// var context = document.getElementById('canvas').getContext('2d');

function dlCanvas() {
	var drawing = document.getElementById("canvas");
    var dt = drawing.toDataURL('image/png');
    this.href = dt;
};


jQuery(document).ready(function() {

	// fetch directory
	// var option;
	// $.getJSON( "directory.json", function( data ) {
	// 	$('#waveselect').empty();
	// 	$.each( data, function() {
	// 		option = $('<option value="'+this.fn+'">'+this.title+' ('+this.attribution+')</option>');
	// 		option.data('description',this.notes);
	// 		$('#waveselect').append(option);
	// 	});
	// 	$('#waveselect').change(loadNewWave);
	// 	loadNewWave();
	// 	$('#wavetableCount').text(data.length);
	// });

	// $('#dl').click(dlCanvas);

	$('canvas').each(function() {

		var canvas = this;
		var context = this.getContext('2d');

		$(this).click(function(){window.location.href = "art.html?fn="+$(canvas).data('fn');});

		$.getJSON( "/files/"+$(this).data('fn'), function( data ) {
			
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

					// context.moveTo(hOffset*0.5, vOffset + segment[x] + 32);
					// context.moveTo(hOffset*hScalar, (vOffset + segment[x])*vScalar + 32*vScalar);
					context.moveTo(hOffset*hScalar, vOffset + segment[x]*vScalar);
					for (var x=0; x<segment.length ;x++) {
						// context.lineTo((hOffset+x)*0.5, vOffset + segment[x]+32);
						// context.lineTo((hOffset+x)*hScalar, (vOffset + segment[x])*vScalar + 32*vScalar);
						context.lineTo(hOffset+x*hScalar, vOffset + segment[x]*vScalar);
					}
					context.stroke();
				}
			});

	});

});	



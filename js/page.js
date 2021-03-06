
// var context = document.getElementById('canvas').getContext('2d');

function dlCanvas() {
	var drawing = document.getElementById("canvas");
    var dt = drawing.toDataURL('image/png');
    this.href = dt;
};

function loadNewWave() {
	var fn = $('#waveselect').val();
	var selected = $('#waveselect option:selected').each(function(){
		var desc = $(this).data('description');
		if (desc !== undefined && desc.length>20) {
			$('#description').text(desc);
			$('#description').show();
		} else {
			$('#description').hide();
		}
	});
	$.getJSON( "/files/"+fn, function( data ) {

		var context = document.getElementById('canvas').getContext('2d');
		context.clearRect(0, 0, canvas.width, canvas.height);

		var wavIdx = 0;
		var vOffset = 0;
		var segment;

		vOffset = 0;

		for (wavIdx=0; wavIdx<64;wavIdx++) {
			if (wavIdx>0 && wavIdx%8==0) {
				vOffset += 32*2;
			}
			hOffset = (wavIdx%8)*256;

			segment = data.slice(wavIdx*256,wavIdx*256+256);

			context.lineWidth = 1;
			context.beginPath();
			context.strokeStyle = '#000';

			context.moveTo(hOffset*0.5, vOffset + segment[x] + 32);
			for (var x=0; x<segment.length ;x++) {
				context.lineTo((hOffset+x)*0.5, vOffset + segment[x]+32);
			}
			context.stroke();
		}


	});
}

jQuery(document).ready(function() {

	// fetch directory
	var option;
	$.getJSON( "directory.json", function( data ) {
		$('#waveselect').empty();
		$.each( data, function() {
			option = $('<option value="'+this.fn+'">'+this.title+' ('+this.attribution+')</option>');
			option.data('description',this.notes);
			$('#waveselect').append(option);
		});
		$('#waveselect').change(loadNewWave);
		loadNewWave();
		$('#wavetableCount').text(data.length);
	});

	$('#dl').click(dlCanvas);

});	



function dlCanvas(){var e=document.getElementById("canvas"),t=e.toDataURL("image/png");this.href=t}function loadNewWave(){var e=$("#waveselect").val(),t=$("#waveselect option:selected").each(function(){var e=$(this).data("description");void 0!==e&&e.length>20?($("#description").text(e),$("#description").show()):$("#description").hide()});$.getJSON("/files/"+e,function(e){var t=document.getElementById("canvas").getContext("2d");t.clearRect(0,0,canvas.width,canvas.height);var a=0,n=0,i;for(n=0,a=0;a<64;a++){a>0&&a%8==0&&(n+=64),hOffset=a%8*256,i=e.slice(256*a,256*a+256),t.lineWidth=1,t.beginPath(),t.strokeStyle="#000",t.moveTo(.5*hOffset,n+i[o]+32);for(var o=0;o<i.length;o++)t.lineTo(.5*(hOffset+o),n+i[o]+32);t.stroke()}})}jQuery(document).ready(function(){var e;$.getJSON("directory.json",function(t){$("#waveselect").empty(),$.each(t,function(){e=$('<option value="'+this.fn+'">'+this.title+" ("+this.attribution+")</option>"),e.data("description",this.notes),$("#waveselect").append(e)}),$("#waveselect").change(loadNewWave),loadNewWave(),$("#wavetableCount").text(t.length)}),$("#dl").click(dlCanvas)});
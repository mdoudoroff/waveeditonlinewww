function dlCanvas(){var t=document.getElementById("canvas"),e=t.toDataURL("image/png");this.href=e}jQuery(document).ready(function(){$("canvas").each(function(){var t=this,e=this.getContext("2d");$(this).click(function(){window.location.href="art.html?fn="+$(t).data("fn")}),$.getJSON("/files/"+$(this).data("fn"),function(i){e.clearRect(0,0,t.width,t.height),window.console.log("width:",t.width,"height:",t.height);var n=t.width,h=t.height,a=n/2048,o=h/512,f=64*o,c=256*a,s=0,d=0,l;for(d=32*o,s=0;s<64;s++){s>0&&s%8==0&&(d+=f),hOffset=s%8*c,l=i.slice(256*s,256*s+256),e.lineWidth=1,e.beginPath(),e.strokeStyle="#000",e.moveTo(hOffset*a,d+l[r]*o);for(var r=0;r<l.length;r++)e.lineTo(hOffset+r*a,d+l[r]*o);e.stroke()}})})});
function dlCanvas(){var t=document.getElementById("canvas"),e=t.toDataURL("image/png");this.href=e}var getUrlParameter=function t(e){var n=decodeURIComponent(window.location.search.substring(1)),i=n.split("&"),o,a;for(a=0;a<i.length;a++)if(o=i[a].split("="),o[0]===e)return void 0===o[1]||o[1]};jQuery(document).ready(function(){$("#dl").click(dlCanvas);var t=getUrlParameter("fn");window.console.log(t),$("canvas").each(function(){var e=this,n=this.getContext("2d");$.getJSON("/files/"+t,function(t){n.clearRect(0,0,e.width,e.height),window.console.log("width:",e.width,"height:",e.height);var i=e.width,o=e.height,a=i/2048,r=o/512,h=64*r,l=256*a,s=0,c=0,d;for(c=32*r,s=0;s<64;s++){s>0&&s%8==0&&(c+=h),hOffset=s%8*l,d=t.slice(256*s,256*s+256),n.lineWidth=1,n.beginPath(),n.strokeStyle="#000",n.moveTo(hOffset*a,c+d[f]*r);for(var f=0;f<d.length;f++)n.lineTo(hOffset+f*a,c+d[f]*r);n.stroke()}})})});
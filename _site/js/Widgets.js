Tiemuxu.Widgets = function() {
    function clock() {
        var now = new Date();
        var sec = now.getSeconds();
        var min = now.getMinutes();
        var hr  = now.getHours();
        hr = hr >= 12 ? hr - 12 : hr;
        
        var ctx = document.getElementById('canvas').getContext('2d');
        
        ctx.save();
          
          ctx.clearRect(0,0,150,150);
          ctx.translate(75,75);
          ctx.scale(0.5,0.5);
          ctx.rotate(-Math.PI/2);
          
          ctx.strokeStyle = "#404040";
          ctx.fillStyle = "#404040";
          ctx.lineWidth = 8;
          ctx.lineCap = "round";
          
          //Hour marks
          ctx.save();
            ctx.beginPath();
              for (var i = 0; i < 12; i++) {
                ctx.rotate(Math.PI/6);
                ctx.moveTo(100,0);
                ctx.lineTo(120,0);
              }
            ctx.stroke();
          ctx.restore();
          
          //Minute marks
          ctx.save();
            ctx.lineWidth = 5;
            ctx.beginPath();
            
            for (var i = 0; i < 60; i++) {
              if (i % 5 != 0) {
                ctx.moveTo(117,0);
                ctx.lineTo(120,0);
              }
              ctx.rotate(Math.PI/30);
              
            }
            ctx.stroke();
          ctx.restore();
          
          //Draw Hour Hand
          ctx.save();
            
            ctx.rotate((Math.PI/6)*hr + (Math.PI/360)*min + (Math.PI/21600)*sec);
            
            ctx.lineWidth = 14;
            
            ctx.beginPath();
              ctx.moveTo(-20,0);
              ctx.lineTo(80,0);
            ctx.stroke();
          ctx.restore();
          
          //Draw Minute Hand
          ctx.save();
            
             ctx.rotate((Math.PI/30)*min + (Math.PI/1800)*sec);
             
             ctx.lineWidth = 10;
             
             ctx.beginPath();
               ctx.moveTo(-28,0);
               ctx.lineTo(112,0);
             ctx.stroke();
          ctx.restore();
          
          //Draw Second Hand
          ctx.save();
            
            ctx.rotate((Math.PI/30)*sec);
            
            ctx.lineWidth = 6;
            ctx.strokeStyle = "#79b429";
            ctx.fillStyle = "#79b429";
            
            ctx.beginPath();
              ctx.moveTo(-30,0);
              ctx.lineTo(83,0);
            ctx.stroke();
          ctx.restore();
          
          //Outside Green Circle
          ctx.save();
            ctx.lineWidth = 14;
            ctx.strokeStyle = "#79b429";
            
            ctx.beginPath();
              ctx.arc(0,0,142,0,Math.PI*2,true);
            ctx.stroke();
          ctx.restore();
          
        ctx.restore();
     
    }

    this.init = function() {
      clock();
      setInterval(clock, 1000);
    }
}


    

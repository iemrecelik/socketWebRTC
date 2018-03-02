!function(window, document, $, undefined) {

  var socket = io.connect('http://localhost:3000')
    , getUserMedia =
    navigator.getUserMedia ||
    navigator.webkitGetUserMedia ||
    navigator.MozGetUserMedia ||
    navigator.oGetUserMedia ||
    navigator.msGetUserMedia;
    
  $(function() {
    var video = document.getElementById('monitor')
      , canvas = document.getElementById('capture')
      , receive = document.getElementById('receive')
      // , filter = new Worker('/public/js/edge.js')
      , ctx = canvas.getContext('2d');

    socket.on('capture', function(data) {
      receive.src = data;
    });

    if (!getUserMedia) {
      alert('your browser unsupported webrtc.');
      return false;
    }

    function onStream(stream) {

      console.log(stream);
      console.log(JSON.stringify(stream));

      video.src = window.URL.createObjectURL(stream);
      video.addEventListener('error', function() {
        stream.stop();
      });
    }

    function errorOnStream(){
      alert('NEDEYSUN!')
    }
    
    navigator.getUserMedia({
        video: true
      // , audio: true
      // , toString: function() { return 'video, audio'; }
    }, onStream, errorOnStream);

    let vPack = [];
    setInterval(() => {

      ctx.drawImage(video, 0, 0, 320, 240);

      vPack.push(canvas.toDataURL('image/webp'));

      if(vPack.length == 5){
        socket.emit('stream', vPack);  
        // console.log(vPack)
        vPack = [];
      }

    }, 250)


    /*let co = 0;
    setInterval(() => {
      console.log(co)
      socket.emit('co', co++);
    }, 1250)*/
    
    // let d = Date.now();
    // $(video).on('timeupdate', function(e) {
      // console.log(Date.now() - d);
      // d = Date.now();
      // console.log(count + 1);
      // vPack.push(canvas.toDataURL('image/webp'));

      // if(vPack.lenght == 5)
      //   socket.emit('stream', vPack);  
      //   vPack = [];

      // ctx.drawImage(video, 0, 0, 320, 240);
      // filter.postMessage(Array.prototype.slice.call(ctx.getImageData(0, 0, 320, 240).data, 0));
    // });

    // socket.emit('stream', );
    
    /*filter.addEventListener('message', function(e) {
      var ctx = canvas.getContext('2d')
        , data = e.data
        , imageData = ctx.createImageData(320, 240);
      
      for (var i = 0; i < data.length; ++i) {
        imageData.data[i] = data[i];
      }
      
      ctx.putImageData(imageData, 0, 0);
      socket.emit('capture', canvas.toDataURL());
    });*/
  });
  
}(window, document, jQuery);

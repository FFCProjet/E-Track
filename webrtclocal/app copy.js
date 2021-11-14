let p=null

function bindEvent(p){
    p.on('error', function (err){
        console.log('error', err)
    })
    p.on('signal', function(data){
        document.querySelector('#offer').textContent = JSON.stringify(data)
    })
    p.on('stream', function(stream){
        let video = document.querySelector('#receiver-video')
        video.srcObject=stream;
        video.play();
    })
}
document.querySelector('#start').addEventListener('click',function(e){
    navigator.getUserMedia({
        video: true,
        Audio: true
    }, function (stream){ //succes
         p = new SimplePeer({
            initiator:true,
            stream: stream,
            trickle: false
        })
        bindEvent(p)
        let emitterVideo = document.querySelector('#emitter-video')
        emitterVideo.srcObject=stream;
        emitterVideo.play();
    }, function(){})
})

document.querySelector('#incoming').addEventListener('submit', function (e){
    e.preventDefault()
    if (p==null){
        p = new SimplePeer({
            initiator: false,
            trickle: false
        })
        bindEvent(p)
    }
     
    p.signal(JSON.parse(e.target.querySelector('textarea').value))
   
})
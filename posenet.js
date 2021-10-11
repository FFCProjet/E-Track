let video;
let poseNet;
let poses = [];

function setup(){
    const canvas = createCanvas(640,480);
    canvas.parent('videoContainer');

    video = createCapture(VIDEO);
    video.size(width, height);
    // document.body.style.zoom=2.0;this.blur();    
    // ctx.drawImage(video, 33, 71);
    
    poseNet = ml5.poseNet(video, modelReady);

    poseNet.on('pose', function(results){
        poses= results;
    });
    console.log(poses)
    video.hide();
}
// var canvas = document.getElementById('canvas');
// var ctx = canvas.getContext('2d');
// ctx.rect(10, 10, 100, 100);
 
    function draw(){
        image(video,0,0,width, height);
        drawKeypoints();
        
        // drawSkeleton();
    }
    function modelReady(){
        select('#status').html('model Loaded')
    }
    function drawKeypoints(){
        for (let i = 0; i< poses.length; i++){
            
            let pose = poses[i].pose;

            for(let j =0; j<pose.keypoints.length;j++){
                let keypoint = pose.keypoints[j];
                // fill(255,0,0);
                
                noStroke();
                // noFill();    
                square(keypoint.position.x, keypoint.position.y, 50)
                // alert(keypoint.position.x);
                // alert(keypoint.position.x +" "+ keypoint.position.y)
                // view.scaleAt({x, y}, 1.1);

            }
        }
    }
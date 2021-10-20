let video;
let poseNet;
let poses = [];
let xpose;
let ypose;

function setup(){
    const canvas = createCanvas(640,480);
    canvas.parent('videoContainer');
    // rectMode(CENTER)
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
        // scale(5,5);
        console.log(xpose+" " +ypose);
        drawKeypoints();
        
        // scale(xpose/2,ypose/2);
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
                fill(255,0,0);
                xpose=keypoint.position.x;
                ypose=keypoint.position.y;
                noStroke();
                // noFill();    
                circle(keypoint.position.x, keypoint.position.y, 20)
                // alert(keypoint.position.x);
                // alert(keypoint.position.x +" "+ keypoint.position.y)
                // view.scaleAt({x, y}, 1.1);

            }
        }
    }
    function drawSkeleton() {
        // Loop through all the skeletons detected
        for (let i = 0; i < poses.length; i++) {
          let skeleton = poses[i].skeleton;
          // For every skeleton, loop through all body connections
          for (let j = 0; j < skeleton.length; j++) {
            let partA = skeleton[j][0];
            let partB = skeleton[j][1];
            stroke(255, 0, 0);
            line(partA.position.x, partA.position.y, partB.position.x, partB.position.y);
          }
        }
      }
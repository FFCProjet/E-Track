(function(){
    var imageScaleFactor = 1;
    var outputStride = 16;
    var flipHorizontal = false;

    var input = document.getElementById('SinglePose');
    var canvas = document.getElementById('Skeleton1');
    canvas.width = input.width;
    canvas.height = input.height;
    var ctx = canvas.getContext('2d');
    ctx.strokeStyle = "#FFF";
    var eye = new Image();    
    eye.src = 'website/static/assets/images/eye.png';

    var drawLink = function(keypoint1, keypoint2) {
        ctx.beginPath();
        ctx.moveTo(keypoint1.position.x, keypoint1.position.y);
        ctx.lineTo(keypoint2.position.x, keypoint2.position.y);
        ctx.stroke();
    }

    posenet.load().then(function (net) {
        return net.estimateSinglePose(input, imageScaleFactor,
            flipHorizontal, outputStride)
    }).then(function (pose) {
        console.log('estimateSinglePose', pose);
        // Draw keypoint
        // for (var i = 0; i < pose.keypoints.length; i++) {
        //     ctx.beginPath();
        //     ctx.arc(pose.keypoints[i].position.x, pose.keypoints[i].position.y, 2,
        //         0, 2 * Math.PI);
        //     ctx.stroke();
        // }
        // eye.onload = function() {
            ctx.drawImage(eye, pose.keypoints[1].position.x-7, pose.keypoints[1].position.y-10);
            ctx.drawImage(eye, pose.keypoints[2].position.x-7, pose.keypoints[2].position.y-10);
        // };

        // Draw links
        drawLink(pose.keypoints[9], pose.keypoints[7]);
        drawLink(pose.keypoints[7], pose.keypoints[5]);
        drawLink(pose.keypoints[5], pose.keypoints[6]);
        drawLink(pose.keypoints[6], pose.keypoints[8]);
        drawLink(pose.keypoints[8], pose.keypoints[10]);
        drawLink(pose.keypoints[16], pose.keypoints[14]);
        drawLink(pose.keypoints[14], pose.keypoints[12]);
        drawLink(pose.keypoints[12], pose.keypoints[11]);
        drawLink(pose.keypoints[11], pose.keypoints[13]);
        drawLink(pose.keypoints[13], pose.keypoints[15]);
        drawLink(pose.keypoints[5], pose.keypoints[11]);
        drawLink(pose.keypoints[6], pose.keypoints[12]);

    })
})();

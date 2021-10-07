(function(){
    var imageScaleFactor = 1;
    var outputStride = 16;
    var flipHorizontal = false;
    var scoreThreshold = 0.4;
    var net;

    var video = document.getElementById('VideoSinglePose');

    if (video) {
        var canvas = document.getElementById('Skeleton4');
        canvas.width = video.width;
        canvas.height = video.height;
        var ctx = canvas.getContext('2d');
        ctx.strokeStyle = "#FFF";

        var drawLink = function(keypoint1, keypoint2) {
            ctx.beginPath();
            ctx.moveTo(keypoint1.position.x, keypoint1.position.y);
            ctx.lineTo(keypoint2.position.x, keypoint2.position.y);
            ctx.stroke();
        }

        var poseDetectionFrame = function() {
            net.estimateSinglePose(video, imageScaleFactor, flipHorizontal, outputStride, maxPoseDetections, scoreThreshold).then(
                function(pose) {
                    ctx.clearRect(0, 0, canvas.width, canvas.height);
                    // Draw keypoint
                    for (var i = 0; i < pose.keypoints.length; i++) {
                        ctx.beginPath();
                        ctx.arc(pose.keypoints[i].position.x, pose.keypoints[i].position.y, 2,
                            0, 2 * Math.PI);
                        ctx.stroke();
                    }
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
                    
                    requestAnimationFrame(poseDetectionFrame);
                }
            );
        }

        posenet.load(0.75).then(function (result) {
            net = result;
            requestAnimationFrame(poseDetectionFrame);
        });
    }
    
    

})();

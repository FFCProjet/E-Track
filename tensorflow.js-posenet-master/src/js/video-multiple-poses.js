(function(){
    var imageScaleFactor = 1;
    var outputStride = 16;
    var flipHorizontal = false;
    var maxPoseDetections = 3;
    var scoreThreshold = 0.7;
    var net;

    var video = document.getElementById('VideoMultiplePoses');
    var eye = new Image();
    eye.src = 'website/static/assets/images/eye.png';

    if (video) {

        var canvas = document.getElementById('Skeleton3');
        canvas.width = video.width;
        canvas.height = video.height;
        var ctx = canvas.getContext('2d');
        ctx.strokeStyle = "rgba(0, 255, 0, 0.5)";
        ctx.lineWidth = 5;
        ctx.lineCap = 'round';
        ctx.fillStyle = "rgba(0, 0, 0, 0.5)";

        var drawLink = function(kp1, kp2) {
            ctx.beginPath();
            ctx.moveTo(kp1.position.x, kp1.position.y);
            ctx.lineTo(kp2.position.x, kp2.position.y);
            ctx.stroke();
        }

        var drawCircle = function(kp, r) {
            ctx.beginPath();
            ctx.arc(kp.position.x, kp.position.y, r, 0, 2*Math.PI);
            ctx.fill();
            ctx.stroke();
        }

        var drawEye = function(kp) {
            ctx.beginPath();
            ctx.arc(kp.position.x, kp.position.y, 5, 0, Math.PI, true);
            ctx.stroke();
        }

        var poseDetectionFrame = function() {
            net.estimateMultiplePoses(video, imageScaleFactor, flipHorizontal, outputStride, maxPoseDetections, scoreThreshold).then(
                function(poses) {
                    ctx.clearRect(0, 0, canvas.width, canvas.height);
                    for (var j = 0; j < poses.length; j++) {
                        var pose = poses[j];
                        
                        ctx.lineWidth = 1;
                        ctx.strokeStyle = "rgba(0, 255, 0, 1)";
                        drawLink(pose.keypoints[0], pose.keypoints[1]);
                        drawLink(pose.keypoints[1], pose.keypoints[2]);
                        drawLink(pose.keypoints[2], pose.keypoints[0]);

                        ctx.lineWidth = 5;
                        ctx.strokeStyle = "rgba(0, 255, 0, 0.5)";
                        ctx.beginPath();
                        ctx.moveTo(pose.keypoints[3].position.x, pose.keypoints[3].position.y);
                        ctx.lineTo(pose.keypoints[3].position.x, pose.keypoints[3].position.y);
                        ctx.stroke();

                        ctx.beginPath();
                        ctx.moveTo(pose.keypoints[4].position.x, pose.keypoints[4].position.y);
                        ctx.lineTo(pose.keypoints[4].position.x, pose.keypoints[4].position.y);
                        ctx.stroke();

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
                    }
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

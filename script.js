window.onload = init;

function init() {
    var image = document.getElementsByClassName("display-image")[0];
    var stampImage = document.getElementsByClassName("stamp-image")[0];

    var mouseMoves = Rx.Observable.fromEvent(image, 'mousemove');
    var mouseEnter = Rx.Observable.fromEvent(image, 'mouseenter');
    var mouseLeave = Rx.Observable.fromEvent(image, 'mouseleave');

//    mouseMoves.subscribe(console.log);

    magnify([image, stampImage], {debug: true, speed: 1000, src: [
        "https://static.pexels.com/photos/104827/cat-pet-animal-domestic-104827.jpeg",
        "https://ak6.picdn.net/shutterstock/videos/6696536/thumb/5.jpg"
    ]});
}

//Pseudocode explaining how the positioning works
/*
    mouseDistanceFromLeft: mouseX - boundingBoxLeft
    mouseDistanceFromTop: mouseY - boundingBoxTop

    lens left: mouseDistanceFromLeft - halfLensOffsetWidth;
    lens top: mouseDistanceFromTop - halfLensOffsetHeight;
    backgroundX: -1 * (mouseDistanceFromLeft / (imageWidth * magnifiedImageWidth) - halfLensOffsetWidth);
    backgroundY: -1 * (mouseDistanceFromTop / (imageHeight * magnifiedImageHeight) - halfLensOffsetHeight);
*/

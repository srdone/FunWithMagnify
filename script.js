window.onload = init;

function init() {
    var image = document.getElementsByClassName("display-image");
    console.log(image);

    var mouseMoves = Rx.Observable.fromEvent(image[0], 'mousemove');
    var mouseEnter = Rx.Observable.fromEvent(image[0], 'mouseenter');
    var mouseLeave = Rx.Observable.fromEvent(image[0], 'mouseleave');

    mouseMoves.subscribe(console.log);

    magnify(image[0], {debug: true, speed: 1000, src: ["https://static.pexels.com/photos/104827/cat-pet-animal-domestic-104827.jpeg", "https://ak6.picdn.net/shutterstock/videos/6696536/thumb/5.jpg?i10c=img.resize(height:100)"]});
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

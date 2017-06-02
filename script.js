window.onload = init;

function init() {
    var image = document.getElementsByClassName("display-image");
    console.log(image);

    var mouseMoves = Rx.Observable.fromEvent(image[0], 'mousemove');
    var mouseEnter = Rx.Observable.fromEvent(image[0], 'mouseenter');
    var mouseLeave = Rx.Observable.fromEvent(image[0], 'mouseleave');

    mouseMoves.subscribe(console.log);

    magnify(image[0], {debug: true, speed: 1000, src: ["https://static.pexels.com/photos/104827/cat-pet-animal-domestic-104827.jpeg"]});
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

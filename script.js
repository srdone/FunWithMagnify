window.onload = init;

function init() {
    var image = document.getElementsByClassName("display-image")[0];
    var stampImage = document.getElementsByClassName("stamp-image")[0];
    var imageContainer = document.getElementsByClassName('image-container')[0];

    var mouseMoves$ = Rx.Observable.fromEvent(image, 'mousemove');
    var mouseEnter$ = Rx.Observable.fromEvent(image, 'mouseenter');
    var mouseLeave$ = Rx.Observable.fromEvent(image, 'mouseleave');
    
}

//Pseudocode explaining how the positioning works
/*
    mouseDistanceFromLeft: mouseX - boundingBoxLeft
    mouseDistanceFromTop: mouseY - boundingBoxTop
    imageRatio: magnifiedMainImageWidth / mainImageWidth


    lens left: mouseDistanceFromLeft - halfLensWidth;
    lens top: mouseDistanceFromTop - halfLensHeight;

    //Positioning for mainImage
    backgroundX: -1 * (mouseDistanceFromLeft * imageRatio - halfLensWidth);
    backgroundY: -1 * (mouseDistanceFromTop * imageRatio - halfLensHeight);

    //Positioning for stampImage
    backgroundX: -1 * (stampDistanceFromMainImageLeft * imageRatio + mouseDistanceFromLeft * imageRatio - halfLensWidth)
    backgroundY: -1 * (stampDistanceFromMainImageTop * imageRatio + mouseDistanceFromTop * imageRatio - halfLensHeight)
*/


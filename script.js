window.onload = init;

function init() {
    var image = document.getElementsByClassName("display-image")[0];
    var stampImage = document.getElementsByClassName("stamp-image")[0];
    var imageContainer = document.getElementsByClassName('image-container')[0];
    var lens = document.createElement('div');
    lens.className = 'magnify-lens';
    document.body.appendChild(lens);
    lens.style.opacity = 1;
    lens.style.position = "absolute";
    console.log(lens);

    var mouseMoves$ = Rx.Observable.fromEvent(image, 'mousemove');
    var mouseEnter$ = Rx.Observable.fromEvent(image, 'mouseenter');
    var mouseLeave$ = Rx.Observable.fromEvent(image, 'mouseleave');

    var imageClientRect$ = Rx.Observable.of(image.getBoundingClientRect()).do(console.log);
    var stampImageRect$ = Rx.Observable.of(stampImage.getBoundingClientRect()).do(console.log);
    var magnificationFactor$ = Rx.Observable.of(1.5);
    var imageUrl$ = Rx.Observable.of(image.src);
    var stampUrl$ = Rx.Observable.of(stampImage.src);
    var lensDimensions = Rx.Observable.of({height: lens.offsetHeight, width: lens.offsetWidth});

    mouseMoves$
        .map(function (e) {
            return {
                 x: e.clientX,
                 y: e.clientY
             }
         })
        .withLatestFrom(imageClientRect$, stampImageRect$, magnificationFactor$, imageUrl$, stampUrl$, lensDimensions, function (mousePosition, imgRect, stampRect, magFactor, imageUrl, stampUrl, lensDimensions) {
                return {
                    lensDimensions: lensDimensions,
                    lensPosition: {
                        left: mousePosition.x - (lensDimensions.width / 2),
                        top: mousePosition.y - (lensDimensions.height / 2)
                    },
                    image: {
                        url: imageUrl,
                        backgroundPosition: {
                            x: calculatePosition(mousePosition.x, imgRect.left, 0, magFactor, lensDimensions.width),
                            y: calculatePosition(mousePosition.y, imgRect.top, 0, magFactor, lensDimensions.height)
                        },
                        height: calculateMagnification(imgRect.height, magFactor),
                        width: calculateMagnification(imgRect.width, magFactor)
                    },
                    stamp: {
                        url: stampUrl,
                        backgroundPosition: {
                            x: calculatePosition(mousePosition.x, imgRect.left, imgRect.left - stampRect.left, magFactor, lensDimensions.width),
                            y: calculatePosition(mousePosition.y, imgRect.top, imgRect.top - stampRect.top, magFactor, lensDimensions.height)
                        },
                        height: calculateMagnification(stampRect.height, magFactor),
                        width: calculateMagnification(stampRect.width, magFactor)
                    }
                }
            })
        .subscribe(function (positioning) {
            lens.style.left = positioning.lensPosition.left + 'px';
            lens.style.top = positioning.lensPosition.top + 'px';
            lens.style.backgroundPosition = positioning.stamp.backgroundPosition.x + 'px ' + positioning.stamp.backgroundPosition.y + 'px, ' + positioning.image.backgroundPosition.x + 'px ' + positioning.image.backgroundPosition.y + 'px';
            lens.style.backgroundSize = positioning.stamp.width + 'px ' + positioning.stamp.height + 'px, ' + positioning.image.width + 'px ' + positioning.image.height + 'px';
        });

    imageUrl$.withLatestFrom(stampUrl$).subscribe(function (urls) {
        lens.style.background = 'url(' + urls[1] + ') no-repeat, url(' + urls[0] + ') no-repeat';
        console.log(lens.style.background);
    })

    function calculatePosition(mousePosition, imagePosition, imageDistance, magFactor, lensDimension) {
        return Math.round((mousePosition - imagePosition + imageDistance) * magFactor - (lensDimension / 2)) * -1;
    }

    function calculateMagnification(originalSize, magFactor) {
        return originalSize * magFactor;
    }
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


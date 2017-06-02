window.onload = init;

function init() {
    var image = document.getElementsByClassName("display-image");
    console.log(image);

    var mouseMoves = Rx.Observable.fromEvent(image[0], 'mousemove');

    mouseMoves.subscribe(console.log);

    magnify(image[0], {debug: true, speed: 1000, src: "https://static.pexels.com/photos/104827/cat-pet-animal-domestic-104827.jpeg"});
}
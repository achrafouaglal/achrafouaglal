const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
canvas.style.background = "black"
canvas.height = window.innerHeight;
canvas.width = window.innerWidth;

const ImageSrc = "assets/image/images.jpg";

class MyImage {
    constructor(x, y, src) {
        this.x = x;
        this.y = y;
        this.image = new Image();
        this.image.src = src;
    }

    draw(ctx) {
        const img = this.image;
        ctx.drawImage(img, this.x - (img.width / 2), this.y - (img.height / 2));
    }

    update(x, y) {
        this.x = x;
        this.y += 1;
    }
}

let currentImage = new MyImage(canvas.width / 2, canvas.height / 2, ImageSrc);

let updateImage = function() {
    requestAnimationFrame(updateImage)
    currentImage.update();

}
updateImage()
// document.addEventListener("mousemove", (e) => {
//     const mouseX = e.clientX;
//     const mouseY = e.clientY;
//     // Update image position
//     currentImage.update(mouseX, mouseY);

//     // Clear canvas and redraw image
//     ctx.clearRect(0, 0, canvas.width, canvas.height);
//     currentImage.draw(ctx);
// });

// Initial draw
currentImage.draw(ctx);



// Gyroscope usage
if ('Gyroscope' in window) {
    const sensor = new Gyroscope({ frequency: 60 }); // Create gyroscope with a frequency of 60Hz

    if(sensor.onreading == null){
        
    }else{
        sensor.onreading = () => {
            const text = document.getElementById("text");
            console.log(sensor.x,sensor.y,sensor.z)
            if (text) {
                text.innerHTML = `x: ${sensor.x.toFixed(2)} y: ${sensor.y.toFixed(2)} z: ${sensor.z.toFixed(2)}`;
                // div.style.left = sensor.x - 159 + "px";
                // div.style.top = sensor.y - 79 + "px"; 
                div.style.transform = `scale(${1.0 + sensor.z})`
            }
        };
    
            sensor.onerror = (event) => {
            console.error("Gyroscope error: ", event.error);
        };
    
        try {
            sensor.start();
            console.log(sensor.x,sensor.y,sensor.z)
        } catch (error) {
            console.error("Gyroscope could not be started:", error);
        }
    }

} else {
    console.warn("Gyroscope is not supported by your browser.");
}
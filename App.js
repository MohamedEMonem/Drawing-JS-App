const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
const selectElement = document.getElementById('shape');
const rangeElement = document.getElementById('sides');
const numberInput = document.getElementById('sidesValue');
const organicOptions = document.getElementById('organicOptions');
const organicFactorInput = document.getElementById('organicFactor');
const organicValueInput = document.getElementById('organicValue');
const drawButton = document.getElementById('drawButton');
const clearButton = document.getElementById('clearButton');
const borderCheckbox = document.getElementById('border');
const imageUpload = document.getElementById('imageUpload');

let uploadedImage = null; // Variable to store the uploaded image
const outlineCheckbox = document.getElementById('Outline'); // Reference to the Outline checkbox

// Show or hide relevant inputs based on selected shape
selectElement.addEventListener('change', function () {
    const selectedValue = selectElement.value;
    document.getElementById('sidesRange').style.display = selectedValue === 'polygon' ? 'block' : 'none';
    organicOptions.style.display = selectedValue === 'organic' ? 'block' : 'none'; // Show organic options
    imageUpload.style.display = selectedValue === 'image' ? 'block' : 'none'; // Show image upload

    // Show outline checkbox for other shapes
    outlineCheckbox.style.display = selectedValue !== 'image' ? 'inline-block' : 'none';
});

// Handle image upload
imageUpload.addEventListener('change', function (event) {
    const file = event.target.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = function (e) {
            const img = new Image();
            img.onload = function () {
                uploadedImage = img; // Store the image to be drawn later
            };
            img.src = e.target.result;

            // Hide the outline checkbox when an image is uploaded
            outlineCheckbox.style.display = 'none';
        };
        reader.readAsDataURL(file);
    }
});

// Sync range slider with the number input for sides
rangeElement.addEventListener('input', function () {
    numberInput.value = rangeElement.value;
});

// Sync range slider with the number input for organic factor
organicFactorInput.addEventListener('input', function () {
    organicValueInput.value = organicFactorInput.value;
});

// Sync number input with the range slider
numberInput.addEventListener('input', function () {
    rangeElement.value = numberInput.value;
});

// Handle the draw button click to draw shapes
drawButton.addEventListener('click', function () {
    const shape = selectElement.value;
    const color = document.getElementById('color').value;
    const sides = parseInt(numberInput.value, 10);
    const organicFactor = parseInt(organicValueInput.value, 10);
    const isOutline = borderCheckbox.checked; // Check if outline only is selected

    // Clear the canvas before drawing a new shape
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Set stroke or fill color based on the outline option
    ctx.fillStyle = isOutline ? 'transparent' : color; // No fill for outline
    ctx.strokeStyle = color;
    ctx.lineWidth = 2;

    // Draw the selected shape
    switch (shape) {
        case 'circle':
            drawCircle(isOutline);
            break;
        case 'rectangle':
            drawRectangle(isOutline);
            break;
        case 'square':
            drawSquare(isOutline);
            break;
        case 'triangle':
            drawTriangle(isOutline);
            break;
        case 'polygon':
            drawPolygon(sides, isOutline);
            break;
        case 'organic':
            drawOrganicShape(organicFactor, isOutline);
            break;
        case 'image':
            if (uploadedImage) {
                drawImage(uploadedImage);
            } else {
                alert("Please upload an image before drawing.");
            }
            break;
        default:
            break;
    }
});

// Handle the clear button click to clear the canvas
clearButton.addEventListener('click', function () {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    uploadedImage = null; // Clear uploaded image on clear
});

// Function to draw a circle
function drawCircle(isOutline) {
    const centerX = canvas.width / 2;
    const centerY = canvas.height / 2;
    const radius = 100;

    ctx.beginPath();
    ctx.arc(centerX, centerY, radius, 0, 2 * Math.PI);
    isOutline ? ctx.stroke() : ctx.fill();
}

// Function to draw a rectangle
function drawRectangle(isOutline) {
    const width = 150;
    const height = 100;
    const x = (canvas.width - width) / 2;
    const y = (canvas.height - height) / 2;

    isOutline ? ctx.strokeRect(x, y, width, height) : ctx.fillRect(x, y, width, height);
}

// Function to draw a square
function drawSquare(isOutline) {
    const size = 100;
    const x = (canvas.width - size) / 2;
    const y = (canvas.height - size) / 2;

    isOutline ? ctx.strokeRect(x, y, size, size) : ctx.fillRect(x, y, size, size);
}

// Function to draw a triangle
function drawTriangle(isOutline) {
    const x = canvas.width / 2;
    const y = canvas.height / 2;
    const height = 100;

    ctx.beginPath();
    ctx.moveTo(x, y - height / 2); // Top point
    ctx.lineTo(x - height / 2, y + height / 2); // Bottom left
    ctx.lineTo(x + height / 2, y + height / 2); // Bottom right
    ctx.closePath();

    isOutline ? ctx.stroke() : ctx.fill();
}

// Function to draw a polygon with a given number of sides
function drawPolygon(sides, isOutline) {
    const radius = 100;
    const centerX = canvas.width / 2;
    const centerY = canvas.height / 2;

    ctx.beginPath();
    for (let i = 0; i < sides; i++) {
        const angle = (i * 2 * Math.PI) / sides;
        const x = centerX + radius * Math.cos(angle);
        const y = centerY + radius * Math.sin(angle);
        ctx.lineTo(x, y);
    }
    ctx.closePath();

    isOutline ? ctx.stroke() : ctx.fill();
}

// Function to draw an organic shape
function drawOrganicShape(organicFactor, isOutline) {
    const centerX = canvas.width / 2;
    const centerY = canvas.height / 2;

    ctx.beginPath();
    const numPoints = 10; // Number of points for the organic shape
    for (let i = 0; i < numPoints; i++) {
        const angle = (i * 2 * Math.PI) / numPoints;
        const radius = 100 + (Math.random() * organicFactor); // Add random radius variation
        const x = centerX + radius * Math.cos(angle);
        const y = centerY + radius * Math.sin(angle);
        ctx.lineTo(x, y);
    }
    ctx.closePath();

    isOutline ? ctx.stroke() : ctx.fill();
}

// Function to draw the uploaded image
function drawImage(img) {
    const imgWidth = canvas.width;
    const imgHeight = canvas.height;
    ctx.clearRect(0, 0, canvas.width, canvas.height); // Clear the canvas
    ctx.drawImage(img, 0, 0, imgWidth, imgHeight); // Draw the uploaded image
    scanImageForShapes(); // Scan the image for black lines after drawing it
}


// Function to scan the uploaded image and redraw black lines
function scanImageForShapes() {
    const imgData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    const data = imgData.data;

    // Clear the canvas for redrawing shapes
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    const color = document.getElementById('color').value; // Get the color value from input
    ctx.strokeStyle = color; // Set color for drawing detected shapes
    ctx.lineWidth = 2;

    // Loop through pixels to find black lines
    for (let y = 0; y < imgData.height; y++) {
        for (let x = 0; x < imgData.width; x++) {
            const index = (y * imgData.width + x) * 4;
            const r = data[index];
            const g = data[index + 1];
            const b = data[index + 2];

            // Check for black pixels (you can adjust the threshold)
            if (r < 100 && g < 100 && b < 100) {
                ctx.beginPath();
                ctx.moveTo(x, y); // Start drawing from this pixel

                // Check for adjacent black pixels to draw a line
                if (x + 1 < imgData.width && data[index + 4] < 100) {
                    ctx.lineTo(x + 1, y); // Draw to the right pixel
                }
                if (y + 1 < imgData.height && data[index + imgData.width * 4] < 100) {
                    ctx.lineTo(x, y + 1); // Draw to the pixel below
                }

                ctx.stroke(); // Draw the line
            }
        }
    }
}

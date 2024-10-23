<<<<<<< HEAD
=======


>>>>>>> 87107b8c4589872191c512066a449336e2541871
```markdown
# Drawing JS App

A simple web application that allows users to draw various shapes on a canvas using HTML5, CSS, and JavaScript. Users can select from geometric shapes, organic shapes, or even upload an image to draw on.

## Features

- Select and draw shapes such as circles, rectangles, squares, triangles, polygons, and organic shapes.
- Upload images to draw on them.
- Customizable color options and outline features.
- Responsive design with adjustable input elements.

## Table of Contents

- [Installation](#installation)
- [Usage](#usage)
- [Code Overview](#code-overview)
  - [HTML Structure](#html-structure)
  - [CSS Styles](#css-styles)
  - [JavaScript Functionality](#javascript-functionality)
- [Contributing](#contributing)
- [License](#license)

## Installation

To run this application locally, clone the repository and open the `index.html` file in a web browser.

```bash
git clone https://github.com/MohamedEMonem/Drawing-JS-App.git
cd Drawing-JS-App
open index.html  # or use your preferred method to open the file
```

## Usage

1. Choose a shape from the dropdown menu.
2. Adjust parameters like the number of sides (for polygons) or the organic factor.
3. Select a color and optionally choose to outline the shape.
4. Click "Draw" to render the shape on the canvas.
5. Use "Clear" to reset the canvas.

## Code Overview

### HTML Structure

The `index.html` file consists of a simple form for user input and a canvas for drawing.

```html
<form id="drawForm">
    ...
    <canvas id="canvas" width="400" height="400"></canvas>
</form>
```

- **Form Elements**: The form includes a dropdown for shape selection, a color picker, and inputs for the number of sides and organic factors.
- **Canvas**: An HTML5 `<canvas>` element where shapes will be rendered.

### CSS Styles

Basic styling is applied to the canvas and input elements.

```css
#canvas {
    border: 1px solid #000;
    margin-top: 20px;
}
```

- **Canvas Border**: The canvas has a solid border for visibility.
- **Input Styles**: Number inputs are styled for better usability.

### JavaScript Functionality

The `scripts/app.js` file handles all the drawing logic and user interactions.

1. **Canvas Setup**:
   - Retrieves the canvas context for drawing operations.

   ```javascript
   const canvas = document.getElementById('canvas');
   const ctx = canvas.getContext('2d');
   ```

2. **Event Listeners**:
   - **Shape Selection**: Adjusts the visibility of inputs based on the selected shape.
   - **Image Upload Handling**: Loads and stores the uploaded image for drawing later.
   - **Drawing Logic**: Handles the drawing of shapes based on user input.

   ```javascript
   selectElement.addEventListener('change', function () { ... });
   drawButton.addEventListener('click', function () { ... });
   ```

3. **Shape Drawing Functions**:
   - Individual functions for each shape control the drawing parameters. 
   - Example for drawing a circle:

   ```javascript
   function drawCircle(isOutline) {
       const centerX = canvas.width / 2;
       const centerY = canvas.height / 2;
       const radius = 100;

       ctx.beginPath();
       ctx.arc(centerX, centerY, radius, 0, 2 * Math.PI);
       isOutline ? ctx.stroke() : ctx.fill();
   }
   ```

4. **Organic Shapes**: Randomized drawing based on a specified factor, introducing variability in the shapes.

   ```javascript
   function drawOrganicShape(organicFactor, isOutline) {
       ...
       const radius = 100 + (Math.random() * organicFactor); // Variability
       ...
   }
   ```

5. **Image Drawing and Scanning**:
   - Handles drawing uploaded images on the canvas and can analyze the image for black lines to create shapes.

   ```javascript
   function drawImage(img) {
       ...
       scanImageForShapes(); // Call to detect shapes in the uploaded image
   }
   ```

### Code Notes

- **Error Handling**: Basic checks ensure images are uploaded before drawing.
- **Responsiveness**: The application layout is simple but can be enhanced with media queries for better mobile support.
- **Modularity**: Functions are modular for clarity, allowing for easy updates and maintenance.

## Contributing

Contributions are welcome! Please open an issue or submit a pull request.

## License

This project is licensed under the MIT License.
```

<<<<<<< HEAD
Feel free to adjust any sections further to better fit your project's specifics! You can copy this text and save it as `README.md` in your project directory.
=======
Feel free to adjust any sections to better fit your project's specifics! You can copy this text and save it as `README.md` in your project directory.
>>>>>>> 87107b8c4589872191c512066a449336e2541871

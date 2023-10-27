const button = document.querySelector('#btn');
const audio1 = document.getElementById('audio1');
const margin = 30; // Define the minimum margin
const segmentSize = 10; // Define the size of segments for collision checking

button.addEventListener('click', moveButton); // Use 'click' event for mobile

function moveButton() {
  const buttonRect = button.getBoundingClientRect();
  const buttonWidth = buttonRect.width;
  const buttonHeight = buttonRect.height;

  // Calculate the maximum allowed position
  const maxX = window.innerWidth - buttonWidth - 2 * margin;
  const maxY = window.innerHeight - buttonHeight - 2 * margin;

  let randomX, randomY;

  do {
    randomX = Math.random() * maxX + margin;
    randomY = Math.random() * maxY + margin;
  } while (isColliding(randomX, randomY, buttonWidth, buttonHeight));

  // Set the button's new position
  button.style.left = randomX + 'px';
  button.style.top = randomY + 'px';
}

function isColliding(x, y, width, height) {
  const numSegmentsX = Math.floor(width / segmentSize);
  const numSegmentsY = Math.floor(height / segmentSize);

  for (let i = 0; i <= numSegmentsX; i++) {
    for (let j = 0; j <= numSegmentsY; j++) {
      const offsetX = i * segmentSize;
      const offsetY = j * segmentSize;

      const elements = document.elementsFromPoint(x + offsetX, y + offsetY);

      for (const element of elements) {
        if (element !== button && !element.contains(button)) {
          return true;
        }
      }
    }
  }

  return false;
}

// Prevent the default form submission for Enter key press
document.addEventListener('keydown', function (event) {
  if (event.key === 'Enter') {
    event.preventDefault();
  }
});

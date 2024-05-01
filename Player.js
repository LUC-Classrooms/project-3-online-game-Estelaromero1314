function Player(tempX, tempY) {
  // Properties
  this.x = tempX;
  this.y = tempY;
  this.diam = 50;
  this.angle = 0;
  this.xSpeed = 0;
  this.ySpeed = 0;

  // Display method
  this.display = function () {
    push(); // Create a drawing layer
    translate(this.x, this.y); // Move origin point
    rotate(this.angle); // Player can rotate

    fill(0); // Black

    let r = this.diam / 2; // Radius
    let x1 = cos(PI + HALF_PI) * r; 
    let y1 = sin(PI + HALF_PI) * r; 
    let x2 = cos(PI / 6) * r;
    let y2 = sin(PI / 6) * r;
    let x3 = cos(PI * 5 / 6) * r;
    let y3 = sin(PI * 5 / 6) * r;

    beginShape();
    vertex(x1, y1);
    vertex(x2, y2);
    vertex(x3, y3);
    endShape();

    pop(); 
  };

  // Move method
  this.move = function () {
    // Follow the mouse for now
    this.x += this.xSpeed;
    this.y += this.ySpeed;

    // Wrap around the canvas
    if (this.x > width) this.x = 0;
    if (this.x < 0) this.x = width;
    if (this.y > height) this.y = 0;
    if (this.y < 0) this.y = height;
  };

  // Thrust method
  this.thrust = function() {
    let horiz = Math.sin(this.angle);
    let vert = Math.cos(this.angle);
    this.xSpeed += 0.02 * horiz;
    this.ySpeed -= 0.02 * vert;
  };

  // Brake method
  this.brake = function() {
    if (this.xSpeed > 0)
      this.xSpeed -= 0.01; // Slow down on x-axis
    else
      this.xSpeed += 0.01; // Bring it back up if less than 0
    if (this.ySpeed > 0)
      this.ySpeed -= 0.01; // Slow down on y-axis
    else
      this.ySpeed += 0.01; // Bring it back up if less than 0
  };
}
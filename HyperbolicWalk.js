
// complex Numbers
class cnum {
    constructor (x , y){
    this.x=x;
    this.y=y;
}

}
function setup(){
    w = 500
    h = 500
    a = new cnum(0,0);
    createCanvas(w,h);
    background(220);
    circle(w/2,h/2,w);
    setstepsize(0.05) //dont choose below 0.2 (rounding errors)
}

 function draw(){
    if(a.x**2 + a.y**2<0.999999) {
        theta = random(0, 2*Math.PI)
        a2 = f(theta, a)
        if(Math.abs(a.x*a2.y-a2.x*a.y) < 0.0000001){ // Approximate big circles with straight lines
            drawline(a,a2)
            console.log("Line")
        }
        else{
            drawcirc(a,a2)
            console.log("Circle")
        }
        a = a2
    } else {console.log("Stop")}
} 


// Defining Stepsize
function setstepsize(step){
    return r = new cnum(step, 0)
}

// Complex Conjugate
function conj(a){
   return new cnum(a.x, -a.y)
}

// Sum of 2 Numbers
function sum(a,b){
    return new cnum(a.x + b.x, a.y + b.y)
}

// Difference of 2 Numbers
function diff(a,b){
    return new cnum(a.x - b.x, a.y - b.y)
}

// Product of 2 Numbers
function prod(a,b){
    return new cnum(a.x * b.x - a.y * b.y, a.x * b.y + a.y * b.x)
}

// Quotient of 2 Numbers
function divis(a,b){
    return new cnum((a.x * b.x + a.y * b.y)/(b.x ** 2+ b.y ** 2), (a.y * b.x - a.x * b.y)/(b.x ** 2 + b.y ** 2))
}

// Complex Number e^iθ
function eI(theta){
    return new cnum(Math.cos(theta), Math.sin(theta))
}

// 1 in complex system
function one(){
    return new cnum(1, 0)
}

// Creating a random new point in distance r
function f(theta,z){
    let up = diff(prod(r, eI(theta)), z)
    let dw = diff(prod(prod(r, eI(theta)), conj(z)), one())
    return divis(up, dw)
}

// Inversion of a point on the unit circle
function invers(z){
    let r2 = z.x**2 + z.y**2
    return new cnum (z.x/r2,z.y/r2)
    
}

// Creating hyperbolic line between 2 points
function drawcirc(p1, p2){
    stroke(255,0,0)
    let p3 = invers(p1)
    let y0 = ( (p1.x**2 + p1.y**2 - p2.x**2 - p2.y**2) * (p1.x - p3.x) - (p1.x**2 + p1.y**2 - p3.x**2 - p3.y**2) * (p1.x - p2.x) ) / (2* ((p1.y - p2.y) * (p1.x - p3.x) - (p1.y - p3.y) * (p1.x - p2.x)))
    let x0 = ( (p1.x**2 - p2.x**2 + p1.y**2 - p2.y**2 - 2* y0 * (p1.y - p2.y) ) / (2* (p1.x - p2.x)))
    let r = Math.sqrt((p1.x - x0)**2 + (p1.y - y0)**2)
    noFill(); 
    let dx1 = p1.x-x0
    let dx2 = p2.x-x0
    let dy1 = p1.y-y0
    let dy2 = p2.y-y0
    let q1 = atan2(dy1,dx1)
    let q2 = atan2(dy2,dx2)
    if(dx1*dy2-dx2*dy1>0){
        arc(w* (x0+1)/2, w*(y0+1)/2, (w*r), (w*r), q1, q2)
    }
    else{
    arc(w* (x0+1)/2,w* (y0+1)/2, (w*r), (w*r), q2, q1)
    }
}
 
// Creating a straight line between 2 points (if they on a diameter of the circle)
function drawline(p1,p2){
    stroke(255,0,0)
    line(w*(p1.x+1)/2, h*(p1.y+1)/2, w*(p2.x+1)/2, h*(p2.y+1)/2)
}


function a(x, y, z, b) {
    result =  Math.pow(1 + y, 2);
    result *= Math.pow(Math.abs(x + y), 0.3) / Math.pow(b, 2) + z;
    result /= 1 + Math.pow(Math.E, -(x-z)) + Math.pow(Math.abs(y), 0.43);
    return result;
}

function b(x, y, z) {
    result = y + Math.atan(Math.pow(Math.abs(x*x + z), 0.1))
    result /= 2 + Math.pow(Math.sin(Math.pow(y, 3)), 2)
    result += Math.pow(Math.E, - (x+z)/y )
    return x * result;
}
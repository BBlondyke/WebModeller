//Linear Algebra Support Library

/*
 * Linear Support Library:
 * 		Authored by Ryan Connors as a support library of functions for GL applications
 * 
 * 		Free to distribute and modify, no warranty provided.
 */


/*
 * Vector class representing a 3 dimensional vector in space
 * 
 */
function Vector(x, y, z) {
	this.x = x;
	this.y = y;
	this.z = z;
	
	this.add = function(vector) {
		var rtn = new Vector(0.0, 0.0, 0.0);
		rtn.x = this.x + vector.x;
		rtn.y = this.y + vector.y;
		rtn.z = this.z + vector.z;
		
		return rtn;
	}
	
	this.scale = function(scalar) {
		this.x = this.x * scalar;
		this.y = this.y * scalar;
		this.z = this.z * scalar;
	}
	
	this.scalarMult = function(scalar) {
		var rtn = new Vector(this.x, this.y, this.z);
		rtn.x = rtn.x * scalar;
		rtn.y = rtn.y * scalar;
		rtn.z = rtn.z * scalar;
		
		return rtn;
	}
	
	this.dotProduct = function( vector ) {
		return (this.x * vector.x + this.y * vector.y + this.z * vector.z);
	}
	
	this.crossProduct = function(vector) {
		//use sarrus rule
		var rtn = new Vector();
		rtn.x = (this.y * vector.z - this.z * vector.y);
		rtn.y = (this.z * vector.x - this.x * vector.z);
		rtn.z = (this.x * vector.y - this.y * vector.x);
		return rtn;
	}
	
	this.copy = function() {
		var rtn = new Vector(this.x, this.y, this.z);
		return rtn;
	}
	
	this.toFloat32Array = function() {
		return new Float32Array([
			this.x,
			this.y,
			this.z
		]);
	}
	
}

/*
 * Vector4D, its like a vector3D but with a fourth dimension.
 * 
 * 
 */
function Vector4D(x, y, z, w) {
	this.x = x;
	this.y = y;
	this.z = z;
	this.w = w;
	
	this.add = function(vector) {
		var rtn = new Vector4D(0.0, 0.0, 0.0, 0.0);
		rtn.x = this.x + vector.x;
		rtn.y = this.y + vector.y;
		rtn.z = this.z + vector.z;
		rtn.w = this.w + vector.w;
		
		return rtn;
	}
	
	this.scale = function(scalar) {
		this.x = this.x * scalar;
		this.y = this.y * scalar;
		this.z = this.z * scalar;
		this.w = this.w * scalar;
	}
	
	this.scalarMult = function(scalar) {
		var rtn = new Vector4D(this.x, this.y, this.z, this.w);
		rtn.x = rtn.x * scalar;
		rtn.y = rtn.y * scalar;
		rtn.z = rtn.z * scalar;
		rtn.w = rtn.w * scalar;
		
		return rtn;
	}
	
	this.dotProduct = function( vector ) {
		return (this.x * vector.x + this.y * vector.y + this.z * vector.z + this.w * vector.w);
	}
	
	this.copy = function() {
		var rtn = new Vector4D(this.x, this.y, this.z, this.w);
		return rtn;
	}
	
	this.toFloat32Array = function() {
		return new Float32Array([
			this.x,
			this.y,
			this.z,
			this.w
		]);
	}
	
}


/*
 * Matrix Classes
 * 
 * this contain support functions for operations on matrices
 */

function Matrix3D() {
	
	this.x = new Vector(0.0, 0.0, 0.0);
	this.y = new Vector(0.0, 0.0, 0.0);
	this.z = new Vector(0.0, 0.0, 0.0);
	
	this.populateFromArray = function( array ) {
		this.x = new Vector(array[0], array[1], array[2]);
		this.y = new Vector(array[3], array[4], array[5]);
		this.z = new Vector(array[6], array[7], array[8]);
	}
	
	this.rowVecMult = function(vector) {
		
		var rtn = new Vector( 0.0, 0.0, 0.0);
		
		rtn.x = ( vector.x * this.x.x + vector.y * this.y.x + vector.z * this.z.x );
		rtn.y = ( vector.x * this.x.y + vector.y * this.y.y + vector.z * this.z.y );
		rtn.z = ( vector.x * this.x.z + vector.y * this.y.z + vector.z * this.z.z );
		
		return rtn;
	}
	
	this.colVecMult = function(vector) {
		
		return new Vector(this.x.dotProduct(vector),
							 this.y.dotProduct(vector),
							 this.z.dotProduct(vector) );		
	}
	
	
	this.transpose = function() {
		var rtn = new Matrix3D();
		
		rtn.x.x = this.x.x;
		rtn.x.y = this.y.x;
		rtn.x.z = this.z.x;
		
		rtn.y.x = this.x.y;
		rtn.y.y = this.y.y;
		rtn.y.z = this.z.y;
		
		rtn.z.x = this.x.z;
		rtn.z.y = this.y.z;
		rtn.z.z = thix.z.z;
		
		return rtn;
		
	}
	
	this.scalarMul = function(scalar) {
		
		this.x.scale(scalar);
		this.y.scale(scalar);
		this.z.scale(scalar);
		
	}
	
	this.matMul = function( matrix ) {
		
		var rtn = new Matrix3D();
		var argument = matrix.transpose();
		
		rtn.x = new Vector( this.x.dotProduct(argument.x), this.x.dotProduct(argument.y), this.x.dotProduct(argument.z) );
		rtn.y = new Vector( this.y.dotProduct(argument.x), this.y.dotProduct(argument.y), this.y.dotProduct(argument.z) );
		rtn.z = new Vector( this.z.dotProduct(argument.x), this.z.dotProduct(argument.y), this.z.dorProduct(argument.z) );
		
		return rtn;
		
	}
	
	this.determinant = function() {
		
		var determinate = 0.0;
		
		determinate += this.x.x * ( (this.y.y * this.z.z) - (this.y.z * this.z.y) );
		determinate += this.x.y * ( (this.y.z * this.z.x) - (this.y.x * this.z.z) );
		determinate += this.x.z * ( (this.y.x * this.z.y) - (this.y.y * this.z.x) );
		
		return determinate;
	}
	
	this.toFloat32Array = function() {
		return new Float32Array([
			this.x.x,	this.x.y,	this.x.z,
			this.y.x,	this.y.y,	this.y.z,
			this.z.x,	this.z.y,	this.z.z
			])
	}
}
/*
 * Matrix4D : 4 dimensional matrix class with support operations
 */

function Matrix4D() {
	this.x = new Vector4D(0.0, 0.0, 0.0, 0.0);
	this.y = new Vector4D(0.0, 0.0, 0.0, 0.0);
	this.z = new Vector4D(0.0, 0.0, 0.0, 0.0);
	this.w = new Vector4D(0.0, 0.0, 0.0, 0.0);
	
	this.populateFromArray = function ( array ) {
		this.x = new Vector4D(array[0], array[1], array[2], array[3]);
		this.y = new Vector4D(array[4], array[5], array[6], array[7]);
		this.z = new Vector4D(array[8], array[9], array[10], array[11]);
		this.w = new Vector4D(array[12], array[13], array[14], array[15]);
	}
	
	this.rowVecMult = function(vector) {
		
		var rtn = new Vector4D( 0.0, 0.0, 0.0, 0.0 );
		
		rtn.x = vector.x * this.x.x + vector.y * this.y.x + vector.z * this.z.x + vector.w * this.w.x;
		rtn.y = vector.x * this.x.y + vector.y * this.y.y + vector.z * this.z.y + vector.w * this.w.y;
		rtn.z = vector.x * this.x.z + vector.y * this.y.z + vector.z * this.z.z + vector.w * this.w.z;
		rtn.w = vector.x * this.x.w + vector.y * this.y.w + vector.z * this.z.w + vector.w * this.w.w;
		
		return rtn;
	}
	
	this.colVecMult = function (vector) {
		return new Vector4D( this.x.dotProduct(vector),
							 this.y.dotProduct(vector),
							 this.z.dotProduct(vector),
							 this.w.dotProduct(vector) );
		
	}
	
	
	this.transpose = function() {
		var rtn = new Matrix4D();
		
		rtn.x = new Vector4D(this.x.x, this.y.x, this.z.x, this.w.x);
		rtn.y = new Vector4D(this.x.y, this.y.y, this.z.y, this.w.y);
		rtn.z = new Vector4D(this.x.z, this.y.z, this.z.z, this.w.z);
		rtn.w = new Vector4D(this.x.w, this.y.w, this.z.w, this.w.w);
		
		return rtn;
		
	}
	
	this.scalarMul = function(scalar) {
		
		this.x.scale(scalar);
		this.y.scale(scalar);
		this.z.scale(scalar);
		this.w.scale(scalar);
		
	}
	
	this.matMul = function( matrix ) {
		
		var rtn = new Matrix4D();
		var argument = matrix.transpose();
		
		rtn.x = new Vector4D( this.x.dotProduct(argument.x), this.x.dotProduct(argument.y), this.x.dotProduct(argument.z), this.x.dotProduct(argument.w) );
		rtn.y = new Vector4D( this.y.dotProduct(argument.x), this.y.dotProduct(argument.y), this.y.dotProduct(argument.z), this.y.dotProduct(argument.w) );
		rtn.z = new Vector4D( this.z.dotProduct(argument.x), this.z.dotProduct(argument.y), this.z.dotProduct(argument.z), this.z.dotProduct(argument.w) );
		rtn.w = new Vector4D( this.w.dotProduct(argument.x), this.w.dotProduct(argument.y), this.w.dotProduct(argument.z), this.w.dotProduct(argument.w) );
		
		return rtn;
		
	}
	
	this.determinant = function() {
		
		//use laplace expansion
		var rtn = 0.0;
		var subMatA = new Matrix3D();
		var subMatB = new Matrix3D();
		var subMatC = new Matrix3D();
		var subMatD = new Matrix3D();
		
		subMatA.populateFromArray([this.y.y, this.y.z, this.y.w,
								   this.z.y, this.z.z, this.z.w,
								   this.w.y, this.w.z, this.w.w]);
								   
		subMatB.populateFromArray([	this.x.y, this.x.z, this.x.w,
									this.z.y, this.z.z, this.z.w,
									this.w.y, this.w.z, this.w.w]);
		
		subMatC.populateFromArray([ this.x.y, this.x.z, this.x.w,
									this.y.y, this.y.z, this.y.w,
									this.w.y, this.w.z, this.w.w]);
		
		subMatD.populateFromArray([	this.x.y, this.x.z, this.x.w,
									this.y.y, this.y.z, this.y.w,
									this.z.y, this.z.z, this.z.w]);
		
		rtn = this.x.x * (subMatA.determinant()) - this.y.x * (subMatB.determinant()) + this.z.x * (subMatC.determinant()) - this.w.x * (subMatD.determinant());
		return rtn;
	}
	
	//more tedious than working with the windows api. 
	this.inverse = function() {
		var rtn = new Matrix4D();
		var scale = this.determinant()
		scale = 1.0/scale;
		
	    rtn.x.x = this.y.z*this.z.w*this.w.y - this.y.w*this.z.z*this.w.y + this.y.w*this.z.y*this.w.z - this.y.y*this.z.w*this.w.z - this.y.z*this.z.y*this.w.w + this.y.y*this.z.z*this.w.w;
	    rtn.x.y = this.x.w*this.z.z*this.w.y - this.x.z*this.z.w*this.w.y - this.x.w*this.z.y*this.w.z + this.x.y*this.z.w*this.w.z + this.x.z*this.z.y*this.w.w - this.x.y*this.z.z*this.w.w;
	    rtn.x.z = this.x.z*this.y.w*this.w.y - this.x.w*this.y.z*this.w.y + this.x.w*this.y.y*this.w.z - this.x.y*this.y.w*this.w.z - this.x.z*this.y.y*this.w.w + this.x.y*this.y.z*this.w.w;
	    rtn.x.w = this.x.w*this.y.z*this.z.y - this.x.z*this.y.w*this.z.y - this.x.w*this.y.y*this.z.z + this.x.y*this.y.w*this.z.z + this.x.z*this.y.y*this.z.w - this.x.y*this.y.z*this.z.w;
	    rtn.y.x = this.y.w*this.z.z*this.w.x - this.y.z*this.z.w*this.w.x - this.y.w*this.z.x*this.w.z + this.y.x*this.z.w*this.w.z + this.y.z*this.z.x*this.w.w - this.y.x*this.z.z*this.w.w;
	    rtn.y.y = this.x.z*this.z.w*this.w.x - this.x.w*this.z.z*this.w.x + this.x.w*this.z.x*this.w.z - this.x.x*this.z.w*this.w.z - this.x.z*this.z.x*this.w.w + this.x.x*this.z.z*this.w.w;
	    rtn.y.z = this.x.w*this.y.z*this.w.x - this.x.z*this.y.w*this.w.x - this.x.w*this.y.x*this.w.z + this.x.x*this.y.w*this.w.z + this.x.z*this.y.x*this.w.w - this.x.x*this.y.z*this.w.w;
	    rtn.y.w = this.x.z*this.y.w*this.z.x - this.x.w*this.y.z*this.z.x + this.x.w*this.y.x*this.z.z - this.x.x*this.y.w*this.z.z - this.x.z*this.y.x*this.z.w + this.x.x*this.y.z*this.z.w;
	    rtn.z.x = this.y.y*this.z.w*this.w.x - this.y.w*this.z.y*this.w.x + this.y.w*this.z.x*this.w.y - this.y.x*this.z.w*this.w.y - this.y.y*this.z.x*this.w.w + this.y.x*this.z.y*this.w.w;
	    rtn.z.y = this.x.w*this.z.y*this.w.x - this.x.y*this.z.w*this.w.x - this.x.w*this.z.x*this.w.y + this.x.x*this.z.w*this.w.y + this.x.y*this.z.x*this.w.w - this.x.x*this.z.y*this.w.w;
	    rtn.z.z = this.x.y*this.y.w*this.w.x - this.x.w*this.y.y*this.w.x + this.x.w*this.y.x*this.w.y - this.x.x*this.y.w*this.w.y - this.x.y*this.y.x*this.w.w + this.x.x*this.y.y*this.w.w;
	    rtn.z.w = this.x.w*this.y.y*this.z.x - this.x.y*this.y.w*this.z.x - this.x.w*this.y.x*this.z.y + this.x.x*this.y.w*this.z.y + this.x.y*this.y.x*this.z.w - this.x.x*this.y.y*this.z.w;
	    rtn.w.x = this.y.z*this.z.y*this.w.x - this.y.y*this.z.z*this.w.x - this.y.z*this.z.x*this.w.y + this.y.x*this.z.z*this.w.y + this.y.y*this.z.x*this.w.z - this.y.x*this.z.y*this.w.z;
	    rtn.w.y = this.x.y*this.z.z*this.w.x - this.x.z*this.z.y*this.w.x + this.x.z*this.z.x*this.w.y - this.x.x*this.z.z*this.w.y - this.x.y*this.z.x*this.w.z + this.x.x*this.z.y*this.w.z;
	    rtn.w.z = this.x.z*this.y.y*this.w.x - this.x.y*this.y.z*this.w.x - this.x.z*this.y.x*this.w.y + this.x.x*this.y.z*this.w.y + this.x.y*this.y.x*this.w.z - this.x.x*this.y.y*this.w.z;
	    rtn.w.w = this.x.y*this.y.z*this.z.x - this.x.z*this.y.y*this.z.x + this.x.z*this.y.x*this.z.y - this.x.x*this.y.z*this.z.y - this.x.y*this.y.x*this.z.z + this.x.x*this.y.y*this.z.z;
		
		rtn.scalarMul(scale);
		return rtn;
	}
	
	this.toFloat32Array = function() {
		return new Float32Array([
				this.x.x,	this.x.y,	this.x.z, 	this.x.w,
				this.y.x,	this.y.y,	this.y.z,	this.y.w,
				this.z.x,	this.z.y,	this.z.z,	this.z.w,
				this.w.x,	this.w.y,	this.w.z,	this.w.w
			])
	}

	this.copy = function() {
		var rtn = new Matrix4D();
		rtn.x = this.x.copy();
		rtn.y = this.y.copy();
		rtn.z = this.z.copy();
		rtn.w = this.w.copy();
		return rtn;
	}
	
}

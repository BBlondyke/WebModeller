//Ryan Connors
//Joseph Bernay

/*
 * Do we want these to be objects with fields to retain values, or do we want them
 * to simply be functions that generate a mesh object using the passed parameters?
 * 
 * I'd assume the latter. For now I'm just adding the functions with the required
 * parameters.
 */


/**
 * 
 * @param {number} width: Width of Cube
 */
function Cube(width) {}

//Params for resolution of Sphere? How to define said resolution?
/**
 * 
 * @param {number} radius: Radius of Sphere
 */
function Sphere(radius) {}

//Two radii to allow for cone special case, otherwise put same value in for r1 & 
//r2? Perhaps number of faces as well?
/**
 * 
 * @param {number} botRad:   Radius of Cylinder's bottom base
 * @param {number} topRad:   Radius of Cylinder's top base
 * @param {number} height:   Height of Cylinder
 * @param {number} numFaces: Number of faces around Cylinder
 */
function Cylinder(botRad, topRad, height, numFaces) {}

//Instead of separate primitive, make into special case of Cylinder with r2 = 0?
/**
 * 
 * @param {number} radius: Radius of Cone's base
 * @param {number} height: Height of Cone
 */
function Cone(radius, height) {}

//Length too?
//If no length, instead of separate primitive, make into special case of Cylinder
//with r2 = 0 and numFaces = 4?
/**
 * 
 * @param {number} width:  Width of Pyramid
 * @param {number} height: Height of Pyramid
 */
function Pyramid(width, height) {}

/**
 * 
 * @param {number} majorRad: Major Radius of Toroid
 * @param {number} minorRad: Minor Radius of Toroid
 * @param {number} majorRes: Number of geometrical figures used to generate Toroid
 * @param {number} minorRes: Number of verts used in geometrical figures
 */
function Toroid(majorRad, minorRad, majorRes, minorRes) {
	var majorAngle = 360/majorRes;
	var minorAngle = 360/minorRes;
	
	/* 
	 * Make a majorRes x 1 two-dimensional array.
	 * Make one point on x-axis minorRad away from origin, pushing a copy of it
	 *    into each inner array.
	 * Make minorRes - 1 more points rotated (about y-axis) by minorAngle degrees
	 *    from the previous one, pushing a copy of each successive one into each
	 *    inner array.
	 * We now have majorRes identical planar polys.
	 * 
	 * Now, for each poly in the array:
	 *    Translate each vertex along the x-axis by majorRad.
	 *    Rotate each vertex (about z-axis) by (majorAngle degrees) x (the index
	 * 	     of the poly).
	 * We now have a ring of polys, a.k.a. a Toroid.
	 * 
	 * All that remains un-done is connecting the verts.
	 */
}

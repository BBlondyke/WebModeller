//Ryan Connors
//Joseph Bernay

/*
 * Do we want these to be objects with fields to retain values, or do we want them
 * to simply be functions that generate a mesh object using the passed parameters?
 * 
 * I'd assume the latter. For now I'm just adding the functions with the required
 * parameters.
 */

//XX
//for now let assume all primitives are created centric to the origin. We can just translate the coordiantes
//later with matrix operations if we don't want it.
//XX


/**
 * 
 * @param {number} width: Width of Cube
 */
function Cube(width) {
	//construct the vertices that will define this cube in space
	//start with min (min(x), min(y)) point and create co-planar points ccw
	//then move to upper plane and do the same
	var returnMesh = new Mesh();
	var basisLower = new Vector(-width/2.0, -width/2.0, -width/2.0);
	
	returnMesh.vertTable.push(basisLower.copy());
	
	//draw verts in z-ccw circle.
	basisLower.y = basisLower.y + width;
	returnMesh.vertTable.push(basisLower.copy());
	basisLower.x = basisLower.x + width;
	returnMesh.vertTable.push(basisLower.copy());
	basisLower.y = basisLower.y - width;
	returnMesh.vertTable.push(basisLower.copy());
	
	//move up to positive z plane
	basisLower = new Vector(-width/2.0, -width/2.0, width/2.0);
	returnMesh.vertTable.push(basisLower.copy());
	basisLower.y = basisLower.y + width;
	returnMesh.vertTable.push(basisLower.copy());
	basisLower.x = basisLower.x + width;
	returnMesh.vertTable.push(basisLower.copy());
	basisLower.y = basisLower.y - width;
	returnMesh.vertTable.push(basisLower.copy());
	
	//vertices populated in mesh vertex table
	//link in poly table.
	
	var btmFace = new Polygon();
	btmFace.vertexList = [0, 1, 2, 3];
	
	var topFace = new Polygon();
	topFate.vertexList = [4, 5, 6, 7];
	
	var frontFace = newPolygon();
	frontFace.vertexList = [1, 2, 6, 5];
	
	var backFace = new Polygon();
	backFace.vertexList = [0, 4, 7, 3];
	
	var lSideFace = new Polygon();
	lSideFace.vertexList = [4, 0, 1, 5];
	
	var rSideFace = new Polygon();
	rSideFace.vertexList = [6, 2, 3, 7];
	
	
	returnMesh.polyTable.push(btmFace);
	returnMesh.polyTable.push(topFace);
	returnMesh.polyTable.push(frontFace);
	returnMesh.polyTable.push(backFace);
	returnMesh.polyTable.push(lSideFace);
	returnMesh.polyTable.push(rSideFace);
	
	return returnMesh;
}

//Params for resolution of Sphere? How to define said resolution?
/**
 * 
 * @param {number} radius: Radius of Sphere
 */
function Sphere(radius) {
	
	var returnMesh = new Mesh();
	var latBands = 30;
	var longBands = 30;
	
	for (var latInd = 0; latInd <= latBands; ++latInd) {
		
		var theta = latInd * Math.PI/latBands;
		var sinTheta = Math.sin(theta);
		var cosTheta = Math.cos(theta);
		
		for (var longInd = 0; longInd <= longBands; ++longInd) {
			var phi = longInd * (2 * Math.PI) / longInd;
			
			var cos_phi = Math.cos(phi);
			var sin_phi = Math.sin(phi);
			
			var x = sinTheta * cos_phi;
			var y = cosTheta;
			var z = sinTheta * sin_phi;
			
			var thisVert = new Vector(x, y, z);
			
			returnMesh.vertTable.push(thisVert);
		}
		
		//I'm not sure how to efficiently connect these verts, but I'll ponder it
		
	}
	
	//still need polys, think efficienctly
	
	
	return returnMesh;
	
}

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
/*
 * 
 * NOTE : we can just use the same idea as the sphere above, generate one circle using trig and then just
 * create two planar circles sperated by z distance height. Lets keep the basic pritive having the same
 * radius on top and bottom for now
 * 
 * 
 */
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
function Pyramid(width, height) {
	
	var returnMesh = new Mesh();
	
	var basis = new Vector(-width/2.0, -width/2.0, -height/2.0);
	
	returnMesh.vertTable.push(basis.copy());
	basis.y += width;
	returnMesh.vertTable.push(basis.copy());
	basis.x += width;
	returnMesh.vertTable.push(basis.copy());
	basis.y -= width;
	returnMesh.vertTable.push(basis.copy());
	
	basis.x = 0.0;
	basis.y = 0.0;
	basis.z += height;
	returnMesh.vertTable.push(basis.copy());
	
	//there are the vertices, now for the polys
	
	var btmFace = new Polygon();
	btmFace.vertList = [0, 1, 2, 3];
	var fFace = new Polygon();
	fFace.vertList = [1, 2, 4];
	var bFace = new Polygon();
	bFace.vertList = [0, 4, 3];
	var lSideFace = new Polygon();
	lSideFace.vertList = [0, 1, 4];
	var rSideFace = new Polygon();
	rSideFace.vertList = [3, 4, 2];
	
	return returnMesh;
	
}

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

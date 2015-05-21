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
//for now let assume all primitives are created centric to the origin. We can just translate the coordinates
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
	
	//still need polys, think efficiently
	
	
	return returnMesh;
	
}

//Two radii to allow for cone special case, otherwise put same value in for r1 & 
//r2? Perhaps number of faces as well?
/**
 * 
 * @param {number} radius:   Radius of Cylinder's base
 * @param {number} height:   Height of Cylinder
 * @param {number} numFaces: Number of faces around Cylinder
 */
function Cylinder(radius, height, numFaces) {
	var returnMesh = new Mesh();
	var theta = 360/(numFaces - 1) * Math.PI/180;
	
	for(var numVert = 0; numVert < numFaces - 1; ++numVert){
		var x = Math.cos(theta * numVert);
		var y = Math.sin(theta * numVert);
		
		returnMesh.vertTable.push(new Vector(x, y, height/2));
		returnMesh.vertTable.push(new Vector(x, y, height/-2));
	}
	
	//find loopable polys
	for(var numPoly = 0; numPoly < numFaces - 1; ++numPoly){
		var newPoly = new Polygon();
		newPoly.vertList = [numPoly * 4, numPoly*4 + 1, numPoly*4 + 3, numPoly*4 + 2];
		
		returnMesh.polyTable.push(newPoly);
	}
	
	//find extraneous unloopable poly
	var newPoly = new Polygon();
	newPoly.vertList = [returnMesh.vertTable.length - 2, returnMesh.vertTable.length - 1, 1, 0];
	
	returnMesh.polyTable.push(newPoly);
	
	return returnMesh;
}
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
 * @param {number} numFaces: Number of faces around the Cone
 */
function Cone(radius, height) {
	var returnMesh = new Mesh();
	var theta = 360/(numFaces - 1) * Math.PI/180;
	
	returnMesh.vertTable.push(new Vector(0, 0, height/2));
	
	for(var numVert = 0; numVert < numFaces - 1; ++numVert){
		var x = Math.cos(theta * numVert);
		var y = Math.sin(theta * numVert);
		
		returnMesh.vertTable.push(new Vector(x, y, height/-2));
	}
	
	//find loopable polys
	for(var numPoly = 1; numPoly < numFaces; ++numPoly){
		var newPoly = new Polygon();
		newPoly.vertList = [0, numPoly, numPoly + 1];
		
		returnMesh.polyTable.push(newPoly);
	}
	
	//find extraneous unloopable poly
	var newPoly = new Polygon();
	newPoly.vertList = [0, numFaces - 1, 1];
	
	returnMesh.polyTable.push(newPoly);
	
	return returnMesh;
}

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
	var returnMesh = new Mesh();
	var majorAngle = 360.0/majorRes * Math.PI/180.0;
	var minorAngle = 360.0/minorRes * Math.PI/180.0;
	
	/*
	 * populate vertTable
	 */
	for (var majorVert = 0; majorVert < majorRes; ++majorVert) {
		
		var sinMajor = Math.sin(majorVert * majorAngle);
		var cosMajor = Math.cos(majorVert * majorAngle);
		
		for (var minorVert = 0; minorVert < minorRes; ++minorVert) {
			var sinMinor = Math.sin(minorVert * minorAngle);
			var cosMinor = Math.cos(minorVert * minorAngle);
			
			var x = cosMinor + majorRad*cosMajor;
			var y = sinMinor + majorRad*sinMajor;
			var z = sinMinor;
			
			var thisVert = new Vector(x, y, z);
			
			returnMesh.vertTable.push(thisVert);
		}
	}
	
	/*
	 * populate polyTable
	 */
	for(var numMajor = 0; numMajor < majorRes - 1; ++numMajor){
		//find loopable sets of polys
		for(var numMinor = 0; numMinor < minorRes - 1; ++numMinor){
			var newPoly = new Polygon();
			newPoly.vertList = [numMajor*minorRes + numMinor,
								numMajor*minorRes + numMinor + 1,
								numMajor*minorRes + numMinor + minorRes + 1,
								numMajor*minorRes + numMinor + minorRes];
			
			returnMesh.polyTable.push(newPoly);
		}
		
		//find extraneous non-loopable set of polys
		var newPoly = new Polygon();
		newPoly.vertList = [(numMajor+1)*minorRes - 1,
							numMajor*minorRes,
							(numMajor+1)*minorRes,
							(numMajor+1)*minorRes - 1];
		
		returnMesh.polyTable.push(newPoly);
	}
	
	//find loopable extraneous set of polys
	for(var numMinor = 0; numMinor < minorRes - 1; ++numMinor){
		var newPoly = new Polygon();
		newPoly.vertList = [returnMesh.vertTable.length - majorRes + numMinor,
							returnMesh.vertTable.length - majorRes + numMinor + 1,
							numMinor + 1,
							numMinor];
		
		returnMesh.polyTable.push(newPoly);
	}
	
	//find doubly extraneous poly
	var newPoly = new Polygon();
	newPoly.vertList = [returnMesh.vertTable.length - 1,
						returnMesh.vertTable.length - minorRes,
						0,
						minorRes - 1];
	
	returnMesh.polyTable.push(newPoly);
	
	return returnMesh;
}

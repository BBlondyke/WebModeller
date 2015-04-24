///main.js


//contexts
var gl;

//global level buffer variables
var vBuffer;
var cBuffer;
var vPosition;
var vColor;
var nBuffer;

var VERTEX_MAX;

function initBuffers() {
	
}

window.onload = function init() {
	VERTEX_MAX = 125000;
	
	//compile gl shaders
		//fragment shader, assign all verts white
	fShader = [
		"precision mediump float;",

		"void",
		"main()",
		"{",
   			"gl_FragColor = vec4( 1.0, 1.0, 1.0, 1.0 );",
		"}",
	].join('\n');
	
	
	//vertex shader, no longer passthrough
	//this has a uniform 4D matrix that will be applied to vertices processed
	//in this pipeline.
	vShader = [
		"attribute vec4 vPosition;",
		"uniform   mat4 projectionMat;",
		
		"void",
		"main()",
		"{",
			"gl_PointSize = 1.0;",
    		"gl_Position = projectionMat * vPosition;",
		"}",
	].join('\n');
}

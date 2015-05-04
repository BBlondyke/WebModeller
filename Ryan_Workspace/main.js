///main.js


//contexts and shader programs
var gl;
var program;

//global level buffer variables
var vBuffer;
var cBuffer;
var vPosition;
var vColor;
var nBuffer;

//State Variables

//global tables
var vertTable;


var VERTEX_MAX;

function initBuffers() {
	
}

//just a pass through for now.
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
	
		canvas = document.getElementById( "gl-canvas" )
	gl = WebGLUtils.setupWebGL( canvas );
	if ( !gl ) { alert( "WebGL isn't available" ); }
	
	//tell gl to do depth comparisons and update the depth buffer.
	gl.enable(gl.DEPTH_TEST);
	
	//adjust the viewport to cover the entirity of the canvas from (0,0) to upper right
	gl.viewport(0, 0, canvas.width, canvas.height);
	
	//set the clear bit
	gl.clearColor( 0.0, 0.0, 0.0, 1.0 );
	gl.clearDepth(0.0);
	gl.depthFunc(gl.GREATER);

	
	
	program = initShaders(gl, vShader, fShader);
	gl.useProgram(program);
	
	//render a blank screen to prepare for generation
	gl.clear( gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
}

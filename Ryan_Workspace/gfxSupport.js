//Graphics Support Library


/*
 * Transformation Support Functions
 * 
 * This all return arrays that can be used to populate the matrix classes
 * and then perform easy operations prior to setting the gl uniform matrix
 */

function makePerspective(distance) {
	return [ 1.0, 0.0, 0.0, 0.0,
			 0.0, 1,0, 0.0, 0.0,
			 0.0, 0.0, 1.0, distance,
			 0.0, 0.0, 0.0, 1.0
	];
}
function makeTranslation2D(deltaX, deltaY) {
	return [
	1.0, 	0.0, 	0.0,
	0.0, 	1.0, 	0.0,
	deltaX, deltaY, 1.0
	];
}

function makeRotation2D(angle) {
	var cos = Math.cos(angle);
	var sin = Math.sin(angle);
	
	return [
		cos,	-1 * sin,	0.0,
		sin,	cos,		0.0,
		0.0,	0.0,		1.0
	];
	
}

function makeScale2D(scaleX, scaleY) {
	return [
		scaleX, 	0.0,	 0.0,
		0.0,		scaleY,  0.0,
		0.0,		0.0	,	 1.0
	];
}

function makeTranslation3D(deltaX, deltaY, deltaZ) {
	return [
		1.0, 	0.0, 	0.0,	0.0,
		0.0, 	1.0, 	0.0,	0.0,
		0.0,	0.0,	1.0,	0.0,
		deltaX,	deltaY,	deltaZ, 1.0
	];
}

function makeRotation3DX(angle) {
	
	var cos = Math.cos(angle);
	var sin = Math.sin(angle);
	
	return [
		1.0,	0.0,	0.0,	0.0,
		0.0,	cos,	sin,	0.0,
		0.0,	-1*sin,	cos,	0.0,
		0.0,	0.0,	0.0,	1.0
	];
}

function makeRotation3DY(angle) {
	var cos = Math.cos(angle);
	var sin = Math.sin(angle);
	
	return [
		cos,	0.0,	-1*sin,		0.0,
		0.0,	1.0,	0.0,		0.0,
		sin,	0.0,	cos,		0.0,
		0.0,	0.0,	0.0,		1.0
	];
}

function makeRotation3DZ(angle) {
	var cos = Math.cos(angle);
	var sin = Math.sin(angle);
	return [
		cos,	sin,	0.0,	0.0,
		-1*sin, cos,	0.0,	0.0,
		0.0,	0.0,	1.0,	0.0,
		0.0,	0.0,	0.0,	1.0
	];
}

function makeScale3D(scaleX, scaleY, scaleZ) {
	return [
		scaleX, 0.0,	0.0,	0.0,
		0.0,	scaleY, 0.0,	0.0,
		0.0,	0.0,	scaleZ,	0.0,
		0.0,	0.0,	0.0,	1.0
	];
}

/*
 * Shader Function
 */

function initShaders(gl, vShaderName, fShaderName) {
    function getShader(gl, shaderName, type) {
    	//createShader instantiates the wrap used during glsl compilation.
        var shader = gl.createShader(type),
            shaderScript = shaderName;
        if (!shaderScript) {
            alert("Could not find shader source: "+shaderName);
        }
        //gl.shaderSource links a shader source to the already created shader wrapper.
        gl.shaderSource(shader, shaderScript);
        //compile shader will actually compile the provided string glsl block
        gl.compileShader(shader);

		//getShaderParameter in this case is checking the ensure the compilation
		//of the shaders went off without a hitch
        if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
            alert(gl.getShaderInfoLog(shader));
            return null;
        }
        return shader;
    }
    
    var vertexShader = getShader(gl, vShaderName, gl.VERTEX_SHADER),
        fragmentShader = getShader(gl, fShaderName, gl.FRAGMENT_SHADER),
        //createProgram generates a program object that will store the compiled shader information
        program = gl.createProgram();

	//attach shader attached the compiled gl shader code to its program object container
    gl.attachShader(program, vertexShader);
    gl.attachShader(program, fragmentShader);
    //link program links all of the components including the compiled shader code together.
    gl.linkProgram(program);

	//getProgramParameter in this case is checking to ensure the linking went off properly
    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
        alert("Could not initialise shaders");
        return null;
    }

    
    return program;
};



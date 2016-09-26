// Create particles (multiple instances of an image) and add them to a Greensock Timeline
function particleMan (options, cb) {
		var ops = {
			appendParticlesTo: options.appendParticlesTo ? options.appendParticlesTo : (function() {
				console.warn('Error in particleMan: You must provide an element that the particles will be appended to (appendParticlesTo).');
				return undefined;
			})(),
			durationOfParticleTimeline: options.durationOfParticleTimeline ? options.durationOfParticleTimeline : (function() {
				console.warn('Error in particleMan: You must provide the durationOfParticleTimeline.');
				return undefined;
			})(),
			numberOfParticles: options.numberOfParticles ? options.numberOfParticles : (function() {
				console.warn('Error in particleMan: You must provide the numberOfParticles.');
				return undefined;
			})(),
			imageUrl: options.imageUrl ? options.imageUrl : (function() {
				console.warn('Error in particleMan: You must provide the imageUrl for the image that\'s to be repeated.');
				return undefined;
			})(),
			rotate: options.rotate ? options.rotate : false,
			rotateRange: (function() {
				if (options.rotate === true && !options.rotateRange) {
					console.warn('Error in particleMan: You must provide the rotateRange. This is the variation in degrees that each particle rotates. It needs to be between 1 and 360');
					return undefined;
				} else {
					return options.rotateRange
				}
			})(),
			verticalMin: options.verticalMin ? options.verticalMin : 0,
			verticalMax: options.verticalMax ? options.verticalMax : 100,
			horizontalMin: options.horizontalMin ? options.horizontalMin : 0,
			horizontalMax: options.horizontalMax ? options.horizontalMax : 100,
			scaleImageMin: options.scaleImageMin ? options.scaleImageMin : 0.25,
			scaleImageMax: options.scaleImageMax ? options.scaleImageMax : 1,
			scaleBasePercentange: options.scaleBasePercentange ? options.scaleBasePercentange : 0.95,
			imageClass: options.imageClass ? options.imageClass : '',
		};
		
		function newParticle (timeline) {
			var image = document.createElement('img');
					image.setAttribute('src', ops.imageUrl)
					image.setAttribute('class', ops.imageClass)
					bannerLink.appendChild(image)
			var rotationDirection = Math.random() > 0.5 ? '' : '-';
			var rotateFrom = parseInt(rotationDirection + Math.random() * 360);
			var scaleImageMax = Math.random() * (ops.scaleImageMax - ops.scaleImageMin) + ops.scaleImageMin;
			cb({
				image: image,
				timelinePos: Math.random() * ops.durationOfParticleTimeline,
				vert: Math.random() * (ops.verticalMax - ops.verticalMin) + ops.verticalMin,
				horz: Math.random() * (ops.horizontalMax - ops.horizontalMin) + ops.horizontalMin,
				scaleFrom: scaleImageMax * ops.scaleBasePercentange,
				scaleTo: scaleImageMax,
				rotateFrom: ops.rotate ? rotateFrom : 0,
				rotateTo: ops.rotate ? rotateFrom + ops.rotateRange : 0,
			})
		}

		var numberOfParticles = []
		for	(var i = 0; i < ops.numberOfParticles; i++) {
			numberOfParticles.push(i)
		}
		numberOfParticles.forEach(function() { newParticle(ops.timeline) })
	}
	

// EXAMPLE: 
var starsTl = new TimelineMax();
	
particleMan({
	appendParticlesTo: bannerLink,
	durationOfParticleTimeline: 14.75,
	numberOfParticles: 200,
	imageUrl: '../../../assets/images/light-300x600-star.png',
	imageClass: 'star',
	verticalMax: h,
	horizontalMax: w,
	scaleImageMin: 0.35,
	scaleImageMax: 2,
	scaleBasePercentange: 0.95,
}, function (props) {
		starsTl
			.fromTo(props.image, 1, {scale: 0, top: props.vert, left: props.horz }, 
				{scale: props.scaleTo, ease: Back.easeOut }, props.timelinePos)
			.to(props.image, 1, {opacity: 0.75, ease: Back.easeOut}, props.timelinePos + 2)
			.to(props.image, 1, {opacity: 1, ease: Back.easeOut}, props.timelinePos + 3)
			.to(props.image, 1, {opacity: 0}, props.timelinePos + 4)
});

# Create particles (multiple instances of an image) and add them to a Greensock Timeline
## Usage
Call the particleMan function, passing in the required params. Then write the timeline animation for each particle in the callback function, using the props passed to you from particleMan.

*EXAMPLE:* 
```
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
```
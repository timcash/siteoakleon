(function(){
	console.log("hello there");
	var pi2 = 2 * Math.PI;
	var s = Snap("#svg");
	// Lets create big circle in the middle:
	//var bigCircle = s.circle(150, 150, 233);



	var path = '';
	var steps = 12;
	var parts = [];
	var slide = 60;

	for (var i = 0; i < steps +1; i++)
	{
		if(i % 4 === 1 || i % 4 === 2){
			continue;
		}
		var j = i * 2 + 1;
		var theta = (i * pi2) / steps;
		var ctheta =  ((j - 2) * pi2) / (steps * 2);
		var r = 60;
		var x = r * Math.cos(theta) + slide;
		var y = r * Math.sin(theta) + slide;

		var cr = 80;
		var cx = cr * Math.cos(ctheta) + slide;
		var cy = cr * Math.sin(ctheta) + slide;

		var mtype = '';

		//s.circle(cx, cy, 5);


		if (i === 0){
			mtype = 'M';
			parts[i] = mtype + x + ' ' + y;
		}
		else{

			// do a curve on even
			if(i % 4 === 0)
			{
				// need the control point
				//Q 95 10 180 80


				mtype = 'Q';
				parts[i] = mtype + cx + ' ' + cy + ' ' + x + ' ' + y;
			}
			else
			{
				mtype = 'L';
				parts[i] = mtype + x + ' ' + y;
			}
		}
		
	}

	var joined = parts.join('');
	joined += "Z";
	var logo = s.path(joined);
	logo.attr({
		stroke:"#2d2d2d",
		fill:"#2f2f2f"
	});

	var t1 = s.text(slide, slide + 25, "𝚲");
	t1.attr({
		"font-size":70,
		fill: "#ffffff",
		"text-anchor": "middle"
	});
	return 0;
})();

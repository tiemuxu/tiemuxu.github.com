Raphael.fn.pieChart = function(cx, cy, r, values, labels, stroke, fill, title, circleAttr) {
    var paper = this,
	    rad = Math.PI / 180,
		chart = this.set();
		
	/*var circleAttr = {
	    stroke: "none",
		fill: "r#404040-#2a2a2c",
		opacity: 0.7,
	};*/
	var cirTxtAttr = {
	    fill: "white",
		//font: "arial",
		"font-family": "sans-serif",
		"font-size": 20,
		"font-weight": "bold",
		opacity: .8,
	};
	
	function sector(cx, cy, r, startAngle, endAngle, params) {
	    var x1 = cx + r * Math.cos(-startAngle * rad),
		    y1 = cy + r * Math.sin(-startAngle * rad),
			x2 = cx + r * Math.cos(-endAngle * rad),
			y2 = cy + r * Math.sin(-endAngle * rad);
		return paper.path(["M", cx, cy, "L", x1, y1, "A", r, r, 0, +(endAngle - startAngle > 180), 0, x2, y2, "Z"]).attr(params);
	}
	
	var circle = paper.circle(cx, cy, r-20).attr(circleAttr).toFront(),
	    txt = paper.text(cx, cy, title).attr(cirTxtAttr);
    
	var angle = 0,
	    total = 0,
		process = function(j) {
		    var value = values[j],
			    label = labels[j],
				angleplus = 360 * value / total,
				ms = 500,
				p = sector(cx, cy, r, angle, angle + angleplus, {fill: fill, stroke: stroke, "stroke-width": 1, opacity: .8}).toBack(),
				easing = "elastic";
				
			p.mouseover(function() {
			    p.stop().animate({opacity:1,transform: "s1.1 1.1 " + cx + " " + cy}, ms, easing);
				circle.stop().animate({r: 40, opacity: .5},200);
				txt.stop().attr({text: label + '\n' + value + "%"}).animate({opacity: 1}, 500, "bounce");
			}).mouseout(function() {
			    p.stop().animate({transform: "", opacity: 0.8}, ms, easing);
				circle.stop().animate({r: r-20, opacity: 0.7}, 200);
				txt.stop().attr({text: title}).animate({opacity: 0.8}, 500, "bounce");
			});
			circle.mouseover(function() {
			    circle.stop().animate({r: 40, opacity: 0.5},200);
			})
			
			angle += angleplus;
			chart.push(p);
		};
	for ( var i = 0, ii = values.length; i < ii; i++ ) {
	    total += values[i];
	}
	for ( i = 0; i < ii; i++ ) {
	    process(i);
	}
	return chart;
};

function drawPie() {
    var paper=Raphael("holder", 673, 270);
    var valuesFrontend = [],
	    labelsFrontend = [],
		valuesLanguage = [],
		labelsLanguage = [],
		valuesComp = [],
		labelsComp = [],
		valuesDesign = [],
		labelsDesign = [];
	$("#frontend tr").each(function() {
	    valuesFrontend.push(parseInt($("td", this).text(), 10));
		labelsFrontend.push($("th", this).text());
	});
	$("#language tr").each(function() {
	    valuesLanguage.push(parseInt($("td", this).text(), 10));
		labelsLanguage.push($("th", this).text());
	});
	$("#computer tr").each(function() {
	    valuesComp.push(parseInt($("td", this).text(), 10));
		labelsComp.push($("th", this).text());
	});
	$("#design tr").each(function() {
	    valuesDesign.push(parseInt($("td", this).text(), 10));
		labelsDesign.push($("th", this).text());
	});
	$("#pieData").hide();
	var curStroke = "#2a2a2c",
	    fill = "#79b429",
		titleFron = "前端",
		titleLan = "语言",
		titleComp = "计算机",
		titleDesign = "设计";
	var circleLanAttr = {
	    stroke: "none",
		fill: "r#DCE248-#2a2a2c",
		opacity: 0.7,
	};
	var circleFrontAttr = {
	    stroke: "none",
		fill: "r#79b429-#2a2a2c",
		opacity: 0.7,
	};
	var circleDeAttr = {
	    stroke: "none",
		fill: "r#B2FFED-#2a2a2c",
		opacity: 0.7,
	};
	paper.pieChart(550, 120, 100, valuesFrontend, labelsFrontend, curStroke, fill, titleFron, circleFrontAttr);
	paper.pieChart(240, 88, 80, valuesLanguage, labelsLanguage, curStroke, "#DCE248", titleLan, circleLanAttr);
	paper.pieChart(400, 180, 60, valuesComp, labelsComp, curStroke, fill, titleComp, circleFrontAttr);
	paper.pieChart(80, 120, 70, valuesDesign, labelsDesign, curStroke, "#B2FFED", titleDesign, circleDeAttr);
}

$(window).load(drawPie);
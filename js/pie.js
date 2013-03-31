Raphael.fn.pieChart = function(cx, cy, r, values, labels, stroke, fill, title, circleAttr) {
    var paper = this,
	    rad = Math.PI / 180,
		chart = this.set();
		
	var cirTxtAttr = {
	    fill: "white",
		//font: "arial",
		"font-family": "Microsoft Yahei",
		"font-size": 16,
		//"font-weight": "bold",
		opacity: .8,
	};
	
	function sector(cx, cy, r, startAngle, endAngle, params) {
	    var x1 = cx + r * 0.5 * Math.cos(-startAngle * rad),
		    y1 = cy + r * 0.5 * Math.sin(-startAngle * rad),
			x2 = cx + r * Math.cos(-startAngle * rad),
		    y2 = cy + r * Math.sin(-startAngle * rad),
			x3 = cx + r * Math.cos(-endAngle * rad),
			y3 = cy + r * Math.sin(-endAngle * rad),
			x4 = cx + r * 0.5 * Math.cos(-endAngle * rad),
			y4 = cy + r * 0.5 * Math.sin(-endAngle * rad);
		return paper.path(["M", x1, y1, "L", x2, y2, "A", r, r, 0, +(endAngle - startAngle > 180), 0, x3, y3, "L", x4, y4, "A", r * 0.5, r * 0.5, 0, +(endAngle - startAngle > 180), 1, x1, y1, "Z"]).attr(params);
	}
	
	var circle = paper.circle(cx, cy, 1).attr(circleAttr).toFront(),
	    txt = paper.text(cx, cy, title).attr(cirTxtAttr);
    
	var angle = 0,
	    total = 0,
		process = function(j) {
		    var value = values[j],
			    label = labels[j],
				angleplus = 360 * value / total,
				p = sector(cx, cy, r, angle, angle + angleplus, {fill: fill, stroke: stroke, "stroke-width": 1, opacity: 1}).toBack();
				
			p.mouseover(function() {
			    p.stop().animate({fill: "#6A4E3E", transform: "s1.1 1.1 " + cx + " " + cy}, 500, "elastic");
				circle.stop().animate({r: r * 0.4, opacity: 1}, 500, "elastic");
				txt.stop().attr({text: label + '\n' + value + "%"}).animate({opacity: 1}, 500, "bounce");
			}).mouseout(function() {
			    p.stop().animate({fill: fill, transform: ""}, 500, "elastic");
				circle.stop().animate({r: 1, opacity: 0}, 500);
				txt.stop().attr({text: title}).animate({opacity: 0.8}, 500, "bounce");
			});
			circle.mouseover(function() {
			    circle.stop().animate({r: r * 0.4, opacity: 1}, 500, "elastic");
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
		titleComp = "其他",
		titleDesign = "设计";
	var circleAttr = {
	    stroke: "none",
		fill: "#6A4E3E",
		opacity: 0,
	};
	/*var circleFrontAttr = {
	    stroke: "none",
		fill: "r#79b429-#2a2a2c",
		opacity: 0,
	};
	var circleDeAttr = {
	    stroke: "none",
		fill: "r#B2FFED-#2a2a2c",
		opacity: 0,
	};*/
	paper.pieChart(550, 120, 100, valuesFrontend, labelsFrontend, curStroke, fill, titleFron, circleAttr);
	paper.pieChart(240, 88, 80, valuesLanguage, labelsLanguage, curStroke, "#DCE248", titleLan, circleAttr);
	paper.pieChart(400, 180, 60, valuesComp, labelsComp, curStroke, fill, titleComp, circleAttr);
	paper.pieChart(80, 120, 70, valuesDesign, labelsDesign, curStroke, "#B2FFED", titleDesign, circleAttr);
}

$(window).load(drawPie);
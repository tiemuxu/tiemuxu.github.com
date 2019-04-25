if (!window.Resume) {
	window['Resume'] = {};
}

Resume.Timeline = (function(){
	var w_chart = 775,
		h_chart = 240,
		timeline_canvas = Raphael('timeline_tie', 800, 300),
		year = new Date().getFullYear(),
		month = new Date().getMonth(),
		division = (year - 2011) * 12 - 6 + month,
		dist = Math.floor(w_chart / division);

	timeline_canvas.path('M0' + ',' + (h_chart-18) + 'H' + w_chart).attr({stroke: '#686868', 'stroke-width': 2}); // x axis

	//tick mark of years or months
	var init_year = 2011;
	for (var i = 6; i <= division + 6; i++) {	//There are division times loop 
		var tick_x = w_chart - (i - 6) * dist,
	 		tick_y0 = h_chart - 18,
	 		tick_y1;
		if ((i % 12) == 0) { // year tick
	 		tick_y1 = tick_y0 - 16;
	 		init_year += 1;
	 		timeline_canvas.text(tick_x, tick_y0 + 18, init_year).attr({stroke: '#fff', 'font-size': 18, 'stroke-width':1, fill:'#fff', opacity: .8});
	 	} else { // month tick
	 		tick_y1 = tick_y0 - 8;	
	 	}
	 	timeline_canvas.path('M' + tick_x + ',' + tick_y0 + 'V' + tick_y1).attr({stroke: '#686868', 'stroke-width': 1});
	 	console.log(i)
	}

	timeline_canvas.text(w_chart - 18, tick_y0 + 18, '年').attr({stroke: '#fff', opacity: .8});

	function work_experience_line(start_date, end_date, position_type) {
		var position_PM = {
				stroke: '#79b429',
				'stroke-width': 5
			},
			position_PM_disc = {
				'stroke-width': 0,
				fill: '#79b429'
			},
			position_PM_rect = {
				stroke: '#79b429',
				'stroke-width': 2,
				fill: '#79b429',
				opacity: 1
			},

			position_frontend = {
				stroke: '#DCE248',
				'stroke-width': 5
			},
			position_frontend_disc = {
				fill: '#DCE248',
				'stroke-width': 0
			},
			position_frontend_rect = {
				stroke: '#DCE248',
				'stroke-width': 2,
				fill: '#DCE248'
			},

			position_other = {
				stroke: '#B2FFED',
				'stroke-width': 5
			},
			position_other_disc = {
				fill: '#B2FFED',
				'stroke-width': 0
			},
			position_other_rect = {
				stroke: '#B2FFED',
				'stroke-width': 2,
				fill: '#B2FFED'
			},

			inner_disc = {
				fill: '#1f1f1f',
				'stroke-width': 0
			};


		var rect_top,
			rect_left;
		if (position_type == 'PM') {
			timeline_canvas.circle(start_date, tick_y0 - 150, 10).attr(position_PM_disc).toBack();
			timeline_canvas.circle(start_date, tick_y0 - 150, 6).attr(inner_disc).toFront();
			timeline_canvas.path('M' + (start_date - 5) + ',' + (tick_y0 - 150) + 'H' + (end_date + 5)).attr(position_PM).toBack();
			timeline_canvas.circle(end_date, tick_y0 - 150, 10).attr(position_PM_disc).toBack();
			timeline_canvas.circle(end_date, tick_y0 - 150, 6).attr(inner_disc).toFront();
			rect_top = tick_y0 - 150 - 70;
			rect_left = (start_date - end_date) / 2 - 55 + end_date;
			timeline_canvas.rect(rect_left, rect_top, 200, 44, 2).attr(position_PM_rect);
			timeline_canvas.text(rect_left + 52, rect_top + 22, '产品经理+交互设计').attr({'font-size':18, stroke:'#1f1f1f', fill:'#1f1f1f', "font-family": "Microsoft Yahei"});
			timeline_canvas.path('M' + (rect_left + 51) + ',' + (rect_top + 44) + 'L' + (rect_left + 55) + ',' + (rect_top + 52) + 'L' + (rect_left + 59) + ',' + (rect_top + 44) + 'C').attr({fill: '#79b429', stroke: '#79b429', 'stroke-width': 1})
		} else if (position_type == 'frontend') {
			timeline_canvas.circle(start_date, tick_y0 - 60, 10).attr(position_frontend_disc).toBack();
			timeline_canvas.circle(start_date, tick_y0 - 60, 6).attr(inner_disc).toFront();
			timeline_canvas.path('M' + (start_date - 5) + ',' + (tick_y0 - 60) + 'H' + (end_date + 5)).attr(position_frontend).toBack();
			timeline_canvas.circle(end_date, tick_y0 - 60, 10).attr(position_frontend_disc).toBack();
			timeline_canvas.circle(end_date, tick_y0 - 60, 6).attr(inner_disc).toFront();
			rect_top = tick_y0 - 60 - 65;
			rect_left = (start_date - end_date) / 2 - 55 + end_date;
			timeline_canvas.rect(rect_left, rect_top, 104, 44, 2).attr(position_frontend_rect);
			timeline_canvas.text(rect_left + 52, rect_top + 22, '前端开发').attr({'font-size':18, stroke:'#1f1f1f', fill:'#1f1f1f', "font-family": "Microsoft Yahei"});
			timeline_canvas.path('M' + (rect_left + 51) + ',' + (rect_top + 44) + 'L' + (rect_left + 55) + ',' + (rect_top + 52) + 'L' + (rect_left + 59) + ',' + (rect_top + 44) + 'C').attr({fill: '#DCE248', stroke: '#DCE248', 'stroke-width': 1})
		} else {
			timeline_canvas.circle(start_date, tick_y0 - 40, 10).attr(position_other_disc).toBack();
			timeline_canvas.circle(start_date, tick_y0 - 40, 6).attr(inner_disc).toFront();
			timeline_canvas.path('M' + (start_date - 5) + ',' + (tick_y0 - 40) + 'H' + (end_date + 5)).attr(position_other).toBack();
			timeline_canvas.circle(end_date, tick_y0 - 40, 10).attr(position_other_disc).toBack();
			timeline_canvas.circle(end_date, tick_y0 - 40, 6).attr(inner_disc).toFront();
			rect_top = tick_y0 - 40 - 70;
			rect_left = (start_date - end_date) / 2 - 55 + end_date;
			timeline_canvas.rect(rect_left, rect_top, 104, 44, 2).attr(position_other_rect);
			timeline_canvas.text(rect_left + 52, rect_top + 22, '其他').attr({'font-size':18, stroke:'#1f1f1f', fill:'#1f1f1f', "font-family": "Microsoft Yahei"});
			timeline_canvas.path('M' + (rect_left + 51) + ',' + (rect_top + 44) + 'L' + (rect_left + 55) + ',' + (rect_top + 52) + 'L' + (rect_left + 59) + ',' + (rect_top + 44) + 'C').attr({fill: '#B2FFED', stroke: '#B2FFED', 'stroke-width': 1})
		}
	}

	return {
		draw_timeline: function(start_array, end_array, position_array) {
			var length_of_array = start_array.length;
			var start_date,
				end_date,
				position_type;
			for (var i = 0; i < length_of_array; i++) {
				start_date = (parseInt(start_array[i].substr(0, 4)) - 2012) * 12 + parseInt(start_array[i].substr(5)) - 1 + 6;
				start_date = w_chart - start_date * dist;
				if (start_date == w_chart) {
					start_date = w_chart - 10;
				}
				if (end_array[i] === 'toNow') {
					end_date = 10;
				} else{
					end_date =  (parseInt(end_array[i].substr(0, 4)) - 2012) * 12 + parseInt(end_array[i].substr(5)) - 1 + 6;
					end_date = w_chart - end_date * dist;
				}
				position_type = position_array[i];
				work_experience_line(start_date, end_date, position_type);
			}
		},

		timeline_init: function() {
			var start_array = [],
				end_array = [],
				position_array = [];

			$('#timeline_data tr').each(function() {
				start_array.push($('.start', this).text());
				end_array.push($('.end', this).text());
				position_array.push($('.position', this).text());
			});
			$('#timeline_data').hide();
			this.draw_timeline(start_array, end_array, position_array);
		}
	}
})();

Resume.Timeline.timeline_init();



/*
 Документация:

 Графики: https://github.com/flot/flot/blob/master/API.md
 Tooltip plugin: https://github.com/krzysu/flot.tooltip
 */

var Charts = function () {

  colors = ['#254559', '#00AEEF', '#F7941D', '#555', '#999', '#bbb', '#ccc', '#eee'];
  colors_pie = ['rgba(14, 24, 30, 0.53)', '#fff', '#00AEEF', '#254559', '#F7941D', '#555', '#999', '#bbb', '#ccc', '#eee'];



  return {
    pie: pie,
    vertical: vertical
  };


  function pie(target, data) {
    var options = {
      colors: colors_pie,

      series: {
        pie: {
          show: true,
          innerRadius: 30,
          stroke: {
            show: false,
            width: 0,
            color: '#203541'
          }
        }
      },

      legend: {
        position: 'ne'
      },

      tooltip: false,
      tooltipOpts: {
        content: '%s: %y'
      },

      grid: {
        hoverable: true
      }
    };

    var el = $(target);

    if (el.length) {
      $.plot(el, data, options);
    }
  }


  function vertical(target, data, max_count) {

    //Шаг для оси Y
    var stepY = 1;

    //Шаг по оси X
    var stepX = [1, "day"];

    //Опции для flot
    var options = {
      colors: colors,
      series: {
        bars: {
          show: true,
          fill: true,
          lineWidth: 5,
          align: 'center'
        },
        points: {
          show: false,
          radius: 0,
          fill: true
        }
      },
      legend: {
        position: 'ne',
        noColumns: 2,
        backgroundOpacity: 0.7
      },
      tooltip: false,
      xaxis: {
        mode: "time",
        tickSize: stepX,
        //timeformat:"%0d/%0m"//"%d"
        tickFormatter: xAxisLabelGenerator
      },

      yaxis: { show: false, min: 0, tickSize: stepY, tickDecimals: 0 },
      grid: { borderWidth: 0, hoverable: true, clickable: true, color: "transparent"}//borderWidth:2
    };

    var el = $(target);

    if (el.length) {
      $.plot(el, data, options);
    }
  }


}();

function xAxisLabelGenerator(x) {
  return moment(new Date(x)).lang("ru").format('DD MMM');
}


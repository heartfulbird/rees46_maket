
$(function () {

  Rees = {

    data: [],

    // Макс по Y
    max: 140,

    random:  function (from, to)   {
      var min = from,
          max = to;
      var rand = min + Math.random() * (max + 1 - min);
      rand = rand ^ 0;
      return rand;
    },

    nextDay: function (start, i, hours){
      return (new Date(moment(start).add('days', i).add('hours', hours).add('minutes', 20)).getTime());
    },

    buildDiagram: function (type, date) {
      // Нужны точки за 2 недели где выбранная дата где то посередине

      Rees.data = [];
      $('#graphik_blue').html('');


      var values_norm = [];
      var values_rees = [];

      var start = null;
      var end = null;

      var count;

      // Если дата близкая к сегодня - то отображаем 2 последних недели кака при загрузке
      if (date && (date > moment().subtract('days', 6))){
        type = 'prev2week';
      }

      if (type == 'onLoad'|| type == 'prev2week') {
        start = moment().subtract('days', 13).format('LL');
        end = moment().format('LL');
      } else {
        start = moment(date).subtract('days', 7).format('LL');
        end = moment(date).add('days', 7).format('LL');
      }

      console.log(type)
      console.log(start)

      // Генерим данные за 2 недели
      for (var i=0; i<=13; i++ ) {
        // Кличество продаж
        count = Rees.random(10, 80);

        values_norm.push([ this.nextDay(start, i, 6), count ]);
        values_rees.push([ this.nextDay(start, i, 11), (count + 20) ]);

      }


      Rees.data.push({ label: false, data: values_norm, points: { show: true }, lines: { lineWidth: 0, fill: false } });
      Rees.data.push({ label: false, data: values_rees, points: { show: true }, lines: { lineWidth: 0, fill: false } });


      // Крайние точки
      var min_max = [
        [ new Date(moment(start)).getTime(), 0],
        [ new Date(moment(end)).getTime(), 0]
      ];
      Rees.data.push({ label: false, data: min_max, points: { show: true }, lines: { lineWidth: 0, fill: false } });


      Charts.vertical('#graphik_blue', Rees.data, Rees.max);



      setTimeout(function () {
        $('.tickLabel').css({width: '35px', top: '198px'});
      }, 100);


      if (type != 'onLoad'){
        setTimeout(function () {
          var this_day = moment(date).lang("ru").format('DD MMM');

          console.log(this_day)
          $(".tickLabel:contains('"+ this_day +"')").css({ top: '10px'}).addClass('today').html('<span>'+ this_day +'</span>');

        }, 100);
      }


      setTimeout(function () {
        $('.tickLabel').animate({opacity: 1}, 300);
      },300);
    },

    buildPie: function () {

      var pie_data = [
        // default
        { label: false, data: [
          [1, 10]
        ] },
        // white - standart sales
        { label: false, data: [
          [2, 20]
        ] },
        //  rees blue
        { label: false, data: [
          [2, 40]
          //
        ] },
        { label: false, data: [
          [2, 50]
        ] }
      ];

      Charts.pie('#day', pie_data);


      pie_data = [
        // default
        { label: false, data: [
          [1, 20]
        ] },
        // white - standart sales
        { label: false, data: [
          [2, 30]
        ] },
        //  rees blue
        { label: false, data: [
          [2, 50]
          //
        ] },
        { label: false, data: [
          [2, 70]
        ] }
      ];

      Charts.pie('#week', pie_data);


      var pie_data = [
        // default
        { label: false, data: [
          [1, 40]
        ] },
        // white - standart sales
        { label: false, data: [
          [2, 50]
        ] },
        //  rees blue
        { label: false, data: [
          [2, 90]
          //
        ] },
        { label: false, data: [
          [2, 70]
        ] }
      ];

      Charts.pie('#month', pie_data);

    }

  }




  Rees.buildDiagram('onLoad', null);
  Rees.buildPie();


});

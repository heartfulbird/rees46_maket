# Place all the behaviors and hooks related to the matching controller here.
# All this logic will automatically be available in application.js.
# You can use CoffeeScript in this file: http://coffeescript.org/


$ ->

  # Переключатель
  switchOff = (round) ->
    round.removeClass('on')
    round.addClass('off')

    $('#with-swither').find('.grey-text').first().removeClass('active')
    $('#with-swither').find('.grey-text').last().addClass('active')

    $('#a-b-test .dropdown-toggle').text('Выключен')

  switchOn = (round) ->
    round.removeClass('off')
    round.addClass('on')

    $('#with-swither').find('.grey-text').last().removeClass('active')
    $('#with-swither').find('.grey-text').first().addClass('active')

    $('#a-b-test .dropdown-toggle').text('Включен')

  $('#back').on 'click', ->
    round = $(@).find('#round')

    if round.hasClass('on')
      switchOff(round)

    else
      switchOn(round)

  $('#switch-on').on 'click', ->
    switchOn($('#round'))
  $('#switch-off').on 'click', ->
    switchOff($('#round'))

  # Заказы по дате
  $("#date-mask")
    .inputmask()
    .on 'keyup',(e) ->
        code = e.keyCode || e.which
        if code == 13
          parse_date = moment($(@).val(), 'DD/MM/YYYY')
          if parse_date <= moment() && parse_date >= moment('01 jan 2000')
            Rees.buildDiagram('day', parse_date)
            $('#orders .uppercase').text(parse_date.lang("ru").format('DD MMMM'))
            $('#orders .dropdown').removeClass('fix-open')
            $('.right-col tbody').html('')
            for [0..19]
              $('.right-col tbody').append('<tr><td>' + Rees.random(10000, 90000) + '</td><td>' + Rees.random(10, 24).toString() + ':' + Rees.random(10,59).toString() + '</td><td>' + Rees.random(10000, 90000) + '</td><td>' + Rees.random(10000, 90000) + ' руб.</td><td>' + Rees.random(90000, 190000) + ' руб.</td></tr><tr></tr>')
          else
            alert
  # Сегодня
  $('#orders .uppercase').text(moment(new Date()).lang("ru").format('DD MMMM'))

  # Drop Down с инпутом для даты
  $('#orders .dropdown').on 'click', ->
    $(@).addClass('fix-open')
  $('body').on 'click', (e) ->
    if (!$(e.target).hasClass('.dropdown-menu') && $(e.target).closest('.dropdown-menu').length == 0)
      $('.dropdown').removeClass('fix-open')

  # Заполним табличку
  for [0..18]
    $('.right-col tbody').append('<tr><td>098089889</td><td>13:48</td><td>829342738</td><td>864.56 руб.</td><td>9765.38 руб.</td></tr><tr></tr>')

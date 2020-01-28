'use strict';

var CLOUD_COORD_X = 100;
var CLOUD_COORD_Y = 10;
var CLOUD_HEIGHT = 270;
var CLOUD_WIDTH = 420;
var CLOUD_COLOR = '#fff';
var CLOUD_MESSAGE = 'Ура вы победили!';
var CLOUD_MESSAGE_COORD_X = 110;
var CLOUD_MESSAGE_COORD_Y = 30;
var ELEMENT_SPACING = 10;
var SHADOW_COORD_X = 110;
var SHADOW_COORD_Y = 20;
var SHADOW_COLOR = 'rgba(0, 0, 0, 0.7)';
var CHART_TITLE = 'Список результатов:';
var CHART_TITLE_COORD_X = 110;
var CHART_TITLE_COORD_Y = 45;
var CHART_SECTION_LABEL_COUNT = 2;
var CHART_HEIGHT = 150;
var BAR_WIDTH = 40;
var BAR_DISTANCE = 50;
var FONT = '16px PT Mono';
var FONT_COLOR = 'black';
var TEXT_SHIFT = 15;
var PLAYER_BAR_COLOR = 'rgba(255, 0, 0, 1)';
var PLAYER_NAME = 'Вы';

var drawRect = function (ctx, x, y, width, height, color) {
  ctx.fillStyle = color;
  ctx.fillRect(x, y, width, height);
};

var drawText = function (ctx, text, x, y) {
  ctx.font = FONT;
  ctx.fillStyle = FONT_COLOR;
  ctx.textBaseline = 'hanging';
  ctx.fillText(text, x, y);
};

var drawChart = function (ctx, names, times) {
  var maxTime = getMaxElement(times);
  var sectionCoordX = CLOUD_MESSAGE_COORD_X;

  for (var i = 0; i < names.length; i++) {
    var barHeight = Math.round((times[i] / maxTime) * CHART_HEIGHT);
    var barColor = (names[i] === PLAYER_NAME) ? PLAYER_BAR_COLOR : getRandomBlueHslColor();
    var timeCoordY = CLOUD_HEIGHT - (ELEMENT_SPACING + TEXT_SHIFT) * CHART_SECTION_LABEL_COUNT - barHeight;

    drawText(ctx, Math.round(times[i]), sectionCoordX, timeCoordY);
    var barCoordY = timeCoordY + TEXT_SHIFT + ELEMENT_SPACING;
    drawRect(ctx, sectionCoordX, barCoordY, BAR_WIDTH, barHeight, barColor);
    var nameCoordY = barCoordY + barHeight + ELEMENT_SPACING;
    drawText(ctx, names[i], sectionCoordX, nameCoordY);
    sectionCoordX += BAR_WIDTH + BAR_DISTANCE;
  }
};

var getRandomBlueHslColor = function () {
  var MIN_SATURATION = 10;
  var MIN_LIGHTNESS = 10;
  var MAX_SATURATION = 100;
  var MAX_LIGHTNESS = 100;

  var saturation = getRandomIntInclusive(MIN_SATURATION, MAX_SATURATION);
  var lightness = getRandomIntInclusive(MIN_LIGHTNESS, MAX_LIGHTNESS);

  return 'hsl(230, ' + saturation + '%, ' + lightness + '%)';
};

var getMaxElement = function (elements) {
  var max = 0;

  for (var i = 0; i < elements.length; i++) {
    max = (max < elements[i]) ? elements[i] : max;
  }

  return max;
};

var getRandomIntInclusive = function (min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);

  return Math.floor(Math.random() * (max - min + 1)) + min;
};

window.renderStatistics = function (ctx, names, times) {
  drawRect(ctx, SHADOW_COORD_X, SHADOW_COORD_Y, CLOUD_WIDTH, CLOUD_HEIGHT, SHADOW_COLOR);
  drawRect(ctx, CLOUD_COORD_X, CLOUD_COORD_Y, CLOUD_WIDTH, CLOUD_HEIGHT, CLOUD_COLOR);
  drawText(ctx, CLOUD_MESSAGE, CLOUD_MESSAGE_COORD_X, CLOUD_MESSAGE_COORD_Y);
  drawText(ctx, CHART_TITLE, CHART_TITLE_COORD_X, CHART_TITLE_COORD_Y);
  drawChart(ctx, names, times);
};

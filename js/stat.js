'use strict';

var CLOUD_COORDS = [100, 10];
var CLOUD_HEIGHT = 270;
var CLOUD_WIDTH = 420;
var CLOUD_COLOR = '#fff';
var CLOUD_MESSAGE = 'Ура вы победили!';
var CLOUD_MESSAGE_COORDS = [110, 30];
var CLOUD_PADDING = 10;
var SHADOW_COORDS = [110, 20];
var SHADOW_COLOR = 'rgba(0, 0, 0, 0.7)';
var CHART_TITLE = 'Список результатов:';
var CHART_TITLE_COORDS = [110, 45];
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
  var sectionCoordX = CLOUD_COORDS[0] + CLOUD_PADDING;

  for (var i = 0; i < names.length; i++) {
    var barHeight = Math.round((times[i] / maxTime) * CHART_HEIGHT);
    var barColor = (names[i] === PLAYER_NAME) ? PLAYER_BAR_COLOR : getRandomBlueHslColor();
    var timeCoordY = CLOUD_HEIGHT - CLOUD_PADDING * 2 - TEXT_SHIFT * 2 - barHeight;

    drawText(ctx, Math.round(times[i]), sectionCoordX, timeCoordY);
    var barCoordY = timeCoordY + TEXT_SHIFT + CLOUD_PADDING;
    drawRect(ctx, sectionCoordX, barCoordY, BAR_WIDTH, barHeight, barColor);
    var nameCoordY = barCoordY + barHeight + CLOUD_PADDING;
    drawText(ctx, names[i], sectionCoordX, nameCoordY);
    sectionCoordX += BAR_WIDTH + BAR_DISTANCE;
  }
};

var getRandomBlueHslColor = function () {
  var minSaturation = 10;
  var minLightness = 10;
  var maxSaturation = 100;
  var maxLightness = 100;
  var saturation = getRandomIntInclusive(minSaturation, maxSaturation);
  var lightness = getRandomIntInclusive(minLightness, maxLightness);

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
  drawRect(ctx, SHADOW_COORDS[0], SHADOW_COORDS[1], CLOUD_WIDTH, CLOUD_HEIGHT, SHADOW_COLOR);
  drawRect(ctx, CLOUD_COORDS[0], CLOUD_COORDS[1], CLOUD_WIDTH, CLOUD_HEIGHT, CLOUD_COLOR);
  drawText(ctx, CLOUD_MESSAGE, CLOUD_MESSAGE_COORDS[0], CLOUD_MESSAGE_COORDS[1]);
  drawText(ctx, CHART_TITLE, CHART_TITLE_COORDS[0], CHART_TITLE_COORDS[1]);
  drawChart(ctx, names, times);
};

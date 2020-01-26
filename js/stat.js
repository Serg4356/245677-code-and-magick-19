'use strict';

var CLOUD_COORDS = [100, 10];
var CLOUD_HEIGHT = 270;
var CLOUD_WIDTH = 420;
var SHADOW_SHIFT = 10;
var WINNER_MESSAGE = ['Ура вы победили!', 'Список результатов: '];
var CLOUD_PADDING = 12;
var CHART_HEIGHT = 150;
var BAR_WIDTH = 40;
var BAR_DISTANCE = 50;

var renderRect = function (ctx, x, y, width, height, color) {
  ctx.fillStyle = color;
  ctx.fillRect(x, y, width, height);
};

var drawWinnerText = function (ctx, text, font, x, y, color, textShift) {
  ctx.font = font;
  ctx.fillStyle = color;
  ctx.textBaseline = 'hanging';
  var fontSize = getFontSize(font);
  var lineSpacing = textShift + fontSize;
  for (var i = 0; i < text.length; i++) {
    ctx.fillText(text[i], x, y);
    y += lineSpacing;
  }
  return y;
};

var getFontSize = function (font) {
  return parseInt(font.match(/\d+/)[0], 10);
};

var drawChart = function (ctx, names, times, barCoordX, barCoordY, chartHeight, labelFont, labelFontColor) {
  var maxTime = getMaxTime(times);
  var barHeight = 0;
  var fontSize = getFontSize(labelFont);
  barCoordX += CLOUD_PADDING;
  var barColor = '';
  for (var i = names.length - 1; i >= 0; i--) {
    barHeight = Math.round((times[i] / maxTime) * chartHeight);
    barColor = generateBarColor(names[i]);
    renderRect(ctx, barCoordX, (barCoordY + chartHeight - barHeight + fontSize + CLOUD_PADDING), BAR_WIDTH, barHeight, barColor);
    drawWinnerText(ctx, [Math.round(times[i]), names[i]], labelFont, barCoordX, (barCoordY + chartHeight - barHeight), labelFontColor, (barHeight + fontSize + CLOUD_PADDING));
    barCoordX += BAR_WIDTH + BAR_DISTANCE;
  }
};

var generateBarColor = function (playerName) {
  var minSaturation = 10;
  var minLightness = 10;
  var maxSaturation = 100;
  var maxLightness = 100;
  if (playerName === 'Вы') {
    return 'rgba(255, 0, 0, 1)';
  } else {
    return 'hsl(230, ' + getRandomIntInclusive(minSaturation, maxSaturation) + '%, ' + getRandomIntInclusive(minLightness, maxLightness) + '%)';
  }
};

var getMaxTime = function (times) {
  var maxTime = 0;
  for (var i = 0; i < times.length; i++) {
    maxTime = (maxTime < times[i]) ? times[i] : maxTime;
  }
  return maxTime;
};

var getRandomIntInclusive = function (min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

window.renderStatistics = function (ctx, names, times) {
  var labelFont = '16px PT Mono';
  var labelFontColor = 'black';
  var headerTextShift = 5;
  renderRect(ctx, CLOUD_COORDS[0] + SHADOW_SHIFT, CLOUD_COORDS[1] + SHADOW_SHIFT, CLOUD_WIDTH, CLOUD_HEIGHT, 'rgba(0, 0, 0, 0.7)');
  renderRect(ctx, CLOUD_COORDS[0], CLOUD_COORDS[1], CLOUD_WIDTH, CLOUD_HEIGHT, '#fff');
  var barCoordY = drawWinnerText(ctx, WINNER_MESSAGE, labelFont, CLOUD_COORDS[0] + CLOUD_PADDING, CLOUD_COORDS[1] + CLOUD_PADDING, labelFontColor, headerTextShift);
  drawChart(ctx, names, times, CLOUD_COORDS[0], barCoordY, CHART_HEIGHT, labelFont, labelFontColor);
};

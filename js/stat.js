'use strict';

window.renderStatistics = function (ctx, names, times) {
  var cloudInitialX = 100;
  var cloudInitialY = 10;
  var cloudWidth = 420;
  var cloudHeight = 270;
  var cloudColor = 'rgba(255, 255, 255, 1)';
  var cloudShadowColor = 'rgba(0, 0, 0, 0.7)';
  var cloudTextColor = 'rgba(0, 0, 0, 1)';
  var cloudTextFont = '16px PT Mono';

  var textInitialX = 120;
  var textInitialY = 40;
  var textWidth = 200;
  var textStepY = 20;

  var maxTime = -1;

  var histogramHeight = 150;
  var histogramStep;
  var histogramBarWidth = 40;
  var histogramBarIndent = histogramBarWidth + 50;
  var histogramInitialX = 140;
  var histogramInitialY = 245;
  var histogramYourBarColor = 'rgba(255, 0, 0, 1)';
  var histogramBarColor;
  var histogramBarInitialX;
  var histogramBarHeight;

  var i;

  drawRectangle(ctx, cloudShadowColor, cloudInitialX + 10, cloudInitialY + 10, cloudWidth, cloudHeight);
  drawRectangle(ctx, cloudColor, cloudInitialX, cloudInitialY, cloudWidth, cloudHeight);

  ctx.font = cloudTextFont;

  drawTextArea(ctx, cloudTextColor, 'Ура, вы победили! Список результатов:', textInitialX, textInitialY, textWidth, textStepY);

  maxTime = getMaxValueInArray(times);
  histogramStep = histogramHeight / maxTime;



  for (i = 0; i < times.length; i++) {
    histogramBarInitialX = histogramInitialX + histogramBarIndent * i;
    histogramBarHeight = -times[i] * histogramStep;

    histogramBarColor = (names[i] === 'Вы') ? histogramYourBarColor : getRandomBlueColor();
    drawHistogramBar(ctx, histogramBarColor, histogramBarInitialX, histogramInitialY, histogramBarWidth, histogramBarHeight, times[i].toFixed(), names[i]);
  }
};


// ПОЛУЧЕНИЕ СЛУЧАЙНОГО СИНЕГО ЦВЕТА
function getRandomBlueColor() {
  var transparency;
  var barColor;
  var minTransparency = 0.3;
  var maxTransparency = 0.9;

  transparency = Math.random() * (maxTransparency - minTransparency) + minTransparency;
  barColor = 'rgba(0, 0, 255, ' + transparency + ')';

  return barColor;
}

// ПОЛУЧЕНИЕ МАКСИМАЛЬНОГО ЗНАЧЕНИЯ ИЗ МАССИВА
function getMaxValueInArray(array) {
  var maxValue = -1;
  var i;

  for (i = 0; i < array.length; i++) {
    if (array[i] > maxValue) {
      maxValue = array[i];
    }
  }

  return maxValue;
}

// ОТРИСОВКА СТЛОБИКА ГИСТОГРАММЫ ЗАДАННОГО ЦВЕТА
function drawHistogramBar(context, barColor, x, y, width, height, time, name) {
  var histogramTextTopIndent = 10;
  var histogramTextBottomIndent = 20;
  var textColor = 'rgba(0, 0, 0, 1)';

  drawRectangle(context, barColor, x, y, width, height);
  drawText(context, textColor, time, x, y + height - histogramTextTopIndent);
  drawText(context, textColor, name, x, y + histogramTextBottomIndent);
}

// ОТРИСОВКА ТЕКСТА ЗАДАННОГО ЦВЕТА
function drawText(context, color, text, x, y) {
  context.fillStyle = color;
  context.fillText(text, x, y);
}

// ОТРИСОВКА ПРЯМОУГОЛЬНИКА ЗАДАННОГО ЦВЕТА
function drawRectangle(context, color, x, y, width, height) {
  context.fillStyle = color;
  context.fillRect(x, y, width, height);
}

// ПОСТРОЧНАЯ ОТРИСОВКА ТЕКСТА
function drawTextArea(context, color, text, x, y, maxWidth, yIndent) {

  var words = text.split(' ');
  var countWords = words.length;
  var string = '';
  var bufferString;
  var bufferStringWidth;

  context.fillStyle = color;

  for (var i = 0; i < countWords; i++) {
    bufferString = string + words[i] + ' ';
    bufferStringWidth = context.measureText(bufferString).width;

    if (bufferStringWidth > maxWidth) {
      context.fillText(string, x, y);
      string = words[i] + ' ';
      y += yIndent;
    } else {
      string = bufferString;
    }
  }

  context.fillText(string, x, y);
}


'use strict';

// ОТРИСОВКА ПРЯМОУГОЛЬНИКА ЗАДАННОГО ЦВЕТА
function drawRectangle(context, color, x, y, width, height) {
  context.fillStyle = color;
  context.fillRect(x, y, width, height);
}

// ОТРИСОВКА ТЕКСТА ЗАДАННОГО ЦВЕТА
function drawText(context, color, text, x, y) {
  context.fillStyle = color;
  context.fillText(text, x, y);
}

// ПОЛУЧЕНИЕ СЛУЧАЙНОГО СИНЕГО ЦВЕТА
function getRandomBlueColor() {
  var minTransparency = 0.3;
  var maxTransparency = 0.9;
  var transparency = Math.random() * (maxTransparency - minTransparency) + minTransparency;
  var randomBlueColor = 'rgba(0, 0, 255, ' + transparency + ')';

  return randomBlueColor;
}

// ПОЛУЧЕНИЕ ЦВЕТА СТОЛБЦА
function getBarColor(name) {
  var histogramYourBarColor = 'rgba(255, 0, 0, 1)';
  var barColor = (name === 'Вы') ? histogramYourBarColor : getRandomBlueColor();

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
function drawHistogramBar(context, barColor, x, y, histogramHeightStep, barNumber, time, name) {
  var histogramBarWidth = 40;
  var histogramBarIndent = 50;
  var histogramBarHeigth = -time * histogramHeightStep;
  var histogramBarInitialX = x + (histogramBarWidth + histogramBarIndent) * barNumber;

  var textColor = 'rgba(0, 0, 0, 1)';
  var histogramTimeIndent = 10;
  var histogramNameIndent = 20;
  var histogramTimeInitialY = y + histogramBarHeigth - histogramTimeIndent;
  var histogramNameInitialY = y + histogramNameIndent;

  drawRectangle(context, barColor, histogramBarInitialX, y, histogramBarWidth, histogramBarHeigth);
  drawText(context, textColor, time, histogramBarInitialX, histogramTimeInitialY);
  drawText(context, textColor, name, histogramBarInitialX, histogramNameInitialY);
}

// ПОСТРОЧНАЯ ОТРИСОВКА ТЕКСТА
function drawTextArea(context, color, text, x, y, maxWidth) {
  var words = text.split(' ');
  var countWords = words.length;
  var string = '';
  var bufferString;
  var bufferStringWidth;
  var yIndent = 20;

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

// ОТРИСОВКА ОКНА СТАТИСТИКИ
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

  var maxTime = getMaxValueInArray(times);

  var histogramInitialX = 140;
  var histogramInitialY = 245;
  var histogramHeight = 150;
  var histogramHeightStep = histogramHeight / maxTime;

  var i;

  drawRectangle(ctx, cloudShadowColor, cloudInitialX + 10, cloudInitialY + 10, cloudWidth, cloudHeight);
  drawRectangle(ctx, cloudColor, cloudInitialX, cloudInitialY, cloudWidth, cloudHeight);

  ctx.font = cloudTextFont;

  drawTextArea(ctx, cloudTextColor, 'Ура, вы победили! Список результатов:', textInitialX, textInitialY, textWidth);

  for (i = 0; i < times.length; i++) {
    drawHistogramBar(ctx, getBarColor(names[i]), histogramInitialX, histogramInitialY, histogramHeightStep, i, times[i].toFixed(), names[i]);
  }
};


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
  var textStepY = 20;

  var maxTime = -1;

  var histogramHeight = 150;
  var histogramStep;
  var histogramBarWidth = 40;
  var histogramBarIndent = histogramBarWidth + 50;
  var histogramTextBottomIndent = 20;
  var histogramTextTopIndent = 10;
  var histogramInitialX = 140;
  var histogramInitialY = 245;
  var histogramYourBarColor = 'rgba(255, 0, 0, 1)';

  var i;

  var setAnotherPlayerBarColor = function () {
    var transparency = 0;
    while (transparency < 0.3) {
      transparency = Math.random();
    }
    var barColor = 'rgba(0, 0, 255, ' + transparency + ')';
    return barColor;
  };

  ctx.fillStyle = cloudShadowColor;
  ctx.fillRect(cloudInitialX + 10, cloudInitialY + 10, cloudWidth, cloudHeight);

  ctx.fillStyle = cloudColor;
  ctx.fillRect(cloudInitialX, cloudInitialY, cloudWidth, cloudHeight);

  ctx.fillStyle = cloudTextColor;
  ctx.font = cloudTextFont;
  ctx.fillText('Ура, вы победили!', textInitialX, textInitialY);
  ctx.fillText('Список результатов:', textInitialX, textInitialY + textStepY);

  for (i = 0; i < times.length; i++) {
    if (times[i] > maxTime) {
      maxTime = times[i];
    }
  }

  histogramStep = histogramHeight / maxTime;

  for (i = 0; i < times.length; i++) {
    if (names[i] === 'Вы') {
      ctx.fillStyle = histogramYourBarColor;
    } else {
      ctx.fillStyle = setAnotherPlayerBarColor();
    }

    ctx.fillRect(histogramInitialX + histogramBarIndent * i, histogramInitialY, histogramBarWidth, -times[i] * histogramStep);

    ctx.fillStyle = cloudTextColor;
    ctx.fillText(names[i], histogramInitialX + histogramBarIndent * i, histogramInitialY + histogramTextBottomIndent);
    ctx.fillText(times[i].toFixed(), histogramInitialX + histogramBarIndent * i, histogramInitialY - times[i] * histogramStep - histogramTextTopIndent);

  }
};

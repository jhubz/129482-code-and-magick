'use strict';

window.renderStatistics = function (ctx, names, times) {
  var cloudInitialX = 100,
      cloudInitialY = 10,
      cloudWidth = 420,
      cloudHeight = 270,
      cloudColor = 'rgba(255, 255, 255, 1)',
      cloudShadowColor = 'rgba(0, 0, 0, 0.7)',
      cloudTextColor = 'rgba(0, 0, 0, 1)',
      cloudTextFont = '16px PT Mono',

      textInitialX = 120,
      textInitialY = 40,
      textStepY = 20,

      maxTime = -1,
      maxTimeIndex = -1,

      histogramHeight = 150,
      histogramStep,
      histogramBarWidth = 40,
      histogramBarIndent = histogramBarWidth + 50,
      histogramTextBottomIndent = 20,
      histogramTextTopIndent = 10,
      histogramInitialX = 140,
      histogramInitialY = 245,
      histogramYourBarColor = 'rgba(255, 0, 0, 1)',

      i,

      setAnotherPlayerBarColor = function () {
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
      maxTimeIndex = i;
    }
  }

  histogramStep = histogramHeight / maxTime;

  for(i = 0; i < times.length; i++) {
    if (names[i] === "Вы") {
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

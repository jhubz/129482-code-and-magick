'use strict';

var setupSimilarList = document.querySelector('.setup-similar-list');

// ПОЛУЧЕНИЕ СЛУЧАЙНОГО ЦЕЛОГО ЧИСЛА ИЗ ЗАДАННОГО ДИАПАЗОНА
function getRandomIntNumber(min, max) {
  var randomNumber = Math.random() * (max + 1 - min) + min;
  randomNumber = Math.floor(randomNumber);

  return randomNumber;
}

function createWizard() {
  var names = [
    'Иван',
    'Хуан Себастьян',
    'Мария',
    'Кристоф',
    'Виктор',
    'Юлия',
    'Люпита',
    'Вашингтон'
  ];

  var surnames = [
    'да Марья',
    'Верон',
    'Мирабелла',
    'Вальц',
    'Онопко',
    'Топольницкая',
    'Нионго',
    'Ирвинг'
  ];

  var coatColors = [
    'rgb(101, 137, 164)',
    'rgb(241, 43, 107)',
    'rgb(146, 100, 161)',
    'rgb(56, 159, 117)',
    'rgb(215, 210, 55)',
    'rgb(0, 0, 0)'
  ];

  var eyesColors = [
    'black',
    'red',
    'blue',
    'yellow',
    'green'
  ];

  var randomName = getRandomIntNumber(0, names.length - 1);
  var randomSurname = getRandomIntNumber(0, surnames.length - 1);
  var randomcoatColor = getRandomIntNumber(0, coatColors.length - 1);
  var randomeyesColor = getRandomIntNumber(0, eyesColors.length - 1);

  var wizard = {
    name: names[randomName] + ' ' + surnames[randomSurname],
    coatColor: coatColors[randomcoatColor],
    eyesColor: eyesColors[randomeyesColor],
  }

  return wizard;
}

// СОЗДАНИЕ РАЗМЕТКИ ПОХОЖЕГО ВОЛШЕБНИКА
function createSimilarWizardMark(wizard) {
  var similarWizardTemplate = document.querySelector('#similar-wizard-template');
  var similarWizardElement = similarWizardTemplate.content.cloneNode(true);

  var similarWizardName = similarWizardElement.querySelector('.setup-similar-label');
  var similarWizardCoatColor = similarWizardElement.querySelector('.wizard-coat');
  var similarWizardEyeColor = similarWizardElement.querySelector('.wizard-eyes');

  similarWizardName.textContent = wizard.name;
  similarWizardCoatColor.setAttribute('style', 'fill: ' + wizard.coatColor + ';');
  similarWizardEyeColor.setAttribute('style', 'fill: ' + wizard.eyesColor + ';');


  return similarWizardElement;
}

// СОЗДАНИЕ МАССИВА РАЗМЕТОК ПОХОЖИХ ВОЛШЕБНИКОВ
function createSimilarWizardMarks() {
  var similarWizard;
  var similarWizardMark;
  var similarWizardsCount = 4;
  var fragment = document.createDocumentFragment();

  var i;

  for (i = 0; i < similarWizardsCount; i++) {
    similarWizard = createWizard();
    similarWizardMark = createSimilarWizardMark(similarWizard);
    fragment.appendChild(similarWizardMark);
  }

  return fragment;
}

function setupInit() {
  var setup = document.querySelector('.setup');
  setup.classList.remove('hidden');

  var setupSimilar = document.querySelector('.setup-similar');
  var similarWizardMarks = createSimilarWizardMarks();

  setupSimilarList.appendChild(similarWizardMarks);
  setupSimilar.classList.remove('hidden');
}

setupInit();
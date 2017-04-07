'use strict';

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

var fireballColors = [
  '#ee4830',
  '#30a8ee',
  '#5ce6c0',
  '#e848d5',
  '#e6e848'
];

var setupSimilarList = document.querySelector('.setup-similar-list');

// ПОЛУЧЕНИЕ СЛУЧАЙНОГО ЦЕЛОГО ЧИСЛА ИЗ ЗАДАННОГО ДИАПАЗОНА
function getRandomIntNumber(min, max) {
  return Math.floor(Math.random() * (max + 1 - min) + min);
}

// ПОЛУЧЕНИЕ СЛУЧАЙНОГО ЗНАЧЕНИЯ ИЗ МАССИВА
function getRandomValueFromArray(arr) {
  return arr[getRandomIntNumber(0, arr.length - 1)];
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

  var randomName = getRandomValueFromArray(names);
  var randomSurname = getRandomValueFromArray(surnames);
  var randomCoatColor = getRandomValueFromArray(coatColors);
  var randomEyesColor = getRandomValueFromArray(eyesColors);

  var wizard = {
    name: randomName + ' ' + randomSurname,
    coatColor: randomCoatColor,
    eyesColor: randomEyesColor,
  };

  return wizard;
}

// СОЗДАНИЕ РАЗМЕТКИ ПОХОЖЕГО ВОЛШЕБНИКА
function createSimilarWizardMark(wizard) {
  var similarWizardTemplate = document.querySelector('#similar-wizard-template');
  var similarWizardElement = similarWizardTemplate.content.cloneNode(true);

  var similarWizardName = similarWizardElement.querySelector('.setup-similar-label');
  var similarWizardCoatColor = similarWizardElement.querySelector('.wizard-coat');
  var similarWizardEyeColor = similarWizardElement.querySelector('.wizard-eyes');

  similarWizardName.style.width = 150 + 'px';
  similarWizardName.style.wordWrap = 'break-word';
  similarWizardName.textContent = wizard.name;
  similarWizardCoatColor.style.fill = wizard.coatColor;
  similarWizardEyeColor.style.fill = wizard.eyesColor;


  return similarWizardElement;
}

// СОЗДАНИЕ МАССИВА РАЗМЕТОК ПОХОЖИХ ВОЛШЕБНИКОВ
function createSimilarWizardMarks() {
  var similarWizardsCount = 4;
  var fragment = document.createDocumentFragment();

  for (var i = 0; i < similarWizardsCount; i++) {
    fragment.appendChild(createSimilarWizardMark(createWizard()));
  }

  return fragment;
}

function addListenersToPage() {
  var setup = document.querySelector('.setup');
  var setupOpen = document.querySelector('.setup-open');
  var setupOpenIcon = document.querySelector('.setup-open-icon');
  var setupClose = setup.querySelector('.setup-close');

  var wizard = setup.querySelector('.wizard');
  var wizardCoat = wizard.querySelector('.wizard-coat');
  var wizardEyes = wizard.querySelector('.wizard-eyes');
  var wizardFireball = setup.querySelector('.setup-fireball-wrap');

  // ЗАКРЫВАНИЕ ОКНА ПО ESC
  var onPopupEscPress = function (evt) {
    if (evt.keyCode === 27) {
      popupClose();
    }
  };

  // ОТКРЫВАНИЕ ОКНА
  var popupOpen = function () {
    setup.classList.remove('hidden');
    document.addEventListener('keydown', onPopupEscPress);
  };

  // ЗАКРЫВАНИЕ ОКНА
  var popupClose = function () {
    setup.classList.add('hidden');
    document.removeEventListener('keydown', onPopupEscPress);
  };

  setupOpen.addEventListener('click', function () {
    popupOpen();
  });

  setupOpenIcon.addEventListener('keydown', function (evt) {
    if (evt.keyCode === 13) {
      popupOpen();
    }
  });

  setupClose.addEventListener('click', function () {
    popupClose();
  });

  setupClose.addEventListener('keydown', function (evt) {
    if (evt.keyCode === 13) {
      popupClose();
    }
  });

  wizardCoat.addEventListener('click', function () {
    wizardCoat.style.fill = getRandomValueFromArray(coatColors);
  });

  wizardEyes.addEventListener('click', function () {
    wizardEyes.style.fill = getRandomValueFromArray(eyesColors);
  });

  wizardFireball.addEventListener('click', function () {
    wizardFireball.style.background = getRandomValueFromArray(fireballColors);
  });
}

function setupInit() {
  var setupSimilar = document.querySelector('.setup-similar');
  var similarWizardMarks = createSimilarWizardMarks();

  setupSimilarList.appendChild(similarWizardMarks);
  setupSimilar.classList.remove('hidden');

  addListenersToPage();
}

setupInit();

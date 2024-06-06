// Variables globales pour le timer
let timerInterval;
let timerValue = 0;
let timerHistory = [];

// Fonction pour démarrer le timer
function startTimer() {
  // Vérifier si le timer est déjà en cours
  if (timerInterval) {
    return;
  }

  // Démarrer le timer en incrémentant la valeur toutes les secondes
  timerInterval = setInterval(function() {
    timerValue++;
    sendMessageToPopup({ action: 'updateTimer', value: timerValue });
  }, 1000);
}

// Fonction pour arrêter le timer
function stopTimer() {
  // Vérifier si le timer est en cours
  if (timerInterval) {
    clearInterval(timerInterval);
    timerInterval = null;
  }
}

// Fonction pour réinitialiser le timer
function resetTimer() {
  stopTimer();
  timerHistory.push(timerValue);
  sendMessageToPopup({ action: 'updateTimer', value: timerValue });
  timerValue = 0;
  sendMessageToPopup({ action: 'updateTimer', value: timerValue });
  sendMessageToPopup({ action: 'updateHistory', history: timerHistory });
}

// Fonction pour envoyer un message au popup.js
function sendMessageToPopup(message) {
  chrome.runtime.sendMessage(message);
}

// Écouteurs d'événements pour les messages provenant du popup
chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
  if (request.action === 'start') {
    startTimer();
  } else if (request.action === 'stop') {
    stopTimer();
  } else if (request.action === 'reset') {
    resetTimer();
  }
});

// Événement lors de l'installation de l'extension
chrome.runtime.onInstalled.addListener(function() {
  // Effectuez les opérations d'installation ici
});
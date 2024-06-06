// Fonction pour mettre à jour l'affichage du timer dans le popup
function updateTimerDisplay(value) {
    const timerElement = document.getElementById('timer');
    const hours = Math.floor(value / 3600);
    const minutes = Math.floor((value % 3600) / 60);
    const seconds = value % 60;
    timerElement.textContent = `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  }
  
  // Fonction pour mettre à jour l'affichage de l'historique des timers dans le popup
  function updateHistoryDisplay(history) {
    const historyElement = document.getElementById('history');
    historyElement.innerHTML = '';
    history.forEach(function(value) {
      const item = document.createElement('li');
      item.textContent = formatTimerValue(value);
      historyElement.appendChild(item);
    });
  }
  
  // Fonction pour formater la valeur du timer
  function formatTimerValue(value) {
    const hours = Math.floor(value / 3600);
    const minutes = Math.floor((value % 3600) / 60);
    const seconds = value % 60;
    return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  }
  
  // Fonction pour envoyer un message au background.js
  function sendMessage(action) {
    chrome.runtime.sendMessage({ action: action });
  }
  
  // Écouteurs d'événements pour les boutons du popup
  document.addEventListener('DOMContentLoaded', function() {
    document.getElementById('start').addEventListener('click', function() {
      sendMessage('start');
    });
  
    document.getElementById('stop').addEventListener('click', function() {
      sendMessage('stop');
    });
  
    document.getElementById('reset').addEventListener('click', function() {
      sendMessage('reset');
    });
  });
  
  // Écouteur d'événements pour les messages provenant du background.js
  chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
    if (request.action === 'updateTimer') {
      updateTimerDisplay(request.value);
    } else if (request.action === 'updateHistory') {
      updateHistoryDisplay(request.history);
    }
  });
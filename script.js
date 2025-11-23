   let playerName = prompt("Введіть своє ім’я:");
    if (!playerName || playerName.trim() === "") playerName = "Гравець";
    document.getElementById("playerInfo").textContent = `Гравець: ${playerName}`;

    let attempt = 1;
    const maxAttempts = 3;
    let hasWon = false;

    const symbols = [
      { id: 1, name: 'clover', image: '🍀' },
      { id: 2, name: 'alien', image: '👽' },
      { id: 3, name: 'pig', image: '🐖' },
      { id: 4, name: 'space', image: '🌌' },
      { id: 5, name: 'star', image: '✨' },
      { id: 6, name: 'rocket', image: '🚀' }
    ];

    const buttonContainer = document.getElementById("buttonContainer");
    const spinBtn = document.createElement("button");
    spinBtn.textContent = "Крутити";
    buttonContainer.appendChild(spinBtn);

    function initializeReels() {
      for (let i = 1; i <= 3; i++) {
        const reel = document.getElementById(`reel${i}`);
        reel.innerHTML = '';
        
        const reelSymbols = [...symbols];
        
        for (let j = reelSymbols.length - 1; j > 0; j--) {
          const k = Math.floor(Math.random() * (j + 1));
          [reelSymbols[j], reelSymbols[k]] = [reelSymbols[k], reelSymbols[j]];
        }
        
        reelSymbols.forEach(symbol => {
          const symbolElement = document.createElement('div');
          symbolElement.className = 'symbol';
          symbolElement.textContent = symbol.image;
          symbolElement.dataset.id = symbol.id;
          reel.appendChild(symbolElement);
        });
      }
    }

    function updateAttemptInfo() {
      document.getElementById("roundInfo").textContent = `Спроба ${attempt} з ${maxAttempts}`;
    }

    function checkWin() {
      const reels = [
        document.getElementById('reel1'),
        document.getElementById('reel2'),
        document.getElementById('reel3')
      ];
      
      const centerSymbols = reels.map(reel => {
        const symbols = reel.querySelectorAll('.symbol');
        return symbols[1].dataset.id;
      });
      
      const allEqual = centerSymbols.every(symbol => symbol === centerSymbols[0]);
      
      return allEqual;
    }

    function spinReels() {
      if (attempt > maxAttempts || hasWon) return;
      
      spinBtn.disabled = true;
      
      for (let i = 1; i <= 3; i++) {
        const reel = document.getElementById(`reel${i}`);
        reel.innerHTML = '';
        
        const reelSymbols = [...symbols];
        
        for (let j = reelSymbols.length - 1; j > 0; j--) {
          const k = Math.floor(Math.random() * (j + 1));
          [reelSymbols[j], reelSymbols[k]] = [reelSymbols[k], reelSymbols[j]];
        }
        
        reelSymbols.forEach(symbol => {
          const symbolElement = document.createElement('div');
          symbolElement.className = 'symbol';
          symbolElement.textContent = symbol.image;
          symbolElement.dataset.id = symbol.id;
          reel.appendChild(symbolElement);
        });
      }
      
      spinBtn.disabled = false;
      
      const isWin = checkWin();
      
      if (isWin) {
        hasWon = true;
        document.getElementById("result").textContent = `Вітаємо! ${playerName} виграв(ла)!`;
        document.getElementById("result").className = "win-text";
        spinBtn.disabled = true;
        
        const restartBtn = document.createElement("button");
        restartBtn.textContent = "Грати знову";
        restartBtn.addEventListener("click", function() {
          location.reload();
        });
        buttonContainer.appendChild(restartBtn);
      } else {
        attempt++;
        if (attempt <= maxAttempts) {
          updateAttemptInfo();
        } else {
          document.getElementById("roundInfo").textContent = "Гра завершена!";
          document.getElementById("result").textContent = "На жаль, ви не виграли. Спробуйте ще раз!";
          spinBtn.disabled = true;
          
          const restartBtn = document.createElement("button");
          restartBtn.textContent = "Вкласти 5$ щоб зіграти знову";
          restartBtn.addEventListener("click", function() {
            location.reload();
          });
          buttonContainer.appendChild(restartBtn);
        }
      }
    }

    initializeReels();
    updateAttemptInfo();
    
    spinBtn.addEventListener("click", spinReels);
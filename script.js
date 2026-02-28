let selected = null;

  function select(btn) {
    document.querySelectorAll('.day-btn').forEach(b => b.classList.remove('selected'));
    btn.classList.add('selected');
    selected = btn.textContent;
  }

  const phases = [
    "Initializing neural cores...",
    "Running DNA Analysis...",
    "Consulting quantum calendar...",
    "Cross-referencing moon phase...",
    "Deploying 47 AI agents...",
    "Analyzing temporal flux...",
    "Decrypting spacetime continuum...",
    "Processing..."
  ];

  function predict() {
    if (!selected) {
      document.getElementById('statusText').textContent = "[ SELECT A DAY FIRST ]";
      return;
    }

    const spinner = document.getElementById('spinner');
    const statusText = document.getElementById('statusText');
    const result = document.getElementById('result');
    const resultSub = document.getElementById('resultSub');

    result.style.display = 'none';
    resultSub.style.display = 'none';
    spinner.style.display = 'block';
    document.querySelectorAll('.day-btn').forEach(b => {
      b.style.background = '';
      b.style.borderColor = '';
      b.style.color = '';
    });

    let i = 0;
    const interval = setInterval(() => {
      statusText.textContent = phases[i % phases.length];
      i++;
      if (i >= phases.length) {
        clearInterval(interval);
        spinner.style.display = 'none';

        const tomorrow = getTomorrow();
        const correct = selected === tomorrow;

        result.textContent = `TOMORROW IS: ${tomorrow.toUpperCase()}`;
        result.style.color = correct ? '#00dc64' : '#ff4444';
        result.style.textShadow = correct ? '0 0 20px rgba(0,220,100,0.8)' : '0 0 20px rgba(255,68,68,0.8)';
        result.style.display = 'block';

        if (correct) {
          resultSub.textContent = "✓ YOUR GUESS WAS CORRECT — 7/7 NETWORKS AGREE";
          resultSub.style.color = 'rgba(0,220,100,0.6)';
          statusText.textContent = "Prediction accuracy: 99.7%";
        } else {
          resultSub.textContent = `✗ YOU SAID ${selected.toUpperCase()} — INCORRECT`;
          resultSub.style.color = 'rgba(255,68,68,0.6)';
          statusText.textContent = "Skill issue detected in user input.";
        }
        resultSub.style.display = 'block';

        // highlight the correct day button
        document.querySelectorAll('.day-btn').forEach(b => {
          b.classList.remove('selected');
          if (b.textContent === tomorrow) {
            b.style.background = correct ? 'rgba(0,220,100,0.15)' : 'rgba(255,68,68,0.15)';
            b.style.borderColor = correct ? '#00dc64' : '#ff4444';
            b.style.color = correct ? '#00dc64' : '#ff4444';
          }
        });
      }
    }, 400);
  }

  function getTomorrow() {
    const days = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];
    return days[(new Date().getDay() + 1) % 7];
  }
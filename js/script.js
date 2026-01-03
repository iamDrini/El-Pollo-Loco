document.addEventListener('DOMContentLoaded', function() {
                    const startBtn = document.querySelector('.start-screen-btn');
                    const startScreen = document.querySelector('.start-screen');
                    startBtn.addEventListener('click', function() {
                        startScreen.style.display = 'none';
                        if (typeof init === 'function') {
                            init();
                        }
                    });
                });
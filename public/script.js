document.addEventListener('DOMContentLoaded', () => {
            const loadingText = document.getElementById('loading-text');
            const progressInner = document.getElementById('progress-inner');
            const hintText = document.getElementById('hint-text');
            const loadingScreen = document.getElementById('loading-screen');
            const mainUi = document.getElementById('main-ui');

            // Verifica se o usuário já passou pelo boot nesta sessão
            const hasBooted = sessionStorage.getItem('cyberpunk_boot_complete');

            if (hasBooted) {
                // Se já carregou antes, remove a tela de loading imediatamente
                loadingScreen.style.display = 'none';
                mainUi.classList.add('show-content');
                return; // Encerra o script aqui
            }

            const bootMessages = [
                "CARREGANDO KERNEL_ARASAKA...",
                "ESTABELECENDO LIGAÇÃO NEURAL...",
                "VERIFICANDO BIOMÉTRICOS...",
                "LIMPANDO REGISTROS DA POLÍCIA...",
                "ACESSANDO DATABASE DE NIGHT CITY...",
                "SISTEMA PRONTO PARA ACESSO."
            ];

            let progress = 0;
            let readyToEnter = false;

            // Loop de carregamento
            const loadInterval = setInterval(() => {
                progress += Math.random() * 4;
                
                if (progress >= 100) {
                    progress = 100;
                    clearInterval(loadInterval);
                    readyToEnter = true;
                    
                    // Interface Final de Boot
                    loadingText.textContent = bootMessages[bootMessages.length - 1];
                    hintText.textContent = "PRESSIONE QUALQUER TECLA PARA CONECTAR";
                    hintText.classList.add('active');
                } else {
                    // Atualiza mensagens conforme a percentagem
                    let msgIndex = Math.floor((progress / 100) * (bootMessages.length - 1));
                    loadingText.textContent = bootMessages[msgIndex];
                }
                
                progressInner.style.width = progress + "%";
            }, 70);

            // Função para entrar na interface
            function startSystem() {
                if (readyToEnter) {
                    // Salva que o boot foi concluído nesta sessão
                    sessionStorage.setItem('cyberpunk_boot_complete', 'true');
                    
                    loadingScreen.style.transition = "opacity 0.6s ease, transform 0.6s ease";
                    loadingScreen.style.opacity = "0";
                    loadingScreen.style.transform = "scale(1.1)";
                    
                    setTimeout(() => {
                        loadingScreen.style.display = "none";
                        mainUi.classList.add('show-content');
                    }, 600);
                }
            }

            // Listeners para ativação
            window.addEventListener('keydown', startSystem);
            window.addEventListener('mousedown', startSystem);
        });
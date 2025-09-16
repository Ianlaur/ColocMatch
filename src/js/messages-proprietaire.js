// Script pour la page de messagerie propriétaire
document.addEventListener('DOMContentLoaded', function() {
    // Sélection des éléments du DOM
    const navItems = document.querySelectorAll('.nav-item');
    const conversationItems = document.querySelectorAll('.conversation-item');
    const infoBtn = document.querySelector('.info-btn');
    const closeInfoBtn = document.querySelector('.close-info-btn');
    const roommatesInfo = document.querySelector('#roommatesInfo');
    const chatInput = document.querySelector('.chat-input');
    const sendBtn = document.querySelector('.send-btn');
    const chatMessages = document.getElementById('chatMessages');
    const attachmentBtn = document.querySelector('.attachment-btn');
    const callBtn = document.querySelector('.call-btn');
    const videoBtn = document.querySelector('.video-btn');
    const documentItems = document.querySelectorAll('.document-item');
    const contactBtns = document.querySelectorAll('.btn-contact');
    const chatHeader = document.querySelector('.chat-header');
    const conversationsSidebar = document.querySelector('.conversations-sidebar');
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    
    // Nouveaux éléments pour la navigation entre vues
    const conversationsView = document.getElementById('conversationsView');
    const chatView = document.getElementById('chatView');
    const backBtn = document.getElementById('backToConversations');
    
    // Éléments pour les groupes de colocataires
    const approveButtons = document.querySelectorAll('.btn-approve');
    const rejectButtons = document.querySelectorAll('.btn-reject');
    const chatGroupButtons = document.querySelectorAll('.btn-chat');
    
    // S'assurer que le panneau de colocataires est masqué au chargement
    if (roommatesInfo) {
        roommatesInfo.classList.remove('active');
    }
    
    // Auto-focus l'input de chat au chargement
    if (chatInput) {
        setTimeout(() => chatInput.focus(), 500);
    }
    
    // Gestion du bouton hamburger pour mobile
    if (mobileMenuBtn && conversationsSidebar) {
        mobileMenuBtn.addEventListener('click', function(e) {
            e.stopPropagation();
            
            this.classList.toggle('active');
            conversationsSidebar.classList.toggle('active');
            
            // Fermer le panneau de colocataires si ouvert
            if (roommatesInfo && roommatesInfo.classList.contains('active')) {
                roommatesInfo.classList.remove('active');
                if (infoBtn) infoBtn.classList.remove('btn-active');
            }
        });
        
        // Fermer la sidebar lorsqu'on clique à l'extérieur
        document.addEventListener('click', function(e) {
            if (conversationsSidebar.classList.contains('active') && 
                !conversationsSidebar.contains(e.target) && 
                e.target !== mobileMenuBtn) {
                
                conversationsSidebar.classList.remove('active');
                mobileMenuBtn.classList.remove('active');
            }
        });
        
        // Empêcher la fermeture lors des clics dans la sidebar
        conversationsSidebar.addEventListener('click', function(e) {
            e.stopPropagation();
        });
    }
    
    // Navigation du bas
    navItems.forEach(item => {
        item.addEventListener('click', function() {
            // Animation de click
            this.classList.add('btn-click');
            setTimeout(() => this.classList.remove('btn-click'), 300);
            
            // Retirer la classe active
            navItems.forEach(nav => nav.classList.remove('active'));
            
            // Ajouter la classe active à l'élément cliqué
            this.classList.add('active');
            
            // Navigation vers les différentes pages
            const tab = this.getAttribute('data-tab');
            if (tab === 'dashboard') {
                window.location.href = 'owner-dashboard.html';
            } else if (tab === 'profile') {
                window.location.href = 'owner-profile.html';
            } else if (tab === 'messages') {
                window.location.href = 'messages-proprietaire.html';
            }
        });
    });
    
    // Gestion du bouton retour
    if (backBtn) {
        backBtn.addEventListener('click', function() {
            // Animation du bouton
            this.classList.add('btn-click');
            setTimeout(() => this.classList.remove('btn-click'), 300);
            
            // Transition vers la vue des conversations
            chatView.classList.remove('active');
            conversationsView.classList.add('active');
            
            // Fermer le panneau d'infos s'il est ouvert
            if (roommatesInfo && roommatesInfo.classList.contains('active')) {
                roommatesInfo.classList.remove('active');
                if (infoBtn) infoBtn.classList.remove('btn-active');
            }
        });
    }
    
    // Gestion des conversations
    conversationItems.forEach(item => {
        item.addEventListener('click', function() {
            // Effet de sélection
            this.style.transform = 'scale(0.98)';
            setTimeout(() => this.style.transform = '', 150);
            
            // Retirer la classe active
            conversationItems.forEach(conv => conv.classList.remove('active'));
            
            // Ajouter la classe active à l'élément cliqué
            this.classList.add('active');
            
            // Récupérer les données de la conversation
            const conversationId = this.getAttribute('data-conversation');
            
            // Transition vers la vue de chat
            conversationsView.classList.remove('active');
            chatView.classList.add('active');
            
            // Supprimer le badge de message non lu
            const badge = this.querySelector('.conversation-badge');
            if (badge) {
                badge.style.transform = 'scale(0)';
                setTimeout(() => badge.remove(), 200);
            }
            
            // Simuler un délai de chargement
            chatMessages.style.opacity = '0.6';
            setTimeout(() => {
                // Dans une version réelle, on chargerait les messages de la conversation
                updateChatHeader(conversationId);
                chatMessages.style.opacity = '1';
                
                // Auto-focus du champ de texte
                if (chatInput) {
                    setTimeout(() => chatInput.focus(), 300);
                }
            }, 300);
        });
    });
    
    // Gérer le clic en dehors du panneau pour le fermer
    document.addEventListener('click', function(e) {
        if (roommatesInfo && roommatesInfo.classList.contains('active')) {
            // Si le clic n'est pas sur le panneau, ni sur le bouton d'info, on ferme
            if (!roommatesInfo.contains(e.target) && e.target !== infoBtn && !infoBtn.contains(e.target)) {
                infoBtn.classList.remove('btn-active');
                roommatesInfo.classList.remove('active');
            }
        }
    });
    
    // Ouvrir/fermer le panneau d'informations
    if (infoBtn) {
        infoBtn.addEventListener('click', function(e) {
            // Empêcher la propagation pour éviter de fermer immédiatement
            e.stopPropagation();
            
            // Animation du bouton
            this.classList.toggle('btn-active');
            
            if (roommatesInfo) {
                if (roommatesInfo.classList.contains('active')) {
                    // Fermer le panneau
                    roommatesInfo.classList.remove('active');
                } else {
                    // Ouvrir le panneau
                    roommatesInfo.classList.add('active');
                    
                    // Effet d'apparition des éléments du panneau
                    const items = roommatesInfo.querySelectorAll('.roommate-card, .document-item');
                    items.forEach((item, index) => {
                        item.style.opacity = '0';
                        item.style.transform = 'translateX(20px)';
                        setTimeout(() => {
                            item.style.opacity = '1';
                            item.style.transform = '';
                        }, 100 + (index * 50));
                    });
                }
            }
        });
    }
    
    if (closeInfoBtn) {
        closeInfoBtn.addEventListener('click', function(e) {
            // Empêcher la propagation
            e.stopPropagation();
            
            if (infoBtn) {
                infoBtn.classList.remove('btn-active');
            }
            
            if (roommatesInfo) {
                roommatesInfo.classList.remove('active');
            }
        });
    }
    
    // Empêcher la fermeture lors des clics à l'intérieur du panneau
    if (roommatesInfo) {
        roommatesInfo.addEventListener('click', function(e) {
            e.stopPropagation();
        });
    }
    
    // Envoi de message avec animation
    if (sendBtn && chatInput) {
        sendBtn.addEventListener('click', sendMessage);
        
        // Animation au survol du bouton d'envoi
        sendBtn.addEventListener('mouseenter', function() {
            this.style.transform = 'scale(1.1)';
        });
        
        sendBtn.addEventListener('mouseleave', function() {
            this.style.transform = '';
        });
        
        chatInput.addEventListener('keypress', function(e) {
            if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault();
                sendMessage();
            }
        });
        
        // Ajuster dynamiquement la hauteur du textarea
        chatInput.addEventListener('input', function() {
            this.style.height = '0';
            const newHeight = Math.min(this.scrollHeight, 120);
            this.style.height = newHeight + 'px';
            
            // Effet de "typing" pour le bouton d'envoi
            if (this.value.trim().length > 0) {
                sendBtn.classList.add('ready-to-send');
            } else {
                sendBtn.classList.remove('ready-to-send');
            }
        });
    }
    
    function sendMessage() {
        if (!chatInput.value.trim()) return;
        
        // Animation du bouton d'envoi
        sendBtn.classList.add('sending');
        setTimeout(() => sendBtn.classList.remove('sending'), 300);
        
        // Créer le groupe de message
        const messageGroup = document.createElement('div');
        messageGroup.className = 'message-group own';
        
        // Créer l'avatar
        const messageAvatar = document.createElement('div');
        messageAvatar.className = 'message-avatar';
        const avatar = document.createElement('img');
        avatar.src = '20250429_2140_Jeune Homme Humain_simple_compose_01jt1h0tezf1avm9q9v81q1z6f.png';
        avatar.alt = 'Vous';
        messageAvatar.appendChild(avatar);
        
        // Créer le contenu du message
        const messageContent = document.createElement('div');
        messageContent.className = 'message-content';
        
        // Créer l'en-tête du message
        const messageHeader = document.createElement('div');
        messageHeader.className = 'message-header';
        
        const timestamp = document.createElement('span');
        const now = new Date();
        timestamp.textContent = `${now.getHours().toString().padStart(2, '0')}:${now.getMinutes().toString().padStart(2, '0')}`;
        
        const sender = document.createElement('h4');
        sender.textContent = 'Vous';
        
        messageHeader.appendChild(timestamp);
        messageHeader.appendChild(sender);
        
        // Créer la bulle de message
        const messageBubble = document.createElement('div');
        messageBubble.className = 'message-bubble';
        
        const messageText = document.createElement('p');
        messageText.textContent = chatInput.value.trim();
        
        messageBubble.appendChild(messageText);
        
        // Assembler le message
        messageContent.appendChild(messageHeader);
        messageContent.appendChild(messageBubble);
        
        messageGroup.appendChild(messageContent);
        messageGroup.appendChild(messageAvatar);
        
        // Ajouter le message au chat
        chatMessages.appendChild(messageGroup);
        
        // Vider l'input et réinitialiser sa hauteur
        chatInput.value = '';
        chatInput.style.height = 'auto';
        sendBtn.classList.remove('ready-to-send');
        
        // Défiler vers le bas
        smoothScrollToBottom(chatMessages);
        
        // Simuler une réponse après un délai
        setTimeout(simulateResponse, 1000 + Math.random() * 2000);
    }
    
    // Fonction de défilement fluide vers le bas
    function smoothScrollToBottom(element) {
        const start = element.scrollTop;
        const target = element.scrollHeight - element.clientHeight;
        const duration = 300; // durée en ms
        const startTime = performance.now();
        
        if (Math.abs(target - start) < 10) {
            element.scrollTop = target;
            return;
        }
        
        function step(timestamp) {
            const elapsed = timestamp - startTime;
            const progress = Math.min(elapsed / duration, 1);
            const ease = easeOutCubic(progress);
            
            element.scrollTop = start + (target - start) * ease;
            
            if (progress < 1) {
                window.requestAnimationFrame(step);
            }
        }
        
        function easeOutCubic(x) {
            return 1 - Math.pow(1 - x, 3);
        }
        
        window.requestAnimationFrame(step);
    }
    
    function simulateResponse() {
        // Créer une indication de frappe
        const typingGroup = document.createElement('div');
        typingGroup.className = 'message-group typing-indicator';
        
        // Avatar
        const typingAvatar = document.createElement('div');
        typingAvatar.className = 'message-avatar';
        const avatar = document.createElement('img');
        
        // Choisir aléatoirement un avatar
        const avatars = [
            'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8cHJvZmlsZSUyMHdvbWFufGVufDB8fDB8fHww&auto=format&fit=crop&w=800&q=60',
            'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTJ8fHBvcnRyYWl0JTIwbWFsZXxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=800&q=60',
            '20250429_2140_Jeune Homme Humain_simple_compose_01jt1h0tezf1avm9q9v81q1z6f.png'
        ];
        
        const randomAvatar = avatars[Math.floor(Math.random() * avatars.length)];
        avatar.src = randomAvatar;
        avatar.alt = 'Typing';
        typingAvatar.appendChild(avatar);
        
        // Contenu du message
        const typingContent = document.createElement('div');
        typingContent.className = 'message-content';
        
        // Bulle de message
        const typingBubble = document.createElement('div');
        typingBubble.className = 'message-bubble';
        
        // Points de frappe
        for (let i = 0; i < 3; i++) {
            const dot = document.createElement('span');
            dot.className = 'dot';
            typingBubble.appendChild(dot);
        }
        
        typingContent.appendChild(typingBubble);
        typingGroup.appendChild(typingAvatar);
        typingGroup.appendChild(typingContent);
        
        // Ajouter l'indicateur au chat
        chatMessages.appendChild(typingGroup);
        
        // Défiler
        smoothScrollToBottom(chatMessages);
        
        // Après un délai aléatoire, supprimer l'indicateur et afficher la réponse
        const responseDelay = 1000 + Math.random() * 2000;
        setTimeout(() => {
            chatMessages.removeChild(typingGroup);
            
            // Créer le groupe de message
            const messageGroup = document.createElement('div');
            messageGroup.className = 'message-group';
            
            // Avatar
            const messageAvatar = document.createElement('div');
            messageAvatar.className = 'message-avatar';
            const respAvatar = document.createElement('img');
            respAvatar.src = randomAvatar;
            
            // Déterminer le nom en fonction de l'avatar
            let name = 'Thomas';
            if (randomAvatar.includes('woman')) {
                name = 'Sophie';
            } else if (randomAvatar.includes('male')) {
                name = 'Lucas';
            }
            
            respAvatar.alt = name;
            messageAvatar.appendChild(respAvatar);
            
            // Contenu du message
            const messageContent = document.createElement('div');
            messageContent.className = 'message-content';
            
            // En-tête
            const messageHeader = document.createElement('div');
            messageHeader.className = 'message-header';
            
            const sender = document.createElement('h4');
            sender.textContent = name;
            
            const timestamp = document.createElement('span');
            const now = new Date();
            timestamp.textContent = `${now.getHours().toString().padStart(2, '0')}:${now.getMinutes().toString().padStart(2, '0')}`;
            
            messageHeader.appendChild(sender);
            messageHeader.appendChild(timestamp);
            
            // Bulle de message
            const messageBubble = document.createElement('div');
            messageBubble.className = 'message-bubble';
            
            const messageText = document.createElement('p');
            
            // Réponses prédéfinies
            const responses = [
                "D'accord, je note ça !",
                "Merci pour l'information.",
                "Super, on en reparle bientôt !",
                "Pas de souci, je comprends.",
                "C'est noté, merci !",
                "On peut se voir la semaine prochaine pour en discuter ?",
                "Parfait, ça me convient !",
                "Je vous recontacterai pour plus de détails."
            ];
            
            messageText.textContent = responses[Math.floor(Math.random() * responses.length)];
            messageBubble.appendChild(messageText);
            
            // Assembler
            messageContent.appendChild(messageHeader);
            messageContent.appendChild(messageBubble);
            
            messageGroup.appendChild(messageAvatar);
            messageGroup.appendChild(messageContent);
            
            // Ajouter et défiler
            chatMessages.appendChild(messageGroup);
            smoothScrollToBottom(chatMessages);
            
            // Highlight
            setTimeout(() => {
                messageGroup.classList.add('highlight');
            }, 100);
        }, responseDelay);
    }
    
    // Adapter la hauteur du champ de texte
    if (chatInput) {
        chatInput.addEventListener('input', function() {
            // Réinitialiser la hauteur
            this.style.height = 'auto';
            
            // Calculer la nouvelle hauteur en fonction du contenu
            const newHeight = Math.min(this.scrollHeight, 120);
            this.style.height = newHeight + 'px';
        });
    }
    
    // Simuler les actions des boutons avec animation
    if (attachmentBtn) {
        attachmentBtn.addEventListener('mouseenter', function() {
            this.style.transform = 'scale(1.05)';
        });
        
        attachmentBtn.addEventListener('mouseleave', function() {
            this.style.transform = '';
        });
        
        attachmentBtn.addEventListener('click', function() {
            this.style.transform = 'scale(0.95)';
            setTimeout(() => this.style.transform = '', 300);
            
            // Montrer un menu contextuel
            const attachmentMenu = document.createElement('div');
            attachmentMenu.className = 'attachment-menu';
            attachmentMenu.innerHTML = `
                <div class="attachment-option"><i class="fas fa-image"></i> Photo</div>
                <div class="attachment-option"><i class="fas fa-file-pdf"></i> Document</div>
                <div class="attachment-option"><i class="fas fa-paperclip"></i> Fichier</div>
            `;
            
            document.querySelector('.chat-input-area').appendChild(attachmentMenu);
            
            // Animer l'apparition
            setTimeout(() => attachmentMenu.classList.add('visible'), 10);
            
            // Clic en dehors pour fermer
            function closeMenu(e) {
                if (!attachmentMenu.contains(e.target) && e.target !== attachmentBtn) {
                    attachmentMenu.classList.remove('visible');
                    setTimeout(() => attachmentMenu.remove(), 300);
                    document.removeEventListener('click', closeMenu);
                }
            }
            
            // Délai pour éviter la fermeture immédiate
            setTimeout(() => {
                document.addEventListener('click', closeMenu);
            }, 10);
        });
    }
    
    // Faire défiler le chat vers le bas au chargement
    if (chatMessages) {
        chatMessages.scrollTop = chatMessages.scrollHeight;
    }
    
    // Ajouter la classe pour les animations
    document.body.classList.add('animations-enabled');
    
    // Gestion des boutons d'approbation de groupe
    approveButtons.forEach(button => {
        button.addEventListener('click', function() {
            const groupId = this.getAttribute('data-group');
            const groupItem = this.closest('.coloc-group-item');
            const groupName = groupItem.querySelector('.group-info h4').textContent;
            const propertyName = groupItem.querySelector('.group-info p strong').textContent;
            
            // Animation d'approbation
            this.style.transform = 'scale(1.2)';
            setTimeout(() => this.style.transform = '', 300);
            
            // Mise à jour visuelle
            groupItem.classList.remove('new');
            groupItem.style.backgroundColor = 'rgba(52, 199, 89, 0.1)';
            
            // Remplacer les boutons approuver/rejeter par un message
            const groupInfo = groupItem.querySelector('.group-info');
            const statusElement = document.createElement('p');
            statusElement.className = 'status-approved';
            
            const now = new Date();
            const formattedDate = `${now.getDate().toString().padStart(2, '0')}/${(now.getMonth() + 1).toString().padStart(2, '0')}`;
            statusElement.textContent = `Approuvé le ${formattedDate}`;
            
            // Supprimer l'horodatage et ajouter le statut
            const timestamp = groupInfo.querySelector('.timestamp');
            if (timestamp) timestamp.remove();
            groupInfo.appendChild(statusElement);
            
            // Masquer les boutons approuver/rejeter
            this.style.display = 'none';
            const rejectBtn = groupItem.querySelector('.btn-reject');
            if (rejectBtn) rejectBtn.style.display = 'none';
            
            // Créer notification
            showNotification(`Groupe de colocataires pour "${propertyName}" approuvé avec succès`, 'success');
            
            // Créer un nouveau thread de conversation pour ce groupe
            createGroupConversation(groupId, groupName, propertyName);
            
            // Mettre à jour le badge de nouveaux groupes
            updateNewGroupsBadge();
        });
    });
    
    // Gestion des boutons de rejet de groupe
    rejectButtons.forEach(button => {
        button.addEventListener('click', function() {
            const groupId = this.getAttribute('data-group');
            const groupItem = this.closest('.coloc-group-item');
            const propertyName = groupItem.querySelector('.group-info p strong').textContent;
            
            // Animation de rejet
            groupItem.style.transform = 'translateX(10px)';
            groupItem.style.opacity = '0.8';
            
            setTimeout(() => {
                // Animation de sortie
                groupItem.style.height = groupItem.offsetHeight + 'px';
                setTimeout(() => {
                    groupItem.style.height = '0';
                    groupItem.style.padding = '0';
                    groupItem.style.margin = '0';
                    groupItem.style.overflow = 'hidden';
                    groupItem.style.borderBottom = 'none';
                    
                    setTimeout(() => {
                        groupItem.remove();
                        
                        // Mise à jour du badge de nouveaux groupes
                        updateNewGroupsBadge();
                        
                        // Afficher notification
                        showNotification(`Groupe de colocataires pour "${propertyName}" rejeté`, 'info');
                    }, 300);
                }, 10);
            }, 200);
        });
    });
    
    // Gestion des boutons de conversation avec un groupe
    chatGroupButtons.forEach(button => {
        button.addEventListener('click', function() {
            const groupId = this.getAttribute('data-group');
            const groupItem = this.closest('.coloc-group-item');
            const groupName = groupItem.querySelector('.group-info h4').textContent;
            const propertyName = groupItem.querySelector('.group-info p strong').textContent;
            
            // Effet visuel
            this.style.transform = 'scale(1.2)';
            setTimeout(() => this.style.transform = '', 300);
            
            // Chercher si une conversation existe déjà pour ce groupe
            const existingConversation = document.querySelector(`.conversation-item[data-group="${groupId}"]`);
            
            if (existingConversation) {
                // Simuler un clic sur cette conversation
                existingConversation.click();
            } else {
                // Créer une nouvelle conversation pour ce groupe
                createGroupConversation(groupId, groupName, propertyName);
                
                // Trouver et cliquer sur la nouvelle conversation
                setTimeout(() => {
                    const newConversation = document.querySelector(`.conversation-item[data-group="${groupId}"]`);
                    if (newConversation) {
                        newConversation.click();
                    }
                }, 300);
            }
        });
    });
    
    // Fonction pour créer une conversation de groupe
    function createGroupConversation(groupId, groupName, propertyName) {
        // Vérifier si la conversation existe déjà
        const existingConversation = document.querySelector(`.conversation-item[data-group="${groupId}"]`);
        if (existingConversation) return;
        
        // Créer un élément de conversation
        const conversationItem = document.createElement('div');
        conversationItem.className = 'conversation-item';
        conversationItem.setAttribute('data-conversation', groupId);
        conversationItem.setAttribute('data-group', groupId);
        
        // Trouver les images d'avatar des membres du groupe
        const groupItem = document.querySelector(`.coloc-group-item .btn-chat[data-group="${groupId}"]`).closest('.coloc-group-item');
        const avatars = Array.from(groupItem.querySelectorAll('.member-avatars img')).map(img => img.src);
        
        // Générer le HTML pour la conversation
        conversationItem.innerHTML = `
            <div class="group-avatar">
                <div class="avatar-stack">
                    ${avatars.map((src, index) => `<img src="${src}" alt="Membre ${index + 1}">`).join('')}
                </div>
            </div>
            <div class="conversation-info">
                <div class="conversation-header">
                    <h3>${groupName} - Groupe</h3>
                    <span class="timestamp">Nouveau</span>
                </div>
                <p class="last-message"><strong>${propertyName}</strong> - Groupe de colocataires approuvé</p>
            </div>
        `;
        
        // Ajouter au début de la liste des conversations
        const conversationsList = document.querySelector('.conversations-list');
        if (conversationsList.firstChild) {
            conversationsList.insertBefore(conversationItem, conversationsList.firstChild);
        } else {
            conversationsList.appendChild(conversationItem);
        }
        
        // Ajouter l'écouteur d'événement pour le clic
        conversationItem.addEventListener('click', function() {
            // Effet de sélection
            this.style.transform = 'scale(0.98)';
            setTimeout(() => this.style.transform = '', 150);
            
            // Retirer la classe active
            conversationItems.forEach(conv => conv.classList.remove('active'));
            
            // Ajouter la classe active à l'élément cliqué
            this.classList.add('active');
            
            // Récupérer les données de la conversation
            const conversationId = this.getAttribute('data-conversation');
            
            // Transition vers la vue de chat
            conversationsView.classList.remove('active');
            chatView.classList.add('active');
            
            // Simuler un délai de chargement
            chatMessages.style.opacity = '0.6';
            setTimeout(() => {
                // Mise à jour du header
                updateChatHeader(groupName, propertyName);
                
                // Préparer les messages spécifiques au groupe
                setupGroupChat(groupId, groupName, propertyName);
                
                chatMessages.style.opacity = '1';
                
                // Auto-focus du champ de texte
                if (chatInput) {
                    setTimeout(() => chatInput.focus(), 300);
                }
            }, 300);
        });
    }
    
    // Mettre à jour l'en-tête de chat pour un groupe
    function updateChatHeader(groupName, propertyName) {
        const chatTitle = document.querySelector('.chat-title h2');
        const chatSubtitle = document.querySelector('.chat-title p');
        
        chatHeader.classList.add('header-update');
        
        chatTitle.textContent = groupName;
        chatSubtitle.textContent = propertyName + ' - Groupe de colocataires';
        
        setTimeout(() => chatHeader.classList.remove('header-update'), 300);
    }
    
    // Configurer le chat pour un groupe spécifique
    function setupGroupChat(groupId, groupName, propertyName) {
        // Vider le conteneur de messages
        chatMessages.innerHTML = '';
        
        // Ajouter un séparateur de date
        const dateElement = document.createElement('div');
        dateElement.className = 'date-separator';
        dateElement.innerHTML = '<span>Aujourd\'hui</span>';
        chatMessages.appendChild(dateElement);
        
        // Message système de bienvenue
        const welcomeMessage = document.createElement('div');
        welcomeMessage.className = 'system-message';
        welcomeMessage.innerHTML = `
            <div class="system-icon">
                <i class="fas fa-info-circle"></i>
            </div>
            <div class="system-content">
                <p>Vous avez approuvé ce groupe de colocataires pour "${propertyName}".</p>
                <p>Vous pouvez maintenant communiquer avec eux pour finaliser les détails.</p>
            </div>
        `;
        chatMessages.appendChild(welcomeMessage);
        
        // Faire défiler vers le bas
        smoothScrollToBottom(chatMessages);
    }
    
    // Fonction pour mettre à jour le badge de nouveaux groupes
    function updateNewGroupsBadge() {
        const newGroups = document.querySelectorAll('.coloc-group-item.new');
        const badge = document.querySelector('.new-badge');
        
        if (badge) {
            if (newGroups.length > 0) {
                badge.textContent = `${newGroups.length} nouveau${newGroups.length > 1 ? 'x' : ''}`;
                badge.style.display = 'block';
            } else {
                badge.style.display = 'none';
            }
        }
    }
    
    // Ajouter des styles pour le message système
    const styleElement = document.createElement('style');
    styleElement.textContent = `
        .system-message {
            display: flex;
            align-items: flex-start;
            gap: 12px;
            margin: 15px auto;
            max-width: 85%;
            padding: 12px 15px;
            background-color: rgba(0, 185, 188, 0.1);
            border-radius: 12px;
            border-left: 3px solid var(--secondary-color);
        }
        
        .system-icon {
            font-size: 18px;
            color: var(--secondary-color);
        }
        
        .system-content p {
            margin: 0 0 5px;
            font-size: 14px;
            color: var(--text-color);
        }
        
        .system-content p:last-child {
            margin-bottom: 0;
        }
    `;
    document.head.appendChild(styleElement);
}); 
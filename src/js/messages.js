// Initialisation de la page de messagerie
document.addEventListener('DOMContentLoaded', function() {
    // Données 
    let activeConversation = null;
    let conversations = []; // Sera rempli avec les données des messages et des nouveaux matchs
    
    // Éléments DOM
    const conversationsView = document.getElementById('conversationsView');
    const chatView = document.getElementById('chatView');
    const chatUserImg = document.getElementById('chatUserImg');
    const chatUserName = document.getElementById('chatUserName');
    const chatUserStatus = document.getElementById('chatUserStatus');
    const chatMessages = document.getElementById('chatMessages');
    const messageInput = document.getElementById('messageInput');
    const sendMessageBtn = document.getElementById('sendMessageBtn');
    const backToConversations = document.getElementById('backToConversations');
    const chatOptionsBtn = document.getElementById('chatOptionsBtn');
    const chatOptionsMenu = document.getElementById('chatOptionsMenu');
    const messagesTabs = document.querySelectorAll('.messages-tab');
    const searchConversation = document.getElementById('searchConversation');
    const bottomNavItems = document.querySelectorAll('.bottom-nav .nav-item');
    
    // Initialisation
    initMessaging();
    
    function initMessaging() {
        // Charger les conversations existantes
        loadConversations();
        
        // Ajouter les écouteurs d'événements
        addEventListeners();
    }
    
    function loadConversations() {
        // Récupérer les conversations depuis le stockage (ou simuler des données)
        conversations = getConversationsData();
        
        // Afficher les conversations
        renderConversations(conversations);
    }
    
    function getConversationsData() {
        // Ici, nous utilisons les données d'exemple du fichier data.js
        // En pratique, ces données viendraient d'une API ou d'une base de données
        
        // Conversations basées sur les messages existants
        const existingConversations = messages.map(msg => {
            return {
                id: msg.profileId,
                name: msg.profileName,
                image: msg.profileImage,
                lastMessage: msg.lastMessage,
                timestamp: msg.timestamp,
                unread: msg.unread,
                isMatch: false,
                isOnline: Math.random() > 0.5,
                conversation: getConversationHistory(msg.profileId)
            };
        });
        
        // Ajouter les nouveaux matchs qui n'ont pas encore de conversations
        const matchesWithoutConversation = getMatchesWithoutConversation();
        
        return [...existingConversations, ...matchesWithoutConversation];
    }
    
    function getMatchesWithoutConversation() {
        // Simuler des matchs récents qui n'ont pas encore de conversation
        // Dans une vraie application, cela viendrait d'une API ou d'une base de données
        const existingMessageIds = messages.map(m => m.profileId);
        const matches = [];
        
        // Chercher parmi les profils ceux qui ne sont pas déjà dans les messages
        profiles.forEach(profile => {
            // Simuler un match récent (comme si l'utilisateur avait liké ce profil et vice versa)
            // Condition aléatoire pour simuler que certains profils sont des matchs
            if (!existingMessageIds.includes(profile.id) && Math.random() > 0.7) {
                matches.push({
                    id: profile.id,
                    name: profile.name,
                    image: profile.images[0],
                    lastMessage: "",
                    timestamp: "Nouveau match",
                    unread: false,
                    isMatch: true,
                    isOnline: Math.random() > 0.5,
                    conversation: []
                });
            }
        });
        
        return matches;
    }
    
    function getConversationHistory(profileId) {
        // Simuler un historique de conversation
        // Dans une vraie application, cela viendrait d'une API ou d'une base de données
        const today = new Date();
        const yesterday = new Date(today);
        yesterday.setDate(yesterday.getDate() - 1);
        
        // Conversation différente selon le profil
        switch(profileId) {
            case 1: // Sophie
                return [
                    {
                        date: yesterday.toLocaleDateString('fr-FR', { day: 'numeric', month: 'long' }),
                        messages: [
                            { text: "Salut ! Ton profil m'intéresse, je cherche aussi un appart dans le 11ème.", sender: "them", time: "14:32" },
                            { text: "Bonjour Sophie ! Ça fait plaisir de te parler. Tu cherches dans quel quartier exactement ?", sender: "me", time: "14:45" },
                            { text: "Je regarde surtout du côté de Bastille ou République. Et toi ?", sender: "them", time: "15:01" }
                        ]
                    },
                    {
                        date: today.toLocaleDateString('fr-FR', { day: 'numeric', month: 'long' }),
                        messages: [
                            { text: "Moi aussi ! J'ai trouvé un super appart vers Bastille, mais il faut qu'on soit 3 colocs. Ça t'intéresserait ?", sender: "me", time: "09:27" }
                        ]
                    }
                ];
            case 3: // Thomas
                return [
                    {
                        date: today.toLocaleDateString('fr-FR', { day: 'numeric', month: 'long' }),
                        messages: [
                            { text: "Salut ! Je viens de voir ton profil, on dirait qu'on cherche dans la même zone !", sender: "them", time: "10:15" },
                            { text: "Bonjour Thomas ! Oui effectivement, tu cherches sur quel quartier ?", sender: "me", time: "10:32" },
                            { text: "Principalement dans le centre, j'ai une visite prévue jeudi pour un T3. Ça te dirait de venir ?", sender: "them", time: "10:45" },
                            { text: "Super ! J'ai une visite prévue jeudi, ça te dirait de venir ?", sender: "them", time: "11:03" }
                        ]
                    }
                ];
            case 5: // Alex
                return [
                    {
                        date: new Date(today.setDate(today.getDate() - 3)).toLocaleDateString('fr-FR', { day: 'numeric', month: 'long' }),
                        messages: [
                            { text: "Salut ! Je vois qu'on a matché pour l'appartement près de la fac. Tu es étudiant en quoi ?", sender: "me", time: "17:21" },
                            { text: "Hello ! Je suis en master de droit. Et toi ?", sender: "them", time: "17:35" },
                            { text: "Je suis en école d'ingénieur. Tu as déjà vécu en coloc avant ?", sender: "me", time: "17:40" }
                        ]
                    },
                    {
                        date: new Date(today.setDate(today.getDate() + 1)).toLocaleDateString('fr-FR', { day: 'numeric', month: 'long' }),
                        messages: [
                            { text: "Oui, pendant 2 ans avec deux autres étudiants. Très bonne expérience !", sender: "them", time: "09:12" },
                            { text: "Cool ! On pourrait essayer de visiter l'appartement ensemble, qu'est-ce que tu en penses ?", sender: "me", time: "10:30" },
                            { text: "Excellente idée ! J'ai contacté le propriétaire, je t'envoie les infos dès qu'il me répond.", sender: "them", time: "11:05" },
                            { text: "Merci pour les infos sur la coloc, j'ai hâte d'en discuter avec les autres !", sender: "them", time: "16:20" }
                        ]
                    }
                ];
            default:
                return [];
        }
    }
    
    function renderConversations(conversationsData) {
        // Récupérer la liste des conversations
        const conversationsListEl = document.querySelector('.conversations-list');
        conversationsListEl.innerHTML = '';
        
        if (conversationsData.length === 0) {
            // Afficher un message si aucune conversation
            conversationsListEl.innerHTML = `
                <div class="empty-conversations">
                    <i class="fas fa-comments"></i>
                    <p>Aucune conversation pour le moment</p>
                    <p>Commencez à matcher avec des colocataires !</p>
                </div>
            `;
            return;
        }
        
        // Créer un élément pour chaque conversation
        conversationsData.forEach(conversation => {
            const conversationEl = document.createElement('div');
            conversationEl.className = `conversation-item${conversation.unread ? ' unread' : ''}`;
            conversationEl.dataset.id = conversation.id;
            
            // Badge pour les nouveaux matchs
            let matchBadge = '';
            if (conversation.isMatch) {
                matchBadge = `
                    <div class="conversation-match-badge">
                        <i class="fas fa-heart"></i> Nouveau match
                    </div>
                `;
            }
            
            // Indicateur en ligne
            let onlineIndicator = '';
            if (conversation.isOnline) {
                onlineIndicator = `<div class="online-indicator"></div>`;
            }
            
            // Badge pour les messages non lus
            let unreadBadge = '';
            if (conversation.unread) {
                unreadBadge = `<div class="conversation-badge">1</div>`;
            }
            
            conversationEl.innerHTML = `
                <div class="conversation-img">
                    <img src="${conversation.image}" alt="${conversation.name}">
                    ${onlineIndicator}
                </div>
                <div class="conversation-info">
                    <div class="conversation-header">
                        <div class="conversation-name">${conversation.name}</div>
                        <div class="conversation-time">${conversation.timestamp}</div>
                    </div>
                    <div class="conversation-preview">
                        <div class="conversation-last-message">${conversation.lastMessage || 'Commencez la conversation...'}</div>
                        ${unreadBadge}
                    </div>
                </div>
                ${matchBadge}
            `;
            
            // Ajouter l'événement de clic pour ouvrir la conversation
            conversationEl.addEventListener('click', () => openConversation(conversation));
            
            // Ajouter à la liste
            conversationsListEl.appendChild(conversationEl);
        });
    }
    
    function openConversation(conversation) {
        // Marquer la conversation comme lue
        conversation.unread = false;
        
        // Mettre à jour l'interface de la conversation
        chatUserImg.src = conversation.image;
        chatUserName.textContent = conversation.name;
        chatUserStatus.textContent = conversation.isOnline ? 'En ligne' : 'Hors ligne';
        
        // Afficher les messages
        renderMessages(conversation.conversation);
        
        // Transition vers la vue de chat
        conversationsView.classList.remove('active');
        chatView.classList.add('active');
        
        // Stocker la conversation active
        activeConversation = conversation;
        
        // Faire défiler vers le bas pour voir les derniers messages
        scrollToBottom();
        
        // Mettre le focus sur l'input de message
        setTimeout(() => messageInput.focus(), 300);
    }
    
    function renderMessages(conversationHistory) {
        // Vider la zone de messages
        chatMessages.innerHTML = '';
        
        if (!conversationHistory || conversationHistory.length === 0) {
            // Aucun message encore, afficher un message d'introduction
            const emptyMsg = document.createElement('div');
            emptyMsg.className = 'empty-chat-message';
            emptyMsg.innerHTML = `
                <div class="empty-chat-icon">
                    <i class="fas fa-comments"></i>
                </div>
                <p>Commencez la conversation !</p>
                <p>Présentez-vous et discutez de vos attentes en colocation.</p>
            `;
            chatMessages.appendChild(emptyMsg);
            return;
        }
        
        // Afficher chaque groupe de messages par date
        conversationHistory.forEach(dayGroup => {
            // Ajouter le séparateur de date
            const dateEl = document.createElement('div');
            dateEl.className = 'date-separator';
            dateEl.innerHTML = `<span>${dayGroup.date}</span>`;
            chatMessages.appendChild(dateEl);
            
            // Ajouter les messages de cette journée
            dayGroup.messages.forEach(message => {
                const messageEl = document.createElement('div');
                messageEl.className = `message-container ${message.sender === 'me' ? 'sent' : 'received'}`;
                
                messageEl.innerHTML = `
                    <div class="message-bubble">
                        <p>${message.text}</p>
                    </div>
                    <div class="message-time">${message.time}</div>
                `;
                
                chatMessages.appendChild(messageEl);
            });
        });
    }
    
    function sendMessage() {
        const messageText = messageInput.value.trim();
        if (!messageText) return;
        
        // Animation du bouton d'envoi
        sendMessageBtn.classList.add('sending');
        setTimeout(() => sendMessageBtn.classList.remove('sending'), 300);
        
        if (!activeConversation) return;
        
        // Obtenir la date du jour au format local
        const today = new Date();
        const dateStr = today.toLocaleDateString('fr-FR', { day: 'numeric', month: 'long' });
        
        // Obtenir l'heure actuelle
        const timeStr = today.toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' });
        
        // Créer un nouvel objet de message
        const newMessage = {
            text: messageText,
            sender: 'me',
            time: timeStr
        };
        
        // Vérifier si une conversation pour aujourd'hui existe déjà
        let todayConversation = activeConversation.conversation.find(c => c.date === dateStr);
        
        if (!todayConversation) {
            // Créer un nouveau groupe pour aujourd'hui
            todayConversation = {
                date: dateStr,
                messages: []
            };
            activeConversation.conversation.push(todayConversation);
        }
        
        // Ajouter le message au groupe d'aujourd'hui
        todayConversation.messages.push(newMessage);
        
        // Mettre à jour le dernier message dans la liste des conversations
        activeConversation.lastMessage = `Vous: ${messageText}`;
        activeConversation.timestamp = 'À l\'instant';
        
        // Réafficher les messages
        renderMessages(activeConversation.conversation);
        
        // Vider l'input
        messageInput.value = '';
        messageInput.style.height = 'auto';
        
        // Faire défiler vers le bas
        scrollToBottom();
        
        // Simuler une réponse après un délai
        setTimeout(simulateResponse, 1000 + Math.random() * 2000);
    }
    
    function simulateResponse() {
        if (!activeConversation) return;
        
        // Simuler l'indicateur de frappe
        const typingIndicator = document.createElement('div');
        typingIndicator.className = 'message-container received typing-indicator';
        typingIndicator.innerHTML = `
            <div class="message-bubble">
                <span class="dot"></span>
                <span class="dot"></span>
                <span class="dot"></span>
            </div>
        `;
        chatMessages.appendChild(typingIndicator);
        scrollToBottom();
        
        // Durée aléatoire de "frappe"
        const typingDuration = 1000 + Math.random() * 2000;
        
        setTimeout(() => {
            // Supprimer l'indicateur de frappe
            typingIndicator.remove();
            
            // Obtenir la date du jour au format local
            const today = new Date();
            const dateStr = today.toLocaleDateString('fr-FR', { day: 'numeric', month: 'long' });
            
            // Obtenir l'heure actuelle
            const timeStr = today.toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' });
            
            // Générer une réponse aléatoire
            const responses = [
                "C'est noté, merci !",
                "Super, c'est une bonne idée !",
                "D'accord, on peut en discuter plus en détail.",
                "Ça me semble bien. Quand est-ce qu'on pourrait se voir pour en parler ?",
                "Je comprends, merci de me tenir au courant.",
                "Parfait ! Je te recontacte dès que j'en sais plus.",
                "Ça me convient, on fait comme ça.",
                "Génial ! J'ai hâte qu'on avance sur ce projet de coloc."
            ];
            const responseText = responses[Math.floor(Math.random() * responses.length)];
            
            // Créer un nouvel objet de message
            const newMessage = {
                text: responseText,
                sender: 'them',
                time: timeStr
            };
            
            // Vérifier si une conversation pour aujourd'hui existe déjà
            let todayConversation = activeConversation.conversation.find(c => c.date === dateStr);
            
            if (!todayConversation) {
                // Créer un nouveau groupe pour aujourd'hui
                todayConversation = {
                    date: dateStr,
                    messages: []
                };
                activeConversation.conversation.push(todayConversation);
            }
            
            // Ajouter le message au groupe d'aujourd'hui
            todayConversation.messages.push(newMessage);
            
            // Mettre à jour le dernier message dans la liste des conversations
            activeConversation.lastMessage = `${activeConversation.name}: ${responseText}`;
            activeConversation.timestamp = 'À l\'instant';
            
            // Réafficher les messages
            renderMessages(activeConversation.conversation);
            
            // Faire défiler vers le bas
            scrollToBottom();
            
            // Ajouter une classe d'animation pour mettre en évidence le nouveau message
            const allMessages = document.querySelectorAll('.message-container');
            if (allMessages.length > 0) {
                const lastMessage = allMessages[allMessages.length - 1];
                lastMessage.classList.add('highlight');
            }
        }, typingDuration);
    }
    
    function scrollToBottom() {
        chatMessages.scrollTop = chatMessages.scrollHeight;
    }
    
    function filterConversations(tab) {
        let filteredConversations = [];
        
        switch(tab) {
            case 'all':
                filteredConversations = conversations;
                break;
            case 'unread':
                filteredConversations = conversations.filter(conv => conv.unread);
                break;
            case 'matches':
                filteredConversations = conversations.filter(conv => conv.isMatch);
                break;
            default:
                filteredConversations = conversations;
        }
        
        renderConversations(filteredConversations);
    }
    
    function searchInConversations() {
        const searchTerm = searchConversation.value.toLowerCase().trim();
        
        if (!searchTerm) {
            // Si la recherche est vide, afficher toutes les conversations
            renderConversations(conversations);
            return;
        }
        
        // Filtrer les conversations qui contiennent le terme de recherche
        const filteredConversations = conversations.filter(conv => {
            return (
                conv.name.toLowerCase().includes(searchTerm) || 
                (conv.lastMessage && conv.lastMessage.toLowerCase().includes(searchTerm))
            );
        });
        
        renderConversations(filteredConversations);
    }
    
    function addEventListeners() {
        // Bouton retour aux conversations
        backToConversations.addEventListener('click', () => {
            // Effet visuel
            backToConversations.classList.add('btn-click');
            setTimeout(() => backToConversations.classList.remove('btn-click'), 300);
            
            // Transition vers la vue des conversations
            chatView.classList.remove('active');
            conversationsView.classList.add('active');
            
            // Mettre à jour la liste des conversations pour refléter les nouveaux messages
            renderConversations(conversations);
        });
        
        // Onglets de filtrage
        messagesTabs.forEach(tab => {
            tab.addEventListener('click', function() {
                // Retirer la classe active
                messagesTabs.forEach(t => t.classList.remove('active'));
                
                // Ajouter la classe active
                this.classList.add('active');
                
                // Filtrer les conversations
                filterConversations(this.getAttribute('data-tab'));
            });
        });
        
        // Recherche de conversations
        searchConversation.addEventListener('input', searchInConversations);
        
        // Envoi de message
        sendMessageBtn.addEventListener('click', sendMessage);
        
        // Envoi par touche Entrée
        messageInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault();
                sendMessage();
            }
        });
        
        // Ajuster dynamiquement la hauteur du textarea
        messageInput.addEventListener('input', function() {
            this.style.height = '0';
            const newHeight = Math.min(this.scrollHeight, 120);
            this.style.height = newHeight + 'px';
        });
        
        // Menu d'options
        chatOptionsBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            chatOptionsMenu.classList.toggle('visible');
            chatOptionsMenu.classList.remove('hidden');
            
            // Fermer le menu au clic à l'extérieur
            function closeMenu(event) {
                if (!chatOptionsMenu.contains(event.target) && event.target !== chatOptionsBtn) {
                    chatOptionsMenu.classList.remove('visible');
                    setTimeout(() => chatOptionsMenu.classList.add('hidden'), 300);
                    document.removeEventListener('click', closeMenu);
                }
            }
            
            document.addEventListener('click', closeMenu);
        });
        
        // Navigation du bas
        bottomNavItems.forEach(item => {
            item.addEventListener('click', function() {
                if (this.classList.contains('active')) return;
                
                const tab = this.getAttribute('data-tab');
                
                switch(tab) {
                    case 'swipe':
                        window.location.href = 'index.html';
                        break;
                    case 'messages':
                        window.location.href = 'messages.html';
                        break;
                    case 'favorites':
                        window.location.href = 'favorites.html';
                        break;
                    case 'profile':
                        window.location.href = 'profile.html';
                        break;
                }
            });
        });
    }
    
    // Ajouter des styles pour l'indicateur de frappe
    const styleElement = document.createElement('style');
    styleElement.textContent = `
        .typing-indicator {
            display: flex;
            align-items: center;
        }
        
        .typing-indicator .message-bubble {
            display: flex;
            align-items: center;
            gap: 4px;
        }
        
        .typing-indicator .dot {
            width: 8px;
            height: 8px;
            border-radius: 50%;
            background-color: var(--light-text);
            opacity: 0.7;
            animation: typingDot 1.4s infinite;
        }
        
        .typing-indicator .dot:nth-child(2) {
            animation-delay: 0.2s;
        }
        
        .typing-indicator .dot:nth-child(3) {
            animation-delay: 0.4s;
        }
        
        @keyframes typingDot {
            0%, 100% { transform: translateY(0); }
            50% { transform: translateY(-5px); }
        }
        
        .empty-chat-message {
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            padding: 40px 20px;
            text-align: center;
        }
        
        .empty-chat-icon {
            font-size: 40px;
            color: var(--light-text);
            margin-bottom: 15px;
            opacity: 0.5;
        }
        
        .empty-chat-message p {
            color: var(--light-text);
            margin: 5px 0;
            font-size: 14px;
        }
        
        .btn-click {
            transform: scale(0.95);
            transition: transform 0.3s;
        }
        
        .sending {
            transform: scale(0.8);
            opacity: 0.8;
            transition: all 0.3s;
        }
    `;
    document.head.appendChild(styleElement);
}); 
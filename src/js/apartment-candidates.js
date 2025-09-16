document.addEventListener('DOMContentLoaded', function() {
    // Sélectionner les éléments
    const backBtn = document.getElementById('backBtn');
    const filterBtns = document.querySelectorAll('.filter-btn');
    const sortSelect = document.getElementById('sortSelect');
    const candidateCards = document.querySelectorAll('.candidate-card');
    const rejectBtns = document.querySelectorAll('.reject-btn');
    const messageBtns = document.querySelectorAll('.message-btn');
    const profileBtns = document.querySelectorAll('.profile-btn');
    const notificationBtn = document.getElementById('notificationsBtn');
    const navItems = document.querySelectorAll('.nav-item');
    
    // Bouton retour
    if (backBtn) {
        backBtn.addEventListener('click', function() {
            // Retour à la page propriétaire
            window.location.href = 'owner-dashboard.html';
        });
    }
    
    // Filtres
    filterBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            const filter = this.getAttribute('data-filter');
            
            // Changer la classe active
            filterBtns.forEach(b => b.classList.remove('active'));
            this.classList.add('active');
            
            // Filtrer les cartes
            filterCandidates(filter);
        });
    });
    
    // Tri
    if (sortSelect) {
        sortSelect.addEventListener('change', function() {
            const sortBy = this.value;
            sortCandidates(sortBy);
        });
    }
    
    // Boutons d'action sur les candidats
    rejectBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            const card = this.closest('.candidate-card');
            const candidateName = card.querySelector('.candidate-headline h3').textContent;
            
            if (confirm(`Êtes-vous sûr de vouloir décliner la candidature de ${candidateName} ?`)) {
                // Animation de disparition
                card.style.opacity = '0';
                card.style.transform = 'translateX(-50px)';
                
                setTimeout(() => {
                    card.style.height = '0';
                    card.style.margin = '0';
                    card.style.padding = '0';
                    card.style.overflow = 'hidden';
                    
                    setTimeout(() => {
                        card.remove();
                        updateCandidateCounts();
                        
                        // Afficher un message de confirmation
                        showToast(`La candidature de ${candidateName} a été déclinée.`);
                    }, 300);
                }, 300);
            }
        });
    });
    
    messageBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            const card = this.closest('.candidate-card');
            const candidateName = card.querySelector('.candidate-headline h3').textContent;
            
            // Rediriger vers la messagerie
            window.location.href = `messages.html?candidate=${encodeURIComponent(candidateName)}`;
        });
    });
    
    profileBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            const card = this.closest('.candidate-card');
            const candidateName = card.querySelector('.candidate-headline h3').textContent;
            
            // Simuler un chargement
            this.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Chargement...';
            this.disabled = true;
            
            // Rediriger vers le profil après un petit délai (pour l'effet)
            setTimeout(() => {
                window.location.href = `candidate-profile.html?name=${encodeURIComponent(candidateName)}`;
            }, 500);
        });
    });
    
    // Navigation du bas
    navItems.forEach(item => {
        item.addEventListener('click', function() {
            // Retirer la classe active
            navItems.forEach(nav => nav.classList.remove('active'));
            
            // Ajouter la classe active à l'élément cliqué
            this.classList.add('active');
            
            // Navigation
            const tab = this.getAttribute('data-tab');
            if (tab === 'dashboard') {
                window.location.href = 'owner-dashboard.html';
            } else if (tab === 'apartments') {
                window.location.href = 'owner-apartments.html';
            } else if (tab === 'messages') {
                window.location.href = 'messages.html';
            } else if (tab === 'profile') {
                window.location.href = 'profile.html';
            }
        });
    });
    
    // Notification button
    if (notificationBtn) {
        notificationBtn.addEventListener('click', function() {
            showNotifications();
        });
    }
    
    // Fonction pour filtrer les candidats
    function filterCandidates(filter) {
        candidateCards.forEach(card => {
            const status = card.getAttribute('data-status');
            
            if (filter === 'all' || filter === status) {
                card.style.display = 'flex';
                // Animation d'apparition
                setTimeout(() => {
                    card.style.opacity = '1';
                    card.style.transform = 'translateY(0)';
                }, 50);
            } else {
                card.style.opacity = '0';
                card.style.transform = 'translateY(10px)';
                setTimeout(() => {
                    card.style.display = 'none';
                }, 300);
            }
        });
    }
    
    // Fonction pour trier les candidats
    function sortCandidates(sortBy) {
        const candidatesGrid = document.querySelector('.candidates-grid');
        const cardsArray = Array.from(candidateCards);
        
        cardsArray.sort((a, b) => {
            if (sortBy === 'compatibility') {
                // Trier par compatibilité (plus haute en premier)
                const scoreA = parseInt(a.querySelector('.score-circle span').textContent);
                const scoreB = parseInt(b.querySelector('.score-circle span').textContent);
                return scoreB - scoreA;
            } else if (sortBy === 'date') {
                // Supposons que les plus récents sont en haut (nouveaux avant en attente)
                const statusA = a.getAttribute('data-status');
                const statusB = b.getAttribute('data-status');
                // Priorité: 'new' > 'pending' > 'contacted'
                const priorities = { 'new': 3, 'pending': 2, 'contacted': 1 };
                return priorities[statusB] - priorities[statusA];
            } else if (sortBy === 'age') {
                // Extraire l'âge du nom (ex: "Sophie, 24 ans")
                const ageA = parseInt(a.querySelector('.candidate-headline h3').textContent.match(/\d+/)[0]);
                const ageB = parseInt(b.querySelector('.candidate-headline h3').textContent.match(/\d+/)[0]);
                return ageA - ageB; // Plus jeunes en premier
            }
            return 0;
        });
        
        // Animation de tri
        cardsArray.forEach(card => {
            card.style.opacity = '0';
            card.style.transform = 'translateY(10px)';
        });
        
        // Réorganiser les éléments dans le DOM après l'animation
        setTimeout(() => {
            // Vider la grille
            candidatesGrid.innerHTML = '';
            
            // Ajouter les cartes dans le nouvel ordre
            cardsArray.forEach((card, index) => {
                candidatesGrid.appendChild(card);
                
                // Animation d'apparition séquentielle
                setTimeout(() => {
                    card.style.opacity = '1';
                    card.style.transform = 'translateY(0)';
                }, 50 * index);
            });
        }, 300);
    }
    
    // Fonction pour mettre à jour les compteurs de candidats
    function updateCandidateCounts() {
        const allCandidates = document.querySelectorAll('.candidate-card').length;
        const newCandidates = document.querySelectorAll('.candidate-card[data-status="new"]').length;
        const pendingCandidates = document.querySelectorAll('.candidate-card[data-status="pending"]').length;
        const contactedCandidates = document.querySelectorAll('.candidate-card[data-status="contacted"]').length;
        
        // Mettre à jour les compteurs dans les boutons de filtre
        document.querySelector('.filter-btn[data-filter="all"]').textContent = `Tous (${allCandidates})`;
        document.querySelector('.filter-btn[data-filter="new"]').textContent = `Nouveaux (${newCandidates})`;
        document.querySelector('.filter-btn[data-filter="pending"]').textContent = `En attente (${pendingCandidates})`;
        document.querySelector('.filter-btn[data-filter="contacted"]').textContent = `Contactés (${contactedCandidates})`;
        
        // Mettre à jour les infos rapides en haut
        document.querySelector('.apartment-quick-info span:first-child').innerHTML = 
            `<i class="fas fa-user-check"></i> ${allCandidates} candidat${allCandidates > 1 ? 's' : ''} au total`;
        document.querySelector('.apartment-quick-info span:last-child').innerHTML = 
            `<i class="fas fa-calendar-alt"></i> ${newCandidates} nouveau${newCandidates > 1 ? 'x' : ''} cette semaine`;
        
        // Afficher un message si aucun candidat
        if (allCandidates === 0) {
            const candidatesGrid = document.querySelector('.candidates-grid');
            candidatesGrid.innerHTML = `
                <div class="no-candidates">
                    <div class="no-candidates-icon">
                        <i class="fas fa-user-slash"></i>
                    </div>
                    <h3>Aucun candidat pour le moment</h3>
                    <p>Votre appartement n'a pas encore reçu de candidatures.</p>
                    <a href="owner-dashboard.html" class="btn-primary">
                        <i class="fas fa-arrow-left"></i> Retour au tableau de bord
                    </a>
                </div>
            `;
            
            // Ajouter du style à ce message
            const noCandidates = document.querySelector('.no-candidates');
            noCandidates.style.textAlign = 'center';
            noCandidates.style.padding = '50px 20px';
            noCandidates.style.backgroundColor = 'white';
            noCandidates.style.borderRadius = '12px';
            noCandidates.style.boxShadow = '0 6px 16px rgba(0, 0, 0, 0.08)';
            
            const noIcon = document.querySelector('.no-candidates-icon');
            noIcon.style.fontSize = '50px';
            noIcon.style.color = 'var(--light-text)';
            noIcon.style.marginBottom = '15px';
            
            const noTitle = document.querySelector('.no-candidates h3');
            noTitle.style.marginBottom = '10px';
            noTitle.style.fontSize = '20px';
            
            const noText = document.querySelector('.no-candidates p');
            noText.style.marginBottom = '20px';
            noText.style.color = 'var(--light-text)';
            
            const noBtn = document.querySelector('.no-candidates .btn-primary');
            noBtn.style.display = 'inline-flex';
            noBtn.style.alignItems = 'center';
            noBtn.style.padding = '10px 20px';
            noBtn.style.gap = '8px';
        }
    }
    
    // Afficher un toast de notification
    function showToast(message) {
        // Créer le toast
        const toast = document.createElement('div');
        toast.className = 'toast-notification';
        toast.innerHTML = `
            <div class="toast-icon">
                <i class="fas fa-check-circle"></i>
            </div>
            <div class="toast-message">${message}</div>
        `;
        
        // Appliquer du style au toast
        toast.style.position = 'fixed';
        toast.style.bottom = '20px';
        toast.style.left = '50%';
        toast.style.transform = 'translateX(-50%)';
        toast.style.backgroundColor = 'white';
        toast.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.15)';
        toast.style.borderRadius = '10px';
        toast.style.padding = '12px 20px';
        toast.style.display = 'flex';
        toast.style.alignItems = 'center';
        toast.style.gap = '10px';
        toast.style.zIndex = '2000';
        toast.style.opacity = '0';
        toast.style.transition = 'opacity 0.3s ease, transform 0.3s ease';
        toast.style.transform = 'translateX(-50%) translateY(20px)';
        
        const icon = toast.querySelector('.toast-icon');
        icon.style.color = '#34C759';
        icon.style.fontSize = '20px';
        
        const message_el = toast.querySelector('.toast-message');
        message_el.style.fontSize = '14px';
        message_el.style.fontWeight = '500';
        
        // Ajouter au DOM
        document.body.appendChild(toast);
        
        // Animer l'apparition
        setTimeout(() => {
            toast.style.opacity = '1';
            toast.style.transform = 'translateX(-50%) translateY(0)';
        }, 10);
        
        // Disparaître après 3 secondes
        setTimeout(() => {
            toast.style.opacity = '0';
            toast.style.transform = 'translateX(-50%) translateY(20px)';
            
            setTimeout(() => {
                toast.remove();
            }, 300);
        }, 3000);
    }
    
    // Fonction pour afficher les notifications
    function showNotifications() {
        // Créer la fenêtre de notifications
        const notifModal = document.createElement('div');
        notifModal.className = 'notifications-modal';
        notifModal.innerHTML = `
            <div class="notifications-content">
                <div class="notifications-header">
                    <h3>Notifications</h3>
                    <button class="close-btn" id="closeNotifBtn">
                        <i class="fas fa-times"></i>
                    </button>
                </div>
                <div class="notifications-list">
                    <div class="notification-item unread">
                        <div class="notification-icon">
                            <i class="fas fa-user-plus"></i>
                        </div>
                        <div class="notification-content">
                            <p><strong>Nouvelle candidature!</strong> Sophie a liké votre appartement</p>
                            <span class="notification-time">Il y a 2 heures</span>
                        </div>
                    </div>
                    <div class="notification-item unread">
                        <div class="notification-icon">
                            <i class="fas fa-comment"></i>
                        </div>
                        <div class="notification-content">
                            <p><strong>Nouveau message</strong> de Thomas</p>
                            <span class="notification-time">Il y a 1 jour</span>
                        </div>
                    </div>
                    <div class="notification-item">
                        <div class="notification-icon">
                            <i class="fas fa-star"></i>
                        </div>
                        <div class="notification-content">
                            <p><strong>Julie</strong> a ajouté votre appartement en favori</p>
                            <span class="notification-time">Il y a 3 jours</span>
                        </div>
                    </div>
                </div>
                <div class="notifications-footer">
                    <button class="btn-secondary" id="markAllReadBtn">
                        Tout marquer comme lu
                    </button>
                </div>
            </div>
        `;
        
        // Styles pour la modal
        notifModal.style.position = 'fixed';
        notifModal.style.top = '0';
        notifModal.style.left = '0';
        notifModal.style.width = '100%';
        notifModal.style.height = '100%';
        notifModal.style.backgroundColor = 'rgba(0, 0, 0, 0.5)';
        notifModal.style.zIndex = '1000';
        notifModal.style.display = 'flex';
        notifModal.style.justifyContent = 'center';
        notifModal.style.alignItems = 'flex-start';
        notifModal.style.paddingTop = '80px';
        
        const notifContent = notifModal.querySelector('.notifications-content');
        notifContent.style.backgroundColor = 'white';
        notifContent.style.borderRadius = '12px';
        notifContent.style.width = '350px';
        notifContent.style.maxWidth = '90%';
        notifContent.style.maxHeight = '500px';
        notifContent.style.overflow = 'hidden';
        notifContent.style.display = 'flex';
        notifContent.style.flexDirection = 'column';
        notifContent.style.boxShadow = '0 5px 15px rgba(0, 0, 0, 0.1)';
        
        const notifHeader = notifModal.querySelector('.notifications-header');
        notifHeader.style.display = 'flex';
        notifHeader.style.justifyContent = 'space-between';
        notifHeader.style.alignItems = 'center';
        notifHeader.style.padding = '15px 20px';
        notifHeader.style.borderBottom = '1px solid #eee';
        
        const notifList = notifModal.querySelector('.notifications-list');
        notifList.style.padding = '10px 0';
        notifList.style.overflow = 'auto';
        notifList.style.maxHeight = '350px';
        
        const notifItems = notifModal.querySelectorAll('.notification-item');
        notifItems.forEach(item => {
            item.style.padding = '12px 20px';
            item.style.display = 'flex';
            item.style.alignItems = 'center';
            item.style.gap = '15px';
            item.style.cursor = 'pointer';
            item.style.transition = 'background-color 0.2s ease';
            
            if (item.classList.contains('unread')) {
                item.style.backgroundColor = '#f8f9fa';
                
                const dot = document.createElement('div');
                dot.style.width = '8px';
                dot.style.height = '8px';
                dot.style.borderRadius = '50%';
                dot.style.backgroundColor = '#FF385C';
                dot.style.position = 'absolute';
                dot.style.right = '15px';
                dot.style.top = '15px';
                
                item.style.position = 'relative';
                item.appendChild(dot);
            }
            
            item.addEventListener('mouseenter', function() {
                this.style.backgroundColor = '#f0f0f0';
            });
            
            item.addEventListener('mouseleave', function() {
                if (this.classList.contains('unread')) {
                    this.style.backgroundColor = '#f8f9fa';
                } else {
                    this.style.backgroundColor = '';
                }
            });
        });
        
        const notifIcon = notifModal.querySelectorAll('.notification-icon');
        notifIcon.forEach(icon => {
            icon.style.width = '40px';
            icon.style.height = '40px';
            icon.style.borderRadius = '50%';
            icon.style.display = 'flex';
            icon.style.alignItems = 'center';
            icon.style.justifyContent = 'center';
            icon.style.backgroundColor = '#f8f9fa';
            icon.style.color = '#FF385C';
            icon.style.fontSize = '16px';
        });
        
        const notifTime = notifModal.querySelectorAll('.notification-time');
        notifTime.forEach(time => {
            time.style.fontSize = '12px';
            time.style.color = '#666';
            time.style.display = 'block';
            time.style.marginTop = '3px';
        });
        
        const notifFooter = notifModal.querySelector('.notifications-footer');
        notifFooter.style.padding = '15px 20px';
        notifFooter.style.borderTop = '1px solid #eee';
        notifFooter.style.display = 'flex';
        notifFooter.style.justifyContent = 'center';
        
        // Ajouter au DOM
        document.body.appendChild(notifModal);
        
        // Gestion des événements
        const closeBtn = document.getElementById('closeNotifBtn');
        closeBtn.addEventListener('click', function() {
            notifModal.remove();
        });
        
        notifModal.addEventListener('click', function(e) {
            if (e.target === notifModal) {
                notifModal.remove();
            }
        });
        
        const markAllReadBtn = document.getElementById('markAllReadBtn');
        markAllReadBtn.addEventListener('click', function() {
            const unreadItems = notifModal.querySelectorAll('.notification-item.unread');
            unreadItems.forEach(item => {
                item.classList.remove('unread');
                item.style.backgroundColor = '';
                const dot = item.querySelector('div[style*="border-radius: 50%"]');
                if (dot) dot.remove();
            });
            
            // Mettre à jour le badge
            const badge = document.querySelector('.notifications-btn .badge');
            badge.style.display = 'none';
        });
    }
}); 
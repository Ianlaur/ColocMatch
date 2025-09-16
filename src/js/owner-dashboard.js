// Initialisation du tableau de bord propriétaire
document.addEventListener('DOMContentLoaded', function() {
    // Sélection des éléments
    const navItems = document.querySelectorAll('.nav-item');
    const notificationBtn = document.getElementById('notificationBtn');
    const editBtns = document.querySelectorAll('.edit-btn');
    const activateBtn = document.querySelector('.activate-btn');
    const viewCandidatesBtn = document.querySelector('.view-candidates-btn');
    const refreshTipsBtn = document.querySelector('.refresh-tips-btn');
    
    // Mettre à jour la date du jour
    updateDate();
    
    // Navigation du bas
    navItems.forEach(item => {
        item.addEventListener('click', function() {
            // Retirer la classe active
            navItems.forEach(nav => nav.classList.remove('active'));
            
            // Ajouter la classe active à l'élément cliqué
            this.classList.add('active');
            
            // Navigation vers les différentes pages
            const tab = this.getAttribute('data-tab');
            if (tab === 'dashboard') {
                window.location.href = 'owner-dashboard.html';
            } else if (tab === 'messages') {
                window.location.href = 'messages-proprietaire.html';
            } else if (tab === 'profile') {
                window.location.href = 'owner-profile.html';
            }
            // Si tab est dashboard, on reste sur la page actuelle
        });
    });
    
    // Bouton de notification
    if (notificationBtn) {
        notificationBtn.addEventListener('click', function() {
            showNotifications();
        });
    }
    
    // Boutons d'édition d'appartement
    editBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            const apartmentCard = this.closest('.apartment-card');
            const apartmentName = apartmentCard.querySelector('h3').textContent;
            
            console.log(`Édition de l'appartement: ${apartmentName}`);
            // Dans une version réelle, on redirigerait vers une page d'édition
            window.location.href = 'add-apartment.html?edit=true';
        });
    });
    
    // Bouton d'activation d'appartement
    if (activateBtn) {
        activateBtn.addEventListener('click', function() {
            const apartmentCard = this.closest('.apartment-card');
            const statusBadge = apartmentCard.querySelector('.apartment-status');
            
            if (statusBadge.classList.contains('inactive')) {
                // Activer l'appartement
                statusBadge.textContent = 'Actif';
                statusBadge.classList.remove('inactive');
                statusBadge.classList.add('active');
                this.innerHTML = '<i class="fas fa-power-off"></i> Désactiver';
                
                // Effet visuel de confirmation
                apartmentCard.style.transition = 'box-shadow 0.3s ease';
                apartmentCard.style.boxShadow = '0 0 0 3px rgba(52, 199, 89, 0.5)';
                setTimeout(() => {
                    apartmentCard.style.boxShadow = '';
                }, 1000);
                
                console.log("Appartement activé avec succès");
            } else {
                // Désactiver l'appartement
                statusBadge.textContent = 'Inactif';
                statusBadge.classList.remove('active');
                statusBadge.classList.add('inactive');
                this.innerHTML = '<i class="fas fa-power-off"></i> Activer';
                
                console.log("Appartement désactivé");
            }
        });
    }
    
    // Bouton de visualisation des candidats
    if (viewCandidatesBtn) {
        viewCandidatesBtn.addEventListener('click', function() {
            const apartmentName = this.closest('.apartment-card').querySelector('h3').textContent;
            console.log(`Affichage des candidats pour: ${apartmentName}`);
            
            // Redirection vers une page de candidats (à implémenter)
            window.location.href = 'apartment-candidates.html';
        });
    }
    
    // Bouton d'actualisation des conseils
    if (refreshTipsBtn) {
        refreshTipsBtn.addEventListener('click', function() {
            console.log("Actualisation des conseils");
            
            const tipsContainer = document.querySelector('.tips-container');
            if (tipsContainer) {
                // Effet de chargement
                tipsContainer.style.opacity = '0.5';
                this.querySelector('i').style.animation = 'rotate 1s linear infinite';
                
                // Simuler un délai de chargement
                setTimeout(() => {
                    // Nouveaux conseils à afficher
                    const newTips = [
                        {
                            icon: 'camera',
                            title: 'Photos qui convertissent',
                            content: 'Incluez des photos de toutes les pièces, y compris les espaces communs et la salle de bain pour un taux de réponse plus élevé.',
                            link: 'Voir les exemples'
                        },
                        {
                            icon: 'comments',
                            title: 'Répondez rapidement',
                            content: 'Les propriétaires qui répondent dans les 2 heures ont 3 fois plus de chance de conclure une colocation.',
                            link: 'Activer les notifications'
                        },
                        {
                            icon: 'check-circle',
                            title: 'Vérifiez vos locataires',
                            content: 'Utilisez notre service de vérification pour vous assurer de la fiabilité de vos futurs colocataires.',
                            link: 'Découvrir le service'
                        }
                    ];
                    
                    // Mettre à jour le contenu
                    const tipCards = document.querySelectorAll('.tip-card');
                    tipCards.forEach((card, index) => {
                        if (index < newTips.length) {
                            const iconEl = card.querySelector('.tip-icon i');
                            const titleEl = card.querySelector('.tip-content h3');
                            const contentEl = card.querySelector('.tip-content p');
                            const linkEl = card.querySelector('.tip-content a');
                            
                            // Animer la transition
                            card.style.transform = 'translateY(10px)';
                            card.style.opacity = '0';
                            
                            setTimeout(() => {
                                // Mettre à jour le contenu
                                iconEl.className = `fas fa-${newTips[index].icon}`;
                                titleEl.textContent = newTips[index].title;
                                contentEl.textContent = newTips[index].content;
                                linkEl.innerHTML = `${newTips[index].link} <i class="fas fa-arrow-right"></i>`;
                                
                                // Animer l'apparition
                                card.style.transform = '';
                                card.style.opacity = '1';
                            }, 150 * index);
                        }
                    });
                    
                    // Restaurer l'apparence
                    tipsContainer.style.opacity = '1';
                    this.querySelector('i').style.animation = '';
                }, 800);
            }
        });
    }
    
    // Animations au survol des cartes d'appartement
    const apartmentCards = document.querySelectorAll('.apartment-card');
    apartmentCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            const statsItems = this.querySelectorAll('.apartment-stats .stat');
            
            // Animation des statistiques
            statsItems.forEach((item, index) => {
                setTimeout(() => {
                    item.style.transition = 'transform 0.3s ease, opacity 0.3s ease';
                    item.style.transform = 'translateY(-5px)';
                    item.style.opacity = '1';
                }, index * 50);
            });
        });
        
        card.addEventListener('mouseleave', function() {
            const statsItems = this.querySelectorAll('.apartment-stats .stat');
            
            statsItems.forEach(item => {
                item.style.transform = '';
                item.style.opacity = '';
            });
        });
    });
    
    // Fonction pour mettre à jour la date
    function updateDate() {
        const dateElement = document.querySelector('.date');
        if (dateElement) {
            const now = new Date();
            
            const options = { day: 'numeric', month: 'long', year: 'numeric' };
            const formattedDate = now.toLocaleDateString('fr-FR', options);
            
            dateElement.textContent = formattedDate;
        }
    }
    
    // Fonction pour afficher les notifications (à implémenter)
    function showNotifications() {
        console.log('Affichage des notifications');
        
        // Créer dynamiquement une fenêtre de notifications
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
                            <i class="fas fa-heart"></i>
                        </div>
                        <div class="notification-content">
                            <p><strong>Sophie</strong> a liké votre appartement</p>
                            <span class="notification-time">Il y a 2 heures</span>
                        </div>
                    </div>
                    <div class="notification-item unread">
                        <div class="notification-icon">
                            <i class="fas fa-comment"></i>
                        </div>
                        <div class="notification-content">
                            <p><strong>Thomas</strong> vous a envoyé un message</p>
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
        
        // Styles pour la modal de notifications
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
        
        // Fermer la modal
        const closeBtn = document.getElementById('closeNotifBtn');
        closeBtn.addEventListener('click', function() {
            notifModal.remove();
        });
        
        // Fermer en cliquant en dehors
        notifModal.addEventListener('click', function(e) {
            if (e.target === notifModal) {
                notifModal.remove();
            }
        });
        
        // Marquer toutes les notifications comme lues
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
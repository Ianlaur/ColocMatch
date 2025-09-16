document.addEventListener('DOMContentLoaded', function() {
    // Récupérer l'identifiant du candidat depuis l'URL
    const urlParams = new URLSearchParams(window.location.search);
    const candidateName = urlParams.get('name');
    
    // Éléments du DOM
    const backBtn = document.getElementById('backBtn');
    const rejectBtn = document.querySelector('.reject-btn');
    const messageBtn = document.querySelector('.message-btn');
    const notificationBtn = document.getElementById('notificationsBtn');
    const navItems = document.querySelectorAll('.nav-item');
    
    // Sélectionner les éléments du profil
    const profileImage = document.getElementById('profileImage');
    const profileName = document.getElementById('profileName');
    const profileOccupation = document.getElementById('profileOccupation');
    const compatibilityScore = document.getElementById('compatibilityScore');
    const profileWork = document.getElementById('profileWork');
    const profileBudget = document.getElementById('profileBudget');
    const profileAvailability = document.getElementById('profileAvailability');
    const profileDuration = document.getElementById('profileDuration');
    const profileBio = document.getElementById('profileBio');
    
    // Charger les données du candidat
    loadCandidateData(candidateName);
    
    // Bouton retour
    if (backBtn) {
        backBtn.addEventListener('click', function() {
            // Retour à la page des candidats
            window.location.href = 'apartment-candidates.html';
        });
    }
    
    // Bouton décliner
    if (rejectBtn) {
        rejectBtn.addEventListener('click', function() {
            if (confirm(`Êtes-vous sûr de vouloir décliner la candidature de ${candidateName} ?`)) {
                // Simuler le chargement
                rejectBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Traitement...';
                rejectBtn.disabled = true;
                
                // Simuler un appel API
                setTimeout(() => {
                    showToast(`La candidature de ${candidateName} a été déclinée.`);
                    
                    // Rediriger après 1.5 secondes
                    setTimeout(() => {
                        window.location.href = 'apartment-candidates.html';
                    }, 1500);
                }, 1000);
            }
        });
    }
    
    // Bouton message
    if (messageBtn) {
        messageBtn.addEventListener('click', function() {
            // Rediriger vers la messagerie
            window.location.href = `messages.html?candidate=${encodeURIComponent(candidateName)}`;
        });
    }
    
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
    
    // Fonction pour charger les données du candidat
    function loadCandidateData(name) {
        // Cette fonction simule le chargement des données depuis une API
        // Dans un cas réel, vous feriez un appel fetch à votre API

        // Données simulées pour chaque candidat
        const candidatesData = {
            'Sophie, 24 ans': {
                image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8cHJvZmlsZSUyMHdvbWFufGVufDB8fDB8fHww&auto=format&fit=crop&w=800&q=60',
                occupation: 'Étudiante en design',
                score: '92%',
                work: 'École de Design',
                budget: '500€/mois',
                availability: 'Disponible dès maintenant',
                duration: '1 an minimum',
                bio: '"Je suis une personne calme, organisée et respectueuse. J\'adore la décoration et la cuisine. Je cherche une colocation conviviale pour ma dernière année d\'études. Originaire de Bordeaux, j\'ai déménagé à Lyon pour mes études en design. Je suis passionnée d\'art et de photographie. J\'aime sortir de temps en temps mais j\'apprécie aussi les soirées tranquilles à la maison."'
            },
            'Thomas, 26 ans': {
                image: '20250429_2140_Jeune Homme Humain_simple_compose_01jt1h0tezf1avm9q9v81q1z6f.png',
                occupation: 'Développeur web',
                score: '78%',
                work: 'StartUp Tech',
                budget: '600€/mois',
                availability: 'Disponible dans 1 mois',
                duration: '6 mois minimum',
                bio: '"Passionné de technologie et de musique, je suis à la recherche d\'un logement partagé avec des personnes dynamiques et respectueuses. J\'aime voyager et découvrir de nouvelles cultures. Je travaille dans une startup en tant que développeur full-stack. J\'apprécie les espaces où je peux travailler au calme mais aussi échanger avec d\'autres personnes."'
            },
            'Marie, 23 ans': {
                image: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8cG9ydHJhaXQlMjBmZW1hbGV8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=800&q=60',
                occupation: 'Infirmière',
                score: '85%',
                work: 'Hôpital Central',
                budget: '550€/mois',
                availability: 'Disponible dès maintenant',
                duration: 'Indéterminé',
                bio: '"Travaillant souvent en horaires décalés, je recherche une colocation avec des personnes compréhensives. J\'aime cuisiner et les soirées tranquilles à la maison. Je suis plutôt calme mais j\'apprécie les moments de convivialité. Je cherche un logement où je pourrai me reposer après mes gardes à l\'hôpital."'
            },
            'Pierre, 28 ans': {
                image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTJ8fHBvcnRyYWl0JTIwbWFsZXxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=800&q=60',
                occupation: 'Architecte',
                score: '70%',
                work: 'Cabinet d\'Architecture',
                budget: '700€/mois',
                availability: 'Disponible dans 2 mois',
                duration: '2 ans minimum',
                bio: '"Amateur d\'art et de design, je suis à la recherche d\'un espace de vie inspirant. J\'apprécie le calme pour travailler mais aussi les moments conviviaux en colocation. Mon travail me passionne mais j\'aime aussi prendre du temps pour moi. Je suis sociable, ordonné et respectueux des espaces communs."'
            },
            'Julie, 25 ans': {
                image: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8cG9ydHJhaXQlMjBmZW1hbGV8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=800&q=60',
                occupation: 'Professeure d\'anglais',
                score: '65%',
                work: 'Lycée International',
                budget: '480€/mois',
                availability: 'Disponible dès le 1er juillet',
                duration: '1 an renouvelable',
                bio: '"Sociable et dynamique, j\'adore voyager et découvrir de nouvelles cultures. Je recherche une colocation internationale où l\'on peut partager et échanger. J\'enseigne l\'anglais et j\'aime organiser des soirées linguistiques. Je suis respectueuse des règles de vie commune et j\'apprécie avoir une maison propre et ordonnée."'
            }
        };
        
        // Mettre les données dans le DOM
        if (candidatesData[name]) {
            const data = candidatesData[name];
            profileImage.src = data.image;
            profileName.textContent = name;
            profileOccupation.textContent = data.occupation;
            compatibilityScore.textContent = data.score;
            profileWork.textContent = data.work;
            profileBudget.textContent = data.budget;
            profileAvailability.textContent = data.availability;
            profileDuration.textContent = data.duration;
            profileBio.textContent = data.bio;
        } else {
            // Candidat non trouvé
            showToast("Candidat non trouvé.");
            setTimeout(() => {
                window.location.href = 'apartment-candidates.html';
            }, 2000);
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
        
        // Ajout des styles de base pour la modal
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
            });
            
            // Mettre à jour le badge
            const badge = document.querySelector('.notifications-btn .badge');
            if (badge) badge.style.display = 'none';
        });
    }
}); 
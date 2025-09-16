// Script pour la page de profil propriétaire
document.addEventListener('DOMContentLoaded', function() {
    // Gestion des onglets du profil
    const profileTabs = document.querySelectorAll('.profile-tab');
    const tabContents = document.querySelectorAll('.tab-content');
    
    // Sélectionner les éléments du DOM
    const profileAvatar = document.getElementById('profileAvatar');
    const editAvatarBtn = document.getElementById('editAvatarBtn');
    const avatarModal = document.getElementById('avatarModal');
    const closeModalBtn = document.querySelector('.close-modal-btn');
    const cancelAvatarBtn = document.getElementById('cancelAvatarBtn');
    const saveAvatarBtn = document.getElementById('saveAvatarBtn');
    const uploadArea = document.getElementById('uploadArea');
    const photoUpload = document.getElementById('photoUpload');
    const previewContainer = document.getElementById('previewContainer');
    const imagePreview = document.getElementById('imagePreview');
    const removePreview = document.getElementById('removePreview');
    const savePersonalBtn = document.getElementById('savePersonalBtn');
    const navItems = document.querySelectorAll('.nav-item');
    
    // Navigation entre les onglets
    profileTabs.forEach(tab => {
        tab.addEventListener('click', function() {
            // Retirer la classe active de tous les onglets
            profileTabs.forEach(t => t.classList.remove('active'));
            
            // Ajouter la classe active à l'onglet cliqué
            this.classList.add('active');
            
            // Masquer tous les contenus d'onglet
            tabContents.forEach(content => content.classList.remove('active'));
            
            // Afficher le contenu correspondant à l'onglet sélectionné
            const tabId = this.getAttribute('data-tab') + 'Tab';
            document.getElementById(tabId).classList.add('active');
        });
    });
    
    // Gestion du modal de changement d'avatar
    if (editAvatarBtn && avatarModal) {
        editAvatarBtn.addEventListener('click', function() {
            avatarModal.style.display = 'flex';
            setTimeout(() => avatarModal.classList.add('active'), 10);
        });
    }
    
    // Fermer le modal
    if (closeModalBtn && avatarModal) {
        closeModalBtn.addEventListener('click', closeModal);
    }
    
    if (cancelAvatarBtn && avatarModal) {
        cancelAvatarBtn.addEventListener('click', closeModal);
    }
    
    // Fermer le modal en cliquant en dehors
    if (avatarModal) {
        avatarModal.addEventListener('click', function(e) {
            if (e.target === this) {
                closeModal();
            }
        });
    }
    
    function closeModal() {
        avatarModal.classList.remove('active');
        setTimeout(() => {
            avatarModal.style.display = 'none';
            // Réinitialiser l'aperçu
            previewContainer.style.display = 'none';
            uploadArea.style.display = 'block';
        }, 300);
    }
    
    // Gestion de l'upload de photo
    if (uploadArea && photoUpload) {
        uploadArea.addEventListener('click', function() {
            photoUpload.click();
        });
        
        uploadArea.addEventListener('dragover', function(e) {
            e.preventDefault();
            this.classList.add('dragover');
        });
        
        uploadArea.addEventListener('dragleave', function() {
            this.classList.remove('dragover');
        });
        
        uploadArea.addEventListener('drop', function(e) {
            e.preventDefault();
            this.classList.remove('dragover');
            
            if (e.dataTransfer.files.length) {
                photoUpload.files = e.dataTransfer.files;
                handleFileSelect();
            }
        });
        
        photoUpload.addEventListener('change', handleFileSelect);
    }
    
    function handleFileSelect() {
        if (photoUpload.files && photoUpload.files[0]) {
            const file = photoUpload.files[0];
            
            // Vérifier que c'est bien une image
            if (!file.type.match('image.*')) {
                alert('Veuillez sélectionner une image');
                return;
            }
            
            const reader = new FileReader();
            
            reader.onload = function(e) {
                imagePreview.src = e.target.result;
                uploadArea.style.display = 'none';
                previewContainer.style.display = 'block';
            };
            
            reader.readAsDataURL(file);
        }
    }
    
    // Supprimer l'aperçu
    if (removePreview) {
        removePreview.addEventListener('click', function() {
            photoUpload.value = '';
            previewContainer.style.display = 'none';
            uploadArea.style.display = 'block';
        });
    }
    
    // Enregistrer la nouvelle photo
    if (saveAvatarBtn && profileAvatar) {
        saveAvatarBtn.addEventListener('click', function() {
            if (imagePreview.src) {
                profileAvatar.src = imagePreview.src;
                
                // Mettre à jour également l'avatar dans le header
                const headerAvatar = document.querySelector('.header-profile-img');
                if (headerAvatar) {
                    headerAvatar.src = imagePreview.src;
                }
                
                // Fermer le modal
                closeModal();
                
                // Afficher un message de succès
                showNotification('Photo de profil mise à jour avec succès', 'success');
            }
        });
    }
    
    // Enregistrer les informations personnelles
    if (savePersonalBtn) {
        savePersonalBtn.addEventListener('click', function() {
            // Simuler la sauvegarde des données
            setTimeout(() => {
                showNotification('Informations personnelles enregistrées avec succès', 'success');
            }, 500);
        });
    }
    
    // Navigation du bas
    navItems.forEach(item => {
        item.addEventListener('click', function() {
            const tab = this.getAttribute('data-tab');
            
            if (tab === 'dashboard') {
                window.location.href = 'owner-dashboard.html';
            } else if (tab === 'messages') {
                window.location.href = 'messages-proprietaire.html';
            }
            // On reste sur la page si c'est le profil
        });
    });
    
    // Fonction pour afficher des notifications
    function showNotification(message, type) {
        // Créer l'élément de notification
        const notification = document.createElement('div');
        notification.className = `notification ${type}`;
        notification.innerHTML = `
            <div class="notification-icon">
                <i class="fas ${type === 'success' ? 'fa-check-circle' : 'fa-exclamation-circle'}"></i>
            </div>
            <div class="notification-message">${message}</div>
        `;
        
        // Ajouter au DOM
        document.body.appendChild(notification);
        
        // Animer l'apparition
        setTimeout(() => notification.classList.add('visible'), 10);
        
        // Supprimer après un délai
        setTimeout(() => {
            notification.classList.remove('visible');
            setTimeout(() => notification.remove(), 300);
        }, 3000);
    }
    
    // Gestion des interrupteurs (toggles)
    const toggleSwitches = document.querySelectorAll('.toggle-switch input');
    toggleSwitches.forEach(toggle => {
        toggle.addEventListener('change', function() {
            const optionName = this.closest('.settings-option').querySelector('h4').textContent;
            const status = this.checked ? 'activée' : 'désactivée';
            showNotification(`Option "${optionName}" ${status}`, 'success');
        });
    });
    
    // Gestion des boutons de téléchargement de documents
    const downloadButtons = document.querySelectorAll('.document-card .btn-outline');
    downloadButtons.forEach(button => {
        button.addEventListener('click', function() {
            const docName = this.closest('.document-card').querySelector('h4').textContent;
            showNotification(`Téléchargement de "${docName}" commencé`, 'success');
        });
    });
    
    // Gestion des actions sur les biens immobiliers
    const propertyButtons = document.querySelectorAll('.property-actions .btn-outline');
    propertyButtons.forEach(button => {
        button.addEventListener('click', function() {
            const action = this.textContent.trim();
            const propertyName = this.closest('.property-card').querySelector('h3').textContent;
            
            if (action.includes('Voir')) {
                showNotification(`Affichage des détails de "${propertyName}"`, 'success');
            } else if (action.includes('Modifier')) {
                showNotification(`Modification de "${propertyName}"`, 'success');
            }
        });
    });
    
    // Bouton pour ajouter un nouveau bien
    const addPropertyBtn = document.querySelector('.add-property-btn');
    if (addPropertyBtn) {
        addPropertyBtn.addEventListener('click', function() {
            showNotification('Formulaire d\'ajout de bien ouvert', 'success');
        });
    }
    
    // Animation au survol des cartes de propriété
    const propertyCards = document.querySelectorAll('.property-card');
    propertyCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-5px)';
            this.style.boxShadow = '0 10px 20px rgba(0, 0, 0, 0.1)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = '';
            this.style.boxShadow = '';
        });
    });
}); 
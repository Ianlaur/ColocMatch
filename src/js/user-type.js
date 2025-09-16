// Gestion de la sélection du type d'utilisateur
document.addEventListener('DOMContentLoaded', function() {
    // Sélection des éléments
    const seekerCard = document.getElementById('seekerCard');
    const ownerCard = document.getElementById('ownerCard');
    const seekerBtn = document.getElementById('seekerBtn');
    const ownerBtn = document.getElementById('ownerBtn');
    
    // Ajouter des effets de survol pour les cartes
    seekerCard.addEventListener('mouseenter', function() {
        this.classList.add('card-highlight');
    });
    
    seekerCard.addEventListener('mouseleave', function() {
        this.classList.remove('card-highlight');
    });
    
    ownerCard.addEventListener('mouseenter', function() {
        this.classList.add('card-highlight');
    });
    
    ownerCard.addEventListener('mouseleave', function() {
        this.classList.remove('card-highlight');
    });
    
    // Gérer le clic sur le bouton "Je cherche un logement"
    seekerBtn.addEventListener('click', function() {
        // Enregistrer le type d'utilisateur
        localStorage.setItem('userType', 'seeker');
        
        console.log("Type d'utilisateur sélectionné: chercheur de logement");
        
        // Rediriger vers la page pour chercheurs d'appartement
        window.location.href = 'index.html';
    });
    
    // Gérer le clic sur le bouton "J'ai un logement"
    ownerBtn.addEventListener('click', function() {
        // Enregistrer le type d'utilisateur
        localStorage.setItem('userType', 'owner');
        
        console.log("Type d'utilisateur sélectionné: propriétaire");
        
        // Rediriger vers la page pour propriétaires
        window.location.href = 'owner-dashboard.html';
    });
}); 
/**
 * Neon-Grid Logic Layer
 */

document.addEventListener('DOMContentLoaded', () => {
    const glowBtn = document.querySelector('[data-action="glow"]');
    
    // Uporaba data-atributov za JS kljuke
    if (glowBtn) {
        glowBtn.addEventListener('click', () => {
            document.body.classList.toggle('is-active');
            
            if (document.body.classList.contains('is-active')) {
                glowBtn.textContent = "SYSTEM_ONLINE";
                console.log("Neon_Grid: Vsi sistemi aktivni.");
            } else {
                glowBtn.textContent = "INITIALIZE_SYSTEM";
            }
        });
    }

    // Scroll listener za posodobitev statusa v aside
    const snapContainer = document.querySelector('.u-snap-container');
    snapContainer.addEventListener('scroll', () => {
        // Logika za dinamično spreminjanje statusa glede na scroll pozicijo
    });
});

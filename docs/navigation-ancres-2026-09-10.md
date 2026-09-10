# Navigation vers les sections

ScrollToTop distinguait uniquement le chemin et remontait systématiquement la page. Il respecte désormais le fragment d’URL et attend la présence de la cible lorsque la route est chargée avec Suspense. Les marges de défilement existantes restent prises en compte.

L’observation du contenu s’arrête dès que la cible est trouvée, au changement de route ou après dix secondes. Un fragment mal encodé ne provoque pas d’exception. Le défilement est immédiat et ne force pas d’animation.

Sans fragment, le retour en haut est conservé. Aucune modification de contenu ni de date éditoriale : il s’agit d’une correction de navigation, notamment pour les liens directs vers le formulaire et les rubriques des articles, sans promesse de gain de classement.

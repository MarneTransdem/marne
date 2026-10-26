# Contenu public directement visible dans le HTML initial

## Constat

Le 26 octobre, le HTML brut public de l’accueil, de Paris 15 et du transfert de bureaux contenait un écran de chargement dans `main`. Le contenu réel se trouvait dans des segments React cachés, déplacés par un script inline. Il était présent dans la réponse, mais son affichage dépendait de JavaScript. Ce constat ne prouve pas un échec d’indexation par Google.

## Correction

Dans `src/entry-server.tsx`, le rendu conserve l’attente `onAllReady` et utilise un seuil `progressiveChunkSize` suffisamment élevé pour inclure les grandes sections Suspense terminées directement à leur emplacement. Le seuil par défaut observé dans React DOM 19.2.5 est de 12 800 octets et peut provoquer la segmentation de grandes sections même terminées. Aucun remplacement de chaînes ni déplacement manuel du HTML React n’est utilisé.

Le contenu, les URL, les métadonnées, les dates de contenu et les liens restent identiques. L’objectif est de réduire la dépendance au rendu JavaScript pour la lecture du contenu et du maillage. Aucun gain de position n’est présumé.

## Vérification et prévention

- Audit du HTML initial des 161 pages : titre H1 présent dans `main`, absence de frontières Suspense non résolues et de segments différés `S:`.
- Contrôle bloquant ajouté à l’audit du prérendu. Tests : contenu complet accepté, écran de chargement avec contenu masqué rejeté, échec de rendu rejeté, champs cachés ordinaires autorisés.
- Compilation, audits SEO et contrôles d’hydratation dans le navigateur avant publication ; comparaison du HTML brut public après publication.

Référence : [React — rendu serveur et génération statique](https://react.dev/reference/react-dom/server/renderToPipeableStream#waiting-for-all-content-to-load-for-crawlers-and-static-generation).

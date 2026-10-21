# Identité des services dans le JSON-LD — 21 octobre 2026

## Modifications et impact attendu

La génération Service exige désormais un chemin de page typé et calcule une seule URL canonique absolue pour `@id`, `url` et `mainEntityOfPage`. Les 14 pages de prestations qui ne transmettaient pas leur chemin utilisent maintenant cette option ; le template des secteurs abandonne sa reconstruction manuelle partielle de ces champs.

Les audits du HTML prérendu et du site public vérifient désormais l’unicité de Service, la cohérence de son identité avec la page et la résolution de son prestataire vers l’entité MovingCompany présente sur cette page. Le nouveau contrôle a été appliqué aux anciens HTML avant recompilation pour confirmer la détection des rattachements incomplets.

Objectif : cohérence des références entre le service, sa page et l’entreprise ; code partagé plus maintenable. L’absence de mainEntityOfPage n’était pas présentée comme une erreur obligatoire Schema.org ou un blocage d’indexation. Aucun résultat enrichi ni gain de classement garanti. Aucun avis, adresse locale supplémentaire, prix ou nouvelle prestation ajouté.

Le texte visible, le design et les canoniques HTML restent inchangés. Les dates de contenu ne sont pas artificiellement renouvelées pour cet enrichissement technique.

## Sources

- [Schema.org — Service](https://schema.org/Service).
- [Schema.org — mainEntityOfPage](https://schema.org/mainEntityOfPage), consulté le 21 octobre 2026.

## Validation

Le nouveau contrôle a signalé 140 identités incomplètes dans les anciens HTML. Après correction, npm run check est réussi : tests fonctionnels, TypeScript, compilation et audit des 161 pages prérendues. Les 145 pages contenant Service ont une identité canonique cohérente et un prestataire résolu. Le rapport public compte désormais aussi ces pages. Aucun changement visuel ; contrôle du déploiement et du JSON-LD public à terminer après push.

# SEO Phase 1 - Search Console, GBP, Conversions, Core Web Vitals

## 1. Google Search Console

1. Creer une propriete Domaine pour `devisdemenagement-paris.com`.
2. Verifier la propriete par DNS TXT chez le registrar.
3. Ajouter aussi une propriete URL-prefix pour `https://devisdemenagement-paris.com` si besoin de verifier par meta tag.
4. Si verification par meta tag, renseigner :

```env
VITE_GOOGLE_SITE_VERIFICATION=TOKEN_GOOGLE_SEARCH_CONSOLE
```

5. Soumettre le sitemap :

```text
https://devisdemenagement-paris.com/sitemap.xml
```

6. Controler en priorite :
   - `/`
   - `/demande-de-devis`
   - `/demenagement-charenton-le-pont`
   - `/demenagement-paris-20`
   - `/location-monte-meuble-paris`
   - `/demenagement-entreprises-paris`

## 2. Google Business Profile

1. Verifier que le nom, adresse, telephone et horaires sont strictement coherents avec le site.
2. Ajouter les services prioritaires :
   - Demenagement Paris
   - Demenagement particuliers
   - Demenagement entreprises
   - Monte-meuble
   - Garde-meuble
   - Emballage et cartons
3. Ajouter un lien de site avec UTM :

```text
https://devisdemenagement-paris.com/?utm_source=google&utm_medium=organic&utm_campaign=google_business_profile
```

4. Ajouter un lien devis avec UTM :

```text
https://devisdemenagement-paris.com/demande-de-devis?utm_source=google&utm_medium=organic&utm_campaign=google_business_profile
```

5. Publier regulierement des photos reelles : camion, equipe, emballage, monte-meuble, chantiers.
6. Demander des avis apres chaque demenagement et repondre a tous les avis.

## 3. GA4 / Google Ads

Variables optionnelles :

```env
VITE_GA_MEASUREMENT_ID=G-XXXXXXXXXX
VITE_GOOGLE_ADS_CONVERSION_ID=AW-XXXXXXXXX
VITE_GOOGLE_ADS_QUOTE_CONVERSION_LABEL=XXXXXXXXXXXX
```

Evenements suivis :

- `page_view`
- `quote_cta_click`
- `quick_quote_start`
- `quote_form_submit`
- `contact_form_submit`
- `phone_click`
- `email_click`
- `google_business_profile_click`
- `web_vital`

Conversion principale a declarer dans GA4 :

```text
quote_form_submit
```

Conversions secondaires :

```text
contact_form_submit
phone_click
quick_quote_start
```

## 4. Core Web Vitals

Le site envoie les mesures suivantes apres consentement :

- `LCP`
- `CLS`
- `INP`
- `FCP`
- `TTFB`

Dans GA4, filtrer l'evenement `web_vital` par :

- `metric_name`
- `metric_value`
- `metric_rating`
- `page_path`

Objectifs :

- LCP inferieur a 2500 ms
- INP inferieur a 200 ms
- CLS inferieur a 0.1

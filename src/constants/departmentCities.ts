import { valDOiseCities } from './valDOiseCities';
import { yvelinesCities } from './yvelinesCities';

// Existing routes matched to official commune names and INSEE codes, 2026-09-09.
export const departmentCityGroups: Record<string, { name: string; cities: { slug: string; name: string; inseeCode: string }[] }> = {
  "seine-et-marne": {
    "name": "Seine-et-Marne",
    "cities": []
  },
  "essonne": {
    "name": "Essonne",
    "cities": []
  },
  "hauts-de-seine": {
    "name": "Hauts-de-Seine",
    "cities": [
      {
        "slug": "antony",
        "name": "Antony",
        "inseeCode": "92002"
      },
      {
        "slug": "bagneux",
        "name": "Bagneux",
        "inseeCode": "92007"
      },
      {
        "slug": "boulogne-billancourt",
        "name": "Boulogne-Billancourt",
        "inseeCode": "92012"
      },
      {
        "slug": "bourg-la-reine",
        "name": "Bourg-la-Reine",
        "inseeCode": "92014"
      },
      {
        "slug": "chatenay-malabry",
        "name": "Châtenay-Malabry",
        "inseeCode": "92019"
      },
      {
        "slug": "chatillon",
        "name": "Châtillon",
        "inseeCode": "92020"
      },
      {
        "slug": "chaville",
        "name": "Chaville",
        "inseeCode": "92022"
      },
      {
        "slug": "clamart",
        "name": "Clamart",
        "inseeCode": "92023"
      },
      {
        "slug": "clichy",
        "name": "Clichy",
        "inseeCode": "92024"
      },
      {
        "slug": "courbevoie",
        "name": "Courbevoie",
        "inseeCode": "92026"
      },
      {
        "slug": "fontenay-aux-roses",
        "name": "Fontenay-aux-Roses",
        "inseeCode": "92032"
      },
      {
        "slug": "garches",
        "name": "Garches",
        "inseeCode": "92033"
      },
      {
        "slug": "issy-les-moulineaux",
        "name": "Issy-les-Moulineaux",
        "inseeCode": "92040"
      },
      {
        "slug": "le-plessis-robinson",
        "name": "Le Plessis-Robinson",
        "inseeCode": "92060"
      },
      {
        "slug": "levallois-perret",
        "name": "Levallois-Perret",
        "inseeCode": "92044"
      },
      {
        "slug": "malakoff",
        "name": "Malakoff",
        "inseeCode": "92046"
      },
      {
        "slug": "marnes-la-coquette",
        "name": "Marnes-la-Coquette",
        "inseeCode": "92047"
      },
      {
        "slug": "meudon",
        "name": "Meudon",
        "inseeCode": "92048"
      },
      {
        "slug": "montrouge",
        "name": "Montrouge",
        "inseeCode": "92049"
      },
      {
        "slug": "nanterre",
        "name": "Nanterre",
        "inseeCode": "92050"
      },
      {
        "slug": "neuilly-sur-seine",
        "name": "Neuilly-sur-Seine",
        "inseeCode": "92051"
      },
      {
        "slug": "puteaux",
        "name": "Puteaux",
        "inseeCode": "92062"
      },
      {
        "slug": "rueil-malmaison",
        "name": "Rueil-Malmaison",
        "inseeCode": "92063"
      },
      {
        "slug": "saint-cloud",
        "name": "Saint-Cloud",
        "inseeCode": "92064"
      },
      {
        "slug": "sceaux",
        "name": "Sceaux",
        "inseeCode": "92071"
      },
      {
        "slug": "sevres",
        "name": "Sèvres",
        "inseeCode": "92072"
      },
      {
        "slug": "suresnes",
        "name": "Suresnes",
        "inseeCode": "92073"
      },
      {
        "slug": "vanves",
        "name": "Vanves",
        "inseeCode": "92075"
      },
      {
        "slug": "vaucresson",
        "name": "Vaucresson",
        "inseeCode": "92076"
      },
      {
        "slug": "ville-d-avray",
        "name": "Ville-d'Avray",
        "inseeCode": "92077"
      }
    ]
  },
  "seine-saint-denis": {
    "name": "Seine-Saint-Denis",
    "cities": [
      {
        "slug": "aulnay-sous-bois",
        "name": "Aulnay-sous-Bois",
        "inseeCode": "93005"
      },
      {
        "slug": "bagnolet",
        "name": "Bagnolet",
        "inseeCode": "93006"
      },
      {
        "slug": "bobigny",
        "name": "Bobigny",
        "inseeCode": "93008"
      },
      {
        "slug": "bondy",
        "name": "Bondy",
        "inseeCode": "93010"
      },
      {
        "slug": "drancy",
        "name": "Drancy",
        "inseeCode": "93029"
      },
      {
        "slug": "les-lilas",
        "name": "Les Lilas",
        "inseeCode": "93045"
      },
      {
        "slug": "montreuil",
        "name": "Montreuil",
        "inseeCode": "93048"
      },
      {
        "slug": "noisy-le-sec",
        "name": "Noisy-le-Sec",
        "inseeCode": "93053"
      },
      {
        "slug": "pantin",
        "name": "Pantin",
        "inseeCode": "93055"
      },
      {
        "slug": "romainville",
        "name": "Romainville",
        "inseeCode": "93063"
      },
      {
        "slug": "saint-denis",
        "name": "Saint-Denis",
        "inseeCode": "93066"
      },
      {
        "slug": "saint-ouen",
        "name": "Saint-Ouen-sur-Seine",
        "inseeCode": "93070"
      }
    ]
  },
  "val-de-marne": {
    "name": "Val-de-Marne",
    "cities": [
      {
        "slug": "charenton-le-pont",
        "name": "Charenton-le-Pont",
        "inseeCode": "94018"
      },
      {
        "slug": "alfortville",
        "name": "Alfortville",
        "inseeCode": "94002"
      },
      {
        "slug": "champigny-sur-marne",
        "name": "Champigny-sur-Marne",
        "inseeCode": "94017"
      },
      {
        "slug": "creteil",
        "name": "Créteil",
        "inseeCode": "94028"
      },
      {
        "slug": "fontenay-sous-bois",
        "name": "Fontenay-sous-Bois",
        "inseeCode": "94033"
      },
      {
        "slug": "ivry-sur-seine",
        "name": "Ivry-sur-Seine",
        "inseeCode": "94041"
      },
      {
        "slug": "joinville-le-pont",
        "name": "Joinville-le-Pont",
        "inseeCode": "94042"
      },
      {
        "slug": "le-kremlin-bicetre",
        "name": "Le Kremlin-Bicêtre",
        "inseeCode": "94043"
      },
      {
        "slug": "le-perreux-sur-marne",
        "name": "Le Perreux-sur-Marne",
        "inseeCode": "94058"
      },
      {
        "slug": "maisons-alfort",
        "name": "Maisons-Alfort",
        "inseeCode": "94046"
      },
      {
        "slug": "nogent-sur-marne",
        "name": "Nogent-sur-Marne",
        "inseeCode": "94052"
      },
      {
        "slug": "saint-mande",
        "name": "Saint-Mandé",
        "inseeCode": "94067"
      },
      {
        "slug": "saint-maur-des-fosses",
        "name": "Saint-Maur-des-Fossés",
        "inseeCode": "94068"
      },
      {
        "slug": "saint-maurice",
        "name": "Saint-Maurice",
        "inseeCode": "94069"
      },
      {
        "slug": "villejuif",
        "name": "Villejuif",
        "inseeCode": "94076"
      },
      {
        "slug": "vincennes",
        "name": "Vincennes",
        "inseeCode": "94080"
      },
      {
        "slug": "vitry-sur-seine",
        "name": "Vitry-sur-Seine",
        "inseeCode": "94081"
      }
    ]
  }
,
  'val-d-oise': { name: 'Val-d’Oise', cities: valDOiseCities },
  'yvelines': { name: 'Yvelines', cities: yvelinesCities },
};

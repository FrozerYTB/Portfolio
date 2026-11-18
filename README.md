# Portfolio de Guillaume Sainson

Portfolio personnel d'un étudiant en **3e année de Bachelor Cybersécurité** à Nexa Digital School (Paris), qui prépare le titre RNCP 41807 *Administrateur des systèmes, réseaux et sécurité* (niveau 6).

Le site présente mes projets, mes compétences, mon parcours et mes loisirs. Il est écrit en HTML, CSS et JavaScript, sans framework ni étape de compilation.

**Site en ligne :** https://VOTRE-PSEUDO.github.io/portfolio/

---

## Sommaire

- [Aperçu des pages](#aperçu-des-pages)
- [Fonctionnalités](#fonctionnalités)
- [Technologies](#technologies)
- [Structure du projet](#structure-du-projet)
- [Lancer le site en local](#lancer-le-site-en-local)
- [Déploiement sur GitHub Pages](#déploiement-sur-github-pages)
- [Personnaliser le site](#personnaliser-le-site)
- [Accessibilité](#accessibilité)
- [Crédits](#crédits)
- [Contact](#contact)

---

## Aperçu des pages

| Page | Fichier | Contenu |
| --- | --- | --- |
| Accueil | `index.html` | Présentation, flocon-réseau animé et accès rapide aux autres pages |
| Projets | `projets.html` | Projets rangés par état (en ligne, en cours, terminés, archivés), détail du projet de certification |
| Compétences | `competences.html` | Boîtes de compétences par domaine et programme du bachelor |
| Parcours | `parcours.html` | Formation et stages |
| Loisirs | `loisirs.html` | Sports et centres d'intérêt |
| Contact | `contact.html` | Adresse e-mail, LinkedIn et GitHub |

## Fonctionnalités

- **Boîtes de compétences interactives** : au survol (ou au toucher sur mobile), chaque boîte se retourne et affiche une description et, quand il est renseigné, un niveau sur 5.
- **Profils cliquables** : les boîtes TryHackMe, Root-Me et GitHub ouvrent le profil correspondant.
- **Projets classés par état**, avec une étiquette perso, école ou stage.
- **Bloc « En savoir plus »** sur le projet de certification : cas d'étude, objectifs chiffrés, classification des données, budget, priorisation MoSCoW et les quatre volets du projet. Il fonctionne aussi sans JavaScript.
- **Définitions au survol** : les termes techniques soulignés en pointillés affichent leur définition dans une bulle. Chaque sigle est accompagné de sa forme développée.
- **Animations légères** : apparition des éléments au défilement, boîtes qui se soulèvent au survol, niveaux qui se remplissent, ombre du menu au défilement.
- **Thème clair et sombre** selon le réglage du système du visiteur.
- **Mise en page adaptée** aux ordinateurs, tablettes et téléphones.

## Technologies

| Domaine | Choix |
| --- | --- |
| Structure | HTML5 |
| Mise en forme | CSS3 : variables, Grid, Flexbox, animations |
| Interactions | JavaScript natif (aucune bibliothèque) |
| Polices | Bricolage Grotesque, IBM Plex Sans et IBM Plex Mono, via Google Fonts |
| Hébergement | GitHub Pages |

Aucune installation n'est nécessaire : pas de Node.js, pas de dépendances, pas de compilation.

## Structure du projet

```
.
├── index.html            Accueil
├── projets.html          Projets
├── competences.html      Compétences et programme du bachelor
├── parcours.html         Formation et stages
├── loisirs.html          Loisirs
├── contact.html          Contact
├── css/
│   └── style.css         Mise en forme commune à toutes les pages
├── js/
│   ├── anim.js           Animations, ombre du menu, position des bulles de définition
│   └── flocon.js         Flocon-réseau animé de la page d'accueil
├── images/
│   ├── competences/      Icônes des boîtes de compétences
│   ├── contact/          Icônes LinkedIn et GitHub
│   ├── loisirs/          Icônes des loisirs
│   ├── profil/           Photo de profil (photo.jpg)
│   ├── projets/          Icônes des projets
│   └── ICONES-A-AJOUTER.txt
└── README.md
```

## Lancer le site en local

Le plus simple : ouvrir `index.html` dans un navigateur.

Pour se rapprocher des conditions réelles, on peut aussi lancer un petit serveur local depuis le dossier du projet :

```bash
python -m http.server 8000
```

puis ouvrir http://localhost:8000 dans le navigateur.

Une connexion Internet est nécessaire pour charger les polices. Sans elle, le site s'affiche avec des polices de secours.

## Déploiement sur GitHub Pages

1. Envoyer le contenu du dossier à la racine du dépôt, de sorte que `index.html` soit au premier niveau.
2. Dans le dépôt, ouvrir **Settings**, puis **Pages**.
3. Dans **Build and deployment**, choisir **Deploy from a branch**, la branche `main` et le dossier `/ (root)`, puis enregistrer.
4. Après une à deux minutes, le site est disponible à l'adresse indiquée sur la même page.

Chaque nouvel envoi sur la branche `main` met le site à jour automatiquement.

## Personnaliser le site

### Couleurs et polices

Toutes les couleurs et polices sont définies en tête de `css/style.css`, dans le bloc `:root`. Le thème sombre redéfinit les mêmes variables plus bas dans le fichier. Modifier une variable suffit à changer la couleur partout.

### Ajouter ou remplacer une icône

Déposer un fichier PNG dans le sous-dossier de la page concernée, avec le nom attendu (en minuscules, sans espace). La liste des noms se trouve dans `images/ICONES-A-AJOUTER.txt`. Tant qu'une icône manque, la boîte affiche des initiales à la place.

> Sur GitHub Pages, les noms de fichiers sont sensibles à la casse : `Python.png` et `python.png` ne sont pas le même fichier.

### Ajouter ou changer la photo

Déposer une image carrée nommée `photo.jpg` dans `images/profil/`. Elle s'affiche dans un rond au centre du flocon de la page d'accueil. Sans ce fichier, le flocon s'affiche seul.

### Ajouter une boîte de compétence

Copier une boîte existante dans `competences.html` (un élément `<li class="tile">`) et modifier le nom, l'icône, la description et, si besoin, le niveau.

### Ajouter une page

Le menu et le pied de page sont écrits dans chacun des six fichiers HTML. Pour ajouter une page, créer le nouveau fichier à partir d'une page existante, puis ajouter son lien dans le menu de **toutes** les pages.

## Accessibilité

- Navigation complète au clavier, avec un contour visible sur l'élément actif.
- Les animations sont désactivées pour les visiteurs qui ont choisi de réduire les mouvements dans leur système.
- Sans JavaScript, tout le contenu reste visible et lisible.
- Les icônes décoratives sont ignorées par les lecteurs d'écran ; les niveaux sur 5 sont annoncés en texte.

## Crédits

- **Contenu, conception et choix** : Guillaume Sainson.
- **Intégration** : réalisée avec l'assistance de Claude (Anthropic).
- **Logos et icônes** : les logos de marques et de logiciels appartiennent à leurs propriétaires respectifs et sont utilisés uniquement pour illustrer les compétences.
- **Polices** : Bricolage Grotesque et IBM Plex, sous licence SIL Open Font License.

Le contenu de ce site (textes, parcours, projets) est personnel : merci de ne pas le réutiliser sans autorisation.

## Contact

- **E-mail** : guillaume.sainson03@gmail.com
- **LinkedIn** : [linkedin.com/in/guillaume-sainson](https://www.linkedin.com/in/guillaume-sainson/)

# Règles d'architecture et de syntaxe

Ce fichier rassemble toutes les règles d'or/de bonnes pratiques à respecter sur les dossiers et fichiers éditables

## Règles générales

- Les imports (autres que fichiers css) doivent être saisi automatiquement, sois par les quicks fix proposés par VSCode, soit par l'autocomplétion, ça permet d'éviter les confusions ou autres erreurs sur les imports

- L'ensemble des noms (dossiers, fichiers, function, classes, variables...) doit être le plus explicite possible (on appelle bien un chat un chat)

- Un type ne peut en aucun cas être de type `any`.
En revanche il peut être `void` dans certains cas particuliers

- Avec Typescript, [ la balise var a été remplacée](https://www.typescriptlang.org/docs/handbook/variable-declarations.html) par les balises **const** pour les **constantes** et **let** pour les **variables**. Ceci est dû au fait que **var amène plusieurs problème**. Elle n'est pas correctement typable et est accessible partout une fois initialisé, ce qui **implique des confusions et des failles de sécurités potentielles**

- Les fichiers fichiers de code sont en **.tsx** quand ils font un **rendu graphique**, en **.ts** quand ils ne **contiennent que de la logique**

- Les noms des dossiers et fichiers sont en **camelCase**, sans accent ni caractère spécial. Par exemple:

    ```bash
    # Mauvais
    MyFile.tsx
    my_file.tsx
    my-file.tsx
    myFÏlè.tsx
    MyFolder/
    

    # Bon
    myFile.tsx
    myFolder/
    ```

    **Tout le reste doit rester en PascalCase**

- Le nom des dossiers, image, icones, types, variables, classes et fonctions doit rester le plus explicite possible:

    ```bash
    # Mauvais
    interface MyAnimalLooksLikeACat
    myAnimalLooksLikeACat/

    # Bon
    interface Cat
    Cat/
    ```

## Structure globale

### cypress/

`cypress/` contient tous les tests automatisés end to end du projet.
Cette section sera mise à jour lors de la mise en place des tests

### public/

`public/` contient toutes les icones et les données faker
Le dossier `assets/` contient les icones et faker les données de substitutions

### src/

`src/` est le code source du projet. Il peut être divisé en plusieurs sous-dossiers :
    - `app/` contient le code de tous les composants et helpers utiles à la construction et la gestion des pages. Contient également les constantes globales du projet
    - `pages/` contient le code de toutes les pages
    - `api/` contient tous les fichiers relatifs à la connexion front/back

## Structure des dossiers fonctionnels

Tous les dossiers doivent suivre une structure similaire. Pour cela, chaque dossier correspond à un composant ou une page et contient 4 fichiers:
    - `index.tsx` contient le rendu graphique du dossier.
    - `hook.ts` contient la logique du dossier. Dans certains cas très exceptionnels, le hook peut être en tsx, mais c'est rare. Ce fichier exporte systématiquement un *UseData()*
    - `style.ts` ou `style.css` contient tous les styles du dossier. Ces styles ne sont applicables que dans ce dossier spécifique afin de simplifier la lecture. Si un style globale est requis, ce sera dans le fichier style à la racine
    - `type.ts` contient les types du dossier

Si besoin, les dossiers peuvent contenir un ou plusieurs sous dossiers respectant la même architecture

## Composants

Les composants sont définis dans le dossier `components/`.
Ils sont divisés en 2 catégories:
`components/` contient les composants réutilisables dans plusieurs pages.
Quand un comportement est long (en général plus de 15~20 lignes) ou est ré écrit à plusieurs endroits, on en fait un composant.
L'utilisation de composant permet la simplification du code, donc plus facile à maintenir, et moins sujet aux erreurs de duplication
Quand deux composant ont un comportement/affichage quasi similaire, le mieux est de les fusionner pour obtenir 1 composant qui gère différents cas en fonction de ses paramètres

`pages/` va contenir les composants spécifiques aux pages.
En général ce seront les pages en elle même, avec leur affichage et leur logique.
On peut aussi retrouver des composants très spécifiques et utiles uniquement à 1 page en question dans de rare cas.
C'est quelque chose à éviter au maximum.

Ces composants ne sont pas réutilisables, et ne doivent pas être utilisés ailleurs

## Typage

Le typage est une partie importante du projet. Il permet de s'assurer que le code est correct, prends et retourne les bonnes données, et permet de faciliter la lecture et le debug du code, d'où son importance
On va aller typer tout ce qui est paramètres, mais aussi tout ce qui a un retour logique
On nomme le type d'après la fonction qu'il va typer, et on lui ajoute Props, afin d'éviter toute confusion entre les types, les classes, les models etc

Exemple avec une fonction addition qui prend en paramètres 2 nombres, et dont le retour attendu est un nombre

```ts
// Mauvais
function Addition(a, b) {
    return a + b
}

function Addition(a: number, b: number): number {
    return a + b
}

function Addition({a, b}: Addition): number {
    return a + b
}

// Correct
function Addition({a, b}: AdditionProps): number {
    return a + b
}

```

**A NOTER**: Si vous ne connaissez pas le retour de la fonction, vous pouvez ne pas typer le retour de la fonction (pour le moment, ce n'est pas "grave").
En l'occurence c'est le `: number` à l'extérieur des parenthèse
En revanche, vous devez quoi qu'il arrive typer les hook, aussi bien leur paramètres s'ils en ont que leur retour.

# :)
```js
//                           `/+o/.
//                       .+sso+/:oydyo/:-:+shdys/    `-:.     `-/+o+/`
//                 `/sdh+/::/::ss:`ymdhyso//hmMNyhNNms+ososys+/-:/shms/`
//                .+hNNy++oo+/.`.--/osyhdmNNMMMMMMMMMNdsssssoso+hhhhsoo+ymdo.
//              -smNy/+ymmmmmNNNNMNMMMMMNNNmmNMMMMMMMMMho:///:--shydNMMNdo-sNs`
//            -hNd+-sNMNdmNMMMNNNMNNNMMMddNMMNNmNMMMMMMNmy+///::/:-:/++ymNNdmMN:
//          `sNMs`+NMNNNMMMMNNNMMMMMMNmhyso///+ohMmoNMmoo+/::/-:oymNNmsosshdhmMM/
//         +NMMy`hMMMhyNMNMMNNNMds:-.`-:syddmNMMmyo`+yMMho:..-+//++omMNNNNNNNmdNMs
//       :mMMMh`yMNdodNNNMNMMMs.+sdmmmmmdhNMMMNhy/..`-syhNmdyssso+/.`:yNMMMMNMNMMMy
//      :NMNh:-+MMh+mdNNNNNMd.+NNMMMMMMMMmho:-......:--::ohNMMMMMMNmNy/.oNMNmNMNMMMs
//     :NMm+/dmmMNydyhNdhMMN.yMMNmhysso+:-``        ```.--:/+sdMMMMMNNNm:-mMNNNNMMMMy
//    :NMy/hNMMMMmNddsh/NmMy-Mms:..`.--.`                ``..-.:yNMMMMNMNs:NMMMNNNNMMy
//   :NNy/mMMMMMMmNMMshsNdMo/d-...``                       ```...-yMMMNNMd`NMMNMdmoNMM-
//  /mMm+NMNNMMNMNNNNNNNNMMmom/                              ```..`+NMMMMh`NMMMMNNdhNMh
// +NMMmmMNyNMNMMMMMNmmmNMdNNyh+.                             ``````/NMMM::MMMMNMNNmNMN
//+MNNMMMNymMNNMMMNNNNNMh+:+dNmddhyoo+`                        ````.`sMMN`sMNNMNNMNNNNN
//dNNNMNNddMNNNNNNmymMN+---::/shdhyyy:                         `````..hMo.NMNMNMMMNmMMd
//dNNNMMNmNNNmmNMNdNMM+.-..----.-:::.                          ````...:mh/NMMMNMMMNNMMh
//sMNNMMNMNNmyNMNdmNMo--.....                                  ``...---:dNMNMMNMMNNNMMN.
//:NNNMMMNNNsmMNmMNMy...`.-.`                                    `.-----:odNmmNMMMMMNMMo
//.NMMMmMMMNmMNNNNMm:-.```..                                       ``-----:/o//dMMMNMMMm
//.NMMMNMMNMMNMNNNNs--.``...                                         `....---..dMNMMMMM`
//.NNMMNNNNNMMMNNNN:-...`...                                          ```.....`+MMMMMMM.
//.MNNNNNNNMMMMMNNy.......-.`                                         ``..---.`.NMMMMMM`
//`NMNMMNNNMMNMMMm-...`.-----.`                                        ``.-----.`yMMMMMd
// dMMMNNNNMMNNMMo`-....----..`          ``                      `.`` ```.------`:MMMMM-
// /MMNMNNNMMNMMN-`.`..-.--.` `--..-:-.-.``..``               ```.-......--.----..NMMMd
// `mMNMNNMMMNNMN.``...-.-../hddyysyhysyyso+--/::-..--...----:::+syyyyhhdddy+:-.-.hMMM:
//  :NNNNNNMMMMMN.`....--.:dy/:-.-/+++ososss+/:+shyo/::/:+os+:+syosyoso+/://ss//.`+MMm
//   +MdmNNMNMMMN+.--....:+-.-:+ooymdddmdhyo++ss+/yMo.`..oNsyhdhmdmmmmNmdo:-.--:+-:MM/
//  `y/..-+dNNMMMo-shhyo++--+sso-`dsymoso.smyso+//.od+/:/ho+yyhd/ymsNhyy./yy/``.-hhmm`
//  .s+md+- oMMMm``.-/sy//-.+/s.  odys+s-  /shyso+.sm+:::yd/hh+:`.hyyhy- `/y/.` `hs/s`
//  -oyMNyhs:NMMo     `.-`         .---` ``.`/::+s/ms````-mo+:`````.--` ````     `sNm`
//  `hsMh`.hymMM:       `-         `          .:+:hy`     od:-`                  .+sM-``
//   o+o/``-/mMM-        .-                ``.```hy`       s.`.`                 -/+M+``
//   .s `./NMMMM-         --            ````  `:ho`        .s`  ```             ./.+My`
//    /: `+MMdMM/          -.  `       `   ..+++-           :d/.             ``:o-`oMy
//     o. .sdNMMm`            `--:://+//.`-///:.           `.ohooo:-.`` `.-:+//:..`hMy
//     `s```.yMMMs                  ```     .y+  `::.:----.-``o:-::/:::--:::-----..mMo
//      :s` `oMNMN-                         :N+  -NNhy/:/sds./:..----------------`/MN
//        +o``-NMNMd`                      `-syyoo++/.++:so/+yN+..--....-..-....--`dM+
//        +:.`oMNNN`                     .:-` `.::.` `--..---/+/---.```........-.:d:
//         ./++Ny::`                   `--`          .--..-----::-..```......---.s.
//           `:os.--`                  .`            `.. ``.------.`.```..-----.:o
//             `h-..`                 ``        .:syy/-/ydho-.--...`````.------.+.
//              +o`.`                        ./ymNNNNNNNmmNNNh:....``.```.-----:s
//              `h-`.                    -/+oyo/:----:---.--:+sso:........--::-+:
//               /d...                 `.++:  -:--/+:/oo+o++-.``--.....-----:-:y
//               `Md:.`                ``     `-:/+ooooo+/-........-----------yo
//                mNNs-`                     `..-/oo+://:/oo:......----------os
//                h:+md:.                  ...``.`         `------.---------++
//               `h..-+ddo.`                            ``.----------------s:
//                h` .--/ydy:`                   `...--------------------+y.
//                h`   ..--+yds+.`               `....----------------:+dN`
//               `y      `.-.-:sdhs:.`    `...````..----------------:smsdm
//               `h         .--..-+ymdy+/:----:----------------.-/shs+.`os
//               `h           `..--..:sdmmhyo/::----------::/+syhy/....`+-
//               -y              `..--..--/oosyyyhhhyyyssoooo/:.`...`.` /-
//               `.                  `..--.......................````   +`
//                                      `...------..-.........``
//                                          ``..-.--........``
//                                               ```..```
```

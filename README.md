# Altered custom card generator
## Langages et arborescence
### Page principale : 
```index.php```

### Fonctions php :
```token_type.php```
> Donnée html pour le type de carte "token"

```update.php```
> Donnée html pour les différents type de cartes

### JS :
```update_form.js```
> script métant a jour dynamiquement les données du formulaire sur la page principale

```update_preview.js```
> script métant a jour la preview de la carte en fonction des options coché dans le formulaire

## Syntax et Commentaires
### Syntaxe des id et classes
```^([a-z]+)([-][a-z]+)*$```

### Syntaxe des varriables
```^([a-z]+)([_][a-z]+)*$```

### Syntaxe fonctions
```^([a-z]+)([A-Z][a-z]+)*$```

### Commentaires
*En cours*

Commentaires de fontions
> ```
> /* @param "parametre" : "description du parametre"
>  * @param...
>  * @ : "descritpion de la fonction"
>  * @return : "type et varriable de retour"
> */
> ```

### TODO
- modify image position
- dinamically make the text zone bigger
- additional types
- add buttons for the hand reserv etc logos
- make the stat radio into buttons
- if token : add a "commun" faction
- add landmarks and reserve lots for heros
- update colors under stats but that's not programation and that's annoying to do

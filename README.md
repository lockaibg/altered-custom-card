# Altered custom card generator
## Quick overview
Altered is a card game created by Equinoxe and published in 2024. As a good TCG fan I've always want to create cards for a game. So before creating the card I'm creating the website that'll allow everyone to invent their own cards.

## Languages and Structure
### Main page : 
```index.php```

### PHP functions :
```token_type.php```
> HTML data for the "token" card type

```update.php```
> HTML data for the different card types

### JavaScript :
```update_form.js```
> script dynamically updating the form data on the main page

```update_preview.js```
> script updating the card preview according to the options checked in the form

```save.js```
> script used to download the card as png

## Syntax and Comments
### ID and class syntax
```^([a-z]+)([-][a-z]+)*$```

### Variable syntax
```^([a-z]+)([_][a-z]+)*$```

### Function syntax
```^([a-z]+)([A-Z][a-z]+)*$```

### Comments
*In progress*

Function comments
> ```
> /* @param "parameter" : "description of the parameter"
> * @param...
> * @ : "description of the function"
> * @return : "type and return variable"
> */
> ```

## TODO
- modify image position / 1
- add landmarks and reserve slots for heros / 2
- find a solution to have the shadow appear on the canvas / 3
- modify set logo / 4

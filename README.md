# Altered custom card generator
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
- modify image position
- additional types
- add buttons for the hand reserv etc logos
- make the stat radio into buttons
- if token : add a "commun" faction
- add landmarks and reserve lots for heros
- update colors under stats but that's not programation and that's annoying to do

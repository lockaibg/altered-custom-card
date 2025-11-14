<?php
    if(isset($_GET["type"])) {
        if($_GET["type"] === "character") {
            ?><div id="additional-token">
                <br/>
                <div class="token-type">
                    <label for="token-type">Type&nbsp;de&nbsp;jeton&nbsp;:&nbsp;</label>
                    <select name="token-type" id="token-type">
                        <option value="character">Personnage</option>
                        <option value="landmark">Lieu</option>
                    </select>
                </div>
                <br/><div class="radio-group">
                <label for="leaf">Feuille</label>
                
                <input type="radio" name="leaf" value="0" checked />
                <input type="radio" name="leaf" value="1"/>
                <input type="radio" name="leaf" value="2"/>
                <input type="radio" name="leaf" value="3"/>
                <input type="radio" name="leaf" value="4"/>
                <input type="radio" name="leaf" value="5"/>
                <input type="radio" name="leaf" value="6"/>
                <input type="radio" name="leaf" value="7"/>
                <input type="radio" name="leaf" value="8"/>
                <input type="radio" name="leaf" value="9"/>
                <input type="radio" name="leaf" value="10"/>    
                </div>
                <div class="radio-group">

                <label for="earth">Terre</label>
                <input type="radio" name="earth" value="0" checked />
                <input type="radio" name="earth" value="1"/>
                <input type="radio" name="earth" value="2"/>
                <input type="radio" name="earth" value="3"/>
                <input type="radio" name="earth" value="4"/>
                <input type="radio" name="earth" value="5"/>
                <input type="radio" name="earth" value="6"/>
                <input type="radio" name="earth" value="7"/>
                <input type="radio" name="earth" value="8"/>
                <input type="radio" name="earth" value="9"/>
                <input type="radio" name="earth" value="10"/>
                </div>
                
                <div class="radio-group">
                <label for="ocean">Mer</label>
                
                <input type="radio" name="ocean" value="0" checked />
                <input type="radio" name="ocean" value="1"/>
                <input type="radio" name="ocean" value="2"/>
                <input type="radio" name="ocean" value="3"/>
                <input type="radio" name="ocean" value="4"/>
                <input type="radio" name="ocean" value="5"/>
                <input type="radio" name="ocean" value="6"/>
                <input type="radio" name="ocean" value="7"/>
                <input type="radio" name="ocean" value="8"/>
                <input type="radio" name="ocean" value="9"/>
                <input type="radio" name="ocean" value="10"/>
                </div>
            <?php
        } else {
            ?><div id="additional-token">
                <br/>
                <div class="token-type">
                    <label for="token-type">Type&nbsp;de&nbsp;jeton&nbsp;:&nbsp;</label>
                    <select name="token-type" id="token-type">
                        <option value="landmark">Repère</option>
                        <option value="character">Personnage</option>
                    </select>
                </div><?php
        }
    }
?>

<?php
    if(isset($_GET["type"])) {
        if(is_array($_GET["type"])) {
            foreach($_GET["type"] as $param) {
                switch($param) {
                    case "stats":
                        ?>
                            <br/>
                            <label for="hand-cost">Hand cost</label>
                            <input type="radio" name="hand-cost" value="0" checked />
                            <label for="0">0</label>
                            <input type="radio" name="hand-cost" value="1"/>
                            <label for="1">1</label>
                            <input type="radio" name="hand-cost" value="2"/>
                            <label for="2">2</label>
                            <input type="radio" name="hand-cost" value="3"/>
                            <label for="3">3</label>
                            <input type="radio" name="hand-cost" value="4"/>
                            <label for="4">4</label>
                            <input type="radio" name="hand-cost" value="5"/>
                            <label for="5">5</label>
                            <input type="radio" name="hand-cost" value="6"/>
                            <label for="6">6</label>
                            <input type="radio" name="hand-cost" value="7"/>
                            <label for="7">7</label>
                            <input type="radio" name="hand-cost" value="8"/>
                            <label for="8">8</label>
                            <input type="radio" name="hand-cost" value="9"/>
                            <label for="9">9</label>
                            <input type="radio" name="hand-cost" value="10"/>
                            <label for="10">10</label>
                            <br/>
                        <?php
                        break;
                    case "token":
                        ?>
                            <br/>
                            <label for="token-type">Token type :</label>
                            <select name="token-type" id="token-type">
                                <option value="character">Character</option>
                                <option value="landmark">Landmark</option>
                            </select>
                            <br/>
                        <?php
                        break;
                } 
            }
        } else {
            switch($_GET["type"]) {
                case "stats":
                    ?><br/>
                        <input type="radio" name="hand-cost" value="0" checked />
                        <label for="0">0</label>
                        <input type="radio" name="hand-cost" value="1"/>
                        <label for="1">1</label>
                        <input type="radio" name="hand-cost" value="2"/>
                        <label for="2">2</label>
                        <input type="radio" name="hand-cost" value="3"/>
                        <label for="3">3</label>
                        <input type="radio" name="hand-cost" value="4"/>
                        <label for="4">4</label>
                        <input type="radio" name="hand-cost" value="5"/>
                        <label for="5">5</label>
                        <input type="radio" name="hand-cost" value="6"/>
                        <label for="6">6</label>
                        <input type="radio" name="hand-cost" value="7"/>
                        <label for="7">7</label>
                        <input type="radio" name="hand-cost" value="8"/>
                        <label for="8">8</label>
                        <input type="radio" name="hand-cost" value="9"/>
                        <label for="9">9</label>
                        <input type="radio" name="hand-cost" value="10"/>
                        <label for="10">10</label>
                    <br/><?php
                    break;
            }         
        }
    }
?>
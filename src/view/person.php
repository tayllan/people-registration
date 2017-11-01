<?php

class PersonView {
    static public function renderJSON($content) {
        header('Content-Type: application/json');
        echo json_encode($content);
    }
}

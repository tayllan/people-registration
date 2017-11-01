<?php

$baseDir = __DIR__ . '/../';
require_once $baseDir . 'model/person.php';
require_once $baseDir . 'view/person.php';

class Person {
    private $db;

    function __construct() {
        $this->db = new PDO('mysql:host=localhost;dbname=cross_knowledge;charset=utf8mb4', 'USER', 'PASSWORD');
    }

    public function show() {
        $statement = $this->db->query('SELECT * FROM person');

        $people = [];
        foreach ($statement->fetchAll(PDO::FETCH_ASSOC) as $values) {
            $people[] = new PersonModel($values);
        }

        PersonView::renderJSON($people);
    }

    public function edit($params) {
        $person = new PersonModel($params);

        if ($person->id == 0) {
            $this->save($person);
        } else {
            $sql = 'UPDATE person SET name = :name, last_name = :last_name, address = :address WHERE id = :id';
            $statement = $this->db->prepare($sql);
            $statement->bindParam(':name', $person->name, PDO::PARAM_STR);
            $statement->bindParam(':last_name', $person->last_name, PDO::PARAM_STR);
            $statement->bindParam(':address', $person->address, PDO::PARAM_STR);
            $statement->bindParam(':id', $person->id, PDO::PARAM_INT);
            $success = $statement->execute();

            PersonView::renderJSON(['success' => $success]);
        }
    }

    private function save($person) {
        $sql = 'INSERT INTO person (name, last_name, address) VALUES (:name, :last_name, :address)';
        $statement = $this->db->prepare($sql);
        $statement->bindParam(':name', $person->name, PDO::PARAM_STR);
        $statement->bindParam(':last_name', $person->last_name, PDO::PARAM_STR);
        $statement->bindParam(':address', $person->address, PDO::PARAM_STR);
        $success = $statement->execute();

        $newId = 0;
        if ($success) {
            $statement = $this->db->query('SELECT MAX(id) AS id FROM person');
            $newId = $statement->fetch(PDO::FETCH_ASSOC)['id'];
        }

        PersonView::renderJSON(['success' => $success, 'id' => $newId]);
    }

    public function delete($params) {
        $sql = 'DELETE FROM person WHERE id = :id';
        $statement = $this->db->prepare($sql);
        $statement->bindParam(':id', $params['id'], PDO::PARAM_INT);
        $success = $statement->execute();

        PersonView::renderJSON(['success' => $success]);
    }
}

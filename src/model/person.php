<?php

class PersonModel implements JsonSerializable {
    public $id;
    public $name;
    public $last_name;
    public $address;

    function __construct($params) {
        $this->id = $params['id'];
        $this->name = $params['name'];
        $this->last_name = $params['last_name'];
        $this->address = $params['address'];
    }

    public function jsonSerialize() {
        return [
            'id' => $this->id,
            'name' => $this->name,
            'last_name' => $this->last_name,
            'address' => $this->address
        ];
    }
}

# People Registration

A really simple Single Page Application to register users to the database.

This project was tested under `PHP@5.5.9` and `MySQL@5.5.57`.

## Run

To run the project locally you must first run `script.sql` to create the database:

```
mysql -u [USER] -p < scripts.sql
```

Alter `src/controller/person.php`, filling your MySQL USER and PASSWORD.

And then run:

```
php -S localhost:8888 -t public/
```

Afterwards, you can open it at `http://localhost:8888`.

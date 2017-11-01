$(document).ready(function() {
    var $people = $('#people');
    var $newPerson = $('#new-person');

    var getTableRowHTML = function(person) {
        return '<tr data-id="' + person.id + '">' +
            '<td class="name">' + person.name + '</td>' +
            '<td class="last-name">' + person.last_name + '</td>' +
            '<td class="address">' + person.address + '</td>' +
            '<td class="event-buttons">' +
                '<button class="edit-person">Edit</button> ' +
                '<button class="delete-person">Delete</button>' +
            '</td>' +
        '</tr>';
    };

    var getTableRowjQueryElement = function(personId) {
        return $('#people tbody tr[data-id="' + personId + '"]');
    };

    var editPerson = function(personId) {
        var $tableRow = getTableRowjQueryElement(personId);

        var $tableRowName = $tableRow.find('.name');
        $tableRowName.html('<input type="text" value="' + $tableRowName.html() + '">');

        var $tableRowLastName = $tableRow.find('.last-name');
        $tableRowLastName.html('<input type="text" value="' + $tableRowLastName.html() + '">');

        var $tableRowAddress = $tableRow.find('.address');
        $tableRowAddress.html('<input type="text" value="' + $tableRowAddress.html() + '">');

        var $tableRowEventButtons = $tableRow.find('.event-buttons');
        $tableRowEventButtons.html('<button class="save-person">Save</button>');
    };

    var savePerson = function(personId) {
        var $tableRow = getTableRowjQueryElement(personId);
        var tableRowNameVal = $tableRow.find('.name input').val();
        var tableRowLastNameVal = $tableRow.find('.last-name input').val();
        var tableRowAddressVal = $tableRow.find('.address input').val();
        var newData = {
            id: personId,
            name: tableRowNameVal,
            last_name: tableRowLastNameVal,
            address: tableRowAddressVal,
        }

        $.ajax({
            method: 'POST',
            url: '/index.php/person/edit',
            data: newData
        }).done(function(data) {
            if (data.success) {
                if (personId == 0) {
                    personId = data.id;
                    $tableRow.attr('data-id', personId);
                }

                var $tableRowName = $tableRow.find('.name');
                $tableRowName.html(tableRowNameVal);

                var $tableRowLastName = $tableRow.find('.last-name');
                $tableRowLastName.html(tableRowLastNameVal);

                var $tableRowAddress = $tableRow.find('.address');
                $tableRowAddress.html(tableRowAddressVal);

                var $tableRowEventButtons = $tableRow.find('.event-buttons');
                $tableRowEventButtons.html(
                    '<button class="edit-person">Edit</button> ' +
                    '<button class="delete-person">Delete</button>'
                );
            }
        });
    };

    var deletePerson = function(personId) {
        var personName = getTableRowjQueryElement(personId).find('.name').html();
        if (window.confirm('Do you really want to delete "' + personName + '"')) {
            $.ajax({
                method: 'POST',
                url: '/index.php/person/delete',
                data: {id: personId}
            }).done(function(data) {
                if (data.success) {
                    var $tableRow = getTableRowjQueryElement(personId);
                    $tableRow.remove();
                }
            });
        }
    };

    $people.on('click', 'button.edit-person', function(e) {
        editPerson($(this).closest('tr[data-id]').attr('data-id'));
    });

    $people.on('click', 'button.save-person', function(e) {
        $newPerson.prop('disabled', false);
        $newPerson.removeClass('disabled');
        savePerson($(this).closest('tr[data-id]').attr('data-id'));
    });

    $people.on('click', 'button.delete-person', function(e) {
        deletePerson($(this).closest('tr[data-id]').attr('data-id'));
    });

    $newPerson.click(function(e) {
        $(this).attr('disabled', true);
        $(this).addClass('disabled');
        $('#people tbody').append(getTableRowHTML({
            id: 0,
            name: '',
            last_name: '',
            address: ''
        }));
        editPerson(0);
    });

    $.ajax({
        method: 'GET',
        url: '/index.php/person'
    }).done(function(data) {
        var $tableBody = $('#people tbody');
        var dataLength = data.length;
        for (var i = 0; i < dataLength; i++) {
            $tableBody.append(getTableRowHTML(data[i]));
        }
    });
});

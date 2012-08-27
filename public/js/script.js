var appendNewRoom = function(room) {
    $('#room-list').prepend($('<li />', {
        id: 'room-' + room.id,
        'class' : 'room',
        html : $('<a />', {
            href : ['',now.user,room.id].join('/'),
            text : 'Room: ' + room.name,
            target: '_blank'
        })
    }));
};

now.ready(function () {
    now.getAllRooms(function(rooms) {
        rooms.forEach(appendNewRoom);
    });
    console.log('got all rooms');

    now.user = $('input[name=username]').val();

    $('#create-room').click(function() {
        var roomName = prompt('Room name');
        now.createRoom(roomName, function onRoomCreated(room) {
            console.log('room created', room);
            appendNewRoom(room);
        });
    });


    $('#indicator').removeClass('loading');
});
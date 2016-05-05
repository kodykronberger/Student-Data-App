// Finds a student by their index in the data
function findStudent(id) {
    if (isNaN(id) || id.length == 0 || id == "") {
        return alert("Please enter a valid id.")
    }

    var url = "students/" + id;
    
    // Disable button while searching.
    $("#findbtn").addClass("disabled");
    
    $.getJSON({
        "url": url,
        "success": function (data) {
            $("#name-output").html("<strong>Name: </strong>" + data[0]);
            $("#score-output").html("<strong>Score: </strong>" + data[1]);
            $("#findbtn").removeClass("disabled");
        },
        "error": function (err) {
            return alert("Student could not be found.");
            $("#findbtn").removeClass("disabled");
        }
    });
}

// Finds all students in the data
function findAllStudents() {
    var url = "students";
    $.getJSON({
        "url": url,
        "success": function ( data ) {
            var listElements = [];
            for(var i = 0; i < data.length; i++) {
                listElements.push(createListElement(data[i]));
            }
            addStudentsToList(listElements);
        },
        "error": function (err) {
            return alert("Students could not be found.");
        }
    });
}

// Creates a single bootstrap list element for a data object
function createListElement( obj ) {
    var item = $("<li class='list-group-item'>"),
        name = obj[0],
        score = obj[1];
    
    var html = "<strong>Name: </strong>" + name + ", <strong>Score: </strong>" + score;
    
    item.html(html);
    
    return item;
}

// Adds elements to the UL
function addStudentsToList(elements) {
    $("#all-students").empty();
    for(var i = 0; i < elements.length; i++) {
        $("#all-students").append(elements[i]);
    }
}
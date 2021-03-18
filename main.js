var listCourseBlock = document.querySelector('#list-course');
var courseAPI  = 'http://localhost:3000/course';

function start() {
    getCourses(renderCourse);
    handelCreateForm();
}

start();

//Functions
function getCourses(callback) {
    fetch(courseAPI)
        .then(response => {
            return response.json();
        })
        .then(callback);
}


function renderCourse(courses) {
    var html = courses.map(course => {
        return `<li> 
                    <h3>${course.name}</h3>
                    <p>${course.description}</p>
                </li>`
    })
    listCourseBlock.innerHTML = html.join('');
}

function createCourse(data, callback) {
    fetch(courseAPI, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
            // 'Content-Type': 'application/x-www-form-urlencoded',
          },
        body: JSON.stringify(data)
    })
        .then(response => {
            return response.json()
        })
        .then(callback)

}
function handelCreateForm() {
    var createBtn   = document.querySelector('#create-btn');
    createBtn.addEventListener('click', function() {
        var name = document.querySelector('input[name = "name"]').value;
        var description = document.querySelector('input[name = "description"]').value;
        
        var newData = {
            name: name,
            description: description
        };
        createCourse(newData);
    });
   
}
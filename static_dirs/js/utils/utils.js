function getCookie(name) {
    // Split the cookie string and iterate over individual cookies
    const cookieArray = document.cookie.split(';');
    for (let i = 0; i < cookieArray.length; i++) {
        const cookie = cookieArray[i].trim();
        // Check if the cookie starts with the specified name
        if (cookie.startsWith(name + '=')) {
            // Return the value of the cookie
            return cookie.substring(name.length + 1);
        }
    }
    // Return null if the cookie is not found
    return null;
}

function send_request(days, type, field_name, user, func) {
    // toastr.info('Are you the 6 fingered man?')
    let requestOptions = {
        method: 'POST', headers: {
            'X-CSRFToken': getCookie('csrftoken'), 'Content-Type': 'application/json',
        }, credentials: 'same-origin', body: JSON.stringify({
            days: days, type: type, field_name: field_name, user: user,
        })
    };
    fetch('/render_chart/', requestOptions)
        .then(response => response.json())
        .then(data => {
            func(data)
        })
        .catch(error => {
            console.log(error)
        })
}

function restart_service() {
    let requestOptions = {
        method: 'POST', credentials: 'same-origin', headers: {
            'X-CSRFToken': getCookie('csrftoken'), 'Content-Type': 'application/json',
        },
    };
    let msg = "If you sure about restart, Please press the ok button and wait for result."

    if (confirm(msg)) {
        fetch('/restart_service/', requestOptions)
            .then(response => response.json())
            .then(data => {
                console.log(data)
                window.location.reload()
            })
            .catch(error => {
                console.log(error)
                window.location.reload()
            })
    }
}
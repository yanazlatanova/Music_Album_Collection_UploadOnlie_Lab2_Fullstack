// Get all albums
async function getAll() {
    return await fetch('api/albums/')
        .then(response => response.json());
}

// Get by id
async function getById(id) {
    return await fetch(`api/albums/id/${id}`)
        .then(response => response.json());
}

// Get by title
async function getByTitle(title) {
    return await fetch(`api/albums/${title}`)
        .then(response => response.json());
}

// Add new album - create
async function add(details) {
    return await fetch('api/albums/', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(details)
    });
}

// Edit albums - upate
async function update(details, id) {
    return await fetch(`api/albums/${id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(details)
    });
}

// Remove an album
async function remove(id) {
    return await fetch(`api/albums/${id}`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json'
        }
    });
}

// module.exports = { getAll, getByTitle, add, update, remove };

export { getAll, getById, add, update, remove  }
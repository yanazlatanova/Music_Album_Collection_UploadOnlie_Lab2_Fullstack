import { getAll, getById, add, update, remove } from "./fetchAPI.js";
import { getTableItem, getDetailsHTML, getEditFormHTML } from "./modules.js";

const infoDisplay = document.getElementById('album-creation-error');
const editDiv = document.getElementById('edit-div');
let detailsTable = document.getElementById('details-table');

const title_InputField = document.getElementById('album-title');
const artist_InputField = document.getElementById('album-artist');
const year_InputField = document.getElementById('album-year');



window.onload = loadAlbumTable; // execute this function when the page is loading

async function updatePageContent() {
    detailsTable.innerHTML = ""; // Remove the details block
    editDiv.innerHTML = ''; // Remove the edit block
    loadAlbumTable(); // Reload the table
}

async function loadAlbumTable() {

    let myTable = document.getElementById('album-table');
    myTable.innerHTML = `
        <tr><th colspan="7">Albums</th></tr>
        <tr>
            <th>ID</th>
            <th>Title</th>
            <th>Artist</th>
            <th>Year</th>
            <th>Details</th>
            <th>Edit</th>
            <th>Delete</th>
        </tr>`;

    const data = await getAll();

    let contentHtml = "";
    data.map((album) => {
        contentHtml += getTableItem(album);
    })

    // Add html content to the table
    myTable.innerHTML += contentHtml;

    // Button EventListeners
    // View
    document.querySelectorAll('.btn-view').forEach(button => {
        button.addEventListener('click', () => {
            editDiv.innerHTML = '';
            loadDetails(button.dataset.id)
        });
    });

    // Edit
    document.querySelectorAll('.btn-edit').forEach(button => {
        button.addEventListener('click', () => {
            detailsTable.innerHTML = "";
            loadEditField(button.dataset.id)
        });
    });

    // Delete
    document.querySelectorAll('.btn-delete').forEach(button => {
        button.addEventListener('click', () => {
            deleteAlbum(button.dataset.id)
        });
    });

}

document.getElementById('create-album-form').addEventListener('submit', event => {
    event.preventDefault();
    addAlbum()
    // Empty the fileds
    title_InputField.value = '';
    artist_InputField.value = '';
    year_InputField.value = '';
});

async function loadDetails(albumId) {
    detailsTable.innerHTML = `
        <tr><th colspan="5">Album Details</th></tr>
        <tr>
            <th>ID</th>
            <th>Title</th>
            <th>Artist</th>
            <th>Year</th>
            <th>__v</th>
        </tr>
    `;

    const album = await getById(albumId);

    let contentHtml = getDetailsHTML(album);

    detailsTable.innerHTML += contentHtml;
}

async function loadEditField(albumId) {
    const album = await getById(albumId)

    editDiv.innerHTML = getEditFormHTML(album);

    document.getElementById('edit-album-form').addEventListener('submit', event => {
        event.preventDefault();
        editAlbum()
    });
}

async function addAlbum() {
    const newAlbum = {
        title: title_InputField.value,
        artist: artist_InputField.value,
        year: parseInt(year_InputField.value)
    }

    const response = await add(newAlbum); // http the response 
    const data = await response.json();

    displayMsg((response.status !== 201) ? data.error : 'Successfully added');

    await updatePageContent();
}

async function editAlbum() {
    const albumId = document.getElementById('album-id-edit').textContent;

    const album = {
        title: document.getElementById('album-title-edit').value,
        artist: document.getElementById('album-artist-edit').value,
        year: parseInt(document.getElementById('album-year-edit').value)
    }

    const response = await update(album, albumId);
    const data = await response.json();

    displayMsg((response.status !== 200) ? data.error : 'Successfully updated')

    if (response.status === 200) {
        // editDiv.innerHTML = '';
        await updatePageContent();
    }
}

async function deleteAlbum(albumId) {
    const response = await remove(albumId);
    const data = await response.json()

    displayMsg((response.status !== 200) ? data.error : 'Successfully removed')

    await updatePageContent();
}

function displayMsg(msg) {
    infoDisplay.innerHTML = msg;

    // The msg will disappear soon
    setTimeout(() => {
        infoDisplay.innerHTML = '';
    }, 2000);
}



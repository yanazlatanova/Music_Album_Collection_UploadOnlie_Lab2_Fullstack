const getTableItem = (album) => {
    return `
    <tr>
    <td>${album._id}</td>
    <td>${album.title}</td>
    <td>${album.artist}</td>
    <td>${album.year}</td>
    <td><button type="button" class="btn-view" data-id ="${album._id}"> View</button></td>
    <td><button type="button" class="btn-edit" data-id ="${album._id}">Edit</button></td>
    <td><button type="button" class="btn-delete" data-id ="${album._id}">Delete</button></td>
    </tr>`;
}

const getDetailsHTML = (album) => {
    return `
    <tr>
    <td>${album._id}</td>
    <td>${album.title}</td>
    <td>${album.artist}</td>
    <td>${album.year}</td>
    <td>${album.__v}</td>
    </tr>`;
}

const getEditFormHTML = (album) => {
    return `
        <div id="album-id-edit" style="visibility: hidden">${album._id}</div>
        <form id="edit-album-form">
            <h3>Edit Album</h3>
            <label for="album-title"></label>
            <input type="text" id="album-title-edit" value = "${album.title}">

            <label for="album-artist"></label>
            <input type="text" id="album-artist-edit" value = ${album.artist}>

            <label for="album-year"></label>
            <input type="number" id="album-year-edit" value = ${album.year}>

            <button type="submit">EDIT</button>
        </form>
        `;
}

export { getTableItem, getDetailsHTML, getEditFormHTML }
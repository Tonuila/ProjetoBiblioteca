document.addEventListener("DOMContentLoaded", function () {
    loadBooks();
});

function loadBooks() {
    const bookList = document.getElementById("bookList");

    fetch("http://localhost:8080/api/books")
        .then(response => response.json())
        .then(data => {
            bookList.innerHTML = ""; 

            data.forEach(book => {
                addBookToTable(book);
            });
        })
        .catch(error => console.error("Error fetching books:", error));
}
function changeStatus(id) {
    const status = prompt("Digite o novo status (LOCATED, AVAILABLE, UNAVAILABLE):");

    if (status !== null && status.trim() !== "") {
        const newStatus = status.toUpperCase();

        fetch(`http://localhost:8080/api/books/${id}/status?newStatus=${newStatus}`, {
            method: "PUT",
        })
            .then(() => {
                loadBooks();
            })
            .catch(error => console.error("Error changing status:", error));
    }
}

function addBookToTable(book) {
    const bookList = document.getElementById("bookList");

    const row = document.createElement("tr");
    row.innerHTML = `
        <td>${book.title}</td>
        <td>${book.author}</td>
        <td>${book.status}</td>
        <td>
            <button onclick="editBook(${book.id}, '${book.title}', '${book.author}')">Editar</button>
            <button onclick="deleteBook(${book.id})">Deletar</button>
            <button onclick="changeStatus(${book.id})">Alterar Status</button>
        </td>
    `;

    bookList.appendChild(row);
}

function addOrUpdateBook() {
    const title = document.getElementById("title");
    const author = document.getElementById("author");
    const bookId = document.getElementById("bookId");

    if (!title || !author) {
        console.error("One or more elements not found");
        return;
    }

    function changeStatus(id) {
        const status = prompt("Digite o novo status (LOCATED, AVAILABLE, UNAVAILABLE):");

        if (status !== null && status.trim() !== "") {
            const newStatus = status.toUpperCase(); 
            fetch(`http://localhost:8080/api/books/${id}/status?newStatus=${newStatus}`, {
                method: "PUT",
            })
                .then(() => {
                    loadBooks();
                })
                .catch(error => console.error("Error changing status:", error));
        }
    }

    const titleValue = title.value;
    const authorValue = author.value;
    const bookIdValue = bookId.value;

    if (bookIdValue) {
        updateBook(bookIdValue, titleValue, authorValue);
    } else {
        addBook(titleValue, authorValue);
    }
}

function addBook(title, author) {
    fetch("http://localhost:8080/api/books", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            title: title,
            author: author,
        }),
    })
        .then(response => response.json())
        .then(data => {
            addBookToTable(data);
            clearForm();
        })
        .catch(error => console.error("Error adding book:", error));
}

function updateBook(id, title, author) {
    fetch(`http://localhost:8080/api/books/${id}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            title: title,
            author: author,
        }),
    })
        .then(() => {
            loadBooks();
            clearForm();
        })
        .catch(error => console.error("Error updating book:", error));
}

function editBook(id, title, author) {
    document.getElementById("title").value = title;
    document.getElementById("author").value = author;
    document.getElementById("bookId").value = id;
}

function deleteBook(id) {
    fetch(`http://localhost:8080/api/books/${id}`, {
        method: "DELETE",
    })
        .then(() => {
            loadBooks();
            clearForm();
        })
        .catch(error => console.error("Error deleting book:", error));
}

function clearForm() {
    document.getElementById("title").value = "";
    document.getElementById("author").value = "";
    document.getElementById("bookId").value = "";
}

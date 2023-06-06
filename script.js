let myLibrary = [];
let card;
let formVisible = false;

const newBookBtn = document.querySelector('#new-book');
const goBackBtn = document.querySelector('#go-back');
const formContainer = document.querySelector('#form-container');
showForm();
const titleInput = document.querySelector('#title');
const authorInput = document.querySelector('#author');
const pagesInput = document.querySelector('#pages');
const statusInput = document.querySelector('#status');
const addBtn = document.querySelector('#save-book');
const cardsContainer = document.querySelector("#cards-container");


//Button to show a form for adding new book to the library
newBookBtn.addEventListener('click', () => {
    formVisible = true;
    showForm();
});

//Cancel button for showing book form
goBackBtn.addEventListener('click', () => {
    formVisible = false;
    showForm();
    clearInput();
});

//Toggle function to show or hide the form
function showForm() {
    if (formVisible == true) {
        formContainer.setAttribute("style", "display: box");
        newBookBtn.setAttribute('style', 'display: none');
        goBackBtn.setAttribute('style', 'display: box');
    } else if (formVisible == false) {
        formContainer.setAttribute('style', 'display: none');
        newBookBtn.setAttribute('style', 'display: box');
        goBackBtn.setAttribute('style', 'display: none');
    };
};

// Class object constructor
class Book {
    constructor (title, author, pages, bookStatus) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.bookStatus = bookStatus;
 }
};

// // Book object constructor
// function Book(title, author, pages, bookStatus) {
//     this.title = title,
//     this.author = author,
//     this.pages = pages,
//     this.bookStatus = bookStatus
// };

//Function to push book into the library and make it visible on the screen
function addBookToLibrary(bookName) {
    bookName = new Book(titleInput.value, authorInput.value, pagesInput.value, statusInput.checked);
    myLibrary.push(bookName);
    createCards(myLibrary);
    
};

//Button that adds book to the library, hides form and makes books visible on the screen
addBtn.addEventListener('click', (event) => {
    event.preventDefault();
    addBookToLibrary();
    formVisible = false;
    showForm();
    clearInput();
});

//Adding some default books to the library
const defaultBook1 = new Book('Crime and Punishment', 'Fyodor Dostoevsky', '448', false );
const defaultBook2 = new Book('The Catcher in the Rye', 'J. D. Salinger', '234', false );
myLibrary.push(defaultBook1, defaultBook2);
createCards(myLibrary);

//Function that makes books visible on the screen by creating DOM elements
function createCards(myLibrary) {

    cardsContainer.replaceChildren();
    myLibrary.forEach((book, index) => {

        //Make a card container and adding toggle styles to it to show if the book is read or not
        card = document.createElement('div');
        cardsContainer.appendChild(card);
        card.classList.add('card'); 
        card.setAttribute('data', `${index}`);
        card.classList.add(book.bookStatus ? "card-read" : "card-unread");
        
        //Creating element with the name of the book
        title = document.createElement('div');
        card.appendChild(title);
        title.classList.add('card-property');
        title.classList.add('card-title');
        title.textContent = (`"${book.title}"`);

        //Creating element with the author of the book
        author = document.createElement('div');
        card.appendChild(author);
        author.classList.add('card-property');
        author.classList.add('card-author');
        author.textContent = (`by ${book.author}`);

        //Creating element with the pages of the book
        pages = document.createElement('div');
        card.appendChild(pages);
        pages.classList.add('card-property');
        pages.classList.add('card-pages');
        pages.textContent = (`${book.pages} pages`);

        //Creating a container for status, delete and edit buttons for styling
        cardBtnContainer = document.createElement('div');
        card.appendChild(cardBtnContainer);
        cardBtnContainer.classList.add('card-btn-container');

        //Creating a status of the book button with toggle status and classes
        //Adding toggle status function for event handling
        statusBtn = document.createElement('button');
        statusBtn.textContent = book.bookStatus ? "Read" : "Unread";
        statusBtn.classList.add(book.bookStatus ? "read" : "unread");
        cardBtnContainer.appendChild(statusBtn);
        statusBtn.addEventListener('click', statusToggle);
        
        //Creating a delete button to remove a book from library array and from the screen
        deleteBtn = document.createElement('button');
        cardBtnContainer.appendChild(deleteBtn);
        deleteBtn.classList.add('card-button');
        deleteBtn.classList.add('cardDelBtn');
        delIcon = document.createElement('img');
        delIcon.setAttribute('src', 'icons/trash-can-outline.svg');
        deleteBtn.appendChild(delIcon);
        delIcon.classList.add('card-icon');
        deleteBtn.addEventListener('click', () => {
            deleteCard(index);
            createCards(myLibrary);
        });

        //Creating an edit button that the deletes a book from library array, makes your old inputs visible and adds edited book to a library
        editBtn = document.createElement('button');
        cardBtnContainer.appendChild(editBtn);
        editBtn.classList.add('card-button');
        editBtn.classList.add('cardEdBtn');
        editIcon = document.createElement('img');
        editIcon.setAttribute('src', 'icons/pencil-outline.svg');
        editBtn.appendChild(editIcon);
        editIcon.classList.add('card-icon');
        editBtn.addEventListener('click', () => {
            titleInput.value = myLibrary[index].title;
            authorInput.value = myLibrary[index].author;
            pagesInput.value = myLibrary[index].pages;
            statusInput.checked = myLibrary[index].status;
            formVisible = true;
            showForm();
            goBackBtn.setAttribute('style', 'display: none');
            deleteCard(index);
            console.log(myLibrary);
            createCards(myLibrary);
        });
    });
};

//A function to toggle the status of targeted button and card, and to toggle the book status of the targeted book object
function statusToggle(event) {
    const button = event.target;
    const indexValue = button.parentNode.parentNode.getAttribute('data');
    if (button.classList[0] === "read") {
        button.classList.remove("read");
        button.classList.add("unread");
        button.textContent = "Not read";
        myLibrary[indexValue].bookStatus = false;
        button.parentNode.parentNode.classList.add('card-unread');
        button.parentNode.parentNode.classList.remove('card-read');
    } else {
        button.classList.remove("unread");
        button.classList.add("read");
        button.textContent = "Read";
        myLibrary[indexValue].bookStatus = true;
        button.parentNode.parentNode.classList.add('card-read');
        button.parentNode.parentNode.classList.remove('card-unread');

    };
};

//A function to delete the cards
function deleteCard(index) {
    myLibrary.splice(index, 1);
};

//A function to clear the input (pretty obvious lol)
function clearInput() {
    titleInput.value = ('');
    authorInput.value = ('');
    pagesInput.value = ('');
    statusInput.checked = false;
};
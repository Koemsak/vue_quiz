new Vue ({
    el: "#app",
    data: {
        books: [],
        author_id: null,
        title: '',
        body: '',
        isEdit: false,
        id: null
    },
    methods: {
        getBook() {
            let url = "http://127.0.0.1:3000/api/book";
            window.axios.get(url).then(response => {
                this.books = response.data.data;
                
            });
        },
        createBook() {
            let url = "http://127.0.0.1:3000/api/book";
            let data = {
                author_id: parseInt(this.author_id),
                title: this.title,
                body: this.body,
            }
            window.axios.post(url, data).then(response => {
                this.books = response.data.data;
                this.getBook();
            });
        },
        deleteBook(book) {
            let id = book.id;
            let url = "http://127.0.0.1:3000/api/book/";
            window.axios.delete(url + id).then(response => {
                this.getBook();
            });
        },
        updateBook() {
            let url = "http://127.0.0.1:3000/api/book/";

            let newData = {
                author_id: parseInt(this.author_id),
                title: this.title,
                body: this.body,
            }
            window.axios.put(url + this.id, newData).then(response => {
                this.getTodo();
            })
            this.isEdit = false;
        },
        clickEdit(book) {
            this.id = book.id
            this.author_id = book.author_id;
            this.title = book.title;
            this.body = book.body;
            this.isEdit = true;

        }
    },
    mounted: function() {
        this.getBook();
    },
})
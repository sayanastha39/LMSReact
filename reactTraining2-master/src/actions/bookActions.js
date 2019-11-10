//dispatcher is flux module
import Dispatcher from '../dispatcher/appDispatcher';
//axios for ajax; uses http request
import axios from 'axios'

//started is for spinner
const BooksActions = {
    readBooks: function(){
        Dispatcher.dispatch({
            actionType: 'read_books_started'
        });

        // axious.get return promise which is object either success or failure
        //if success goes to then;  fail: catch
        //dispatch action type that are defined in store along with data id successs here
        //success once data is displayed
        axios.get(`http://localhost:3000/book`)
        .then(res => {
            Dispatcher.dispatch({
                actionType: 'read_books_successful',
                data:  res.data
            });
        })
        .catch( (error) => {
            console.log(error);
            Dispatcher.dispatch({
                actionType: 'read_books_failure'
            });
        });
    },


    createBooks: function(book){
        Dispatcher.dispatch({
            actionType: 'create_books_started'
        });

      axios.post(`http://localhost:3000/book`, book)
        .then(res => {
            Dispatcher.dispatch({
                actionType: 'create_books_successful',
                data: 
                {
                    bookId: res.data.insertId,
                    title: book.title,
                    authId: book.authId,
                    pubId: book.pubId
                }
            });
        })
        .catch( (error) => {
            console.log(error);
            Dispatcher.dispatch({
                actionType: 'create_books_failure'
            });
        });
    },

    deleteBooks: function(bookId){
        Dispatcher.dispatch({
            actionType: 'delete_books_started'
        });

      axios.delete(`http://localhost:3000/book/${bookId}`)
        .then(() => {
            Dispatcher.dispatch({
                actionType: 'delete_books_successful',
                data: bookId
            });
        })
        .catch( (error) => {
            console.log(error);
            Dispatcher.dispatch({
                actionType: 'delete_books_failure'
            });
        });
    },

    updateBooks: function(book){
        Dispatcher.dispatch({
            actionType: 'update_books_started'
        });

      axios.put(`http://localhost:3000/book/${book.bookId}`, book)
        .then(() => {
            Dispatcher.dispatch({
                actionType: 'update_books_successful',
                data:book
            });
        })
        .catch( (error) => {
            console.log(error);
            Dispatcher.dispatch({
                actionType: 'update_books_failure'
            });
        });
    }
}

module.exports = BooksActions;
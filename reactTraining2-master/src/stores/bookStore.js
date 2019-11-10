import Dispatcher from '../dispatcher/appDispatcher';
import {EventEmitter} from 'events';


//data representation of our model is store
const CHANGE_EVENT = 'change';


//anything with _ means it is private
//err is keeping all errors
let _bookStore = {
    book:{
        bookList: [],
        readState:{
            pending:false,
            success:false,
            failure:false
        },
        createState:{
            pending:false,
            success:false,
            failure:false
        },
        deleteState:{
            pending:false,
            success:false,
            failure:false
        },
        updateState:{
            pending:false,
            success:false,
            failure:false
        },
        error: ''
    }
};

class BookStoreClass extends EventEmitter{

    //checking if event is happening 
    addChangeListener(cb){
        this.on(CHANGE_EVENT, cb);
    }

    //after done with operation; u want to remove listener once done
    removeChangeListener(cb){
        this.removeListener(CHANGE_EVENT, cb);
    }

    //when store has change in data it has to notify listener
    emitChange(){
        this.emit(CHANGE_EVENT);
    }

    //getting all the state of the one above
    getAllBooks(){
        return _bookStore.book;
    }

    //reset the state to previous state value once completed
    resetReadState(){
        _bookStore.book.readState = {
            pending:false,
            success:false,
            failure:false
          }
    }

    resetCreateState(){
        _bookStore.book.createState = {
            pending:false,
            success:false,
            failure:false
          }
    }

    resetDeleteState(){
        _bookStore.book.deleteState = {
            pending:false,
            success:false,
            failure:false
          }
    }

    resetUpdateState(){
        _bookStore.book.updateState = {
            pending:false,
            success:false,
            failure:false
          }
    }
}


//const so taht refrence does not change
const BookStore = new BookStoreClass();

//dispatcher registers store and paths an action to store saying somethin got resolved

//server got rejected ot other things or like something is pending 

//get data frommajax call

Dispatcher.register( (action) => {

    switch (action.actionType){
        case 'read_books_successful':
            BookStore.resetReadState();
            _bookStore.book.bookList = action.data;
            _bookStore.book.readState.success = true;
            BookStore.emitChange();
            break;
        case 'read_books_failure':
            BookStore.resetReadState();
            _bookStore.book.readState.failure = true;
            BookStore.emitChange();
            break;
        case 'read_books_started':
            BookStore.resetReadState();
            _bookStore.book.readState.pending = true;
            BookStore.emitChange();
            break;
        case 'create_books_successful':
            BookStore.resetCreateState();
            _bookStore.book.bookList.push(action.data);
            _bookStore.book.createState.success = true;
            BookStore.emitChange();
            break;
        case 'create_books_failure':
            BookStore.resetCreateState();
            _bookStore.book.createState.failure = true;
            BookStore.emitChange();
            break;
        case 'create_books_started':
            BookStore.resetCreateState();
            _bookStore.book.createState.pending = true;
            BookStore.emitChange();
            break;
        case 'delete_books_successful':
            BookStore.resetDeleteState();
            _bookStore.book.bookList=  _bookStore.book.bookList.filter(
                ele => ele.bookId != action.data);
            _bookStore.book.deleteState.success = true;
            BookStore.emitChange();
            break;


        case 'delete_books_failure':
            BookStore.resetDeleteState();
            _bookStore.book.deleteState.failure = true;
            BookStore.emitChange();
            break;


        case 'delete_books_started':
            BookStore.resetDeleteState();
            _bookStore.book.deleteState.pending = true;
            BookStore.emitChange();
            break;

        case 'update_books_successful':
                BookStore.resetUpdateState();
                _bookStore.book.bookList.forEach(ele => {if(ele.bookId== action.data.bookId){
                    ele.title = action.data.title;
                    ele.authId = action.data.authId;
                    ele.pubId = action.data.pubId;
                 }} )
                _bookStore.book.updateState.success = true;
                BookStore.emitChange();
                break;
        case 'update_books_failure':
                BookStore.resetUpdateState();
                _bookStore.book.updateState.failure = true;
                BookStore.emitChange();
                break;
        case 'update_books_started':
                BookStore.resetUpdateState();
                _bookStore.book.updateState.pending = true;
                BookStore.emitChange();
                break;
        default:
            return;
    }
} );

export default BookStore;
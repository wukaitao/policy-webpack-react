import {createStore,applyMiddleware} from 'redux';
import thunk from 'redux-thunk';
import reducer from '../reducers/index.js';

//applyMiddleware来自redux可以包装store的dispatch
//thunk作用是使被dispatch的function会接受dispatch作为参数,并且可以异步调用它
const createStoreWithMiddleware = applyMiddleware(thunk)(createStore);

export default function configureStore(initialState){
	const store = createStoreWithMiddleware(reducer,initialState);
	
	//热替换选项
	if(module.hot){
		module.hot.accept('../reducers',()=>{
			const nextReducer = require('../reducers');
			store.replaceReducer(nextReducer);
		});
	};
	return store;
};
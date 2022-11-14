const { legacy_createStore } = require("redux")
const allRecipesData = require('./data.js')

//state
const initialState = {
  allRecipes: [],
  favoriteRecipes: [],
  searchTerm: ''
}

//actions
// allRecipes
const loadData = () => {
  return {
    type: 'allRecipes/loadData',
    payload: allRecipesData
  }
}

//favoriteRecipes
const addRecipe = (recipe) => {
  return{
    type: 'favoriteRecipes/addRecipe',
    payload: recipe
  }
}

const removeRecipe = (recipe) => {
  return{
    type: 'favoriteRecipes/removeRecipe',
    payload: recipe
  }
}

//searchTerm
const setSearchTerm = (term) => {
    return {
        type:'searchTerm/setSearchTerm',
        payload:term
    }
}

const clearSearchTerm = () => {
    return {
        type:'searchTerm/clearSearchTerm'
    }
}

//reducers
const recipeReducer = (state = initialState, action) => {
    switch(action.type){
        case 'allRecipes/loadData':
            return {
                ...state,
                allRecipes: action.payload
            }
        case 'favoriteRecipes/addRecipe':
            return {
                ...state,
                favoriteRecipes: [...state.favoriteRecipes, action.payload]
            }
        case 'favoriteRecipes/removeRecipe':
            return {
                ...state,
                favoriteRecipes: state.favoriteRecipes.filter(element => element !== action.payload)
            }
        case 'searchTerm/setSearchTerm':
            return {
                ...state,
                searchTerm: action.payload
            }
        case 'searchTerm/clearSearchTerm':
            return {
                ...state,
                setSearchTerm: ''
            }
        default:
            return state;
    }
}

const store = legacy_createStore(recipeReducer);

printTests();
function printTests() {
  store.dispatch(loadData());
  console.log('Initial State after loading data');
  console.log(store.getState());
  console.log();
  store.dispatch(addRecipe(allRecipesData[0]));
  store.dispatch(addRecipe(allRecipesData[1]));
  store.dispatch(setSearchTerm('cheese'));
  console.log("After favoriting Biscuits and Bulgogi and setting the search term to 'cheese'")
  console.log(store.getState());
  console.log();
  store.dispatch(removeRecipe(allRecipesData[1]));
  store.dispatch(clearSearchTerm());
  console.log("After un-favoriting Bulgogi and clearing the search term:")
  console.log(store.getState());
}
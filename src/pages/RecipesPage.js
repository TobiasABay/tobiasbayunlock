import Navbar from './Navbar';
import './RecipesPage.css';

export default function RecipesPage() {

    return (
        <div className="recipes-container">
            <Navbar></Navbar>
            <h1 className="recipespage-header">
                <span className="recipes-text">Recipes</span> Page
            </h1>

            <div className="recipe-form">
                <input type="text" placeholder="Title" />
                <input type="text" placeholder="Amount" />
                <input type="text" placeholder="Ingredients" />
                <input type="text" placeholder="Description" />
                <input type="text" placeholder="Notes" />
                <button>Add Row</button>
            </div>
        </div>
    )
}


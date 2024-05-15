import Navbar from './Navbar';
import './RecipesPage.css';

export default function RecipesPage() {

    return (
        <div className="recipes-container">
            <Navbar></Navbar>
            <h1 className="recipespage-header">
                <span className="recipes-text">Recipes</span> Page
            </h1>
        </div>
    )
}


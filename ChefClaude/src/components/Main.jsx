import { useState, useEffect, useRef } from "react";
import ClaudeRecipe from "./ClaudeRecipe";
import IngredientList from "./IngredientList";
import { getRecipeChefClaude } from "./ai";

const Main = () => {
  const [ingredients, setIngredient] = useState([]);
  const [recipe, setRecipe] = useState("");
  const recipeSection = useRef(null);

  useEffect(() => {
    if (recipe !== "" && recipeSection.current !== null) {
      recipeSection.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [recipe]);

  function collectIngredient(formData) {
    const newIngredient = formData.get("ingredient").trim();
    if (newIngredient) setIngredient((prev) => [...prev, newIngredient]);
  }

  async function getRecipe() {
    const generatedRecipe = await getRecipeChefClaude(ingredients);
    setRecipe(generatedRecipe);
  }

  return (
    <main className="px-[30px] pt-[30px] pb-[10px]">
      <form
        action={collectIngredient}
        className="flex justify-center gap-3 h-[38px]"
      >
        <input
          type="text"
          placeholder="e.g. oranges"
          aria-label="Add Ingredient"
          name="ingredient"
          className="rounded-md border border-gray-300 px-[13px] py-[9px] shadow-sm flex-grow min-w-[150px] max-w-[400px]"
        />
        <button className="bg-black text-[#fafaf8] w-[150px] text-sm font-medium rounded-md">
          + Add Ingredient
        </button>
      </form>

      {ingredients.length > 0 && (
        <IngredientList
          ingredients={ingredients}
          getRecipe={getRecipe}
          ref={recipeSection}
        />
      )}

      {recipe && <ClaudeRecipe recipe={recipe} />}
    </main>
  );
};

export default Main;

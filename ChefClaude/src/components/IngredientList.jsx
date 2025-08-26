const IngredientList = (props) => {
  const ingredientListItems = props.ingredients.map((ingredient) => (
    <li key={ingredient} className="text-[#475467] leading-7">
      {ingredient}
    </li>
  ));

  return (
    <section>
      <h2 className="text-lg font-semibold mt-4 mb-2">Ingredients on hand:</h2>
      <ul
        className="list-disc list-inside space-y-1 text-[#475467]"
        aria-live="polite"
      >
        {ingredientListItems}
      </ul>

      {props.ingredients.length > 3 && (
        <div
          className="flex justify-between items-center rounded-md bg-[#f0efeb] px-7 py-2.5 mt-10"
          ref={props.ref}
        >
          <div>
            <h3 className="text-[1.125rem] font-medium leading-6">
              Ready for a recipe?
            </h3>
            <p className="text-sm text-gray-500 leading-5">
              Generate a recipe from your list of ingredients.
            </p>
          </div>
          <button
            onClick={props.getRecipe}
            className="bg-[#d17557] text-[#fafaf8] px-[17px] py-[9px] rounded-md shadow-sm text-sm font-medium"
          >
            Suggest a Recipe
          </button>
        </div>
      )}
    </section>
  );
};

export default IngredientList;

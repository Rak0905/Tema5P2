class Dish {
  constructor(name, description, ingredients, img) {
    this.name = name;
    this.description = description;
    this.ingredients = Array.isArray(ingredients) ? ingredients : [];
    this.img = img;
  }

  setName(name) {
    this.name = name;
  }

  getName() {
    return this.name;
  }

  getDescription() {
    return this.description;
  }

  setIngredients(ingredients) {
    if (Array.isArray(ingredients)) {
      this.ingredients = ingredients;
    } else {
      throw new Error("Error: Los ingredientes deben ser un array.");
    }
  }

  getIngredients() {
    return this.ingredients;
  }

  setImg(img) {
    this.img = img;
  }

  getImg() {
    return this.img;
  }

  toString() {
    return `Nombre: ${this.getName()}, Descripción: ${this.getDescription()}`;
  }
}

class Menu {
  constructor(name, description) {
    this.name = name || "";
    this.description = description || "";
  }

  setName(name) {
    this.name = name;
  }

  getName() {
    return this.name;
  }

  setDescription(description) {
    this.description = description;
  }

  getDescription() {
    return this.description;
  }

  toString() {
    return `Nombre del Menú: ${this.name}, Descripción: ${this.description},`;
  }
}

class Allergen {
  constructor(name, description) {
    this.name = name || "";
    this.description = description || "";
  }

  // Métodos para el nombre (name)
  setName(name) {
    this.name = name;
  }

  getName() {
    return this.name;
  }

  // Métodos para la descripción (description)
  setDescription(description) {
    this.description = description;
  }

  getDescription() {
    return this.description;
  }
  addDish(dish) {
    if (dish instanceof Dish && !this._dishes.has(dish.getName())) {
      this._dishes.set(dish.getName(), dish);
    }
    return this;
  }
  changeDishesPositions(dish1, dish2) {
    const index1 = this.dishes.indexOf(dish1);
    const index2 = this.dishes.indexOf(dish2);

    if (index1 !== -1 && index2 !== -1) {
      // Intercambiar posiciones
      [this.dishes[index1], this.dishes[index2]] = [
        this.dishes[index2],
        this.dishes[index1],
      ];
    } else {
      throw new Error("Uno o ambos platos no se encuentran en el menú.");
    }
  }

  // Método toString
  toString() {
    return `Nombre del Menú: ${this.name}, Descripción: ${this.description}`;
  }
}

class Category {
  constructor(name, description) {
    this.name = name;
    this.description = description;
  }

  // Métodos para el nombre (name)
  setName(name) {
    this.name = name;
  }

  getName() {
    return this.name;
  }

  // Métodos para la descripción (description)
  setDescription(description) {
    this.description = description;
  }

  getDescription() {
    return this.description;
  }

  // Método toString
  toString() {
    return `Nombre de la categoría: ${this.name}, Descripción: ${this.description}`;
  }
}

class Restaurant {
  constructor(name, description, location) {
    this.name = name;
    this.description = description;
    this.location = location;
  }

  // Métodos para el nombre (name)
  setName(name) {
    this.name = name;
  }

  getName() {
    return this.name;
  }

  // Métodos para la descripción (description)
  setDescription(description) {
    this.description = description;
  }

  getDescription() {
    return this.description;
  }

  // Métodos para la ubicación (location)
  setLocation(location) {
    this.location = location;
  }

  getLocation() {
    return this.location;
  }

  // Método toString
  toString() {
    return `Nombre del restaurante: ${this.name}, Descripción: ${this.description}, Ubicación: ${this.location}`;
  }
}

class RestaurantsManager {
  constructor() {
    if (RestaurantsManager.instance) {
      return RestaurantsManager.instance;
    }

    this.systemName = "Restaurants System";
    this._categories = new Map(); // Change the variable name
    this._allergens = new Map();
    this._dishes = new Map();
    this._menus = new Map();
    this._restaurants = new Map();

    RestaurantsManager.instance = this;
  }

  // Getter for categories
  get categories() {
    return Array.from(this._categories.values());
  }

  // Getter for menus
  get menus() {
    return Array.from(this._menus.values());
  }

  // Getter for allergens
  get allergens() {
    return Array.from(this._allergens.values());
  }

  // Getter for restaurants
  get restaurants() {
    return Array.from(this._restaurants.values());
  }

  // Métodos de añadir categoría, menú, alérgeno, plato y restaurante
  addCategory(category) {
    if (!(category instanceof Category)) {
      throw new Error("Invalid category object");
    }
    this._categories.set(category.getName(), category);
    return this;
  }

  addMenu(menu) {
    if (menu instanceof Menu && !this._menus.has(menu.getName())) {
      this._menus.set(menu.getName(), {
        menu,
        dishes: [],
      });
    } else {
      throw new Error("El menú ya existe");
    }
    return this;
  }
  
  addAllergen(allergen) {
    if (
      allergen instanceof Allergen &&
      !this._allergens.has(allergen.getName())
    ) {
      this._allergens.set(allergen.getName(), allergen);
    }
    return this;
  }

  addDish(dish) {
    if (dish instanceof Dish && !this._dishes.has(dish.getName())) {
      this._dishes.set(dish.getName(), {
        dish,
        categories: [],
        allergens: [],
      });
    } else {
      throw new Error("El plato ya existia");
    }
    return this;
  }

  addRestaurant(restaurant) {
    if (
      restaurant instanceof Restaurant &&
      !this._restaurants.has(restaurant.getName())
    ) {
      this._restaurants.set(restaurant.getName(), restaurant);
    } else {
      throw new Error("Ya existe  este restaurante");
    }
    return this;
  }

  // Métodos de eliminar categoría, menú, alérgeno, plato y restaurante
  removeCategory(...categories) {
    for (const category of categories) {
      if (!(category instanceof Category)) {
        throw new error(
          "El parámetro 'category' no es una instancia válida de Category"
        );
      }
      if (this._categories.has(category.getName())) {
        this._categories.delete(category.getName());
      } else {
        throw error("No existe esa categoria");
      }
    }
    return this;
  }

  removeMenu(...menus) {
    for (const menu of menus) {
      if (!(menu instanceof Menu)) {
        throw new Error("El parámetro 'menu' no es una instancia válida de Menu");
      }
  
      if (this._menus.has(menu.getName())) {
        this._menus.delete(menu.getName());
      } else {
        throw new Error("Ese menú no existe");
      }
    }
    return this;
  }
  
  removeAllergen(...allergen) {
    for (const allergen of allergens) {
      if (!(allergen instanceof Allergen)) {
        throw new new error(
          "El parámetro 'allergen' no es una instancia válida de Allergen"
        )();
      }
      if (this._allergens.has(allergen.getName())) {
        this._allergens.delete(allergen.getName());
      } else {
        throw error("No existe esa menu");
      }

      return this;
    }
  }

  removeDish(...dishes) {
    for (const dish of  dishes) {
      if (!(dish instanceof Dish)) {
        throw new new error(
          "El parámetro 'dish' no es una instancia válida de Dish");
      }
      if (this._dishes.has(dish.getName())) {
        this._dishes.delete(dish.getName());
      } else {
        throw error("No existe esa menu");
      }

    
      return this;
  }
  }
  


  // Métodos de asignar/desasignar categoría, alérgeno y plato
assignCategoryToDish(category, dish) {
  if (!(dish instanceof Dish)) {
    throw new Error("El parámetro 'dish' no es una instancia válida de Dish");
  }
  if (!(category instanceof Category)) {
    throw new Error("El parámetro 'category' no es una instancia válida de Category");
  }

  if (!this._dishes.has(dish.getName())) {
    this._dishes.set(dish.getName(), {
      dish,
      categories: [category],
      allergens: [],
    });
  } else {
    // Si el plato ya existe, añadimos la nueva categoría al array existente
    const dishData = this._dishes.get(dish.getName());
    dishData.categories.push(category);

    if (!Array.isArray(dishData.allergens)) {
      throw new Error("La propiedad 'categories' no es un array en el plato");
    }
  }

  return this;
}

deassignCategoryToDish(dish, ...categories) {

  if (!(dish instanceof Dish)) {
    throw new Error("Invalid dish object");
  }

  if (this._dishes.has(dish.getName())) {
    const storedDish = this._dishes.get(dish.getName());
    for (let i = 0; i < categories.length; i++) {
      const category = categories[i];
      if (!(category instanceof Category)) {
        throw new Error("Invalid category object");
      }
      if (storedDish.categories.has(category.getName())) {
        storedDish.categories.delete(category.getName());
      } else {
        throw new Error("Esa categoría no existe");
      }
    }
  } else {
    throw new Error("Ese plato no existe");
  }

  return this;
}

assignDishToMenu(menu1, dish) {
  if (!(menu1 instanceof Menu)) {
    throw new Error("El parámetro 'menu1' no es una instancia válida de Menu");
  }

  if (!(dish instanceof Dish)) {
    throw new Error("El parámetro 'dish' no es una instancia válida de Dish");
  }

  if (!this._menus.has(menu1.getName())) {
    // If the menu doesn't exist in the collection, create a new entry
    this._menus.set(menu1.getName(), {
      menu1,
      dishes: [dish],
    });
  } else {
    const menuData = this._menus.get(menu1.getName());

    if (!Array.isArray(menuData.dishes)) {
      throw new Error("La propiedad 'dishes' no es un array en el menú");
    }

    this._menus.get(menu1.getName()).dishes.push(dish);
  }

  return this;
}


deassignDishToMenu(menu, ...dishes) {
  if (!(menu instanceof Menu)) {
    throw new Error("Invalid Menu object");
  }

  if (this._menus.has(menu.getName())) {
    const storedMenu = this._menus.get(menu.getName());

    for (const dish of dishes) {
      if (!(dish instanceof Dish)) {
        throw new Error("Invalid dish object");
      }

      const index = storedMenu.dishes.indexOf(dish);

      if (index !== -1) {
        storedMenu.dishes.splice(index, 1);
      } else {
        throw new Error("Ese plato no existe en el menú");
      }
    }
  } else {
    throw new Error("Ese menú no existe");
  }

  return this;
}

deassignCategoryToDish(dish, ...categories) {

  if (!(dish instanceof Dish)) {
    throw new Error("Invalid dish object");
  }

  if (this._dishes.has(dish.getName())) {
    const storedDish = this._dishes.get(dish.getName());
    
    for (let i = 0; i < categories.length; i++) {
      const category = categories[i];
      
      if (!(category instanceof Category)) {
        throw new Error("Invalid category object");
      }

      const indice = storedDish.categories.indexOf(category);
  
      if (indice !== -1) {
        // Use splice to remove the category at the found index
        storedDish.categories.splice(indice, 1);
      } else {
        throw new Error("Esa categoría no existe");
      }
    }
  } else {
    throw new Error("Ese plato no existe");
  }

  return this;
}

assignAllergenToDish(allergen, dish) {
  if (!(dish instanceof Dish)) {
    throw new Error("El parámetro 'dish' no es una instancia válida de Dish");
  }
  if (!(allergen instanceof Allergen)) {
    throw new Error("El parámetro 'category' no es una instancia válida de Category");
  }

  if (!this._dishes.has(dish.getName())) {
    this._dishes.set(dish.getName(), {
      dish,
      categories: [],
      allergens: [allergen],
    });
  } else {
    // Si el plato ya existe, añadimos la nueva categoría al array existente
    const dishData = this._dishes.get(dish.getName());
    dishData.allergens.push(allergen);

    if (!Array.isArray(dishData.allergens)) {
      throw new Error("La propiedad 'allergens' no es un array en el plato");
    }
  }

  return this;
}
deassignAllergenToDish(dish, ...allergens) {
  if (!(dish instanceof Dish)) {
    throw new Error("Invalid dish object");
  }

  if (this._dishes.has(dish.getName())) {
    const storedDish = this._dishes.get(dish.getName());

    for (let i = 0; i < allergens.length; i++) {
      const allergen = allergens[i];

      if (!(allergen instanceof Allergen)) {
        throw new Error("Invalid Allergen object");
      }

      // Buscar el índice del alérgeno en el array
      const indice = storedDish.allergens.indexOf(allergen);

      if (indice !== -1) {
        // Usar splice para eliminar el alérgeno en el índice encontrado
        storedDish.allergens.splice(indice, 1);
      } else {
        throw new Error("Ese alérgeno no existe");
      }
    }
  } else {
    throw new Error("Ese plato no existe");
  }

  return this;
}
assignMenuToRestaurant(menu, restaurant) {
  if (!(menu instanceof Menu)) {
    throw new Error("El parámetro 'menu' no es una instancia válida de Menu");
  }

  if (!(restaurant instanceof Restaurant)) {
    throw new Error("El parámetro 'restaurant' no es una instancia válida de Restaurant");
  }

  // Comprobar si el restaurante ya tiene un menú asignado
  if (this._restaurants.has(restaurant.getName())) {
    const storedRestaurant = this._restaurants.get(restaurant.getName());

    if (storedRestaurant.menu) {
      throw new Error("El restaurante ya tiene un menú asignado");
    }
  }

  // Asignar el menú al restaurante
  restaurant.menu = menu;
  return this;
}

// Método para desasignar un menú de un restaurante
deassignMenuFromRestaurant(restaurant) {
  if (!(restaurant instanceof Restaurant)) {
    throw new Error("El parámetro 'restaurant' no es una instancia válida de Restaurant");
  }

  // Comprobar si el restaurante tiene un menú asignado
  if (this._restaurants.has(restaurant.getName())) {
    const storedRestaurant = this._restaurants.get(restaurant.getName());

    if (!storedRestaurant.menu) {
      throw new Error("El restaurante no tiene un menú asignado");
    }

    // Desasignar el menú del restaurante
    storedRestaurant.menu = null;
    return this;
  } else {
    throw new Error("El restaurante no existe");
  }
}


 
  changeDishesPositionsInMenu(menu, dish1, dish2) {
    if (!(menu instanceof Menu)) {
      throw new Error("El parámetro 'menu' no es una instancia válida de Menu");
    }
  
    const storedMenu = this._menus.get(menu.getName());
  
    if (!storedMenu) {
      throw new Error("Ese menú no existe");
    }
  
    const index1 = storedMenu.dishes.indexOf(dish1);
    const index2 = storedMenu.dishes.indexOf(dish2);
  
    if (index1 === -1 || index2 === -1) {
      throw new Error("Al menos uno de los platos no existe en el menú");
    }
  
    // Intercambiar las posiciones de los platos en el array
    [storedMenu.dishes[index1], storedMenu.dishes[index2]] = [storedMenu.dishes[index2], storedMenu.dishes[index1]];
  
    return this;
  }
  

  getDishesInCategory(categorya) {
   
    const foundDishes = [];
  
    this._dishes.forEach((dishData) => {
      const categories = dishData.categories;
  
      for (const category of categories) {
        if (category.getName() === categorya.getName()) {
          foundDishes.push(dishData.dish); // Agrega el plato al array
          break; // Si encuentras la categoría, puedes salir del bucle interno
        }
      }
    });
  
    return foundDishes;
  }
  
  

    
  

  getDishesWithAllergen(allergeno) {
    const foundDishes = [];

  this._dishes.forEach((dishData) => {
    const allergens = dishData.allergens;

    for (const allergen of allergens) {
      if (allergen.getName() === allergeno.getName()) {
        foundDishes.push(dishData.dish);
        break;
      }
    }
  });

  return foundDishes;
  }

  findDishes(dishe) {
    const foundDishes = [];

    this._menus.forEach((menuData) => {
      const dishes = menuData.dishes;

      for (const dish of dishes) {
        if (dishes.getName() === dishe.getName()) {
          foundDishes.push(menuData.dishes);
          break;
        }
      }
    });
  
    return foundDishes;
  }

  // Métodos de creación
  createDish(...args) {
    const dish = new Dish(...args);
    this.addDish(dish);
    return dish;
  }

  createMenu(...args) {
    const menu = new Menu(...args);
    this.addMenu(menu);
    return menu;
  }

  createAllergen(...args) {
    const allergen = new Allergen(...args);
    this.addAllergen(allergen);
    return allergen;
  }

  createCategory(...args) {
    const category = new Category(...args);
    this.addCategory(category);
    return category;
  }

  createRestaurant(...args) {
    const restaurant = new Restaurant(...args);
    this.addRestaurant(restaurant);
    return restaurant;
  }

 

getRandomDishes(count) {
  const randomDishes = [];
  const availableDishes = new Map([...this._dishes]);

  for (let i = 0; i < count && availableDishes.size > 0; i++) {
    const keys = Array.from(availableDishes.keys());
    const randomIndex = Math.floor(Math.random() * keys.length);
    const randomKey = keys[randomIndex];
    const randomDish = availableDishes.get(randomKey);

    availableDishes.delete(randomKey);
    randomDishes.push(randomDish);
  }

  return randomDishes;
}
toString() {
  let result = `RestaurantsManager: ${this.systemName}\n`;

  for (const dishData of this._dishes.values()) {
    const dishString = `${dishData.dish.toString()},\n`;
    const categoriesString = `categories: [${dishData.categories.map(category => category.getName()).join(', ')}],\n`;
    const allergensString = `allergens: [${dishData.allergens.map(allergen => allergen.getName()).join(', ')}]\n`;

    result += `{${dishString}${categoriesString}${allergensString}},\n`;
  }

  for (const menuData of this._menus.values()) {
    const menuString = `${menuData.menu.toString()},\n`;
    const dishesString = `dishes: [${menuData.dishes.map(dish => dish.getName()).join(', ')}]\n`;

    result += `{${menuString}${dishesString}},\n`;
  }

  return result;
}

}


const restaurantsManager = new RestaurantsManager();

const category1 = restaurantsManager.createCategory("Entradas", "Entradas del menú");
const category2 = restaurantsManager.createCategory("Plato Principal", "Platos principales del menú");
const category3 = restaurantsManager.createCategory("Postres", "Postres del menú");

const allergen1 = restaurantsManager.createAllergen("Gluten", "Contiene gluten");
const allergen2 = restaurantsManager.createAllergen("Lácteos", "Contiene lácteos");
const allergen3 = restaurantsManager.createAllergen("Frutos Secos", "Contiene frutos secos");
const allergen4 = restaurantsManager.createAllergen("Mariscos", "Contiene mariscos");

const menu1 = restaurantsManager.createMenu("Menú 1", "Menú especial 1");
const menu2 = restaurantsManager.createMenu("Menú 2", "Menú especial 2");
const menu3 = restaurantsManager.createMenu("Menú 3", "Menú especial 3");

/// Ingredientes de ejemplo
const pastaCarbonaraIngredients = ["Spaghetti", "Guanciale", "Pecorino Cheese", "Black Pepper", "Eggs"];
const lasagnaIngredients = ["Lasagna Sheets", "Ground Beef", "Tomato Sauce", "Ricotta Cheese", "Mozzarella"];
const chocolateCakeIngredients = ["Flour", "Sugar", "Cocoa Powder", "Eggs", "Butter"];
const caesarSaladIngredients = ["Romaine Lettuce", "Croutons", "Parmesan Cheese", "Caesar Dressing"];

const sushiIngredients = ["Sushi Rice", "Nori", "Fresh Fish", "Avocado", "Soy Sauce"];
const pizzaIngredients = ["Pizza Dough", "Tomato Sauce", "Mozzarella Cheese", "Pepperoni", "Bell Peppers"];
const chocolateMousseIngredients = ["Chocolate", "Heavy Cream", "Sugar", "Eggs", "Vanilla Extract"];
const greekSaladIngredients = ["Cucumbers", "Tomatoes", "Feta Cheese", "Olives", "Olive Oil"];

const risottoIngredients = ["Arborio Rice", "Chicken Broth", "Parmesan Cheese", "White Wine", "Onion"];
const burgerIngredients = ["Beef Patty", "Burger Bun", "Lettuce", "Tomato", "Cheese"];
const tiramisuIngredients = ["Ladyfingers", "Mascarpone Cheese", "Espresso", "Cocoa Powder", "Sugar"];
const capreseSaladIngredients = ["Tomatoes", "Mozzarella Cheese", "Basil", "Balsamic Glaze", "Olive Oil"];

// Crear 12 platos
const pastaCarbonara = restaurantsManager.createDish("Pasta Carbonara", "Classic Italian pasta dish", pastaCarbonaraIngredients, "pasta_carbonara.jpg");
const lasagna = restaurantsManager.createDish("Lasagna", "Layers of pasta, meat, and cheese", lasagnaIngredients, "lasagna.jpg");
const chocolateCake = restaurantsManager.createDish("Chocolate Cake", "Delicious chocolate dessert", chocolateCakeIngredients, "chocolate_cake.jpg");
const caesarSalad = restaurantsManager.createDish("Caesar Salad", "Fresh and crisp salad with Caesar dressing", caesarSaladIngredients, "caesar_salad.jpg");

const sushi = restaurantsManager.createDish("Sushi", "Japanese rice and fish delicacy", sushiIngredients, "sushi.jpg");
const pizza = restaurantsManager.createDish("Pizza", "Classic Italian pizza", pizzaIngredients, "pizza.jpg");
const chocolateMousse = restaurantsManager.createDish("Chocolate Mousse", "Rich and creamy chocolate dessert", chocolateMousseIngredients, "chocolate_mousse.jpg");
const greekSalad = restaurantsManager.createDish("Greek Salad", "Traditional Greek salad with feta", greekSaladIngredients, "greek_salad.jpg");

const risotto = restaurantsManager.createDish("Risotto", "Creamy Italian rice dish", risottoIngredients, "risotto.jpg");
const burger = restaurantsManager.createDish("Burger", "Classic beef burger", burgerIngredients, "burger.jpg");
const tiramisu = restaurantsManager.createDish("Tiramisu", "Italian coffee-flavored dessert", tiramisuIngredients, "tiramisu.jpg");
const capreseSalad = restaurantsManager.createDish("Caprese Salad", "Tomato, mozzarella, and basil salad", capreseSaladIngredients, "caprese_salad.jpg");

// Asignar platos a categorías
restaurantsManager.assignCategoryToDish(category1, pastaCarbonara);
restaurantsManager.assignCategoryToDish(category1, lasagna);
restaurantsManager.assignCategoryToDish(category1, chocolateCake);
restaurantsManager.assignCategoryToDish(category1, caesarSalad);

restaurantsManager.assignCategoryToDish(category2, sushi);
restaurantsManager.assignCategoryToDish(category2, pizza);
restaurantsManager.assignCategoryToDish(category2, chocolateMousse);
restaurantsManager.assignCategoryToDish(category2, greekSalad);

restaurantsManager.assignAllergenToDish(allergen1, pastaCarbonara);
restaurantsManager.assignAllergenToDish(allergen2, lasagna);
restaurantsManager.assignAllergenToDish(allergen3, chocolateCake);
restaurantsManager.assignAllergenToDish(allergen4, caesarSalad);
//asignar alergenos  a los platos
restaurantsManager.assignAllergenToDish(allergen1, sushi);
restaurantsManager.assignAllergenToDish(allergen2, pizza);
restaurantsManager.assignAllergenToDish(allergen3, chocolateMousse);
restaurantsManager.assignAllergenToDish(allergen4, greekSalad);

restaurantsManager.assignAllergenToDish(allergen1, risotto);
restaurantsManager.assignAllergenToDish(allergen2, burger);
restaurantsManager.assignAllergenToDish(allergen3, tiramisu);
restaurantsManager.assignAllergenToDish(allergen4, capreseSalad);
restaurantsManager.assignCategoryToDish(category3, risotto);
restaurantsManager.assignCategoryToDish(category3, burger);
restaurantsManager.assignCategoryToDish(category3, tiramisu);
restaurantsManager.assignCategoryToDish(category3, capreseSalad);
restaurantsManager.assignDishToMenu(menu1, pastaCarbonara);

restaurantsManager.assignDishToMenu(menu1, sushi);
restaurantsManager.assignDishToMenu(menu1, risotto);
restaurantsManager.assignDishToMenu(menu2, lasagna);
restaurantsManager.assignDishToMenu(menu2, pizza);
restaurantsManager.assignDishToMenu(menu2, burger);
restaurantsManager.assignDishToMenu(menu3, chocolateCake);
restaurantsManager.assignDishToMenu(menu3, chocolateMousse);
restaurantsManager.assignDishToMenu(menu3, tiramisu);
// Verificar la asignación imprimiendo los platos y sus categorías
console.log(restaurantsManager.toString());


// Verifica la asignación imprimiendo los platos y sus categorías
console.log(restaurantsManager.toString());




const restaurant1 = restaurantsManager.createRestaurant("Restaurante 1", "Descripción del restaurante 1", "Dirección 1");
const restaurant2 = restaurantsManager.createRestaurant("Restaurante 2", "Descripción del restaurante 2", "Dirección 2");
const restaurant3 = restaurantsManager.createRestaurant("Restaurante 3", "Descripción del restaurante 3", "Dirección 3");
// Función para cargar las categorías al inicio de la página
// Inicializar la página
// Inicializar la página
function initializePage() {
  const centralZone = document.getElementById('central-zone');
  const centralZone2 = document.getElementById('central-zone2');
  
  function showCategories() {
    const centralZone = document.getElementById('central-zone');

    // Limpiar el contenido del 'central-zone'
    centralZone.innerHTML = '';

    // Agregar encabezado h3 con "Lista de Categorías"
    const heading = document.createElement('h3');
    heading.textContent = 'Lista de Categorías';
    centralZone.appendChild(heading);

    // Iterar sobre las categorías y mostrar los enlaces
    restaurantsManager.categories.forEach(category => {
        const categoryLink = document.createElement('a');
        categoryLink.href = 'javascript:void(0)';
        categoryLink.textContent = category.getName();

        categoryLink.addEventListener('click', () => {
            // Ocultar las zonas con la clase 'zone' excepto la zona central
            const zonesToHide = document.querySelectorAll('.zone:not(#central-zone)');
            zonesToHide.forEach(zone => zone.style.display = 'none');
            
            showCategoryDetails(category);
            
        });

        centralZone.appendChild(categoryLink);

        // Añadir un salto de línea después de cada enlace de categoría
        centralZone.appendChild(document.createElement('br'));
    });
}


  

  // Mostrar tres platos aleatorios debajo de las categorías
  function showRandomDishes() {
    const centralZone2 = document.getElementById('central-zone2');
    centralZone2.innerHTML = '';
  
    // Agregar un encabezado h4 como prueba
    const heading = document.createElement('h4');
    heading.textContent = 'Prueba un plato de nuestra selección';
    centralZone2.appendChild(heading);
  
    const randomDishes = restaurantsManager.getRandomDishes(3);
    randomDishes.forEach(dishData => {
      const dishElement = document.createElement('div');
  
      // Crear un enlace para el nombre del plato
      const dishNameLink = document.createElement('a');
      dishNameLink.textContent = dishData.dish.getName();
      dishNameLink.href = 'javascript:void(0)';
  
      // Crear un elemento para la descripción del plato (inicialmente invisible)
      const dishDescriptionDiv = document.createElement('div');
      dishDescriptionDiv.style.display = 'none';
      dishDescriptionDiv.innerHTML = `<strong>Descripción:</strong> ${dishData.dish.getDescription()}<br>`;
  
      // Crear un elemento para los ingredientes del plato (inicialmente invisible)
      const ingredientsDiv = document.createElement('div');
      ingredientsDiv.style.display = 'none';
      ingredientsDiv.innerHTML = `<strong>Ingredientes:</strong> ${dishData.dish.getIngredients().join(', ')}<br>`;
  
      // Agregar evento de clic al enlace para mostrar/desvanecer la descripción e ingredientes
      dishNameLink.addEventListener('click', () => {
        // Alternar la visibilidad de la descripción e ingredientes al hacer clic en el enlace
        dishDescriptionDiv.style.display = dishDescriptionDiv.style.display === 'none' ? 'block' : 'none';
        ingredientsDiv.style.display = ingredientsDiv.style.display === 'none' ? 'block' : 'none';
      });
  
      dishElement.appendChild(dishNameLink);
      dishElement.appendChild(dishDescriptionDiv);
      dishElement.appendChild(ingredientsDiv);
  
      centralZone2.appendChild(dishElement);
    });
  }
  
function mostrarNombresPlatosYMenuEnHTML() {
  // Obtén la instancia de RestaurantsManager
  const restaurantsManager = new RestaurantsManager();

  // Obtén el elemento con el ID 'menu'
  const menuElement = document.getElementById('menu');

  // Limpia el contenido actual del elemento 'menu'
  menuElement.innerHTML = '';

    // Agregar un encabezado h3 
    const heading = document.createElement('h3');
    heading.textContent = 'Nuestros menus';
    menuElement.appendChild(heading);
  
  // Itera sobre los menús
  restaurantsManager.menus.forEach(menuData => {
    const menu = menuData.menu;
    const dishes = menuData.dishes;

    // Crear un elemento 'div' para el menú
    const menuDiv = document.createElement('div');

    // Agregar el nombre del menú al elemento 'div' del menú
    menuDiv.innerHTML = `<strong>Menú:</strong> ${menu.getName()}<br>`;

    // Itera sobre los platos del menú
    dishes.forEach(dish => {
      // Crear un elemento 'div' para el nombre del plato
      const dishDiv = document.createElement('div');

      // Agregar el nombre del plato al elemento 'div'
      dishDiv.innerHTML = `&nbsp;&nbsp;&nbsp;<strong>Nombre del plato:</strong> ${dish.getName()}<br>`;

      // Crear un div adicional para la información adicional del plato (inicialmente oculto)
      const additionalInfoDiv = document.createElement('div');
       // Agregar la clase "plato" al elemento 'div' del plato
       dishDiv.classList.add('plato');
       
      additionalInfoDiv.style.display = 'none';
      additionalInfoDiv.innerHTML = `&nbsp;&nbsp;&nbsp;<strong>Descripción:</strong> ${dish.getDescription()}<br>`;

      // Agregar el div adicional al elemento 'div' del plato
      dishDiv.appendChild(additionalInfoDiv);

      // Agregar un evento de clic para mostrar/ocultar información adicional
      dishDiv.addEventListener('click', () => {
        // Alternar la visibilidad del div adicional al hacer clic
        additionalInfoDiv.style.display = additionalInfoDiv.style.display === 'none' ? 'block' : 'none';
      });

      // Agregar el elemento 'div' del plato al elemento 'div' del menú
      menuDiv.appendChild(dishDiv);
    });

    // Agregar un salto de línea entre menús
    menuDiv.appendChild(document.createElement('br'));

    // Agregar el elemento 'div' del menú al elemento con el ID 'menu'
    menuElement.appendChild(menuDiv);
  });
}

// Llama a la función para mostrar los nombres de los platos, el menú y la información adicional en el elemento con el ID 'menu'
mostrarNombresPlatosYMenuEnHTML();


function crearMenuDesplegableRestaurantes() {
  // Obtén una referencia al elemento HTML donde deseas agregar el menú desplegable
  const selectElement = document.getElementById('restaurant-select');

  // Limpia el contenido actual del elemento
  selectElement.innerHTML = '';

  // Agrega una opción predeterminada
  const defaultOption = document.createElement('option');
  defaultOption.text = 'Selecciona un restaurante';
  defaultOption.disabled = true;
  defaultOption.selected = true;
  selectElement.appendChild(defaultOption);

  // Itera sobre los restaurantes
  restaurantsManager.restaurants.forEach(restaurant => {
    // Crea una opción de menú para cada restaurante
    const option = document.createElement('option');
    option.value = restaurant.getName();
    option.text = restaurant.getName();
    selectElement.appendChild(option);
  });

  // Agrega un evento de cambio al menú desplegable
  selectElement.addEventListener('change', (event) => {
    // Obtiene el restaurante seleccionado
    const selectedRestaurantName = event.target.value;

    // Encuentra el restaurante correspondiente en la lista de restaurantes
    const selectedRestaurant = restaurantsManager.restaurants.find(restaurant => restaurant.getName() === selectedRestaurantName);

    // Muestra la información del restaurante seleccionado
    mostrarInformacionRestaurante(selectedRestaurant);
  });
}


function mostrarInformacionRestaurante(restaurant) {
  // Muestra la información del restaurante en algún lugar de la interfaz de usuario
  const infoElement = document.getElementById('restaurant-info');
  infoElement.innerHTML = `
    <h3>${restaurant.getName()}</h3>
    <p>Descripción: ${restaurant.getDescription()}</p>
    <p>Ubicación: ${restaurant.getLocation()}</p>
  `;
}



function showIngredients(dish) {
  // Crear un elemento para mostrar los ingredientes
  const ingredientsElement = document.createElement('p');
  ingredientsElement.textContent = `Ingredientes: ${dish.getIngredients().join(', ')}`;

  // Mostrar el cuadro de ingredientes en algún lugar de la página
  // Por ejemplo, puedes añadirlo al final del cuerpo del documento
  document.body.appendChild(ingredientsElement);
}




// Llamar a la función para mostrar la lista de alérgenos y los platos
showAllergensWithDishes();
// Agregar el siguiente código para mostrar platos aleatorios al inicio
showRandomDishes();

showCategories();
crearMenuDesplegableRestaurantes();


// En la función initializePage, después de crear enlaces para cada categoría
// Agregar el siguiente código para mostrar platos aleatorios al inicio
showRandomDishes();
function showCategoryDetails(category) {
  // Obtener el elemento con el ID 'central-zone'
  const centralZone = document.getElementById('central-zone');

  // Limpiar el contenido del 'central-zone'
  centralZone.innerHTML = '';

  // Agregar el nombre de la categoría como encabezado
  const categoryHeading = document.createElement('h3');
  categoryHeading.textContent = category.getName();
  centralZone.appendChild(categoryHeading);

  // Obtener o crear el elemento para mostrar los ingredientes
  let ingredientsElement = document.getElementById('ingredients');

  // Si no existe el elemento, créalo
  if (!ingredientsElement) {
    ingredientsElement = document.createElement('p');
    ingredientsElement.id = 'ingredients';
    centralZone.appendChild(ingredientsElement);
  }

  // Obtener todos los platos de la categoría
  const dishesInCategory = restaurantsManager.getDishesInCategory(category);

  // Iterar sobre cada plato en la categoría
  dishesInCategory.forEach(dish => {
    // Crear un nuevo elemento 'div' para el plato
    const dishElement = document.createElement('div');

    // Crear un enlace para el nombre del plato
    const dishNameLink = document.createElement('a');
    dishNameLink.textContent = dish.getName();
    dishNameLink.href = 'javascript:void(0)'; // En lugar de '#', usar 'javascript:void(0)' para evitar el desplazamiento

    // Crear un elemento para mostrar los ingredientes (inicialmente oculto)
    const ingredientsDiv = document.createElement('div');
    ingredientsDiv.style.display = 'none';
    ingredientsDiv.textContent = `Ingredientes: ${dish.getIngredients().join(', ')}`;

    // Agregar evento de clic para mostrar/ocultar ingredientes
    dishNameLink.addEventListener('click', () => {
      // Alternar la visibilidad del div de ingredientes al hacer clic
      ingredientsDiv.style.display = ingredientsDiv.style.display === 'none' ? 'block' : 'none';
    });

    // Agregar el enlace del nombre del plato al elemento 'div' del plato
    dishElement.appendChild(dishNameLink);

    // Agregar el elemento para mostrar ingredientes al 'div' del plato
    dishElement.appendChild(ingredientsDiv);

    // Agregar el elemento del plato al 'central-zone'
    centralZone.appendChild(dishElement);
  });

  // Añadir el botón de volver a categorías
  const backButton = document.createElement('button');
  backButton.id="btn_back"
  backButton.textContent = 'Volver a Categorías';
  backButton.addEventListener('click', () => {
    showCategories();
    // Hacer visible la clase 'zone' al hacer clic en el botón
    const zones = document.querySelectorAll('.zone');
    zones.forEach(zone => {
      zone.style.display = 'block';
    });
  });
  centralZone.appendChild(backButton);
}
}
function showAllergensWithDishes() {
  const allergensList = document.getElementById('allergens-list');

  // Limpiar la lista de alérgenos
  allergensList.innerHTML = '';

  // Agregar encabezado h3 con "Lista de Alergenos"
  const heading = document.createElement('h3');
  heading.textContent = 'Lista de Alergenos';
  allergensList.appendChild(heading);

  // Iterar sobre cada alérgeno
  restaurantsManager.allergens.forEach(allergen => {
    // Crear un nuevo elemento de lista para el alérgeno
    const allergenItem = document.createElement('li');
    allergenItem.textContent = `${allergen.getName()}:`;

    // Obtener los platos que contienen el alérgeno
    const dishesWithAllergen = restaurantsManager.getDishesWithAllergen(allergen);

    if (dishesWithAllergen.length > 0) {
      // Crear una lista ordenada para los platos
      const dishesList = document.createElement('ol');

      // Iterar sobre cada plato y agregarlo a la lista
      dishesWithAllergen.forEach(dish => {
        const dishItem = document.createElement('li');
        dishItem.textContent = dish.getName();

        // Crear un contenedor para los ingredientes y hacerlo invisible por defecto
        const ingredientsContainer = document.createElement('ul');
        ingredientsContainer.style.display = 'none';

        // Iterar sobre cada ingrediente del plato y agregarlo al contenedor como elementos de lista
        dish.getIngredients().forEach(ingredient => {
          const ingredientItem = document.createElement('li');
          ingredientItem.textContent = ingredient;
          ingredientsContainer.appendChild(ingredientItem);
        });

        // Agregar el contenedor de ingredientes al elemento de plato
        dishItem.appendChild(ingredientsContainer);

        // Agregar evento de clic para toggle la visibilidad de los ingredientes
        dishItem.addEventListener('click', () => {
          ingredientsContainer.style.display = ingredientsContainer.style.display === 'none' ? 'block' : 'none';
        });

        // Agregar la clase "plato" al elemento de plato
        dishItem.classList.add('plato');

        dishesList.appendChild(dishItem);
      });

      // Agregar la lista de platos al elemento de alérgeno
      allergenItem.appendChild(dishesList);
    } else {
      // Si no hay platos con el alérgeno, agregar un mensaje
      const noDishesMessage = document.createElement('p');
      noDishesMessage.textContent = 'Ningún plato contiene este alérgeno.';
      allergenItem.appendChild(noDishesMessage);
    }

    // Agregar el elemento de alérgeno a la lista de alérgenos
    allergensList.appendChild(allergenItem);
  });
}



// Mostrar detalles de una categoría
// Función para mostrar los detalles de una categoría



function showIngredients(dish) {
  // Obtener o crear el elemento para mostrar los ingredientes
  let ingredientsElement = document.getElementById('ingredients');

  // Si no existe el elemento, créalo
  if (!ingredientsElement) {
    ingredientsElement = document.createElement('p');
    ingredientsElement.id = 'ingredients';
    // Agregar el cuadro de ingredientes al 'central-zone' en lugar de al final del cuerpo del documento
    document.getElementById('central-zone').appendChild(ingredientsElement);
  }

  // Alternar la visibilidad del cuadro de ingredientes al hacer clic
  ingredientsElement.textContent = `Ingredientes: ${dish.getIngredients().join(', ')}`;
  ingredientsElement.style.display = ingredientsElement.style.display === 'none' ? 'block' : 'none';
}


// Ejecutar la carga inicial al cargar la página
window.onload = initializePage;
// Función para mostrar los detalles de una categoría
function showCategoryDetails(category) {
  // Obtener el elemento con el ID 'central-zone'
  const centralZone = document.getElementById('central-zone');
  // Limpiar el contenido del 'central-zone'
  centralZone.innerHTML = '';

  // Obtener todos los platos de la categoría
  const dishesInCategory = restaurantsManager.getDishesInCategory(category);

  // Iterar sobre cada plato en la categoría
  dishesInCategory.forEach(dish => {
    // Crear un nuevo elemento 'div' para el plato
    const dishElement = document.createElement('div');

    // Crear un enlace para el nombre del plato
    const dishNameLink = document.createElement('a');
    dishNameLink.textContent = dish.getName();
    dishNameLink.href = '#'; // Puedes establecer un href válido o "#" como ejemplo

    // Agregar evento de clic para mostrar ingredientes
    dishNameLink.addEventListener('click', (event) => {
      event.preventDefault(); // Evitar el comportamiento predeterminado del enlace
      showIngredients(dish);
    });

    // Agregar el enlace del nombre del plato al elemento 'div' del plato
    dishElement.appendChild(dishNameLink);

    // Agregar el elemento del plato al 'central-zone'
    centralZone.appendChild(dishElement);
  });

  // Agregar un salto de línea después de completar la iteración de platos en cada categoría
  centralZone.appendChild(document.createElement('br'));
}
/*





*/





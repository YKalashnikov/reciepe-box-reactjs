var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Recipe = function (_React$Component) {
  _inherits(Recipe, _React$Component);

  function Recipe(props) {
    _classCallCheck(this, Recipe);

    var _this = _possibleConstructorReturn(this, (Recipe.__proto__ || Object.getPrototypeOf(Recipe)).call(this, props));

    if (localStorage.getItem('recipes_project') == undefined) {
      localStorage.setItem('recipes_project', JSON.stringify([{ title: "Crêpes", method: "1.In a blender, combine flour, sugar, salt, milk, eggs, and butter. Watch: How to Measure Flour.2.Puree until mixture is smooth and bubbles form on top, about 30 seconds.3.Heat a 12-inch nonstick skillet over medium. ...4.Loosen edge of crepe with a rubber spatula, then with your fingertips, quickly flip.", ingredients: "Eggs, Flour, Milk, Salt and some magic ", img: "https://images-gmi-pmc.edge-generalmills.com/3d120ad7-0937-4a8b-85fc-90e736b1f26c.jpg" }]));
      console.log("Local storage is empty ");
    }
    var initialRecipe = JSON.parse(localStorage.getItem("recipes_project"));
    _this.state = { recipes: initialRecipe,
      recipe: { title: '', method: '', ingredients: '', img: '' }
    };
    return _this;
  }

  _createClass(Recipe, [{
    key: 'updateLocalStorage',
    value: function updateLocalStorage(recipes) {
      this.setState({ recipes: recipes });
      localStorage.setItem('recipes_project', JSON.stringify(recipes));
    }
  }, {
    key: 'toggle_panel',
    value: function toggle_panel() {
      event.preventDefault();
      $('.add-recipe, .list-recipe').toggleClass('toggle-display');
    }
  }, {
    key: 'deleteRecipe',
    value: function deleteRecipe(index) {
      var recipes = this.state.recipes.slice();
      recipes.splice(index, 1);
      this.setState({ recipes: recipes });
      this.updateLocalStorage(recipes);
      //console.log(index)
    }
  }, {
    key: 'saveRecipe',
    value: function saveRecipe(event) {
      event.preventDefault();
      this.state.recipes.push(this.state.recipe);
      this.updateLocalStorage(this.state.recipes);
      this.setState({ recipe: { title: '', method: '', ingredients: '', img: '' } });
      this.toggle_panel(event);
    }
  }, {
    key: 'updateRecipe',
    value: function updateRecipe(event) {
      var field = event.target.name;
      var value = event.target.value;
      this.state.recipe[field] = value;
      this.setState({ recipe: this.state.recipe });
    }
  }, {
    key: 'editRecipe',
    value: function editRecipe(title, event) {
      event.preventDefault();
      for (var i = 0; i < this.state.recipes.length; i++) {

        if (this.state.recipes[i].title == title) {
          console.log(this.state.recipes[i]);
          this.setState = { recipe: this.state.recipes[i] };
          this.toggle_panel(event);
          break;
        }
      }
    }
  }, {
    key: 'render',
    value: function render() {
      var _this2 = this;

      var createList = function createList(recipe, index) {

        return React.createElement(
          'div',
          { className: 'list-group-item', key: recipe.title },
          React.createElement(
            'div',
            { className: 'media col-md-3 left panel' },
            React.createElement(
              'p',
              { className: 'lead recipeTitle' },
              recipe.title
            ),
            React.createElement(
              'figure',
              { className: 'pul-left' },
              React.createElement('img', { className: 'img-recipe', src: recipe.img })
            ),
            React.createElement(
              'button',
              { type: 'button', className: 'recipeButton btn btn-primary', onClick: _this2.editRecipe.bind(_this2, recipe.title) },
              'Edit'
            ),
            React.createElement(
              'button',
              { type: 'button', className: 'recipeButton btn btn-danger', onClick: _this2.deleteRecipe.bind(_this2, index) },
              'Delete'
            )
          ),
          React.createElement(
            'div',
            { className: 'col-md-5' },
            React.createElement(
              'h4',
              { className: 'list-group-item-heading' },
              'Method'
            ),
            React.createElement(
              'p',
              { className: 'list-group-item-text' },
              recipe.method
            )
          ),
          React.createElement(
            'div',
            { className: 'col-md-4' },
            React.createElement(
              'h4',
              { className: 'list-group-item-heading' },
              'Ingredients'
            ),
            React.createElement(
              'p',
              { className: 'list-group-item-text' },
              recipe.ingredients
            )
          )
        );
      };
      return React.createElement(
        'div',
        null,
        React.createElement(Header, { onClick: this.toggle_panel }),
        React.createElement(
          'div',
          { className: 'container' },
          React.createElement(
            'div',
            { className: 'row list-recipe' },
            React.createElement(
              'div',
              { className: 'list-group' },
              this.state.recipes.map(createList, this)
            )
          ),
          React.createElement(
            'div',
            { className: 'row add-recipe toggle-display' },
            React.createElement(
              'div',
              { className: 'row col-md-6 col-md-offset-3' },
              React.createElement(
                'form',
                null,
                React.createElement(
                  'div',
                  { className: 'form-group' },
                  React.createElement(
                    'label',
                    null,
                    'Recipe Name'
                  ),
                  React.createElement('input', { required: true, className: 'form-control', placeholder: 'Name', name: "title", value: this.state.recipe.title, onChange: this.updateRecipe.bind(this) })
                ),
                React.createElement(
                  'div',
                  { className: 'form-group' },
                  React.createElement(
                    'label',
                    null,
                    'Method'
                  ),
                  React.createElement('textarea', { required: true, className: 'form-control', placeholder: 'Method', name: "method", value: this.state.recipe.method, onChange: this.updateRecipe.bind(this) })
                ),
                React.createElement(
                  'div',
                  { className: 'form-group' },
                  React.createElement(
                    'label',
                    null,
                    'Ingredients'
                  ),
                  React.createElement('textarea', { required: true, className: 'form-control', placeholder: 'Ingredients', name: "ingredients", value: this.state.recipe.ingredients, onChange: this.updateRecipe.bind(this) })
                ),
                React.createElement(
                  'div',
                  { className: 'form-group' },
                  React.createElement(
                    'label',
                    null,
                    'Recipe Image'
                  ),
                  React.createElement('input', { required: true, className: 'form-control', placeholder: 'Name', name: "img", value: this.state.recipe.img, onChange: this.updateRecipe.bind(this) })
                ),
                React.createElement(
                  'button',
                  { type: 'submit', className: 'btn btn-default', onClick: this.saveRecipe.bind(this) },
                  'Save'
                ),
                React.createElement(
                  'button',
                  { type: 'submit', className: 'btn btn-default', onClick: this.toggle_panel },
                  'Return'
                )
              )
            )
          )
        )
      );
    }
  }]);

  return Recipe;
}(React.Component);

var Header = function (_React$Component2) {
  _inherits(Header, _React$Component2);

  function Header(props) {
    _classCallCheck(this, Header);

    return _possibleConstructorReturn(this, (Header.__proto__ || Object.getPrototypeOf(Header)).call(this, props));
  }
  //under construction :-
  /*  handleSearch(event){
   var searchQuery=event.target.value.toLowerCase();
   var displayedContacts=initialRecipe.filter(function(el){
     var searchValue = el.title.toLowerCase();
     searchValue.indexOf(searchQuery) !=-1;
     console.log(searchValue)
   }) */

  _createClass(Header, [{
    key: 'render',
    value: function render() {

      return React.createElement(
        'div',
        null,
        React.createElement(
          'nav',
          { className: 'navbar navbar-dafault' },
          React.createElement(
            'div',
            { className: 'container' },
            React.createElement('div', { className: 'navbar-header' }),
            React.createElement(
              'ul',
              { className: 'nav navbar-nav' },
              React.createElement(
                'button',
                { className: 'addButton ', onClick: this.props.onClick },
                'Add Recipe'
              )
            )
          )
        )
      );
    }
  }]);

  return Header;
}(React.Component);

;

React.render(React.createElement(Recipe, null), document.getElementById('root'));
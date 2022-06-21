import { select, templates,  } from './settings.js';

const utils = {}; // eslint-disable-line no-unused-vars

utils.createDOMFromHTML = function(htmlString) {
  let div = document.createElement('div');
  div.innerHTML = htmlString.trim();
  return div.firstChild;
};

class Product{
  constructor(id, data){
    const thisProduct = this;

    thisProduct.id = id;
    thisProduct.data = data;

    thisProduct.renderInMenu();
  }

  renderInMenu(){
    const thisProduct = this;
    
    /* generate HTML based on template */
    const generatedHTML = templates.menuProduct(thisProduct.data);
    /* create element using utlis.createElementFromHTML */

    /* find mentu container */
    const menuContainers = document.querySelectorAll(select.containerOf.menu);

    for(const contain of menuContainers){
      thisProduct.element = utils.createDOMFromHTML(generatedHTML);
      contain.appendChild(thisProduct.element);
      console.log('menu', thisProduct.element);

    }
    
  }
}

export default Product;
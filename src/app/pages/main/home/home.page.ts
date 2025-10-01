import { Component, OnInit, inject} from '@angular/core';
import { FirebaseService } from 'src/app/services/firebase.service';
import { UtilsService } from 'src/app/services/utils.service';
import { RecipesService } from 'src/app/recipes.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {

  firebaseSvc = inject(FirebaseService);
  utilsSvc = inject(UtilsService);
  ingredientToAdd: string = '';  
  recipes: any[] = [];  
  selectedRecipe: any = null;  
  currentTime: string;
  items: string[];

  constructor(private recipesService: RecipesService) {this.items = ['Elemento 1', 'Elemento 2', 'Elemento 3', 'Elemento 4', 'Elemento 5'];}  
  
  updateTime() {  
    const now = new Date();  
    this.currentTime = now.toLocaleTimeString(); // aca obtenemos la hora
  }

  addIngredient() {  
    if (!this.ingredientToAdd) {  
      return;  
    }  
    this.recipesService.getRecipesByIngredients(this.ingredientToAdd, 5).subscribe(data => {  
      this.recipes = data;  
      this.selectedRecipe = null; // Reinicializa la receta seleccionada  
    });  
    this.ingredientToAdd = ''; // Limpiar el campo de entrada  
  }  

  getRecipeInfo(id: number) {  
    this.recipesService.getRecipeInformation(id).subscribe(data => {  
      this.selectedRecipe = data;  
    });  
  }  

  limpiarResultados() {  
    this.recipes = []; // Limpia la lista de recetas  
    this.selectedRecipe = null; // Limpia la receta seleccionada  
    this.ingredientToAdd = ''; // Limpia el campo de entrada  
  }  
  
  ngOnInit() {
    this.updateTime();  
    setInterval(() => {  
      this.updateTime();  
    }, 1000); 
  }

  //============ Cerrar Sesión =============
  signOut(){
    this.firebaseSvc.signOut();
  }


}

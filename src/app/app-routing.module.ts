import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';



@NgModule({
  exports: [RouterModule]
})
export class AppRoutingModule { 
  routes: Routes = [{ path: "home", component: HomeComponent },];
}

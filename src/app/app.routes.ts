import { Routes } from '@angular/router';
import { TemperatureComponent } from './pages/temperature/temperature.component';

export const routes: Routes = [
    { path: '', redirectTo: 'temperature', pathMatch: 'full' },
    { path: 'temperature', component: TemperatureComponent }
];

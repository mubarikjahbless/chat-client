import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { IsLoggedInGuard } from './guards/is-logged-in.guard';
import { IsNotLoggedInGuard } from './guards/is-not-logged-in.guard';

const routes: Routes = [
  {
    path: '',
    canActivate: [IsLoggedInGuard],
    children: [
      {path: '', redirectTo: 'chat', pathMatch: 'full'},
      {path: 'chat', loadChildren: () => import('./chat/chat.module').then(m => m.ChatModule)},
      {path: 'chat-room', loadChildren: () => import('./pages/chat-room/chat-room.module').then(m => m.ChatRoomPageModule)},
      {path: 'chat-private', loadChildren: () => import('./pages/chat-private/chat-private.module').then(m => m.ChatPrivatePageModule)},
      ]
      },
  {path: 'login', loadChildren: () => import('./pages/login/login.module').then(m => m.LoginPageModule), canActivate: [IsNotLoggedInGuard]}, // <2>
  {path: 'sign-up', loadChildren: () => import('./pages/sign-up/sign-up.module').then(m => m.SignUpPageModule), canActivate: [IsNotLoggedInGuard]},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}

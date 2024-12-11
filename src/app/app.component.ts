import { Component } from '@angular/core';
import { PostsComponent } from './components/posts/posts.component';
import { RouterOutlet } from '@angular/router';
import { PostDialogComponent } from './components/post-dialog/post-dialog.component';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, PostsComponent, PostDialogComponent, HttpClientModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  standalone: true,
})
export class AppComponent {
  title = 'Client';
}

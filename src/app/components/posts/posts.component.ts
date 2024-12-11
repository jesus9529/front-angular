import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { PostService, Post } from '../../services/posts.service';
import { PostDialogComponent } from '../post-dialog/post-dialog.component';
import { MatToolbar } from '@angular/material/toolbar';
import { MatList, MatListItem } from '@angular/material/list';
import { MatIcon } from '@angular/material/icon';
import { CommonModule, NgFor } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.scss'],
  standalone: true,
  imports: [
    MatToolbar,
    MatList,
    MatListItem,
    MatIcon,
    NgFor,
    CommonModule,
    HttpClientModule
  ]
})
export class PostsComponent implements OnInit {
  posts: Post[] = [];

  constructor(private postService: PostService, private dialog: MatDialog) {}

  ngOnInit(): void {
    this.loadPosts();
  }

  loadPosts(): void {
    this.postService.getAllPosts().subscribe((data) => {
      this.posts = data;
    });
  }

  openPostDialog(post?: Post): void {
    const dialogRef = this.dialog.open(PostDialogComponent, {
      width: '400px',
      data: post ? { ...post } : { title: '', content: '' },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        if (result.uuid) {
          this.postService.updatePost(result.uuid, result).subscribe(() => {
            this.loadPosts();
          });
        } else {
          this.postService.createPost(result).subscribe(() => {
            this.loadPosts();
          });
        }
      }
    });
  }

  deletePost(post: Post): void {
    this.postService.deletePost(post.uuid).subscribe(() => {
      this.loadPosts();
    });
  }
}

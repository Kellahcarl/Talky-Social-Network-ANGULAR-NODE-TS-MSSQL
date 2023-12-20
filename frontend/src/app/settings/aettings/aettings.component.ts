import { Component } from '@angular/core';
import { FollowService } from 'src/app/services/follow/follow.service';

@Component({
  selector: 'app-aettings',
  templateUrl: './aettings.component.html',
  styleUrls: ['./aettings.component.css'],
})
export class AettingsComponent {
  followers!: number;
  followings!: number;
  token: string | null = localStorage.getItem('token');
  profilePic: string | null = localStorage.getItem('profilePic');
  userName: string | null = localStorage.getItem('user_name');
  user_id: string | null = localStorage.getItem('user_id');

  constructor(private followService : FollowService) {
    
  }

  ngOnInit() {
    this.GetUserFollowCounts()
  }
  GetUserFollowCounts() {
    try {
      if (this.user_id && this.token) {
        this.followService
          .getUserFollowCounts(this.user_id, this.token)
          .subscribe(
            (res) => {
              console.log(res);
              this.followers = res.followers;
              this.followings = res.followings;
            },
            (error) => {
              console.log(error);
            }
          );
      } else {
        console.log('There is no token or user_id');
        return;
      }
    } catch (error) {
      console.log(error);
    }
  }
}

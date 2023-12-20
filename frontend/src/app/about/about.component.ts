import { Component, ElementRef, HostListener } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from '../services/user/user.service';
import Swal from 'sweetalert2';
import { CloudinaryService } from '../services/cloudinary/cloudinary.service';
import { FollowService } from '../services/follow/follow.service';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css'],
})
export class AboutComponent {
  token = localStorage.getItem('token');
  user_id = localStorage.getItem('user_id');
  profilePic: string | null = localStorage.getItem('profilePic');
  profileName: string | null = localStorage.getItem('user_name');
 
  profileImage: string = '';
  userName: string = '';
  userEmail: string = '';
  fullName: string = '';
  showModal = false;
  postFiles: any[] = [];

  profilePresent!: boolean;

  modalForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private userService: UserService,
    private el: ElementRef,
    private upload: CloudinaryService,
    private followService: FollowService
  ) {
    this.modalForm = this.fb.group({
      profileImage: '',
      user_name: ['', Validators.required],
      fullName: ['', Validators.required],
    });
  }

  ngOnInit() {
    this.fetchuser();
    this.GetUserFollowCounts();
  }

  followers!: number;
  followings!: number;

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

  @HostListener('document:click', ['$event'])
  onDocumentClick(event: Event): void {
    if (!this.el.nativeElement.contains(event.target)) {
      this.showModal = false;
    }
  }

  stopPropagation(event: Event): void {
    event.stopPropagation();
  }

  onSelectPostImage(event: any) {
    // console.log(event);
    this.postFiles.push(...event.addedFiles);
  }

  onRemovePostImage(event: any) {
    console.log(event);
    this.postFiles.splice(this.postFiles.indexOf(event), 1);
  }

  toggleModal() {
    this.showModal = !this.showModal;
  }

  fetchuser = () => {
    if (!this.token || !this.user_id) {
      console.error('Token not found.');
      return;
    }

    this.userService
      .getUserById(this.user_id, this.token)
      .subscribe((userDetails) => {
        // console.log(userDetails);

        this.modalForm.patchValue({
          fullName: userDetails.fullName,
          user_name: userDetails.user_name,
        });

        userDetails.profileImage.length === 0
          ? (this.profilePresent = false)
          : (this.profilePresent = true);

        this.profileImage = userDetails.profileImage;
        this.userName = userDetails.user_name;
        this.userEmail = userDetails.email;
        this.fullName = userDetails.fullName;
      });
  };

  updateProfile() {
    try {
      console.log(this.postFiles);
      if (!this.token) {
        console.error('Token not found.');
        return;
      }

      if (this.modalForm.valid) {
        if (this.postFiles.length === 0) {
          let userDetails: any = this.modalForm.value;
          this.modalForm.value.user_id = this.user_id;

          this.userService
            .updateUser(userDetails, this.token)
            .subscribe((response) => {
              // console.log(response);
              this.modalForm.reset();
              this.postFiles = [];
              this.fetchuser();
              this.toggleModal();
            });
        } else {
          const data = new FormData();
          const file_data = this.postFiles[0];
          data.append('file', file_data);
          data.append('upload_preset', 'xznu6cwm');
          data.append('cloud_name', 'drkjise3u');

          this.upload.uploadImage(data).subscribe((res) => {
            // console.log(res.secure_url);

            this.modalForm.value.profileImage = res.secure_url;
            this.modalForm.value.user_id = this.user_id;
            let userDetails: any = this.modalForm.value;

            if (!this.token) {
              console.log('there is no token');
              return;
            }

            this.userService
              .updateUser(userDetails, this.token)
              .subscribe((response) => {
                // console.log(response);

                this.modalForm.reset();
                this.postFiles = [];
                this.fetchuser();
                this.toggleModal();
              });
          });
        }
      }
    } catch (error) {
      console.log(error);
    }
  }
}

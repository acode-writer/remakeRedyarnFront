import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ProfilRequestService } from './../../services/profils/profil-request.service';
import { UserRequestService } from './../../services/users/user-request.service';
import { Profil } from 'src/app/models/profil.models';

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.css']
})
export class AddUserComponent implements OnInit, OnDestroy {
  form = new FormGroup({
    lastname: new FormControl('', [
      Validators.required,
      Validators.minLength(2)
    ]),
    firstname: new FormControl('', [
      Validators.required,
      Validators.minLength(2)
    ]),
    email: new FormControl('', [
      Validators.required,
      Validators.email
    ]),
    profil: new FormControl('',
    Validators.required
    ),
    avatar: new FormControl()
  });
  private userSubscription !: Subscription;
  private profiSubscription !: Subscription;
  image: any;
  profils : Profil[] = [];
  constructor(private userRequestService: UserRequestService, private profilService: ProfilRequestService) { }

  ngOnInit(): void {
    this.profiSubscription = this.profilService.getProfils().subscribe(
      profils => {
        this.profils = profils.filter( profil => profil.libelle != "APPRENANT" );
      }
    );
  }

  onSubmit(){
    if(this.form.valid){
      const { lastname, firstname, email, avatar, profil} = this.form.value;
      const user = new FormData();
      user.append('firstname', firstname);
      user.append('lastname', lastname);
      user.append('email', email);
      user.append('avatar', avatar);
      user.append('profil', profil);
      user.append('password', 'passer');
      this.userRequestService.add(user).subscribe(
        response => {
          console.log(response);
        }
      );
    }
  }
  onChange(event: any){
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      this.form.get('avatar')?.setValue(file);
      const fileReader = new FileReader();
      fileReader.readAsDataURL(file);
      fileReader.onload = response => {
        this.image = fileReader.result;
      }
    }
  }
  ngOnDestroy(): void {
    if(this.userSubscription){
      this.userSubscription.unsubscribe();
    }
  }
}

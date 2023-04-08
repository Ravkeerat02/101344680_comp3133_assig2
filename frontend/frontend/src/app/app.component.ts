import { Component , TemplateRef } from "@angular/core";
import {BsModalService} from 'ngx-bootstrap/modal';
import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';
import { Apollo } from "apollo-angular";
import { Observable } from "rxjs";
import * as Query from './global-query';
// import 'rxjs/add/operator/map';
import { map } from 'rxjs/operators';


@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"]
})

export class AppComponent {
  modalRef: BsModalRef<any> | null = null;
  users: any[] = []; // List of Users
  user: any = {};
  name: string | undefined;

  constructor(private modalService: BsModalService, private apollo: Apollo) {}
  
  ngOnInit() {
    this.getUsers();
  }

  /**
   * Create User
   * @param value     Name of User
   */

  createUser(value: string) {
    this.apollo
      .mutate<{ addUser: any }>({
        mutation: Query.addUser,
        variables: {
          name: value
        },
        update: (proxy, { data }) => {
          // Read the data from our cache for this query.
          const dataInCache: any = proxy.readQuery({ query: Query.Users });
  
          // Add the newly created user to the cache
          if (data && data.addUser) {
            dataInCache.users.push(data.addUser);
          }
  
          // Write our data back to the cache.
          proxy.writeQuery({ query: Query.Users, data: dataInCache });
        },
      })
      .subscribe(({ data }) => {
        this.closeFirstModal(); // Close Modal
      }, (error) => {
        console.log('there was an error sending the query', error);
      });
  }

//  /**
//  * Remove User
//  * @param id 
//  */
// removeUser(id: any) {
//   this.apollo
//     .mutate({
//       mutation: Query.removeUser,
//       variables: {
//         id: id
//       },
//       update: (proxy, { data: { removeUser } }) => {
//         const cachedData: any = proxy.readQuery({ query: Query.Users });

//         const updatedData = {
//           users: cachedData.users.filter((user: any) => user.id !== removeUser.id),
//         };

//         // Write our data back to the cache.
//         proxy.writeQuery({ query: Query.Users, data: updatedData });
//       }
//     })
//     .subscribe(({ data }) => {
//       console.log(data)
//     }, (error) => {
//       console.log('there was an error sending the query', error);
//     });
// }

//   /**
//    * Edit User Form
//    * @param user 
//    * @param template 
//    */
//   showEditUserForm(user: { name: string | undefined; }, template: string | TemplateRef<any> | (new (...args: any[]) => any)) {
//     this.name = user.name;
//     this.user = user;
//     this.modalRef = this.modalService.show(template);
//   }

//   /**
//    * Update User
//    * @param user 
//    */
//   updateUser(user: User) {
//     this.apollo
//       .mutate({
//         mutation: Query.updateUser,
//         variables: {
//           id: user.id,
//           name: user.name,
//           email: user.email,
//         },
//         update: (proxy, { data }: { data: UpdateUserData }) => {
//           const cachedData: any = proxy.readQuery({ query: Query.Users });

//           const updatedData = {
//             users: cachedData.users.map((u: User) => {
//               if (u.id === user.id) {
//                 return { ...u, ...user };
//               }
//               return u;
//             }),
//           };

//           proxy.writeQuery({ query: Query.Users, data: updatedData });
//         }
//       })
//       .subscribe(({ data }) => {
//         console.log(data)
//       }, (error) => {
//         console.log('there was an error sending the query', error);
//       });
//   }

  /**
   * ----------------------------------------------------
   * Get All Users
   * ----------------------------------------------------
   * @method getUsers
   */
  getUsers() {
    this.apollo.watchQuery({ query: Query.Users })
      .valueChanges
      .pipe(
        map((result: any) => result.data.users)
      )
      .subscribe((data: any[]) => {
        this.users = data;
      });
  }

   // Open Modal
   openModal(template: TemplateRef<any>) {
    this.name = '';
    this.user = {};
    this.modalRef = this.modalService.show(template);
  }

  // Close Modal
  closeFirstModal() {
    if (this.modalRef) {
      this.modalRef.hide();
      this.modalRef = null;
    }
  }

  showEditUserForm(user: { name: string | undefined; }, template: string | TemplateRef<any> | (new (...args: any[]) => any)) {
    this.name = user.name;
    this.user = user;
    this.modalRef = this.modalService.show(template);
  }


}

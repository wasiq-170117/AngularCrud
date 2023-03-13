import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class UserserviceService {

  constructor(private http: HttpClient) { }

  createNewUser(data: any): Observable<any> {
    return this.http.post<any>('http://localhost:3000/userRoutes/createNew', data).
    pipe(
      catchError(error => {
        console.log('Error', error);
        return throwError(() => {
          new Error(error);
        }); 
      })
    );
  }

  GetAllUsers(): Observable<any> {
    
    return this.http.get<any>('http://localhost:3000/userRoutes/users').
    pipe(
      catchError(error => {
        console.log('Error: ', error);
        return throwError(() => {
          new Error(error);
        });
      })
    );
  }

  UpdateData(user: any, user_id: any): Observable<any> {
    return this.http.patch<any>(`http://localhost:3000/userRoutes/users/${user_id}`, user).
    pipe(
      catchError(error => {
        console.log('Error: ', error);
        return throwError(() => {
          new Error(error);
        });
      })
    );
  }

  Delete(id: any): Observable<any> {
    
    return this.http.delete<any>(`http://localhost:3000/userRoutes/users/${id}`)
    .pipe(
      catchError(error => {
        console.log('Error: ', error);
        return throwError(() => {
          new Error(error);
        });
      })
    );
  }
}

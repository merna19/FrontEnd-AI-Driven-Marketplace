import { Injectable } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';
import { delay } from 'rxjs/operators';

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface RegisterCredentials {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
}

export interface User {
  id: number;
  email: string;
  name: string;
}

export interface AuthResponse {
  success: boolean;
  token?: string;
  user?: User;
  message?: string;
}

@Injectable({
  providedIn: 'root'
})
export class UserserviceService {

  private mockUsers: User[] = [
    { id: 1, email: 'admin@example.com', name: 'Admin User' },
    { id: 2, email: 'user@example.com', name: 'Regular User' }
  ];

  constructor() { }

  login(credentials: LoginCredentials): Observable<AuthResponse> {
    const { email, password } = credentials;

    return of(null).pipe(
      delay(1000), 
      () => {
        if (email === 'admin@example.com' && password === 'password') {
          return of({
            success: true,
            token: 'mock-jwt-token-12345',
            user: this.mockUsers[0]
          });
        } else {
          return throwError({
            success: false,
            message: 'Invalid email or password'
          });
        }
      }
    );
  }

  register(credentials: RegisterCredentials): Observable<AuthResponse> {
    const { name, email, password, confirmPassword } = credentials;


    return of(null).pipe(
      delay(1000), 
      () => {
        if (!name || !email || !password || !confirmPassword) {
          return throwError({
            success: false,
            message: 'All fields are required'
          });
        }

        if (password !== confirmPassword) {
          return throwError({
            success: false,
            message: 'Passwords do not match'
          });
        }

        if (password.length < 6) {
          return throwError({
            success: false,
            message: 'Password must be at least 6 characters long'
          });
        }

      
        if (this.mockUsers.some(user => user.email === email)) {
          return throwError({
            success: false,
            message: 'Email already exists'
          });
        }

        const newUser: User = {
          id: Math.floor(Math.random() * 1000) + 10, 
          email: email,
          name: name
        };

        this.mockUsers.push(newUser); 

        return of({
          success: true,
          user: newUser,
          message: 'Registration successful'
        });
      }
    );
  }

  getUserById(id: number): Observable<User | null> {
    return of(null).pipe(
      delay(500),
      () => {
        const user = this.mockUsers.find(u => u.id === id);
        return of(user || null);
      }
    );
  }

  logout(): Observable<any> {
    return of({ success: true, message: 'Logged out successfully' }).pipe(delay(500));
  }

  isLoggedIn(): boolean {
    return !!localStorage.getItem('authToken');
  }
}

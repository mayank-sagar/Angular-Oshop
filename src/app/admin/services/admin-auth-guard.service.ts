import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router/src/utils/preactivation';
import {AuthService} from 'shared/services/auth.service';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class AdminAuthGuard implements CanActivate {
  path: import("@angular/router").ActivatedRouteSnapshot[];
  route: import("@angular/router").ActivatedRouteSnapshot;
 

  constructor(private auth:AuthService) { }

  canActivate() : Observable<boolean>{
    return this.auth.getUser$().pipe(map(user => user.isAdmin));
  }
}

import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpHeaders } from "@angular/common/http";
import { Router } from "@angular/router";
import { NgxSpinnerService } from "ngx-spinner";
import { AuthService } from "../services/auth.service";
import { Injectable } from "@angular/core";
import { BehaviorSubject, catchError, finalize, map, Observable, throwError } from "rxjs";

@Injectable()
export class HttpStatus{
    private requestInFlight$: BehaviorSubject<boolean>;

    constructor(){
        this.requestInFlight$ = new BehaviorSubject<boolean>(false);
    }

    setHttpStatus(inFlight: boolean){
        this.requestInFlight$.next(inFlight);
    }

    getHttpStatus(): Observable<boolean> {
        return this.requestInFlight$.asObservable();
    }
}

@Injectable()
export class LoaderInterceptor implements HttpInterceptor{
    private requests = 0;

    constructor(
        private spinner: NgxSpinnerService, 
        private status: HttpStatus, 
        private authService: AuthService, 
        private router: Router){}

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<unknown>>{
        this.requests++; //Contar a quantidade de requests
        let headers;

        if (req.url.includes('api.ipify.org')) {
            headers: new HttpHeaders({
                contentType: "false",
                processData: "false"
            });
        }
        else if (req.body instanceof FormData) {
            headers: new HttpHeaders({
                contentType: "false",
                processData: "false",
                Authorization: "Bearer " + this.authService.getToken
            });
        }
        else {
            debugger
            headers = new HttpHeaders()
            .append("accept", "application/json")
            .append("Content-Type", "application/json")
            .append("Authorization", "Bearer " + this.authService.getToken);
        }

        let request = req.clone({ headers });
        this.status.setHttpStatus(true);
        this.spinner.show();

        return next.handle(request).pipe(
            map((event) => {
                return event;
            }),
            catchError((error: Response) => {
                if (error.status === 401) {
                    //TODO: Depois redirecionar: this.router.navigate(["ROTA-A-DEFINIR- 401 Unauthorized"]);
                    alert("Usuário não autorizado ou token expirado");
                    this.router.navigate(["login"]);
                }
                return throwError(error);
            }),
            finalize(() => {
                this.requests--;
                this.status.setHttpStatus(this.requests > 0);
                this.status.getHttpStatus().subscribe((status: boolean) => {
                    if (!status)
                        this.spinner.hide();
                });
            })
        );
    }
}
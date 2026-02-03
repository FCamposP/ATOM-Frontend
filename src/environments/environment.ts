import { HttpHeaders } from "@angular/common/http";

export const environment = {
    production: true,
    apiUrl: 'http://localhost:3000/',
    frontUrl: 'http://localhost:4200',
    loginUrl: 'http://localhost:4200/login',

    // httOptionsDefault: new HttpHeaders({
    //     'Content-Type': 'application/json',
    //     'X-Local-Instance:':localStorage.getItem('LocalInstance')??"",
    //     Authorization: 'Bearer ' + localStorage.getItem('Bearer'),
    // })
};

export const formatString = (template: any, ...args: any[]) => {
    return template.replace(/{([0-9]+)}/g, function (match: any, index: any) {
        return typeof args[index] === 'undefined' ? match : args[index];
    });
}

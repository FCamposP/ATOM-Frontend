import { HttpHeaders } from "@angular/common/http";

export const environment = {
    production: true,
    apiUrl: 'https://trazaragro.oirsa.org/Services/api/',
    apiOdata: 'https://trazaragro.oirsa.org/Services/odata/',
    frontUrl: 'http://localhost:4200',
    frontPath: '/registration',
    loginUrl: 'http://localhost:4401',
    trazarAgroUrl:'https://trazaragro.oirsa.org/',
    subModule:'financial',
    // subModule:'crstore',
    // httOptionsDefault: new HttpHeaders({
    //     'Content-Type': 'application/json',
    //     Authorization: 'Bearer ' + localStorage.getItem('Authorization'),
    // })
};

export const formatString = (template: any, ...args: any[]) => {
    return template.replace(/{([0-9]+)}/g, function (match: any, index: any) {
        return typeof args[index] === 'undefined' ? match : args[index];
    });
}


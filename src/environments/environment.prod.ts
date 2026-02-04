import { HttpHeaders } from "@angular/common/http";

export const environment = {
    apiUrl: 'https://us-central1-atom-task-manager-3bc2e.cloudfunctions.net/api/',
    frontUrl: 'http://localhost:4200',
    loginUrl: 'http://localhost:4200/login',
};

export const formatString = (template: any, ...args: any[]) => {
    return template.replace(/{([0-9]+)}/g, function (match: any, index: any) {
        return typeof args[index] === 'undefined' ? match : args[index];
    });
}


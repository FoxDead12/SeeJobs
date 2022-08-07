import axios from "axios";
export const baseUrl = "http://10.0.2.2:8000/api"; //Estou a Usar este IP para conseguir chamar o meu servidor NEST JS
                        //10.0.2.2
                        //

const headers = {
    'Accept': 'application/json',
    'Content-Type': 'application/json',
};

export async function LoginService(data: ILoginResquest): Promise<ILoginResponse> {

    const result = await axios.post(`${baseUrl}/users/auth`, data ,{headers})
    .then((response) => {
        return {token: response.data};
    })
    .catch((error => {

        const errorHandler = new ErroHandle(error.response.data.error);
        return {error: errorHandler.getErrorText()};
    }))
    
    return result;
}

export async function GetAllEvents(data: IGetAllEventsRequest): Promise<IGetAllEventsResponse> {
    
    const result = await axios.post(`${baseUrl}/events/getAll`, {} ,{withCredentials: true, headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Cookie': "token=" + data.token + ";"
    }})
    .then((response) => {

        return {events: response.data};
    })
    .catch((error) => {

        const errorHandler = new ErroHandle(error.response.data.error || error.response.data.message);
        return {error: errorHandler.getErrorText()};
    })

    return result;
}

export async function CreateEvent(data: ICreateEventRequest): Promise<ICreateEventResponse | void> {

    const tempHeader = {
        ...headers,
        'Cookie': "token=" + data.token + ";"
    }


    const result  = await axios.post(`${baseUrl}/events/create`, data, {headers: tempHeader})
    .then(() => {

        return;
    })
    .catch((error) => {

        const errorHandler = new ErroHandle(error.response.data.error);
        return {error: errorHandler.getErrorText()};
    })

    if(result)
        return result;

    return;
}

// Interfaces
interface ILoginResquest {

    email:string;
    password: string;
    keepSession: boolean;
}

interface ILoginResponse {

    token?: string;
    error?: string;
}

//---------------
interface IGetAllEventsRequest {
    token: string;
    
}

interface IGetAllEventsResponse {
    events?: IEvent[];
    error?: string;
}

export interface IEvent {

    titulo: string;
    descricao: string;
    data: Date;
    horas?: Date;
}


//---------------

interface ICreateEventRequest {

    token: string;
    titulo: string;
    descricao: string;
    data: Date;
    hora?: Date;
}

interface ICreateEventResponse {
    error?: string;

}


class ErroHandle {

    constructor(private error:string){}

    getErrorText() {

        if(this.error == "Not Found") {

            return this.NotFound();
        }

        if(this.error == "Invalid Credencials") {

            return this.InvalidCredencials();
        }
        
        if(this.error == "Unauthorized") {

            return this.Unauthorized();
        }
    }

    private NotFound() {

        return "Have some problem width server!";
    }

    private InvalidCredencials() {

        return "Invalid Credencials, try again!";
    }
    
    private Unauthorized() {

        return "Invalid Token"; 
    }
}

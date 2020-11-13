import Cookies from 'universal-cookie'

export class User {

    private cookies: Cookies = new Cookies();

    private _id : number = 0;
    private _username: string = "";
    private _name: string = "";
    private _lastname: string = "";
    private _email: string  = "";
    private _profileImage: string | null = "";

    public get Id() : number {
        return this._id = this.cookies.get('id');
    }

    public get Username() : string {
        return this._username = this.cookies.get('username');
    }

    public get Name() : string {
        return this._name = this.cookies.get('name');
    }

    public get Lastname() : string {
        return this._lastname = this.cookies.get('lastname');
    }

    public get Email() : string {
        return this._email = this.cookies.get('email');
    }

    public get ProfileImage() : string {
        return this._profileImage = this.cookies.get('profile_image');
    }

    public Update(username: string, name: string, lastname: string, email: string, profile_image: string, id?: number) : void {
        if (id !== undefined) this.cookies.set('id', id, { path: '/' })
        this.cookies.set('username', username, { path: '/' })
        this.cookies.set('name', name, { path: '/' })
        this.cookies.set('lastname', lastname, { path: '/' })
        this.cookies.set('email', email, { path: '/' })
        this.cookies.set('profile_image', profile_image, { path: '/' })
    }

    public SignOut() : void {
        this.cookies.remove('id', { path: '/' });
        this.cookies.remove('username', { path: '/' });
        this.cookies.remove('name', { path: '/' });
        this.cookies.remove('lastname', { path: '/' });
        this.cookies.remove('email', { path: '/' });
        this.cookies.remove('profile_image', { path: '/' });
    }
}

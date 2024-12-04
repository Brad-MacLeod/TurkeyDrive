export class SiteConfig {
    donated:Campaign[] = []

}

interface Campaign{
    name:string;
    progress:number;
    combine:boolean;
    goal:number;
    show:boolean;
    units:string;
}



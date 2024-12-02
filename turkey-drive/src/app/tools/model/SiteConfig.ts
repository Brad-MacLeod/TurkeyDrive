export class SiteConfig {
    last_updated:string = "";
    main_goal:number = 150;
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



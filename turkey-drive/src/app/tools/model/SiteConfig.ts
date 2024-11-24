export class SiteConfig {
    last_updated:string = "";
    main_goal:number = 20;
    donated:Campaign[] = []

}

interface Campaign{
    name:string;
    progress:number;
    combine:boolean;
    goals:number[];
    show:boolean;
}



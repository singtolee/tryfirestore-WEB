//Xproduct includes xproduct and product properities

import { Theng } from './theng';
export class Xproduct{
    //short product part
    status:boolean=true;
    mainImgUrl:string;
    price:number=0;
    prdKey:string;
    categoryID:string;
    //category:string;
    name:object=new Theng();
    description:object=new Theng();

    //full product 
    isRefundable:boolean=true;
    imgUrls:string[]=[];
    QTY:number[]=[];
    csENG:string[]=[];
    csTH:string[]=[];
    infoImgUrls:string[]=[];

}
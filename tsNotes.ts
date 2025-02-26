//Temel tipler: string, number, boolen
//any, unknown
const metin:string = "arabalar islanmisti";
const sayi:number = 52;
const olumlumu:boolean = true;

let nekibu:any = "araba";
nekibu = 5;
nekibu = false;

let nekibuki:unknown = "arabam";
nekibuki = 52;
if (typeof nekibuki === "number") {
    console.log(nekibuki); // Bu güvenli çünkü `value`'nun number olduğunu kontrol ettik
} else {
    console.log("Value is not a number");
}

let deger:string | number = "helemelo"; //|istedigin kadar ihtimal belirtebilirsin
deger = 25;

let secenekler: "araba" | "kedi" | "kostum" | 25; //literal types sadece bunlardan birini alabilir
secenekler = "araba";
secenekler = "kostum";
secenekler = 25;

let dizi: Array<string> = [];
dizi[0] = "enes";
dizi[1] = "betül";

let karismisDizi: (string | number)[] = [];
karismisDizi.push("araba");
karismisDizi.push(51);
console.log(karismisDizi);

type araba = {
    marka: string,
    model?: string, //zorunlu degil
    km: number,
    renk : string,
    kazaDurumu: boolean 
}

let araba1:araba = {
    marka: "bwm",
    model: "m5",
    km: 1925,
    renk: "beyaz",
    kazaDurumu: false
};
console.log(araba1);

type kisi = {
    isim:string,
    yas: number,
    cinsiyet?: string, //zorunlu değil
}

let degisikDizi: Array<kisi> = []
degisikDizi.push({isim: "enes", yas: 25, cinsiyet: "erkek"})
degisikDizi.push({isim: "enes", yas: 25});
console.log(degisikDizi);

function topla(a:number,b:number):number | string{
    return a +b;
}

console.log(topla(3,5));

function yazdir(dizi:Array<string>):void{
    dizi.forEach((deger:string)=>console.log(deger));
}

yazdir(["araba"," çiçek", "kiz","alovera"]);

type makina={
    nedir: string,
    yasi:number,
    durumu: "yeni" | "kullanilmis" | "bozuk",
    dogadostumu?: boolean
}

function makinaYazici(dizi:Array<makina>): void{
    dizi.map((oge:makina)=>{
        console.log("oge is: " + oge.nedir);
        console.log(oge);
    });
}

const nesne1: makina = {
    nedir: "araba",
    yasi: 12,
    durumu: "kullanilmis",
    dogadostumu: true
}

const nesne2: makina = {
    nedir: "saat",
    yasi: 1,
    durumu: "yeni"
}

const makineDizisi:Array<makina> = [nesne1,nesne2];
makinaYazici(makineDizisi);

//GENERİC TYPES 
function genericYazdir<T>(dizi: T[]):void{
    console.log(dizi);
}
genericYazdir(["enes", "ali", "mehmet"]);
genericYazdir([5,1,2,4,5]);
genericYazdir([true,false]);

function degisikGenericYazdir<F>(dizi: genericType<F>[]):void{
    dizi.forEach((eleman:genericType<F>)=>console.log(eleman));
}

type genericType<F>={
    isim: string,
    yas: number,
    maas: F[],
}

const genericObj1 : genericType<string> = {
    isim: "enes",
    yas: 21,
    maas: ["5000", "10000", "50"]
}

const genericObj2 : genericType<number> = {
    isim: "enes",
    yas: 21,
    maas: [5000, 10000, 50]
}
console.log(genericObj1);
console.log(genericObj2);

let dizicik: genericType<string | number>[] = [genericObj1, genericObj2];
console.log(dizicik);
degisikGenericYazdir(dizicik);
//EXTENDING (MIRAS ALMA)
interface OrtakAlanlar{
    id: string,
    olusturulmatarihi: string,
    olusturankisi: string,
}
interface Musteri extends OrtakAlanlar{
    musteriNo: string,
}
interface Kurum extends OrtakAlanlar{
    kurumNo: string,
}
const musteri : Musteri = {
    id: "1",
    olusturulmatarihi: "10.09.2021",
    olusturankisi: "veli",
    musteriNo: "15455",
};
const kurum:Kurum = {
    id: "2",
    olusturulmatarihi: "10.09.2021",
    olusturankisi: "veli",
    kurumNo: "1545554545",
}

//partial
type Denemepartial = {
    name: string,
    age: number,
    lastname: string,
    tckno: number,
    birdtdate: string
}

const kullanici1 : Partial<Denemepartial> = {
    name: "ali",
    //normal de o yukardaki alanlar doldurulması zorunludur
    //ama böyle yapınca sanki başlarına name?: işareti yapmış
    //gibi oluyor hani tek tek soru işareti atmaktansa böyle
}
const kullanici2 : Required<Denemepartial> = {
    name: "ali",
    age: 25,
    lastname: "tarak",
    tckno: 54512451,
    birdtdate: "subat"
    //Partialin tam tersi hepsi zorunlu demek
}

//READONLY VAR İŞTE ADINDAN BELLİ Readonly<Denemepartial>

//BU PİCK BİDE Omit var oda tam tersi pickin tam tersi
const secilmis: Pick<Denemepartial, 'name'> = { name: "enes" };


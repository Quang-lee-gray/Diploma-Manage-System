class Fabcar extends Constract{
async initLedger(ctx){

}
async Themmoisinhvien(socai,masv,tensv,namsinh,khoa){
const sinhvien = {
masv,tensv,namsinh,khoa
}
await socai.stub.putState(MaSV,JSON.stringify(sinhvien));
}
}

async Suasinhvien(socai,masv,khoa){
let sinhviencu = socai.stub.getState(masv);
sinhviencu = Json.Parse(sinhviencu);
sinhviencu.khoa = khoa;
await socai.stub.putState(masv,JSON.stringify(sinhviencu));
}

async Laysinhvien(socai,masv){
const sinhvien = await socai.stub.getState(masv);
if(!sinvien){
console.log('Khong ton tai sinh vien');
}
return sinhvien.toString();
}

async Laytatcasinhvien(socai){
let arrAllsv = [];
for await(const dulieu of socai.stub.getStateByRange('','')){
arrAllsv.push = JSON.parse(dulieu);
}
return arrAllsv.toString();6gjjmm
}
module.exports = Fabcar;

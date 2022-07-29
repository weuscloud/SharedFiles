const crypto = require('crypto');
const fs=require("fs");

const public_key="public_key";
const private_key="private_key";
const passphrase_key="passphrase.key"


const privateKey=fs.readFileSync(private_key).toString();
const publicKey=fs.readFileSync(public_key).toString();
const passphrase=fs.readFileSync(passphrase_key).toString();

function generateKeyFiles(){
    const passphrase='top secret'
    const { publicKey, privateKey } = crypto.generateKeyPairSync('rsa', {
        modulusLength: 2048,
        publicKeyEncoding: {
          type: 'spki',
          format: 'pem'
        },
        privateKeyEncoding: {
          type: 'pkcs8',
          format: 'pem',
          cipher: 'aes-256-cbc',
          passphrase
        }
      });
      fs.writeFileSync(public_key,publicKey)
      fs.writeFileSync(private_key,privateKey)
      fs.writeFileSync(passphrase_key,passphrase)
}

// 公钥加密
function encryptDataByPublicKey(encryptData){
    const encryptedData = crypto.publicEncrypt({
        key:publicKey,
      }, Buffer.from(encryptData)).toString('base64');
      return encryptedData
}

// 私钥解密
function decryptDataByPrivateKey(encryptedData){
    const decryptedData = crypto.privateDecrypt({
        key:privateKey,
        passphrase:passphrase
      }, Buffer.from(encryptedData.toString('base64'), 'base64'));
      return decryptedData;
}

// 私钥加密
function encryptDataByPrivateKey(encryptData){
    const encryptedData = crypto.privateEncrypt({
        key:privateKey,
        passphrase:passphrase
      }, Buffer.from(encryptData)).toString('base64');
      return encryptedData
}


// 公钥解密
function decryptDataByPublicKey(encryptedData){
    const decryptedData = crypto.publicDecrypt({
        key:publicKey
      }, Buffer.from(encryptedData.toString('base64'), 'base64'));
      return decryptedData;
}
//签名
function sign(data){
    const sign = crypto.createSign('RSA-SHA256'); // 创建签名算法
    sign.update(data); // 更新待签名内容
    const signture  = sign.sign({key:privateKey,passphrase:passphrase}, 'hex'); // 生成并返回签名
    return signture ;
}
//验证
function verify(data,sign){
    const verify = crypto.createVerify('RSA-SHA256'); // 创建验证算法
    verify.update(data);
    return verify.verify({key:publicKey},sign, 'hex')
}

function String2Bs64(text){
return new Buffer.from(text).toString("base64");
}
function bs642String(bs64){
    return new Buffer.from(bs64,"base64").toString();
}

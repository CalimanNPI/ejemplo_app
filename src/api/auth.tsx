import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import { API, FOTO, FOTOX, FOTOA } from "@env";

const login = async (fields: any) => {
  const token = 23131;
  const config = {
    headers: { Authorization: `Bearer ${token}` },
  };

  const data = await axios.postForm(API + "/login", fields);
  //console.log(data.data);
  return data;
};

const logout = async () => {
  /*  const token = 12; //await getToken();
  const config = {
    headers: { Authorization: `Bearer ${token}` },
  };
  const fields = { token: await getToken(), clave: await getClave() };

  const data = await axios.postForm(API + "/logout", fields);
  //console.log(data.data, "logout");*/

  const getCred = await axios.get(API + "/login/logout/" + (await getToken()));
  //console.log(getCred.data);

  //if (data.data) {
  const keys = [
    "@usuario",
    "@mail",
    "@clave",
    "@nombre",
    "@status",
    "@" + (await getClave()),
  ];
  await AsyncStorage.multiRemove(keys);
  ///return data.data;
  //}
  return true;
};

const setTokenAuth = async (clave: string, token: string) => {
  const data = await AsyncStorage.getItem("@" + clave);
  //console.log(data);
  if (data) {
    //console.log("exist");
    return false;
  } else {
    await AsyncStorage.setItem("@" + clave, JSON.stringify(token));
    //console.log("save");
    return true;
  }
};

const setUsuarioAuth = async (usuario: any) => {
  await AsyncStorage.setItem("@usuario", JSON.stringify(usuario));
  //console.log("save");
  //await getUsuarioInfo();
  return true;
};

const getUsuarioAuth = async () => {
  const data = await AsyncStorage.getItem("@usuario");
  //console.log(!!data, "asasdadasd");
  return !!data;
};

const getUsuarioInfo = async () => {
  const data = await AsyncStorage.getItem("@usuario");
  //console.log(data != null ? JSON.parse(data) : "");
  const usuario = data != null ? JSON.parse(data) : "";
  //console.log(JSON.stringify(usuario));
  await AsyncStorage.setItem("@mail", JSON.stringify(usuario.info[0]["mail"]));
  await AsyncStorage.setItem(
    "@phone",
    JSON.stringify(usuario.info[0]["celular"])
  );
  await AsyncStorage.setItem(
    "@clave",
    JSON.stringify(usuario.info[0]["clave"])
  );

  const nombre = usuario.usuario[0]["nom"].trim();
  await AsyncStorage.setItem("@nombre", JSON.stringify(nombre));

  await AsyncStorage.setItem("@status", JSON.stringify(usuario.status));

  //console.log(await getStatus());
  return usuario;
};

const getImg = async () => {
  return (await getStatus()) === "U"
    ? FOTO + (await getClave()) + ".JPG"
    : (await getStatus()) === "X"
    ? FOTOX + (await getClave()) + ".JPG"
    : (await getStatus()) === "A"
    ? FOTOA + (await getClave()) + ".JPG"
    : "https://bootdey.com/img/Content/avatar/avatar6.png";
};

const getClave = async () => {
  const clave = await AsyncStorage.getItem("@clave");
  return clave != null ? JSON.parse(clave) : "";
};

const getMail = async () => {
  const mail = await AsyncStorage.getItem("@mail");
  //console.log(mail != null ? JSON.parse(mail) : "contacto@cdcac.com");
  return mail != null ? JSON.parse(mail) : "contacto@cdcac.com";
};

const getPhone = async () => {
  const mail = await AsyncStorage.getItem("@phone");
  //console.log(mail != null ? JSON.parse(mail) : "contacto@cdcac.com");
  return mail != null ? JSON.parse(mail) : "contacto@cdcac.com";
};

const getNombre = async () => {
  const nombre = await AsyncStorage.getItem("@nombre");
  return nombre != null ? JSON.parse(nombre) : "Usuario";
};

const getStatus = async () => {
  const status = await AsyncStorage.getItem("@status");
  return status != null ? JSON.parse(status) : "Usuario";
};

const getToken = async () => {
  const token = await AsyncStorage.getItem("@" + (await getClave()));
  return token != null ? JSON.parse(token) : "159357";
};

const getProfFoto = async (clave: number) => {
  return FOTO + clave + ".JPG";
};

const getProf = async (clave: any) => {
  const fields = {
    clave,
  };
  const data = await axios.postForm(API + "/acti/prof", fields);
  //console.log(data.data);
  return data.data;
};

const updateInfoUsuario = async (fields: object) => {
  const data = await axios.postForm(API + "/usuario", fields);
  //console.log(data.data);
  return data.data;
};

const getImgCred = async (clave: any) => {
  return (await getStatus()) === "U"
    ? FOTO + clave + ".JPG"
    : (await getStatus()) === "X"
    ? FOTOX + clave + ".JPG"
    : (await getStatus()) === "A"
    ? FOTOA + clave + ".JPG"
    : "https://bootdey.com/img/Content/avatar/avatar6.png";
};

const getCredential = async () => {
  const data = await AsyncStorage.getItem("@usuario");
  const usuario = data != null ? JSON.parse(data) : "";

  const clave = JSON.parse(usuario.info[0]["clave"]);
  const tipo = await getStatus();
  const ban = usuario.usuario[0]["cla_ban"];
  const usu = usuario.usuario[0]["cla_usu"];

  const getCred = await axios.get(
    API + "/credential/" + tipo + "/" + ban + "/" + usu + "/" + clave
  ); 

  return getCred.data;
};

export {
  login,
  logout,
  setTokenAuth,
  setUsuarioAuth,
  getUsuarioAuth,
  getUsuarioInfo,
  getClave,
  getImg,
  getMail,
  getNombre,
  getStatus,
  getToken,
  getProfFoto,
  getProf,
  getPhone,
  updateInfoUsuario,
  getCredential,
  getImgCred,
};
